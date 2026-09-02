import React, { useState } from 'react';
import {
  Compass,
  Ruler,
  UserCheck,
  Check,
  ChevronRight,
  Sparkles,
  Info,
  Maximize,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const GEOMETRY_SIZES = [
  { size: '43.0', seatTube: 430, topTube: 505, headAngle: '70.5°', seatAngle: '74.4°', chainstay: 406, headTube: 100, bbDrop: 72, stack: 504, reach: 367, recHeight: '150 - 160 cm' },
  { size: '46.5', seatTube: 465, topTube: 515, headAngle: '71.0°', seatAngle: '74.0°', chainstay: 406, headTube: 110, bbDrop: 72, stack: 515, reach: 372, recHeight: '160 - 167 cm' },
  { size: '50.0', seatTube: 500, topTube: 525, headAngle: '71.5°', seatAngle: '74.0°', chainstay: 406, headTube: 120, bbDrop: 72, stack: 527, reach: 378, recHeight: '166 - 173 cm' },
  { size: '51.5', seatTube: 515, topTube: 535, headAngle: '72.0°', seatAngle: '73.7°', chainstay: 406, headTube: 130, bbDrop: 72, stack: 538, reach: 382, recHeight: '171 - 178 cm' },
  { size: '53.0', seatTube: 530, topTube: 545, headAngle: '72.5°', seatAngle: '73.5°', chainstay: 406, headTube: 140, bbDrop: 72, stack: 549, reach: 386, recHeight: '175 - 182 cm' },
  { size: '54.0', seatTube: 540, topTube: 550, headAngle: '72.8°', seatAngle: '73.2°', chainstay: 406, headTube: 150, bbDrop: 72, stack: 560, reach: 390, recHeight: '179 - 185 cm' },
  { size: '56.0', seatTube: 560, topTube: 565, headAngle: '73.2°', seatAngle: '73.0°', chainstay: 408, headTube: 165, bbDrop: 72, stack: 575, reach: 395, recHeight: '183 - 190 cm' },
  { size: '57.5', seatTube: 575, topTube: 575, headAngle: '73.5°', seatAngle: '72.8°', chainstay: 408, headTube: 180, bbDrop: 72, stack: 590, reach: 400, recHeight: '188 - 195 cm' },
  { size: '59.5', seatTube: 595, topTube: 585, headAngle: '73.7°', seatAngle: '72.8°', chainstay: 410, headTube: 195, bbDrop: 72, stack: 605, reach: 404, recHeight: '193 - 200 cm' },
  { size: '62.0', seatTube: 620, topTube: 600, headAngle: '73.7°', seatAngle: '72.8°', chainstay: 410, headTube: 215, bbDrop: 72, stack: 625, reach: 408, recHeight: '198 - 206 cm' },
];

export const DogmaGeometry = () => {
  const [selectedSize, setSelectedSize] = useState('53.0');
  const [heightCm, setHeightCm] = useState(178);
  const [inseamCm, setInseamCm] = useState(83);

  const activeGeom = GEOMETRY_SIZES.find((g) => g.size === selectedSize) || GEOMETRY_SIZES[4];

  // Rider Fit Calculator Logic
  const calculateRecommendedSize = () => {
    // Pinarello standard sizing formula based on height & inseam
    const targetSeatHeight = (inseamCm * 0.883).toFixed(1);
    let recSize = '53.0';

    if (heightCm < 161) recSize = '43.0';
    else if (heightCm < 168) recSize = '46.5';
    else if (heightCm < 174) recSize = '50.0';
    else if (heightCm < 179) recSize = '51.5';
    else if (heightCm < 183) recSize = '53.0';
    else if (heightCm < 186) recSize = '54.0';
    else if (heightCm < 191) recSize = '56.0';
    else if (heightCm < 196) recSize = '57.5';
    else if (heightCm < 201) recSize = '59.5';
    else recSize = '62.0';

    let crankLength = 172.5;
    if (inseamCm < 78) crankLength = 165.0;
    else if (inseamCm < 82) crankLength = 170.0;
    else if (inseamCm > 88) crankLength = 175.0;

    let stemLength = 100;
    if (heightCm < 168) stemLength = 90;
    else if (heightCm > 185) stemLength = 120;
    else if (heightCm > 178) stemLength = 110;

    return {
      recSize,
      targetSeatHeight,
      crankLength,
      stemLength,
    };
  };

  const fitResults = calculateRecommendedSize();

  return (
    <section id="geometry" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Pinarello Precision Fit Engine</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          9-Size Race <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#D4FF00]">Geometry Matrix</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          Pinarello provides 9 discrete frame sizes rather than generic Small/Medium/Large so every competitive rider achieves aerodynamic purity and handling balance.
        </p>
      </div>

      {/* Main Two-Column Layout: Interactive Fit Calculator & Geometry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left Column: Interactive Rider Fit Engine */}
        <div className="lg:col-span-5 bg-obsidian-surface/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-6">
              <UserCheck className="w-5 h-5 text-[#FF3B00]" />
              <h3 className="font-display text-xl font-bold uppercase text-white">
                Rider Sizing Algorithm
              </h3>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-400">RIDER HEIGHT</span>
                  <span className="text-white font-bold text-sm">{heightCm} cm ({Math.floor(heightCm / 2.54 / 12)}&apos;{Math.round((heightCm / 2.54) % 12)}&quot;)</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="205"
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(Number(e.target.value));
                    sfx.playHover();
                  }}
                  className="w-full accent-[#FF3B00] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-400">INSEAM LENGTH</span>
                  <span className="text-white font-bold text-sm">{inseamCm} cm</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="98"
                  value={inseamCm}
                  onChange={(e) => {
                    setInseamCm(Number(e.target.value));
                    sfx.playHover();
                  }}
                  className="w-full accent-[#00F0FF] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Recommendation Card */}
            <div className="mt-8 p-5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="text-[11px] font-mono text-zinc-400 uppercase mb-2">
                OPTIMAL DOGMA F FRAME SIZE
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-extrabold text-[#FF5E0E]">
                  SIZE {fitResults.recSize}
                </span>
                <span className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/20">
                  MATCH: 99.4%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center font-mono">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">SADDLE HEIGHT</div>
                  <div className="text-xs font-bold text-white mt-0.5">{fitResults.targetSeatHeight} cm</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">CRANK LENGTH</div>
                  <div className="text-xs font-bold text-[#D4FF00] mt-0.5">{fitResults.crankLength} mm</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">TALON STEM</div>
                  <div className="text-xs font-bold text-[#00F0FF] mt-0.5">{fitResults.stemLength} mm</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedSize(fitResults.recSize);
              sfx.playClick();
            }}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF3B00] to-[#FF5E0E] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-glow-crimson hover:scale-[1.02] transition-transform"
          >
            Apply Recommended Size {fitResults.recSize} in Matrix
          </button>
        </div>

        {/* Right Column: Size Inspector Visual Card */}
        <div className="lg:col-span-7 bg-obsidian-surface/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  Dogma F Size {activeGeom.size} Blueprint
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Recommended Rider Height: <span className="text-[#FF5E0E]">{activeGeom.recHeight}</span>
                </p>
              </div>

              {/* Size Selector Badges */}
              <div className="flex flex-wrap gap-1.5">
                {GEOMETRY_SIZES.map((g) => (
                  <button
                    key={g.size}
                    onClick={() => {
                      setSelectedSize(g.size);
                      sfx.playHover();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedSize === g.size
                        ? 'bg-[#FF3B00] text-white scale-110 shadow-glow-crimson'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {g.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Chassis Blueprint Diagram */}
            <div className="relative my-6 rounded-2xl bg-black/60 border border-white/10 overflow-hidden p-4 flex flex-col items-center justify-center">
              <img
                src="https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg"
                alt="Dogma F Frame Architecture"
                className="w-full h-44 sm:h-52 object-contain filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                <span className="bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
                  STACK: <strong className="text-white">{activeGeom.stack} mm</strong>
                </span>
                <span className="bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
                  REACH: <strong className="text-white">{activeGeom.reach} mm</strong>
                </span>
                <span className="bg-black/80 px-2.5 py-1 rounded-md border border-white/10 text-[#00F0FF]">
                  FORK RAKE: <strong>47 mm</strong>
                </span>
              </div>
            </div>

            {/* Metric Dimensions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">STACK</div>
                <div className="font-display text-xl font-bold text-white mt-1">{activeGeom.stack} <span className="text-xs text-zinc-500 font-mono font-normal">mm</span></div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">REACH</div>
                <div className="font-display text-xl font-bold text-white mt-1">{activeGeom.reach} <span className="text-xs text-zinc-500 font-mono font-normal">mm</span></div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">TOP TUBE (HORIZ)</div>
                <div className="font-display text-xl font-bold text-white mt-1">{activeGeom.topTube} <span className="text-xs text-zinc-500 font-mono font-normal">mm</span></div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">HEAD TUBE ANGLE</div>
                <div className="font-display text-xl font-bold text-[#00F0FF] mt-1">{activeGeom.headAngle}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">SEAT TUBE ANGLE</div>
                <div className="font-display text-xl font-bold text-[#D4FF00] mt-1">{activeGeom.seatAngle}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">CHAINSTAY</div>
                <div className="font-display text-xl font-bold text-white mt-1">{activeGeom.chainstay} <span className="text-xs text-zinc-500 font-mono font-normal">mm</span></div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">HEAD TUBE LENGTH</div>
                <div className="font-display text-xl font-bold text-white mt-1">{activeGeom.headTube} <span className="text-xs text-zinc-500 font-mono font-normal">mm</span></div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">BOTTOM BRACKET DROP</div>
                <div className="font-display text-xl font-bold text-white mt-1">{activeGeom.bbDrop} <span className="text-xs text-zinc-500 font-mono font-normal">mm</span></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-[#00F0FF]/5 border border-[#00F0FF]/20 flex items-center gap-3 text-xs text-zinc-300">
            <Info className="w-4 h-4 text-[#00F0FF] shrink-0" />
            <span>
              All Pinarello frames feature Onda Fork 47mm rake and Italian 70mm threaded bottom bracket tolerance.
            </span>
          </div>
        </div>
      </div>

      {/* Full 9-Size Master Geometry Table */}
      <div className="rounded-2xl border border-white/10 bg-obsidian-surface/60 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Size</th>
              <th className="p-4">Seat Tube</th>
              <th className="p-4">Top Tube</th>
              <th className="p-4">Head Angle</th>
              <th className="p-4">Seat Angle</th>
              <th className="p-4">Chainstay</th>
              <th className="p-4">Stack</th>
              <th className="p-4">Reach</th>
              <th className="p-4">Rider Height</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {GEOMETRY_SIZES.map((row) => (
              <tr
                key={row.size}
                onClick={() => {
                  setSelectedSize(row.size);
                  sfx.playHover();
                }}
                className={`cursor-pointer transition-colors ${
                  selectedSize === row.size
                    ? 'bg-[#FF3B00]/15 text-white font-bold'
                    : 'hover:bg-white/[0.02] text-zinc-400'
                }`}
              >
                <td className="p-4 font-bold text-white flex items-center gap-1.5">
                  {selectedSize === row.size && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B00]" />}
                  {row.size}
                </td>
                <td className="p-4">{row.seatTube} mm</td>
                <td className="p-4">{row.topTube} mm</td>
                <td className="p-4 text-[#00F0FF]">{row.headAngle}</td>
                <td className="p-4 text-[#D4FF00]">{row.seatAngle}</td>
                <td className="p-4">{row.chainstay} mm</td>
                <td className="p-4 font-semibold text-white">{row.stack} mm</td>
                <td className="p-4 font-semibold text-white">{row.reach} mm</td>
                <td className="p-4 text-[#FF5E0E]">{row.recHeight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
