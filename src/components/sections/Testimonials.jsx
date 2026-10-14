import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, SectionHeading } from '../ui';
import { useReveal } from '../../hooks/useReveal';
import { TESTIMONIALS_DATA, TESTIMONIALS_RATING_LINE } from '../../data/testimonials';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import './Testimonials.css';

/**
 * Testimonials Section ("03 — Prove")
 * Accessible, responsive carousel hand-coded from scratch using useState and pointer events.
 * Features keyboard arrows, touch swipe, live-region feedback, and autoplay pause controls.
 */
export function Testimonials() {
  const [sectionRef, isRevealed] = useReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const carouselRef = useRef(null);
  const pointerStartX = useRef(null);
  const pointerCurrentX = useRef(null);

  // 1. Responsive itemsPerView detection (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS_DATA.length - itemsPerView);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // 2. Tab visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === 'hidden');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 3. Autoplay (every 6s, pauses on hover, focus, tab hidden, or prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || isHovered || isFocused || isTabHidden) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [handleNext, isHovered, isFocused, isTabHidden]);

  // 4. Keyboard Arrow Navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // 5. Touch / Pointer Swipe Handlers
  const handlePointerDown = (e) => {
    pointerStartX.current = e.clientX;
    pointerCurrentX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (pointerStartX.current !== null) {
      pointerCurrentX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    if (pointerStartX.current !== null && pointerCurrentX.current !== null) {
      const diff = pointerStartX.current - pointerCurrentX.current;
      const swipeThreshold = 45; // 45px swipe threshold

      if (diff > swipeThreshold) {
        handleNext();
      } else if (diff < -swipeThreshold) {
        handlePrev();
      }
    }
    pointerStartX.current = null;
    pointerCurrentX.current = null;
  };

  return (
    <section id="reviews" className="section section--subtle testimonials-section" ref={sectionRef}>
      <Container>
        {/* Section Heading */}
        <div className={`reveal-init ${isRevealed ? 'is-revealed' : ''}`}>
          <SectionHeading
            eyebrow="03 — Prove · Client Feedback"
            title="Words from Our Valued Clients"
            subtitle="Authentic experiences from founders and leaders who trust Xntrova with their digital growth."
            align="center"
          />
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className={`testimonials-carousel reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '150ms' }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          tabIndex={0}
        >
          {/* Live region feedback for screen readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`Showing testimonial ${currentIndex + 1} of ${TESTIMONIALS_DATA.length}: ${TESTIMONIALS_DATA[currentIndex].author}`}
          </div>

          {/* Carousel Track Window */}
          <div className="testimonials-window">
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {TESTIMONIALS_DATA.map((item, index) => (
                <div
                  key={item.id}
                  className="testimonials-slide"
                  style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${TESTIMONIALS_DATA.length}`}
                >
                  <div className="testimonial-card">
                    {/* Top: Star Rating & Decorative Quote */}
                    <div className="testimonial-card__header">
                      <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
                        {[...Array(item.rating)].map((_, sIdx) => (
                          <Star key={sIdx} size={15} fill="#F59E0B" color="#F59E0B" aria-hidden="true" />
                        ))}
                      </div>
                      <Quote size={20} className="testimonial-card__quote-icon" aria-hidden="true" />
                    </div>

                    {/* Quote Text */}
                    <p className="testimonial-card__quote">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {/* Author Details & Initials Avatar */}
                    <div className="testimonial-card__author">
                      <div
                        className="testimonial-avatar"
                        style={{ backgroundColor: `${item.accentColor}18`, color: item.accentColor }}
                        aria-hidden="true"
                      >
                        {item.initials}
                      </div>
                      <div className="testimonial-author__info">
                        <span className="testimonial-author__name">{item.author}</span>
                        <span className="testimonial-author__role">{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls Row (Prev / Dots / Next) */}
          <div className="testimonials-controls">
            <button
              type="button"
              className="carousel-nav-btn carousel-nav-btn--prev"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            {/* Pagination Dots */}
            <div className="carousel-dots" role="tablist" aria-label="Testimonial pagination">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
                const isActive = currentIndex === dotIdx;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`carousel-dot ${isActive ? 'carousel-dot--active' : ''}`}
                    onClick={() => setCurrentIndex(dotIdx)}
                  />
                );
              })}
            </div>

            <button
              type="button"
              className="carousel-nav-btn carousel-nav-btn--next"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Rated on Clutch, GoodFirms and DesignRush Line Beneath */}
        <div
          className={`testimonials-ratings-footer reveal-init ${isRevealed ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="testimonials-ratings-line">
            <span className="testimonials-ratings-dot" aria-hidden="true" />
            <span>{TESTIMONIALS_RATING_LINE}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

