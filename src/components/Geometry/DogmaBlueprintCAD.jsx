import React, { useState } from 'react';
import {
  Ruler,
  Sparkles,
  Zap,
  Crosshair,
  Layers,
  Compass,
  Wind,
  Activity,
  Maximize2,
  X,
  Grid,
  Eye,
  Info,
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const DogmaBlueprintCAD = ({ geom, className = '' }) => {
  const [activeLayer, setActiveLayer] = useState('geometry'); // 'geometry', 'aero', 'stress', 'ticr'
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // --- PRECISION MATHEMATICAL CAD COORDINATE SYSTEM ---
  // Calibrated to fit all 9 Pinarello discrete sizes (43.0cm - 62.0cm) with 100% boundary safety
  const scale = 0.44;
  const bbX = 410;
  const bbY = 430;

  // Angles in radians
  const seatAngleRad = (parseFloat(geom.seatAngle) * Math.PI) / 180;
  const headAngleRad = (parseFloat(geom.headAngle) * Math.PI) / 180;

  // 1. Seat Tube Top (Seat Cluster)
  const seatTubeLength = geom.seatTube * scale * 0.95;
  const seatTopX = bbX - Math.cos(seatAngleRad) * seatTubeLength;
  const seatTopY = bbY - Math.sin(seatAngleRad) * seatTubeLength;

  // Seatpost Mast Extension
  const postExt = 52;
  const saddleX = seatTopX - Math.cos(seatAngleRad) * postExt;
  const saddleY = seatTopY - Math.sin(seatAngleRad) * postExt;

  // 2. Head Tube Top (Stack & Reach relative to BB Datum 0,0)
  const reachPx = geom.reach * scale * 1.02;
  const stackPx = geom.stack * scale * 0.98;
  const headTopX = bbX + reachPx;
  const headTopY = bbY - stackPx;

  // Head Tube Bottom
  const headTubeLength = geom.headTube * scale * 0.94;
  const headBottomX = headTopX + Math.cos(headAngleRad) * headTubeLength;
  const headBottomY = headTopY + Math.sin(headAngleRad) * headTubeLength;

  // 3. Rear Axle (Chainstay from BB)
  const chainstayLength = geom.chainstay * scale * 0.95;
  const bbDropPx = geom.bbDrop * scale * 0.72;
  const rearAxleX = bbX - chainstayLength;
  const rearAxleY = bbY - bbDropPx;

  // 4. Front Axle (Onda Fork from Headtube Bottom)
  const forkLength = 370 * scale * 0.95;
  const forkRake = 47 * scale;
  const frontAxleX = headBottomX + Math.cos(headAngleRad) * forkLength + forkRake;
  const frontAxleY = headBottomY + Math.sin(headAngleRad) * forkLength;

  // Wheel Radii (700x28c wheel system)
  const wheelRadius = 138;
  const rimOuterRadius = wheelRadius - 10;
  const rimInnerRadius = wheelRadius - 28;

  // MOST Talon Ultra Integrated Cockpit
  const stemLength = 110 * scale * 0.82;
  const stemAngleRad = (82 * Math.PI) / 180;
  const stemEndX = headTopX + Math.cos(stemAngleRad) * stemLength + 14;
  const stemEndY = headTopY - Math.sin(stemAngleRad) * stemLength - 8;

  // Ground Line Datum (Tangent to lower tire radius)
  const groundY = Math.max(rearAxleY, frontAxleY) + wheelRadius;

  // Interactive Frame Engineering Hotspots
  const HOTSPOTS = [
    {
      id: 'headtube',
      name: 'Aero Nose Headtube',
      cx: headTopX,
      cy: (headTopY + headBottomY) / 2,
      spec: `-8mm Width • Elliptical Steerer • 1.5" Lower Bearing`,
      desc: 'Reduces frontal surface area and delays laminar separation at high yaw angles.',
    },
    {
      id: 'fork',
      name: 'Onda Fork & ForkFlap™',
      cx: (headBottomX + frontAxleX) / 2,
      cy: (headBottomY + frontAxleY) / 2,
      spec: '47.0mm Offset • Integrated Disc Caliper Fairing',
      desc: 'Signature wavy carbon blade suppresses flat-mount caliper wake turbulence and dampens road chatter.',
    },
    {
      id: 'bb',
      name: 'Aero-Keel Bottom Bracket',
      cx: bbX,
      cy: bbY,
      spec: '3.5° Rotational CFD Keel • Italian 70mm Threaded',
      desc: 'Trickle-down tech from Ganna Hour Record reduces BB junction air drag by 1.2% while housing 70mm Italian threads.',
    },
    {
      id: 'stays',
      name: 'Asymmetric Stays & Dropouts',
      cx: (bbX + rearAxleX) / 2,
      cy: (bbY + rearAxleY) / 2,
      spec: 'TorayCa M40X • Balanced Driveside Flex Compensation',
      desc: 'Counters asymmetric drivetrain chain tension under peak 1,500W WorldTour sprint wattages.',
    },
    {
      id: 'seatpost',
      name: 'FlatBack Aero Mast & 3D Ti Clamp',
      cx: seatTopX,
      cy: seatTopY - 18,
      spec: 'Truncated UCI 3:1 Profile • 3D Printed Ti-6Al-4V Wedge',
      desc: 'Provides vertical compliance over rough tarmac and integrates internal Di2 battery retention.',
    },
    {
      id: 'cockpit',
      name: 'MOST Talon Ultra Fast Cockpit',
      cx: stemEndX,
      cy: stemEndY + 8,
      spec: 'TorayCa 1K Carbon Monocoque • 7° Sprint Flare',
      desc: 'Full internal TiCR cable routing saves 5.0 Watts aerodynamic drag at 40 km/h.',
    },
    {
      id: 'front-axle',
      name: 'Flush Concealed Front Axle',
      cx: frontAxleX,
      cy: frontAxleY,
      spec: '12x100mm E-Thru • Blind Dropout Right Fairing',
      desc: 'Integrated into fork carbon layup with zero exposed axle threads to minimize boundary layer vortex.',
    },
    {
      id: 'rear-axle',
      name: 'Integrated Rear Dropout',
      cx: rearAxleX,
      cy: rearAxleY,
      spec: '12x142mm E-Thru • Direct Mount Derailleur Hanger',
      desc: 'Direct-mount hanger maximizes Shimano Di2 rear shifting precision and stiffness.',
    },
  ];

  // Helper for sinusoidal wave rim paths (Princeton CarbonWorks Peak 4550)
  const generateSinusoidalRim = (cx, cy, rOuter, rInner, waves = 24) => {
    let d = '';
    const step = (Math.PI * 2) / waves;
    for (let i = 0; i <= waves; i++) {
      const angle = i * step;
      const waveOffset = Math.sin(angle * 6) * 3.5;
      const r = rInner + waveOffset;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
      else d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    d += 'Z';
    return d;
  };

  const rearSinusoidalRimPath = generateSinusoidalRim(rearAxleX, rearAxleY, rimOuterRadius, rimInnerRadius);
  const frontSinusoidalRimPath = generateSinusoidalRim(frontAxleX, frontAxleY, rimOuterRadius, rimInnerRadius);

  const renderBlueprintContent = (isModal = false) => (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#050811] select-none">
      {/* --- BLUEPRINT CAD CYAN TECHNICAL GRID BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(0,240,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* --- TOP HEADER DOSSIER BAR --- */}
      <div className="relative z-10 px-4 sm:px-6 py-2.5 border-b border-cyan-500/25 bg-[#070b16]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
          <div className="flex items-baseline gap-2">
            <span className="text-white font-extrabold tracking-wider uppercase">
              PINARELLO CAD LAB // DOGMA F
            </span>
            <span className="text-[#00F0FF] font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px]">
              SIZE {geom.size} CM
            </span>
          </div>
          <span className="text-zinc-500 hidden md:inline">•</span>
          <span className="text-zinc-400 hidden md:inline text-[10px]">PARAMETRIC VECTOR R&D SPEC</span>
        </div>

        {/* Blueprint Mode Layer Selector */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-cyan-500/30">
          <button
            onClick={() => {
              setActiveLayer('geometry');
              sfx.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeLayer === 'geometry'
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_#00F0FF]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Ruler className="w-3 h-3" />
            <span>CALIPERS</span>
          </button>
          <button
            onClick={() => {
              setActiveLayer('aero');
              sfx.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeLayer === 'aero'
                ? 'bg-[#E4002B] text-white shadow-[0_0_12px_#E4002B]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Wind className="w-3 h-3" />
            <span>CFD AERO</span>
          </button>
          <button
            onClick={() => {
              setActiveLayer('stress');
              sfx.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeLayer === 'stress'
                ? 'bg-[#D4FF00] text-black shadow-[0_0_12px_#D4FF00]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>FEA STRESS</span>
          </button>
          <button
            onClick={() => {
              setActiveLayer('ticr');
              sfx.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeLayer === 'ticr'
                ? 'bg-[#A855F7] text-white shadow-[0_0_12px_#A855F7]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>TICR™ CONDUIT</span>
          </button>

          {!isModal && (
            <button
              onClick={() => {
                setIsFullscreen(true);
                sfx.playClick();
              }}
              className="ml-1.5 p-1 text-cyan-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Full Window CAD Blueprint Inspection"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* --- SVG PARAMETRIC VECTOR BLUEPRINT CANVAS --- */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.6] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <svg
          viewBox="0 0 980 580"
          className="w-full h-full filter drop-shadow-[0_0_25px_rgba(0,240,255,0.18)] transition-all duration-500 ease-out"
        >
          <defs>
            {/* Blueprint Technical Filters & Carbon Gradients */}
            <filter id="cadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="aeroGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <pattern id="carbonHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" />
            </pattern>

            <linearGradient id="carbonMonocoqueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#00C8FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="feaStressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#D4FF00" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FF5E0E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E4002B" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="aeroStreamGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#00F0FF" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#00D2FF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="aeroStreamGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5E0E" stopOpacity="0.1" />
              <stop offset="40%" stopColor="#FF5E0E" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E4002B" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* --- LAYER 1: CAD METRIC RULER MARKS & GROUND DATUM --- */}
          {/* Ground Plane Line */}
          <line
            x1="40"
            y1={groundY}
            x2="940"
            y2={groundY}
            stroke="rgba(0, 240, 255, 0.3)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
          />
          <text
            x="50"
            y={groundY + 14}
            fill="rgba(0, 240, 255, 0.6)"
            fontSize="8.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            DATUM 0.00 — GROUND PLANE (700×28c TYRE CONTACT)
          </text>

          {/* Metric Top Coordinate Ruler */}
          <line x1="40" y1="20" x2="940" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
            <React.Fragment key={x}>
              <line x1={x} y1="16" x2={x} y2="24" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <text x={x} y="12" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace" textAnchor="middle">
                {x}
              </text>
            </React.Fragment>
          ))}

          {/* Centerlines (ISO Standard Long-Short Dash) */}
          {/* Steerer Centerline Axis */}
          <line
            x1={headTopX - Math.cos(headAngleRad) * 40}
            y1={headTopY - Math.sin(headAngleRad) * 40}
            x2={headBottomX + Math.cos(headAngleRad) * 190}
            y2={headBottomY + Math.sin(headAngleRad) * 190}
            stroke="rgba(0, 240, 255, 0.25)"
            strokeWidth="1"
            strokeDasharray="14 3 3 3"
          />
          {/* Seat Tube Centerline Axis */}
          <line
            x1={saddleX - Math.cos(seatAngleRad) * 20}
            y1={saddleY - Math.sin(seatAngleRad) * 20}
            x2={bbX + Math.cos(seatAngleRad) * 35}
            y2={bbY + Math.sin(seatAngleRad) * 35}
            stroke="rgba(0, 240, 255, 0.25)"
            strokeWidth="1"
            strokeDasharray="14 3 3 3"
          />

          {/* --- LAYER 2: PRINCETON CARBONWORKS PEAK 4550 WHEELS & ROTORS --- */}
          {/* Rear Wheel (Outer Tyre 700x28c) */}
          <circle
            cx={rearAxleX}
            cy={rearAxleY}
            r={wheelRadius}
            fill="rgba(0, 240, 255, 0.02)"
            stroke="rgba(0, 240, 255, 0.35)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
          {/* Rear Sinusoidal Princeton Rim */}
          <path
            d={rearSinusoidalRimPath}
            fill="rgba(0, 240, 255, 0.05)"
            stroke="#00F0FF"
            strokeWidth="1.6"
            opacity="0.9"
          />
          {/* Rear Disc Brake Rotor (140mm) */}
          <circle
            cx={rearAxleX}
            cy={rearAxleY}
            r="26"
            fill="none"
            stroke="rgba(255, 94, 14, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx={rearAxleX} cy={rearAxleY} r="4.5" fill="#00F0FF" />

          {/* Front Wheel (Outer Tyre 700x28c) */}
          <circle
            cx={frontAxleX}
            cy={frontAxleY}
            r={wheelRadius}
            fill="rgba(0, 240, 255, 0.02)"
            stroke="rgba(0, 240, 255, 0.35)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
          {/* Front Sinusoidal Princeton Rim */}
          <path
            d={frontSinusoidalRimPath}
            fill="rgba(0, 240, 255, 0.05)"
            stroke="#00F0FF"
            strokeWidth="1.6"
            opacity="0.9"
          />
          {/* Front Disc Brake Rotor (160mm) */}
          <circle
            cx={frontAxleX}
            cy={frontAxleY}
            r="30"
            fill="none"
            stroke="rgba(255, 94, 14, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <circle cx={frontAxleX} cy={frontAxleY} r="4.5" fill="#00F0FF" />

          {/* Aerodynamic Bladed Spokes Array */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            return (
              <React.Fragment key={i}>
                <line
                  x1={rearAxleX}
                  y1={rearAxleY}
                  x2={rearAxleX + Math.cos(rad) * (wheelRadius - 14)}
                  y2={rearAxleY + Math.sin(rad) * (wheelRadius - 14)}
                  stroke="rgba(0, 240, 255, 0.18)"
                  strokeWidth="0.75"
                />
                <line
                  x1={frontAxleX}
                  y1={frontAxleY}
                  x2={frontAxleX + Math.cos(rad) * (wheelRadius - 14)}
                  y2={frontAxleY + Math.sin(rad) * (wheelRadius - 14)}
                  stroke="rgba(0, 240, 255, 0.18)"
                  strokeWidth="0.75"
                />
              </React.Fragment>
            );
          })}

          {/* --- LAYER 3: AUTHENTIC DOGMA F MONOCOQUE CHASSIS --- */}
          {/* Down Tube with 3.5° Aero-Keel BB junction */}
          <path
            d={`M ${bbX} ${bbY} C ${bbX + 30} ${bbY - 12} ${headBottomX - 40} ${headBottomY + 24} ${headBottomX} ${headBottomY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth={activeLayer === 'stress' ? '8.5' : '7'}
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />
          {/* Down Tube Inner Wall Hatch */}
          <path
            d={`M ${bbX + 6} ${bbY - 6} C ${bbX + 32} ${bbY - 16} ${headBottomX - 36} ${headBottomY + 20} ${headBottomX - 4} ${headBottomY - 4}`}
            fill="none"
            stroke="rgba(0, 240, 255, 0.4)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* Top Tube with Curved Aerofoil Arch */}
          <path
            d={`M ${seatTopX} ${seatTopY} Q ${(seatTopX + headTopX) / 2} ${seatTopY - 6} ${headTopX} ${headTopY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />

          {/* Seat Tube with FlatBack Aerofoil wrap */}
          <path
            d={`M ${bbX} ${bbY} C ${bbX - 8} ${bbY - 45} ${seatTopX - 4} ${seatTopY + 35} ${seatTopX} ${seatTopY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth="6.5"
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />

          {/* Head Tube with Aero Nose Contour */}
          <line
            x1={headTopX}
            y1={headTopY}
            x2={headBottomX}
            y2={headBottomY}
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Asymmetric Chainstay (BB to Rear Axle) */}
          <path
            d={`M ${bbX} ${bbY} C ${bbX - 35} ${bbY + 3} ${rearAxleX + 28} ${rearAxleY + 2} ${rearAxleX} ${rearAxleY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Dropped Aerodynamic Seatstays */}
          <path
            d={`M ${seatTopX} ${seatTopY + 14} C ${seatTopX - 25} ${seatTopY + 30} ${rearAxleX + 22} ${rearAxleY - 12} ${rearAxleX} ${rearAxleY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Signature Onda S-Wave Fork with ForkFlap Cowl */}
          <path
            d={`M ${headBottomX} ${headBottomY} C ${(headBottomX + frontAxleX) / 2 - 12} ${(headBottomY + frontAxleY) / 2 - 8} ${(headBottomX + frontAxleX) / 2 + 8} ${(headBottomY + frontAxleY) / 2 + 20} ${frontAxleX} ${frontAxleY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonMonocoqueGrad)'}
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />
          {/* ForkFlap Fairing Wing */}
          <path
            d={`M ${frontAxleX - 4} ${frontAxleY - 14} L ${frontAxleX + 12} ${frontAxleY - 2} L ${frontAxleX - 2} ${frontAxleY + 8} Z`}
            fill="#00F0FF"
            opacity="0.8"
          />

          {/* Seatpost Mast & 3D Printed Titanium Top Clamp */}
          <line
            x1={seatTopX}
            y1={seatTopY}
            x2={saddleX}
            y2={saddleY}
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* MOST Lynx Short-Fit Carbon Saddle */}
          <path
            d={`M ${saddleX - 30} ${saddleY - 5} Q ${saddleX} ${saddleY - 7} ${saddleX + 26} ${saddleY - 2} L ${saddleX + 22} ${saddleY + 3} Q ${saddleX} ${saddleY + 2} ${saddleX - 26} ${saddleY} Z`}
            fill="#00F0FF"
            opacity="0.95"
          />

          {/* MOST Talon Ultra Integrated Carbon Cockpit */}
          <line
            x1={headTopX}
            y1={headTopY}
            x2={stemEndX}
            y2={stemEndY}
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Out-front Computer Mount Bar */}
          <line
            x1={stemEndX}
            y1={stemEndY}
            x2={stemEndX + 16}
            y2={stemEndY - 3}
            stroke="#00F0FF"
            strokeWidth="2"
          />
          {/* 7° Sprint Flare Drops */}
          <path
            d={`M ${stemEndX} ${stemEndY} C ${stemEndX + 18} ${stemEndY - 3} ${stemEndX + 22} ${stemEndY + 20} ${stemEndX + 12} ${stemEndY + 26} L ${stemEndX - 8} ${stemEndY + 26}`}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Drivetrain: Hollowtech II 54/40T Chainrings & Dura-Ace Crank */}
          <circle cx={bbX} cy={bbY} r="22" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx={bbX} cy={bbY} r="10" fill="#050811" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx={bbX} cy={bbY} r="4.5" fill="#E4002B" />
          {/* 172.5mm Crank Arm */}
          <line
            x1={bbX}
            y1={bbY}
            x2={bbX + 20}
            y2={bbY + 32}
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx={bbX + 20} cy={bbY + 32} r="3" fill="#00F0FF" />

          {/* Shimano Dura-Ace Di2 Shadow Rear Derailleur & Pulleys */}
          <line x1={rearAxleX} y1={rearAxleY} x2={rearAxleX - 7} y2={rearAxleY + 20} stroke="#00F0FF" strokeWidth="2.2" />
          <circle cx={rearAxleX - 7} cy={rearAxleY + 20} r="3.5" fill="#E4002B" />
          <circle cx={rearAxleX - 2} cy={rearAxleY + 30} r="3.5" fill="#E4002B" />

          {/* --- LAYER 4: TICR™ CONDUIT ROUTING --- */}
          {activeLayer === 'ticr' && (
            <g className="animate-pulse">
              {/* Front Brake Hose */}
              <path
                d={`M ${stemEndX} ${stemEndY} Q ${headTopX} ${headTopY} ${headBottomX} ${headBottomY} L ${frontAxleX} ${frontAxleY - 12}`}
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Rear Brake & Di2 Wire */}
              <path
                d={`M ${stemEndX} ${stemEndY} L ${headTopX} ${headTopY} L ${headBottomX} ${headBottomY} L ${bbX} ${bbY} L ${rearAxleX} ${rearAxleY}`}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Di2 Battery Harness to Seatpost */}
              <line
                x1={bbX}
                y1={bbY}
                x2={seatTopX}
                y2={seatTopY}
                stroke="#D4FF00"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </g>
          )}

          {/* --- LAYER 5: CFD AERODYNAMIC STREAMLINES --- */}
          {activeLayer === 'aero' && (
            <g filter="url(#aeroGlow)">
              <path
                d={`M 60 ${headTopY - 16} C 240 ${headTopY - 16} ${headTopX - 35} ${headTopY - 8} ${headTopX + 25} ${headTopY - 12} C ${headTopX + 110} ${headTopY - 16} 780 ${headTopY - 25} 920 ${headTopY - 30}`}
                fill="none"
                stroke="url(#aeroStreamGrad1)"
                strokeWidth="2.5"
              />
              <path
                d={`M 60 ${headBottomY + 8} C 240 ${headBottomY + 12} ${bbX - 50} ${bbY - 8} ${bbX + 35} ${bbY - 16} C 620 ${bbY - 20} 780 ${bbY - 16} 920 ${bbY - 12}`}
                fill="none"
                stroke="url(#aeroStreamGrad1)"
                strokeWidth="2.5"
              />
              <path
                d={`M 60 ${(headBottomY + frontAxleY) / 2} C ${(headBottomX + frontAxleX) / 2} ${(headBottomY + frontAxleY) / 2} ${frontAxleX + 16} ${frontAxleY} 920 ${frontAxleY + 8}`}
                fill="none"
                stroke="url(#aeroStreamGrad2)"
                strokeWidth="2"
              />
            </g>
          )}

          {/* --- LAYER 6: PROFESSIONAL CAD WITNESS CALIPER DIMENSIONS --- */}
          {activeLayer === 'geometry' && (
            <g>
              {/* Stack & Reach Reference from BB Origin Datum */}
              <line
                x1={bbX}
                y1={bbY}
                x2={headTopX}
                y2={bbY}
                stroke="#00F0FF"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.6"
              />
              <line
                x1={headTopX}
                y1={bbY}
                x2={headTopX}
                y2={headTopY}
                stroke="#00F0FF"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.6"
              />

              {/* BB Datum Crosshair */}
              <circle cx={bbX} cy={bbY} r="7" fill="none" stroke="#00F0FF" strokeWidth="1" />
              <line x1={bbX - 10} y1={bbY} x2={bbX + 10} y2={bbY} stroke="#00F0FF" strokeWidth="1" />
              <line x1={bbX} y1={bbY - 10} x2={bbX} y2={bbY + 10} stroke="#00F0FF" strokeWidth="1" />
              <text x={bbX - 14} y={bbY + 18} fill="#00F0FF" fontSize="8" fontFamily="monospace" fontWeight="bold">
                ⊕ DATUM 0,0
              </text>

              {/* Reach Dimension Badge */}
              <rect
                x={(bbX + headTopX) / 2 - 46}
                y={bbY + 8}
                width="92"
                height="18"
                rx="4"
                fill="#050811"
                stroke="#00F0FF"
                strokeWidth="1"
              />
              <text
                x={(bbX + headTopX) / 2}
                y={bbY + 21}
                fill="#00F0FF"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                REACH: {geom.reach}mm
              </text>

              {/* Stack Dimension Badge */}
              <rect
                x={headTopX + 10}
                y={(bbY + headTopY) / 2 - 9}
                width="88"
                height="18"
                rx="4"
                fill="#050811"
                stroke="#00F0FF"
                strokeWidth="1"
              />
              <text
                x={headTopX + 54}
                y={(bbY + headTopY) / 2 + 4}
                fill="#00F0FF"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                STACK: {geom.stack}mm
              </text>

              {/* Top Tube Dimension Line & Badge */}
              <line
                x1={seatTopX}
                y1={seatTopY - 12}
                x2={headTopX}
                y2={headTopY - 12}
                stroke="#FF5E0E"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
              <rect
                x={(seatTopX + headTopX) / 2 - 50}
                y={(seatTopY + headTopY) / 2 - 24}
                width="100"
                height="18"
                rx="4"
                fill="#050811"
                stroke="#FF5E0E"
                strokeWidth="1"
              />
              <text
                x={(seatTopX + headTopX) / 2}
                y={(seatTopY + headTopY) / 2 - 11}
                fill="#FF5E0E"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                TOP TUBE: {geom.topTube}mm
              </text>

              {/* Seat Tube Dimension Line & Badge */}
              <rect
                x={seatTopX - 96}
                y={(bbY + seatTopY) / 2 - 9}
                width="92"
                height="18"
                rx="4"
                fill="#050811"
                stroke="#D4FF00"
                strokeWidth="1"
              />
              <text
                x={seatTopX - 50}
                y={(bbY + seatTopY) / 2 + 4}
                fill="#D4FF00"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                SEAT TUBE: {geom.seatTube}mm
              </text>

              {/* Head Angle Gauge Indicator */}
              <text
                x={headBottomX + 14}
                y={headBottomY - 8}
                fill="#FFFFFF"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                ∠ {geom.headAngle}
              </text>

              {/* Seat Angle Gauge Indicator */}
              <text
                x={bbX - 52}
                y={bbY - 20}
                fill="#FFFFFF"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                ∠ {geom.seatAngle}
              </text>

              {/* Chainstay Dimension Box */}
              <text
                x={(bbX + rearAxleX) / 2 - 38}
                y={rearAxleY - 10}
                fill="#FFFFFF"
                fontSize="9"
                fontFamily="monospace"
                opacity="0.9"
              >
                CS: {geom.chainstay}mm
              </text>

              {/* Fork Rake / Offset Callout */}
              <text
                x={frontAxleX + 8}
                y={frontAxleY + 16}
                fill="#00F0FF"
                fontSize="8.5"
                fontFamily="monospace"
              >
                RAKE: 47.0mm
              </text>
            </g>
          )}

          {/* --- LAYER 7: INTERACTIVE CAD HOTSPOT TELEMETRY NODES --- */}
          {HOTSPOTS.map((spot) => (
            <g
              key={spot.id}
              className="cursor-pointer group"
              onMouseEnter={() => {
                setHoveredHotspot(spot);
                sfx.playHover();
              }}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r="6.5"
                fill={hoveredHotspot?.id === spot.id ? '#E4002B' : '#00F0FF'}
                className="animate-pulse"
              />
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r="13"
                fill="none"
                stroke={hoveredHotspot?.id === spot.id ? '#E4002B' : 'rgba(0, 240, 255, 0.45)'}
                strokeWidth="1.5"
              />
            </g>
          ))}

          {/* --- LAYER 8: AUTHENTIC ISO TITLE BLOCK & DRAWING REGISTRY STAMP --- */}
          <g transform="translate(670, 440)">
            <rect
              x="0"
              y="0"
              width="280"
              height="115"
              fill="#060914"
              stroke="rgba(0, 240, 255, 0.4)"
              strokeWidth="1.2"
              rx="6"
            />
            {/* Header Division */}
            <line x1="0" y1="26" x2="280" y2="26" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
            <text x="12" y="18" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              CICLI PINARELLO S.P.A. — TREVISO
            </text>
            <text x="235" y="18" fill="#E4002B" fontSize="9" fontFamily="monospace" fontWeight="bold">
              REV-E
            </text>

            {/* Sub-rows */}
            <text x="12" y="42" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="monospace">
              TITLE: <tspan fill="#00F0FF" fontWeight="bold">DOGMA F RACING CHASSIS // SZ {geom.size}</tspan>
            </text>
            <text x="12" y="58" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="monospace">
              MATERIAL: <tspan fill="#FFFFFF">TORAYCA® M40X NANOALLOY (392 GPa)</tspan>
            </text>
            <text x="12" y="74" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="monospace">
              DRW NO: <tspan fill="#FFFFFF">DWG-DF26-SZ{geom.size} • SCALE 1:10</tspan>
            </text>
            <text x="12" y="90" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="monospace">
              TOLERANCE: <tspan fill="#FFFFFF">ALIGNMENT ±0.25mm / ANGLE ±0.05°</tspan>
            </text>
            <text x="12" y="106" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontFamily="monospace">
              APPROVED BY: <tspan fill="#E4002B" fontWeight="bold">FAUSTO PINARELLO // UCI WT</tspan>
            </text>
          </g>
        </svg>

        {/* Hotspot Floating Telemetry Card */}
        {hoveredHotspot && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs z-30 p-3.5 rounded-2xl bg-[#060914]/95 border border-cyan-500/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.35)] font-mono animate-fade-in pointer-events-none">
            <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold uppercase">
              <Crosshair className="w-3.5 h-3.5" />
              <span>{hoveredHotspot.name}</span>
            </div>
            <div className="text-[10px] text-zinc-200 font-semibold mt-1">
              {hoveredHotspot.spec}
            </div>
            <div className="text-[9.5px] text-zinc-400 mt-1 font-sans leading-relaxed">
              {hoveredHotspot.desc}
            </div>
          </div>
        )}
      </div>

      {/* --- BOTTOM TELEMETRY RIBBON --- */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#060a14]/95 border-t border-cyan-500/25 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center font-mono">
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">FRAME SIZE</div>
          <div className="text-xs font-bold text-[#E4002B]">{geom.size} cm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">STACK</div>
          <div className="text-xs font-bold text-white">{geom.stack} mm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">REACH</div>
          <div className="text-xs font-bold text-white">{geom.reach} mm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">TOP TUBE</div>
          <div className="text-xs font-bold text-cyan-300">{geom.topTube} mm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">HEAD ANGLE</div>
          <div className="text-xs font-bold text-white">{geom.headAngle}</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">SEAT ANGLE</div>
          <div className="text-xs font-bold text-white">{geom.seatAngle}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`relative w-full rounded-2xl bg-[#050811] border border-cyan-500/25 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] select-none ${className}`}
      >
        {renderBlueprintContent(false)}
      </div>

      {/* Fullscreen Blueprint CAD Inspection Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in select-none">
          <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-[#050811] border border-cyan-500/40 shadow-[0_0_80px_rgba(0,240,255,0.3)] overflow-hidden">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-3.5 right-4 z-50 p-2 rounded-xl bg-white/10 hover:bg-[#E4002B] text-white transition-colors"
              title="Close Fullscreen Inspection (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 overflow-hidden">
              {renderBlueprintContent(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
