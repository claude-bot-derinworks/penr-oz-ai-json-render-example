/**
 * Button Component Renderer
 *
 * Renders an interactive button that can trigger actions.
 * Supports multiple visual variants and disabled state.
 */
import type { CSSProperties } from 'react';
import type { ComponentRenderProps } from '@json-render/react';
import type { ButtonProps } from '../components/Button';

/**
 * CSS styles for button variants.
 * Applied inline to work without additional CSS setup.
 */
const variantStyles: Record<string, CSSProperties> = {
  primary: {
    backgroundColor: '#1d4ed8',
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#1d4ed8',
    border: '1px solid #1d4ed8',
  },
  danger: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
  },
};

/**
 * Base button styles applied to all variants.
 */
const baseStyles: CSSProperties = {
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
};

/**
 * Disabled button styles.
 */
const disabledStyles: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};

/**
 * Button renderer component.
 * Handles click events by invoking the onAction callback.
 */
export function ButtonRenderer({
  element,
  onAction,
}: ComponentRenderProps<ButtonProps>) {
  const { label, action, variant = 'primary', disabled = false } = element.props;

  const handleClick = () => {
    if (!disabled && action && onAction) {
      onAction(action);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...(disabled ? disabledStyles : {}),
      }}
    >
      {label}
    </button>
  );
}
