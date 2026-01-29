/**
 * Validated Renderer
 *
 * Wraps @json-render/react's Renderer with schema validation.
 * Invalid AI output is rejected before it reaches the renderer,
 * and validation errors are displayed as a UI placeholder.
 */
'use client';

import { useMemo } from 'react';
import { Renderer, JSONUIProvider } from '@json-render/react';
import type { ComponentRegistry } from '@json-render/react';
import { validateUITree } from '../validation';
import type { ValidationIssue } from '../validation';

interface ValidatedRendererProps {
  /** Raw AI-generated tree to validate and render */
  tree: unknown;
  /** Component registry mapping types to React renderers */
  registry: ComponentRegistry;
}

/**
 * Displays validation errors as a visible UI placeholder,
 * preventing invalid content from reaching the renderer.
 */
function ValidationErrors({ issues }: { issues: ValidationIssue[] }) {
  return (
    <div className="validation-error" role="alert">
      <strong className="validation-error-title">
        Invalid AI Output
      </strong>
      <p className="validation-error-subtitle">
        The generated UI JSON did not pass schema validation.
      </p>
      <ul className="validation-error-list">
        {issues.map((issue, i) => (
          <li key={i}>
            <code>{issue.path}</code>: {issue.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Validates AI-generated JSON against the catalog schema, then
 * renders it if valid. Shows an error placeholder otherwise.
 *
 * @example
 * ```tsx
 * import { ValidatedRenderer } from '../catalog/renderers';
 * import { registry } from '../catalog/renderers';
 *
 * <ValidatedRenderer tree={aiOutput} registry={registry} />
 * ```
 */
export function ValidatedRenderer({ tree, registry }: ValidatedRendererProps) {
  const result = useMemo(() => validateUITree(tree), [tree]);

  if (!result.valid) {
    return <ValidationErrors issues={result.issues} />;
  }

  return (
    <JSONUIProvider registry={registry}>
      <Renderer tree={result.tree} registry={registry} />
    </JSONUIProvider>
  );
}
