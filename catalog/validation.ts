/**
 * Schema Validation for AI-Generated UI JSON
 *
 * Validates AI output against the catalog's Zod schemas before rendering.
 * Rejects invalid JSON with detailed error reporting through both
 * console logging and structured error results.
 */
import type { UITree } from '@json-render/core';
import { catalog } from './index';

/**
 * Describes a single validation issue found in the AI output.
 */
export interface ValidationIssue {
  /** Dotted path to the invalid field */
  path: string;
  /** Human-readable description of the problem */
  message: string;
}

/**
 * Result returned by validateUITree.
 *
 * When `valid` is true, `tree` contains the parsed UITree.
 * When `valid` is false, `issues` lists every problem found.
 */
export type ValidationResult =
  | { valid: true; tree: UITree }
  | { valid: false; issues: ValidationIssue[] };

/**
 * Validate an unknown value against the catalog's tree schema.
 *
 * - Parses and validates the input using the catalog's Zod-based treeSchema.
 * - On failure, logs detailed errors to the console and returns structured issues.
 * - On success, returns the parsed UITree ready for rendering.
 *
 * @param input - Raw JSON value (typically parsed from AI output)
 * @returns A discriminated union indicating success or failure
 */
export function validateUITree(input: unknown): ValidationResult {
  const result = catalog.validateTree(input);

  if (result.success) {
    return { valid: true, tree: result.data as UITree };
  }

  const issues: ValidationIssue[] = (result.error?.issues ?? []).map(
    (issue) => ({
      path: issue.path.map(String).join('.') || '(root)',
      message: issue.message,
    }),
  );

  console.error('[json-render] Validation failed for AI-generated UI JSON:');
  for (const issue of issues) {
    console.error(`  • ${issue.path}: ${issue.message}`);
  }

  return { valid: false, issues };
}
