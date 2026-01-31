/**
 * POST /api/generate
 *
 * Accepts a user prompt and returns AI-generated UI JSON
 * that conforms to the catalog schema.
 *
 * Request body: { "prompt": string }
 * Response: { "tree": UITree } on success
 *           { "error": string, "issues"?: ValidationIssue[] } on failure
 */
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateUITree } from '../../../catalog/validation';
import { buildSystemPrompt } from '../../../catalog/prompt';

const MAX_RETRIES = 1;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({ apiKey });
}

export async function POST(request: Request) {
  let body: { prompt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    );
  }

  const prompt = body.prompt;
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return NextResponse.json(
      { error: 'Missing or empty "prompt" field' },
      { status: 400 },
    );
  }

  let client: OpenAI;
  try {
    client = getClient();
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }

  const systemPrompt = buildSystemPrompt();

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let rawContent: string;
    try {
      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt.trim() },
        ],
        response_format: { type: 'json_object' },
      });

      rawContent = completion.choices[0]?.message?.content ?? '';
    } catch (err) {
      return NextResponse.json(
        { error: `AI provider error: ${(err as Error).message}` },
        { status: 502 },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      if (attempt < MAX_RETRIES) continue;
      return NextResponse.json(
        { error: 'AI returned invalid JSON', raw: rawContent },
        { status: 502 },
      );
    }

    const result = validateUITree(parsed);

    if (result.valid) {
      return NextResponse.json({ tree: result.tree });
    }

    if (attempt < MAX_RETRIES) continue;

    return NextResponse.json(
      {
        error: 'AI-generated UI JSON failed schema validation',
        issues: result.issues,
      },
      { status: 422 },
    );
  }
}
