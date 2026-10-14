import React, { useState } from 'react';
import { Container, SectionHeading, Badge, Button } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../../data/projects';
import { ArrowUpRight, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import './Portfolio.css';

/**
 * ============================================================================
 * PLACEHOLDER NOTICE:
 * The original site (https://www.xntrova.com/) contains no public case studies.
 * All project case studies below are illustrative sample placeholders mapped to
 * the agency's primary Delhi NCR industry verticals.
 * Replace with real client work before production launch.
 * ============================================================================
 */
export function Portfolio() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter project cards according to active category
  const filteredProjects = activeFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="section portfolio-section" ref={sectionRef}>
      <Container>
        {/* Section Header with "03 — Prove" Eyebrow & Sample Projects Notice */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="03 — Prove · Portfolio"
            title="Results That Speak for Themselves"
            subtitle="Illustrative performance transformations engineered across high-growth verticals."
            align="center"
            tag={
              <Badge variant="warning" size="sm" icon={<AlertCircle size={12} />}>
                Sample projects
              </Badge>
            }
          />
        </div>

        {/* Filter Tabs Button Group */}
        <div
          className={`portfolio-filter-wrap reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          <div
            className="portfolio-tabs"
            role="group"
            aria-label="Filter case studies by category"
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  className={`portfolio-tab-btn ${isActive ? 'portfolio-tab-btn--active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 / 2 / 1 Responsive Project Grid */}
        <div className="portfolio-grid" role="list">
          {filteredProjects.map((project, index) => {
            const delay = `${(index % 3) * 80}ms`;

            return (
              <div
                key={project.id}
                role="listitem"
                tabIndex={0}
                className={`project-card reveal-init ${isRevealed ? 'is-revealed' : ''}`}
                style={{ transitionDelay: isRevealed ? delay : '0ms' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const link = e.currentTarget.querySelector('.project-card__cta-btn');
                    if (link) link.click();
                  }
                }}
              >
                {/* SVG & Gradient Placeholder Cover (No external images) */}
                <div
                  className="project-card__cover"
                  style={{ background: project.gradient }}
                  aria-hidden="true"
                >
                  {/* Subtle Geometric Graphic Overlay */}
                  <svg
                    className="project-card__svg-graphic"
                    viewBox="0 0 200 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="160" cy="20" r="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <circle cx="160" cy="20" r="35" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <path
                      d="M20 100 L70 65 L110 80 L160 30"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  {/* Top Floating Badge */}
                  <div className="project-card__cover-meta">
                    <span className="project-card__category-badge">{project.category}</span>
                    <span className="project-card__sample-pill">Sample</span>
                  </div>

                  {/* Slide-Up Hover Overlay */}
                  <div className="project-card__hover-overlay">
                    <a
                      href="#contact"
                      className="project-card__cta-btn"
                      aria-label={`View case study for ${project.title}`}
                    >
                      <span>View case study</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Card Body Information */}
                <div className="project-card__body">
                  <div className="project-card__industry">{project.industry}</div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__challenge">{project.challenge}</p>

                  {/* Metric Chips (Dashboard Touch) */}
                  <div className="project-card__metrics">
                    {project.metrics.map((metric, mIdx) => (
                      <span key={mIdx} className="project-metric-chip">
                        <TrendingUp size={11} className="project-metric-chip__icon" aria-hidden="true" />
                        <span>{metric}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Footnote: Replace with real client work */}
        <div
          className={`portfolio-footer-caption reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '350ms' }}
        >
          <span className="portfolio-footer-caption__text">
            *Placeholder Section: Replace with real client work upon onboarding. Metrics demonstrate typical agency performance targets.
          </span>
          <Button
            href="#contact"
            variant="outline"
            size="md"
            rightIcon={<ArrowUpRight size={16} />}
          >
            Request Industry-Specific Case Study
          </Button>
        </div>
      </Container>
    </section>
  );
}

