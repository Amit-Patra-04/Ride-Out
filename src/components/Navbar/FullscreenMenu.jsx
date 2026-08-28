import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EASING, sfx } from '../../utils/animations';
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Volume2,
  VolumeX,
  Flame,
  Compass,
} from 'lucide-react';

const MENU_ITEMS = [
  {
    id: '01',
    title: 'THE FLEET',
    subtitle: 'Cyberpunk Hypercars & Stealth Cruisers',
    href: '#fleet',
    tag: '4 MODELS ACTIVE',
    color: '#00F0FF',
    previewImg: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
    stat: '0-100 km/h: 1.8s',
  },
  {
    id: '02',
    title: 'EXPEDITIONS',
    subtitle: 'High-Altitude & Neon Megacity Routes',
    href: '#expeditions',
    tag: 'GLOBAL DESTINATIONS',
    color: '#CCFF00',
    previewImg: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80',
    stat: '14,200+ KM CHARTERED',
  },
  {
    id: '03',
    title: 'NEURAL DRIVE',
    subtitle: 'Autonomous Level-5 Intelligence',
    href: '#technology',
    tag: 'AI TELEMETRY',
    color: '#FF5500',
    previewImg: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    stat: '99.999% LATENCY <1MS',
  },
  {
    id: '04',
    title: 'BLACK PASS',
    subtitle: 'Exclusive Concierge & Private Terminals',
    href: '#membership',
    tag: 'INVITE ONLY',
    color: '#9945FF',
    previewImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    stat: 'TIER-1 ACCESS',
  },
  {
    id: '05',
    title: 'MANIFESTO',
    subtitle: 'Next-Gen Sustainable Speed & Vision',
    href: '#manifesto',
    tag: 'CARBON NEGATIVE',
    color: '#00E599',
    previewImg: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80',
    stat: '100% CLEAN KINETICS',
  },
];

