import React, { useRef } from 'react';
import { sfx } from '../../utils/animations';

export const NavLink = ({
  href = '#',
  label,
  isActive = false,
  badge,
  onClick,
  onHover,
  onMouseEnter,
}) => {
  const linkRef = useRef(null);

  const handleMouseEnter = (e) => {
    sfx.playHover();
    if (onHover) onHover(linkRef.current);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e) => {
    sfx.playClick();
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      data-cursor="GOTO"
      className={`group relative px-2.5 sm:px-3 py-1 text-[11px] font-mono font-medium tracking-wider transition-all duration-200 rounded-full select-none cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
        isActive
          ? 'text-white font-semibold'
          : 'text-zinc-400 hover:text-white'
      }`}
    >
      <span className="relative z-10 transition-all duration-200 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
        {label}
      </span>

      {isActive && (
        <span className="w-1 h-1 rounded-full bg-[#FF3B00] shadow-[0_0_8px_#FF3B00] animate-pulse" />
      )}

      {badge && (
        <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase bg-[#FF3B00]/15 text-[#FF5E0E] border border-[#FF3B00]/30 rounded">
          {badge}
        </span>
      )}
    </a>
  );
};

