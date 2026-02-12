'use client';

import { useState, type FormEvent } from 'react';
import { ValidatedRenderer } from '../catalog/renderers/ValidatedRenderer';
import { registry } from '../catalog/renderers';
import type { ValidationIssue } from '../catalog/validation';

type GenerateResult =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; tree: unknown }
  | { status: 'error'; message: string; issues?: ValidationIssue[] };

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<GenerateResult>({ status: 'idle' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setResult({ status: 'loading' });

    let response: Response;
    try {
      response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });
    } catch {
      setResult({ status: 'error', message: 'Network error — could not reach the server.' });
      return;
    }

    let data: Record<string, unknown>;
    try {
      data = await response.json();
    } catch {
      setResult({ status: 'error', message: 'Server returned an invalid response.' });
      return;
    }

    if (!response.ok) {
      setResult({
        status: 'error',
        message: (data.error as string) ?? `Request failed (${response.status})`,
        issues: data.issues as ValidationIssue[] | undefined,
      });
      return;
    }

    setResult({ status: 'success', tree: data.tree });
  }

  return (
    <div className="stack column">
      <header className="card">
        <h1 className="title">JSON Render Example</h1>
        <p className="subtitle">
          Enter a prompt to generate a UI dynamically using AI and the component catalog.
        </p>
      </header>

      <form className="prompt-form" onSubmit={handleSubmit}>
        <input
          className="prompt-input"
          type="text"
          placeholder="Describe the UI you want to generate…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={result.status === 'loading'}
        />
        <button
          className="prompt-submit"
          type="submit"
          disabled={result.status === 'loading' || prompt.trim().length === 0}
        >
          {result.status === 'loading' ? 'Generating…' : 'Generate'}
        </button>
      </form>

      {result.status === 'loading' && (
        <div className="loading-indicator" role="status">
          <span className="loading-spinner" />
          <span>Generating UI from your prompt…</span>
        </div>
      )}

      {result.status === 'error' && (
        <div className="validation-error" role="alert">
          <strong className="validation-error-title">Generation Failed</strong>
          <p className="validation-error-subtitle">{result.message}</p>
          {result.issues && result.issues.length > 0 && (
            <ul className="validation-error-list">
              {result.issues.map((issue, i) => (
                <li key={i}>
                  <code>{issue.path}</code>: {issue.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {result.status === 'success' && (
        <section className="stack column">
          <h2 className="card-title">Generated UI</h2>
          <ValidatedRenderer tree={result.tree} registry={registry} />
        </section>
      )}
    </div>
  );
}
