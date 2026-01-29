/**
 * POC Component Catalog
 *
 * This catalog defines the complete set of UI components available
 * for AI-generated interfaces. All components are type-safe and
 * validated using Zod schemas at compile time.
 *
 * The catalog constrains AI output to known, typed UI elements,
 * preventing unauthorized or unexpected rendering.
 */
import { createCatalog } from '@json-render/core';
import {
  TextDefinition,
  ButtonDefinition,
  CardDefinition,
  ContainerDefinition,
} from './components';

/**
 * POC Catalog
 *
 * A minimal yet expressive set of reusable components for
 * proof-of-concept AI-generated user interfaces.
 *
 * Components:
 * - Text: Display text with semantic variants
 * - Button: Interactive buttons with actions
 * - Card: Content containers with optional titles
 * - Container: Layout wrappers for composition
 */
export const catalog = createCatalog({
  name: 'POC Component Catalog',
  components: {
    /**
     * Text component for displaying content with semantic variants.
     * Variants: heading, subheading, body, caption
     */
    Text: TextDefinition,

    /**
     * Button component for user interactions.
     * Supports primary, secondary, and danger variants.
     */
    Button: ButtonDefinition,

    /**
     * Card component for grouping related content.
     * Optionally displays a title and subtitle.
     */
    Card: CardDefinition,

    /**
     * Container component for flexible layouts.
     * Supports column and row directions with gap spacing.
     */
    Container: ContainerDefinition,
  },
  validation: 'strict',
});

/**
 * Type-safe component names from the catalog
 */
export type CatalogComponentName = keyof typeof catalog.components;

/**
 * Re-export component definitions and types for external use
 */
export * from './components';

/**
 * Re-export validation utilities
 */
export { validateUITree } from './validation';
export type { ValidationResult, ValidationIssue } from './validation';

/**
 * Re-export the catalog type for type inference
 */
export type { Catalog } from '@json-render/core';
