/**
 * Button Component Schema
 *
 * An interactive button component that triggers actions.
 * Supports multiple visual variants and can be disabled.
 * Actions are handled through the json-render action system.
 */
import { z } from 'zod';
import { ActionSchema } from '@json-render/core';
import type { ComponentDefinition } from '@json-render/core';

/**
 * Button variant determines the visual styling.
 * - primary: High emphasis, main call-to-action
 * - secondary: Medium emphasis, alternative actions
 * - danger: Destructive actions (delete, remove)
 */
export const ButtonVariant = z.enum(['primary', 'secondary', 'danger']);
export type ButtonVariant = z.infer<typeof ButtonVariant>;

/**
 * Props schema for the Button component.
 */
export const ButtonPropsSchema = z.object({
  /** Button label text */
  label: z.string().describe('The button label text'),
  /** Action to execute when clicked */
  action: ActionSchema.optional().describe('Action to execute on click'),
  /** Visual variant */
  variant: ButtonVariant.default('primary').describe('Button variant: primary, secondary, or danger'),
  /** Whether the button is disabled */
  disabled: z.boolean().default(false).describe('Whether the button is disabled'),
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;

/**
 * Button component definition for the catalog.
 * Does not have children as the label is provided via props.
 */
export const ButtonDefinition: ComponentDefinition<typeof ButtonPropsSchema> = {
  props: ButtonPropsSchema,
  hasChildren: false,
  description: 'Interactive button that triggers actions with variants (primary, secondary, danger)',
};
