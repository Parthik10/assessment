import React from 'react';
import { Container, Button } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { COMPANY_INFO } from '../../data/companyData';
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import './CTA.css';

/**
 * ============================================================================
 * EDITABLE COPY: Reassurance tick points under primary action buttons
 * ============================================================================
 */
const REASSURANCE_TICKS = [
  'Free audit',
  'Reply within 24 hours',
  'No long-term commitment',
];

/**
 * CTA Section ("04 — Convert")
 * High-conversion banner with ambient dark gradient, grid overlay,
 * direct WhatsApp shortcut, reassurance proofs, and decorative dashboard glow.
 */
export function CTA() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.15 });

  return (
    <section className="section cta-section" ref={sectionRef} aria-label="Call to action banner">
      <Container>
        <div className={`cta-banner ${isRevealed ? 'is-revealed' : ''}`}>
          {/* Subtle Grid Pattern Overlay */}
          <div className="cta-banner__grid-bg" aria-hidden="true" />
          <div className="cta-banner__ambient-glow" aria-hidden="true" />

          <div className="cta-banner__content">
            {/* Eyebrow Label */}
            <div className="cta-banner__eyebrow-wrap">
              <span className="cta-banner__eyebrow">04 — Convert</span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="cta-banner__title">Ready to Boost Your Brand Growth?</h2>
            <p className="cta-banner__text">
              Get a free digital audit and find out where your biggest opportunities are.
              No pressure, no jargon.
            </p>

            {/* Action Buttons */}
            <div className="cta-banner__actions">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                className="cta-banner__primary-btn"
              >
                Get Free Digital Audit
              </Button>

              <Button
                href={COMPANY_INFO.whatsapp.url}
                variant="secondary"
                size="lg"
                leftIcon={<MessageCircle size={18} />}
                className="cta-banner__whatsapp-btn"
              >
                Chat on WhatsApp
              </Button>
            </div>

            {/* Reassurance Ticks */}
            {/* EDITABLE COPY: Reassurance tick points */}
            <div className="cta-banner__ticks" role="list">
              {REASSURANCE_TICKS.map((tick, index) => (
                <div key={index} role="listitem" className="cta-tick-item">
                  <CheckCircle2 size={15} className="cta-tick-item__icon" aria-hidden="true" />
                  <span>{tick}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Dashboard-Glow Decoration (Desktop only, hidden on mobile) */}
          <div className="cta-banner__decoration" aria-hidden="true">
            <div className="cta-decoration-card">
              <div className="cta-decoration-card__top">
                <span className="cta-decoration-card__dot" />
                <span className="cta-decoration-card__label">Opportunity Index</span>
                <span className="cta-decoration-card__badge">+42% Growth</span>
              </div>

              {/* Decorative mini chart sparkline */}
              <div className="cta-decoration-card__chart">
                <svg viewBox="0 0 160 50" fill="none" className="cta-sparkline-svg">
                  <path
                    d="M 10,40 Q 40,35 60,25 T 110,20 T 150,8"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="150" cy="8" r="4" fill="#38BDF8" />
                </svg>
              </div>

              <div className="cta-decoration-card__kpi">
                <span className="cta-decoration-card__val">Audit Ready</span>
                <span className="cta-decoration-card__sub">Customized for your niche</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

