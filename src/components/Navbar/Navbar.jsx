import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NavLink } from './NavLink';
import { MagneticButton } from './MagneticButton';
import { FullscreenMenu } from './FullscreenMenu';
import { EASING, sfx } from '../../utils/animations';
import {
  Zap,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  Menu,
  Shield,
  Layers,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'FLEET', href: '#fleet', badge: 'HYPER' },
  { label: 'EXPEDITIONS', href: '#expeditions' },
  { label: 'INTELLIGENCE', href: '#intelligence' },
  { label: 'MEMBERSHIP', href: '#membership' },
  { label: 'ABOUT', href: '#about' },
];

export const Navbar = ({ onBookRideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('FLEET');
  const [isMuted, setIsMuted] = useState(false);

  const navContainerRef = useRef(null);
  const navPillRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksContainerRef = useRef(null);

  // Scroll listener for dynamic capsule morphing
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 40;

      setIsScrolled(scrolled);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for initial entrance
  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: EASING.cinematic,
        delay: 0.2,
      }
    );
  }, []);

  // Sliding dynamic magnetic indicator pill for desktop links
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
      duration: 0.35,
      ease: EASING.smooth,
    });
  };

  const handleLinksContainerLeave = () => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header
        ref={navContainerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-6 md:px-8 pointer-events-none ${
          isScrolled ? 'pt-3 sm:pt-4' : 'pt-5 sm:pt-7'
        }`}
      >
        <div
          ref={navPillRef}
          className={`mx-auto pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
            isScrolled
              ? 'max-w-5xl rounded-full px-4 sm:px-6 py-2.5 glass-panel-glow border-white/15 shadow-2xl bg-[#08090eb8] backdrop-blur-2xl'
              : 'max-w-7xl rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-3.5 sm:py-4 bg-[#080a0f50] backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            data-cursor="HOME"
            className="flex items-center gap-3 group select-none"
            onClick={() => sfx.playClick()}
          >
            <div className="relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-lime/10 border border-white/20 group-hover:border-brand-accent transition-all duration-300 shadow-glow-cyan/20 group-hover:shadow-glow-cyan overflow-hidden">
              <Zap className="w-5 h-5 text-brand-accent transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-accent transition-colors duration-300">
                  RIDE<span className="text-brand-accent">·</span>OUT
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider bg-white/10 text-zinc-300 rounded border border-white/10">
                  v2.6
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase -mt-0.5 hidden xs:block">
                QUANTUM FLEET
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav
            ref={linksContainerRef}
            onMouseLeave={handleLinksContainerLeave}
            className="relative hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
          >
            {/* Smooth Floating Indicator Pill */}
            <div
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-brand-accent/15 to-brand-lime/15 border border-brand-accent/30 pointer-events-none opacity-0 shadow-glow-cyan/30"
              style={{ width: 0 }}
            />

            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                badge={link.badge}
                isActive={activeLink === link.label}
                onClick={() => setActiveLink(link.label)}
                onHover={handleLinkHover}
              />
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Ambient Sound FX Toggle */}
            <button
              onClick={toggleSound}
              data-cursor={isMuted ? 'UNMUTE' : 'MUTE'}
              title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
              className="hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-600" />
              ) : (
                <div className="flex items-center gap-0.5">
                  <span className="h-2 w-0.5 bg-brand-accent rounded-full animate-pulse" />
                  <span className="h-3.5 w-0.5 bg-brand-accent rounded-full animate-pulse delay-75" />
                  <span className="h-1.5 w-0.5 bg-brand-accent rounded-full animate-pulse delay-150" />
                </div>
              )}
            </button>

            {/* Magnetic CTA Action Button */}
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                if (onBookRideClick) onBookRideClick();
              }}
              dataCursor="LAUNCH"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-brand-accent via-cyan-400 to-brand-lime text-black font-semibold text-xs sm:text-sm tracking-wide shadow-glow-cyan hover:shadow-glow-lime transform hover:scale-105 transition-all duration-300 group font-sans"
            >
              <span className="font-bold tracking-tight">BOOK RIDE</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            {/* Morphing Hamburger Menu Trigger */}
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                setIsMenuOpen(true);
              }}
              dataCursor="MENU"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-brand-accent/50 text-white transition-all duration-300"
            >
              <div className="flex flex-col gap-1.5 items-center justify-center w-5">
                <span className="w-4 h-0.5 bg-white rounded-full transition-all group-hover:w-5 group-hover:bg-brand-accent" />
                <span className="w-5 h-0.5 bg-white rounded-full transition-all group-hover:bg-brand-accent" />
                <span className="w-3 h-0.5 bg-white rounded-full transition-all group-hover:w-5 group-hover:bg-brand-accent" />
              </div>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Awwwards Fullscreen Kinetic Menu Overlay */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
