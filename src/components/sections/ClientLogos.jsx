import React from 'react';
import { Container } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { CLIENT_BRANDS } from '../../data/clients';
import './ClientLogos.css';

/**
 * ClientLogos Component
 * Calm, minimalist single-row typographic marquee of 10 verified client brands.
 * Pure CSS animation with hover pause and static wrap under prefers-reduced-motion.
 * 
 * NOTE FOR PRODUCTION:
 * Real vector SVG or image logo files can replace these text wordmarks once brand assets are supplied.
 */
export function ClientLogos() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });

  // Double the array to create a seamless, gap-free infinite CSS marquee loop
  const marqueeItems = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <section className="client-logos-section" ref={sectionRef} aria-label="Trusted client brands">
      <Container>
        <div className={`client-logos-header reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <span className="client-logos-title">Trusted by Growing Brands</span>
          <span className="client-logos-subtitle">
            Across Delhi NCR &amp; nationwide markets
          </span>
        </div>
      </Container>

      {/* Marquee Track Container */}
      <div
        className={`client-logos-marquee-wrap reveal-init ${isRevealed ? 'is-revealed' : ''}`}
        style={{ transitionDelay: '100ms' }}
      >
        {/* Edge Gradient Mask for smooth fade-in / fade-out */}
        <div className="client-logos-mask" aria-hidden="true" />

        <div className="client-logos-track" role="list">
          {marqueeItems.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              role="listitem"
              className="client-logo-pill"
            >
              {/* NOTE: Real logo SVG / <img> tag can replace this wordmark */}
              <span className="client-logo-name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

