import React, { useState } from 'react';
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
    id: 'c50',
    name: 'Shimano Dura-Ace WH-R9270-C50',
    depth: '50mm Aero Carbon D2 Rim',
    tires: 'Continental GP5000 S TR 28mm',
    weightGrams: 1461,
    priceEuro: 2400,
  },
  {
    id: 'princeton-4550',
    name: 'Princeton CarbonWorks Peak 4550',
    depth: '45-50mm Sinusoidal Aero Rim',
    tires: 'Continental GP5000 TT TR 28mm',
    weightGrams: 1340,
    priceEuro: 3950,
  },
  {
    id: 'dtswiss-1100',
    name: 'DT Swiss ARC 1100 Dicut 50',
    depth: '50mm Aero with SINC Ceramic Bearings',
    tires: 'Schwalbe Pro One TLE 28mm',
    weightGrams: 1380,
    priceEuro: 2850,
  },
  {
    id: 'c60',
    name: 'Shimano Dura-Ace WH-R9270-C60',
    depth: '60mm Deep Aero Sprinter Profile',
    tires: 'Continental GP5000 S TR 28mm',
    weightGrams: 1609,
    priceEuro: 2550,
  },
];

export const COCKPITS = [
  { id: 'talon-400-100', width: '400mm', stem: '100mm', weightGrams: 310 },
  { id: 'talon-420-110', width: '420mm', stem: '110mm', weightGrams: 320 },
  { id: 'talon-440-120', width: '440mm', stem: '120mm', weightGrams: 335 },
];

