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
        name: 'Luxter Red Gold',
        swatchImg: 'https://pinarello.com/storage/Variant/d77b58f160312ec04b79445406ad6f35.png',
        colorHex: '#9E0018',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Edge Crystal White',
        swatchImg: 'https://pinarello.com/storage/Variant/c5cd77a628a14f18680ca72f652a5da0.png',
        colorHex: '#FFFFFF',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Venice Blue',
        swatchImg: 'https://pinarello.com/storage/Variant/9306bb0fc95a5d62a656d7ff96d8d944.png',
        colorHex: '#0B3C95',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'Bob Black Stealth',
        swatchImg: 'https://pinarello.com/storage/Variant/17db459feed7d8f6df8ed77e9ae51fde.png',
        colorHex: '#27272A',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
      {
        name: 'INEOS Team WorldTour',
        swatchImg: 'https://pinarello.com/storage/Variant/6b721202ab0c4aae8912aade70116fd5.png',
        colorHex: '#E4002B',
        swatchGradient: 'linear-gradient(135deg, #E4002B 0%, #FF5E0E 45%, #0A0C10 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
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
        name: 'Edge Crystal White',
        swatchImg: 'https://pinarello.com/storage/Variant/5117db936fc89c5e8cc58dcc6cd6732e.png',
        colorHex: '#FFFFFF',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Red Gold',
        swatchImg: 'https://pinarello.com/storage/Variant/03b1418abfed338beab8bf35420c0244.png',
        colorHex: '#9E0018',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Luxter Venice Blue',
        swatchImg: 'https://pinarello.com/storage/Variant/037cbd714e3db532413d5938c16af10e.png',
        colorHex: '#0B3C95',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'Bob Stealth Matt',
        swatchImg: 'https://pinarello.com/storage/Variant/df5eeaa085bb24be276d3d38207715cc.png',
        colorHex: '#27272A',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
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
    mainImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
    colorways: [
      {
        name: 'INEOS WorldTour Team',
        swatchImg: 'https://pinarello.com/storage/Variant/94f31784affde4307c160af60a57e597.png',
        colorHex: '#E4002B',
        swatchGradient: 'linear-gradient(135deg, #E4002B 0%, #FF5E0E 45%, #0A0C10 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
      {
        name: 'Luxter Red Gold Edition',
        swatchImg: 'https://pinarello.com/storage/Variant/d77b58f160312ec04b79445406ad6f35.png',
        colorHex: '#9E0018',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
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
        name: 'Team PQ3 Bob Edition',
        swatchImg: 'https://pinarello.com/storage/Variant/4d11fb7aaf25c7f20cf5e68d8214b890.png',
        colorHex: '#27272A',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
      {
        name: 'Luxter Venice Blue Edition',
        swatchImg: 'https://pinarello.com/storage/Variant/9306bb0fc95a5d62a656d7ff96d8d944.png',
        colorHex: '#0B3C95',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
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
    mainImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
    colorways: [
      {
        name: 'Bob Stealth Carbon',
        swatchImg: 'https://pinarello.com/storage/Variant/f3a1926a6e7015ea40b34125443c9a8a.png',
        colorHex: '#27272A',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
      {
        name: 'Edge Crystal White',
        swatchImg: 'https://pinarello.com/storage/Variant/c192a5a1d4a6f6227ff8e791caf5c20a.png',
        colorHex: '#FFFFFF',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Venice Blue',
        swatchImg: 'https://pinarello.com/storage/Variant/55cf0e9736eb3f3f500f33e17b821c1c.png',
        colorHex: '#0B3C95',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'Luxter Red Gold',
        swatchImg: 'https://pinarello.com/storage/Variant/e8f92cc34a0941669914faaebb6a0377.png',
        colorHex: '#9E0018',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
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
    setSelectedModelIndex(idx);
    setSelectedColorwayIndex(0);
    sfx.playClick();
  };

  const handleSelectColorway = (cIdx) => {
    setSelectedColorwayIndex(cIdx);
    sfx.playClick();
  };

  return (
    <section id="models" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-96 h-96 bg-[#E4002B]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Factory Lineup</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
            DOGMA F <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF5E0E] to-[#E4002B]">MODELS</span>
          </h2>
        </div>

        {/* Model Tabs Selector */}
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
          {/* Dynamic Ambient Aura Glow matching selected bike color */}
          <div
            className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-[100px] opacity-40 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: currentColorway.colorHex || '#E4002B' }}
          />
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
            alt={`${currentModel.name} - ${currentColorway.name}`}
            key={`${currentModel.id}-${currentColorway.name}-${selectedColorwayIndex}`}
            className="relative z-10 w-full max-w-2xl object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transition-all duration-500 hover:scale-[1.02]"
            loading="eager"
          />

          {/* Colorway Swatch Bar */}
          <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-3 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
            <span className="text-[11px] font-mono text-zinc-400 uppercase mr-1">
              FINISH: <strong className="text-white">{currentColorway.name}</strong>
            </span>
            <div className="flex items-center gap-2">
              {currentModel.colorways.map((c, cIdx) => {
                const isSelected = selectedColorwayIndex === cIdx;
                return (
                  <button
                    key={cIdx}
                    onClick={() => handleSelectColorway(cIdx)}
                    className={`relative group w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/20 flex items-center justify-center transition-all duration-300 shadow-inner ${
                      isSelected
                        ? 'scale-110 ring-2 ring-[#00F0FF] ring-offset-2 ring-offset-black opacity-100'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ background: c.swatchGradient || c.colorHex || '#18181b' }}
                    title={c.name}
                  >
                    {c.swatchImg && (
                      <img
                        src={c.swatchImg}
                        alt={c.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
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
                href="#specifications"
                onClick={() => sfx.playClick()}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs uppercase font-bold transition-all"
              >
                <span>SPECIFICATIONS</span>
              </a>

              <a
                href="#configurator"
                onClick={() => sfx.playClick()}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs uppercase font-bold shadow-[0_0_20px_rgba(228,0,43,0.4)] hover:shadow-[0_0_30px_rgba(228,0,43,0.65)] hover:scale-[1.02] transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-white" />
                <span>CUSTOMIZE IN ATELIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
