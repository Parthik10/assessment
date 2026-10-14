import React from 'react';
import './SectionHeading.css';

/**
 * Reusable SectionHeading Component
 * Standardized header hierarchy for landing page sections.
 * 
 * @param {Object} props
 * @param {string} [props.eyebrow] - Stage/Funnel marker (e.g., "01 — ATTRACT")
 * @param {string} props.title - Primary section title (rendered as H2 by default)
 * @param {string} [props.subtitle] - Supporting descriptive copy
 * @param {'left'|'center'} [props.align='center'] - Content alignment
 * @param {'h2'|'h3'|'h1'} [props.as='h2'] - Semantic heading element
 * @param {React.ReactNode} [props.tag] - Optional right/inline badge (e.g., Sample or Live)
 * @param {string} [props.className]
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  as: HeadingTag = 'h2',
  tag,
  className = '',
  ...rest
}) {
  return (
    <div
      className={`section-header section-header--${align} ${className}`.trim()}
      {...rest}
    >
      {eyebrow && (
        <div className="section-header__eyebrow-wrap">
          <span className="section-header__eyebrow">{eyebrow}</span>
          {tag && <div className="section-header__tag">{tag}</div>}
        </div>
      )}
      <HeadingTag className="section-header__title">{title}</HeadingTag>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </div>
  );
}

