import React from 'react';
import {
  Trophy,
  Award,
  Crown,
  History,
  Timer,
  Globe2,
  Sparkles,
  Flame,
  ArrowUpRight,
  Shield,
  Medal,
  Flag,
  Quote,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const PALMARES = [
  {
    year: '15× TOUR TITLES',
    title: 'Tour de France Dominance',
    desc: 'The most victorious bicycle manufacturer in Tour de France history. Ridden to victory by Pedro Delgado, Miguel Indurain, Bradley Wiggins, Chris Froome, Geraint Thomas, and Egan Bernal.',
    icon: Crown,
    tag: 'GRAND TOUR RECORD',
    color: '#FFD166',
    stat: '15 YELLOW JERSEYS',
    statSub: 'All-Time Record Holder',
  },
  {
    year: '56.792 KM/H',
    title: 'UCI Hour Record — Filippo Ganna',
    desc: 'Powered by Pinarello 3D computational aerodynamics, Filippo Ganna shattered the world hour record at the Tissot Velodrome in Grenchen, covering 56.792 kilometers in 60 minutes.',
    icon: Timer,
    tag: 'WORLD RECORD',
    color: '#00F0FF',
    stat: '56.792 KM/H',
    statSub: '60-Minute Distance: 56.792 km',
  },
  {
    year: 'OLYMPIC GOLD',
    title: 'Tokyo 2020 & Paris 2024 Gold',
    desc: 'Richard Carapaz rode the Dogma to Olympic Road Race Gold in Tokyo; Filippo Ganna and Tom Pidcock delivered historic Olympic Gold victories on Pinarello carbon chassis.',
    icon: Award,
    tag: 'OLYMPIC CHAMPION',
    color: '#FF3B00',
    stat: '3× OLYMPIC GOLD',
    statSub: 'Road & Track Benchmark',
  },
  {
    year: 'WORLDTOUR PRO',
    title: 'INEOS Grenadiers Partnership',
    desc: 'Over a decade of continuous aerodynamic co-engineering with Team INEOS Grenadiers. Tested over hundreds of thousands of kilometers under extreme mountain pass and cobble conditions.',
    icon: Globe2,
    tag: 'RACE DEVELOPMENT',
    color: '#D4FF00',
    stat: '350+ WINS',
    statSub: 'WorldTour Class Victories',
  },
];

export const DogmaHeritage = () => {
  return (
    <section
      id="heritage"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#07080a] via-[#0b0d12] to-[#07080a] border-t border-white/[0.04]"
    >
      {/* 1. Volumetric Atmospheric Lighting - Refined Studio Ambient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FFD166]/[0.03] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[800px] h-[800px] bg-[#E4002B]/[0.035] rounded-full blur-[200px] pointer-events-none" />

      {/* 2. Bespoke Grand Tour Championship Laurel Arcs & Timeline Radiance */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="40%" r="500" fill="none" stroke="rgba(255,209,102,0.12)" strokeWidth="1.5" strokeDasharray="6 12" />
          <circle cx="50%" cy="40%" r="750" fill="none" stroke="rgba(255,209,102,0.06)" strokeWidth="1" />
          <line x1="5%" y1="40%" x2="95%" y2="40%" stroke="rgba(255,209,102,0.08)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* --- INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-5 backdrop-blur-md shadow-inner font-bold">
            <Trophy className="w-3.5 h-3.5 animate-pulse text-[#FFD166]" />
            <span>07 // HERITAGE // GRAND TOUR DYNASTY SINCE 1952</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.05]">
            BORN IN TREVISO.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#FFD166] mt-1 sm:mt-2">
              REVERED WORLDWIDE.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed font-normal">
            From the legendary workshop of Giovanni Pinarello in 1952 to the pinnacle of modern carbon composites, Dogma F is the undisputed icon of Grand Tour racing.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-200 font-bold">
              15× Tour de France Yellow Jerseys
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-200 font-bold">
              UCI Hour Record 56.792 km/h
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-200 font-bold">
              Multiple Olympic Gold Medals
            </span>
          </div>
        </div>

        {/* 4 Grand Tour Palmarès Master Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PALMARES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => sfx.playHover()}
                className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] via-[#0b0d12]/90 to-[#07080a]/95 border border-white/[0.08] hover:border-white/20 backdrop-blur-3xl transition-all duration-500 group overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                {/* Corner Ambient Glow */}
                <div
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none"
                  style={{ backgroundColor: item.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}35`,
                        backgroundColor: `${item.color}10`,
                      }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-display text-xl sm:text-2xl font-black text-white">
                      {item.year}
                    </span>
                  </div>

                  <div className="flex items-start gap-5 mt-4">
                    <div
                      className="p-4 rounded-2xl border shrink-0 mt-1 shadow-inner group-hover:scale-110 transition-transform duration-300"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}30`,
                        backgroundColor: `${item.color}10`,
                      }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight group-hover:text-white transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-zinc-300 font-sans leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Metric Callout Strip */}
                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold">RECORD ACHIEVEMENT</span>
                    <div className="font-black text-sm" style={{ color: item.color }}>
                      {item.stat}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 uppercase text-[10px] font-bold">VERIFIED REGISTRY</span>
                    <div className="text-zinc-300 text-xs font-semibold">{item.statSub}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Luxury Italian Artisan Heritage Quote Banner */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.01] to-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD166]/[0.03] rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-start gap-5 max-w-3xl">
              <div className="p-3.5 rounded-2xl bg-[#FFD166]/10 border border-[#FFD166]/30 text-[#FFD166] shrink-0 mt-1 shadow-[0_0_15px_rgba(255,209,102,0.15)]">
                <Quote className="w-6 h-6" />
              </div>
              <div>
                <p className="font-sans text-base sm:text-xl text-white italic font-normal leading-relaxed">
                  &ldquo;A racing bicycle should not merely win races — it must be an object of pure sculptural beauty, born from Italian passion, uncompromising craftsmanship, and relentless aerodynamic science.&rdquo;
                </p>
                <div className="mt-4 font-mono text-xs text-[#FFD166] uppercase tracking-widest font-black">
                  — FAUSTO PINARELLO // PRESIDENT, CICLI PINARELLO TREVISO
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center md:items-end">
              <div className="px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center md:text-right backdrop-blur-md">
                <span className="font-mono text-[10px] text-zinc-500 uppercase block font-bold">SINCE 1952</span>
                <span className="font-display font-black text-white text-sm uppercase tracking-wider">
                  TREVISO • ITALIA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
