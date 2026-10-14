import React from 'react';
import './Container.css';

/**
 * Reusable Container Component
 * Centers layout, enforces maximum container width, and applies responsive gutter padding.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inner content
 * @param {string} [props.className] - Additional class names
 * @param {string} [props.size='default'] - 'default' (1240px) | 'narrow' (840px) | 'wide' (1400px)
 * @param {'div'|'section'|'article'} [props.as='div'] - Semantic HTML tag
 */
export function Container({
  children,
  className = '',
  size = 'default',
  as: Component = 'div',
  ...rest
}) {
  const sizeClass = size !== 'default' ? `ui-container--${size}` : '';

  return (
    <Component className={`ui-container ${sizeClass} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}

