import React from 'react';
import { Container, SectionHeading, Button, Badge } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { SERVICES_DATA } from '../../data/services';
import {
  Search,
  Target,
  Share2,
  ShoppingBag,
  FileText,
  Code2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './Services.css';

// Map icon names to Lucide icon components
const ICON_MAP = {
  Search,
  Target,
  Share2,
  ShoppingBag,
  FileText,
  Code2,
};

/**
 * Services Section ("01 — Attract")
 * 6 conversion-engineered capabilities in a 3/2/1 responsive grid.
 * Features staggered entrance reveals, interactive hover lift, and keyboard focusability.
 */
export function Services() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });

  return (
    <section id="services" className="section services-section" ref={sectionRef}>
      <Container>
        {/* Section Header with "01 — Attract" Eyebrow */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="01 — Attract"
            title="Digital Marketing Services Built for Sustainable Growth"
            subtitle="Solutions that unlock long-term growth for your business."
            align="center"
          />
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="services-grid" role="list">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Search;
            // Compute stagger delay for cascading entrance animation
            const staggerDelay = `${index * 80}ms`;

            return (
              <div
                key={service.id}
                role="listitem"
                tabIndex={0}
                className={`service-card reveal-init ${isRevealed ? 'is-revealed' : ''}`}
                style={{ transitionDelay: isRevealed ? staggerDelay : '0ms' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const link = e.currentTarget.querySelector('.service-card__link');
                    if (link) link.click();
                  }
                }}
              >
                {/* Top Row: Icon Container & Metric Pill */}
                <div className="service-card__top">
                  <div className="service-card__icon-wrap">
                    <IconComponent size={24} className="service-card__icon" aria-hidden="true" />
                  </div>
                  {service.metric && (
                    <Badge variant="primary" size="sm" className="service-card__badge">
                      {service.metric}
                    </Badge>
                  )}
                </div>

                {/* Card Content */}
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>

                {/* Action Link with animated slide arrow */}
                <div className="service-card__footer">
                  <a
                    href={service.href}
                    className="service-card__link"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    <span>{service.linkText}</span>
                    <ArrowRight size={16} className="service-card__arrow" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action: View all services CTA */}
        <div className={`services-bottom-cta reveal-init ${isRevealed ? 'is-revealed' : ''}`} style={{ transitionDelay: '500ms' }}>
          <Button
            href="#contact"
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight size={18} />}
          >
            View all services & discuss your strategy
          </Button>
        </div>
      </Container>
    </section>
  );
}

