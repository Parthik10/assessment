import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to animate numeric count-up on scroll entry.
 * Built strictly with native IntersectionObserver + requestAnimationFrame.
 * 
 * @param {Object} config
 * @param {number} config.end Target numeric value
 * @param {number} [config.duration=1400] Animation duration in milliseconds
 * @param {number} [config.start=0] Starting value
 * @param {number} [config.decimals=0] Number of decimal places
 * @returns {[React.RefObject, number]} [DOM element ref, current animated value]
 */
export function useCountUp({ end, duration = 1400, start = 0, decimals = 0 }) {
  const [value, setValue] = useState(start);
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Check accessibility: Skip counter animation if reduced motion preferred
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setValue(end);
      return;
    }

    let animId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.unobserve(node);

          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic formula
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOut;

            setValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));

            if (progress < 1) {
              animId = requestAnimationFrame(step);
            } else {
              setValue(end);
            }
          };

          animId = requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [end, duration, start, decimals]);

  return [elementRef, value];
}

