import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NavLink } from './NavLink';
import { MagneticButton } from './MagneticButton';
import { FullscreenMenu } from './FullscreenMenu';
import { EASING, sfx } from '../../utils/animations';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  Flame,
  Layers,
  Sparkles,
} from 'lucide-react';

const NAV_LINKS = [
  { label: '3D AERO LAB', href: '#hero-3d', badge: '3D WEBGL' },
  { label: 'SPECIFICATIONS', href: '#specifications' },
  { label: 'GEOMETRY', href: '#geometry' },
  { label: 'WIND TUNNEL', href: '#windtunnel' },
  { label: 'CONFIGURATOR', href: '#configurator', badge: 'STUDIO' },
  { label: 'HERITAGE', href: '#heritage' },
];

export const Navbar = ({ onBookRideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('3D AERO LAB');
  const [isMuted, setIsMuted] = useState(false);

  const navContainerRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: EASING.smooth,
        delay: 0.2,
      }
    );
  }, []);

  const handleLinkHover = (targetElement) => {
    if (!indicatorRef.current || !targetElement || !linksContainerRef.current) return;

    const containerRect = linksContainerRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const left = targetRect.left - containerRect.left;
    const width = targetRect.width;

    gsap.to(indicatorRef.current, {
      x: left,
      width: width,
      opacity: 1,
      duration: 0.3,
      ease: EASING.smooth,
    });
  };

  const handleLinksContainerLeave = () => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
    if (!muted) sfx.playClick();
  };

  return (
    <>
      <header
        ref={navContainerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-6 md:px-8 pointer-events-none pt-4 sm:pt-6"
      >
        <div
          className={`mx-auto pointer-events-auto transition-all duration-400 ease-out flex items-center justify-between ${
            isScrolled
              ? 'max-w-5xl rounded-full px-4 sm:px-6 py-2.5 glass-panel border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.5)] bg-obsidian-surface/90 backdrop-blur-2xl'
              : 'max-w-7xl rounded-full px-5 sm:px-8 py-3.5 glass-panel border-white/[0.06] bg-obsidian-base/70 backdrop-blur-xl'
          }`}
        >
          {/* Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-3 group select-none"
            onClick={() => sfx.playClick()}
          >
            <div className="h-7 w-7 rounded-lg bg-[#FF3B00]/15 border border-[#FF3B00]/40 flex items-center justify-center text-[#FF5E0E] group-hover:border-[#FF3B00] group-hover:scale-105 transition-all duration-300 shadow-glow-crimson">
              <span className="font-display font-black text-xs text-white">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-white uppercase group-hover:text-[#FF5E0E] transition-colors duration-200">
                PINARELLO
              </span>
              <span className="text-[9px] font-mono text-zinc-400 tracking-widest -mt-0.5">
                DOGMA F <span className="text-[#FF5E0E]">M40X</span>
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav
            ref={linksContainerRef}
            onMouseLeave={handleLinksContainerLeave}
            className="relative hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04]"
          >
            <div
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 rounded-full bg-white/[0.08] border border-white/[0.12] pointer-events-none opacity-0"
              style={{ width: 0 }}
            />

            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                badge={link.badge}
                isActive={activeLink === link.label}
                onClick={() => {
                  setActiveLink(link.label);
                  sfx.playHover();
                }}
                onMouseEnter={(e) => handleLinkHover(e.currentTarget)}
              />
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200"
              title={isMuted ? 'Unmute Mechanical Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />
              )}
            </button>

            {/* Atelier Reservation CTA Button */}
            <MagneticButton strength={0.2}>
              <button
                onClick={() => {
                  sfx.playClick();
                  if (onBookRideClick) onBookRideClick();
                }}
                className="relative group overflow-hidden rounded-full px-4 sm:px-5 py-2 bg-gradient-to-r from-[#FF3B00] via-[#FF5E0E] to-[#FF3B00] bg-[length:200%_auto] text-white font-mono text-[11px] uppercase tracking-wider font-bold transition-all duration-300 shadow-glow-crimson hover:shadow-glow-crimson/80 flex items-center gap-2"
              >
                <span>RESERVE BUILD</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </MagneticButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sfx.playClick();
                setIsMenuOpen(true);
              }}
              className="flex lg:hidden items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white"
              aria-label="Open Navigation"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="w-4 h-0.5 bg-white rounded-full"></span>
                <span className="w-2.5 h-0.5 bg-[#FF5E0E] rounded-full"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Curtain Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