export const FullscreenMenu = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const pathRef = useRef(null);
  const contentRef = useRef(null);
  const itemsRef = useRef([]);
  const previewRef = useRef(null);
  
  const [activeItem, setActiveItem] = useState(MENU_ITEMS[0]);
  const [isMuted, setIsMuted] = useState(false);

  // SVG Morphing Curve Coordinates
  // Initial (Closed): Top flat line
  // Mid: Hanging bezier wave curve
  // End (Open): Full screen flat line
  const startPath = 'M 0 0 V 0 Q 50 0 100 0 V 0 Z';
  const midPath = 'M 0 0 V 70 Q 50 100 100 70 V 0 Z';
  const endPath = 'M 0 0 V 100 Q 50 100 100 100 V 0 Z';

  const reverseMidPath = 'M 0 0 V 100 Q 50 30 100 100 V 0 Z';

  useEffect(() => {
    const overlay = overlayRef.current;
    const path = pathRef.current;
    const content = contentRef.current;
    const links = itemsRef.current.filter(Boolean);

    if (!overlay || !path || !content) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.killTweensOf([overlay, path, content, links]);
      gsap.set(overlay, { display: 'block', pointerEvents: 'auto' });
      gsap.set(content, { opacity: 0, y: 30 });
      gsap.set(links, { yPercent: 120, rotateX: -30, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: EASING.curtain } });

      tl.to(path, {
        attr: { d: midPath },
        duration: 0.45,
        ease: 'power3.in',
      })
        .to(path, {
          attr: { d: endPath },
          duration: 0.4,
          ease: 'power3.out',
        })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: EASING.smooth,
          },
          '-=0.3'
        )
        .to(
          links,
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.6,
            ease: EASING.cinematic,
          },
          '-=0.3'
        );
    } else {
      document.body.style.overflow = '';

      const links = itemsRef.current.filter(Boolean);
      const tl = gsap.timeline({
        defaults: { ease: EASING.curtain },
        onComplete: () => {
          gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
        },
      });

      tl.to(links, {
        yPercent: -80,
        opacity: 0,
        stagger: 0.03,
        duration: 0.3,
        ease: EASING.smooth,
      })
        .to(
          content,
          {
            opacity: 0,
            y: -20,
            duration: 0.25,
            ease: 'power2.in',
          },
          '-=0.2'
        )
        .to(path, {
          attr: { d: reverseMidPath },
          duration: 0.35,
          ease: 'power3.in',
        })
        .to(path, {
          attr: { d: startPath },
          duration: 0.35,
          ease: 'power3.out',
        });
    }
  }, [isOpen]);

  // Preview Image Parallax Follower
  const handleMenuMouseMove = (e) => {
    if (!previewRef.current) return;
    const { clientX, clientY } = e;
    const xRatio = (clientX / window.innerWidth - 0.5) * 30;
    const yRatio = (clientY / window.innerHeight - 0.5) * 30;

    gsap.to(previewRef.current, {
      x: xRatio,
      y: yRatio,
      rotateY: xRatio * 0.5,
      rotateX: -yRatio * 0.5,
      duration: 0.6,
      ease: EASING.smooth,
    });
  };

  const handleLinkHover = (item) => {
    sfx.playHover();
    setActiveItem(item);
  };

  const handleSoundToggle = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      ref={overlayRef}
      onMouseMove={handleMenuMouseMove}
      className="fixed inset-0 z-[100] hidden overflow-hidden select-none"
    >
      {/* SVG Morphing Canvas */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="menuBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a0c12" />
            <stop offset="50%" stopColor="#08090d" />
            <stop offset="100%" stopColor="#050608" />
          </linearGradient>
          <filter id="glowNoise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.03 0" />
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d={startPath}
          fill="url(#menuBgGrad)"
          className="filter drop-shadow-[0_20px_50px_rgba(0,240,255,0.15)]"
        />
      </svg>

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-16 max-w-7xl mx-auto opacity-0"
      >
        {/* Top Header Bar inside Overlay */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-brand-accent animate-ping" />
            <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
              RIDE-OUT // MAIN SYSTEM DIRECTORY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSoundToggle}
              data-cursor="AUDIO"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-brand-accent transition-all duration-200"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-brand-accent" />}
              <span>{isMuted ? 'AUDIO: MUTED' : 'AUDIO: ON'}</span>
            </button>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-xs font-mono font-bold tracking-wider uppercase">CLOSE</span>
              <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>
        </div>

        {/* Center Grid: Navigation Links + Dynamic Live Visual Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center py-6">
          {/* Menu Items List */}
          <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-4">
            {MENU_ITEMS.map((item, idx) => {
              const isCurrent = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className="perspective-1000 overflow-hidden"
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      sfx.playClick();
                      onClose();
                    }}
                    onMouseEnter={() => handleLinkHover(item)}
                    data-cursor="ENTER"
                    className={`group flex items-center justify-between py-2 sm:py-3 px-4 sm:px-6 rounded-2xl transition-all duration-300 border ${
                      isCurrent
                        ? 'bg-white/[0.04] border-white/20 translate-x-3 shadow-glass'
                        : 'border-transparent hover:border-white/10 hover:translate-x-2'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-xs sm:text-sm transition-colors duration-300 ${
                          isCurrent ? 'text-brand-accent font-bold' : 'text-zinc-500 group-hover:text-zinc-400'
                        }`}
                      >
                        {item.id}
                      </span>
                      <div>
                        <h2
                          className={`font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight transition-all duration-300 ${
                            isCurrent
                              ? 'text-white scale-102'
                              : 'text-zinc-400 group-hover:text-white'
                          }`}
                        >
                          {item.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono tracking-wider text-zinc-300 bg-white/5 rounded-full border border-white/10 group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-all">
                        {item.tag}
                      </span>
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isCurrent
                            ? 'bg-brand-accent text-black border-brand-accent scale-110 shadow-glow-cyan'
                            : 'bg-white/5 text-zinc-400 border-white/10 group-hover:bg-white/20 group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Right Visual Spotlight Card */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center">
            <div
              ref={previewRef}
              className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 p-2 bg-zinc-900/60 backdrop-blur-2xl shadow-2xl transition-all duration-500"
              style={{
                boxShadow: `0 25px 60px -15px ${activeItem.color}25, inset 0 1px 0 rgba(255,255,255,0.2)`,
              }}
            >
              {/* Dynamic Image with Crossfade */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img
                  src={activeItem.previewImg}
                  alt={activeItem.title}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 contrast-110"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div
                  className="absolute inset-0 opacity-20 mix-blend-color-dodge transition-colors duration-500"
                  style={{ backgroundColor: activeItem.color }}
                />

                {/* Badge & Telemetry pill */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase rounded-full backdrop-blur-md border text-white"
                    style={{
                      backgroundColor: `${activeItem.color}30`,
                      borderColor: activeItem.color,
                    }}
                  >
                    {activeItem.tag}
                  </span>
                </div>

                {/* Bottom Card Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      TELEMETRY DATA
                    </div>
                    <div className="text-lg font-display font-bold text-white tracking-wide mt-0.5">
                      {activeItem.stat}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[11px] font-mono text-zinc-300">
                    <Radio className="w-3 h-3 text-brand-lime animate-pulse" />
                    LIVE FEED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Telemetry & Socials */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>FLEET SYSTEM STATUS: NOMINAL</span>
            </div>
            <div className="hidden sm:block text-zinc-600">|</div>
            <div className="hidden sm:flex items-center gap-3 text-zinc-400">
              <span>LON 13:45</span>
              <span>NYC 08:45</span>
              <span>TYO 22:45</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {['INSTAGRAM', 'TWITTER / X', 'DISCORD', 'GITHUB'].map((soc) => (
              <a
                key={soc}
                href={`#${soc.toLowerCase()}`}
                data-cursor="LINK"
                className="hover:text-brand-accent transition-colors duration-200"
              >
                {soc}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
