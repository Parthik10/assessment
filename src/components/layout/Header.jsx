import React, { useState, useEffect, useRef } from 'react';
import { Container, Button } from '../ui';
import { COMPANY_INFO, NAV_LINKS } from '../../data/companyData';
import { Phone, Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

/**
 * Header Component
 * Sticky navbar with top utility bar, dynamic scroll blur/shadow,
 * IntersectionObserver-driven active section tracking, and accessible mobile drawer.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef(null);

  // 1. Scroll listener for sticky appearance (blur + shadow threshold: 20px)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    // Passive listener for optimal 60fps scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.sectionId);
    const observedElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (observedElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        // Trigger when section occupies the top third of viewport
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    );

    observedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 3. Body scroll locking when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // 4. Keyboard accessibility (Escape key closes drawer)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // 5. Outside click detection to close mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Helper for smooth anchor scrolling & menu close
  const handleNavClick = (e, href) => {
    // Let browser default smooth-scroll handle it, but close mobile menu
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`header-wrapper ${isScrolled ? 'header-wrapper--scrolled' : ''}`}
    >
      {/* Top Utility Bar (Desktop only) */}
      <div className="header-topbar">
        <Container className="header-topbar__inner">
          <div className="header-topbar__contact">
            <a
              href={COMPANY_INFO.phone.telLink}
              className="header-topbar__link"
              aria-label={`Call us at ${COMPANY_INFO.phone.display}`}
            >
              <Phone size={13} aria-hidden="true" />
              <span>{COMPANY_INFO.phone.display}</span>
            </a>
            <span className="header-topbar__divider" aria-hidden="true">•</span>
            <a
              href={COMPANY_INFO.email.mailto}
              className="header-topbar__link"
              aria-label={`Email us at ${COMPANY_INFO.email.display}`}
            >
              <Mail size={13} aria-hidden="true" />
              <span>{COMPANY_INFO.email.display}</span>
            </a>
          </div>
          <div className="header-topbar__tagline">
            <span>Delhi NCR</span>
            <span className="header-topbar__badge">Digital & Tech</span>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-navbar">
        <Container className="header-navbar__inner">
          {/* Logo / Wordmark */}
          {/* NOTE: Replace text wordmark with <img src="/logo.svg" alt="Xntrova" /> once brand asset is provided */}
          <a href="#hero" className="header-logo" aria-label="Xntrova Technologies Home">
            <span className="header-logo__wordmark">
              Xntrova<span className="header-logo__accent" aria-hidden="true">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="header-nav" aria-label="Main Navigation">
            <ul className="header-nav__list">
              {NAV_LINKS.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <li key={item.sectionId} className="header-nav__item">
                    <a
                      href={item.href}
                      className={`header-nav__link ${isActive ? 'header-nav__link--active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.label}
                      {isActive && <span className="header-nav__indicator" aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="header-actions">
            <div className="header-actions__cta">
              <Button
                href="#contact"
                variant="primary"
                size="md"
                rightIcon={<ArrowUpRight size={16} />}
              >
                Get Free Digital Audit
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="header-burger"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Slide-Down Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-drawer ${isMobileMenuOpen ? 'mobile-drawer--open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Container className="mobile-drawer__inner">
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav__list">
              {NAV_LINKS.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <li key={item.sectionId} className="mobile-nav__item">
                    <a
                      href={item.href}
                      className={`mobile-nav__link ${isActive ? 'mobile-nav__link--active' : ''}`}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="mobile-nav__active-dot" aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Drawer Action & Contact Info */}
          <div className="mobile-drawer__footer">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowUpRight size={18} />}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Get Free Digital Audit
            </Button>

            <div className="mobile-drawer__contact">
              <a href={COMPANY_INFO.phone.telLink} className="mobile-drawer__contact-item">
                <Phone size={15} aria-hidden="true" />
                <span>{COMPANY_INFO.phone.display}</span>
              </a>
              <a href={COMPANY_INFO.email.mailto} className="mobile-drawer__contact-item">
                <Mail size={15} aria-hidden="true" />
                <span>{COMPANY_INFO.email.display}</span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

