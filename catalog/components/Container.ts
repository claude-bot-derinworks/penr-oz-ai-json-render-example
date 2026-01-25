/**
 * Container Component Schema
 *
 * A flexible layout wrapper for organizing child components.
 * Supports both vertical (column) and horizontal (row) arrangements.
 * Uses flexbox with configurable gap spacing.
 */
import { z } from 'zod';
import type { ComponentDefinition } from '@json-render/core';

/**
 * Container direction determines the flex direction.
 * - column: Vertical stacking (default)
 * - row: Horizontal arrangement with wrapping
 */
export const ContainerDirection = z.enum(['column', 'row']);
export type ContainerDirection = z.infer<typeof ContainerDirection>;

/**
 * Gap size presets for consistent spacing.
 * - none: No gap (0px)
 * - small: Tight spacing (8px)
 * - medium: Standard spacing (16px)
 * - large: Generous spacing (24px)
 */
export const GapSize = z.enum(['none', 'small', 'medium', 'large']);
export type GapSize = z.infer<typeof GapSize>;

/**
 * Props schema for the Container component.
 */
export const ContainerPropsSchema = z.object({
  /** Layout direction: column (vertical) or row (horizontal) */
  direction: ContainerDirection.default('column').describe('Layout direction: column or row'),
  /** Gap between children */
  gap: GapSize.default('medium').describe('Gap size: none, small, medium, or large'),
});

export type ContainerProps = z.infer<typeof ContainerPropsSchema>;

/**
 * Container component definition for the catalog.
 * Has children as its primary purpose is layout composition.
 */
export const ContainerDefinition: ComponentDefinition<typeof ContainerPropsSchema> = {
  props: ContainerPropsSchema,
  hasChildren: true,
  description: 'Flexible layout wrapper with direction (column/row) and gap spacing options',
};
