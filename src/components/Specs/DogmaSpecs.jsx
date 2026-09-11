import React, { useState } from 'react';
import {
  Layers,
  Zap,
  Shield,
  Wind,
  Cpu,
  Sparkles,
  Check,
  Scale,
  Gauge,
  Activity,
  ArrowRight,
  SlidersHorizontal,
  CircleDot,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  MapPin,
  Building,
  Award,
  Crown,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const OFFICIAL_SPECS_DATA = [
  {
    id: 'frame-fork',
    name: 'Frame & Fork Architecture',
    icon: Layers,
    badge: 'TORAYCA M40X CARBON',
    desc: 'The monocoque carbon foundation featuring eTICR internal routing and aero-keel geometry.',
    components: [
      {
        name: 'Frame',
        spec: 'TorayCa M40X, TiCR™ Cable Routing, Italian BB',
        role: 'Main Chassis & Lateral Power Backbone',
        image: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Carbon (TorayCa M40X Composite)',
        highlight: '392 GPa Tensile Modulus • +12% Stiffness',
        fit: 'cover',
      },
      {
        name: 'Fork',
        spec: 'NEW eTICR Onda Fork with ForkFlap™, 1.5\' upper and lower steerer',
        role: 'Front Aerodynamics & High-Speed Stability',
        image: 'https://pinarello.com/storage/Technology/663e6ff8cbedabf2e2c307ac0457dfd5.jpg',
        material: 'Carbon (eTICR Integrated)',
        highlight: '47mm Rake • Caliper Vortex Elimination',
        fit: 'cover',
      },
      {
        name: 'Bottom Bracket',
        spec: 'Shimano Dura Ace SM-BB9200',
        role: 'Italian Threaded 70mm Bottom Bracket Shell',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBottomBracket/cg4SHICBottomBracket/P-BB-R9100_13587_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Precision Sealed Bearings',
        highlight: '70mm Italian Thread • Zero Play',
        fit: 'contain',
      },
      {
        name: 'Headset',
        spec: 'Drop in Bearing 1-1/8\' - 1.5\' (Internal routing)',
        role: 'Elliptical Steering Tube Bearing Assembly',
        image: 'https://pinarello.com/storage/Technology/51c4b67149282905231f3c5428db17dd.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Sealed Angular Contact Bearings',
        highlight: '8mm Narrower Frontal Width Profile',
        fit: 'cover',
      },
      {
        name: 'Seatpost',
        spec: 'Pinarello Aero Seatpost with 3D printed Titanium Top Seatclamp',
        role: 'Integrated Aero Mast & Battery Retainer',
        image: 'https://pinarello.com/storage/ProductGallery/c28dd5445845c28eeede36b44a5f61f9.jpg',
        material: 'TorayCa Carbon & 3D Ti Clamp',
        highlight: 'Drag-Reducing FlatBack Aerofoil Profile',
        fit: 'cover',
      },
      {
        name: 'Seat Clamp',
        spec: 'FSC Frontal Seat Clamp, Integrated and Sealed',
        role: 'Concealed Aerodynamic Wedgelock System',
        image: 'https://pinarello.com/storage/Technology/58cbe2c3287b493e187b2338df865933.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Integrated Monocoque Wedge Assembly',
        highlight: '-35g Weight Reduction • Sweat Sealed',
        fit: 'cover',
      },
      {
        name: 'Axles',
        spec: 'Fulcrum Ultra Light Axles 12x100 & 12x142, tool free removal',
        role: 'Flush-Integrated Aerodynamic Thru-Axles',
        image: 'https://pinarello.com/storage/Technology/1ba269b3ed1e43d8c63613770cbfd2d6.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Hard Anodized Aircraft Alloy',
        highlight: '100% Flush Embedded Dropout Blind Hole',
        fit: 'cover',
      },
      {
        name: 'Bottle Cage & Bottle',
        spec: 'Trap Pacx Bottle Cage, Fly Bottle Pinarello Bottle 550ml',
        role: 'Aero-Shielded Hydration System',
        image: 'https://pinarello.com/storage/MenuVoice/c7dbb829185a4b712cb6103e57a4fcd5.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Composite Cage & BPA-Free Bottle',
        highlight: 'Recessed Down Tube Airflow Harmonization',
        fit: 'cover',
      },
    ],
  },
  {
    id: 'drivetrain-cockpit',
    name: 'Drivetrain, Cockpit & Transmission',
    icon: Cpu,
    badge: 'SHIMANO DURA-ACE Di2 12S',
    desc: 'Wireless electronic shifting with dual power meter crankset and MOST 1K integrated cockpit.',
    components: [
      {
        name: 'Crankset & Chainrings',
        spec: 'Shimano Dura Ace FC-R9200, Hollowtech II 12S (50-34T, 54-40T)',
        role: 'Hollow Forged Power Transmission with Dual Strain Gauges',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICChainring/cg4SHICChainring/FC-R9200-P-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Hollowtech II Aluminum Alloy',
        highlight: '99.4% Lateral Power Transfer Index',
        fit: 'contain',
      },
      {
        name: 'Front Derailleur',
        spec: 'Shimano Dura Ace Di2 FD-9200 12S (Braze-on)',
        role: 'Ultra-Fast 0.12s Electronic Chain Lifter',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICFrontDerailleur/cg4SHICFrontDerailleur/FD-R9250-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Aluminum & Carbon Reinforced Resin',
        highlight: '45% Faster Front Shift Speed vs R9150',
        fit: 'contain',
      },
      {
        name: 'Rear Derailleur',
        spec: 'Shimano Dura Ace Di2 RD-R9200 12S Shadow',
        role: 'Integrated Central Charging Port & Wireless Master Brain',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICRearDerailleur/cg4SHICRearDerailleur/RD-R9250-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Carbon Composite Cage & Alloy Body',
        highlight: 'Direct Mount Derailleur Hanger Interface',
        fit: 'contain',
      },
      {
        name: 'Cassette',
        spec: 'Shimano Dura Ace CS-R9200 12S (11-30T / 11-34T)',
        role: 'Hyperglide+ Titanium & Steel Sprocket Cluster',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICCassetteSprocket/cg4SHICCassetteSprocket/CS-R9200-12-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Titanium (5 Largest) & Nickel-Plated Steel',
        highlight: 'Seamless Shifting under 1,500W Sprint Load',
        fit: 'contain',
      },
      {
        name: 'Chain',
        spec: 'Shimano Dura Ace CN-M9100 12S with Quick-Link',
        role: 'Chromized Roller Precision Drive Link',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICChain/cg4SHICChain/CN-M9100-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'SIL-TEC Coated Hollow Pin Steel',
        highlight: 'Ultra-Low Friction & Extended Wear Life',
        fit: 'contain',
      },
      {
        name: 'Handlebar & Stem',
        spec: 'MOST Talon Ultra Fast Integrated Carbon 1K',
        role: '1-Piece Aero Bar with 100% Internal TiCR Routing',
        image: 'https://pinarello.com/storage/Technology/6a9a2c56e8850736135f0559e3e242ff.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'TorayCa 1K High Modulus Carbon',
        highlight: '315g Weight • 7° Sprint Flare Drops',
        fit: 'cover',
      },
      {
        name: 'Handlebar Tape',
        spec: 'MOST Ultragrip Evo 3mm High-Tack',
        role: 'Micro-Perforated Vibration Damping Bar Wrap',
        image: 'https://pinarello.com/storage/MenuVoice/c7dbb829185a4b712cb6103e57a4fcd5.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'High-Density EVA Polymer + PU Grip',
        highlight: 'All-Weather Tactile Wet Control',
        fit: 'cover',
      },
      {
        name: 'Saddle',
        spec: 'MOST Lynx Ultrafast Superflow L Carbon (145mm)',
        role: 'Short-Fit Pressure Relieving Racing Saddle',
        image: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'CarboKeramic 7x9mm Rails & Carbon Shell',
        highlight: '129g Featherweight • Superflow Cutout',
        fit: 'cover',
      },
    ],
  },
  {
    id: 'brakes-wheels',
    name: 'Braking Systems, Wheels & Tires',
    icon: Wind,
    badge: 'PRINCETON PEAK 4550 & DURA-ACE DISC',
    desc: 'Hydraulic disc braking with Freeza heat dissipation and sinusoidal carbon aero wheels.',
    components: [
      {
        name: 'Front Brake System',
        spec: 'Dura Ace BR-R9200, 2 pistons caliper, 160mm rotor',
        role: 'Flat-Mount Hydraulic Disc with Servo Wave Action',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBrake/cg4SHICBrakeCaliper/BR-R9270-F-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/Technology/663e6ff8cbedabf2e2c307ac0457dfd5.jpg',
        material: 'Mono-block Aluminum Caliper',
        highlight: '160mm CenterLock Ice-Tech Freeza Rotor',
        fit: 'contain',
      },
      {
        name: 'Rear Brake System',
        spec: 'Dura Ace BR-R9200, 2 pistons caliper, 140mm rotor',
        role: 'Flat-Mount Hydraulic Disc Integrated Rear Assembly',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICDiscBrakeRotor/cg4SHICDiscBrakeRotor/RT-CL900-140-shic219-primary_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/Technology/663e6ff8cbedabf2e2c307ac0457dfd5.jpg',
        material: 'Mono-block Aluminum Caliper & RT-CL900 Rotor',
        highlight: '140mm Low-Profile Rotor for Modulated Control',
        fit: 'contain',
      },
      {
        name: 'Front & Rear Wheelset',
        spec: 'PRINCETON PEAK 4550 DB*',
        role: 'Sinusoidal Aerodynamic High-Power Wheelset',
        image: 'https://roadbikeaction.com/wp-content/uploads/2021/06/Princeton-Carbonworks-Peak-4550-cross-scaled.jpg',
        fallbackImage: 'https://pinarello.com/storage/MenuVoice/c7dbb829185a4b712cb6103e57a4fcd5.jpg',
        material: 'Variable-Depth Full Carbon Rim',
        highlight: '45-50mm Wave Depth • Disc Brake Optimized',
        fit: 'cover',
      },
      {
        name: 'Tires',
        spec: 'Continental Grand Prix 5000S TR 28-622',
        role: 'Tubeless-Ready WorldTour Racing Rubber',
        image: 'https://www.continental-tires.com/adobe/dynamicmedia/deliver/dm-aid--1d78b7a8-16ea-4800-b280-7897c9676b22/Continental_Grand-Prix-5000-S-TR_ChristopherLanaway_Lifestyle_32.jpg?width=600',
        fallbackImage: 'https://pinarello.com/storage/ProductGallery/3fe908c0936aaa74d1a46f442d24b09f.jpg',
        material: 'BlackChili Compound + Vectran Breaker',
        highlight: '700x28c Width • Unsurpassed Cornering Grip',
        fit: 'cover',
      },
    ],
  },
  {
    id: 'warranty-importer',
    name: 'Authenticity, Warranty & Importer',
    icon: Shield,
    badge: 'GENUINE PRODUCT & SERVICE',
    desc: 'Official warranty coverage, import documentation, and customer care support.',
    components: [],
  },
];

export const DogmaSpecs = () => {
  const [activeTab, setActiveTab] = useState(OFFICIAL_SPECS_DATA[0].id);

  const selectedCategory =
    OFFICIAL_SPECS_DATA.find((c) => c.id === activeTab) || OFFICIAL_SPECS_DATA[0];

  return (
    <section
      id="specifications"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0c1326] via-[#0e1b38] to-[#0a1628]"
    >
      {/* --- LAYER 1: VIBRANT ANIMATED ATMOSPHERIC AURORAS --- */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[1200px] h-[1200px] bg-[#00F0FF]/30 rounded-full blur-[200px] pointer-events-none aurora-blob-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[1150px] h-[1150px] bg-[#3B82F6]/35 rounded-full blur-[200px] pointer-events-none aurora-blob-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[900px] bg-[#00F0FF]/20 rounded-full blur-[220px] pointer-events-none aurora-breathing" />

      {/* Bespoke Blueprint Precision Calipers & Telemetry Guides */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="40%" r="480" fill="none" stroke="rgba(0,240,255,0.12)" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="50%" cy="40%" r="720" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="1" />
          <line x1="5%" y1="40%" x2="95%" y2="40%" stroke="rgba(0,240,255,0.08)" strokeWidth="1" strokeDasharray="8 16" />
          <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(0,240,255,0.08)" strokeWidth="1" strokeDasharray="8 16" />
        </svg>
      </div>

      {/* Contained Architectural Watermark */}
      <div className="absolute top-12 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.05] sm:opacity-[0.06] leading-none font-display font-black tracking-tight">
        <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">BLUEPRINT</span>
        <span className="text-[8vw] sm:text-[7vw] md:text-[6vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-transparent -mt-[1.5vw]">
          SPECIFICATIONS
        </span>
      </div>

      {/* --- LAYER 2: INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* --- OFFICIAL QUOTE BANNER: ITALIAN HAUTE COUTURE --- */}
        <div className="relative mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.08] via-cyan-950/25 to-white/[0.04] border border-cyan-500/25 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest backdrop-blur-md shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>PINARELLO DESIGN PHILOSOPHY // TREVISO, ITALIA</span>
            </div>

            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-relaxed italic drop-shadow-lg">
              “We’ve always stood out from the crowd and created bikes that are totally unique, both in terms of how they look, but more importantly, how they perform. Form over function is a constant source of discussion between our head designers and we believe the DOGMA F achieves the perfect blend of the two.”
            </blockquote>

            <div className="font-mono text-xs text-zinc-300 uppercase tracking-widest font-semibold pt-2">
              — Cicli Pinarello Head of R&D, Treviso, Italy
            </div>
          </div>

          {/* 3 Core Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4002B] shrink-0 animate-pulse shadow-[0_0_8px_#E4002B]" />
              <span className="text-zinc-200">
                Lightweight & aerodynamic wheels for instantaneous sprint torque transfer
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shrink-0 animate-pulse shadow-[0_0_8px_#00F0FF]" />
              <span className="text-zinc-200">
                Chassis geometry balanced for WorldTour acceleration and alpine stability
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] shrink-0 animate-pulse shadow-[0_0_8px_#D4FF00]" />
              <span className="text-zinc-200">
                Ultra-wide 12-speed electronic gear range for high-gradient climbing
              </span>
            </div>
          </div>
        </div>

        {/* --- SECTION HEADER: ARCHITECTURAL FLAGSHIP EDITORIAL --- */}
        <div className="relative z-10 mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-8 font-mono text-[11px] tracking-[0.25em] text-zinc-300 uppercase">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                04
              </span>
              <span className="text-[#00F0FF] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                TECHNICAL BLUEPRINT
              </span>
              <span className="text-zinc-500">//</span>
              <span className="text-zinc-200">MINUTE COMPONENT ARCHITECTURE</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 font-mono text-[10px]">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold backdrop-blur-md">
                ISO 4210 CERTIFIED
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-[#E4002B] font-bold hidden sm:inline">
                UCI HOMOLOGATED 700C
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-2">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-[#00F0FF] font-bold">
                FACTORY TOLERANCES & METRIC SPECIFICATIONS
              </span>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
                MINUTE SPECS & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 via-40% to-[#00F0FF] drop-shadow-lg">
                  ARCHITECTURE.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2 space-y-4">
              <p className="text-sm sm:text-base text-zinc-200 font-sans font-normal leading-relaxed">
                Explore complete mechanical specifications with illustrated visual component breakdowns, composite materials, and official factory warranty documentation.
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-zinc-300">
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  SHIMANO DURA-ACE
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  PRINCETON CARBON
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  TALON 1K COCKPIT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- QUICK SPEC SUMMARY BAR --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">INTENDED USE</span>
            <span className="font-display text-lg sm:text-xl font-black text-white mt-1">Road Racing</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">WHEEL SIZE</span>
            <span className="font-display text-lg sm:text-xl font-black text-[#00F0FF] mt-1">700c (30mm max)</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">BRAKING SYSTEM</span>
            <span className="font-display text-lg sm:text-xl font-black text-white mt-1">Hydraulic Disc</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">FRAME MATERIAL</span>
            <span className="font-display text-lg sm:text-xl font-black text-[#E4002B] mt-1">TorayCa M40X</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-lg flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">FORK PROFILE</span>
            <span className="font-display text-lg sm:text-xl font-black text-[#D4FF00] mt-1">Onda 47mm Rake</span>
          </div>
        </div>

        {/* --- CATEGORY SELECTOR TABS --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {OFFICIAL_SPECS_DATA.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  sfx.playClick();
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 border backdrop-blur-xl ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#E4002B] text-white font-black border-transparent shadow-[0_0_30px_rgba(0,240,255,0.45)] scale-105'
                    : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* --- ACTIVE TAB: VISUAL COMPONENT CARDS --- */}
        {selectedCategory.id !== 'warranty-importer' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                  {selectedCategory.name}
                </h3>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">{selectedCategory.desc}</p>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 font-mono text-xs text-cyan-300 font-bold shadow-md">
                {selectedCategory.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedCategory.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0c1424]/90 border border-white/15 hover:border-[#00F0FF]/60 backdrop-blur-3xl transition-all duration-300 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,240,255,0.25)]"
                >
                  {/* Visual Square Image Header (1:1 Ratio - Fully Fitted) */}
                  <div className="relative w-full aspect-square bg-[#080d16] overflow-hidden flex items-center justify-center border-b border-white/10 group-hover:border-white/25 transition-colors">
                    {comp.fit === 'cover' ? (
                      <img
                        src={comp.image}
                        alt={comp.name}
                        onError={(e) => {
                          if (comp.fallbackImage && e.currentTarget.src !== comp.fallbackImage) {
                            e.currentTarget.src = comp.fallbackImage;
                          } else {
                            e.currentTarget.src = 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg';
                          }
                        }}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    ) : (
                      <div className="w-full h-full p-6 sm:p-7 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/40 via-zinc-900/90 to-[#070d18]">
                        <img
                          src={comp.image}
                          alt={comp.name}
                          onError={(e) => {
                            if (comp.fallbackImage && e.currentTarget.src !== comp.fallbackImage) {
                              e.currentTarget.src = comp.fallbackImage;
                            } else {
                              e.currentTarget.src = 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg';
                            }
                          }}
                          className="w-full h-full max-h-[92%] max-w-[92%] object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Ambient Lighting Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-3 py-1 rounded-full bg-black/85 border border-white/20 text-white font-mono text-[9.5px] sm:text-[10px] uppercase font-bold backdrop-blur-md shadow-md">
                        {comp.name}
                      </span>
                    </div>

                    {/* Bottom Technical Highlight Badge */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/90 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] sm:text-[9.5px] font-bold uppercase backdrop-blur-md shadow-lg truncate max-w-full">
                        <Zap className="w-3 h-3 text-[#00F0FF] shrink-0" />
                        <span className="truncate">{comp.highlight}</span>
                      </span>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1 truncate font-bold">
                        {comp.role}
                      </div>
                      <h4 className="font-display text-base font-extrabold text-white uppercase group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {comp.spec}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                      <span className="text-zinc-400 uppercase font-bold">MATERIAL</span>
                      <span className="text-zinc-200 font-semibold text-right truncate max-w-[150px]">{comp.material}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- WARRANTY, EXCLUSIONS & IMPORTER AUTHENTICITY SECTION --- */
          <div className="space-y-8">
            {/* Warranty Certificate Card */}
            <div className="bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0c1424]/90 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                      Official Product Warranty & Authenticity
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono">
                      Genuine Pinarello factory warranty against manufacturing defects in materials and workmanship.
                    </p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-green-500/15 border border-green-500/40 text-green-300 font-mono text-xs font-bold uppercase shadow-sm">
                  100% GENUINE HOMOLOGATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-sm text-zinc-300">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 backdrop-blur-md">
                  <div className="font-mono text-xs text-white uppercase font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                    <span>Warranty Coverage & Terms</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    This is a genuine product covered by factory warranty from the date of original purchase against manufacturing defects in materials and workmanship.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-300 pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>Available exclusively to the original purchaser/buyer.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>Service must be performed by the Brand or an authorized reseller.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>Online frame registration extends factory warranty coverage.</span>
                    </li>
                  </ul>
                </div>

                {/* Exclusions Summary */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 backdrop-blur-md">
                  <div className="font-mono text-xs text-white uppercase font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF5E0E]" />
                    <span>Standard Warranty Exclusions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed font-normal">
                    <li>• Misuse, improper installation, or unauthorized third-party alterations.</li>
                    <li>• Normal wear and tear, cosmetic scratches, dents, or natural weathering.</li>
                    <li>• Accidents, impacts, collisions, or exposure to extreme external forces.</li>
                    <li>• Water damage (water-repellant carbon construction, not submersible).</li>
                    <li>• Use of unapproved third-party accessories or incompatible fitments.</li>
                  </ul>
                </div>
              </div>

              {/* Importer & Customer Care Details */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 flex items-start gap-4">
                  <Building className="w-5 h-5 text-[#FF5E0E] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white uppercase font-bold mb-1">
                      Official Importer & Distributor
                    </div>
                    <div className="text-xs text-zinc-200 font-sans leading-relaxed font-normal">
                      <strong>Ensign Sports</strong><br />
                      502, Hill Glade, Opp. HDFC Bank Pali Road, Bandra, Mumbai - 400050, Maharashtra, India. (MH-27)
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-zinc-400">
                      Net Quantity: 1N • Commodity: Bicycles
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white uppercase font-bold mb-1">
                      Customer Care & Technical Support
                    </div>
                    <div className="text-xs text-zinc-200 font-sans leading-relaxed font-normal">
                      291, 10 Main, 5 Block, Jayanagar, Bangalore - 560041, Karnataka.<br />
                      Phone: <span className="text-white font-mono font-semibold">(080) 47183232</span><br />
                      Email: <span className="text-[#00F0FF] font-mono font-bold">support@bumsonthesaddle.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
