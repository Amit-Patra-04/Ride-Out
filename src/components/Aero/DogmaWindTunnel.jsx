import React, { useState, useEffect, useRef } from 'react';
import {
  Wind,
  Gauge,
  Zap,
  Activity,
  Compass,
  Sparkles,
  TrendingDown,
  Clock,
  Shield,
  Layers,
  ChevronRight,
  Info,
  Maximize2,
  Sliders,
  Flame,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const WIND_TUNNEL_LIVERIES = [
  {
    id: 'luxter-red-gold',
    name: 'Luxter Red Gold',
    code: 'G110',
    colorHex: '#9E0018',
    swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
    image: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
  },
  {
    id: 'edge-crystal-white',
    name: 'Edge Crystal White',
    code: 'E112',
    colorHex: '#FFFFFF',
    swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
    image: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
  },
  {
    id: 'luxter-venice',
    name: 'Luxter Venice Blue',
    code: 'G112',
    colorHex: '#0B3C95',
    swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
    image: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
  },
  {
    id: 'bob-stealth',
    name: 'Bob Black Stealth',
    code: 'B110',
    colorHex: '#27272A',
    swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
    image: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
  },
  {
    id: 'ineos-grenadier',
    name: 'INEOS Grenadiers WorldTour',
    code: 'W115',
    colorHex: '#E4002B',
    swatchGradient: 'linear-gradient(135deg, #E4002B 0%, #FF5E0E 45%, #0A0C10 100%)',
    image: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
  },
];

export const AERO_HOTSPOTS = [
  {
    id: 'forkflap',
    title: 'Onda ForkFlap™',
    saving: '-1.2 W',
    position: { top: '62%', left: '76%' },
    desc: 'Shields the front disc caliper from incoming air vortices, stabilizing the front hub airflow.',
    category: 'VORTEX SUPPRESSION',
  },
  {
    id: 'aero-keel',
    title: 'Aero-Keel™ BB Shell',
    saving: '-0.8 W',
    position: { top: '64%', left: '46%' },
    desc: '3.5° rotated bottom bracket surface generates a high-velocity low-pressure channel beneath the chassis.',
    category: 'VENTURI TUNNEL',
  },
  {
    id: 'ticr-cockpit',
    title: 'TiCR™ Talon Cockpit',
    saving: '-5.0 W',
    position: { top: '26%', left: '72%' },
    desc: '100% total internal cable integration eliminates exposed wiring turbulence across the head tube.',
    category: 'TOTAL INTEGRATION',
  },
  {
    id: 'princeton-rim',
    title: 'Sinusoidal 4550 Rim',
    saving: '-2.4 W',
    position: { top: '65%', left: '22%' },
    desc: 'Variable-depth 45-50mm wave profiles suppress crosswind torque and reduce side-load stalling.',
    category: 'YAW STABILIZATION',
  },
];

export const DogmaWindTunnel = () => {
  const [riderPowerWatts, setRiderPowerWatts] = useState(320);
  const [gradientPercent, setGradientPercent] = useState(0);
  const [yawAngle, setYawAngle] = useState(0);
  const [riderWeightKg, setRiderWeightKg] = useState(68);
  const [activeLivery, setActiveLivery] = useState(WIND_TUNNEL_LIVERIES[0]);
  const [selectedHotspot, setSelectedHotspot] = useState(AERO_HOTSPOTS[0]);
  const [showHotspots, setShowHotspots] = useState(true);

  const canvasRef = useRef(null);

  // Physics calculation
  const totalMass = riderWeightKg + 6.77;
  const gravity = 9.81;
  const rollingResistanceCoeff = 0.003;
  const airDensity = 1.225;
  const baseCdA = 0.048;
  const competitorCdA = 0.052;

  // Effective CdA with yaw angle penalty
  const yawFactor = 1 + Math.abs(yawAngle) * 0.004;
  const effectiveDogmaCdA = baseCdA * yawFactor;
  const effectiveCompCdA = competitorCdA * yawFactor;

  // Speed in km/h
  const computeSpeedKmh = (watts, cda) => {
    let low = 1;
    let high = 30;
    const theta = Math.atan(gradientPercent / 100);

    for (let i = 0; i < 25; i++) {
      const v = (low + high) / 2;
      const gravPower = totalMass * gravity * Math.sin(theta) * v;
      const rollPower = totalMass * gravity * rollingResistanceCoeff * Math.cos(theta) * v;
      const aeroPower = 0.5 * airDensity * cda * Math.pow(v, 3);
      const totalP = gravPower + rollPower + aeroPower;

      if (totalP < watts) {
        low = v;
      } else {
        high = v;
      }
    }
    return ((low + high) / 2) * 3.6;
  };

  const dogmaSpeed = computeSpeedKmh(riderPowerWatts, effectiveDogmaCdA);
  const competitorSpeed = computeSpeedKmh(riderPowerWatts, effectiveCompCdA);
  const speedDelta = (dogmaSpeed - competitorSpeed).toFixed(2);

  // Time saved over 40 km (in seconds)
  const timeDogmaSec = (40 / dogmaSpeed) * 3600;
  const timeCompSec = (40 / competitorSpeed) * 3600;
  const timeSavedSec = Math.max(0, timeCompSec - timeDogmaSec).toFixed(1);

  // Wattage saved at equivalent speed (40 km/h baseline)
  const speedMps = 40 / 3.6;
  const aeroPowerDogma = 0.5 * airDensity * effectiveDogmaCdA * Math.pow(speedMps, 3);
  const aeroPowerComp = 0.5 * airDensity * effectiveCompCdA * Math.pow(speedMps, 3);
  const wattsSaved = (aeroPowerComp - aeroPowerDogma).toFixed(1);

  // Canvas CFD Streamlines Fluid Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = (canvas.width = canvas.parentElement.clientWidth);
    const height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const streams = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * width,
        y: 20 + Math.random() * (height - 40),
        length: 70 + Math.random() * 140,
        speed: 4.5 + Math.random() * 7.5,
        opacity: 0.25 + Math.random() * 0.75,
        thickness: 1.4 + Math.random() * 2.0,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;

      streams.forEach((st) => {
        const speedScale = Math.max(0.6, dogmaSpeed / 35);
        st.x += st.speed * speedScale;
        if (st.x > width + 150) {
          st.x = -150;
          st.y = 20 + Math.random() * (height - 40);
        }

        let deflectionY = 0;
        const dx = st.x - cx;
        const dy = st.y - cy;

        if (st.x > cx + 80 && st.x < cx + 220 && st.y < cy) {
          deflectionY = -Math.sin((st.x - (cx + 80)) * 0.03) * 16;
        } else if (st.x > cx - 80 && st.x < cx + 120 && st.y > cy - 20 && st.y < cy + 80) {
          deflectionY = Math.sin((st.x - (cx - 80)) * 0.03) * 18;
        } else if (st.x < cx - 100) {
          deflectionY = Math.sin(st.x * 0.04) * 5;
        }

        const grad = ctx.createLinearGradient(st.x, st.y, st.x + st.length, st.y + deflectionY);

        if (st.x > cx + 50) {
          grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
          grad.addColorStop(0.5, `rgba(0, 240, 255, ${st.opacity})`);
          grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        } else {
          grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
          grad.addColorStop(0.3, `rgba(0, 240, 255, ${st.opacity * 0.85})`);
          grad.addColorStop(0.7, `rgba(255, 94, 14, ${st.opacity * 0.95})`);
          grad.addColorStop(1, 'rgba(228, 0, 43, 0)');
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = st.thickness;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x + st.length, st.y + deflectionY);
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [dogmaSpeed]);

  const handleResetTelemetry = () => {
    sfx.playClick();
    setRiderPowerWatts(320);
    setGradientPercent(0);
    setYawAngle(0);
    setRiderWeightKg(68);
  };

  return (
    <section
      id="windtunnel"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0b0e14] via-[#111622] to-[#0b0e14] border-t border-white/[0.08]"
    >
      {/* 1. Refined Luxury Studio Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-white/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] bg-[#E4002B]/[0.05] rounded-full blur-[200px] pointer-events-none" />

      {/* 2. Bespoke Dynamic Aerodynamic Flow Curves & Telemetry Rings */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-35">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,250 Q400,180 800,260 T1600,220 T2400,260" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" className="aero-streamline" />
          <path d="M-50,650 Q500,580 900,660 T1700,620 T2500,660" fill="none" stroke="rgba(228,0,43,0.2)" strokeWidth="1.5" className="aero-streamline-fast" />
          <circle cx="50%" cy="50%" r="480" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="5 10" />
        </svg>
      </div>

      {/* --- INNER CENTERED CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-5 backdrop-blur-md shadow-inner font-bold">
            <Wind className="w-3.5 h-3.5 animate-pulse text-[#E4002B]" />
            <span>04 // AERODYNAMICS // CFD VIRTUAL TUNNEL // TREVISO R&D</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.05]">
            DYNAMIC CFD{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#E4002B] mt-1">
              AERO TELEMETRY
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-200 font-sans max-w-2xl mx-auto leading-relaxed font-normal">
            Simulate real-world speed gains, CFD streamline flow, and watt savings generated by the authentic Pinarello Dogma F aerodynamic profile.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold">
              CdA: <strong className="text-cyan-300">0.048 m²</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold">
              Yaw Window: <strong className="text-cyan-300">-20° to +20°</strong>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 text-white font-bold">
              Rolling Road: <strong className="text-amber-300">Continuous 40 km/h</strong>
            </span>
          </div>
        </div>

        {/* Main Simulator Console Card */}
        <div className="bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#081522]/90 border border-white/15 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
          {/* Top Visualizer Chamber */}
          <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/80 via-[#061422] to-[#030a12] border-b border-white/15 flex items-center justify-center overflow-hidden">
            {/* Wind Tunnel Grid Environment */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

            {/* Ambient Lighting Gradients */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 left-0 w-96 h-full bg-gradient-to-r from-[#00F0FF]/20 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-[#E4002B]/20 to-transparent pointer-events-none" />

            {/* CFD Particles Canvas (Background Layer) */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

            {/* Authentic Pinarello Dogma F Interactive Model Container */}
            <div
              className="relative z-10 w-[84%] max-w-[660px] aspect-[16/10] flex items-center justify-center transition-transform duration-500 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${yawAngle * 0.75}deg) rotateZ(${-gradientPercent * 0.3}deg)`,
              }}
            >
              {/* Real Official Dogma F High-Res Cutout */}
              <img
                src={activeLivery.image}
                alt={`Pinarello Dogma F - ${activeLivery.name}`}
                key={activeLivery.id}
                className="w-full h-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.98)] select-none pointer-events-none transition-all duration-500"
              />

              {/* Realistic Ground Floor Reflection Shadow */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-[92%] h-10 bg-black/90 rounded-full blur-xl pointer-events-none" />

              {/* Interactive Aerodynamic Hotspots on the Authentic Frame */}
              {showHotspots &&
                AERO_HOTSPOTS.map((spot) => {
                  const isSelected = selectedHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => {
                        setSelectedHotspot(spot);
                        sfx.playClick();
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      style={{ top: spot.position.top, left: spot.position.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                      title={spot.title}
                    >
                      <span className="relative flex h-7 w-7 items-center justify-center">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            isSelected ? 'bg-[#00F0FF]' : 'bg-[#FF5E0E]'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white transition-transform duration-300 ${
                            isSelected
                              ? 'bg-[#00F0FF] scale-125 shadow-[0_0_15px_#00F0FF]'
                              : 'bg-[#FF5E0E] group-hover:scale-125 shadow-[0_0_10px_#FF5E0E]'
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
            </div>

            {/* Top-Left Telemetry Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="flex items-center gap-2 bg-black/90 border border-cyan-500/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_10px_#00F0FF]" />
                <span className="text-white text-[11px] font-bold">CFD: Laminar Flow Active</span>
              </div>

              <button
                onClick={() => {
                  setShowHotspots(!showHotspots);
                  sfx.playClick();
                }}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] text-white font-semibold transition-colors shadow-md backdrop-blur-md"
              >
                {showHotspots ? 'HIDE AERO HOTSPOTS' : 'SHOW AERO HOTSPOTS'}
              </button>
            </div>

            {/* Top-Right Livery Quick Switcher */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex items-center gap-2 bg-black/90 border border-white/25 p-2 rounded-full backdrop-blur-md shadow-2xl">
              {WIND_TUNNEL_LIVERIES.map((liv) => (
                <button
                  key={liv.id}
                  onClick={() => {
                    setActiveLivery(liv);
                    sfx.playClick();
                  }}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-300 ${
                    activeLivery.id === liv.id
                      ? 'scale-110 border-white shadow-[0_0_16px_rgba(255,255,255,1)] ring-2 ring-[#00F0FF] ring-offset-2 ring-offset-black'
                      : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ background: liv.swatchGradient || liv.colorHex }}
                  title={`${liv.name} (${liv.code})`}
                />
              ))}
            </div>

            {/* Selected Hotspot Detail Overlay Card */}
            {selectedHotspot && showHotspots && (
              <div className="absolute bottom-28 sm:bottom-32 left-4 sm:left-6 z-20 max-w-xs sm:max-w-sm p-5 rounded-2xl bg-black/90 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl transition-all animate-fadeIn">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex flex-col">
                    <span className="text-[9.5px] font-mono text-cyan-300 font-bold tracking-wider uppercase">
                      {selectedHotspot.category}
                    </span>
                    <span className="font-display text-base font-black text-white uppercase">
                      {selectedHotspot.title}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-[#00F0FF] font-mono text-xs font-black shadow-[0_0_12px_rgba(0,240,255,0.35)]">
                    {selectedHotspot.saving}
                  </span>
                </div>
                <p className="text-xs text-zinc-200 font-sans leading-relaxed">
                  {selectedHotspot.desc}
                </p>
              </div>
            )}

            {/* Bottom Speed & Telemetry Summary Strip */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-black/95 via-zinc-950/95 to-black/95 border border-white/20 p-4 sm:p-5 rounded-2xl backdrop-blur-2xl shadow-2xl">
              <div>
                <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SIMULATED DOGMA F SPEED</span>
                </div>
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-0.5">
                  {dogmaSpeed.toFixed(1)}{' '}
                  <span className="text-sm font-mono text-[#00F0FF]">KM/H</span>
                  <span className="text-xs font-mono text-zinc-400 ml-2.5 font-bold">
                    ({(dogmaSpeed * 0.621371).toFixed(1)} MPH)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 font-mono text-xs">
                <div className="border-l border-white/15 pl-4 sm:pl-6">
                  <div className="text-[9.5px] text-zinc-400 uppercase tracking-wider font-bold">DELTA VS STANDARD</div>
                  <div className="text-sm sm:text-lg font-black text-[#D4FF00] mt-0.5">
                    +{speedDelta} KM/H
                  </div>
                </div>
                <div className="border-l border-white/15 pl-4 sm:pl-6">
                  <div className="text-[9.5px] text-zinc-400 uppercase tracking-wider font-bold">TIME SAVED / 40KM</div>
                  <div className="text-sm sm:text-lg font-black text-[#FF5E0E] mt-0.5">
                    -{timeSavedSec} SEC
                  </div>
                </div>
                <div className="border-l border-white/15 pl-4 sm:pl-6">
                  <div className="text-[9.5px] text-zinc-400 uppercase tracking-wider font-bold">WATT SAVING @ 40KM/H</div>
                  <div className="text-sm sm:text-lg font-black text-[#00F0FF] mt-0.5">
                    -{wattsSaved} W
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Telemetry Controls */}
          <div className="p-6 sm:p-8 lg:p-10 bg-black/40 border-t border-white/15">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-300" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-bold">
                  Virtual CFD Telemetry Inputs
                </span>
              </div>
              <button
                onClick={handleResetTelemetry}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET BASELINE</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rider Wattage Slider */}
              <div className="bg-white/[0.05] border border-white/15 p-5 rounded-2xl hover:border-white/25 transition-colors">
                <div className="flex justify-between items-center text-xs font-mono mb-3">
                  <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#FF5E0E]" />
                    <span>RIDER POWER</span>
                  </span>
                  <span className="text-white font-black text-sm bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
                    {riderPowerWatts} W
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="700"
                  step="10"
                  value={riderPowerWatts}
                  onChange={(e) => {
                    setRiderPowerWatts(Number(e.target.value));
                    sfx.playHover();
                  }}
                  className="w-full accent-[#FF5E0E] bg-white/15 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2 font-semibold">
                  <span>150W (Tempo)</span>
                  <span>700W (Sprint)</span>
                </div>
              </div>

              {/* Road Gradient Slider */}
              <div className="bg-white/[0.05] border border-white/15 p-5 rounded-2xl hover:border-white/25 transition-colors">
                <div className="flex justify-between items-center text-xs font-mono mb-3">
                  <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>ROAD GRADIENT</span>
                  </span>
                  <span
                    className={`font-black text-sm px-2.5 py-0.5 rounded-lg border border-white/15 ${
                      gradientPercent > 0
                        ? 'text-[#FF5E0E] bg-[#FF5E0E]/10'
                        : gradientPercent < 0
                        ? 'text-[#00F0FF] bg-[#00F0FF]/10'
                        : 'text-white bg-white/10'
                    }`}
                  >
                    {gradientPercent > 0 ? `+${gradientPercent}` : gradientPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="15"
                  step="1"
                  value={gradientPercent}
                  onChange={(e) => {
                    setGradientPercent(Number(e.target.value));
                    sfx.playHover();
                  }}
                  className="w-full accent-[#00F0FF] bg-white/15 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2 font-semibold">
                  <span>-8% (Descent)</span>
                  <span>+15% (Alpe d&apos;Huez)</span>
                </div>
              </div>

              {/* Crosswind Yaw Angle */}
              <div className="bg-white/[0.05] border border-white/15 p-5 rounded-2xl hover:border-white/25 transition-colors">
                <div className="flex justify-between items-center text-xs font-mono mb-3">
                  <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>CROSSWIND YAW</span>
                  </span>
                  <span className="text-white font-black text-sm bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
                    {yawAngle}°
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="2"
                  value={yawAngle}
                  onChange={(e) => {
                    setYawAngle(Number(e.target.value));
                    sfx.playHover();
                  }}
                  className="w-full accent-[#D4FF00] bg-white/15 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2 font-semibold">
                  <span>-20° (Port)</span>
                  <span>+20° (Starboard)</span>
                </div>
              </div>

              {/* Rider Weight */}
              <div className="bg-white/[0.05] border border-white/15 p-5 rounded-2xl hover:border-white/25 transition-colors">
                <div className="flex justify-between items-center text-xs font-mono mb-3">
                  <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-[#E4002B]" />
                    <span>RIDER WEIGHT</span>
                  </span>
                  <span className="text-white font-black text-sm bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
                    {riderWeightKg} KG
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="1"
                  value={riderWeightKg}
                  onChange={(e) => {
                    setRiderWeightKg(Number(e.target.value));
                    sfx.playHover();
                  }}
                  className="w-full accent-[#E4002B] bg-white/15 h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2 font-semibold">
                  <span>50 KG (Climber)</span>
                  <span>100 KG (Rouleur)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
