import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASING, sfx } from '../../utils/animations';
import { MagneticButton } from '../Navbar/MagneticButton';
import { DogmaBike3D, COLORWAYS } from '../Three/DogmaBike3D';
import { DogmaSpecs } from '../Specs/DogmaSpecs';
import { DogmaGeometry } from '../Geometry/DogmaGeometry';
import { DogmaWindTunnel } from '../Aero/DogmaWindTunnel';
import { DogmaConfigurator } from '../Configurator/DogmaConfigurator';
import { DogmaHeritage } from '../Heritage/DogmaHeritage';
import {
  Zap,
  ArrowUpRight,
  Shield,
  Wind,
  Layers,
  Sparkles,
  ChevronDown,
  Activity,
  Flame,
  Award,
  Crown,
  CheckCircle2,
  Sliders,
  Globe2,
  Radio,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const INNOVATIONS = [
  {
    id: 'torayca-m40x',
    title: 'TorayCa M40X Carbon Fiber',
    subtitle: 'NANOALLOY COMPOSITE MATRIX',
    desc: 'Engineered with 392 GPa high-tensile modulus carbon fibers previously exclusive to X-Light team editions. Yields +12% lateral stiffness for instant sprint surge while absorbing high-frequency road vibrations.',
    stat: '392 GPa',
    statLabel: 'TENSILE MODULUS',
    icon: Layers,
    accent: '#FF3B00',
  },
  {
    id: 'onda-forkflap',
    title: 'NEW Onda Fork & ForkFlap™',
    subtitle: '47MM AERODYNAMIC RAKE',
    desc: 'Redesigned Onda fork with extended 47mm rake stabilizes high-speed alpine descents. Integrated ForkFlap™ aero wings eliminate air vortex turbulence created around the flat-mount disc brake caliper.',
    stat: '47 mm',
    statLabel: 'STABILITY RAKE',
    icon: Wind,
    accent: '#00F0FF',
  },
  {
    id: 'ticr-cockpit',
    title: 'MOST Talon Ultra Fast Cockpit',
    subtitle: '100% TICR™ INTEGRATED ROUTING',
    desc: 'Seamless one-piece carbon aerodynamic bar & stem featuring 7° flared drops (20mm wider in the drops for high-leverage sprinting) and zero exposed cables, saving 5 watts at 40 km/h.',
    stat: '-5 Watts',
    statLabel: 'DRAG SAVED @ 40KM/H',
    icon: Zap,
    accent: '#D4FF00',
  },
  {
    id: 'aero-keel-bb',
    title: 'Aero-Keel Bottom Bracket',
    subtitle: '3.5° ROTATED AIR CHANNEL',
    desc: 'The downtube is mathematically rotated by 3.5° to guide clean laminar airflow around water bottles and through the Italian-threaded 70mm BB shell for a 1.2% aerodynamic gain.',
    stat: '+12%',
    statLabel: 'BB POWER STIFFNESS',
    icon: Shield,
    accent: '#E5A93C',
  },
];

export const HeroShowcase = ({ onOpenBooking }) => {
  const [selectedColorway, setSelectedColorway] = useState(COLORWAYS[0]);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const hudRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for Hero typography
      const tl = gsap.timeline({ defaults: { ease: EASING.cinematic } });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, delay: 0.1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          hudRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleColorChange = (newColor) => {
    setSelectedColorway(newColor);
  };

  return (
    <div ref={heroRef} className="relative w-full overflow-hidden">
      {/* --- HERO 3D SECTION --- */}
      <section
        id="hero-3d"
        className="relative min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col justify-between"
      >
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF3B00]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#00F0FF]/8 rounded-full blur-[130px] pointer-events-none" />

        {/* Hero Headline & Editorial Subtitle */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-4 mb-8">
          <div
            ref={subtitleRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse" />
            <span>THE PINNACLE OF ROAD RACING</span>
            <span className="text-[#FF5E0E] font-bold">• TORAYCA M40X</span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]"
          >
            PINARELLO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] via-[#FF6A00] to-[#E5A93C]">
              DOGMA F
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            The seven-time Tour de France champion, re-engineered with TorayCa M40X high-modulus carbon fiber, Onda ForkFlap™ aerodynamics, and total TiCR internal cable integration.
          </p>
        </div>

        {/* --- INTERACTIVE 3D BIKE STAGE --- */}
        <div className="relative z-10 my-4">
          <DogmaBike3D
            activeColorway={selectedColorway}
            onColorChange={handleColorChange}
          />
        </div>

        {/* --- HERO BOTTOM HUD TELEMETRY BAR --- */}
        <div
          ref={hudRef}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8"
        >
          <div className="bg-obsidian-surface/75 border border-white/10 p-4 sm:p-5 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-zinc-500 font-mono text-[10px] uppercase">
              <span>WEIGHT (SIZE 53)</span>
              <Activity className="w-3.5 h-3.5 text-[#FF3B00]" />
            </div>
            <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
              6.77 <span className="text-xs font-mono text-[#FF5E0E]">KG</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">Race-Ready Dura-Ace Build</p>
          </div>

          <div className="bg-obsidian-surface/75 border border-white/10 p-4 sm:p-5 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-zinc-500 font-mono text-[10px] uppercase">
              <span>AERO DRAG (CdA)</span>
              <Wind className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
            <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
              -4.8% <span className="text-xs font-mono text-[#00F0FF]">CdA</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">-3.2W Saved at 40 km/h</p>
          </div>

          <div className="bg-obsidian-surface/75 border border-white/10 p-4 sm:p-5 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-zinc-500 font-mono text-[10px] uppercase">
              <span>BB LATERAL STIFFNESS</span>
              <Zap className="w-3.5 h-3.5 text-[#D4FF00]" />
            </div>
            <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
              +12% <span className="text-xs font-mono text-[#D4FF00]">POWER</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">TorayCa M40X Nanoalloy</p>
          </div>

          <div className="bg-obsidian-surface/75 border border-white/10 p-4 sm:p-5 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
            <div className="flex justify-between items-center text-zinc-500 font-mono text-[10px] uppercase">
              <span>TOUR DE FRANCE DYNASTY</span>
              <Crown className="w-3.5 h-3.5 text-[#E5A93C]" />
            </div>
            <div className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
              15× <span className="text-xs font-mono text-[#E5A93C]">TITLES</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 font-mono">Most Victorious Brand</p>
          </div>
        </div>
      </section>

      {/* --- 4 PILLARS OF DOGMA F AERODYNAMIC ENGINEERING --- */}
      <section className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00F0FF] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WorldTour Technological Innovations</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] to-[#FF6A00]">Absolute Speed</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Four key architectural breakthroughs give the Dogma F uncompromised dominance on alpine climbs, flat time trials, and 70 km/h sprint finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INNOVATIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-6 sm:p-7 rounded-2xl bg-obsidian-surface/80 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{
                      borderColor: `${item.accent}40`,
                      backgroundColor: `${item.accent}15`,
                      color: item.accent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    {item.subtitle}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white uppercase group-hover:text-[#FF5E0E] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-baseline justify-between font-mono">
                  <span className="text-[10px] text-zinc-500 uppercase">{item.statLabel}</span>
                  <span
                    className="font-display text-lg font-bold"
                    style={{ color: item.accent }}
                  >
                    {item.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- MINUTE SPECIFICATIONS MATRIX --- */}
      <DogmaSpecs />

      {/* --- 9-SIZE GEOMETRY & FITMENT ENGINE --- */}
      <DogmaGeometry />

      {/* --- WIND TUNNEL & AERO SIMULATOR --- */}
      <DogmaWindTunnel />

      {/* --- BESPOKE ATELIER TREVISO CONFIGURATOR --- */}
      <DogmaConfigurator
        selectedColorway={selectedColorway}
        onColorChange={handleColorChange}
        onOpenBooking={onOpenBooking}
      />

      {/* --- HERITAGE & GRAND TOUR DYNASTY --- */}
      <DogmaHeritage />

      {/* --- FOOTER --- */}
      <footer className="relative border-t border-white/10 bg-black/90 py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-[#FF3B00]/20 border border-[#FF3B00]/40 flex items-center justify-center text-[#FF5E0E]">
                <span className="font-display font-black text-xs text-white">P</span>
              </div>
              <span className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                CICLI PINARELLO S.R.L.
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-2 max-w-sm">
              Viale della Repubblica 12, 31050 Ponzano Veneto (Treviso), Italy.
              Handcrafted Italian racing bicycles since 1952.
            </p>
          </div>

          {/* Compliance & Homologation Badges */}
          <div className="flex flex-wrap justify-center gap-3 font-mono text-[10px] text-zinc-400">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              UCI APPROVED CHASSIS
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              TORAYCA M40X COMPOSITE
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              TICR™ INTEGRATION
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              ISO 4210 CERTIFIED
            </span>
          </div>

          <div className="text-center md:text-right font-mono text-xs text-zinc-500">
            <div>© {new Date().getFullYear()} Pinarello Dogma F Experience.</div>
            <div className="text-[10px] text-zinc-600 mt-1">
              Official Technical Showcase • All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
