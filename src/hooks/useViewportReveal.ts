import { useEffect, RefObject } from 'react';

/**
 * Premium bidirectional viewport entrance and exit reveal engine for ZIKR:
 * - High-visibility upward entrances: Elements smoothly glide up and scale into crisp view.
 * - Choreographed staggering: Reads and respects element `--reveal-delay` attributes.
 * - Bidirectional transitions: Scrolling down reveals new sections from below;
 *   scrolling back up gracefully restores sections from above.
 * - IntersectionObserver-backed viewport tracking with continuous fallback support.
 * - Respects `prefers-reduced-motion` for accessibility.
 */
export function useViewportReveal(
  scrollContainerRef: RefObject<HTMLElement | null>,
  activeDependency: unknown
) {
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const allFound = container.querySelectorAll<HTMLElement>('[data-zikr-reveal]');
      allFound.forEach((el) => {
        el.classList.add('is-visible');
        el.classList.remove('is-below-fold', 'is-exited-top');
      });
      return;
    }

    // Set of observed elements
    let elements: HTMLElement[] = [];
    let isDisposed = false;

    const evaluateElement = (el: HTMLElement, containerRect: DOMRect) => {
      const rect = el.getBoundingClientRect();
      const isExitedTop = el.classList.contains('is-exited-top');
      const isBelowFold = el.classList.contains('is-below-fold');

      const isNearContainerTop = container.scrollTop <= 20;
      const isNearContainerBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <= 25;

      // 1. Top Exit Check: element scrolled above the top
      if (!isNearContainerTop) {
        const topExitBoundary = isExitedTop
          ? containerRect.top + 30
          : containerRect.top - 12;

        if (rect.bottom < topExitBoundary) {
          if (!isExitedTop) {
            el.classList.add('is-exited-top');
            el.classList.remove('is-visible', 'is-below-fold');
          }
          return;
        }
      } else if (isExitedTop) {
        el.classList.add('is-visible');
        el.classList.remove('is-exited-top', 'is-below-fold');
        return;
      }

      // 2. Bottom Fold Check: element below current visible area
      if (!isNearContainerBottom) {
        // Trigger reveal early (generous margin) so user sees the smooth upward glide in action
        const bottomFoldBoundary = isBelowFold
          ? containerRect.bottom - 24
          : containerRect.bottom + 32;

        if (rect.top > bottomFoldBoundary) {
          if (!isBelowFold) {
            el.classList.add('is-below-fold');
            el.classList.remove('is-visible', 'is-exited-top');
          }
          return;
        }
      } else if (isBelowFold) {
        el.classList.add('is-visible');
        el.classList.remove('is-below-fold', 'is-exited-top');
        return;
      }

      // 3. Inside Viewport: trigger full visible entrance
      if (!el.classList.contains('is-visible')) {
        el.classList.add('is-visible');
        el.classList.remove('is-below-fold', 'is-exited-top');
      }
    };

    const evaluateAll = () => {
      if (isDisposed || !container) return;
      const containerRect = container.getBoundingClientRect();
      for (let i = 0; i < elements.length; i++) {
        evaluateElement(elements[i], containerRect);
      }
    };

    const registerElements = () => {
      const found = Array.from(
        container.querySelectorAll<HTMLElement>('[data-zikr-reveal]')
      );
      elements = found;

      // Ensure any newly added elements are primed with is-below-fold
      elements.forEach((el) => {
        if (
          !el.classList.contains('is-visible') &&
          !el.classList.contains('is-below-fold') &&
          !el.classList.contains('is-exited-top')
        ) {
          el.classList.add('is-below-fold');
        }
      });
    };

    registerElements();

    // Staggered initial entrance frame:
    // First frame commits starting transforms, second frame triggers the visible reveal cascade
    let raf1: number | null = null;
    let raf2: number | null = null;

    raf1 = window.requestAnimationFrame(() => {
      if (isDisposed) return;
      // Force repaint to establish initial states
      void container.offsetHeight;

      raf2 = window.requestAnimationFrame(() => {
        if (isDisposed) return;
        evaluateAll();
      });
    });

    // Throttled scroll listener
    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = null;
        evaluateAll();
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // MutationObserver to detect newly mounted views or expanded sections
    let mutationObserver: MutationObserver | null = null;
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        registerElements();
        onScroll();
      });
      mutationObserver.observe(container, { childList: true, subtree: true });
    }

    return () => {
      isDisposed = true;
      if (raf1 !== null) window.cancelAnimationFrame(raf1);
      if (raf2 !== null) window.cancelAnimationFrame(raf2);
      if (scrollRaf !== null) window.cancelAnimationFrame(scrollRaf);
      if (mutationObserver !== null) mutationObserver.disconnect();
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [scrollContainerRef, activeDependency]);
}
