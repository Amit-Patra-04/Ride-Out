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
  },
  {
    year: '56.792 KM/H',
    title: 'UCI Hour Record — Filippo Ganna',
    desc: 'Powered by Pinarello 3D computational aerodynamics, Filippo Ganna shattered the world hour record at the Tissot Velodrome in Grenchen, covering 56.792 kilometers in 60 minutes.',
    icon: Timer,
    tag: 'WORLD RECORD',
    color: '#00F0FF',
  },
  {
    year: 'OLYMPIC GOLD',
    title: 'Tokyo 2020 & Paris 2024 Gold',
    desc: 'Richard Carapaz rode the Dogma to Olympic Road Race Gold in Tokyo; Filippo Ganna and Tom Pidcock delivered historic Olympic Gold victories on Pinarello carbon chassis.',
    icon: Award,
    tag: 'OLYMPIC VICTORY',
    color: '#FF3B00',
  },
  {
    year: 'WORLDTOUR PRO',
    title: 'INEOS Grenadiers Partnership',
    desc: 'Over a decade of continuous aerodynamic co-engineering with Team INEOS Grenadiers. Tested over hundreds of thousands of kilometers under extreme mountain pass and cobble conditions.',
    icon: Globe2,
    tag: 'RACE DEVELOPMENT',
    color: '#D4FF00',
  },
];

export const DogmaHeritage = () => {
  return (
    <section id="heritage" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FFD166] text-xs font-mono tracking-widest uppercase mb-4">
          <Trophy className="w-3.5 h-3.5" />
          <span>Palmarès & WorldTour Dynasty</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          Born in Treviso. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] via-[#FF6A00] to-[#FF3B00]">Revered Worldwide.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          From the legendary workshop of Giovanni Pinarello in 1952 to the pinnacle of modern carbon composites, Dogma F is the undisputed icon of Grand Tour racing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PALMARES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-obsidian-surface/80 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 group overflow-hidden shadow-2xl"
            >
              {/* Corner Ambient Glow */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                style={{ backgroundColor: item.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md border"
                  style={{
                    color: item.color,
                    borderColor: `${item.color}40`,
                    backgroundColor: `${item.color}15`,
                  }}
                >
                  {item.tag}
                </span>
                <span className="font-display text-lg font-extrabold text-white">
                  {item.year}
                </span>
              </div>

              <div className="flex items-start gap-4 mt-4">
                <div
                  className="p-3 rounded-xl border shrink-0 mt-1"
                  style={{
                    color: item.color,
                    borderColor: `${item.color}30`,
                    backgroundColor: `${item.color}10`,
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide group-hover:text-[#FF5E0E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
