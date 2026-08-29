import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'text'

  useEffect(() => {
    // Only run on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Initial setup with hardware acceleration
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
      force3D: true,
    });

    // QuickSetters for instantaneous zero-lag dot tracking
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');

    // QuickTo for high-performance physics-interpolated ring trailing
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isVisible = false;

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      setDotX(mouse.x);
      setDotY(mouse.y);
      setRingX(mouse.x);
      setRingY(mouse.y);
    };

    const handlePointerDown = () => {
      gsap.to(dot, { scale: 0.7, duration: 0.12 });
      gsap.to(ring, { scale: 0.85, duration: 0.12 });
    };

    const handlePointerUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power3.out' });
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power3.out' });
    };

    const handlePointerLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const handlePointerEnter = () => {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    const handleMouseOver = (e) => {
      const targetCursor = e.target.closest('[data-cursor]');
      const clickable = e.target.closest('a, button, [role="button"], input, select, textarea');

      if (targetCursor) {
        const text = targetCursor.getAttribute('data-cursor');
        setCursorText(text || '');
        setCursorType('text');
      } else if (clickable) {
        setCursorText('');
        setCursorType('hover');
      } else {
        setCursorText('');
        setCursorType('default');
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Precision Center Micro-Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block opacity-0 transition-colors duration-200 ${
          cursorType === 'text'
            ? 'h-1.5 w-1.5 bg-brand-accent shadow-glow-cyan'
            : cursorType === 'hover'
            ? 'h-1.5 w-1.5 bg-brand-accent shadow-glow-cyan'
            : 'h-1 w-1 bg-white/90'
        }`}
      />

      {/* Kinetic Fluid Trailing Ring */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full hidden md:flex opacity-0 will-change-transform transition-all duration-250 ease-out ${
          cursorType === 'text'
            ? 'h-14 px-4 bg-obsidian-surface/90 border border-brand-accent/40 backdrop-blur-md shadow-glow-cyan/20 scale-100 rounded-full'
            : cursorType === 'hover'
            ? 'h-10 w-10 border border-brand-accent/50 bg-brand-accent/[0.04] scale-100'
            : 'h-7 w-7 border border-white/20 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-semibold tracking-widest text-brand-accent uppercase text-center select-none whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};

