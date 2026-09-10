import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Wind,
  Layers,
  Compass,
  Zap,
  Activity,
  Maximize2,
  Minimize2,
  Sparkles,
  Check,
  ChevronRight,
  Info,
  Shield,
  Gauge,
  Eye,
  Sliders,
  Sun,
  Flame,
  Radio,
  SlidersHorizontal,
  Crosshair,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const COLORWAYS = [
  {
    id: 'ineos-replica',
    name: 'Team INEOS Grenadiers',
    edition: 'Official WorldTour Pro Livery',
    code: 'DF-WT-01',
    primaryColor: '#E4002B',
    secondaryColor: '#B91C1C',
    accentColor: '#FF5E0E',
    rearColor: '#07080A',
    decalColor: '#FFFFFF',
    gradient: 'from-[#E4002B] via-[#FF5E0E] to-[#0A0C10]',
    swatchGradient: 'linear-gradient(135deg, #E4002B 0%, #FF5E0E 45%, #0A0C10 100%)',
    badge: 'GRAND TOUR CHAMPION',
    bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
  },
  {
    id: 'luxter-red-gold',
    name: 'Luxter Red Gold',
    edition: 'Signature Metallic Crimson & Gold',
    code: 'DF-E120',
    primaryColor: '#9E0018',
    secondaryColor: '#780010',
    accentColor: '#D4AF37',
    rearColor: '#07080A',
    decalColor: '#FFFFFF',
    gradient: 'from-[#9E0018] via-[#D4AF37] to-[#07080A]',
    swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
    badge: 'WORLDTOUR FLAGSHIP',
    bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
  },
  {
    id: 'luxter-blue',
    name: 'Luxter Venice Blue',
    edition: 'MY26 Special Metallic Cobalt',
    code: 'DF-E122',
    primaryColor: '#0B3C95',
    secondaryColor: '#062663',
    accentColor: '#00D2FF',
    rearColor: '#06070A',
    decalColor: '#FFFFFF',
    gradient: 'from-[#0B3C95] via-[#00D2FF] to-[#06070A]',
    swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
    badge: 'MY26 SPECIAL EDITION',
    bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
  },
  {
    id: 'phantom-ice',
    name: 'Edge Crystal White',
    edition: 'Pearl Monocoque & Platinum Silver',
    code: 'DF-E121',
    primaryColor: '#FFFFFF',
    secondaryColor: '#F1F5F9',
    accentColor: '#94A3B8',
    rearColor: '#0F1218',
    decalColor: '#0F172A',
    gradient: 'from-[#FFFFFF] via-[#CBD5E1] to-[#0F1218]',
    swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
    badge: 'RAW TORAYCA MONOCOQUE',
    bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
  },
  {
    id: 'bob-stealth',
    name: 'Bob Black Stealth Matt',
    edition: 'Black on Black Raw TorayCa Carbon',
    code: 'DF-E123',
    primaryColor: '#27272A',
    secondaryColor: '#18181B',
    accentColor: '#52525B',
    rearColor: '#09090B',
    decalColor: '#71717A',
    gradient: 'from-[#3F3F46] via-[#18181B] to-[#050507]',
    swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
    badge: 'SATIN STEALTH FINISH',
    bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
  },
  {
    id: 'luxter-amber',
    name: 'Luxter Amber Gold',
    edition: 'Liquid Gold Metallic Gloss',
    code: 'DF-E125',
    primaryColor: '#B45309',
    secondaryColor: '#92400E',
    accentColor: '#FDE047',
    rearColor: '#0A0A0C',
    decalColor: '#FFFFFF',
    gradient: 'from-[#B45309] via-[#FDE047] to-[#0A0A0C]',
    swatchGradient: 'linear-gradient(135deg, #B45309 0%, #FDE047 50%, #0A0A0C 100%)',
    badge: 'LIQUID AMBER METALLIC',
    bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
  },
  {
    id: 'luxter-turquoise',
    name: 'Luxter Turquoise Spectrum',
    edition: 'High-Luminescence Spectrum',
    code: 'DF-E126',
    primaryColor: '#0E7490',
    secondaryColor: '#155E75',
    accentColor: '#38BDF8',
    rearColor: '#06070A',
    decalColor: '#FFFFFF',
    gradient: 'from-[#0E7490] via-[#38BDF8] to-[#06070A]',
    swatchGradient: 'linear-gradient(135deg, #0E7490 0%, #38BDF8 50%, #06070A 100%)',
    badge: 'SPECTRUM GLOSS',
    bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
  },
  {
    id: 'cobalt-phantom',
    name: 'Cobalt Phantom Pearl',
    edition: 'Stealth Deep Metallic Pearl',
    code: 'DF-E127',
    primaryColor: '#1E293B',
    secondaryColor: '#0F172A',
    accentColor: '#38BDF8',
    rearColor: '#030406',
    decalColor: '#F8FAFC',
    gradient: 'from-[#1E293B] via-[#38BDF8] to-[#030406]',
    swatchGradient: 'linear-gradient(135deg, #1E293B 0%, #38BDF8 50%, #030406 100%)',
    badge: 'STEALTH ATELIER',
    bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
  },
];

