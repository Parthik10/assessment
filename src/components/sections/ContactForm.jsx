import React, { useState, useRef } from 'react';
import { Container, SectionHeading, Button } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { COMPANY_INFO } from '../../data/companyData';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  RotateCcw,
} from 'lucide-react';
import './ContactForm.css';

// Crisp, lightweight inline SVGs for social channels
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SERVICES_OPTIONS = [
  'SEO (Search Engine Optimization)',
  'PPC (Paid Advertising)',
  'Social Media Marketing',
  'E-Commerce Marketing',
  'Content Marketing',
  'Web Development',
  'Email Marketing',
  'Performance Marketing',
  'Other / Full-Suite Strategy',
];

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  website: '',
  service: '',
  message: '',
  _hp: '', // Honeypot field for bot spam protection
};

const SOCIAL_ICON_MAP = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  'X (Twitter)': TwitterIcon,
};

/**
 * ContactForm Component ("04 — Convert")
 * Robust, handwritten form validation with single useState objects,
 * accessible error linking (aria-describedby, aria-invalid), honeypot anti-spam,
 * and real contact details for Xntrova Technologies in Dwarka, New Delhi.
 */
export function ContactForm() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field refs to auto-focus the first invalid field on failed submit
  const fieldRefs = {
    fullName: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    service: useRef(null),
    message: useRef(null),
  };

  // Field validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required.';
        // Standard RFC 5322 compliant regex for emails
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address.';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required.';
        // Accepts Indian 10-digit mobile or international formats (+91, spaces, hyphens)
        const phoneClean = value.replace(/[\s\-()]/g, '');
        const phoneRegex = /^(\+?\d{1,4})?[6-9]?\d{9,12}$/;
        if (!phoneRegex.test(phoneClean) || phoneClean.length < 10) {
          return 'Please enter a valid 10-digit phone number.';
        }
        return '';

      case 'service':
        if (!value) return 'Please select a service of interest.';
        return '';

      case 'message':
        if (!value.trim()) return 'Please provide a brief message.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';

      default:
        return '';
    }
  };

  // Validate entire form object
  const validateAll = () => {
    const newErrors = {};
    Object.keys(fieldRefs).forEach((key) => {
      const errorMsg = validateField(key, values[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance if touched
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  /**
   * ==========================================================================
   * BACKEND INTEGRATION NOTE:
   * To connect this form to a production backend (Formspree, Web3Forms, or Node API):
   * 
   * const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
   *   body: JSON.stringify(values),
   * });
   * ==========================================================================
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot check: If the hidden input was filled, silently discard (bot detected)
    if (values._hp) {
      return;
    }

    // 2. Validate all fields
    const validationErrors = validateAll();
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });

    // 3. If errors exist, scroll and focus the first invalid field
    const errorKeys = Object.keys(validationErrors);
    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.focus();
      }
      return;
    }

    // 4. Simulated asynchronous submission
    setIsSubmitting(true);
    try {
      // Simulate 1.5s network round-trip
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues(INITIAL_VALUES);
      setErrors({});
      setTouched({});
    } catch (err) {
      setIsSubmitting(false);
      alert('An unexpected error occurred. Please try again or WhatsApp us.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
  };

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <Container>
        {/* Section Heading */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="04 — Convert · Start Your Journey"
            title="Get a Free Digital Audit"
            subtitle="Tell us about your business and we'll get back to you shortly."
            align="center"
          />
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="contact-grid">
          {/* Left Column: Official Contact Details & Map Placeholder */}
          <div
            className={`contact-details-col reveal-init ${isRevealed ? 'is-revealed' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="contact-card">
              <h3 className="contact-card__title">Direct Office Channels</h3>
              <p className="contact-card__lead">
                Have questions or ready to accelerate your brand? Connect with our Delhi NCR team directly.
              </p>

              {/* Contact Info List */}
              <div className="contact-info-list">
                {/* Phone */}
                <a href={COMPANY_INFO.phone.telLink} className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <Phone size={18} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Call or Inquire</span>
                    <span className="contact-info-value">{COMPANY_INFO.phone.display}</span>
                  </div>
                </a>

                {/* Email */}
                <a href={COMPANY_INFO.email.mailto} className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <Mail size={18} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Official Email</span>
                    <span className="contact-info-value">{COMPANY_INFO.email.display}</span>
                  </div>
                </a>

                {/* Address */}
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Headquarters</span>
                    <address className="contact-info-value contact-info-address">
                      {COMPANY_INFO.address.full}
                    </address>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="contact-whatsapp-wrap">
                <Button
                  href={COMPANY_INFO.whatsapp.url}
                  variant="outline"
                  size="md"
                  fullWidth
                  leftIcon={<MessageCircle size={18} />}
                >
                  Quick Chat on WhatsApp
                </Button>
              </div>

              {/* Social Channels */}
              <div className="contact-social-row">
                <span className="contact-social-label">Follow Us:</span>
                <div className="contact-social-links">
                  {COMPANY_INFO.social.map((soc) => {
                    const IconComp = SOCIAL_ICON_MAP[soc.name] || ExternalLink;
                    return (
                      <a
                        key={soc.name}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-social-btn"
                        aria-label={`Visit Xntrova on ${soc.name}`}
                      >
                        <IconComp size={16} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Styled Map Box Placeholder (No heavy iframe) */}
              <div className="contact-map-placeholder">
                <div className="contact-map-placeholder__content">
                  <MapPin size={24} className="contact-map-pin" aria-hidden="true" />
                  <span className="contact-map-title">Dwarka Sector 8, New Delhi</span>
                  <span className="contact-map-sub">Delhi NCR Hub</span>
                  <a
                    href="https://maps.google.com/?q=Sector+8+Dwarka+New+Delhi+110077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-link"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Controlled Form or Success State */}
          <div
            className={`contact-form-col reveal-init ${isRevealed ? 'is-revealed' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="contact-form-container">
              {isSubmitted ? (
                /* Success Message Panel */
                <div className="contact-success-panel" role="status" aria-live="polite">
                  <div className="contact-success-icon-wrap" aria-hidden="true">
                    <CheckCircle2 size={42} className="contact-success-icon" />
                  </div>
                  <h3 className="contact-success-title">Thank you, we&apos;ll be in touch!</h3>
                  <p className="contact-success-text">
                    Your request for a free digital audit has been received. Our senior strategy team
                    will analyze your footprint and respond within 24 business hours.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    leftIcon={<RotateCcw size={16} />}
                    onClick={handleReset}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                /* Main Controlled Form */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="contact-form"
                  aria-label="Request Free Digital Audit Form"
                >
                  {/* Honeypot field for anti-spam (hidden from users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="website-hp">Leave this empty</label>
                    <input
                      type="text"
                      id="website-hp"
                      name="_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values._hp}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Row: Full Name & Email */}
                  <div className="contact-form__row">
                    {/* Full Name */}
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={fieldRefs.fullName}
                        type="text"
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        placeholder="e.g. Rajesh Kumar"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                        className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                      />
                      {errors.fullName && (
                        <span id="error-fullName" className="form-error" role="alert">
                          <AlertCircle size={13} aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Work Email <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={fieldRefs.email}
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="e.g. rajesh@company.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      />
                      {errors.email && (
                        <span id="error-email" className="form-error" role="alert">
                          <AlertCircle size={13} aria-hidden="true" />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row: Phone & Website */}
                  <div className="contact-form__row">
                    {/* Phone */}
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        ref={fieldRefs.phone}
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                      />
                      {errors.phone && (
                        <span id="error-phone" className="form-error" role="alert">
                          <AlertCircle size={13} aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </span>
                      )}
                    </div>

                    {/* Website (Optional) */}
                    <div className="form-group">
                      <label htmlFor="website" className="form-label">
                        Website URL <span className="form-optional">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        autoComplete="url"
                        placeholder="e.g. https://yourbrand.com"
                        value={values.website}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Service Interested In (Dropdown Select) */}
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Service Interested In <span className="form-required" aria-hidden="true">*</span>
                    </label>
                    <select
                      ref={fieldRefs.service}
                      id="service"
                      name="service"
                      value={values.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? 'error-service' : undefined}
                      className={`form-select ${errors.service ? 'form-select--error' : ''}`}
                    >
                      <option value="">Select a strategic service...</option>
                      {SERVICES_OPTIONS.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span id="error-service" className="form-error" role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        <span>{errors.service}</span>
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Tell Us About Your Project &amp; Goals <span className="form-required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      ref={fieldRefs.message}
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Briefly describe your business, primary challenge, or target growth goals..."
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={`form-textarea ${errors.message ? 'form-textarea--error' : ''}`}
                    />
                    {errors.message && (
                      <span id="error-message" className="form-error" role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="contact-form__submit-wrap">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      rightIcon={
                        isSubmitting ? (
                          <Loader2 size={18} className="form-spinner" aria-hidden="true" />
                        ) : (
                          <Send size={18} aria-hidden="true" />
                        )
                      }
                    >
                      {isSubmitting ? 'Analyzing & Submitting...' : 'Claim Your Free Digital Audit'}
                    </Button>
                    <span className="contact-form__disclaimer">
                      🔒 We respect your privacy. No spam, ever.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
