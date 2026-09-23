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
  ChevronRight,
  ChevronLeft,
  Bike,
  Wrench,
  Compass,
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
    icon: '⚡',
  },
  {
    id: 'sram-red',
    name: 'SRAM Red AXS E-Tap',
    type: '2x12 Wireless Electronic with Orbit Damper',
    powerMeter: 'Quarq DZero Integrated Power Spider',
    weightGrams: 2365,
    priceEuro: 4450,
    badge: 'ULTRA-LIGHTWEIGHT',
    icon: '🔴',
  },
  {
    id: 'campy-super-record',
    name: 'Campagnolo Super Record Wireless',
    type: '2x12 Speed Italian Wireless Carbon Ergopower',
    powerMeter: 'Campagnolo HPPM Spider Power Meter',
    weightGrams: 2520,
    priceEuro: 4800,
    badge: 'ITALIAN PURIST',
    icon: '🇮🇹',
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
  {
    id: 'talon-400-100',
    width: '400mm',
    stem: '100mm',
    reach: '80mm',
    drop: '125mm',
    weightGrams: 310,
    description: 'Compact aero profile for aggressive climbing posture',
  },
  {
    id: 'talon-420-110',
    width: '420mm',
    stem: '110mm',
    reach: '80mm',
    drop: '125mm',
    weightGrams: 320,
    description: 'Pro peloton standard balanced aero & sprinting lever',
  },
  {
    id: 'talon-440-120',
    width: '440mm',
    stem: '120mm',
    reach: '80mm',
    drop: '125mm',
    weightGrams: 335,
    description: 'Extended reach for rouleur endurance & flat wattage',
  },
];

export const SADDLES = [
  {
    id: 'most-lynx-ultrafast',
    name: 'Most Lynx Ultrafast Superflow L Carbon',
    dimensions: '145mm Width • CarboKeramic 7x9 Rails',
    weightGrams: 129,
    priceEuro: 320,
    badge: 'OFFICIAL TEAM MATCH',
  },
  {
    id: 'fizik-argo-00',
    name: "Fi'zi:k Vento Argo 00 Carbon",
    dimensions: '140mm Width • Mobius Carbon Rail System',
    weightGrams: 134,
    priceEuro: 290,
    badge: 'SHORT-NOSE AERO',
  },
  {
    id: 'selle-italia-tekno',
    name: 'Selle Italia SLR Boost Tekno Superflow',
    dimensions: '130mm Width • Hi-Tech Full Carbon Shell',
    weightGrams: 95,
    priceEuro: 450,
    badge: 'FEATHERWEIGHT RECORD',
  },
];

const CONFIG_STEPS = [
  { id: 'groupset', label: '1. DRIVETRAIN', icon: Cpu },
  { id: 'wheels', label: '2. AERO WHEELS', icon: Layers },
  { id: 'cockpit', label: '3. COCKPIT', icon: Compass },
  { id: 'saddle', label: '4. SADDLE', icon: Award },
  { id: 'monogram', label: '5. MONOGRAM', icon: Sparkles },
];

