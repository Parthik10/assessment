import React, { useState, useEffect } from 'react';
import { Container, Button, Badge } from '../ui';
import { HERO_TRUST_STATS, HERO_TRUST_BADGES_TEXT, HERO_DASHBOARD_KPIS } from '../../data/heroData';
import { ArrowRight, ChevronRight, TrendingUp, Sparkles, Activity } from 'lucide-react';
import './Hero.css';

/**
 * Hero Section ("01 — Attract")
 * The single H1 on the page, conversion-driven messaging, trust proof points,
 * and a CSS/SVG performance dashboard mock that respects prefers-reduced-motion.
 */
export function Hero() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    // Accessibility check: Skip all animations if user requested reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setHasAnimated(true);
      setCountProgress(1);
      return;
    }

    // Trigger SVG stroke draw
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 150);

    // Number count-up animation using requestAnimationFrame
    const duration = 1200; // ms
    let startTime = null;
    let animId = null;

    const animateCounters = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountProgress(eased);

      if (progress < 1) {
        animId = requestAnimationFrame(animateCounters);
      }
    };

    animId = requestAnimationFrame(animateCounters);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Format animated KPI numbers
  const formatKPIValue = (targetValue, unit) => {
    if (unit === '%') {
      return `${(targetValue * countProgress).toFixed(1)}%`;
    }
    if (unit === 'k') {
      return `${(targetValue * countProgress).toFixed(1)}k`;
    }
    return Math.floor(targetValue * countProgress).toLocaleString();
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Soft Grid & Ambient Gradient */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-bg-glow" aria-hidden="true" />

      <Container className="hero-container">
        <div className="hero-grid">
          {/* Left Column: Headline, Narrative, CTAs, Trust Proof */}
          <div className="hero-content">
            {/* Eyebrow Label (Spine Stage 01) */}
            <div className="hero-eyebrow-wrap">
              <span className="hero-eyebrow">
                01 — Attract · Digital Marketing Agency in Delhi NCR
              </span>
            </div>

            {/* Exactly One H1 on Page */}
            <h1 className="hero-title">
              Scale Your Business With a Digital Marketing Agency That Delivers Results
            </h1>

            {/* Subtext */}
            <p className="hero-subtext">
              Connect with your target customers through creative, data-driven marketing.
              Xntrova turns ideas into measurable growth.
            </p>

            {/* Action Buttons */}
            <div className="hero-actions">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                Get Free Digital Audit
              </Button>
              <Button
                href="#services"
                variant="secondary"
                size="lg"
                rightIcon={<ChevronRight size={18} />}
              >
                See Our Services
              </Button>
            </div>

            {/* Trust Proof Points Row */}
            <div className="hero-trust">
              <div className="hero-trust__chips">
                {HERO_TRUST_STATS.map((stat, idx) => (
                  <div key={idx} className="hero-trust__chip">
                    <span className="hero-trust__chip-value">{stat.value}</span>
                    <span className="hero-trust__chip-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Plain Text Rating Mentions (No Fake Logos) */}
              <div className="hero-trust__ratings">
                <span className="hero-trust__ratings-dot" aria-hidden="true" />
                <p className="hero-trust__ratings-text">{HERO_TRUST_BADGES_TEXT}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Performance Dashboard Mock (CSS + SVG) */}
          <div className="hero-dashboard-col">
            <div className="hero-dashboard-card">
              {/* Dashboard Header */}
              <div className="hero-dashboard__header">
                <div className="hero-dashboard__title-wrap">
                  <span className="hero-dashboard__pulse-indicator" aria-hidden="true" />
                  <h2 className="hero-dashboard__title">Performance Overview</h2>
                </div>
                {/* Visible Sample Tag per assessment compliance */}
                <Badge variant="warning" size="sm">
                  Sample data
                </Badge>
              </div>

              {/* Mini KPI Tiles */}
              <div className="hero-dashboard__kpis">
                {HERO_DASHBOARD_KPIS.map((kpi) => (
                  <div key={kpi.id} className="hero-kpi-tile">
                    <div className="hero-kpi-tile__top">
                      <span className="hero-kpi-tile__label">{kpi.label}</span>
                      <span className="hero-kpi-tile__change">
                        <TrendingUp size={11} aria-hidden="true" />
                        {kpi.change}
                      </span>
                    </div>
                    <div className="hero-kpi-tile__value">
                      {formatKPIValue(kpi.targetValue, kpi.unit)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Line Chart (Inline SVG with stroke-dashoffset) */}
              <div className="hero-dashboard__chart-wrap">
                <div className="hero-chart-header">
                  <span className="hero-chart-header__caption">
                    <Activity size={13} aria-hidden="true" />
                    Growth Trajectory (Aggregated Client ROI)
                  </span>
                  <span className="hero-chart-header__badge">+250% Target Met</span>
                </div>

                <div className="hero-chart-svg-container">
                  <svg
                    viewBox="0 0 400 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hero-chart-svg"
                    aria-label="Illustrative performance line chart indicating consistent month-over-month growth"
                    role="img"
                  >
                    <defs>
                      {/* Gradient fill under line */}
                      <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Subtle grid lines */}
                    <line x1="10" y1="30" x2="390" y2="30" stroke="var(--color-border-subtle)" strokeDasharray="3 3" />
                    <line x1="10" y1="70" x2="390" y2="70" stroke="var(--color-border-subtle)" strokeDasharray="3 3" />
                    <line x1="10" y1="110" x2="390" y2="110" stroke="var(--color-border-subtle)" strokeDasharray="3 3" />

                    {/* Gradient Area under curve */}
                    <path
                      d="M 15,125 C 65,115 95,95 145,80 C 195,65 225,75 275,40 C 325,18 355,22 385,12 L 385,145 L 15,145 Z"
                      fill="url(#heroChartFill)"
                      className={`hero-chart__area ${hasAnimated ? 'hero-chart__area--visible' : ''}`}
                    />

                    {/* Main stroke line with dashoffset animation */}
                    <path
                      d="M 15,125 C 65,115 95,95 145,80 C 195,65 225,75 275,40 C 325,18 355,22 385,12"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className={`hero-chart__stroke ${hasAnimated ? 'hero-chart__stroke--drawn' : ''}`}
                    />

                    {/* Endpoint Pulse Dot */}
                    <circle
                      cx="385"
                      cy="12"
                      r="4.5"
                      fill="var(--color-primary)"
                      className={`hero-chart__dot ${hasAnimated ? 'hero-chart__dot--visible' : ''}`}
                    />
                    <circle
                      cx="385"
                      cy="12"
                      r="8"
                      fill="var(--color-primary)"
                      opacity="0.3"
                      className={`hero-chart__pulse ${hasAnimated ? 'hero-chart__pulse--active' : ''}`}
                    />
                  </svg>
                </div>

                {/* Timeline axis labels */}
                <div className="hero-chart-axis">
                  <span>Month 01</span>
                  <span>Month 03</span>
                  <span>Month 06</span>
                  <span>Month 09</span>
                  <span>Current</span>
                </div>
              </div>

              {/* Bottom Dashboard Footer / Caption */}
              <div className="hero-dashboard__footer">
                <span className="hero-dashboard__caption">
                  *Illustrative performance model based on Delhi NCR digital campaign benchmarks.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

