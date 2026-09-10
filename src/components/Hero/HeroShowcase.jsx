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
    <div ref={heroRef} className="relative w-full overflow-hidden">
      {/* --- HERO 3D SECTION (Full-Bleed 100vw Stage) --- */}
      <section
        id="hero-3d"
        className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-16"
      >
        {/* Layer 1: Full-Width Atmospheric Studio Spotlights (Color-Responsive) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[750px] rounded-full blur-[180px] pointer-events-none opacity-30 transition-all duration-1000 ease-out"
          style={{ backgroundColor: selectedColorway.primaryColor || '#E4002B' }}
        />
        <div
          className="absolute top-1/4 -right-20 w-[650px] h-[650px] rounded-full blur-[170px] pointer-events-none opacity-25 transition-all duration-1000 ease-out"
          style={{ backgroundColor: selectedColorway.accentColor || '#00F0FF' }}
        />
        <div
          className="absolute top-1/2 -left-20 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none opacity-20 transition-all duration-1000 ease-out"
          style={{ backgroundColor: selectedColorway.rearColor || '#07080A' }}
        />

        {/* Layer 2: Precision Engineering Grid & Carbon Weave Lines spanning edge-to-edge */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_45%,black_30%,transparent_85%)] pointer-events-none" />

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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col justify-between flex-1">
          {/* Editorial Luxury Hero Header */}
          <div className="text-center max-w-5xl mx-auto mt-4 mb-8">
            {/* Top Heritage Kicker */}
            <div
              ref={subtitleRef}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-zinc-300 uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-inner"
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
            <div className="space-y-1">
              <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-zinc-400 font-semibold uppercase">
                THE ALL-NEW MONOCOQUE RACING CHASSIS
              </span>
              <h1
                ref={titleRef}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl"
              >
                PINARELLO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
                  DOGMA F
                </span>
              </h1>
            </div>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 font-sans max-w-3xl mx-auto leading-relaxed font-light">
              Form over function is not a debate — it is pure equilibrium. Re-engineered in
              TorayCa® M40X carbon composite, Onda 47mm rake fork, and TiCR total integration.
            </p>

            {/* Luxury Action Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-wider">
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
          <div className="relative z-10 my-4">
            <DogmaBike3D
              activeColorway={selectedColorway}
              onColorChange={handleColorChange}
            />
          </div>

          {/* --- GRAND ARCHITECTURAL SPEC RIBBON --- */}
          <div
            ref={hudRef}
            className="relative z-10 mt-10 bg-obsidian-surface/85 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Stat 1 */}
              <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>CHASSIS WEIGHT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4002B] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-3">
                  <div className="font-display text-3xl sm:text-4xl font-black text-white">
                    6.77 <span className="text-sm font-mono text-[#FF5E0E]">KG</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    Race-Ready Dura-Ace Spec (Size 53)
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>AERO DRAG (CdA)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-3">
                  <div className="font-display text-3xl sm:text-4xl font-black text-white">
                    -4.8% <span className="text-sm font-mono text-[#00F0FF]">CdA</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono mt-1">
                    -3.2 Watts Saved at 40 km/h
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-6 sm:p-7 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>LATERAL STIFFNESS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-3">
                  <div className="font-display text-3xl sm:text-4xl font-black text-white">
                    392 <span className="text-sm font-mono text-[#D4FF00]">GPa</span>
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

      {/* --- OFFICIAL TREVISO FOOTER --- */}
      <footer className="relative w-full border-t border-white/10 bg-black py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-[#E4002B]/20 border border-[#E4002B]/40 flex items-center justify-center text-[#E4002B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-4 h-4 fill-current"
                >
                  <path
                    d="M31.979 6.723c-.181-1.322-1.486-2.508-3.113-3.386-.41-.221-.843-.421-1.282-.6-.19-.076-.38-.147-.57-.22A39.37 39.37 0 0019.217.476a40.119 40.119 0 00-6.865-.47h-.048l-.074.002c-.08.003-.158.005-.235.005L11.76.02c-.193.005-.388.01-.583.022l-.062.004c-.043 0-.085.004-.13.006-.135.006-.272.014-.406.023a30.319 30.319 0 00-1.325.101 10.17 10.17 0 01-.286.027l-.299.03c-.024.003-.045.007-.068.008l-.219.027c-.122.015-.246.028-.366.044L7.69.354c-.138.02-.277.036-.416.057-.133.02-.268.038-.402.062-.03.003-.062.01-.093.012l-.283.047c-.109.018-.22.036-.328.056-.002 0-.006 0-.01.002-.092.014-.185.033-.277.048l-.045.009a.645.645 0 00-.066.012A70.218 70.218 0 004.377.94l-.274.062c-.02.006-.04.01-.058.014a35.5 35.5 0 00-1.246.307c-.024.009-.05.013-.073.02-.238.062-.472.128-.708.196-.016.004-.03.007-.047.013-.217.062-.434.127-.651.195a35.226 35.226 0 00-1.217.394H.101c-.002.002-.005.002-.008.002-.008.002-.016.003-.023.008-.117.043-.077.213.044.219h.002l.034-.008.198-.03a48.241 48.241 0 0115.431-.103c.315.049.626.113.938.166.044.006.092.006.136.014.735.109 1.776.31 2.87.61.086.02.172.035.256.057.125.03.25.063.375.095l.234.061a10.271 10.271 0 011.831.649c.713.334 1.41.752 1.964 1.308l.063.068.05.054c.02.02.04.043.06.065.202.223.362.459.469.708.116.254.182.521.155.794-.001.029-.01.057-.013.087-.003.022-.008.046-.01.068-.017.132-.05.264-.096.393-.015.041-.025.081-.041.124a2.491 2.491 0 01-.224.398c-1.435 2.312-6.699 3.409-13.51 3.724a60.53 60.53 0 01-2.305.098c-.705.016-1.41.013-2.115.005h-.188v-.003c-.295-.006-.589-.008-.882-.017-.046-.001-.09-.001-.135-.004-.113 0-.118.178 0 .178.017.002.035.002.052.005a29.964 29.964 0 016.243.971c.483.135 1.328.608.775 1.159-.19.185-.494.333-.777.413-.044.01-.085.022-.125.032a14.83 14.83 0 01-3.769.401h-.004c-.104.005-.106.17.002.17h.003a15.774 15.774 0 014.114.549c.006 0 .012.003.02.005.08.016.162.04.247.07.002 0 .004.003.007.003.26.095.703.314.655.65-.045.32-.482.508-.754.59 0 0-.006.003-.006 0l-.06.019a11.87 11.87 0 01-3.029.416c-.12 0-.125.178-.004.178v.002a11.277 11.277 0 013.586.602c.217.09.561.27.559.541-.002.265-.32.441-.534.531h-.01a.517.517 0 01-.064.028c-.015.005-.03.011-.046.015l-.022.006c-.007.005-.017.006-.024.007-.016.007-.034.011-.05.018a5.745 5.745 0 01-2.205.251v.004c-.118 0-.124.184 0 .184v.002c1.61.28 2.914 1.429 3.38 2.937.04.134.075.27.102.408v.003a37.504 37.504 0 011.133 8.818c0 .107.172.113.177.003v-.005a37.346 37.346 0 012.028-11.741l.001-.005c.125-.355.251-.712.384-1.064.003-.006.006-.01.006-.016.08-.185.16-.366.247-.546.419-.884.949-1.708 1.568-2.461a12.42 12.42 0 015.501-3.832l.021-.007c.19-.057.377-.118.565-.179l.035-.012c.442-.147.882-.3 1.316-.463.006-.002.012-.003.018-.008.269-.098.537-.203.803-.305 1.913-.803 3.652-2.035 4.14-3.456.121-.353.164-.727.113-1.097"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                CICLI PINARELLO S.R.L.
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-2 max-w-sm">
              Headquarters: Viale della Repubblica, 12, 31020 Villorba (Treviso), Italy. C.F.
              and VAT 05994100963 • Handcrafted Italian racing bicycles since 1952.
            </p>
          </div>

          {/* Compliance Badges */}
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
            <div>© {new Date().getFullYear()} CICLI PINARELLO SRL.</div>
            <div className="text-[10px] text-zinc-600 mt-1">
              Official Dogma F Interactive Experience • All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
