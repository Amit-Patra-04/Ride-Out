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
  className = '',
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
      className={`group relative px-2 sm:px-2.5 py-1 text-[10.5px] font-mono font-medium tracking-wider transition-all duration-200 rounded-full select-none cursor-pointer flex items-center justify-center whitespace-nowrap ${
        isActive
          ? 'text-white font-semibold'
          : 'text-zinc-400 hover:text-white'
      } ${className}`}
    >
      <span className="relative z-10 transition-all duration-200 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
        {label}
      </span>

      {/* Zero-layout-shift active indicator underline bar */}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#E4002B] shadow-[0_0_6px_#E4002B] transition-all duration-300 pointer-events-none ${
          isActive ? 'w-2.5 opacity-100' : 'w-0 opacity-0'
        }`}
      />

      {badge && (
        <span className="ml-1 px-1 py-0.2 text-[7.5px] font-mono uppercase bg-[#FF3B00]/15 text-[#FF5E0E] border border-[#FF3B00]/30 rounded">
          {badge}
        </span>
      )}
    </a>
  );
};


