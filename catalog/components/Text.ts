/**
 * Text Component Schema
 *
 * A fundamental component for displaying text content.
 * Supports multiple semantic variants for different text hierarchies
 * (headings, body text, captions) with optional styling.
 */
import { z } from 'zod';
import type { ComponentDefinition } from '@json-render/core';

/**
 * Text variant determines the semantic meaning and default styling.
 * - heading: Large, bold text for section titles (renders as h2)
 * - subheading: Medium emphasis text for subsections (renders as h3)
 * - body: Standard paragraph text (renders as p)
 * - caption: Small, muted text for descriptions (renders as p with .subtitle)
 */
export const TextVariant = z.enum(['heading', 'subheading', 'body', 'caption']);
export type TextVariant = z.infer<typeof TextVariant>;

/**
 * Props schema for the Text component.
 */
export const TextPropsSchema = z.object({
  /** The text content to display */
  content: z.string().describe('The text content to display'),
  /** Semantic variant for styling and semantics */
  variant: TextVariant.default('body').describe('Text variant: heading, subheading, body, or caption'),
});

export type TextProps = z.infer<typeof TextPropsSchema>;

/**
 * Text component definition for the catalog.
 * Does not have children as it renders plain text content.
 */
export const TextDefinition: ComponentDefinition<typeof TextPropsSchema> = {
  props: TextPropsSchema,
  hasChildren: false,
  description: 'Displays text content with semantic variants (heading, subheading, body, caption)',
};
