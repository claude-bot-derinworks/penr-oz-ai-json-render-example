/**
 * Card Component Renderer
 *
 * Renders a card container with optional title and subtitle.
 * Uses the existing .card CSS class from globals.css.
 */
import type { ReactNode } from 'react';
import type { ComponentRenderProps } from '@json-render/react';
import type { CardProps } from '../components/Card';

/**
 * Card renderer component.
 * Wraps children in a styled card container.
 */
export function CardRenderer({
  element,
  children,
}: ComponentRenderProps<CardProps> & { children?: ReactNode }) {
  const { title, subtitle } = element.props;

  return (
    <article className="card">
      {title && <h2 className="card-title">{title}</h2>}
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </article>
  );
}
