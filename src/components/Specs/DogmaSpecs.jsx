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
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const SPEC_CATEGORIES = [
  {
    id: 'frame-materials',
    name: 'Frame & Materials',
    icon: Layers,
    badge: 'TORAYCA M40X',
    specs: [
      { label: 'Main Triangle Material', value: 'TorayCa M40X Carbon Fiber with Nanoalloy Technology' },
      { label: 'Carbon Tensile Modulus', value: '392 GPa (vs 377 GPa on previous T1100 1K)' },
      { label: 'Frame Design', value: 'Asymmetric Aerodynamic Monocoque (Pinarello Signature)' },
      { label: 'Bottom Bracket Architecture', value: 'Aero-Keel Down Tube rotated by 3.5° (Italian 70mm Threaded)' },
      { label: 'Seat Clamp Mechanism', value: '3D-Printed Titanium Integrated Hidden Internal Wedge' },
      { label: 'Unpainted Frame Weight', value: '865 grams (Size 530, RAW Carbon Finish)' },
      { label: 'UCI Homologation', value: 'Fully UCI Approved for WorldTour Competition' },
      { label: 'Max Tire Clearance', value: '700x30mm (Measured Width with ISO 4210 Compliance)' },
    ],
  },
  {
    id: 'aero-cockpit',
    name: 'Aero & Integration',
    icon: Wind,
    badge: '-4.8% AERO DRAG',
    specs: [
      { label: 'Cockpit Unit', value: 'MOST Talon Ultra Fast 1-Piece Integrated Carbon Bar/Stem' },
      { label: 'Internal Cable Routing', value: 'TiCR™ (Total Integrated Cable Routing - 100% Concealed)' },
      { label: 'Handlebar Flare', value: '7° Outward Flare (20mm wider at drops for sprint leverage)' },
      { label: 'Aero Profile', value: 'FlatBack Aero Tube Truncated Airfoil Shaping' },
      { label: 'Front Fork Type', value: 'NEW Onda Fork with 47mm Rake & ForkFlap™ Caliper Fairing' },
      { label: 'Aerodynamic Drag Savings', value: '-4.8% CdA reduction vs Dogma F12' },
      { label: 'Wattage Savings at 40 km/h', value: '3.2 Watts saved over standard aero frames' },
      { label: 'Integrated Mount', value: 'iTalon Aero Out-Front GPS / GoPro Mount' },
    ],
  },
  {
    id: 'drivetrain-brakes',
    name: 'Drivetrain & Brakes',
    icon: Cpu,
    badge: 'SHIMANO DURA-ACE DI2',
    specs: [
      { label: 'Electronic Groupset', value: 'Shimano Dura-Ace Di2 R9270 (2x12 Speed Wireless Cockpit)' },
      { label: 'Crankset & Power Meter', value: 'FC-R9200-P Hollowtech II Dual-Sided Precision Power Meter' },
      { label: 'Chainring Combinations', value: '54/40T (WorldTour Race) or 52/36T (Pro Compact)' },
      { label: 'Cassette Range', value: 'Shimano CS-R9200 Hyperglide+ 11-30T (11-12-13-14-15-16-17-19-21-24-27-30)' },
      { label: 'Brake System', value: 'Shimano BR-R9270 Hydraulic Flat Mount Disc Brakes' },
      { label: 'Disc Brake Rotors', value: 'Shimano RT-CL900 Ice Technologies Freeza (160mm F / 140mm R)' },
      { label: 'Derailleurs', value: 'FD-R9250 Braze-On / RD-R9250 Shadow RD 12-Speed' },
      { label: 'Battery', value: 'Internal Seatpost BT-DN300 Lithium-Ion (1,000+ km per charge)' },
    ],
  },
  {
    id: 'wheels-tires',
    name: 'Wheelset & Contact',
    icon: Zap,
    badge: 'DURA-ACE C50 CARBON',
    specs: [
      { label: 'Wheelset Option 1', value: 'Shimano Dura-Ace WH-R9270-C50-TL Full Carbon Tubeless' },
      { label: 'Wheelset Option 2 (Atelier)', value: 'Princeton CarbonWorks Peak 4550 Evolution Tactic Racing' },
      { label: 'Rim Depth & Profile', value: '50mm D2 Aerodynamic Section (21mm Internal / 28mm External)' },
      { label: 'Tires', value: 'Continental Grand Prix 5000 S TR (700x28c Tubeless Ready)' },
      { label: 'Hub Freehub Mechanism', value: 'Shimano Direct Engagement Ratchet (Zero Latency Transfer)' },
      { label: 'Thru-Axles', value: 'Pinarello E-Thru 12x100mm Front / 12x142mm Rear Axles' },
      { label: 'Saddle', value: 'Fi\'zi:k Vento Argo 00 Carbon Braided Rails (Short-Nose Aero)' },
      { label: 'Bar Tape', value: 'MOST Ultragrip Evo 3mm High-Tack Carbon Texture' },
    ],
  },
];

