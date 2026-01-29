/**
 * Component Renderers Export
 *
 * Exports all React component renderers and a pre-configured
 * ComponentRegistry for use with @json-render/react.
 */
import type { ComponentRegistry } from '@json-render/react';
import { TextRenderer } from './TextRenderer';
import { ButtonRenderer } from './ButtonRenderer';
import { CardRenderer } from './CardRenderer';
import { ContainerRenderer } from './ContainerRenderer';

/**
 * Export individual renderers for direct use.
 */
export { TextRenderer } from './TextRenderer';
export { ButtonRenderer } from './ButtonRenderer';
export { CardRenderer } from './CardRenderer';
export { ContainerRenderer } from './ContainerRenderer';
export { ValidatedRenderer } from './ValidatedRenderer';

/**
 * Pre-configured component registry.
 *
 * Maps component type names to their React renderer implementations.
 * Use this registry with the @json-render/react Renderer component.
 *
 * @example
 * ```tsx
 * import { registry } from './catalog/renderers';
 * import { Renderer } from '@json-render/react';
 *
 * <Renderer tree={tree} registry={registry} />
 * ```
 */
export const registry: ComponentRegistry = {
  Text: TextRenderer,
  Button: ButtonRenderer,
  Card: CardRenderer,
  Container: ContainerRenderer,
};
