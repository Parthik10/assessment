import React from 'react';
import './Card.css';

/**
 * Reusable Card Component
 * Surface container with rounded corners, subtle border, and soft elevation shadow.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'default'|'subtle'|'accent'|'flat'} [props.variant='default']
 * @param {'sm'|'md'|'lg'} [props.padding='md']
 * @param {boolean} [props.interactive=false] - Enables lift effect and cursor pointer
 * @param {'div'|'article'|'li'} [props.as='div']
 * @param {string} [props.className]
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  as: Component = 'div',
  className = '',
  ...rest
}) {
  const classNames = [
    'ui-card',
    `ui-card--${variant}`,
    `ui-card--p-${padding}`,
    interactive ? 'ui-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
}