export const CAMERA_VIEWS = [
  { id: 'hero', label: '3/4 Hero Profile', pos: [0, 0, 1], scale: 1, angle: 0 },
  { id: 'onda', label: 'Onda Fork & Flap™', pos: [120, -40, 1.4], scale: 1.35, angle: -18 },
  { id: 'cockpit', label: 'MOST Talon Fast', pos: [80, 70, 1.45], scale: 1.4, angle: 12 },
  { id: 'keel', label: 'Aero-Keel 3.5° BB', pos: [-20, -50, 1.5], scale: 1.45, angle: 5 },
  { id: 'duraace', label: 'Dura-Ace Di2 12S', pos: [-120, -40, 1.4], scale: 1.4, angle: -15 },
  { id: 'rear', label: 'Asymmetric Stays', pos: [-160, 20, 1.3], scale: 1.3, angle: 22 },
];

export const HOTSPOTS = [
  {
    id: 'torayca',
    title: 'TorayCa® M40X Nanoalloy',
    x: 48,
    y: 44,
    desc: 'Ultra-high tensile carbon composite with Nanoalloy matrix. Delivers 392 GPa lateral stiffness and explosive sprint responsiveness with zero structural fatigue.',
    spec: '392 GPa Tensile | 865g Frame',
    badge: 'CARBON COMPOSITE',
  },
  {
    id: 'onda',
    title: 'Onda ForkFlap™ 47mm Rake',
    x: 74,
    y: 58,
    desc: 'Iconic wave profile with 47mm rake stabilizes high-speed alpine descents while integrated aero winglets shield the front disc caliper from lateral turbulence.',
    spec: '47mm Rake | 390g Carbon',
    badge: 'AERODYNAMICS',
  },
  {
    id: 'cockpit',
    title: 'MOST Talon Ultra Fast',
    x: 64,
    y: 28,
    desc: 'One-piece integrated cockpit featuring twisted lever hoods and 100% internal TiCR™ cable integration saving 5.2 Watts at 40 km/h.',
    spec: '315g | 7° Flare | TiCR™',
    badge: 'TOTAL INTEGRATION',
  },
  {
    id: 'keel',
    title: 'Aero-Keel 3.5° Rotated BB',
    x: 46,
    y: 68,
    desc: 'Trickle-down technology from Filippo Ganna’s Hour Record. Down tube rotated 3.5° to optimize bottom bracket airflow around elite hydration cages.',
    spec: '3.5° Pitch | 70mm Italian Thread',
    badge: 'HOUR RECORD TECH',
  },
  {
    id: 'drivetrain',
    title: 'Shimano Dura-Ace Di2 12S',
    x: 32,
    y: 69,
    desc: 'Semi-wireless 2x12 electronic transmission paired with dual-sided strain gauge power meter and 54-40T aerodynamic chainrings.',
    spec: '12-Speed Electronic | Dual Power',
    badge: 'WORLDTOUR DRIVETRAIN',
  },
];

