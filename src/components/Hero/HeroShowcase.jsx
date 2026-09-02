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
      {/* --- HERO 3D SECTION --- */}
      <section
        id="hero-3d"
        className="relative min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col justify-between"
      >
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E4002B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#00F0FF]/8 rounded-full blur-[130px] pointer-events-none" />

        {/* Hero Headline & Editorial Subtitle */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-4 mb-6">
          <div
            ref={subtitleRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest mb-4 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse" />
            <span>DESIGN THE EXCEPTIONAL</span>
            <span className="text-[#FF5E0E] font-bold">• TORAYCA M40X</span>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]"
          >
            PINARELLO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E5A93C]">
              DOGMA F
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Form over function is a constant source of discussion between our head designers. The new Dogma F achieves the perfect blend of both—re-engineered with TorayCa M40X carbon, Onda 47mm rake, and TiCR total integration.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#models"
              onClick={() => sfx.playClick()}
              className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase font-bold tracking-wider hover:bg-zinc-200 transition-all"
            >
              VIEW MODELS
            </a>
            <a
              href="#innovations"
              onClick={() => sfx.playClick()}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs uppercase font-bold tracking-wider transition-all"
            >
              WATCH R&D BREAKTHROUGHS
            </a>
          </div>
        </div>

        {/* --- INTERACTIVE 3D BIKE STAGE --- */}
        <div className="relative z-10 my-2">
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
              <Activity className="w-3.5 h-3.5 text-[#E4002B]" />
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
      <footer className="relative border-t border-white/10 bg-black py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-[#E4002B]/20 border border-[#E4002B]/40 flex items-center justify-center text-[#E4002B]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                  <path d="M31.979 6.723c-.181-1.322-1.486-2.508-3.113-3.386-.41-.221-.843-.421-1.282-.6-.19-.076-.38-.147-.57-.22A39.37 39.37 0 0019.217.476a40.119 40.119 0 00-6.865-.47h-.048l-.074.002c-.08.003-.158.005-.235.005L11.76.02c-.193.005-.388.01-.583.022l-.062.004c-.043 0-.085.004-.13.006-.135.006-.272.014-.406.023a30.319 30.319 0 00-1.325.101 10.17 10.17 0 01-.286.027l-.299.03c-.024.003-.045.007-.068.008l-.219.027c-.122.015-.246.028-.366.044L7.69.354c-.138.02-.277.036-.416.057-.133.02-.268.038-.402.062-.03.003-.062.01-.093.012l-.283.047c-.109.018-.22.036-.328.056-.002 0-.006 0-.01.002-.092.014-.185.033-.277.048l-.045.009a.645.645 0 00-.066.012A70.218 70.218 0 004.377.94l-.274.062c-.02.006-.04.01-.058.014a35.5 35.5 0 00-1.246.307c-.024.009-.05.013-.073.02-.238.062-.472.128-.708.196-.016.004-.03.007-.047.013-.217.062-.434.127-.651.195a35.226 35.226 0 00-1.217.394H.101c-.002.002-.005.002-.008.002-.008.002-.016.003-.023.008-.117.043-.077.213.044.219h.002l.034-.008.198-.03a48.241 48.241 0 0115.431-.103c.315.049.626.113.938.166.044.006.092.006.136.014.735.109 1.776.31 2.87.61.086.02.172.035.256.057.125.03.25.063.375.095l.234.061a10.271 10.271 0 011.831.649c.713.334 1.41.752 1.964 1.308l.063.068.05.054c.02.02.04.043.06.065.202.223.362.459.469.708.116.254.182.521.155.794-.001.029-.01.057-.013.087-.003.022-.008.046-.01.068-.017.132-.05.264-.096.393-.015.041-.025.081-.041.124a2.491 2.491 0 01-.224.398c-1.435 2.312-6.699 3.409-13.51 3.724a60.53 60.53 0 01-2.305.098c-.705.016-1.41.013-2.115.005h-.188v-.003c-.295-.006-.589-.008-.882-.017-.046-.001-.09-.001-.135-.004-.113 0-.118.178 0 .178.017.002.035.002.052.005a29.964 29.964 0 016.243.971c.483.135 1.328.608.775 1.159-.19.185-.494.333-.777.413-.044.01-.085.022-.125.032a14.83 14.83 0 01-3.769.401h-.004c-.104.005-.106.17.002.17h.003a15.774 15.774 0 014.114.549c.006 0 .012.003.02.005.08.016.162.04.247.07.002 0 .004.003.007.003.26.095.703.314.655.65-.045.32-.482.508-.754.59 0 0-.006.003-.006 0l-.06.019a11.87 11.87 0 01-3.029.416c-.12 0-.125.178-.004.178v.002a11.277 11.277 0 013.586.602c.217.09.561.27.559.541-.002.265-.32.441-.534.531h-.01a.517.517 0 01-.064.028c-.015.005-.03.011-.046.015l-.022.006c-.007.005-.017.006-.024.007-.016.007-.034.011-.05.018a5.745 5.745 0 01-2.205.251v.004c-.118 0-.124.184 0 .184v.002c1.61.28 2.914 1.429 3.38 2.937.04.134.075.27.102.408v.003a37.504 37.504 0 011.133 8.818c0 .107.172.113.177.003v-.005a37.346 37.346 0 012.028-11.741l.001-.005c.125-.355.251-.712.384-1.064.003-.006.006-.01.006-.016.08-.185.16-.366.247-.546.419-.884.949-1.708 1.568-2.461a12.42 12.42 0 015.501-3.832l.021-.007c.19-.057.377-.118.565-.179l.035-.012c.442-.147.882-.3 1.316-.463.006-.002.012-.003.018-.008.269-.098.537-.203.803-.305 1.913-.803 3.652-2.035 4.14-3.456.121-.353.164-.727.113-1.097" fill="currentColor" fillRule="evenodd"/>
                </svg>
              </div>
              <span className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                CICLI PINARELLO S.R.L.
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-2 max-w-sm">
              Headquarters: Viale della Repubblica, 12, 31020 Villorba (Treviso), Italy.
              C.F. and VAT 05994100963 • Handcrafted Italian racing bicycles since 1952.
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
