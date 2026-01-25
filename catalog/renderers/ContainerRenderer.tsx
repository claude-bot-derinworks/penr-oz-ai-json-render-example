/**
 * Container Component Renderer
 *
 * Renders a flexible layout wrapper using the .stack CSS utility.
 * Supports both column and row directions with configurable gap.
 */
import type { CSSProperties, ReactNode } from 'react';
import type { ComponentRenderProps } from '@json-render/react';
import type { ContainerProps } from '../components/Container';

/**
 * Maps gap size names to pixel values.
 */
const gapSizes: Record<string, string> = {
  none: '0',
  small: '8px',
  medium: '16px',
  large: '24px',
};

/**
 * Container renderer component.
 * Uses flexbox for layout with configurable direction and gap.
 */
export function ContainerRenderer({
  element,
  children,
}: ComponentRenderProps<ContainerProps> & { children?: ReactNode }) {
  const { direction = 'column', gap = 'medium' } = element.props;

  const className = `stack ${direction}`;
  const style: CSSProperties = {
    gap: gapSizes[gap] || gapSizes.medium,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
