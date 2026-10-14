import React from 'react';
import { Container, SectionHeading } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { BENEFITS_DATA, TOOL_PILLS } from '../../data/benefits';
import {
  Sparkles,
  Target,
  Cpu,
  FileCheck,
  Users,
  RefreshCw,
  Wrench,
} from 'lucide-react';
import './WhyChooseUs.css';

const ICON_MAP = {
  Sparkles,
  Target,
  Cpu,
  FileCheck,
  Users,
  RefreshCw,
};

/**
 * WhyChooseUs Section ("02 — Engage")
 * Minimal, icon-led value propositions without heavy shadows.
 * Features thin dividers, subtle hover color shifts, and an unbranded tool stack row.
 */
export function WhyChooseUs() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });

  return (
    <section id="why-us" className="section why-us-section" ref={sectionRef}>
      <Container>
        {/* Section Header */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="02 — Engage · Why Choose Us"
            title="Turning Potential Into Performance"
            subtitle="Potential alone doesn't drive growth. We turn ideas into actions and strategies into measurable results."
            align="center"
          />
        </div>

        {/* 6 Minimal Benefit Blocks (Thin Dividers, Icon-Led) */}
        <div className="why-us-grid" role="list">
          {BENEFITS_DATA.map((benefit, index) => {
            const IconComponent = ICON_MAP[benefit.iconName] || Sparkles;
            const delay = `${index * 60}ms`;

            return (
              <div
                key={benefit.id}
                role="listitem"
                className={`why-us-item reveal-init ${isRevealed ? 'is-revealed' : ''}`}
                style={{ transitionDelay: isRevealed ? delay : '0ms' }}
              >
                <div className="why-us-item__icon-wrap">
                  <IconComponent size={20} className="why-us-item__icon" aria-hidden="true" />
                </div>
                <div className="why-us-item__body">
                  <h3 className="why-us-item__title">{benefit.title}</h3>
                  <p className="why-us-item__description">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools We Work With Row (Grayscale Pills, No External Logo Files) */}
        <div
          className={`why-us-tools reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="why-us-tools__header">
            <Wrench size={14} className="why-us-tools__icon" aria-hidden="true" />
            <span className="why-us-tools__label">Industry Tools We Work With:</span>
          </div>

          <div className="why-us-tools__pills" role="list" aria-label="Tools we work with">
            {TOOL_PILLS.map((tool) => (
              <div key={tool.name} role="listitem" className="tool-pill">
                <span className="tool-pill__name">{tool.name}</span>
                <span className="tool-pill__category">{tool.category}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

