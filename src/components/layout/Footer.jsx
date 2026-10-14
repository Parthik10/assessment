import React, { useState, useEffect } from 'react';
import { Container } from '../ui';
import { COMPANY_INFO } from '../../data/companyData';
import {
  FOOTER_SERVICES_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
} from '../../data/footerData';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import './Footer.css';

// Crisp, lightweight inline SVGs for social media
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_ICONS = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  'X (Twitter)': TwitterIcon,
};

/**
 * Footer Component
 * Dark neutral surface with 4-column desktop hierarchy, comprehensive navigation,
 * floating WhatsApp button, and scroll-triggered back-to-top button.
 */
export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener to toggle Back-to-Top visibility (threshold: 600px)
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-root">
      {/* Main 4-Column Grid */}
      <div className="footer-main">
        <Container>
          <div className="footer-grid">
            {/* Column 1: Brand Wordmark & Agency Mission */}
            <div className="footer-col footer-col--brand">
              <a href="#hero" className="footer-logo" aria-label="Xntrova Technologies Home">
                <span className="footer-logo__text">
                  Xntrova<span className="footer-logo__accent">.</span>
                </span>
              </a>
              <p className="footer-description">
                India&apos;s premier B2B digital marketing agency, delivering growth-focused
                solutions for businesses across Delhi and beyond.
              </p>

              {/* Social Channels with ARIA labels */}
              <div className="footer-socials" aria-label="Social media links">
                {COMPANY_INFO.social.map((soc) => {
                  const IconComp = SOCIAL_ICONS[soc.name] || ExternalLink;
                  return (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      aria-label={`Follow Xntrova on ${soc.name}`}
                    >
                      <IconComp />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Core Services */}
            <div className="footer-col">
              <h4 className="footer-heading">Services</h4>
              <ul className="footer-nav-list">
                {FOOTER_SERVICES_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company Navigation */}
            <div className="footer-col">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-nav-list">
                {FOOTER_COMPANY_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get in Touch Channels */}
            <div className="footer-col">
              <h4 className="footer-heading">Get in Touch</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <MapPin size={16} className="footer-contact-icon" aria-hidden="true" />
                  <address className="footer-contact-address">
                    {COMPANY_INFO.address.full}
                  </address>
                </div>

                <a href={COMPANY_INFO.phone.telLink} className="footer-contact-item footer-contact-link">
                  <Phone size={16} className="footer-contact-icon" aria-hidden="true" />
                  <span>{COMPANY_INFO.phone.display}</span>
                </a>

                <a href={COMPANY_INFO.email.mailto} className="footer-contact-item footer-contact-link">
                  <Mail size={16} className="footer-contact-icon" aria-hidden="true" />
                  <span>{COMPANY_INFO.email.display}</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Copyright & Legal Links Bar */}
      <div className="footer-bottom">
        <Container className="footer-bottom__inner">
          <p className="footer-bottom__copy">
            &copy; 2026 Xntrova. All rights reserved.
          </p>

          <ul className="footer-bottom__legal">
            {FOOTER_LEGAL_LINKS.map((legal, lIdx) => (
              <li key={lIdx}>
                <a href={legal.href} className="footer-bottom__legal-link">
                  {legal.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Floating Action Controls: WhatsApp & Back-To-Top */}
      <div className="floating-actions" aria-label="Page quick actions">
        {/* Back-To-Top Button (Appears after 600px scroll) */}
        <button
          type="button"
          onClick={scrollToTop}
          className={`floating-btn floating-btn--top ${showBackToTop ? 'floating-btn--visible' : ''}`}
          aria-label="Back to top"
          tabIndex={showBackToTop ? 0 : -1}
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={COMPANY_INFO.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-btn--whatsapp"
          aria-label="Chat with Xntrova on WhatsApp"
        >
          <MessageCircle size={24} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

