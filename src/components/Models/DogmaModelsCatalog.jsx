import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Award,
  Sliders,
  ChevronRight,
  Check,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const PINARELLO_MODELS = [
  {
    id: 'dura-ace-di2',
    name: 'DOGMA F DURA ACE Di2',
    tagline: 'DESIGN THE EXCEPTIONAL',
    groupset: 'Shimano Dura-Ace Di2 R9270 12S',
    brakes: 'Hydraulic Disc Brake (Concealed Thru-Axles)',
    wheels: 'Dura-Ace C50 Carbon / Princeton Peak 4550',
    weight: '6.77 kg',
    priceEur: '€14,800',
    mainImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
    colorways: [
      {
        name: 'Cobalt Phantom',
        swatchImg: 'https://pinarello.com/storage/Variant/d77b58f160312ec04b79445406ad6f35.png',
        colorHex: '#1d2c4d',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Luxter Blue Shiny',
        swatchImg: 'https://pinarello.com/storage/Variant/9306bb0fc95a5d62a656d7ff96d8d944.png',
        colorHex: '#2563eb',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Phantom Ice',
        swatchImg: 'https://pinarello.com/storage/Variant/c5cd77a628a14f18680ca72f652a5da0.png',
        colorHex: '#e2e8f0',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Molten Sand',
        swatchImg: 'https://pinarello.com/storage/Variant/17db459feed7d8f6df8ed77e9ae51fde.png',
        colorHex: '#d4a373',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Obsidian Emerald',
        swatchImg: 'https://pinarello.com/storage/Variant/6b721202ab0c4aae8912aade70116fd5.png',
        colorHex: '#064e3b',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
    ],
    badge: 'WORLDTOUR FLAGSHIP',
  },
  {
    id: 'sram-red-axs',
    name: 'DOGMA F SRAM RED AXS',
    tagline: 'DESIGN THE EXCEPTIONAL',
    groupset: 'SRAM RED AXS E-Tap 12S Wireless',
    brakes: 'Hydraulic Disc Brake (Integrated Caliper Mounts)',
    wheels: 'DT Swiss ARC 1100 Dicut 50 / Zipp 454 NSW',
    weight: '6.71 kg',
    priceEur: '€15,200',
    mainImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
    colorways: [
      {
        name: 'Luxter Turquoise',
        swatchImg: 'https://pinarello.com/storage/Variant/5117db936fc89c5e8cc58dcc6cd6732e.png',
        colorHex: '#06b6d4',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Amber',
        swatchImg: 'https://pinarello.com/storage/Variant/03b1418abfed338beab8bf35420c0244.png',
        colorHex: '#f59e0b',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Grey Matt',
        swatchImg: 'https://pinarello.com/storage/Variant/037cbd714e3db532413d5938c16af10e.png',
        colorHex: '#64748b',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Obsidian Emerald',
        swatchImg: 'https://pinarello.com/storage/Variant/df5eeaa085bb24be276d3d38207715cc.png',
        colorHex: '#047857',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
    ],
    badge: 'WIRELESS REVOLUTION',
  },
  {
    id: 'ineos-replica',
    name: 'DOGMA F INEOS TEAM REPLICA',
    tagline: 'OFFICIAL WORLDTOUR RACING SPEC',
    groupset: 'Shimano Dura-Ace Di2 + FC-R9200-P Dual Power',
    brakes: 'Hydraulic Disc Flat Mount with Onda Flap™',
    wheels: 'Shimano Dura-Ace C50 Tubular / Tubeless Ready',
    weight: '6.75 kg',
    priceEur: '€16,500',
    mainImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
    colorways: [
      {
        name: 'INEOS Team Livery',
        swatchImg: 'https://pinarello.com/storage/Variant/94f31784affde4307c160af60a57e597.png',
        colorHex: '#e4002b',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
    ],
    badge: 'GRAND TOUR CHAMPION',
  },
  {
    id: 'pq3-replica',
    name: 'DOGMA F PQ3 TEAM REPLICA',
    tagline: 'COMMEMORATIVE RACING EDITION',
    groupset: 'Shimano Dura-Ace Di2 R9270 12S Special Edition',
    brakes: 'Integrated Aero Disc',
    wheels: 'MOST Ultrafast 45 Carbon',
    weight: '6.80 kg',
    priceEur: '€15,900',
    mainImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
    colorways: [
      {
        name: 'Team PQ3 Replica',
        swatchImg: 'https://pinarello.com/storage/Variant/4d11fb7aaf25c7f20cf5e68d8214b890.png',
        colorHex: '#3b82f6',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
    ],
    badge: 'LIMITED EDITION',
  },
  {
    id: 'super-record-13',
    name: 'DOGMA F SUPER RECORD 13',
    tagline: 'ITALIAN CARBON SUPREMACY',
    groupset: 'Campagnolo Super Record Wireless 13S',
    brakes: 'Campagnolo Hydraulic Ergopower 160mm/140mm',
    wheels: 'Campagnolo Bora Ultra WTO 45 DB',
    weight: '6.82 kg',
    priceEur: '€16,200',
    mainImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
    colorways: [
      {
        name: 'Gunmetal Black',
        swatchImg: 'https://pinarello.com/storage/Variant/f3a1926a6e7015ea40b34125443c9a8a.png',
        colorHex: '#27272a',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
      {
        name: 'Luxter Turquoise',
        swatchImg: 'https://pinarello.com/storage/Variant/c192a5a1d4a6f6227ff8e791caf5c20a.png',
        colorHex: '#06b6d4',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
      {
        name: 'Luxter Blue Shiny',
        swatchImg: 'https://pinarello.com/storage/Variant/55cf0e9736eb3f3f500f33e17b821c1c.png',
        colorHex: '#1e40af',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
      {
        name: 'Luxter Amber',
        swatchImg: 'https://pinarello.com/storage/Variant/e8f92cc34a0941669914faaebb6a0377.png',
        colorHex: '#f59e0b',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
    ],
    badge: 'ALL-ITALIAN HERITAGE',
  },
];

export const DogmaModelsCatalog = ({ onOpenBooking }) => {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [selectedColorwayIndex, setSelectedColorwayIndex] = useState(0);

  const currentModel = PINARELLO_MODELS[selectedModelIndex];
  const currentColorway = currentModel.colorways[selectedColorwayIndex] || currentModel.colorways[0];

  const handleSelectModel = (idx) => {
    sfx.playClick();
    setSelectedModelIndex(idx);
    setSelectedColorwayIndex(0);
  };

  const handleSelectColorway = (cIdx) => {
    sfx.playClick();
    setSelectedColorwayIndex(cIdx);
  };

  return (
    <section id="models" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Background Section Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#E4002B]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00C4D4]/6 rounded-full blur-[130px] pointer-events-none" />

      {/* Editorial Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E4002B] text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Dogma F Lineup</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
            MODELS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E5A93C]">CONFIGURATIONS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
            Explore the flagship configurations engineered in Treviso. Equipped with TorayCa M40X carbon monocoque chasses, electronic groupsets, and integrated TiCR cockpits.
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {PINARELLO_MODELS.map((model, idx) => (
            <button
              key={model.id}
              onClick={() => handleSelectModel(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                selectedModelIndex === idx
                  ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              {model.name.replace('DOGMA F ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Model Feature Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-obsidian-surface/70 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Left Side: High-Res Studio Bike Cutout */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px]">
          {/* Subtle Stage Lighting & Halo */}
          <div className="absolute inset-0 bg-radial-fade opacity-80 pointer-events-none" />
          <div className="absolute bottom-6 w-3/4 h-8 bg-black/80 rounded-full blur-xl pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-0 left-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E4002B]/15 border border-[#E4002B]/40 text-[#FF5E0E] text-[10px] font-mono font-bold tracking-widest uppercase">
              <Zap className="w-3 h-3" />
              {currentModel.badge}
            </span>
          </div>

          <div className="absolute top-0 right-0 font-mono text-xs text-zinc-500 uppercase">
            DISC • 700C • TORAYCA M40X
          </div>

          {/* Cutout Image with Smooth Fade Transition */}
          <img
            src={currentColorway.bikeImage || currentModel.mainImage}
            alt={currentModel.name}
            key={`${currentModel.id}-${currentColorway.name}`}
            className="relative z-10 w-full max-w-2xl object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.02]"
            loading="eager"
          />

          {/* Colorway Swatch Bar */}
          <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-3 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
            <span className="text-[11px] font-mono text-zinc-400 uppercase mr-1">
              FINISH: <strong className="text-white">{currentColorway.name}</strong>
            </span>
            <div className="flex items-center gap-2">
              {currentModel.colorways.map((c, cIdx) => (
                <button
                  key={c.name}
                  onClick={() => handleSelectColorway(cIdx)}
                  className={`relative w-7 h-7 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                    selectedColorwayIndex === cIdx
                      ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                      : 'border-white/20 hover:border-white/60 opacity-80 hover:opacity-100'
                  }`}
                  title={c.name}
                >
                  {c.swatchImg ? (
                    <img src={c.swatchImg} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full block" style={{ backgroundColor: c.colorHex }} />
                  )}
                  {selectedColorwayIndex === cIdx && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Specifications & Atelier Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
              PINARELLO FACTORY SPECIFICATION
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              {currentModel.name}
            </h3>
            <p className="text-xs font-mono text-[#E4002B] uppercase tracking-wider mt-1 font-semibold">
              {currentModel.tagline}
            </p>
          </div>

          {/* Quick Technical Matrix */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex justify-between items-center">
              <span className="text-zinc-400">ELECTRONIC GROUPSET</span>
              <span className="text-white font-semibold text-right max-w-[200px] truncate">
                {currentModel.groupset}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex justify-between items-center">
              <span className="text-zinc-400">RACING WHEELSET</span>
              <span className="text-white font-semibold text-right max-w-[200px] truncate">
                {currentModel.wheels}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex justify-between items-center">
              <span className="text-zinc-400">BRAKING SYSTEM</span>
              <span className="text-white font-semibold text-right">
                {currentModel.brakes}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] flex justify-between items-center">
              <span className="text-zinc-400">CHASSIS WEIGHT</span>
              <span className="text-[#00F0FF] font-bold">
                {currentModel.weight} (Size 53)
              </span>
            </div>
          </div>

          {/* Price & Action CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">MSRP STARTING FROM</div>
              <div className="font-display text-2xl sm:text-3xl font-black text-white">
                {currentModel.priceEur}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="#configurator"
                onClick={() => sfx.playClick()}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase font-bold transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>3D ATELIER</span>
              </a>

              <button
                onClick={() => {
                  sfx.playClick();
                  if (onOpenBooking) {
                    onOpenBooking({
                      model: currentModel.name,
                      color: currentColorway.name,
                      price: currentModel.priceEur,
                    });
                  }
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs uppercase font-bold shadow-[0_0_20px_rgba(228,0,43,0.4)] hover:shadow-[0_0_30px_rgba(228,0,43,0.65)] hover:scale-[1.02] transition-all"
              >
                <span>RESERVE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