export const SADDLES = [
  { id: 'fizik-argo-00', name: 'Fi\'zi:k Vento Argo 00 Carbon', weightGrams: 134, priceEuro: 290 },
  { id: 'selle-italia-tekno', name: 'Selle Italia SLR Boost Tekno Superflow', weightGrams: 95, priceEuro: 450 },
  { id: 'prologo-dimension', name: 'Prologo Dimension Nack Carbon Rails', weightGrams: 149, priceEuro: 240 },
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

  const baseFrameWeight = 865; // grams (Size 530 raw)
  const forkWeight = 390;
  const seatpostWeight = 160;
  const smallPartsAndTires = 640; // rotors, thru-axles, sealant, tape

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

  const baseFramePrice = 6400; // Euro for Dogma F TorayCa M40X frameset
  const totalPriceEuro =
    baseFramePrice +
    selectedGroupset.priceEuro +
    selectedWheelset.priceEuro +
    selectedSaddle.priceEuro +
    750; // Talon cockpit & assembly

  const handleSelectColor = (c) => {
    setColorway(c);
    if (onColorChange) onColorChange(c);
    sfx.playClick();
  };

  const handleReserveBuild = () => {
    sfx.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
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
    <section id="configurator" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4FF00] text-xs font-mono tracking-widest uppercase mb-4">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Atelier Pinarello Treviso</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          Bespoke Dogma F <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B00] via-[#FF6A00] to-[#E5A93C]">Build Studio</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          Tailor your Pinarello Dogma F down to the exact gram, cockpit flare, ceramic bearing wheelset, and custom top-tube laser engraving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Options Controls Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Paint Livery Selection */}
          <div className="bg-obsidian-surface/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                1. Official Paint Livery
              </span>
              <span className="text-xs font-mono text-[#FF5E0E]">{colorway.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COLORWAYS.map((c) => {
                const isSelected = colorway.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectColor(c)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#FF3B00] bg-[#FF3B00]/10 shadow-glow-crimson'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-white/20 shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 50%, ${c.rearColor} 100%)`,
                      }}
                    />
                    <div className="overflow-hidden">
                      <div className="font-display text-xs font-bold text-white truncate">{c.name}</div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate">{c.edition}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Drivetrain & Groupset */}
          <div className="bg-obsidian-surface/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                2. Electronic Drivetrain Groupset
              </span>
              <span className="text-xs font-mono text-[#00F0FF]">{selectedGroupset.name}</span>
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
                    className={`w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border text-left transition-all gap-2 ${
                      isSelected
                        ? 'border-[#00F0FF] bg-[#00F0FF]/10 shadow-glow-cyan'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-white">{g.name}</span>
                        <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-zinc-300">
                          {g.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{g.powerMeter}</p>
                    </div>
                    <div className="text-right sm:shrink-0 font-mono">
                      <div className="text-xs font-bold text-[#D4FF00]">+€{g.priceEuro.toLocaleString()}</div>
                      <div className="text-[10px] text-zinc-500">{g.weightGrams}g</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Wheelset */}
          <div className="bg-obsidian-surface/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                3. High-Modulus Aero Wheelset
              </span>
              <span className="text-xs font-mono text-[#D4FF00]">{selectedWheelset.name}</span>
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
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#D4FF00] bg-[#D4FF00]/10 shadow-glow-lime'
                        : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="font-display text-xs font-bold text-white">{w.name}</div>
                    <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{w.depth}</div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10 font-mono text-xs">
                      <span className="text-zinc-500">{w.weightGrams}g</span>
                      <span className="text-white font-bold">+€{w.priceEuro.toLocaleString()}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Cockpit & Custom Engraving */}
          <div className="bg-obsidian-surface/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                4. MOST Talon Fast Cockpit
              </span>
              <div className="space-y-2">
                {COCKPITS.map((cp) => (
                  <button
                    key={cp.id}
                    onClick={() => {
                      setSelectedCockpit(cp);
                      sfx.playHover();
                    }}
                    className={`w-full flex justify-between items-center p-2.5 rounded-lg border text-xs font-mono transition-all ${
                      selectedCockpit.id === cp.id
                        ? 'border-[#FF3B00] bg-[#FF3B00]/15 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400'
                    }`}
                  >
                    <span>{cp.width} Bar × {cp.stem} Stem</span>
                    <span>{cp.weightGrams}g</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                5. Top-Tube Laser Engraving
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  maxLength={16}
                  value={customInitials}
                  onChange={(e) => setCustomInitials(e.target.value.toUpperCase())}
                  placeholder="CUSTOM NAME / ID"
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-xs font-mono text-white uppercase focus:outline-none focus:border-[#FF3B00]"
                />
                <p className="text-[10px] font-mono text-zinc-500">
                  Precision laser-etched in Italian gold font on top-tube.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Spec Summary & Order Card Column */}
        <div className="lg:col-span-5 sticky top-28 bg-obsidian-surface border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="pb-4 border-b border-white/10">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#FF5E0E] bg-[#FF3B00]/10 px-2.5 py-1 rounded-full border border-[#FF3B00]/20 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>ATELIER TREVISO CERTIFIED</span>
            </div>
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              Pinarello Dogma F
            </h3>
            <p className="font-mono text-xs text-zinc-400 mt-1">
              TorayCa M40X Carbon • TiCR Routing • Asymmetric BB
            </p>
          </div>

          {/* Live Weight & Legal Tally */}
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400 uppercase">CALCULATED TOTAL WEIGHT</span>
              <div className="text-right">
                <span className="font-display text-3xl font-extrabold text-white">
                  {totalWeightKg} <span className="text-sm text-[#00F0FF] font-mono">KG</span>
                </span>
                <div className="text-[10px] text-zinc-500">({totalCalculatedWeightGrams} grams complete)</div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400">UCI Minimum (6.80 kg)</span>
              <span className="text-[#D4FF00] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>WorldTour Compliant</span>
              </span>
            </div>
          </div>

          {/* Configuration Breakdown */}
          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Frameset (M40X):</span>
              <span className="text-white">€{baseFramePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>{selectedGroupset.name}:</span>
              <span className="text-white">€{selectedGroupset.priceEuro.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>{selectedWheelset.name}:</span>
              <span className="text-white">€{selectedWheelset.priceEuro.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>MOST Talon Ultra Fast Cockpit:</span>
              <span className="text-white">€750</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>{selectedSaddle.name}:</span>
              <span className="text-white">€{selectedSaddle.priceEuro}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Laser Nameplate ({customInitials}):</span>
              <span className="text-[#FF5E0E]">COMPLIMENTARY</span>
            </div>
          </div>

          {/* Total Price */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
            <span className="font-mono text-xs text-zinc-400 uppercase">ATELIER TREVISO ESTIMATE</span>
            <span className="font-display text-3xl font-extrabold text-[#D4FF00]">
              €{totalPriceEuro.toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleReserveBuild}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF3B00] via-[#FF6A00] to-[#FF3B00] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-glow-crimson hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <span>Reserve Atelier Build Allocation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sfx.playClick();
                alert(`Exporting Dogma F Specification Sheet for Build #${customInitials}...`);
              }}
              className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Specification Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