export const EXPLODED_LAYERS = [
  {
    id: 'layer-1',
    name: 'LAYER 01: TORAYCA® M40X MONOCOQUE',
    subtitle: '392 GPa Ultra-High Tensile Carbon Outer Shell',
    desc: 'Continuous uni-directional carbon fiber filaments woven with Nanoalloy resin matrix for unparalleled torsional resistance and instantaneous torque transfer.',
    stat: '392 GPa Modulus • +12% Lateral Rigidity',
    tag: 'OUTER MONOCOQUE',
    color: '#00F0FF',
  },
  {
    id: 'layer-2',
    name: 'LAYER 02: TICR™ INTERNAL CHANNELS',
    subtitle: '100% Concealed Hydraulic & Di2 Routing',
    desc: 'Seamless carbon conduit tunnels through headtube, down tube, and chainstays, eliminating external cable drag and turbulent vortices.',
    stat: 'Zero Exposed Lines • -5.2W Drag Delta',
    tag: 'AERO ROUTING',
    color: '#FF5E0E',
  },
  {
    id: 'layer-3',
    name: 'LAYER 03: ASYMMETRIC STRUCTURAL CORE',
    subtitle: 'Counter-Torque Engineered Bottom Bracket & Stays',
    desc: 'Reinforced drive-side carbon layup that offsets unilateral chain drive deflection under 1,800+ watt bunch sprint loads.',
    stat: '100% Symmetrical Power Balance',
    tag: 'POWER SPINE',
    color: '#D4FF00',
  },
  {
    id: 'layer-4',
    name: 'LAYER 04: NANOALLOY VIBRATION MATRIX',
    subtitle: 'High-Frequency Road Damping Interlayer',
    desc: 'Micro-elastomeric resin particles distributed throughout the layup to disperse road chatter without compromising structural snap.',
    stat: '18% Vertical Compliance Boost',
    tag: 'ROAD ACOUSTICS',
    color: '#E4002B',
  },
];

export const STUDIO_LIGHTING_MODES = [
  {
    id: 'treviso',
    name: 'Treviso Atelier Dark',
    desc: 'Moody obsidian stage with crimson gold highlights',
    keyLight: '#FFFFFF',
    ambient: '#E4002B',
    underglow: '#FF5E0E',
  },
  {
    id: 'windtunnel',
    name: 'Wind Tunnel Cyan',
    desc: 'High-velocity aerodynamic CFD illumination',
    keyLight: '#E0F7FA',
    ambient: '#00F0FF',
    underglow: '#00D2FF',
  },
  {
    id: 'gold',
    name: 'Red Gold Grand Tour',
    desc: 'Championship celebration spotlights',
    keyLight: '#FFF8E1',
    ambient: '#D4AF37',
    underglow: '#9E0018',
  },
  {
    id: 'cleanroom',
    name: 'Cleanroom Studio High-Key',
    desc: 'Pristine laboratory high-contrast specular lighting',
    keyLight: '#FFFFFF',
    ambient: '#94A3B8',
    underglow: '#FFFFFF',
  },
];

