import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  Layers,
  Cpu,
  Zap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  DollarSign,
  Download,
  Flame,
  Award,
  CircleDot,
  Check,
  Palette,
} from 'lucide-react';
import { COLORWAYS } from '../Three/DogmaBike3D';
import { sfx } from '../../utils/animations';
import confetti from 'canvas-confetti';

export const GROUPSETS = [
  {
    id: 'dura-ace',
    name: 'Shimano Dura-Ace Di2 R9270',
    type: '2x12 Speed Electronic Wireless Cockpit',
    powerMeter: 'FC-R9200-P Dual Power Included',
    weightGrams: 2438,
    priceEuro: 4200,
    badge: 'INEOS GRENADIERS CHOICE',
  },
  {
    id: 'sram-red',
    name: 'SRAM Red AXS E-Tap',
    type: '2x12 Wireless Electronic with Orbit Damper',
    powerMeter: 'Quarq DZero Integrated Power Spider',
    weightGrams: 2365,
    priceEuro: 4450,
    badge: 'ULTRA-LIGHTWEIGHT',
  },
  {
    id: 'campy-super-record',
    name: 'Campagnolo Super Record Wireless',
    type: '2x12 Speed Italian Wireless Carbon Ergopower',
    powerMeter: 'Campagnolo HPPM Spider Power Meter',
    weightGrams: 2520,
    priceEuro: 4800,
    badge: 'ITALIAN PURIST',
  },
];

export const WHEELSETS = [
  {
    id: 'princeton-peak-4550',
    name: 'Princeton Peak 4550 DB*',
    depth: '45-50mm Sinusoidal Aero Rim',
    tires: 'Continental Gran Prix 5000S TR 28-622',
    weightGrams: 1340,
    priceEuro: 3950,
    badge: 'GRAND TOUR AERO',
  },
  {
    id: 'c50',
    name: 'Shimano Dura-Ace WH-R9270-C50',
    depth: '50mm Aero Carbon D2 Rim',
    tires: 'Continental Gran Prix 5000S TR 28-622',
    weightGrams: 1461,
    priceEuro: 2400,
    badge: 'ALL-ROUND BENCHMARK',
  },
  {
    id: 'dtswiss-1100',
    name: 'DT Swiss ARC 1100 Dicut 50',
    depth: '50mm Aero with SINC Ceramic Bearings',
    tires: 'Continental Gran Prix 5000S TR 28-622',
    weightGrams: 1380,
    priceEuro: 2850,
    badge: 'CERAMIC SPEED',
  },
  {
    id: 'c60',
    name: 'Shimano Dura-Ace WH-R9270-C60',
    depth: '60mm Deep Aero Sprinter Profile',
    tires: 'Continental Gran Prix 5000S TR 28-622',
    weightGrams: 1609,
    priceEuro: 2550,
    badge: 'PURE SPRINTER',
  },
];

export const COCKPITS = [
  { id: 'talon-400-100', width: '400mm', stem: '100mm', weightGrams: 310 },
  { id: 'talon-420-110', width: '420mm', stem: '110mm', weightGrams: 320 },
  { id: 'talon-440-120', width: '440mm', stem: '120mm', weightGrams: 335 },
];

export const SADDLES = [
  { id: 'most-lynx-ultrafast', name: 'Most Lynx Ultrafast Superflow L Carbon (145mm)', weightGrams: 129, priceEuro: 320 },
  { id: 'fizik-argo-00', name: 'Fi\'zi:k Vento Argo 00 Carbon (140mm)', weightGrams: 134, priceEuro: 290 },
  { id: 'selle-italia-tekno', name: 'Selle Italia SLR Boost Tekno Superflow', weightGrams: 95, priceEuro: 450 },
];

