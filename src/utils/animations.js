'use client';

/**
 * Utility function to handle scroll animations
 * This adds the 'appear' class to elements with the 'section-fade-in' class
 * when they enter the viewport
 */
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  const sections = document.querySelectorAll('.section-fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // Optional: stop observing after animation is triggered
        // observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // trigger slightly before element enters viewport
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  return () => {
    sections.forEach(section => {
      observer.unobserve(section);
    });
  };
}

/**
 * Apply staggered animation to child elements
 * @param {string} parentSelector - CSS selector for the parent element
 * @param {string} childSelector - CSS selector for the child elements to animate
 */
export function applyStaggeredAnimation(parentSelector, childSelector) {
  if (typeof window === 'undefined') return;
  
  const parents = document.querySelectorAll(parentSelector);
  
  parents.forEach(parent => {
    const children = parent.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
      child.classList.add('animate-fade-in-up');
      child.style.animationDelay = `${0.1 * (index + 1)}s`;
    });
  });
}
