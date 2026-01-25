/**
 * Text Component Renderer
 *
 * Renders text content with the appropriate semantic HTML element
 * based on the variant prop.
 */
import type { ComponentRenderProps } from '@json-render/react';
import type { TextProps } from '../components/Text';

/**
 * Maps text variants to their visual styling.
 */
const variantStyles: Record<string, string> = {
  heading: 'title',
  subheading: 'card-title',
  body: '',
  caption: 'subtitle',
};

/**
 * Text renderer component.
 * Renders semantic HTML based on variant.
 */
export function TextRenderer({
  element,
}: ComponentRenderProps<TextProps>) {
  const { content, variant = 'body' } = element.props;
  const className = variantStyles[variant] || '';

  switch (variant) {
    case 'heading':
      return <h2 className={className}>{content}</h2>;
    case 'subheading':
      return <h3 className={className}>{content}</h3>;
    case 'body':
    case 'caption':
    default:
      return <p className={className || undefined}>{content}</p>;
  }
}
