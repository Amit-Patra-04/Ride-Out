import React, { useState, useEffect, useRef } from 'react';
import {
  Wind,
  Gauge,
  Zap,
  Activity,
  Compass,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const DogmaWindTunnel = () => {
  const [riderPowerWatts, setRiderPowerWatts] = useState(320);
  const [gradientPercent, setGradientPercent] = useState(0);
  const [yawAngle, setYawAngle] = useState(0);
  const [riderWeightKg, setRiderWeightKg] = useState(68);

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
  // Power = (m*g*sin(theta) + m*g*Cr*cos(theta))*v + 0.5*rho*CdA*v^3
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
  const timeSavedSec = Math.max(0, (timeCompSec - timeDogmaSec)).toFixed(1);

  // Wattage saved at equivalent speed (40 km/h baseline)
  const speedMps = 40 / 3.6; // 11.11 m/s
  const aeroPowerDogma = 0.5 * airDensity * effectiveDogmaCdA * Math.pow(speedMps, 3);
  const aeroPowerComp = 0.5 * airDensity * effectiveCompCdA * Math.pow(speedMps, 3);
  const wattsSaved = (aeroPowerComp - aeroPowerDogma).toFixed(1);

  // Canvas Streamline Fluid Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = (canvas.width = canvas.parentElement.clientWidth);
    const height = (canvas.height = 360);

    const streams = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * width,
        y: 30 + Math.random() * (height - 60),
        length: 60 + Math.random() * 90,
        speed: 4 + Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.7,
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 6, 8, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw Air Flow Streamlines with subtle deflection around frame silhouette
      streams.forEach((st) => {
        st.x += st.speed * (dogmaSpeed / 30);
        if (st.x > width + 100) {
          st.x = -100;
          st.y = 30 + Math.random() * (height - 60);
        }

        // Deflect stream around imaginary bike frame center
        const bikeCenterX = width * 0.5;
        const bikeCenterY = height * 0.5;
        const dist = Math.hypot(st.x - bikeCenterX, st.y - bikeCenterY);
        let offsetY = 0;
        if (dist < 120) {
          offsetY = Math.sin((st.x - bikeCenterX) * 0.05) * 14 * (st.y < bikeCenterY ? -1 : 1);
        }

        const grad = ctx.createLinearGradient(st.x, st.y, st.x + st.length, st.y + offsetY);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        grad.addColorStop(0.5, `rgba(0, 240, 255, ${st.opacity})`);
        grad.addColorStop(1, 'rgba(255, 59, 0, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x + st.length, st.y + offsetY);
        ctx.stroke();
      });

      // Draw Bike Vector Silhouette in center
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Draw stylized frame lines
      const cx = width * 0.5;
      const cy = height * 0.55;
      // Wheels
      ctx.arc(cx - 100, cy + 40, 38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 100, cy + 40, 38, 0, Math.PI * 2);
      ctx.stroke();
      // Frame triangle
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy + 40); // rear hub
      ctx.lineTo(cx, cy + 40); // BB
      ctx.lineTo(cx + 80, cy - 30); // Head tube top
      ctx.lineTo(cx - 30, cy - 35); // Seat top
      ctx.closePath();
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [dogmaSpeed]);

  return (
    <section id="windtunnel" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF5E0E] text-xs font-mono tracking-widest uppercase mb-4">
          <Wind className="w-3.5 h-3.5" />
          <span>Aero Telemetry & Wind Tunnel Simulator</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          Dynamic Aerodynamic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF6A00] to-[#FF3B00]">Telemetry</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400">
          Simulate real-world speed gains and watt savings produced by the Dogma F&apos;s Onda ForkFlap™, FlatBack tubing, and Aero-Keel bottom bracket.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-obsidian-surface/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Top Visualizer Canvas */}
        <div className="relative w-full h-[360px] bg-[#050608] border-b border-white/10 flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Telemetry Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/80 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-zinc-300">CFD Flow: Laminar Stream</span>
          </div>

          <div className="absolute top-6 right-6 flex items-center gap-3 font-mono text-xs">
            <div className="bg-black/80 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md">
              <span className="text-zinc-500 uppercase text-[10px]">CdA: </span>
              <span className="text-[#00F0FF] font-bold">{effectiveDogmaCdA.toFixed(4)}</span>
            </div>
          </div>

          {/* Center Calculated Speed Stat */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 bg-black/70 border border-white/10 p-4 rounded-xl backdrop-blur-md">
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">SIMULATED DOGMA F SPEED</div>
              <div className="font-display text-3xl font-extrabold text-white">
                {dogmaSpeed.toFixed(1)} <span className="text-sm font-mono text-[#00F0FF]">KM/H</span>
                <span className="text-xs font-mono text-zinc-400 ml-2">({(dogmaSpeed * 0.621371).toFixed(1)} MPH)</span>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">DELTA VS COMPETITOR</div>
                <div className="text-base font-bold text-[#D4FF00]">+{speedDelta} KM/H</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">TIME SAVED / 40KM</div>
                <div className="text-base font-bold text-[#FF5E0E]">-{timeSavedSec} SEC</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">WATT SAVING @ 40KM/H</div>
                <div className="text-base font-bold text-[#00F0FF]">-{wattsSaved} W</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Controls */}
        <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Rider Wattage Slider */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
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
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
              <span>150W (Tempo)</span>
              <span>700W (Sprint)</span>
            </div>
          </div>

          {/* Gradient Slider */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-400">ROAD GRADIENT</span>
              <span className={`font-bold ${gradientPercent > 0 ? 'text-[#FF5E0E]' : gradientPercent < 0 ? 'text-[#00F0FF]' : 'text-white'}`}>
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
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
              <span>-8% (Descent)</span>
              <span>+15% (Alpe d&apos;Huez)</span>
            </div>
          </div>

          {/* Wind Yaw Angle */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
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
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
              <span>-20° (Port)</span>
              <span>+20° (Starboard)</span>
            </div>
          </div>

          {/* Rider Weight */}
          <div className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl">
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
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
              <span>50 KG (Climber)</span>
              <span>100 KG (Rouleur)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