export const DogmaConfigurator = ({
  onOpenBooking,
  selectedColorway,
  onColorChange,
}) => {
  const [colorway, setColorway] = useState(selectedColorway || COLORWAYS[0]);
  const [selectedGroupset, setSelectedGroupset] = useState(GROUPSETS[0]);
  const [selectedWheelset, setSelectedWheelset] = useState(WHEELSETS[0]);
  const [selectedCockpit, setSelectedCockpit] = useState(COCKPITS[1]);
  const [selectedSaddle, setSelectedSaddle] = useState(SADDLES[0]);
  const [customInitials, setCustomInitials] = useState('INEOS-PRO');

  // Sync with external selectedColorway prop
  useEffect(() => {
    if (selectedColorway && selectedColorway.id !== colorway.id) {
      setColorway(selectedColorway);
    }
  }, [selectedColorway]);

  const baseFrameWeight = 865;
  const forkWeight = 390;
  const seatpostWeight = 160;
  const smallPartsAndTires = 640;

  const totalCalculatedWeightGrams =
    baseFrameWeight +
    forkWeight +
    seatpostWeight +
    selectedGroupset.weightGrams +
    selectedWheelset.weightGrams +
    selectedCockpit.weightGrams +
    selectedSaddle.weightGrams +
    smallPartsAndTires;

  const totalWeightKg = (totalCalculatedWeightGrams / 1000).toFixed(2);

  const baseFramePrice = 6400;
  const totalPriceEuro =
    baseFramePrice +
    selectedGroupset.priceEuro +
    selectedWheelset.priceEuro +
    selectedSaddle.priceEuro +
    750;

  const handleSelectColor = (c) => {
    setColorway(c);
    if (onColorChange) onColorChange(c);
    sfx.playClick();
  };

  const handleReserveBuild = () => {
    sfx.playChime();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FF3B00', '#FF6A00', '#00F0FF', '#FFFFFF', '#E5A93C'],
    });
    if (onOpenBooking) {
      onOpenBooking({
        model: 'Pinarello Dogma F TorayCa M40X',
        colorway: colorway.name,
        groupset: selectedGroupset.name,
        wheelset: selectedWheelset.name,
        weight: `${totalWeightKg} KG`,
        price: `€${totalPriceEuro.toLocaleString()}`,
        customInitials,
      });
    }
  };

  return (
    <section
      id="configurator"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#07080a] via-[#090b0f] to-[#07080a] border-t border-white/[0.04]"
    >
      {/* 1. Refined Atelier Studio Spotlight */}
      <div className="absolute top-1/4 right-0 w-[1000px] h-[600px] bg-white/[0.025] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[900px] h-[550px] bg-[#E4002B]/[0.04] rounded-full blur-[200px] pointer-events-none" />

      {/* 2. Bespoke Atelier Turntable Studio Geometry & Micro-Crosshairs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50%" cy="55%" rx="580" ry="240" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="6 12" />
          <ellipse cx="50%" cy="55%" rx="800" ry="340" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="15%" y1="55%" x2="85%" y2="55%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* --- INNER CENTERED CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-5 backdrop-blur-md shadow-inner font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5 animate-pulse text-[#E4002B]" />
            <span>05 // BESPOKE ATELIER // PINARELLO CUSTOM WORKSHOP</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.05]">
            BESPOKE ATELIER{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#E4002B] mt-1">
              BUILD STUDIO
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-200 font-sans max-w-2xl mx-auto leading-relaxed font-normal">
            Tailor your Pinarello Dogma F down to the exact gram, cockpit flare, ceramic bearing wheelset, and custom top-tube laser engraving.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold">
              TorayCa M40X Carbon Frame
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold">
              TiCR Full Internal Routing
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold">
              Hand-Assembled in Treviso
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Options Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Paint Livery Selection with Live Dynamic Cycle Preview */}
            <div className="bg-gradient-to-b from-white/[0.04] via-[#090b0f]/90 to-[#07080a]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.7)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Palette className="w-3.5 h-3.5 text-[#E4002B]" />
                    <span>1. OFFICIAL PAINT LIVERY & REAL-TIME STAGE</span>
                  </span>
                  <div className="font-display text-xl font-black text-white uppercase mt-1">
                    {colorway.name}
                  </div>
                </div>
                <span className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-200 text-[10px] font-mono font-bold uppercase shadow-sm">
                  {colorway.badge}
                </span>
              </div>

              {/* Side-by-Side Grid: Color Swatches & Live Cycle Preview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left Side: Colorway Selector Buttons */}
                <div className="md:col-span-6 grid grid-cols-1 gap-2.5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {COLORWAYS.map((c) => {
                    const isSelected = colorway.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleSelectColor(c)}
                        onMouseEnter={() => sfx.playHover()}
                        className={`flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#E4002B] bg-gradient-to-r from-red-600/30 via-white/[0.12] to-white/[0.06] shadow-[0_0_25px_rgba(228,0,43,0.4)] scale-[1.02]'
                            : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white/40 shrink-0 shadow-inner overflow-hidden relative flex items-center justify-center"
                          style={{
                            background:
                              c.swatchGradient ||
                              `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 50%, ${c.rearColor} 100%)`,
                          }}
                        >
                          {c.swatchImg && (
                            <img
                              src={c.swatchImg}
                              alt={c.name}
                              className="w-full h-full object-cover select-none pointer-events-none"
                            />
                          )}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <div className="font-display text-xs font-black text-white truncate">
                            {c.name}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-400 truncate">
                            {c.edition}
                          </div>
                        </div>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E4002B] shadow-[0_0_10px_#E4002B]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Side: Live Dynamic Cycle Image Showcase */}
                <div className="md:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-black/60 border border-white/10 overflow-hidden min-h-[290px] group shadow-inner">
                  {/* Dynamic Aura Glow matching selected bike color */}
                  <div
                    className="absolute w-60 h-60 rounded-full blur-[90px] opacity-40 transition-all duration-700 pointer-events-none"
                    style={{ backgroundColor: colorway.primaryColor }}
                  />

                  {/* Bike Image with smooth transition */}
                  <img
                    src={
                      colorway.bikeImage ||
                      'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png'
                    }
                    alt={colorway.name}
                    key={colorway.id}
                    className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.95)] transition-all duration-500 transform group-hover:scale-105"
                  />

                  {/* Shadow & Reflection */}
                  <div className="w-4/5 h-3 bg-black/90 rounded-full blur-md mt-2 pointer-events-none" />

                  {/* Bottom Color Details Overlay */}
                  <div className="mt-3 text-center z-10">
                    <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                      FINISH: <strong className="text-white">{colorway.name}</strong>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-400 uppercase mt-0.5 font-bold">
                      {colorway.edition}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Drivetrain & Groupset */}
            <div className="bg-gradient-to-b from-white/[0.04] via-[#090b0f]/90 to-[#07080a]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Cpu className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>2. ELECTRONIC DRIVETRAIN GROUPSET</span>
                </span>
                <span className="text-xs font-mono font-black text-white">
                  {selectedGroupset.name}
                </span>
              </div>
              <div className="space-y-3">
                {GROUPSETS.map((g) => {
                  const isSelected = selectedGroupset.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => {
                        setSelectedGroupset(g);
                        sfx.playClick();
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all gap-3 ${
                        isSelected
                          ? 'border-[#E4002B] bg-[#E4002B]/15 shadow-[0_0_20px_rgba(228,0,43,0.3)]'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm sm:text-base font-bold text-white">
                            {g.name}
                          </span>
                          <span className="text-[9px] font-mono bg-white/15 px-2.5 py-0.5 rounded-full text-white font-bold">
                            {g.badge}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-1">{g.powerMeter}</p>
                      </div>
                      <div className="text-left sm:text-right sm:shrink-0 font-mono">
                        <div className="text-sm font-black text-white">
                          +€{g.priceEuro.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-semibold">{g.weightGrams}g total</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Wheelset */}
            <div className="bg-gradient-to-b from-white/[0.04] via-[#090b0f]/90 to-[#07080a]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Layers className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>3. HIGH-MODULUS AERO WHEELSET</span>
                </span>
                <span className="text-xs font-mono font-black text-white">
                  {selectedWheelset.name}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {WHEELSETS.map((w) => {
                  const isSelected = selectedWheelset.id === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        setSelectedWheelset(w);
                        sfx.playClick();
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#E4002B] bg-[#E4002B]/15 shadow-[0_0_20px_rgba(228,0,43,0.3)]'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-xs sm:text-sm font-bold text-white">
                            {w.name}
                          </span>
                          <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/15 text-white font-bold">
                            {w.badge}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-300 mt-1">
                          {w.depth}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-2.5 border-t border-white/10 font-mono text-xs">
                        <span className="text-zinc-400 font-semibold">{w.weightGrams}g</span>
                        <span className="text-white font-black">
                          +€{w.priceEuro.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Cockpit & Custom Engraving */}
            <div className="bg-gradient-to-b from-white/[0.04] via-[#090b0f]/90 to-[#07080a]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.7)] grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-3 font-bold">
                  4. MOST TALON ULTRA FAST COCKPIT
                </span>
                <div className="space-y-2">
                  {COCKPITS.map((cp) => (
                    <button
                      key={cp.id}
                      onClick={() => {
                        setSelectedCockpit(cp);
                        sfx.playHover();
                      }}
                      className={`w-full flex justify-between items-center p-3 rounded-xl border text-xs font-mono transition-all ${
                        selectedCockpit.id === cp.id
                          ? 'border-[#E4002B] bg-[#E4002B]/20 text-white font-bold shadow-[0_0_12px_rgba(228,0,43,0.3)]'
                          : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      <span>
                        {cp.width} Bar × {cp.stem} Stem
                      </span>
                      <span>{cp.weightGrams}g</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-3 font-bold">
                  5. TOP-TUBE LASER MONOGRAM
                </span>
                <div className="space-y-3">
                  <input
                    type="text"
                    maxLength={16}
                    value={customInitials}
                    onChange={(e) => setCustomInitials(e.target.value.toUpperCase())}
                    placeholder="CUSTOM NAME / ID"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs font-mono text-white uppercase focus:outline-none focus:border-[#E4002B] shadow-inner font-bold placeholder:text-zinc-500"
                  />
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#E4002B]" />
                    <span>Laser-etched in Italian gold serif font on top-tube.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Spec Summary & Order Card Column */}
          <div className="lg:col-span-5 sticky top-28 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-[#07080a]/98 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.8)] space-y-6">
            <div className="pb-5 border-b border-white/15">
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#FF5E0E] bg-[#FF3B00]/15 px-3 py-1 rounded-full border border-[#FF3B00]/30 mb-3 font-bold">
                <Sparkles className="w-3 h-3" />
                <span>ATELIER TREVISO CERTIFIED</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                Pinarello Dogma F
              </h3>
              <p className="font-mono text-xs text-zinc-300 mt-1">
                TorayCa M40X Carbon • TiCR Routing • Asymmetric BB
              </p>
            </div>

            {/* Live Weight & Legal Tally */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/15 space-y-3 font-mono">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-300 uppercase tracking-wider font-bold">
                  CALCULATED TOTAL WEIGHT
                </span>
                <div className="text-right">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white">
                    {totalWeightKg} <span className="text-sm text-zinc-400 font-mono">KG</span>
                  </span>
                  <div className="text-[10px] text-zinc-400 font-semibold">
                    ({totalCalculatedWeightGrams}g complete build)
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="text-zinc-300">UCI Minimum (6.80 kg)</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E4002B]" />
                  <span>WorldTour Compliant</span>
                </span>
              </div>
            </div>

            {/* Configuration Breakdown */}
            <div className="space-y-3 text-xs font-mono bg-black/50 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-zinc-300">
                <span>Frameset (TorayCa M40X):</span>
                <span className="text-white font-bold">€{baseFramePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="truncate pr-2">{selectedGroupset.name}:</span>
                <span className="text-white font-bold shrink-0">
                  €{selectedGroupset.priceEuro.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="truncate pr-2">{selectedWheelset.name}:</span>
                <span className="text-white font-bold shrink-0">
                  €{selectedWheelset.priceEuro.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>MOST Talon Ultra Fast Cockpit:</span>
                <span className="text-white font-bold">€750</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>{selectedSaddle.name.split(' (')[0]}:</span>
                <span className="text-white font-bold">€{selectedSaddle.priceEuro}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Laser Monogram ({customInitials}):</span>
                <span className="text-[#E4002B] font-bold">COMPLIMENTARY</span>
              </div>
            </div>

            {/* Total Price */}
            <div className="pt-4 border-t border-white/15 flex justify-between items-baseline">
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-bold">
                ATELIER TREVISO ESTIMATE
              </span>
              <span className="font-display text-3xl sm:text-4xl font-black text-white">
                €{totalPriceEuro.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleReserveBuild}
                className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs uppercase tracking-widest font-black shadow-[0_0_35px_rgba(228,0,43,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>CONFIRM ATELIER SPECIFICATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sfx.playClick();
                  alert(
                    `Exporting Pinarello Dogma F Specification Dossier for Build #${customInitials}...`
                  );
                }}
                className="w-full py-3.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Specification Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
