import React, { useRef } from 'react';
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
        opacity: 0,
        stagger: 0.015,
        duration: 0.3,
        ease: EASING.smooth,
        overwrite: 'auto',
      });

      gsap.fromTo(
        bottomChars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.015,
          duration: 0.3,
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
        opacity: 1,
        stagger: 0.01,
        duration: 0.25,
        ease: EASING.smooth,
        overwrite: 'auto',
      });

      gsap.to(bottomChars, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.01,
        duration: 0.25,
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
      data-cursor="GOTO"
      className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full select-none cursor-pointer flex items-center gap-1.5 ${
        isActive ? 'text-white font-medium' : 'text-zinc-400 hover:text-zinc-100'
      }`}
    >
      <div className="relative overflow-hidden inline-block h-4 leading-4">
        {/* Top layer */}
        <div ref={textTopRef} className="flex">
          {letters.map((char, i) => (
            <span
              key={`top-${i}`}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Bottom layer */}
        <div
          ref={textBottomRef}
          aria-hidden="true"
          className="flex absolute top-0 left-0 text-brand-accent font-medium pointer-events-none"
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
        <span className="px-1.5 py-0.2 text-[8px] font-mono uppercase bg-brand-accent/15 text-brand-accent border border-brand-accent/30 rounded">
          {badge}
        </span>
      )}
    </a>
  );
};

