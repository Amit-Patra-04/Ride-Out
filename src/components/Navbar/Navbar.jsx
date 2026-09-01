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
} from 'lucide-react';

const NAV_LINKS = [
  { label: '3D AERO', href: '#hero-3d' },
  { label: 'SPECS', href: '#specifications' },
  { label: 'GEOMETRY', href: '#geometry' },
  { label: 'WIND TUNNEL', href: '#windtunnel' },
  { label: 'ATELIER', href: '#configurator' },
  { label: 'HERITAGE', href: '#heritage' },
];

export const Navbar = ({ onBookRideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('3D AERO');
  const [isMuted, setIsMuted] = useState(false);

  const navContainerRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 25;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => ({
      id: link.href.replace('#', ''),
      label: link.label,
    }));

    const handleScrollSections = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveLink(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSections, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSections);
  }, []);

  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: EASING.smooth,
        delay: 0.15,
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
      duration: 0.25,
      ease: EASING.smooth,
    });
  };

  const handleLinksContainerLeave = () => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.2,
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-3 sm:px-6 pointer-events-none pt-3 sm:pt-4 flex justify-center"
      >
        <div
          className={`w-full max-w-5xl pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 ${
            isScrolled ? 'glass-navbar-scrolled' : 'glass-navbar'
          }`}
        >
          {/* Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-2.5 group select-none flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              sfx.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#FF3B00]/25 to-[#FF5E0E]/10 border border-[#FF3B00]/40 flex items-center justify-center text-[#FF5E0E] group-hover:border-[#FF3B00] group-hover:shadow-[0_0_15px_rgba(255,59,0,0.5)] group-hover:scale-105 transition-all duration-300">
              <span className="font-display font-black text-xs text-white">P</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xs sm:text-sm tracking-[0.18em] text-white uppercase group-hover:text-[#FF5E0E] transition-colors duration-200">
                PINARELLO
              </span>
              <span className="hidden md:inline-block text-[9px] font-mono text-zinc-400 tracking-widest pl-2 border-l border-white/10 font-normal">
                DOGMA <span className="text-[#FF5E0E] font-semibold">F</span>
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav
            ref={linksContainerRef}
            onMouseLeave={handleLinksContainerLeave}
            className="relative hidden lg:flex items-center gap-0.5 px-2 py-1 rounded-full glass-nav-pill"
          >
            <div
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 rounded-full bg-white/[0.08] border border-white/[0.12] pointer-events-none opacity-0 shadow-sm transition-opacity"
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
                }}
                onMouseEnter={(e) => handleLinkHover(e.currentTarget)}
              />
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
              title={isMuted ? 'Unmute Mechanical Audio' : 'Mute Audio'}
              aria-label="Toggle Audio"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />
              )}
            </button>

            {/* Atelier Reservation CTA Button */}
            <MagneticButton
              strength={0.2}
              onClick={() => {
                sfx.playClick();
                if (onBookRideClick) onBookRideClick();
              }}
              className="rounded-full px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[#FF3B00] via-[#FF5E0E] to-[#FF3B00] bg-[length:200%_auto] text-white font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold shadow-[0_0_14px_rgba(255,59,0,0.35)] hover:shadow-[0_0_20px_rgba(255,59,0,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>RESERVE</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sfx.playClick();
                setIsMenuOpen(true);
              }}
              className="flex lg:hidden items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="w-3.5 h-[1.5px] bg-white rounded-full"></span>
                <span className="w-2 h-[1.5px] bg-[#FF5E0E] rounded-full"></span>
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
