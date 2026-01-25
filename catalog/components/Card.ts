/**
 * Card Component Schema
 *
 * A container component for grouping related content.
 * Displays with a white background, rounded corners, and shadow.
 * Optionally includes a title and subtitle for context.
 */
import { z } from 'zod';
import type { ComponentDefinition } from '@json-render/core';

/**
 * Props schema for the Card component.
 */
export const CardPropsSchema = z.object({
  /** Optional card title displayed at the top */
  title: z.string().optional().describe('Card title displayed at the top'),
  /** Optional subtitle for additional context */
  subtitle: z.string().optional().describe('Subtitle displayed below the title'),
});

export type CardProps = z.infer<typeof CardPropsSchema>;

/**
 * Card component definition for the catalog.
 * Has children to contain other components.
 */
export const CardDefinition: ComponentDefinition<typeof CardPropsSchema> = {
  props: CardPropsSchema,
  hasChildren: true,
  description: 'Container with optional title and subtitle for grouping related content',
};
