'use client';

import { ValidatedRenderer } from '../catalog/renderers/ValidatedRenderer';
import { registry } from '../catalog/renderers';

/**
 * A valid UI tree that passes catalog schema validation.
 */
const validTree = {
  root: 'root',
  elements: {
    root: {
      key: 'root',
      type: 'Container',
      props: { direction: 'column', gap: 'medium' },
      children: ['heading', 'card'],
    },
    heading: {
      key: 'heading',
      type: 'Text',
      props: { content: 'AI-Generated UI', variant: 'heading' },
      children: [],
      parentKey: 'root',
    },
    card: {
      key: 'card',
      type: 'Card',
      props: { title: 'Welcome', subtitle: 'This UI was validated before rendering.' },
      children: ['cta'],
      parentKey: 'root',
    },
    cta: {
      key: 'cta',
      type: 'Button',
      props: { label: 'Get Started', variant: 'primary' },
      children: [],
      parentKey: 'card',
    },
  },
};

/**
 * An invalid UI tree that will be rejected by validation.
 * Uses an unknown component type and missing required props.
 */
const invalidTree = {
  root: 'root',
  elements: {
    root: {
      key: 'root',
      type: 'UnknownWidget',
      props: { foo: 'bar' },
      children: [],
    },
  },
};

export default function HomePage() {
  return (
    <div className="stack column">
      <header className="card">
        <h1 className="title">JSON Render Example</h1>
        <p className="subtitle">
          Schema validation ensures only valid AI output reaches the renderer.
        </p>
      </header>

      <section className="stack column">
        <h2 className="card-title">Valid AI Output</h2>
        <ValidatedRenderer tree={validTree} registry={registry} />
      </section>

      <section className="stack column">
        <h2 className="card-title">Invalid AI Output</h2>
        <ValidatedRenderer tree={invalidTree} registry={registry} />
      </section>
    </div>
  );
}
