import React, { useState, useEffect } from 'react';
import { GROWTH_JOURNEY_STAGES } from '../../data/companyData';
import './GrowthSpine.css';

/**
 * GrowthSpine Component ("The Growth Journey")
 * Vertical scroll progress spine fixed on the desktop right edge.
 * Fills dynamically based on scroll depth with 4 interactive waypoint dots.
 * Automatically hidden on mobile viewports (<1024px).
 */
export function GrowthSpine() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageId, setActiveStageId] = useState('attract');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      // Determine active funnel stage based on scroll percent
      if (progress < 0.28) {
        setActiveStageId('attract');
      } else if (progress < 0.58) {
        setActiveStageId('engage');
      } else if (progress < 0.85) {
        setActiveStageId('prove');
      } else {
        setActiveStageId('convert');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="growth-spine"
      aria-label="Growth Journey Progress Spine"
    >
      <div className="growth-spine__track">
        {/* Dynamic scroll progress fill line */}
        <div
          className="growth-spine__fill"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* 4 Labeled Waypoint Dots */}
        {GROWTH_JOURNEY_STAGES.map((stage) => {
          const isActive = activeStageId === stage.id;

          return (
            <a
              key={stage.id}
              href={`#${stage.targetId}`}
              className={`growth-spine__dot ${isActive ? 'growth-spine__dot--active' : ''}`}
              aria-label={`Jump to stage ${stage.step}: ${stage.label} (${stage.sublabel})`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="growth-spine__indicator" />
              <div className="growth-spine__tooltip">
                <span className="growth-spine__tooltip-step">{stage.step}</span>
                <span className="growth-spine__tooltip-label">{stage.label}</span>
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

