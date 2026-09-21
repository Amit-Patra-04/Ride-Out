// Global Scroll Lock Utility for Lenis and Native Scroll

let lockCount = 0;

export const lockScroll = () => {
  lockCount++;
  if (lockCount === 1 && typeof window !== 'undefined') {
    // 1. Stop Lenis smooth scroll engine
    if (window.lenis) {
      window.lenis.stop();
    }
    
    // 2. Lock document and body overflow
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }
};

export const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && typeof window !== 'undefined') {
    // 1. Resume Lenis smooth scroll engine
    if (window.lenis) {
      window.lenis.start();
    }
    
    // 2. Restore document and body overflow
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }
};
