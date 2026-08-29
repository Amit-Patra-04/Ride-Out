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
  ArrowRight,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'MODELS', href: '#models', badge: 'HYPER' },
  { label: 'CHASSIS', href: '#chassis' },
  { label: 'EXPEDITIONS', href: '#expeditions' },
  { label: 'BLACK PASS', href: '#blackpass' },
  { label: 'TERMINALS', href: '#terminals' },
];

export const Navbar = ({ onBookRideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('MODELS');
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
              ? 'max-w-4xl rounded-full px-4 sm:px-5 py-2 glass-panel border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.4)] bg-obsidian-surface/80 backdrop-blur-2xl'
              : 'max-w-6xl rounded-full px-5 sm:px-7 py-3 glass-panel border-white/[0.06] bg-obsidian-base/60 backdrop-blur-xl'
          }`}
        >
          {/* Brand Identity */}
          <a
            href="#"
            data-cursor="HOME"
            className="flex items-center gap-2.5 group select-none"
            onClick={() => sfx.playClick()}
          >
            <div className="h-6 w-6 rounded-md bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent group-hover:border-brand-accent transition-all duration-300">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-brand-accent transition-colors duration-200">
              RIDE<span className="text-brand-accent">·</span>OUT
            </span>
          </a>

          {/* Desktop Center Links */}
          <nav
            ref={linksContainerRef}
            onMouseLeave={handleLinksContainerLeave}
            className="relative hidden md:flex items-center gap-0.5 px-2 py-1 rounded-full bg-white/[0.02] border border-white/[0.04]"
          >
            <div
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 rounded-full bg-white/[0.06] border border-white/[0.1] pointer-events-none opacity-0"
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
          <div className="flex items-center gap-2">
            {/* Audio Toggle with Live Waveform */}
            <button
              onClick={toggleSound}
              data-cursor={isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
              className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-brand-accent hover:border-brand-accent/40 transition-all duration-200"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              ) : (
                <div className="flex items-center gap-0.5">
                  <span className="h-2 w-0.5 bg-brand-accent rounded-full animate-pulse" />
                  <span className="h-3 w-0.5 bg-brand-accent rounded-full animate-pulse delay-75" />
                  <span className="h-1.5 w-0.5 bg-brand-accent rounded-full animate-pulse delay-150" />
                </div>
              )}
            </button>

            {/* Micro Dispatch CTA */}
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                if (onBookRideClick) onBookRideClick();
              }}
              dataCursor="DISPATCH"
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/40 hover:bg-brand-accent hover:text-black text-brand-accent font-mono font-medium text-xs tracking-wider transition-all duration-300 group"
            >
              <span>DISPATCH</span>
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
            </MagneticButton>

            {/* Kinetic Hamburger Menu */}
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                setIsMenuOpen(true);
              }}
              dataCursor="MENU"
              className="h-8 w-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-brand-accent/40 text-white transition-all duration-200"
            >
              <div className="flex flex-col gap-1 items-center justify-center w-4">
                <span className="w-3.5 h-0.5 bg-zinc-300 rounded-full transition-all group-hover:w-4 group-hover:bg-brand-accent" />
                <span className="w-4 h-0.5 bg-zinc-300 rounded-full transition-all group-hover:bg-brand-accent" />
              </div>
            </MagneticButton>
          </div>
        </div>
      </header>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

