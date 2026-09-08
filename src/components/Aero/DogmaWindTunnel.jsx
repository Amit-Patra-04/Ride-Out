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
} from 'lucide-react';
import { sfx } from '../../utils/animations';

const WIND_TUNNEL_LIVERIES = [
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

const AERO_HOTSPOTS = [
  {
    id: 'forkflap',
    title: 'Onda ForkFlap™',
    saving: '-1.2 W',
    position: { top: '62%', left: '76%' },
    desc: 'Shields the front disc caliper from incoming air vortices, stabilizing the front hub airflow.',
  },
  {
    id: 'aero-keel',
    title: 'Aero-Keel™ BB Shell',
    saving: '-0.8 W',
    position: { top: '64%', left: '46%' },
    desc: '3.5° rotated bottom bracket surface generates a high-velocity low-pressure channel beneath the chassis.',
  },
  {
    id: 'ticr-cockpit',
    title: 'TiCR™ Talon Cockpit',
    saving: '-5.0 W',
    position: { top: '26%', left: '72%' },
    desc: '100% total internal cable integration eliminates exposed wiring turbulence across the head tube.',
  },
  {
    id: 'princeton-rim',
    title: 'Sinusoidal 4550 Rim',
    saving: '-2.4 W',
    position: { top: '65%', left: '22%' },
    desc: 'Variable-depth 45-50mm wave profiles suppress crosswind torque and reduce side-load stalling.',
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
  // Total Bike Weight: Dogma F ~ 6.77kg
  const totalMass = riderWeightKg + 6.77;
  const gravity = 9.81;
  const rollingResistanceCoeff = 0.003; // Continental GP5000 S TR
  const airDensity = 1.225; // kg/m^3 standard sea level
  const baseCdA = 0.048; // Pinarello Dogma F aerodynamic drag area
  const competitorCdA = 0.052; // Standard race frame

  // Effective CdA with yaw angle penalty
  const yawFactor = 1 + Math.abs(yawAngle) * 0.004;
  const effectiveDogmaCdA = baseCdA * yawFactor;
  const effectiveCompCdA = competitorCdA * yawFactor;

  // Approximate speed in km/h based on wattage & slope
  const computeSpeedKmh = (watts, cda) => {
    let low = 1;
    let high = 30; // m/s (up to 108 km/h)
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
    return ((low + high) / 2) * 3.6; // convert m/s to km/h
  };

  const dogmaSpeed = computeSpeedKmh(riderPowerWatts, effectiveDogmaCdA);
  const competitorSpeed = computeSpeedKmh(riderPowerWatts, effectiveCompCdA);
  const speedDelta = (dogmaSpeed - competitorSpeed).toFixed(2);

  // Time saved over 40 km (in seconds)
  const timeDogmaSec = (40 / dogmaSpeed) * 3600;
  const timeCompSec = (40 / competitorSpeed) * 3600;
  const timeSavedSec = Math.max(0, timeCompSec - timeDogmaSec).toFixed(1);

  // Wattage saved at equivalent speed (40 km/h baseline)
  const speedMps = 40 / 3.6; // 11.11 m/s
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
    const height = (canvas.height = canvas.parentElement.clientHeight || 460);

    const streams = [];
    const count = 65;

    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * width,
        y: 20 + Math.random() * (height - 40),
        length: 50 + Math.random() * 100,
        speed: 4 + Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.75,
        thickness: 1.2 + Math.random() * 1.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Bike bounding profile for airflow deflection
      const cx = width * 0.5;
      const cy = height * 0.52;

      streams.forEach((st) => {
        const speedScale = Math.max(0.6, dogmaSpeed / 35);
        st.x += st.speed * speedScale;
        if (st.x > width + 120) {
          st.x = -120;
          st.y = 20 + Math.random() * (height - 40);
        }

        // Realistic flow deflection around the authentic Dogma F contours
        let deflectionY = 0;
        const dx = st.x - cx;
        const dy = st.y - cy;

        // Front Cockpit & Headtube deflection
        if (st.x > cx + 80 && st.x < cx + 220 && st.y < cy) {
          deflectionY = -Math.sin((st.x - (cx + 80)) * 0.03) * 16;
        }
        // Bottom Bracket & Down Tube Aero-Keel deflection
        else if (st.x > cx - 80 && st.x < cx + 120 && st.y > cy - 20 && st.y < cy + 80) {
          deflectionY = Math.sin((st.x - (cx - 80)) * 0.03) * 18;
        }
        // Rear Wheel wake low-drag slipstream
        else if (st.x < cx - 100) {
          deflectionY = Math.sin(st.x * 0.04) * 5;
        }

        const grad = ctx.createLinearGradient(st.x, st.y, st.x + st.length, st.y + deflectionY);
        
        // Color transition: Cyan laminar front -> Low-drag Amber/Crimson slipstream
        if (st.x > cx + 50) {
          grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
          grad.addColorStop(0.6, `rgba(0, 240, 255, ${st.opacity})`);
          grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        } else {
          grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
          grad.addColorStop(0.4, `rgba(0, 240, 255, ${st.opacity * 0.8})`);
          grad.addColorStop(0.8, `rgba(255, 94, 14, ${st.opacity * 0.9})`);
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

  return (
    <section id="windtunnel" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-[#E4002B]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF5E0E] text-xs font-mono tracking-widest uppercase mb-4">
          <Wind className="w-3.5 h-3.5" />
          <span>Aero Telemetry & Wind Tunnel Simulator</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
          DYNAMIC AERODYNAMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF5E0E] to-[#E4002B]">TELEMETRY</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-zinc-400 font-sans">
          Simulate real-world speed gains, CFD streamline flow, and watt savings generated by the authentic Pinarello Dogma F aerodynamic profile.
        </p>
      </div>

      {/* Main Simulator Console Card */}
      <div className="bg-obsidian-surface/90 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl">
        {/* Top Visualizer Chamber */}
        <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-black to-[#050608] border-b border-white/10 flex items-center justify-center overflow-hidden">
          
          {/* Wind Tunnel Grid Environment */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#00F0FF]/10 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#E4002B]/10 to-transparent pointer-events-none" />

          {/* CFD Particles Canvas (Background Layer) */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Authentic Pinarello Dogma F Interactive Model Container */}
          <div
            className="relative z-10 w-[82%] max-w-[620px] aspect-[16/10] flex items-center justify-center transition-transform duration-500 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${yawAngle * 0.75}deg) rotateZ(${-gradientPercent * 0.3}deg)`,
            }}
          >
            {/* Real Official Dogma F High-Res Cutout */}
            <img
              src={activeLivery.image}
              alt={`Pinarello Dogma F - ${activeLivery.name}`}
              key={activeLivery.id}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] select-none pointer-events-none transition-all duration-500"
            />

            {/* Realistic Ground Floor Reflection Shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/80 rounded-full blur-xl pointer-events-none" />

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
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none`}
                    title={spot.title}
                  >
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isSelected ? 'bg-[#00F0FF]' : 'bg-[#FF5E0E]'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white transition-transform ${
                          isSelected
                            ? 'bg-[#00F0FF] scale-125 shadow-[0_0_12px_#00F0FF]'
                            : 'bg-[#FF5E0E] group-hover:scale-125'
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
          </div>

          {/* Top-Left Telemetry Badges */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="flex items-center gap-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-zinc-200">CFD: Laminar Flow Active</span>
            </div>

            <button
              onClick={() => {
                setShowHotspots(!showHotspots);
                sfx.playClick();
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-zinc-300 transition-colors"
            >
              {showHotspots ? 'HIDE HOTSPOTS' : 'SHOW AERO HOTSPOTS'}
            </button>
          </div>

          {/* Top-Right Livery Quick Switcher */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex items-center gap-2 bg-black/85 border border-white/15 p-1.5 rounded-full backdrop-blur-md shadow-xl">
            {WIND_TUNNEL_LIVERIES.map((liv) => (
              <button
                key={liv.id}
                onClick={() => {
                  setActiveLivery(liv);
                  sfx.playClick();
                }}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-300 ${
                  activeLivery.id === liv.id
                    ? 'scale-110 border-white shadow-[0_0_12px_rgba(255,255,255,0.9)] ring-2 ring-[#00F0FF]/60 ring-offset-1 ring-offset-black'
                    : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                style={{ background: liv.swatchGradient || liv.colorHex }}
                title={`${liv.name} (${liv.code})`}
              />
            ))}
          </div>

          {/* Selected Hotspot Detail Overlay Card */}
          {selectedHotspot && showHotspots && (
            <div className="absolute bottom-20 sm:bottom-24 left-4 sm:left-6 z-20 max-w-xs sm:max-w-sm p-3.5 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-xl shadow-2xl transition-all">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-display text-sm font-bold text-white uppercase">
                  {selectedHotspot.title}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-[10px] font-bold">
                  {selectedHotspot.saving}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                {selectedHotspot.desc}
              </p>
            </div>
          )}

          {/* Bottom Speed & Telemetry Summary Strip */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex flex-wrap items-center justify-between gap-4 bg-black/80 border border-white/10 p-3.5 sm:p-4 rounded-2xl backdrop-blur-xl">
            <div>
              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase">
                SIMULATED DOGMA F SPEED
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-white">
                {dogmaSpeed.toFixed(1)}{' '}
                <span className="text-xs sm:text-sm font-mono text-[#00F0FF]">KM/H</span>
                <span className="text-xs font-mono text-zinc-500 ml-2">
                  ({(dogmaSpeed * 0.621371).toFixed(1)} MPH)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">DELTA VS COMPETITOR</div>
                <div className="text-sm sm:text-base font-bold text-[#D4FF00]">
                  +{speedDelta} KM/H
                </div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">TIME SAVED / 40KM</div>
                <div className="text-sm sm:text-base font-bold text-[#FF5E0E]">
                  -{timeSavedSec} SEC
                </div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">WATT SAVING @ 40KM/H</div>
                <div className="text-sm sm:text-base font-bold text-[#00F0FF]">
                  -{wattsSaved} W
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Telemetry Controls */}
        <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-obsidian-surface/60">
          {/* Rider Wattage Slider */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-400">RIDER POWER</span>
              <span className="text-white font-bold">{riderPowerWatts} W</span>
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
              className="w-full accent-[#FF3B00] bg-white/10 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>150W (Tempo)</span>
              <span>700W (Sprint)</span>
            </div>
          </div>

          {/* Road Gradient Slider */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-400">ROAD GRADIENT</span>
              <span
                className={`font-bold ${
                  gradientPercent > 0
                    ? 'text-[#FF5E0E]'
                    : gradientPercent < 0
                    ? 'text-[#00F0FF]'
                    : 'text-white'
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
              className="w-full accent-[#00F0FF] bg-white/10 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>-8% (Descent)</span>
              <span>+15% (Alpe d&apos;Huez)</span>
            </div>
          </div>

          {/* Crosswind Yaw Angle */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-400">CROSSWIND YAW</span>
              <span className="text-white font-bold">{yawAngle}°</span>
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
              className="w-full accent-[#D4FF00] bg-white/10 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>-20° (Port)</span>
              <span>+20° (Starboard)</span>
            </div>
          </div>

          {/* Rider Weight */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-2xl">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-400">RIDER WEIGHT</span>
              <span className="text-white font-bold">{riderWeightKg} KG</span>
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
              className="w-full accent-[#FF5E0E] bg-white/10 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
              <span>50 KG (Climber)</span>
              <span>100 KG (Rouleur)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

