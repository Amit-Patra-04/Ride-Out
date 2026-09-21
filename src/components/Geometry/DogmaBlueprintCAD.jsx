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
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const DogmaBlueprintCAD = ({ geom, className = '' }) => {
  const [activeLayer, setActiveLayer] = useState('geometry'); // 'geometry', 'aero', 'stress', 'ticr'
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Geometric parametric mapping
  // Real world dimensions mapped to SVG coordinate space
  const scale = 0.58;
  const originX = 300;
  const originY = 350;

  // BB Center (Datum 0,0)
  const bbX = originX;
  const bbY = originY;

  // Angles in radians
  const seatAngleRad = (parseFloat(geom.seatAngle) * Math.PI) / 180;
  const headAngleRad = (parseFloat(geom.headAngle) * Math.PI) / 180;

  // 1. Seat Tube Top (Seat Cluster)
  const seatTubeLength = geom.seatTube * scale * 0.92;
  const seatTopX = bbX - Math.cos(seatAngleRad) * seatTubeLength;
  const seatTopY = bbY - Math.sin(seatAngleRad) * seatTubeLength;

  // Seatpost Mast Extension
  const postExt = 68;
  const saddleX = seatTopX - Math.cos(seatAngleRad) * postExt;
  const saddleY = seatTopY - Math.sin(seatAngleRad) * postExt;

  // 2. Head Tube Top (Stack & Reach relative to BB)
  const reachPx = geom.reach * scale * 1.12;
  const stackPx = geom.stack * scale * 1.05;
  const headTopX = bbX + reachPx;
  const headTopY = bbY - stackPx;

  // Head Tube Bottom
  const headTubeLength = geom.headTube * scale * 0.95;
  const headBottomX = headTopX + Math.cos(headAngleRad) * headTubeLength;
  const headBottomY = headTopY + Math.sin(headAngleRad) * headTubeLength;

  // 3. Rear Axle (Chainstay from BB)
  const chainstayLength = geom.chainstay * scale * 0.92;
  const bbDropPx = geom.bbDrop * scale * 0.75;
  const rearAxleX = bbX - chainstayLength;
  const rearAxleY = bbY - bbDropPx;

  // 4. Front Axle (Fork from Headtube Bottom)
  const forkLength = 370 * scale * 0.92;
  const forkRake = 47 * scale;
  const frontAxleX = headBottomX + Math.cos(headAngleRad) * forkLength + forkRake;
  const frontAxleY = headBottomY + Math.sin(headAngleRad) * forkLength;

  // Wheel Radii (700c wheel)
  const wheelRadius = 145 * scale * 1.55;
  const rimOuterRadius = wheelRadius - 10;
  const rimInnerRadius = wheelRadius - 32;

  // Cockpit Stem & Handlebar
  const stemLength = 110 * scale * 0.85;
  const stemAngleRad = (82 * Math.PI) / 180;
  const stemEndX = headTopX + Math.cos(stemAngleRad) * stemLength;
  const stemEndY = headTopY - Math.sin(stemAngleRad) * stemLength;

  // Frame Hotspots data
  const HOTSPOTS = [
    {
      id: 'headtube',
      name: 'Aero Nose Headtube',
      cx: headTopX,
      cy: (headTopY + headBottomY) / 2,
      spec: `-8mm Width • Elliptical Steerer • 1.5" Lower`,
      desc: 'Reduces frontal surface area and laminar separation at high yaw angles.',
    },
    {
      id: 'fork',
      name: 'Onda Fork & ForkFlap™',
      cx: (headBottomX + frontAxleX) / 2,
      cy: (headBottomY + frontAxleY) / 2,
      spec: '47mm Rake • Caliper Cowl Fairing',
      desc: 'Wavy carbon blade suppresses disc caliper turbulence and absorbs high-frequency vibrations.',
    },
    {
      id: 'bb',
      name: 'Aero-Keel Bottom Bracket',
      cx: bbX,
      cy: bbY,
      spec: '3.5° Computational Rotation • Italian 70mm',
      desc: 'Hour Record CFD trickle-down technology reduces BB junction drag by 1.2%.',
    },
    {
      id: 'stays',
      name: 'Asymmetric Stays',
      cx: (bbX + rearAxleX) / 2,
      cy: (bbY + rearAxleY) / 2,
      spec: 'TorayCa M40X • Balanced Driveside Flex',
      desc: 'Asymmetric reinforcement counters chain tension under 1,500W sprint wattages.',
    },
    {
      id: 'seatpost',
      name: 'FlatBack Aero Mast',
      cx: seatTopX,
      cy: seatTopY - 20,
      spec: 'Truncated Profile • 3D Printed Ti-6Al-4V Clamp',
      desc: 'Complies with UCI 3:1 aspect ratio with integrated Di2 battery housing.',
    },
    {
      id: 'cockpit',
      name: 'MOST Talon Ultra Fast',
      cx: stemEndX,
      cy: stemEndY + 10,
      spec: 'TorayCa 1K Monocoque • 7° Sprint Flare',
      desc: '100% internal TiCR routing saves 5.0 Watts of aerodynamic drag.',
    },
  ];

  // Helper for sinusoidal wave rim paths
  const generateSinusoidalRim = (cx, cy, rOuter, rInner, waves = 24) => {
    let d = '';
    const step = (Math.PI * 2) / waves;
    for (let i = 0; i <= waves; i++) {
      const angle = i * step;
      const waveOffset = Math.sin(angle * 6) * 4;
      const r = rInner + waveOffset;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) d += `M ${x} ${y} `;
      else d += `L ${x} ${y} `;
    }
    d += 'Z';
    return d;
  };

  const rearSinusoidalRimPath = generateSinusoidalRim(rearAxleX, rearAxleY, rimOuterRadius, rimInnerRadius);
  const frontSinusoidalRimPath = generateSinusoidalRim(frontAxleX, frontAxleY, rimOuterRadius, rimInnerRadius);

  const renderBlueprintContent = (isModal = false) => (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Blueprint Cyan Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(0,240,255,0.14)_0%,transparent_75%)] pointer-events-none" />

      {/* Blueprint Header Technical Dossier */}
      <div className="relative z-10 px-4 sm:px-6 py-3 border-b border-cyan-500/25 bg-black/75 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span className="text-white font-bold tracking-wider uppercase">
            PINARELLO CAD ARCHIVE // FRAME SIZE {geom.size}
          </span>
          <span className="text-cyan-400/60 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline">SCALE 1:10 (PARAMETRIC VECTOR)</span>
        </div>

        {/* Blueprint Mode Layer Selector */}
        <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-cyan-500/30">
          <button
            onClick={() => {
              setActiveLayer('geometry');
              sfx.playClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1 ${
              activeLayer === 'geometry'
                ? 'bg-cyan-500 text-black shadow-[0_0_10px_#00F0FF]'
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
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1 ${
              activeLayer === 'aero'
                ? 'bg-red-500 text-white shadow-[0_0_10px_#E4002B]'
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
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1 ${
              activeLayer === 'stress'
                ? 'bg-yellow-400 text-black shadow-[0_0_10px_#D4FF00]'
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
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider transition-all flex items-center gap-1 ${
              activeLayer === 'ticr'
                ? 'bg-purple-500 text-white shadow-[0_0_10px_#A855F7]'
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
              className="ml-2 p-1 text-cyan-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Full Window CAD Inspection"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SVG Parametric Vector Blueprint Canvas */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <svg
          viewBox="0 0 740 440"
          className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-700 ease-out"
        >
          <defs>
            {/* Blueprint Glow Filters */}
            <filter id="cadGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="aeroGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="carbonTubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="feaStressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4FF00" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FF5E0E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E4002B" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="aeroStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* --- LAYER 1: ARCHITECTURAL DATUM MARKS & GROUND LINE --- */}
          <line
            x1="30"
            y1={rearAxleY + wheelRadius}
            x2="710"
            y2={rearAxleY + wheelRadius}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
          <text
            x="40"
            y={rearAxleY + wheelRadius + 14}
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontFamily="monospace"
          >
            DATUM 0.00 — GROUND CONTACT PLANE (700x28c)
          </text>

          {/* --- LAYER 2: PRINCETON PEAK 4550 SINUSOIDAL WHEELS & DISC ROTORS --- */}
          {/* Rear Wheel Outer Tire */}
          <circle
            cx={rearAxleX}
            cy={rearAxleY}
            r={wheelRadius}
            fill="none"
            stroke="rgba(0, 240, 255, 0.3)"
            strokeWidth="3"
            strokeDasharray="4 6"
          />
          {/* Rear Princeton CarbonWorks Sinusoidal Wave Rim */}
          <path
            d={rearSinusoidalRimPath}
            fill="rgba(0, 240, 255, 0.04)"
            stroke="#00F0FF"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Rear Disc Rotor (140mm) */}
          <circle
            cx={rearAxleX}
            cy={rearAxleY}
            r="28"
            fill="none"
            stroke="rgba(255, 94, 14, 0.6)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx={rearAxleX} cy={rearAxleY} r="5" fill="#00F0FF" />

          {/* Front Wheel Outer Tire */}
          <circle
            cx={frontAxleX}
            cy={frontAxleY}
            r={wheelRadius}
            fill="none"
            stroke="rgba(0, 240, 255, 0.3)"
            strokeWidth="3"
            strokeDasharray="4 6"
          />
          {/* Front Princeton CarbonWorks Sinusoidal Wave Rim */}
          <path
            d={frontSinusoidalRimPath}
            fill="rgba(0, 240, 255, 0.04)"
            stroke="#00F0FF"
            strokeWidth="1.5"
            opacity="0.8"
          />
          {/* Front Disc Rotor (160mm) */}
          <circle
            cx={frontAxleX}
            cy={frontAxleY}
            r="32"
            fill="none"
            stroke="rgba(255, 94, 14, 0.6)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx={frontAxleX} cy={frontAxleY} r="5" fill="#00F0FF" />

          {/* Bladed Spokes Silhouette */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
            const rad = (ang * Math.PI) / 180;
            return (
              <React.Fragment key={i}>
                <line
                  x1={rearAxleX}
                  y1={rearAxleY}
                  x2={rearAxleX + Math.cos(rad) * (wheelRadius - 16)}
                  y2={rearAxleY + Math.sin(rad) * (wheelRadius - 16)}
                  stroke="rgba(0, 240, 255, 0.2)"
                  strokeWidth="0.8"
                />
                <line
                  x1={frontAxleX}
                  y1={frontAxleY}
                  x2={frontAxleX + Math.cos(rad) * (wheelRadius - 16)}
                  y2={frontAxleY + Math.sin(rad) * (wheelRadius - 16)}
                  stroke="rgba(0, 240, 255, 0.2)"
                  strokeWidth="0.8"
                />
              </React.Fragment>
            );
          })}

          {/* --- LAYER 3: REAL DOGMA F MONOCOQUE FRAME SILHOUETTE --- */}
          {/* Down Tube with 3.5° Aero-Keel BB junction */}
          <path
            d={`M ${bbX} ${bbY} C ${bbX + 35} ${bbY - 15} ${headBottomX - 45} ${headBottomY + 30} ${headBottomX} ${headBottomY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth={activeLayer === 'stress' ? '9' : '7.5'}
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />

          {/* Top Tube with Curved Aerofoil Arch */}
          <path
            d={`M ${seatTopX} ${seatTopY} Q ${(seatTopX + headTopX) / 2} ${seatTopY - 8} ${headTopX} ${headTopY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth="6.5"
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />

          {/* Seat Tube (Aerofoil FlatBack Wrap) */}
          <path
            d={`M ${bbX} ${bbY} C ${bbX - 10} ${bbY - 50} ${seatTopX - 5} ${seatTopY + 40} ${seatTopX} ${seatTopY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />

          {/* Head Tube with Aero Nose Profile */}
          <line
            x1={headTopX}
            y1={headTopY}
            x2={headBottomX}
            y2={headBottomY}
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Asymmetric Chainstay (BB to Rear Axle) */}
          <path
            d={`M ${bbX} ${bbY} C ${bbX - 40} ${bbY + 4} ${rearAxleX + 30} ${rearAxleY + 2} ${rearAxleX} ${rearAxleY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Dropped Aerodynamic Seatstays */}
          <path
            d={`M ${seatTopX} ${seatTopY + 16} C ${seatTopX - 30} ${seatTopY + 35} ${rearAxleX + 25} ${rearAxleY - 15} ${rearAxleX} ${rearAxleY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Signature Onda Wavy Fork with ForkFlap Cowl */}
          <path
            d={`M ${headBottomX} ${headBottomY} C ${(headBottomX + frontAxleX) / 2 - 14} ${(headBottomY + frontAxleY) / 2 - 10} ${(headBottomX + frontAxleX) / 2 + 10} ${(headBottomY + frontAxleY) / 2 + 25} ${frontAxleX} ${frontAxleY}`}
            fill="none"
            stroke={activeLayer === 'stress' ? 'url(#feaStressGrad)' : 'url(#carbonTubeGrad)'}
            strokeWidth="6.5"
            strokeLinecap="round"
            filter="url(#cadGlow)"
          />
          {/* ForkFlap Fairing */}
          <path
            d={`M ${frontAxleX - 5} ${frontAxleY - 16} L ${frontAxleX + 14} ${frontAxleY - 2} L ${frontAxleX - 2} ${frontAxleY + 10} Z`}
            fill="#00F0FF"
            opacity="0.75"
          />

          {/* Seatpost Mast Extension & Titanium Clamp */}
          <line
            x1={seatTopX}
            y1={seatTopY}
            x2={saddleX}
            y2={saddleY}
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* MOST Lynx Saddle Silhouette */}
          <path
            d={`M ${saddleX - 34} ${saddleY - 6} Q ${saddleX} ${saddleY - 8} ${saddleX + 30} ${saddleY - 3} L ${saddleX + 26} ${saddleY + 3} Q ${saddleX} ${saddleY + 2} ${saddleX - 30} ${saddleY} Z`}
            fill="#00F0FF"
            opacity="0.9"
          />

          {/* MOST Talon Ultra Integrated Cockpit */}
          <line
            x1={headTopX}
            y1={headTopY}
            x2={stemEndX}
            y2={stemEndY}
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Out-front Computer Mount */}
          <line
            x1={stemEndX}
            y1={stemEndY}
            x2={stemEndX + 18}
            y2={stemEndY - 4}
            stroke="#00F0FF"
            strokeWidth="2"
          />
          {/* Drops Flare */}
          <path
            d={`M ${stemEndX} ${stemEndY} C ${stemEndX + 20} ${stemEndY - 4} ${stemEndX + 26} ${stemEndY + 22} ${stemEndX + 14} ${stemEndY + 30} L ${stemEndX - 10} ${stemEndY + 30}`}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Drivetrain: Hollowtech II 54/40T Chainrings & Dura-Ace Crank */}
          <circle cx={bbX} cy={bbY} r="24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx={bbX} cy={bbY} r="12" fill="#0b0e14" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx={bbX} cy={bbY} r="5" fill="#E4002B" />
          {/* Crank Arm */}
          <line
            x1={bbX}
            y1={bbY}
            x2={bbX + 22}
            y2={bbY + 36}
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx={bbX + 22} cy={bbY + 36} r="3" fill="#00F0FF" />

          {/* Di2 Rear Derailleur & Pulleys */}
          <line x1={rearAxleX} y1={rearAxleY} x2={rearAxleX - 8} y2={rearAxleY + 22} stroke="#00F0FF" strokeWidth="2.5" />
          <circle cx={rearAxleX - 8} cy={rearAxleY + 22} r="4" fill="#E4002B" />
          <circle cx={rearAxleX - 2} cy={rearAxleY + 34} r="4" fill="#E4002B" />

          {/* --- LAYER 4: TICR™ INTERNAL CONDUIT LINES --- */}
          {activeLayer === 'ticr' && (
            <g className="animate-pulse">
              {/* Front Brake Hose */}
              <path
                d={`M ${stemEndX} ${stemEndY} Q ${headTopX} ${headTopY} ${headBottomX} ${headBottomY} L ${frontAxleX} ${frontAxleY - 14}`}
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Rear Brake & Di2 Wiring */}
              <path
                d={`M ${stemEndX} ${stemEndY} L ${headTopX} ${headTopY} L ${headBottomX} ${headBottomY} L ${bbX} ${bbY} L ${rearAxleX} ${rearAxleY}`}
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Battery Conduit to Seatpost */}
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
                d={`M 80 ${headTopY - 20} C 250 ${headTopY - 20} ${headTopX - 40} ${headTopY - 10} ${headTopX + 30} ${headTopY - 15} C ${headTopX + 120} ${headTopY - 20} 600 ${headTopY - 30} 700 ${headTopY - 35}`}
                fill="none"
                stroke="url(#aeroStreamGrad)"
                strokeWidth="2.5"
              />
              <path
                d={`M 80 ${headBottomY + 10} C 250 ${headBottomY + 15} ${bbX - 60} ${bbY - 10} ${bbX + 40} ${bbY - 20} C 480 ${bbY - 25} 600 ${bbY - 20} 700 ${bbY - 15}`}
                fill="none"
                stroke="url(#aeroStreamGrad)"
                strokeWidth="2.5"
              />
              <path
                d={`M 80 ${(headBottomY + frontAxleY) / 2} C ${(headBottomX + frontAxleX) / 2} ${(headBottomY + frontAxleY) / 2} ${frontAxleX + 20} ${frontAxleY} 700 ${frontAxleY + 10}`}
                fill="none"
                stroke="url(#aeroStreamGrad)"
                strokeWidth="2"
              />
            </g>
          )}

          {/* --- LAYER 6: CALIPERS & DIMENSIONS --- */}
          {activeLayer === 'geometry' && (
            <g>
              {/* Stack & Reach Reference from BB */}
              <line
                x1={bbX}
                y1={bbY}
                x2={headTopX}
                y2={bbY}
                stroke="#00F0FF"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.6"
              />
              <line
                x1={headTopX}
                y1={bbY}
                x2={headTopX}
                y2={headTopY}
                stroke="#00F0FF"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              {/* Reach Badge */}
              <rect
                x={(bbX + headTopX) / 2 - 42}
                y={bbY + 10}
                width="84"
                height="18"
                rx="4"
                fill="#060a12"
                stroke="#00F0FF"
                strokeWidth="1"
              />
              <text
                x={(bbX + headTopX) / 2}
                y={bbY + 23}
                fill="#00F0FF"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                REACH: {geom.reach}mm
              </text>

              {/* Stack Badge */}
              <rect
                x={headTopX + 12}
                y={(bbY + headTopY) / 2 - 9}
                width="80"
                height="18"
                rx="4"
                fill="#060a12"
                stroke="#00F0FF"
                strokeWidth="1"
              />
              <text
                x={headTopX + 52}
                y={(bbY + headTopY) / 2 + 4}
                fill="#00F0FF"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                STACK: {geom.stack}mm
              </text>

              {/* Top Tube Dimension Line */}
              <line
                x1={seatTopX}
                y1={seatTopY - 14}
                x2={headTopX}
                y2={headTopY - 14}
                stroke="#FF5E0E"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <rect
                x={(seatTopX + headTopX) / 2 - 46}
                y={(seatTopY + headTopY) / 2 - 26}
                width="92"
                height="18"
                rx="4"
                fill="#060a12"
                stroke="#FF5E0E"
                strokeWidth="1"
              />
              <text
                x={(seatTopX + headTopX) / 2}
                y={(seatTopY + headTopY) / 2 - 13}
                fill="#FF5E0E"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                TOP TUBE: {geom.topTube}mm
              </text>

              {/* Seat Tube Dimension Line */}
              <rect
                x={seatTopX - 98}
                y={(bbY + seatTopY) / 2 - 10}
                width="88"
                height="18"
                rx="4"
                fill="#060a12"
                stroke="#D4FF00"
                strokeWidth="1"
              />
              <text
                x={seatTopX - 54}
                y={(bbY + seatTopY) / 2 + 3}
                fill="#D4FF00"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                SEAT TUBE: {geom.seatTube}mm
              </text>

              {/* Head Angle Gauge Arc */}
              <text
                x={headBottomX + 16}
                y={headBottomY - 10}
                fill="#FFFFFF"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                ∠ {geom.headAngle}
              </text>

              {/* Seat Angle Gauge Arc */}
              <text
                x={bbX - 48}
                y={bbY - 24}
                fill="#FFFFFF"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                ∠ {geom.seatAngle}
              </text>

              {/* Chainstay Dimension Box */}
              <text
                x={(bbX + rearAxleX) / 2 - 35}
                y={rearAxleY - 10}
                fill="#FFFFFF"
                fontSize="8.5"
                fontFamily="monospace"
                opacity="0.85"
              >
                CS: {geom.chainstay}mm
              </text>
            </g>
          )}

          {/* --- LAYER 7: INTERACTIVE HOTSPOTS --- */}
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
                r="7"
                fill={hoveredHotspot?.id === spot.id ? '#E4002B' : '#00F0FF'}
                className="animate-pulse"
              />
              <circle
                cx={spot.cx}
                cy={spot.cy}
                r="14"
                fill="none"
                stroke={hoveredHotspot?.id === spot.id ? '#E4002B' : 'rgba(0, 240, 255, 0.4)'}
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>

        {/* Hotspot Floating Tooltip */}
        {hoveredHotspot && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs z-30 p-3.5 rounded-2xl bg-black/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.3)] font-mono animate-fade-in pointer-events-none">
            <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold uppercase">
              <Crosshair className="w-3.5 h-3.5" />
              <span>{hoveredHotspot.name}</span>
            </div>
            <div className="text-[10px] text-zinc-300 font-semibold mt-1">
              {hoveredHotspot.spec}
            </div>
            <div className="text-[9.5px] text-zinc-400 mt-1 font-sans">
              {hoveredHotspot.desc}
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Live Geometry Telemetry Ribbon */}
      <div className="px-4 sm:px-6 py-3 bg-black/85 border-t border-cyan-500/20 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center font-mono">
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">FRAME SIZE</div>
          <div className="text-xs font-bold text-[#E4002B]">{geom.size} cm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">STACK</div>
          <div className="text-xs font-bold text-white">{geom.stack} mm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">REACH</div>
          <div className="text-xs font-bold text-white">{geom.reach} mm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">TOP TUBE</div>
          <div className="text-xs font-bold text-cyan-300">{geom.topTube} mm</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">HEAD ANGLE</div>
          <div className="text-xs font-bold text-white">{geom.headAngle}</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[8.5px] text-zinc-400 uppercase font-bold">SEAT ANGLE</div>
          <div className="text-xs font-bold text-white">{geom.seatAngle}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`relative w-full rounded-2xl bg-[#060a12] border border-cyan-500/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] select-none ${className}`}
      >
        {renderBlueprintContent(false)}
      </div>

      {/* Fullscreen Blueprint CAD Inspection Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in select-none">
          <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-[#060a12] border border-cyan-500/40 shadow-[0_0_80px_rgba(0,240,255,0.3)] overflow-hidden">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-3.5 right-4 z-50 p-2 rounded-xl bg-white/10 hover:bg-[#E4002B] text-white transition-colors"
              title="Close Fullscreen (Esc)"
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
