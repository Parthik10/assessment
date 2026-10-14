import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 * Renders an accessible <button> or <a> tag styled consistently.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / content
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.href] - If supplied, renders an anchor tag
 * @param {React.ReactNode} [props.leftIcon] - Icon placed before text
 * @param {React.ReactNode} [props.rightIcon] - Icon placed after text
 * @param {boolean} [props.fullWidth=false] - Expands to 100% width (great for mobile)
 * @param {string} [props.className] - Additional custom CSS class
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const classNames = [
    'ui-btn',
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth ? 'ui-btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('https://wa.me');
    return (
      <a
        href={href}
        className={classNames}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {leftIcon && <span className="ui-btn__icon ui-btn__icon--left" aria-hidden="true">{leftIcon}</span>}
        <span className="ui-btn__text">{children}</span>
        {rightIcon && <span className="ui-btn__icon ui-btn__icon--right" aria-hidden="true">{rightIcon}</span>}
      </a>
    );
  }

  return (
    <button type={type} className={classNames} {...rest}>
      {leftIcon && <span className="ui-btn__icon ui-btn__icon--left" aria-hidden="true">{leftIcon}</span>}
      <span className="ui-btn__text">{children}</span>
      {rightIcon && <span className="ui-btn__icon ui-btn__icon--right" aria-hidden="true">{rightIcon}</span>}
    </button>
  );
}

