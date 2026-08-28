import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'text' | 'button'

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
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });
    const setRingRotation = gsap.quickTo(ring, 'rotation', { duration: 0.35, ease: 'power2.out' });
    const setRingScaleX = gsap.quickTo(ring, 'scaleX', { duration: 0.35, ease: 'power2.out' });
    const setRingScaleY = gsap.quickTo(ring, 'scaleY', { duration: 0.35, ease: 'power2.out' });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let prevMouse = { x: mouse.x, y: mouse.y };
    let isVisible = false;

    // Velocity & stretch loop
    const ticker = gsap.ticker.add(() => {
      // Calculate velocity
      const vx = mouse.x - prevMouse.x;
      const vy = mouse.y - prevMouse.y;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Clamp max deformation
      const clampedSpeed = Math.min(speed, 90);
      const stretch = (clampedSpeed / 90) * 0.45; // Max 45% stretch
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      if (speed > 1.5) {
        setRingRotation(angle);
        setRingScaleX(1 + stretch);
        setRingScaleY(1 - stretch * 0.5);
      } else {
        setRingScaleX(1);
        setRingScaleY(1);
      }

      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
    });

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }

      // Zero-latency instant placement for dot
      setDotX(mouse.x);
      setDotY(mouse.y);

      // Smooth physics trailing for ring
      setRingX(mouse.x);
      setRingY(mouse.y);
    };

    const handlePointerDown = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.15, ease: 'power2.out' });
      gsap.to(ring, { scale: 0.75, duration: 0.15, ease: 'power2.out' });
    };

    const handlePointerUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'elastic.out(1.2, 0.4)' });
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'elastic.out(1.2, 0.4)' });
    };

    const handlePointerLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const handlePointerEnter = () => {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    // Contextual Hover Detection
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
      gsap.ticker.remove(ticker);
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
      {/* Precision Center Micro-Dot (Immediate zero-latency response) */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full transition-colors duration-200 hidden md:block opacity-0 ${
          cursorType === 'text'
            ? 'h-1.5 w-1.5 bg-brand-lime shadow-glow-lime'
            : cursorType === 'hover'
            ? 'h-2 w-2 bg-brand-accent shadow-glow-cyan'
            : 'h-1.5 w-1.5 bg-white'
        }`}
      />

      {/* Kinetic Fluid Trailing Ring with Velocity Deformation & Dynamic Morphing */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full transition-all duration-300 ease-out hidden md:flex opacity-0 will-change-transform ${
          cursorType === 'text'
            ? 'h-20 w-20 bg-black/85 border border-brand-accent/70 backdrop-blur-md shadow-glow-cyan scale-100'
            : cursorType === 'hover'
            ? 'h-12 w-12 bg-white/10 border border-brand-accent/80 backdrop-blur-xs scale-110 shadow-glow-cyan'
            : 'h-9 w-9 border border-white/30 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase text-center px-2 select-none animate-pulse"
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
