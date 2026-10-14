import React from 'react';
import './Badge.css';

/**
 * Reusable Badge / Chip Component
 * Used for stage eyebrows, metric chips, and assessment "Sample" indicators.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'primary'|'neutral'|'success'|'warning'} [props.variant='primary']
 * @param {'sm'|'md'} [props.size='md']
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...rest
}) {
  return (
    <span
      className={`ui-badge ui-badge--${variant} ui-badge--${size} ${className}`.trim()}
      {...rest}
    >
      {icon && <span className="ui-badge__icon" aria-hidden="true">{icon}</span>}
      <span className="ui-badge__text">{children}</span>
    </span>
  );
}