export const COMPARISONS = [
  {
    model: 'PINARELLO DOGMA F',
    brand: 'Pinarello',
    weight: '6.77 kg',
    stiffness: '+12% BB Stiffness',
    drag: 'Baseline (-4.8%)',
    carbon: 'TorayCa M40X Nanoalloy',
    routing: '100% TiCR Concealed',
    cda: '0.048 CdA',
    highlight: true,
  },
  {
    model: 'Dogma F12 (Previous Gen)',
    brand: 'Pinarello',
    weight: '7.05 kg',
    stiffness: 'Standard Baseline',
    drag: '+4.8% Drag',
    carbon: 'TorayCa T1100 1K',
    routing: 'TiCR Gen 1',
    cda: '0.051 CdA',
    highlight: false,
  },
  {
    model: 'S-Works Tarmac SL8',
    brand: 'Specialized',
    weight: '6.62 kg',
    stiffness: '+6% BB Stiffness',
    drag: '+1.4% Drag',
    carbon: 'Fact 12r Carbon',
    routing: 'Roval Rapide Internal',
    cda: '0.049 CdA',
    highlight: false,
  },
  {
    model: 'Cervélo S5 Disc',
    brand: 'Cervélo',
    weight: '7.42 kg',
    stiffness: '+8% BB Stiffness',
    drag: '-0.8% Drag (Heavier)',
    carbon: 'Oversized Carbon Layup',
    routing: 'V-Stem Split Routing',
    cda: '0.047 CdA',
    highlight: false,
  },
];

export const DogmaSpecs = () => {
  const [activeTab, setActiveTab] = useState(SPEC_CATEGORIES[0].id);

  const selectedCategory = SPEC_CATEGORIES.find((c) => c.id === activeTab) || SPEC_CATEGORIES[0];

  return (
    <section id="specifications" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Background Accent Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#FF3B00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF5E0E] text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Detailed Engineering Specs</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
          Minute Specifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] via-[#FF6A00] to-[#E5A93C]">Architecture</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          Every contour, fiber orientation, and mechanical tolerance of the Pinarello Dogma F has been engineered for pure aerodynamic dominance and instantaneous power delivery.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {SPEC_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                sfx.playHover();
              }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF3B00] to-[#FF5E0E] text-white font-bold shadow-glow-crimson scale-105'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Specifications Grid */}
      <div className="bg-obsidian-surface/80 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl mb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FF3B00]/10 border border-[#FF3B00]/30 text-[#FF5E0E]">
              {React.createElement(selectedCategory.icon, { className: 'w-5 h-5' })}
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                {selectedCategory.name}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">Pinarello Dogma F Technical Blueprint</p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 font-mono text-xs text-[#00F0FF] font-semibold">
            {selectedCategory.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {selectedCategory.specs.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#FF3B00]/40 transition-colors group"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 group-hover:text-[#FF5E0E] transition-colors">
                {item.label}
              </span>
              <span className="font-sans text-sm sm:text-base font-semibold text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Superbike Benchmark Matrix Comparison */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 uppercase mb-3">
            <Scale className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>WorldTour Benchmark Comparison</span>
          </div>
          <h3 className="font-display text-3xl font-bold uppercase text-white">
            Performance Matrix vs Flagship Competitors
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-obsidian-surface/60 backdrop-blur-xl">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-5">Chassis / Superbike</th>
                <th className="p-4 sm:p-5">Weight (Size 53)</th>
                <th className="p-4 sm:p-5">BB Lateral Stiffness</th>
                <th className="p-4 sm:p-5">Aero Drag (CdA)</th>
                <th className="p-4 sm:p-5">Carbon Composite</th>
                <th className="p-4 sm:p-5">Cable Integration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISONS.map((comp, i) => (
                <tr
                  key={i}
                  className={`transition-colors ${
                    comp.highlight
                      ? 'bg-[#FF3B00]/10 border-l-4 border-[#FF3B00] text-white font-semibold'
                      : 'hover:bg-white/[0.02] text-zinc-300'
                  }`}
                >
                  <td className="p-4 sm:p-5 font-sans font-bold flex items-center gap-2">
                    {comp.highlight && (
                      <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse" />
                    )}
                    <span>{comp.model}</span>
                  </td>
                  <td className="p-4 sm:p-5">{comp.weight}</td>
                  <td className="p-4 sm:p-5 text-[#D4FF00]">{comp.stiffness}</td>
                  <td className="p-4 sm:p-5 text-[#00F0FF]">{comp.cda}</td>
                  <td className="p-4 sm:p-5">{comp.carbon}</td>
                  <td className="p-4 sm:p-5">{comp.routing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