export const DogmaConfigurator = ({
  onOpenBooking,
  selectedColorway,
  onColorChange,
}) => {
  const [colorway, setColorway] = useState(selectedColorway || COLORWAYS[0]);
  const [activeStep, setActiveStep] = useState('groupset');
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
        cockpit: `${selectedCockpit.width} × ${selectedCockpit.stem}`,
        saddle: selectedSaddle.name,
        weight: `${totalWeightKg} KG`,
        price: `€${totalPriceEuro.toLocaleString()}`,
        customInitials,
      });
    }
  };

  const currentStepIndex = CONFIG_STEPS.findIndex((s) => s.id === activeStep);
  const nextStep = () => {
    if (currentStepIndex < CONFIG_STEPS.length - 1) {
      setActiveStep(CONFIG_STEPS[currentStepIndex + 1].id);
      sfx.playClick();
    }
  };
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setActiveStep(CONFIG_STEPS[currentStepIndex - 1].id);
      sfx.playClick();
    }
  };

  return (
    <section
      id="configurator"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0f1424] via-[#151d30] to-[#0e1322] border-t border-white/[0.08]"
    >
      {/* 1. Refined Atelier Studio Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-white/[0.035] rounded-full blur-[180px] pointer-events-none" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[200px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: colorway.primaryColor || '#9f8d5e' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[200px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: colorway.accentColor || colorway.primaryColor || '#9f8d5e' }}
      />

      {/* 2. Bespoke Atelier Turntable Studio Geometry & Micro-Crosshairs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50%" cy="40%" rx="640" ry="260" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="6 12" />
          <ellipse cx="50%" cy="40%" rx="900" ry="380" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="10%" y1="40%" x2="90%" y2="40%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* --- INNER CENTERED CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
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
            Configure your custom Pinarello Dogma F in real-time. Select official WorldTour paint liveries, ultra-high modulus wheelsets, wireless electronic drivetrains, and laser-engraved monogramming.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E4002B]" />
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

        {/* ============================================================ */}
        {/* PANORAMIC ATELIER TURNTABLE STAGE (Full-Width Hero Showcase) */}
        {/* ============================================================ */}
        <div className="relative mb-12 rounded-3xl bg-gradient-to-b from-white/[0.06] via-[#090b10]/95 to-[#06070a]/98 border border-white/15 p-6 sm:p-10 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.8)] overflow-hidden group">
          {/* Ambient Livery Spotlight Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] rounded-full blur-[110px] opacity-40 transition-all duration-700 pointer-events-none"
            style={{ background: colorway.swatchGradient || colorway.primaryColor }}
          />

          {/* Top Info Bar inside Stage */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping bg-[#E4002B]" />
                <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider">
                  ATELIER LIVE STAGE // {colorway.code}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase">
                  {colorway.badge}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase mt-1 tracking-tight">
                {colorway.name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/15 text-right">
                <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">LIVE TOTAL WEIGHT</div>
                <div className="font-display text-lg sm:text-xl font-black text-white">
                  {totalWeightKg} <span className="text-xs font-mono text-[#E4002B]">KG</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/15 text-right">
                <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">BUILD ESTIMATE</div>
                <div className="font-display text-lg sm:text-xl font-black text-white">
                  €{totalPriceEuro.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Centerpiece Bike Visualizer Stage */}
          <div className="relative z-10 py-6 sm:py-10 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[380px]">
            <img
              src={
                colorway.bikeImage ||
                'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png'
              }
              alt={colorway.name}
              key={colorway.id}
              className="relative z-10 w-full max-w-[480px] sm:max-w-[620px] md:max-w-[720px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.98)] transition-all duration-700 transform group-hover:scale-[1.02]"
            />

            {/* Ground Ellipse Shadow */}
            <div className="w-3/4 sm:w-2/3 h-4 sm:h-6 bg-black/95 rounded-full blur-lg mt-2 pointer-events-none" />

            {/* Laser Monogram Virtual Badge on Top Tube */}
            {customInitials && (
              <div className="mt-4 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/40 backdrop-blur-md shadow-lg flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono tracking-widest text-amber-300 font-bold uppercase">
                  MONOGRAM ETCHING: <span className="text-white underline decoration-amber-400 font-black">{customInitials}</span>
                </span>
              </div>
            )}
          </div>

          {/* Livery Palette Selector Strip */}
          <div className="relative z-10 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider flex items-center gap-2 font-bold">
                <Palette className="w-3.5 h-3.5 text-[#E4002B]" />
                <span>SELECT OFFICIAL WORLDTOUR LIVERY COLORWAY</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline-block">
                5 Exclusive Treviso Atelier Finishes
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {COLORWAYS.map((c) => {
                const isSelected = colorway.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectColor(c)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'scale-[1.02] bg-white/[0.10]'
                        : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25'
                    }`}
                    style={{
                      borderColor: isSelected ? (c.accentColor || c.primaryColor) : undefined,
                      boxShadow: isSelected ? `0 0 25px ${(c.accentColor || c.primaryColor)}44` : undefined,
                    }}
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
                      <div className="text-[9px] font-mono text-zinc-400 truncate">
                        {c.code}
                      </div>
                    </div>
                    {isSelected && (
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: c.accentColor || c.primaryColor,
                          boxShadow: `0 0 8px ${c.accentColor || c.primaryColor}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BALANCED 2-COLUMN ATELIER WORKSTATION & BUILD DOSSIER */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* BALANCED 2-COLUMN ATELIER WORKSTATION & BUILD DOSSIER */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Step-by-Step Component Workshop */}
          <div className="lg:col-span-7 flex flex-col bg-gradient-to-b from-white/[0.04] via-[#090b0f]/90 to-[#07080a]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.7)]">
            {/* Category Step Navigation Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Wrench className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>STEP-BY-STEP WORKSHOP SELECTION</span>
                </span>
                <div className="font-display text-lg font-black text-white uppercase mt-0.5">
                  CUSTOMIZE COMPONENTS
                </div>
              </div>
              <div className="text-right font-mono text-[11px] text-zinc-400">
                STEP <strong className="text-white">{currentStepIndex + 1}</strong> OF <strong className="text-white">{CONFIG_STEPS.length}</strong>
              </div>
            </div>

            {/* Step Tab Buttons Bar */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-5 p-1.5 rounded-2xl bg-black/50 border border-white/10">
              {CONFIG_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      sfx.playHover();
                    }}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl font-mono text-[10px] sm:text-xs transition-all ${
                      isActive
                        ? 'bg-[#E4002B] text-white font-bold shadow-[0_0_15px_rgba(228,0,43,0.5)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate hidden md:inline">{step.label}</span>
                    <span className="truncate md:hidden">{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Step Content Area */}
            <div>
              {/* 1. Drivetrain Step */}
              {activeStep === 'groupset' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span>CHOOSE ELECTRONIC TRANSMISSION</span>
                    <span className="text-white font-bold">{selectedGroupset.name}</span>
                  </div>
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
                          <p className="text-[10px] font-mono text-zinc-400 mt-0.5">{g.type}</p>
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
              )}

              {/* 2. Wheelset Step */}
              {activeStep === 'wheels' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span>CHOOSE HIGH-MODULUS AERO WHEELSET</span>
                    <span className="text-white font-bold">{selectedWheelset.name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
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
                            <div className="text-[10px] font-mono text-zinc-300 mt-1.5">
                              {w.depth}
                            </div>
                            <div className="text-[9px] font-mono text-zinc-400 mt-0.5">
                              {w.tires}
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
              )}

              {/* 3. Cockpit Step */}
              {activeStep === 'cockpit' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span>CHOOSE MOST TALON ULTRA FAST COCKPIT</span>
                    <span className="text-white font-bold">{selectedCockpit.width} × {selectedCockpit.stem}</span>
                  </div>
                  {COCKPITS.map((cp) => {
                    const isSelected = selectedCockpit.id === cp.id;
                    return (
                      <button
                        key={cp.id}
                        onClick={() => {
                          setSelectedCockpit(cp);
                          sfx.playClick();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border text-left transition-all gap-2 ${
                          isSelected
                            ? 'border-[#E4002B] bg-[#E4002B]/15 text-white shadow-[0_0_20px_rgba(228,0,43,0.3)]'
                            : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                        }`}
                      >
                        <div>
                          <div className="font-display text-sm font-bold text-white flex items-center gap-2">
                            <span>{cp.width} Width × {cp.stem} Stem Length</span>
                            {isSelected && <span className="text-[9px] font-mono bg-[#E4002B] px-2 py-0.5 rounded text-white font-bold">SELECTED</span>}
                          </div>
                          <p className="text-xs text-zinc-300 mt-1">{cp.description}</p>
                          <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                            Reach: {cp.reach} • Drop: {cp.drop} • TiCR Internal Routing
                          </p>
                        </div>
                        <div className="text-left sm:text-right font-mono shrink-0">
                          <div className="text-sm font-bold text-white">Included in Build</div>
                          <div className="text-xs text-zinc-400">{cp.weightGrams}g</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 4. Saddle Step */}
              {activeStep === 'saddle' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span>CHOOSE ATELIER CARBON SADDLE</span>
                    <span className="text-white font-bold">{selectedSaddle.name.split(' (')[0]}</span>
                  </div>
                  {SADDLES.map((s) => {
                    const isSelected = selectedSaddle.id === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedSaddle(s);
                          sfx.playClick();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border text-left transition-all gap-2 ${
                          isSelected
                            ? 'border-[#E4002B] bg-[#E4002B]/15 text-white shadow-[0_0_20px_rgba(228,0,43,0.3)]'
                            : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.08]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold text-white">
                              {s.name}
                            </span>
                            <span className="text-[9px] font-mono bg-white/15 px-2.5 py-0.5 rounded text-white font-bold">
                              {s.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 mt-1">{s.dimensions}</p>
                        </div>
                        <div className="text-left sm:text-right font-mono shrink-0">
                          <div className="text-sm font-black text-white">+€{s.priceEuro}</div>
                          <div className="text-xs text-zinc-400">{s.weightGrams}g</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 5. Monogram Step */}
              {activeStep === 'monogram' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>CUSTOM TOP-TUBE LASER ENGRAVING</span>
                    <span className="text-[#E4002B] font-bold">COMPLIMENTARY</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3">
                    <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider font-bold">
                      ENTER RIDER ID / CALLSIGN / NAME (MAX 16 CHARS)
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={customInitials}
                      onChange={(e) => setCustomInitials(e.target.value.toUpperCase())}
                      placeholder="ENTER CALLSIGN / NAME"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-mono text-white uppercase focus:outline-none focus:border-[#E4002B] shadow-inner font-black tracking-widest placeholder:text-zinc-600"
                    />

                    {/* Laser Plate Preview */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-black to-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-[10px] font-mono text-amber-300 uppercase font-bold">
                            TOP TUBE LASER ETCHING PREVIEW
                          </div>
                          <div className="font-serif italic text-base sm:text-lg text-amber-200 tracking-wider font-bold mt-0.5">
                            "{customInitials || 'YOUR-NAME'}"
                          </div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                        ITALIAN GOLD SERIF
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 space-y-1">
                    <div className="text-white font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Treviso Master Painter Signature Certificate</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Every Dogma F built in the Treviso atelier comes with a personalized certificate of authenticity signed by the lead master builder.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper Navigation Footer */}
            <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
                  currentStepIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-zinc-500'
                    : 'bg-white/10 hover:bg-white/20 text-white font-bold'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>

              <div className="flex items-center gap-1.5">
                {CONFIG_STEPS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? 'w-6 bg-[#E4002B]'
                        : idx < currentStepIndex
                        ? 'bg-white/60'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {currentStepIndex < CONFIG_STEPS.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all"
                >
                  <span>NEXT STEP</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleReserveBuild}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E4002B] hover:bg-[#ff1a40] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(228,0,43,0.5)] transition-all"
                >
                  <span>CONFIRM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Atelier Treviso Build Dossier Card */}
          <div className="lg:col-span-5 flex flex-col bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-[#07080a]/98 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.8)] space-y-5">
            <div>
              <div className="pb-4 border-b border-white/15">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#FF5E0E] bg-[#FF3B00]/15 px-3 py-1 rounded-full border border-[#FF3B00]/30 mb-2.5 font-bold">
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
              <div className="my-4 p-4 rounded-2xl bg-black/50 border border-white/15 space-y-2.5 font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-300 uppercase tracking-wider font-bold">
                    CALCULATED TOTAL WEIGHT
                  </span>
                  <div className="text-right">
                    <span className="font-display text-2xl sm:text-3xl font-black text-white">
                      {totalWeightKg} <span className="text-sm text-zinc-400 font-mono">KG</span>
                    </span>
                    <div className="text-[10px] text-zinc-400 font-semibold">
                      ({totalCalculatedWeightGrams}g complete build)
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">UCI Minimum (6.80 kg)</span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E4002B]" />
                    <span>WorldTour Compliant</span>
                  </span>
                </div>
              </div>

              {/* Itemized Specification Ledger */}
              <div className="space-y-2 text-xs font-mono bg-black/60 p-3.5 rounded-2xl border border-white/10">
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
                  <span>MOST Talon Cockpit:</span>
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
              <div className="pt-3.5 mt-3.5 border-t border-white/15 flex justify-between items-baseline">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-bold">
                  ATELIER TREVISO ESTIMATE
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-white">
                  €{totalPriceEuro.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleReserveBuild}
                className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs uppercase tracking-widest font-black shadow-[0_0_30px_rgba(228,0,43,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
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
                className="w-full py-3 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Specification Dossier</span>
              </button>

              <div className="text-center pt-1">
                <span className="text-[10px] font-mono text-zinc-400">
                  🇮🇹 Handcrafted in Treviso, Italy • UCI Registered • Lifetime Frame Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
