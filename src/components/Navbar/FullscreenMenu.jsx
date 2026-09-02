import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EASING, sfx } from '../../utils/animations';
import {
  X,
  ArrowUpRight,
  Radio,
  Volume2,
  VolumeX,
} from 'lucide-react';

const MENU_ITEMS = [
  {
    id: '01',
    title: '3D AERO LAB',
    subtitle: 'TorayCa M40X 3D Stage & 360° Studio Showcase',
    href: '#hero-3d',
    tag: '3D WEBGL ENGINE',
    color: '#E4002B',
    stat: '6.77 KG TOTAL WEIGHT',
  },
  {
    id: '02',
    title: 'OFFICIAL MODELS',
    subtitle: 'Dura-Ace, SRAM RED, Campagnolo & WorldTour Replicas',
    href: '#models',
    tag: 'FACTORY LINEUP',
    color: '#00C4D4',
    stat: '5 FLAGSHIP BUILDS',
  },
  {
    id: '03',
    title: 'R&D INNOVATIONS',
    subtitle: 'Carbon M40X, Aero-Keel BB & 9 Engineering Breakthroughs',
    href: '#innovations',
    tag: 'VIDEO TELEMETRY',
    color: '#FF5E0E',
    stat: '+12% BB STIFFNESS',
  },
  {
    id: '04',
    title: 'SPECIFICATIONS',
    subtitle: 'TorayCa M40X, Onda Fork, TiCR Routing & Dura-Ace',
    href: '#specifications',
    tag: 'WORLDTOUR BLUEPRINT',
    color: '#00F0FF',
    stat: 'DISC CHASSIS',
  },
  {
    id: '05',
    title: 'WIND TUNNEL SIM',
    subtitle: 'Real-Time Aerodynamics & Watt Savings Telemetry',
    href: '#windtunnel',
    tag: 'CFD FLOW ANALYSIS',
    color: '#D4FF00',
    stat: '-3.2W AT 40 KM/H',
  },
  {
    id: '06',
    title: 'ATELIER CONFIGURATOR',
    subtitle: 'Custom Paint, Dura-Ace / SRAM / Campy Groupsets',
    href: '#configurator',
    tag: 'BESPOKE BUILD POD',
    color: '#E5A93C',
    stat: '100% ITALIAN ATELIER',
  },
  {
    id: '07',
    title: 'EDITORIAL GALLERY',
    subtitle: 'High-Resolution Alpine Passes & Studio Photography',
    href: '#gallery',
    tag: 'PHOTO ARCHIVE',
    color: '#FFD166',
    stat: '5 PRO PASSES',
  },
  {
    id: '08',
    title: 'TOUR DYNASTY',
    subtitle: '15× Tour de France Victories & Filippo Ganna Hour Record',
    href: '#heritage',
    tag: 'PALMARES RECORD',
    color: '#E4002B',
    stat: '56.792 KM/H RECORD',
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
      gsap.set(content, { opacity: 0, y: 20 });
      gsap.set(links, { yPercent: 80, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: EASING.curtain } });

      tl.to(path, {
        attr: { d: midPath },
        duration: 0.4,
        ease: 'power3.in',
      })
        .to(path, {
          attr: { d: endPath },
          duration: 0.35,
          ease: 'power3.out',
        })
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: EASING.smooth,
          },
          '-=0.25'
        )
        .to(
          links,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.45,
            ease: EASING.smooth,
          },
          '-=0.2'
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
        yPercent: -60,
        opacity: 0,
        stagger: 0.02,
        duration: 0.25,
        ease: EASING.smooth,
      })
        .to(
          content,
          {
            opacity: 0,
            y: -15,
            duration: 0.2,
            ease: 'power2.in',
          },
          '-=0.15'
        )
        .to(path, {
          attr: { d: reverseMidPath },
          duration: 0.3,
          ease: 'power3.in',
        })
        .to(path, {
          attr: { d: startPath },
          duration: 0.3,
          ease: 'power3.out',
        });
    }
  }, [isOpen]);

  const handleMenuMouseMove = (e) => {
    if (!previewRef.current) return;
    const { clientX, clientY } = e;
    const xRatio = (clientX / window.innerWidth - 0.5) * 20;
    const yRatio = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(previewRef.current, {
      x: xRatio,
      y: yRatio,
      duration: 0.5,
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
    if (!muted) sfx.playClick();
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
            <stop offset="0%" stopColor="#080a0f" />
            <stop offset="50%" stopColor="#06070a" />
            <stop offset="100%" stopColor="#030406" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={startPath}
          fill="url(#menuBgGrad)"
          className="filter drop-shadow-[0_20px_50px_rgba(0,240,255,0.08)]"
        />
      </svg>

      {/* Main Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-6xl mx-auto opacity-0"
      >
        {/* Header inside Overlay */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
              RIDE-OUT // DIRECTORY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSoundToggle}
              data-cursor="AUDIO"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-white hover:border-brand-accent/40 transition-all duration-200"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-brand-accent" />}
              <span>{isMuted ? 'MUTE' : 'AUDIO'}</span>
            </button>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <span className="text-xs font-mono font-medium tracking-wider uppercase">CLOSE</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Grid: Navigation Links + Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center py-4">
          <div className="lg:col-span-7 flex flex-col space-y-2">
            {MENU_ITEMS.map((item, idx) => {
              const isCurrent = activeItem.id === item.id;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className="overflow-hidden"
                >
                  <a
                    href={item.href}
                    onClick={() => {
                      sfx.playClick();
                      onClose();
                    }}
                    onMouseEnter={() => handleLinkHover(item)}
                    data-cursor="ENTER"
                    className={`group flex items-center justify-between py-2.5 px-4 rounded-xl transition-all duration-250 border ${
                      isCurrent
                        ? 'bg-white/[0.03] border-white/[0.12] translate-x-2'
                        : 'border-transparent hover:border-white/[0.06] hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs transition-colors duration-200 ${
                          isCurrent ? 'text-brand-accent font-semibold' : 'text-zinc-500'
                        }`}
                      >
                        {item.id}
                      </span>
                      <div>
                        <h2
                          className={`font-display text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-200 ${
                            isCurrent ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                          }`}
                        >
                          {item.title}
                        </h2>
                        <p className="text-xs text-zinc-500 font-sans mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono tracking-wider text-zinc-400 bg-white/[0.02] rounded border border-white/[0.06]">
                        {item.tag}
                      </span>
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                          isCurrent
                            ? 'bg-brand-accent text-black border-brand-accent'
                            : 'bg-white/[0.02] text-zinc-400 border-white/[0.06] group-hover:text-white'
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
              className="relative w-full max-w-sm aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] p-1.5 bg-obsidian-surface/60 backdrop-blur-xl shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden group">
                <img
                  src={activeItem.previewImg}
                  alt={activeItem.title}
                  className="w-full h-full object-cover brightness-90 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span
                    className="px-2 py-0.5 text-[9px] font-mono font-medium tracking-wider uppercase rounded backdrop-blur-md border text-white"
                    style={{
                      backgroundColor: `${activeItem.color}20`,
                      borderColor: `${activeItem.color}50`,
                    }}
                  >
                    {activeItem.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">
                      TELEMETRY
                    </div>
                    <div className="text-xs font-mono font-bold text-white tracking-wide mt-0.5">
                      {activeItem.stat}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/[0.08] text-[9px] font-mono text-brand-accent">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    LIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span>GLOBAL PROTOCOL 2026 // NOMINAL</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {['TWITTER', 'DISCORD', 'GITHUB'].map((soc) => (
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

