import React, { useState, useEffect } from 'react';
import { Container, SectionHeading } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { FAQ_ITEMS } from '../../data/faqData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import './FAQ.css';

/**
 * FAQ Section ("04 — Convert / Clarify")
 * Accessible accordion with single-open state, pure CSS grid 0fr->1fr animation,
 * and automatic FAQPage JSON-LD injection for rich snippets in Google Search.
 */
export function FAQ() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  // Inject FAQPage JSON-LD schema into head on mount
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-json-ld';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-json-ld');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="section faq-section" ref={sectionRef}>
      <Container size="narrow">
        {/* Section Heading */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="04 — Convert · FAQ"
            title="Frequently Asked Questions"
            subtitle="Straightforward answers on our engagement process, campaign timelines, and reporting."
            align="center"
          />
        </div>

        {/* Accordion List */}
        <div
          className={`faq-accordion reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '150ms' }}
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                {/* Accordion Question Trigger */}
                <h3 className="faq-item__heading">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="faq-item__trigger"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="faq-item__question-text">{item.question}</span>
                    <span className="faq-item__icon-wrap" aria-hidden="true">
                      <ChevronDown size={18} className="faq-item__icon" />
                    </span>
                  </button>
                </h3>

                {/* Animated Height Container via CSS Grid 0fr -> 1fr */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-item__collapse"
                >
                  <div className="faq-item__content">
                    <p className="faq-item__answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Line Linking to Contact */}
        <div
          className={`faq-footer reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="faq-footer__inner">
            <MessageSquare size={16} className="faq-footer__icon" aria-hidden="true" />
            <span>
              Still have questions?{' '}
              <a href="#contact" className="faq-footer__link">
                Talk to us &rarr;
              </a>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

