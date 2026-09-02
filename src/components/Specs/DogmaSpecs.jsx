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
      },
      {
        name: 'Fork',
        spec: 'NEW eTICR Onda Fork with ForkFlap™, 1.5\' upper and lower steerer',
        role: 'Front Aerodynamics & High-Speed Stability',
        image: 'https://pinarello.com/storage/Technology/663e6ff8cbedabf2e2c307ac0457dfd5.jpg',
        material: 'Carbon (eTICR Integrated)',
        highlight: '47mm Rake • Caliper Vortex Elimination',
      },
      {
        name: 'Bottom Bracket',
        spec: 'Shimano Dura Ace SM-BB9200',
        role: 'Italian Threaded 70mm Bottom Bracket Shell',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBottomBracket/cg4SHICBottomBracket/P-BB-R9100_13587_1.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Precision Sealed Bearings',
        highlight: 'Aero-Keel 3.5° Rotated Air Channel',
      },
      {
        name: 'Seatpost & Clamp',
        spec: 'Pinarello Aero seatpost with 3D printed titanium top seatclamp and bolts',
        role: 'Aerodynamic Truncated Post & Lightweight Retention',
        image: 'https://pinarello.com/storage/ProductGallery/aa365cb48c17536181742afbc801f4f0.jpg',
        material: 'Carbon Aero Blade + 3D Ti Clamp',
        highlight: 'Fully Integrated Internal Wedge',
      },
    ],
  },
  {
    id: 'cockpit-contact',
    name: 'Cockpit & Touchpoints',
    icon: Wind,
    badge: 'MOST TALON ULTRA FAST',
    desc: 'Ergonomic integration with zero exposed wiring and high-tack tactile control.',
    components: [
      {
        name: 'Handlebar / Integrated Stem',
        spec: 'MOST Talon Ultra Fast',
        role: '1-Piece Aero Carbon Bar & Stem Cockpit',
        image: 'https://pinarello.com/storage/MenuVoice/9bfdf4bef5901b428c3974d2ece02754.jpg',
        material: 'High-Modulus Carbon Fiber',
        highlight: 'Twisted Lever Position • 7° Sprint Flare',
      },
      {
        name: 'Grips / Bartape',
        spec: 'MOST Bar Tape',
        role: 'High-Tack Anti-Vibration Carbon Texture',
        image: 'https://pinarello.com/storage/MenuVoice/d4c208a96afbf783bbafa84b1b0b5cd1.jpg',
        material: 'Microfiber PU with Gel Dampening',
        highlight: 'Tactile Wet & Dry Grip Transfer',
      },
      {
        name: 'Saddle',
        spec: 'Most Lynx Ultrafast Superflow L Carbon Large 145mm',
        role: 'Short-Nose Pressure Relief Racing Perch',
        image: 'https://pinarello.com/storage/MenuVoice/2aa61ef07d8042e8467de2f425044954.jpg',
        material: 'Carbon Reinforced Shell & CarboKeramic Rails',
        highlight: 'Superflow Central Cut-out • 145mm Width',
      },
    ],
  },
  {
    id: 'drivetrain',
    name: 'Shimano Dura-Ace Di2 Drivetrain',
    icon: Cpu,
    badge: '2X12 ELECTRONIC WIRELESS',
    desc: 'WorldTour-winning wireless electronic shifting with instantaneous gear synchronization.',
    components: [
      {
        name: 'Crankset',
        spec: 'Shimano Dura Ace FC-R9200, HollowTech 2, 12s',
        role: 'Hollow Forged Aluminum Power Transfer Arms',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICCrankset/cg4SHICCrankset/FC-R9200-52-36T-shic219-primary_1.jpg',
        material: 'HollowTech II Alloy Structure',
        highlight: 'Optimum Balance of Stiffness & Ultralight Weight',
      },
      {
        name: 'Rear Derailleur',
        spec: 'Shimano Dura Ace Di2 RD-R9200 12s',
        role: 'Shadow Electronic Rear Mech with Wireless Charging',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICRearDerailleur/cg4SHICRearDerailleur/RD-R9250-shic219-primary_1.jpg',
        material: 'Carbon Composite Cage & Alloy Body',
        highlight: 'Direct Mount Integration • 58% Faster Shift',
      },
      {
        name: 'Front Derailleur',
        spec: 'Shimano Dura Ace Di2 FD-9200 12S',
        role: 'Compact Braze-on Front Electronic Shifter',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICFrontDerailleur/cg4SHICFrontDerailleur/FD-R9250-shic219-primary_1.jpg',
        material: 'Cold-Forged CNC Linkage',
        highlight: 'Auto-Trimming Zero Chain-Rub Logic',
      },
      {
        name: 'Cassette',
        spec: 'Shimano Dura Ace CS-R9200 12S',
        role: 'Wide-Range Hyperglide+ Cog Cluster',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICCassetteSprocket/cg4SHICCassetteSprocket/CS-R9200-12-shic219-primary_1.jpg',
        material: 'Titanium & Nickel-Plated Steel Cogs',
        highlight: 'Continuous Smooth Power Shifts Under Load',
      },
      {
        name: 'Chain',
        spec: 'Shimano Dura Ace CN-HG 12S',
        role: 'Asymmetric 12-Speed Sil-Tec Coated Drive Link',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICChain/cg4SHICChain/CN-M9100-shic219-primary_1.jpg',
        material: 'Chromized Roller Link Plates',
        highlight: 'Sil-Tec Ultra-Low Friction Coating',
      },
    ],
  },
  {
    id: 'brakes-wheels',
    name: 'Brakes, Wheels & Tires',
    icon: Zap,
    badge: 'HYDRAULIC DISC & PRINCETON CARBON',
    desc: 'Formula 1 grade stopping modulation combined with sinusoidal aerodynamic carbon hoops.',
    components: [
      {
        name: 'Front Brake System',
        spec: 'Dura Ace BR-R9200, 2 pistons caliper, 160mm rotor',
        role: 'Flat-Mount Hydraulic Disc with Servo Wave Action',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBrake/cg4SHICBrakeCaliper/BR-R9270-F-shic219-primary_1.jpg',
        material: 'Mono-block Aluminum Caliper',
        highlight: '160mm CenterLock Ice-Tech Freeza Rotor',
      },
      {
        name: 'Rear Brake System',
        spec: 'Dura Ace BR-R9200, 2 pistons caliper, 140mm rotor',
        role: 'Flat-Mount Hydraulic Disc Integrated Rear Assembly',
        image: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBrake/cg4SHICBrakeCaliper/BR-R9270-R-shic219-primary_1.jpg',
        material: 'Mono-block Aluminum Caliper',
        highlight: '140mm Low-Profile Rotor for Modulated Control',
      },
      {
        name: 'Front & Rear Wheelset',
        spec: 'PRINCETON PEAK 4550 DB*',
        role: 'Sinusoidal Aerodynamic High-Power Wheelset',
        image: 'https://roadbikeaction.com/wp-content/uploads/2021/06/Princeton-Carbonworks-Peak-4550-cross-scaled.jpg',
        material: 'Variable-Depth Full Carbon Rim',
        highlight: '45-50mm Wave Depth • Disc Brake Optimized',
      },
      {
        name: 'Tires',
        spec: 'Continental Grand Prix 5000S TR 28-622',
        role: 'Tubeless-Ready WorldTour Racing Rubber',
        image: 'https://www.continental-tires.com/adobe/dynamicmedia/deliver/dm-aid--1d78b7a8-16ea-4800-b280-7897c9676b22/Continental_Grand-Prix-5000-S-TR_ChristopherLanaway_Lifestyle_32.jpg?width=600',
        material: 'BlackChili Compound + Vectran Breaker',
        highlight: '700x28c Width • Unsurpassed Cornering Grip',
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
    <section id="specifications" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Background Accent Lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#E4002B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* --- OFFICIAL QUOTE BANNER --- */}
      <div className="relative mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] via-[#E4002B]/10 to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E4002B] uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Pinarello Design Philosophy</span>
          </div>
          <blockquote className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed italic">
            “We’ve always stood out from the crowd and created bikes that are totally unique, both in terms of how they look, but more importantly, how they perform. Form over function is a constant source of discussion between our head designers and we believe the DOGMA F achieves the perfect blend of the two.”
          </blockquote>
          <div className="mt-4 font-mono text-xs text-zinc-400 uppercase tracking-widest">
            — Pinarello Head of R&D, Treviso, Italy
          </div>
        </div>

        {/* 3 Core Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4002B] shrink-0" />
            <span className="text-zinc-300">
              Lightweight & aerodynamic wheels for efficient power transfer and speed
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shrink-0" />
            <span className="text-zinc-300">
              Chassis geometry balanced for both WorldTour performance and endurance comfort
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] shrink-0" />
            <span className="text-zinc-300">
              Provides an ultra-wide range of 12-speed gears for all climbing and sprint conditions
            </span>
          </div>
        </div>
      </div>

      {/* --- SECTION HEADER --- */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF5E0E] text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Technical Blueprint</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
          MINUTE SPECIFICATIONS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E5A93C]">ARCHITECTURE</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
          Explore complete mechanical specifications with illustrated visual component breakdowns, materials, and official warranty documentation.
        </p>
      </div>

      {/* --- QUICK SPEC SUMMARY BAR --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
        <div className="p-4 rounded-2xl bg-obsidian-surface/80 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">INTENDED USE</span>
          <span className="font-display text-lg font-bold text-white mt-1">Road Racing</span>
        </div>
        <div className="p-4 rounded-2xl bg-obsidian-surface/80 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">WHEEL SIZE</span>
          <span className="font-display text-lg font-bold text-[#00F0FF] mt-1">700c</span>
        </div>
        <div className="p-4 rounded-2xl bg-obsidian-surface/80 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">BRAKING SYSTEM</span>
          <span className="font-display text-lg font-bold text-white mt-1">Hydraulic Disc</span>
        </div>
        <div className="p-4 rounded-2xl bg-obsidian-surface/80 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">FRAME MATERIAL</span>
          <span className="font-display text-lg font-bold text-[#E4002B] mt-1">Carbon (M40X)</span>
        </div>
        <div className="p-4 rounded-2xl bg-obsidian-surface/80 border border-white/10 flex flex-col justify-between col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">FORK MATERIAL</span>
          <span className="font-display text-lg font-bold text-[#D4FF00] mt-1">Carbon (Onda)</span>
        </div>
      </div>

      {/* --- CATEGORY SELECTOR TABS --- */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
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
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                isActive
                  ? 'bg-gradient-to-r from-[#E4002B] to-[#FF5E0E] text-white font-bold border-transparent shadow-[0_0_20px_rgba(228,0,43,0.4)] scale-105'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border-white/10'
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
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{selectedCategory.desc}</p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#E4002B]/10 border border-[#E4002B]/30 font-mono text-xs text-[#FF5E0E] font-bold">
              {selectedCategory.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCategory.components.map((comp, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-obsidian-surface/80 border border-white/10 hover:border-white/25 backdrop-blur-xl transition-all duration-300 flex flex-col shadow-2xl"
              >
                {/* Visual Image Header for each option */}
                <div className="relative w-full h-48 sm:h-56 bg-black/90 overflow-hidden flex items-center justify-center p-4 border-b border-white/10">
                  <img
                    src={comp.image}
                    alt={comp.name}
                    onError={(e) => {
                      if (comp.fallbackImage && e.currentTarget.src !== comp.fallbackImage) {
                        e.currentTarget.src = comp.fallbackImage;
                      } else {
                        e.currentTarget.src = 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg';
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 border border-white/15 text-white font-mono text-[10px] uppercase font-bold backdrop-blur-md">
                      {comp.name}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E4002B]/20 border border-[#E4002B]/40 text-[#FF5E0E] font-mono text-[10px] font-bold uppercase backdrop-blur-md">
                      <Zap className="w-3 h-3" />
                      {comp.highlight}
                    </span>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                      {comp.role}
                    </div>
                    <h4 className="font-display text-lg sm:text-xl font-extrabold text-white uppercase group-hover:text-[#FF5E0E] transition-colors">
                      {comp.spec}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500 uppercase">MATERIAL / STRUCT</span>
                    <span className="text-zinc-200 font-semibold">{comp.material}</span>
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
          <div className="bg-obsidian-surface/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#E4002B]/15 border border-[#E4002B]/30 text-[#E4002B]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                    Official Product Warranty & Authenticity
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Genuine Pinarello factory warranty against manufacturing defects in materials and workmanship.
                  </p>
                </div>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs font-bold uppercase">
                100% GENUINE HOMOLOGATION
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-sm text-zinc-300">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-3">
                <div className="font-mono text-xs text-white uppercase font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                  <span>Warranty Coverage & Terms</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  This is a genuine product covered by factory warranty from the date of original purchase against manufacturing defects in materials and workmanship.
                </p>
                <ul className="space-y-2 text-xs font-mono text-zinc-400 pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E4002B] font-bold">•</span>
                    <span>Available exclusively to the original purchaser/buyer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E4002B] font-bold">•</span>
                    <span>Service must be performed by the Brand or an authorized reseller.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E4002B] font-bold">•</span>
                    <span>Online frame registration extends factory warranty coverage.</span>
                  </li>
                </ul>
              </div>

              {/* Exclusions Summary */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-3">
                <div className="font-mono text-xs text-white uppercase font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF5E0E]" />
                  <span>Standard Warranty Exclusions</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed">
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
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-4">
                <Building className="w-5 h-5 text-[#E4002B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs text-white uppercase font-bold mb-1">
                    Official Importer & Distributor
                  </div>
                  <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                    <strong>Ensign Sports</strong><br />
                    502, Hill Glade, Opp. HDFC Bank Pali Road, Bandra, Mumbai - 400050, Maharashtra, India. (MH-27)
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-zinc-500">
                    Net Quantity: 1N • Commodity: Bicycles
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs text-white uppercase font-bold mb-1">
                    Customer Care & Technical Support
                  </div>
                  <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                    291, 10 Main, 5 Block, Jayanagar, Bangalore - 560041, Karnataka.<br />
                    Phone: <span className="text-white font-mono font-semibold">(080) 47183232</span><br />
                    Email: <span className="text-[#00F0FF] font-mono">support@bumsonthesaddle.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
