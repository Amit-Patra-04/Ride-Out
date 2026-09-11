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
  Layers,
  Zap,
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
    <section
      id="geometry"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#091f34] to-[#08182b]"
    >
      {/* --- LAYER 1: VIBRANT ANIMATED ATMOSPHERIC AURORAS --- */}
      <div className="absolute top-1/3 -left-20 w-[1200px] h-[1200px] bg-[#00F0FF]/32 rounded-full blur-[200px] pointer-events-none aurora-blob-1" />
      <div className="absolute bottom-1/3 -right-20 w-[1150px] h-[1150px] bg-[#D4FF00]/28 rounded-full blur-[200px] pointer-events-none aurora-blob-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[900px] bg-[#00F0FF]/20 rounded-full blur-[220px] pointer-events-none aurora-breathing" />

      {/* Bespoke CAD Frame Alignment Guides & Biomechanical Vectors */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="520" fill="none" stroke="rgba(0,240,255,0.12)" strokeWidth="1.5" strokeDasharray="6 12" />
          <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(212,255,0,0.08)" strokeWidth="1" strokeDasharray="4 8" />
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="rgba(0,240,255,0.08)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Contained Architectural Watermark */}
      <div className="absolute top-12 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.05] sm:opacity-[0.06] leading-none font-display font-black tracking-tight">
        <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">GEOMETRY</span>
        <span className="text-[8vw] sm:text-[7vw] md:text-[6vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-transparent -mt-[1.5vw]">
          9 PRO SIZES
        </span>
      </div>

      {/* --- LAYER 2: INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header: Flagship Editorial */}
        <div className="relative z-10 mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-8 font-mono text-[11px] tracking-[0.25em] text-zinc-300 uppercase">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                05
              </span>
              <span className="text-[#00F0FF] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                PINARELLO FIT ENGINE
              </span>
              <span className="text-zinc-500">//</span>
              <span className="text-zinc-200">BIOMECHANICAL CALIBRATION</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 font-mono text-[10px]">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold backdrop-blur-md">
                DISCRETE SIZES: 9
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-[#D4FF00] font-bold hidden sm:inline">
                ONDA 47MM RAKE
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-2">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-[#FF5E0E] font-bold">
                NO GENERIC S/M/L COMPROMISES
              </span>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
                9-SIZE RACE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 via-40% to-[#00F0FF] drop-shadow-lg">
                  GEOMETRY MATRIX.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2 space-y-4">
              <p className="text-sm sm:text-base text-zinc-200 font-sans font-normal leading-relaxed">
                Pinarello provides 9 discrete frame sizes rather than generic Small/Medium/Large so every competitive rider achieves aerodynamic purity and handling balance.
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-zinc-300">
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  43.0 TO 62.0 CM
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  70MM ITALIAN BB
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  UCI RACE READY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout: Interactive Fit Calculator & Geometry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Interactive Rider Fit Engine */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0d1624]/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl flex flex-col justify-between shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-6">
                <UserCheck className="w-5 h-5 text-[#FF5E0E]" />
                <h3 className="font-display text-xl font-black uppercase text-white tracking-wider">
                  Rider Biomechanical Sizing
                </h3>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-bold">RIDER TOTAL HEIGHT</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-3 py-0.5 rounded-lg border border-white/15">
                      {heightCm} cm ({Math.floor(heightCm / 2.54 / 12)}&apos;{Math.round((heightCm / 2.54) % 12)}&quot;)
                    </span>
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
                    className="w-full accent-[#FF5E0E] bg-white/15 h-2.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-zinc-300 font-bold">INSEAM LENGTH</span>
                    <span className="text-white font-bold text-sm bg-white/10 px-3 py-0.5 rounded-lg border border-white/15">
                      {inseamCm} cm
                    </span>
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
                    className="w-full accent-[#00F0FF] bg-white/15 h-2.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Recommendation Card */}
              <div className="mt-8 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-inner">
                <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest mb-1.5 font-bold">
                  OPTIMAL DOGMA F FRAME FITMENT
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF5E0E] to-[#E4002B]">
                    SIZE {fitResults.recSize}
                  </span>
                  <span className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/20 px-3 py-1 rounded-full border border-[#00F0FF]/40 font-black shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    MATCH: 99.4%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/10 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-[9.5px] text-zinc-400 uppercase font-bold">SADDLE HEIGHT</div>
                    <div className="text-xs font-black text-white mt-0.5">{fitResults.targetSeatHeight} cm</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-[9.5px] text-zinc-400 uppercase font-bold">CRANK ARM</div>
                    <div className="text-xs font-black text-[#D4FF00] mt-0.5">{fitResults.crankLength} mm</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
                    <div className="text-[9.5px] text-zinc-400 uppercase font-bold">TALON STEM</div>
                    <div className="text-xs font-black text-[#00F0FF] mt-0.5">{fitResults.stemLength} mm</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSize(fitResults.recSize);
                sfx.playClick();
              }}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(228,0,43,0.4)] hover:scale-[1.02] transition-transform"
            >
              Apply Recommended Size {fitResults.recSize} in Matrix
            </button>
          </div>

          {/* Right Column: Size Inspector Visual Card */}
          <div className="lg:col-span-7 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0d1624]/90 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-3xl flex flex-col justify-between shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                    Dogma F Size {activeGeom.size} Blueprint
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono mt-0.5">
                    Recommended Rider Height: <strong className="text-[#FF5E0E]">{activeGeom.recHeight}</strong>
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        selectedSize === g.size
                          ? 'bg-[#00F0FF] text-black scale-110 shadow-[0_0_15px_#00F0FF]'
                          : 'bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 border border-white/10'
                      }`}
                    >
                      {g.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Chassis Blueprint Diagram */}
              <div className="relative my-6 rounded-2xl bg-black/60 border border-white/10 overflow-hidden p-6 flex flex-col items-center justify-center shadow-inner">
                <img
                  src="https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg"
                  alt="Dogma F Frame Architecture"
                  className="w-full h-44 sm:h-56 object-contain filter contrast-125 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-zinc-200">
                  <span className="bg-black/85 px-3.5 py-1 rounded-lg border border-white/15 shadow">
                    STACK: <strong className="text-white">{activeGeom.stack} mm</strong>
                  </span>
                  <span className="bg-black/85 px-3.5 py-1 rounded-lg border border-white/15 shadow">
                    REACH: <strong className="text-white">{activeGeom.reach} mm</strong>
                  </span>
                  <span className="bg-black/85 px-3.5 py-1 rounded-lg border border-cyan-500/40 text-[#00F0FF] shadow">
                    FORK RAKE: <strong>47 mm</strong>
                  </span>
                </div>
              </div>

              {/* Metric Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">STACK</div>
                  <div className="font-display text-xl font-black text-white mt-1">{activeGeom.stack} <span className="text-xs text-zinc-400 font-mono font-normal">mm</span></div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">REACH</div>
                  <div className="font-display text-xl font-black text-white mt-1">{activeGeom.reach} <span className="text-xs text-zinc-400 font-mono font-normal">mm</span></div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">TOP TUBE</div>
                  <div className="font-display text-xl font-black text-white mt-1">{activeGeom.topTube} <span className="text-xs text-zinc-400 font-mono font-normal">mm</span></div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">HEAD TUBE ANGLE</div>
                  <div className="font-display text-xl font-black text-[#00F0FF] mt-1">{activeGeom.headAngle}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-lime-400 uppercase font-bold">SEAT TUBE ANGLE</div>
                  <div className="font-display text-xl font-black text-[#D4FF00] mt-1">{activeGeom.seatAngle}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">CHAINSTAY</div>
                  <div className="font-display text-xl font-black text-white mt-1">{activeGeom.chainstay} <span className="text-xs text-zinc-400 font-mono font-normal">mm</span></div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">HEAD TUBE</div>
                  <div className="font-display text-xl font-black text-white mt-1">{activeGeom.headTube} <span className="text-xs text-zinc-400 font-mono font-normal">mm</span></div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">BB DROP</div>
                  <div className="font-display text-xl font-black text-white mt-1">{activeGeom.bbDrop} <span className="text-xs text-zinc-400 font-mono font-normal">mm</span></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center gap-3 text-xs text-zinc-200">
              <Info className="w-4 h-4 text-[#00F0FF] shrink-0" />
              <span>
                All Pinarello frames feature Onda Fork 47mm rake and Italian 70mm threaded bottom bracket tolerance.
              </span>
            </div>
          </div>
        </div>

        {/* Full 9-Size Master Geometry Table */}
        <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0d1624]/90 backdrop-blur-3xl overflow-x-auto shadow-2xl p-1">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-white/10 border-b border-white/10 text-zinc-300 uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-5">Size</th>
                <th className="p-4 sm:p-5">Seat Tube</th>
                <th className="p-4 sm:p-5">Top Tube</th>
                <th className="p-4 sm:p-5">Head Angle</th>
                <th className="p-4 sm:p-5">Seat Angle</th>
                <th className="p-4 sm:p-5">Chainstay</th>
                <th className="p-4 sm:p-5">Stack</th>
                <th className="p-4 sm:p-5">Reach</th>
                <th className="p-4 sm:p-5">Rider Height</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {GEOMETRY_SIZES.map((row) => (
                <tr
                  key={row.size}
                  onClick={() => {
                    setSelectedSize(row.size);
                    sfx.playHover();
                  }}
                  className={`cursor-pointer transition-all ${
                    selectedSize === row.size
                      ? 'bg-cyan-500/15 text-white font-bold'
                      : 'hover:bg-white/[0.05] text-zinc-300'
                  }`}
                >
                  <td className="p-4 sm:p-5 font-bold text-white flex items-center gap-2">
                    {selectedSize === row.size && <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />}
                    <span>{row.size}</span>
                  </td>
                  <td className="p-4 sm:p-5">{row.seatTube} mm</td>
                  <td className="p-4 sm:p-5">{row.topTube} mm</td>
                  <td className="p-4 sm:p-5 text-[#00F0FF] font-bold">{row.headAngle}</td>
                  <td className="p-4 sm:p-5 text-[#D4FF00] font-bold">{row.seatAngle}</td>
                  <td className="p-4 sm:p-5">{row.chainstay} mm</td>
                  <td className="p-4 sm:p-5 font-bold text-white">{row.stack} mm</td>
                  <td className="p-4 sm:p-5 font-bold text-white">{row.reach} mm</td>
                  <td className="p-4 sm:p-5 text-[#FF5E0E] font-bold">{row.recHeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
