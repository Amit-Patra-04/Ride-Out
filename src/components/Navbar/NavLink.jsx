import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { EASING, sfx } from '../../utils/animations';

export const NavLink = ({
  href = '#',
  label,
  isActive = false,
  badge,
  onClick,
  onHover,
}) => {
  const linkRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);

  const letters = label.split('');

  const handleMouseEnter = () => {
    sfx.playHover();
    if (onHover) onHover(linkRef.current);

    const topChars = textTopRef.current?.children;
    const bottomChars = textBottomRef.current?.children;

    if (topChars && bottomChars) {
      gsap.to(topChars, {
        yPercent: -120,
        rotateX: -45,
        opacity: 0,
        stagger: 0.02,
        duration: 0.4,
        ease: EASING.smooth,
        overwrite: 'auto',
      });

      gsap.fromTo(
        bottomChars,
        { yPercent: 120, rotateX: 45, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.4,
          ease: EASING.smooth,
          overwrite: 'auto',
        }
      );
    }
  };

  const handleMouseLeave = () => {
    const topChars = textTopRef.current?.children;
    const bottomChars = textBottomRef.current?.children;

    if (topChars && bottomChars) {
      gsap.to(topChars, {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        stagger: 0.015,
        duration: 0.35,
        ease: EASING.smooth,
        overwrite: 'auto',
      });

      gsap.to(bottomChars, {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        stagger: 0.015,
        duration: 0.35,
        ease: EASING.smooth,
        overwrite: 'auto',
      });
    }
  };

  const handleClick = (e) => {
    sfx.playClick();
    if (onClick) onClick(e);
  };

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="EXPLORE"
      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full select-none cursor-pointer flex items-center gap-1.5 ${
        isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
      }`}
    >
      <div className="relative overflow-hidden inline-block h-5 leading-5 perspective-500">
        {/* Top layer (default visible) */}
        <div ref={textTopRef} className="flex">
          {letters.map((char, i) => (
            <span
              key={`top-${i}`}
              className="inline-block transition-transform duration-200"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Bottom layer (slides in on hover with accent glow) */}
        <div
          ref={textBottomRef}
          aria-hidden="true"
          className="flex absolute top-0 left-0 text-brand-accent font-semibold pointer-events-none"
        >
          {letters.map((char, i) => (
            <span
              key={`bottom-${i}`}
              className="inline-block transform translate-y-full opacity-0"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {badge && (
        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-tight bg-brand-accent/15 text-brand-accent border border-brand-accent/30 rounded-full animate-pulse">
          {badge}
        </span>
      )}
    </a>
  );
};
