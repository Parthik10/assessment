import React from 'react';
import { Container, Button, Badge } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { useCountUp } from '../../hooks/useCountUp';
import { ABOUT_PRINCIPLES, ABOUT_STATS } from '../../data/aboutData';
import {
  Lightbulb,
  Compass,
  BarChart3,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import './About.css';

const ICON_MAP = {
  Lightbulb,
  Compass,
  BarChart3,
  TrendingUp,
};

/**
 * Individual Animated Stat Counter Card
 * Uses useCountUp hook (IntersectionObserver + requestAnimationFrame)
 */
function StatCounterItem({ stat }) {
  const [ref, animatedValue] = useCountUp({
    end: stat.target,
    duration: 1600,
  });

  return (
    <div ref={ref} className="about-stat-card">
      <div className="about-stat-card__number">
        {stat.prefix}
        <span>{animatedValue}</span>
        {stat.suffix}
      </div>
      <div className="about-stat-card__label">{stat.label}</div>
      <div className="about-stat-card__caption">{stat.caption}</div>
    </div>
  );
}

/**
 * About Section ("02 — Engage")
 * Agency ethos, 2x2 core principles grid, animated count-up metrics, and conversion CTA.
 */
export function About() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });

  return (
    <section id="about" className="section section--subtle about-section" ref={sectionRef}>
      <Container>
        {/* Main 2-Column Layout */}
        <div className="about-grid">
          {/* Left Column: Eyebrow, Narrative & CTA */}
          <div className={`about-content reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
            <div className="about-eyebrow-wrap">
              <span className="about-eyebrow">02 — Engage</span>
            </div>

            <h2 className="about-title">Driven by Ideas. Focused on Results.</h2>

            <p className="about-lead">
              At Xntrova, we believe great marketing starts with understanding people.
              Every strategy is rooted in fresh ideas, solid planning and a clear focus
              on what matters. We combine creativity with data-driven decisions to
              build experiences that connect, engage and inspire action.
            </p>

            <div className="about-cta-wrap">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                Let&apos;s Grow Together
              </Button>
            </div>
          </div>

          {/* Right Column: 2x2 Principle Blocks Grid */}
          <div
            className={`about-principles-grid reveal-init ${isRevealed ? 'is-revealed' : ''}`}
            style={{ transitionDelay: '150ms' }}
          >
            {ABOUT_PRINCIPLES.map((item) => {
              const IconComponent = ICON_MAP[item.iconName] || Lightbulb;
              return (
                <div key={item.id} className="about-principle-card">
                  <div className="about-principle-card__icon">
                    <IconComponent size={22} aria-hidden="true" />
                  </div>
                  <h3 className="about-principle-card__title">{item.title}</h3>
                  <p className="about-principle-card__description">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Band Beneath: 3 Animated Counters */}
        {/* NOTE: Figures taken from the existing site (https://www.xntrova.com/) */}
        <div
          className={`about-stats-band reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '250ms' }}
        >
          <div className="about-stats-band__header">
            <span className="about-stats-band__tag">
              <ShieldCheck size={14} aria-hidden="true" />
              Verified Performance Record
            </span>
            <span className="about-stats-band__note">Figures taken from existing site</span>
          </div>

          <div className="about-stats-band__grid">
            {ABOUT_STATS.map((stat) => (
              <StatCounterItem key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