export const DogmaBike3D = ({
  activeColorway = COLORWAYS[0],
  onColorChange,
  className = '',
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(activeColorway);
  const [activeTab, setActiveTab] = useState('360'); // '360' | 'windtunnel' | 'xray' | 'telemetry'
  const [activeCameraView, setActiveCameraView] = useState('hero');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [yawAngle, setYawAngle] = useState(15);
  const [pitchAngle, setPitchAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeLighting, setActiveLighting] = useState(STUDIO_LIGHTING_MODES[0]);
  const [selectedExplodedLayer, setSelectedExplodedLayer] = useState(0);
  const [aeroYawSlider, setAeroYawSlider] = useState(0);
  const [isHeatmapOn, setIsHeatmapOn] = useState(false);
  const [fps, setFps] = useState(60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mouseStagePos, setMouseStagePos] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Sync external colorway
  useEffect(() => {
    if (activeColorway && activeColorway.id !== selectedColor.id) {
      setSelectedColor(activeColorway);
    }
  }, [activeColorway]);

  // Three.js Particle Wind Tunnel Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 85;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 1000;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: Math.random() * 45 + 20,
        speed: Math.random() * 6 + 4,
        opacity: Math.random() * 0.6 + 0.2,
        curve: (Math.random() - 0.5) * 2,
        color: i % 3 === 0 ? '#00F0FF' : i % 5 === 0 ? '#FF5E0E' : '#FFFFFF',
      });
    }

    let lastTime = performance.now();
    let frames = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeTab === 'windtunnel' || isHoveringStage) {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = activeTab === 'windtunnel' ? p.opacity : p.opacity * 0.35;
          ctx.lineWidth = 1.4;

          const yawShift = (aeroYawSlider / 20) * 8;
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(
            p.x - p.len * 0.5,
            p.y + p.curve + yawShift,
            p.x - p.len,
            p.y + p.curve * 2 + yawShift * 1.5
          );
          ctx.stroke();

          p.x += p.speed + (activeTab === 'windtunnel' ? 4 : 1);
          if (p.x > canvas.width + p.len) {
            p.x = -p.len;
            p.y = Math.random() * canvas.height;
          }
        });
      }

      // Auto rotation in 360 mode
      if (isSpinning && activeTab === '360') {
        setYawAngle((prev) => (prev + 0.4) % 360);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [activeTab, aeroYawSlider, isSpinning, isHoveringStage]);

  // Handle Drag Orbit
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouseStagePos({ x: normX, y: normY });
    }

    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setYawAngle((prev) => (prev + deltaX * 0.55 + 360) % 360);
    setPitchAngle((prev) => Math.max(-16, Math.min(16, prev - deltaY * 0.25)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    setYawAngle((prev) => (prev + deltaX * 0.55 + 360) % 360);
    setPitchAngle((prev) => Math.max(-16, Math.min(16, prev - deltaY * 0.25)));
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoomLevel((prev) => Math.max(0.8, Math.min(1.8, prev + delta)));
  };

  const handleSelectColorway = (c) => {
    setSelectedColor(c);
    if (onColorChange) onColorChange(c);
    sfx.playClick();
  };

  const setCameraPreset = (camId) => {
    const cam = CAMERA_VIEWS.find((v) => v.id === camId);
    if (!cam) return;
    setActiveCameraView(camId);
    setYawAngle(cam.angle);
    setPitchAngle(0);
    setZoomLevel(cam.scale);
    sfx.playHover();
  };

  const resetStage = () => {
    setActiveCameraView('hero');
    setYawAngle(15);
    setPitchAngle(0);
    setZoomLevel(1);
    setIsSpinning(false);
    sfx.playClick();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
    sfx.playClick();
  };

  // Calculated Aerodynamic Delta based on yaw slider
  const dynamicCdA = useMemo(() => {
    const base = 0.218;
    const yawPenalty = Math.abs(aeroYawSlider) * 0.0018;
    return (base + yawPenalty).toFixed(3);
  }, [aeroYawSlider]);

  const dynamicWattSaved = useMemo(() => {
    const base = 3.2;
    const yawBonus = (20 - Math.abs(aeroYawSlider)) * 0.12;
    return (base + yawBonus).toFixed(1);
  }, [aeroYawSlider]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHoveringStage(true)}
      onMouseLeave={() => {
        setIsHoveringStage(false);
        setIsDragging(false);
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className={`relative w-full select-none overflow-hidden rounded-3xl border border-white/[0.14] bg-gradient-to-b from-[#0e111a]/98 via-[#07090f]/98 to-[#030406] shadow-[0_35px_90px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-3xl min-h-[640px] sm:min-h-[720px] lg:min-h-[800px] flex flex-col justify-between ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen min-h-screen' : ''
      } ${className}`}
    >
      {/* --- LAYER 1: ATMOSPHERIC STUDIO LIGHTING & SPECULAR SHINE --- */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-30 transition-all duration-1000 ease-out"
        style={{ backgroundColor: activeLighting.ambient }}
      />
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[160px] pointer-events-none opacity-25 transition-all duration-1000 ease-out"
        style={{ backgroundColor: selectedColor.accentColor || activeLighting.underglow }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Engineering Precision Grid Background */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_90%)]" />

      {/* --- LAYER 2: CFD AERODYNAMIC WIND STREAMLINES CANVAS --- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* --- LAYER 3: TOP STUDIO DECK & LUXURY HUD HEADER --- */}
      <div className="relative z-20 p-5 sm:p-7 flex flex-wrap items-start justify-between gap-4">
        {/* Left: Atelier Treviso Live Badge */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-xl shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-300 uppercase font-semibold">
              ATELIER TREVISO • VIRTUAL STAGE
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-[10px] text-[#00F0FF]">{fps} FPS</span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-[10px] text-[#FF5E0E]">{yawAngle}° ORBIT</span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div>
              <div className="font-display text-sm sm:text-base font-black text-white uppercase tracking-wider">
                {selectedColor.name}
              </div>
              <div className="font-mono text-[10px] text-[#FF5E0E] uppercase font-bold flex items-center gap-2">
                <span>{selectedColor.edition}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{selectedColor.code}</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-[#00F0FF] uppercase tracking-wider hidden sm:inline">
              {selectedColor.badge}
            </span>
          </div>
        </div>

        {/* Center/Right: 4 Masterwork Studio Inspection Modes */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <button
              onClick={() => {
                setActiveTab('360');
                sfx.playClick();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === '360'
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>360° ATELIER</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('windtunnel');
                sfx.playClick();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'windtunnel'
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_20px_rgba(0,240,255,0.5)] scale-105'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>CFD WIND TUNNEL</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('xray');
                sfx.playClick();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'xray'
                  ? 'bg-[#FF5E0E] text-black shadow-[0_0_20px_rgba(255,94,14,0.5)] scale-105'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>TORAYCA® R&D</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('telemetry');
                sfx.playClick();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'telemetry'
                  ? 'bg-[#D4FF00] text-black shadow-[0_0_20px_rgba(212,255,0,0.5)] scale-105'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>TELEMETRY HUD</span>
            </button>
          </div>

          {/* Quick Studio Toggles */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl">
            {/* Auto-Spin Toggle */}
            <button
              onClick={() => {
                setIsSpinning(!isSpinning);
                sfx.playHover();
              }}
              className={`p-2 rounded-full transition-all ${
                isSpinning
                  ? 'bg-[#D4FF00]/20 text-[#D4FF00] shadow-[0_0_12px_rgba(212,255,0,0.35)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Toggle Auto 360° Turntable"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin-slow' : ''}`} />
            </button>

            {/* Reset Camera Stage */}
            <button
              onClick={resetStage}
              className="p-2 rounded-full text-zinc-400 hover:text-white transition-all hover:scale-110"
              title="Reset Stage to 3/4 Hero"
            >
              <Compass className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen Stage */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full text-zinc-400 hover:text-white transition-all hover:scale-110"
              title="Toggle Fullscreen Virtual Atelier"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- LAYER 4: CENTER INTERACTIVE 3D VIRTUAL SHOWCASE STAGE --- */}
      <div className="relative flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[440px] px-4 my-2">
        {/* Dynamic Studio Turntable Platform Base */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[540px] sm:w-[680px] lg:w-[780px] h-[160px] rounded-[100%] border border-white/15 pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: `translateX(-50%) rotateX(72deg) rotateZ(${yawAngle}deg) scale(${zoomLevel})`,
            boxShadow: `0 0 60px ${selectedColor.accentColor}33, inset 0 0 35px rgba(255,255,255,0.08)`,
          }}
        >
          {/* Inner Concentric Laser Rings */}
          <div className="absolute inset-4 rounded-[100%] border border-[#00F0FF]/30 border-dashed" />
          <div className="absolute inset-10 rounded-[100%] border border-white/10" />

          {/* Turntable Degree Ticks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-full h-0.5 bg-transparent origin-center flex justify-between px-2"
              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
            </div>
          ))}
        </div>

        {/* Ground Occlusion Shadow */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[480px] sm:w-[620px] h-[45px] bg-black/85 rounded-full blur-xl pointer-events-none transition-all duration-500"
          style={{ transform: `translateX(-50%) scale(${zoomLevel * 0.95})` }}
        />

        {/* --- PHOTOREALISTIC HIGH-RESOLUTION PINARELLO DOGMA F CHASSIS --- */}
        <div
          className="relative z-10 w-full max-w-3xl sm:max-w-4xl flex items-center justify-center transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `perspective(1200px) rotateY(${
              (yawAngle - 15) * 0.35 + mouseStagePos.x * 6
            }deg) rotateX(${pitchAngle - mouseStagePos.y * 5}deg) scale(${zoomLevel})`,
          }}
        >
          {/* Authentic High-Definition Bike Model Image */}
          <div className="relative group">
            <img
              src={selectedColor.bikeImage}
              alt={`Pinarello Dogma F - ${selectedColor.name}`}
              className={`w-full max-h-[380px] sm:max-h-[460px] lg:max-h-[500px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)] transition-all duration-500 select-none pointer-events-none ${
                activeTab === 'xray'
                  ? 'filter invert brightness-150 contrast-125 hue-rotate-180 opacity-75'
                  : ''
              } ${isHeatmapOn ? 'filter saturate-200 hue-rotate-90' : ''}`}
            />

            {/* Dynamic Specular Lighting Glint Reflection overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
              style={{
                transform: `translateX(${mouseStagePos.x * 30}px) translateY(${
                  mouseStagePos.y * 20
                }px)`,
              }}
            />
          </div>

          {/* --- INTERACTIVE 3D SPATIAL HOTSPOTS (MODE: 360 & TELEMETRY) --- */}
          {(activeTab === '360' || activeTab === 'telemetry') &&
            HOTSPOTS.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  className="absolute z-30 pointer-events-auto transition-transform duration-200"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative group">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(isActive ? null : spot);
                        sfx.playClick();
                      }}
                      onMouseEnter={() => sfx.playHover()}
                      className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'bg-[#00F0FF] text-black border-white scale-125 shadow-[0_0_25px_#00F0FF]'
                          : 'bg-black/80 text-white border-white/35 hover:border-white hover:scale-115 hover:bg-black/95 shadow-xl'
                      }`}
                      title={spot.title}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-35" />
                      <span className="font-mono text-xs font-black">+</span>
                    </button>

                    {/* Interactive Engineering Spec Popover */}
                    {isActive && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full w-64 sm:w-80 p-4 rounded-2xl bg-[#0b0e14]/95 border border-[#00F0FF]/40 text-white backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in zoom-in-95 duration-200"
                      >
                        <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
                          <span className="font-mono text-[9px] text-[#00F0FF] font-bold tracking-widest uppercase">
                            {spot.badge}
                          </span>
                          <span className="font-mono text-[9.5px] text-zinc-400 font-semibold">
                            {spot.spec}
                          </span>
                        </div>
                        <div className="font-display text-sm font-black uppercase tracking-tight text-white mb-1">
                          {spot.title}
                        </div>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                          {spot.desc}
                        </p>
                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono text-[9px] text-zinc-500">
                            TREVISO R&D LABS
                          </span>
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="text-[10px] font-mono text-zinc-400 hover:text-white font-bold"
                          >
                            CLOSE [✕]
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {/* --- OVERLAY MODE: CFD WIND TUNNEL CONTROLS & TELEMETRY --- */}
        {activeTab === 'windtunnel' && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-72 sm:w-80 p-4 rounded-2xl bg-black/85 border border-[#00F0FF]/30 backdrop-blur-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs font-bold uppercase">
                <Wind className="w-4 h-4" />
                <span>CFD Aero Dynamics</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">40 KM/H AIRFLOW</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[9px] font-mono text-zinc-400 uppercase">DRAG COEFFICIENT</div>
                <div className="font-display text-xl font-black text-white mt-0.5">
                  {dynamicCdA} <span className="text-xs font-mono text-[#00F0FF]">CdA</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[9px] font-mono text-zinc-400 uppercase">WATT SAVINGS</div>
                <div className="font-display text-xl font-black text-[#D4FF00] mt-0.5">
                  -{dynamicWattSaved} <span className="text-xs font-mono">W</span>
                </div>
              </div>
            </div>

            {/* Yaw Angle Interactive Slider */}
            <div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-300 mb-1">
                <span>WIND YAW ANGLE</span>
                <span className="text-[#00F0FF] font-bold">{aeroYawSlider}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                step="1"
                value={aeroYawSlider}
                onChange={(e) => {
                  setAeroYawSlider(Number(e.target.value));
                  sfx.playHover();
                }}
                className="w-full accent-[#00F0FF] cursor-pointer"
              />
              <div className="flex justify-between text-[8.5px] font-mono text-zinc-500 mt-1">
                <span>-20° PORT</span>
                <span>0° HEADWIND</span>
                <span>+20° STARBOARD</span>
              </div>
            </div>

            {/* Pressure Heatmap Toggle */}
            <button
              onClick={() => {
                setIsHeatmapOn(!isHeatmapOn);
                sfx.playClick();
              }}
              className={`w-full py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                isHeatmapOn
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_#00F0FF]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isHeatmapOn ? 'PRESSURE SPECTRUM: ACTIVE' : 'TOGGLE AERO HEATMAP'}</span>
            </button>
          </div>
        )}

        {/* --- OVERLAY MODE: TORAYCA® M40X EXPLODED R&D MATRIX --- */}
        {activeTab === 'xray' && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 w-80 sm:w-96 p-4 rounded-2xl bg-black/90 border border-[#FF5E0E]/40 backdrop-blur-2xl shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#FF5E0E] font-mono text-xs font-bold uppercase">
                <Layers className="w-4 h-4" />
                <span>TorayCa® Anatomical X-Ray</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">LAYER 0{selectedExplodedLayer + 1}/04</span>
            </div>

            {/* Layer Selection Chips */}
            <div className="grid grid-cols-2 gap-1.5">
              {EXPLODED_LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setSelectedExplodedLayer(idx);
                    sfx.playClick();
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold text-left transition-all ${
                    selectedExplodedLayer === idx
                      ? 'bg-[#FF5E0E] text-black shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {layer.tag}
                </button>
              ))}
            </div>

            {/* Active Layer Deep Dive Card */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <div className="font-display text-xs font-black uppercase text-white tracking-wider">
                {EXPLODED_LAYERS[selectedExplodedLayer].name}
              </div>
              <div className="font-mono text-[10px] text-[#FF5E0E] font-semibold">
                {EXPLODED_LAYERS[selectedExplodedLayer].subtitle}
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                {EXPLODED_LAYERS[selectedExplodedLayer].desc}
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-[#D4FF00] font-bold">
                {EXPLODED_LAYERS[selectedExplodedLayer].stat}
              </div>
            </div>
          </div>
        )}

        {/* --- OVERLAY MODE: PRO-TOUR TELEMETRY HUD GAUGES --- */}
        {activeTab === 'telemetry' && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-72 sm:w-80 p-4 rounded-2xl bg-black/85 border border-[#D4FF00]/30 backdrop-blur-2xl shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#D4FF00] font-mono text-xs font-bold uppercase">
                <Gauge className="w-4 h-4" />
                <span>Chassis Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-[#00F0FF] animate-pulse">LIVE SENSORS</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                  <span>POWER TRANSFER EFFICIENCY</span>
                  <span className="text-white font-bold">99.4%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#D4FF00] w-[99.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                  <span>LATERAL CHASSIS STIFFNESS</span>
                  <span className="text-[#D4FF00] font-bold">392 GPa</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#D4FF00] w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                  <span>WEIGHT DISTRIBUTION (F/R)</span>
                  <span className="text-[#00F0FF] font-bold">48% : 52%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-[#00F0FF] w-[48%]" />
                  <div className="h-full bg-[#FF5E0E] w-[52%]" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>WEIGHT: 865g FRAME</span>
              <span className="text-white font-bold">TOTAL: 6.77 KG</span>
            </div>
          </div>
        )}
      </div>

      {/* --- LAYER 5: BOTTOM LUXURY CONTROL DOCK & SWATCH DECK --- */}
      <div className="relative z-20 p-5 sm:p-7 pt-2 flex flex-col items-center gap-4">
        {/* Camera Focal View Presets */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-x-auto max-w-full">
          {CAMERA_VIEWS.map((cam) => (
            <button
              key={cam.id}
              onClick={() => setCameraPreset(cam.id)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider transition-all duration-300 shrink-0 ${
                activeCameraView === cam.id
                  ? 'bg-white text-black font-bold shadow-md scale-105'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>

        {/* Swatches & Studio Atmosphere Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-5xl px-2">
          {/* Studio Lighting Mood Switcher */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 hidden lg:inline">
              ATMOSPHERE:
            </span>
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/60 border border-white/10">
              {STUDIO_LIGHTING_MODES.map((light) => (
                <button
                  key={light.id}
                  onClick={() => {
                    setActiveLighting(light);
                    sfx.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-full text-[9.5px] font-mono transition-all ${
                    activeLighting.id === light.id
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  title={light.desc}
                >
                  {light.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Colorway Swatches */}
          <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-2xl shadow-xl overflow-x-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 hidden sm:inline px-2">
              FINISH:
            </span>
            {COLORWAYS.map((c) => {
              const isSelected = selectedColor.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectColorway(c)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`relative group flex items-center justify-center p-0.5 rounded-full transition-all duration-300 shrink-0 ${
                    isSelected
                      ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                      : 'opacity-65 hover:opacity-100 hover:scale-110'
                  }`}
                  title={`${c.name} — ${c.edition}`}
                >
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/30 shadow-inner"
                    style={{
                      background:
                        c.swatchGradient ||
                        `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 50%, ${c.rearColor} 100%)`,
                    }}
                  />
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00F0FF] rounded-full border-2 border-black" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Stage Controls & Guidance */}
          <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-3">
            <span>DRAG 360° ORBIT</span>
            <span>•</span>
            <span>SCROLL ZOOM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
