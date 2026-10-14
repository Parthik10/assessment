import React, { useState, useRef } from 'react';
import { Container, SectionHeading, Badge } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { PROCESS_STEPS } from '../../data/processData';
import { CheckCircle2, Calendar, Layers, ChevronRight } from 'lucide-react';
import './Process.css';

/**
 * Process Section ("02 — Engage")
 * Horizontal timeline on desktop with a scroll-filled progress track,
 * vertical stepper on mobile/tablet, and interactive keyboard-accessible step detail panel.
 */
export function Process() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.15 });
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepButtonRefs = useRef([]);

  // Keyboard navigation for accessible tablist/stepper pattern
  const handleKeyDown = (e, index) => {
    let nextIndex = null;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % PROCESS_STEPS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = PROCESS_STEPS.length - 1;
    }

    if (nextIndex !== null) {
      setActiveStepIndex(nextIndex);
      if (stepButtonRefs.current[nextIndex]) {
        stepButtonRefs.current[nextIndex].focus();
      }
    }
  };

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="section process-section" ref={sectionRef}>
      <Container>
        {/* Section Heading */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="02 — Engage · Methodology"
            title="How We Work"
            subtitle="A simple, transparent path from first call to measurable growth."
            align="center"
          />
        </div>

        {/* Timeline Container */}
        <div className="process-timeline-wrap">
          {/* Horizontal Desktop Track Filler (Fills when isRevealed) */}
          <div className="process-track-bg" aria-hidden="true">
            <div
              className={`process-track-fill ${isRevealed ? 'process-track-fill--active' : ''}`}
            />
          </div>

          {/* Stepper Elements */}
          <div
            className="process-steps-list"
            role="tablist"
            aria-label="How We Work Steps"
          >
            {PROCESS_STEPS.map((item, idx) => {
              const isSelected = activeStepIndex === idx;

              return (
                <div
                  key={item.id}
                  className={`process-step-item ${isSelected ? 'process-step-item--selected' : ''}`}
                >
                  {/* Step Button Trigger */}
                  <button
                    ref={(el) => (stepButtonRefs.current[idx] = el)}
                    type="button"
                    role="tab"
                    id={`process-tab-${item.step}`}
                    aria-selected={isSelected}
                    aria-controls={`process-panel-${item.step}`}
                    tabIndex={isSelected ? 0 : -1}
                    className="process-step-btn"
                    onClick={() => setActiveStepIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  >
                    {/* Circle Node */}
                    <div className="process-node">
                      <span className="process-node__num">{item.step}</span>
                    </div>

                    <div className="process-step-meta">
                      <h3 className="process-step-title">{item.title}</h3>
                      <p className="process-step-summary">{item.summary}</p>
                    </div>

                    {/* Deliverable Tags */}
                    <div className="process-step-tags">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={isSelected ? 'primary' : 'neutral'}
                          size="sm"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Interactive Expanded Detail Panel */}
        {activeStep && (
          <div
            id={`process-panel-${activeStep.step}`}
            role="tabpanel"
            aria-labelledby={`process-tab-${activeStep.step}`}
            className={`process-detail-panel reveal-init ${isRevealed ? 'is-revealed' : ''}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="process-detail__header">
              <div className="process-detail__title-group">
                <span className="process-detail__step-pill">Stage {activeStep.step}</span>
                <h4 className="process-detail__heading">{activeStep.title}: Deep Dive</h4>
              </div>
              <div className="process-detail__timeline-badge">
                <Calendar size={14} aria-hidden="true" />
                <span>{activeStep.details.timeline}</span>
              </div>
            </div>

            <div className="process-detail__body">
              <div className="process-detail__focus">
                <Layers size={16} className="process-detail__focus-icon" aria-hidden="true" />
                <div>
                  <span className="process-detail__focus-label">Primary Objective:</span>
                  <p className="process-detail__focus-text">{activeStep.details.focus}</p>
                </div>
              </div>

              <div className="process-detail__deliverables">
                <span className="process-detail__deliv-label">Key Deliverables:</span>
                <ul className="process-detail__deliv-list">
                  {activeStep.details.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="process-detail__deliv-item">
                      <CheckCircle2 size={15} className="process-detail__check" aria-hidden="true" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

