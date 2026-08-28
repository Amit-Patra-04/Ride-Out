import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { EASING, sfx } from '../../utils/animations';

export const MagneticButton = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
  dataCursor,
  variant = 'primary',
  ...props
}) => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    const content = contentRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic movement of container
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        rotateX: -y * 0.05,
        rotateY: x * 0.05,
        duration: 0.35,
        ease: EASING.smooth,
      });

      // Subtle parallax on inner content
      if (content) {
        gsap.to(content, {
          x: x * (strength * 0.5),
          y: y * (strength * 0.5),
          duration: 0.35,
          ease: EASING.smooth,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: EASING.elastic,
      });

      if (content) {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: EASING.elastic,
        });
      }
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const handleMouseEnter = () => {
    sfx.playHover();
  };

  const handleClick = (e) => {
    sfx.playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      data-cursor={dataCursor}
      className={`relative group inline-flex items-center justify-center overflow-hidden transition-all duration-300 transform-gpu ${className}`}
      {...props}
    >
      <span ref={contentRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
