import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASING, sfx } from '../../utils/animations';
import { MagneticButton } from '../Navbar/MagneticButton';
import { DogmaBike3D, COLORWAYS } from '../Three/DogmaBike3D';
import { DogmaModelsCatalog } from '../Models/DogmaModelsCatalog';
import { DogmaInnovations } from '../Innovations/DogmaInnovations';
import { DogmaSpecs } from '../Specs/DogmaSpecs';
import { DogmaGeometry } from '../Geometry/DogmaGeometry';
import { DogmaWindTunnel } from '../Aero/DogmaWindTunnel';
import { DogmaConfigurator } from '../Configurator/DogmaConfigurator';
import { DogmaEditorialGallery } from '../Gallery/DogmaEditorialGallery';
import { DogmaHeritage } from '../Heritage/DogmaHeritage';
import { DogmaFooter } from '../Footer/DogmaFooter';
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
    <div ref={heroRef} className="relative w-full overflow-hidden bg-[#0b0f19]">
      {/* --- HERO 3D SECTION (Full-Bleed 100vw Stage) --- */}
      <section
        id="hero-3d"
        className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-16 bg-gradient-to-b from-[#0b0f19] via-[#121828] to-[#0e1322]"
      >
        {/* Layer 1: Refined Luxury Studio Rim Light (Color-Responsive) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-25 transition-all duration-1000 ease-out"
          style={{ backgroundColor: selectedColorway.primaryColor || '#9f8d5e' }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-white/[0.035] rounded-full blur-[180px] pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[200px] pointer-events-none transition-all duration-1000 ease-out opacity-20"
          style={{ backgroundColor: selectedColorway.accentColor || selectedColorway.primaryColor || '#9f8d5e' }}
        />

        {/* Layer 2: Precision Engineering Telemetry & Aerodynamic Vector Guides */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50%" cy="45%" r="380" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="50%" cy="45%" r="580" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <line x1="15%" y1="45%" x2="85%" y2="45%" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="6 12" />
            <line x1="50%" y1="15%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="6 12" />
          </svg>
        </div>

        {/* Layer 3: Contained Watermark Architectural Typography with Balanced Padding */}
        <div className="absolute top-24 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.025] sm:opacity-[0.03] leading-none font-display font-black tracking-tight">
          <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">PINARELLO</span>
          <span className="text-[8vw] sm:text-[7vw] md:text-[6vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-transparent -mt-[1.5vw]">
            DOGMA F
          </span>
        </div>

        {/* Layer 4: Italian Geographic & Technical Side Coordinates with Balanced Margins */}
        <div className="absolute top-44 left-6 lg:left-10 2xl:left-16 hidden 2xl:flex flex-col gap-8 font-mono text-[9.5px] text-zinc-600 tracking-[0.25em] uppercase select-none pointer-events-none z-10">
          <div className="space-y-1">
            <span className="block text-zinc-500 font-bold text-[10px]">ORIGIN</span>
            <span>45°40&apos;19&quot;N 12°14&apos;34&quot;E</span>
            <span className="block text-zinc-600">TREVISO, ITALIA</span>
          </div>
          <div className="space-y-1">
            <span className="block text-zinc-500 font-bold text-[10px]">CARBON COMPOSITE</span>
            <span>TORAYCA® M40X</span>
            <span className="block text-zinc-600">392 GPA TENSILE</span>
          </div>
        </div>

        <div className="absolute top-44 right-6 lg:right-10 2xl:right-16 hidden 2xl:flex flex-col gap-8 font-mono text-[9.5px] text-zinc-600 tracking-[0.25em] uppercase text-right select-none pointer-events-none z-10">
          <div className="space-y-1">
            <span className="block text-zinc-500 font-bold text-[10px]">AERO HOMOLOGATION</span>
            <span>ONDA FORKFLAP™ 47MM</span>
            <span className="block text-zinc-600">UCI APPROVED 700C</span>
          </div>
          <div className="space-y-1">
            <span className="block text-zinc-500 font-bold text-[10px]">INTEGRATION</span>
            <span>TICR™ 100% INTERNAL</span>
            <span className="block text-zinc-600">TALON ULTRA FAST</span>
          </div>
        </div>

        {/* --- INNER CENTERED CONTENT CONTAINER --- */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col items-center justify-between flex-1">
          {/* Editorial Luxury Hero Header (Centered Above Box) */}
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto mt-4 mb-8 w-full">
            {/* Top Heritage Kicker */}
            <div
              ref={subtitleRef}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-inner text-center"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500"
                style={{ backgroundColor: selectedColorway.primaryColor || '#E4002B' }}
              />
              <span>CICLI PINARELLO</span>
              <span className="text-zinc-600">•</span>
              <span>TREVISO, ITALIA</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-[#FF5E0E] font-bold hidden sm:inline">
                WORLDTOUR BENCHMARK
              </span>
            </div>

            {/* Grand Architectural Headline */}
            <div className="space-y-1 text-center flex flex-col items-center justify-center w-full">
              <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-zinc-400 font-semibold uppercase text-center">
                THE ALL-NEW MONOCOQUE RACING CHASSIS
              </span>
              <h1
                ref={titleRef}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl text-center"
              >
                PINARELLO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
                  DOGMA F
                </span>
              </h1>
            </div>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed font-light text-center">
              Form over function is not a debate — it is pure equilibrium. Re-engineered in
              TorayCa® M40X carbon composite, Onda 47mm rake fork, and TiCR total integration.
            </p>

            {/* Luxury Action Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-wider text-center">
              <a
                href="#models"
                onClick={() => sfx.playClick()}
                className="px-8 py-3.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>EXPLORE MODELS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#configurator"
                onClick={() => sfx.playClick()}
                className="px-7 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-semibold backdrop-blur-md hover:border-white/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5 text-[#FF5E0E]" />
                <span>BESPOKE ATELIER</span>
              </a>

              <a
                href="#innovations"
                onClick={() => sfx.playClick()}
                className="px-6 py-3.5 rounded-full text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <span>R&D BREAKTHROUGHS</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* --- INTERACTIVE 3D BIKE STAGE --- */}
          <div className="relative z-10 my-4 w-full">
            <DogmaBike3D
              activeColorway={selectedColorway}
              onColorChange={handleColorChange}
            />
          </div>

          {/* --- GRAND ARCHITECTURAL SPEC RIBBON --- */}
          <div
            ref={hudRef}
            className="relative z-10 mt-6 sm:mt-10 bg-obsidian-surface/85 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl overflow-hidden w-full"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Stat 1 */}
              <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[9.5px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>CHASSIS WEIGHT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4002B] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                    6.77 <span className="text-xs sm:text-sm font-mono text-[#FF5E0E]">KG</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-1">
                    Race-Ready Spec (Size 53)
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[9.5px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>AERO DRAG (CdA)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                    -4.8% <span className="text-xs sm:text-sm font-mono text-[#00F0FF]">CdA</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-400 font-mono mt-1">
                    -3.2 Watts Saved at 40 km/h
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[9.5px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>LATERAL STIFFNESS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                    392 <span className="text-xs sm:text-sm font-mono text-[#D4FF00]">GPa</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    TorayCa M40X Nanoalloy Carbon
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>TOUR DE FRANCE DYNASTY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-3">
                  <div className="font-display text-3xl sm:text-4xl font-black text-white">
                    15× <span className="text-sm font-mono text-[#E5A93C]">TITLES</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    Most Victorious Brand in History
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OFFICIAL MODELS CATALOGUE --- */}
      <DogmaModelsCatalog onOpenBooking={onOpenBooking} />

      {/* --- OFFICIAL INNOVATIONS & VIDEO BREAKTHROUGHS --- */}
      <DogmaInnovations />

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

      {/* --- EDITORIAL PHOTOGRAPHY GALLERY --- */}
      <DogmaEditorialGallery />

      {/* --- HERITAGE & GRAND TOUR DYNASTY --- */}
      <DogmaHeritage />

      {/* --- OFFICIAL TREVISO PINARELLO MEGA-FOOTER --- */}
      <DogmaFooter />
    </div>
  );
};
