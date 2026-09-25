import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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
    code: 'DF-E124',
    primaryColor: '#9f8d5e',
    secondaryColor: '#989c98',
    accentColor: '#9f8d5e',
    rearColor: '#2d2c2d',
    decalColor: '#FFFFFF',
    gradient: 'from-[#9f8d5e] via-[#989c98] to-[#2d2c2d]',
    swatchGradient: 'linear-gradient(135deg, #9f8d5e 0%, #989c98 50%, #2d2c2d 100%)',
    swatchImg: null,
    badge: 'GRAND TOUR CHAMPION',
    bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
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
    swatchImg: 'https://pinarello.com/storage/Variant/d77b58f160312ec04b79445406ad6f35.png',
    badge: 'WORLDTOUR FLAGSHIP',
    bikeImage: 'https://pinarello.com/storage/Variant/9cb3b45127f236db100f6e774fee1655.png',
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
    swatchImg: 'https://pinarello.com/storage/Variant/9306bb0fc95a5d62a656d7ff96d8d944.png',
    badge: 'MY26 SPECIAL EDITION',
    bikeImage: 'https://pinarello.com/storage/Variant/13276f1037ade22fed59c48b651dce60.png',
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
    swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #0F1218 100%)',
    swatchImg: 'https://pinarello.com/storage/Variant/c5cd77a628a14f18680ca72f652a5da0.png',
    badge: 'RAW TORAYCA MONOCOQUE',
    bikeImage: 'https://pinarello.com/storage/Variant/9f976ca9146169c56fc5a16d5e880941.png',
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
    swatchImg: 'https://pinarello.com/storage/Variant/17db459feed7d8f6df8ed77e9ae51fde.png',
    badge: 'SATIN STEALTH FINISH',
    bikeImage: 'https://pinarello.com/storage/Variant/5f50df702e278da3f5a1bd91f81f7bdb.png',
  },
  {
    id: 'luxter-turquoise',
    name: 'Luxter Turquoise',
    edition: 'MY26 Special Metallic Cyan & Deep Teal',
    code: 'DF-E129',
    primaryColor: '#00A896',
    secondaryColor: '#028090',
    accentColor: '#00F0FF',
    rearColor: '#051923',
    decalColor: '#FFFFFF',
    gradient: 'from-[#00A896] via-[#00F0FF] to-[#051923]',
    swatchGradient: 'linear-gradient(135deg, #00A896 0%, #00F0FF 50%, #051923 100%)',
    swatchImg: null,
    badge: 'MY26 AERODYNAMIC METALLIC',
    bikeImage: 'https://pinarello.com/storage/Variant/e5063f1f8b57062e2c58d2bde7e61a4d.png',
  },
  {
    id: 'molten-sand',
    name: 'Molten Sand',
    edition: 'Signature Liquid Bronze & Desert Amber',
    code: 'DF-E126',
    primaryColor: '#C5832B',
    secondaryColor: '#92400E',
    accentColor: '#F59E0B',
    rearColor: '#1C1917',
    decalColor: '#FFFFFF',
    gradient: 'from-[#C5832B] via-[#F59E0B] to-[#1C1917]',
    swatchGradient: 'linear-gradient(135deg, #C5832B 0%, #F59E0B 50%, #1C1917 100%)',
    swatchImg: null,
    badge: 'LIQUID BRONZE RACING',
    bikeImage: 'https://pinarello.com/storage/Variant/91ffed894ed26265eacc590f1c413189.png',
  },
];

export const CAMERA_VIEWS = [
  { id: 'hero', label: '3/4 Hero Profile', shortLabel: '3/4 Hero', yaw: 18, pitch: 3, zoom: 1.02, focusX: 50, focusY: 50 },
  { id: 'side', label: 'True Side View', shortLabel: 'Side', yaw: 0, pitch: 0, zoom: 1.0, focusX: 50, focusY: 50 },
  { id: 'onda', label: 'Onda Fork & Flap™', shortLabel: 'Onda', yaw: 24, pitch: -3, zoom: 1.6, focusX: 72, focusY: 62 },
  { id: 'cockpit', label: 'MOST Talon Fast', shortLabel: 'Cockpit', yaw: 22, pitch: 8, zoom: 1.7, focusX: 65, focusY: 30 },
  { id: 'keel', label: 'Aero-Keel 3.5° BB', shortLabel: 'Keel BB', yaw: 12, pitch: -6, zoom: 1.65, focusX: 47, focusY: 64 },
  { id: 'duraace', label: 'Dura-Ace Di2 12S', shortLabel: 'Di2', yaw: 6, pitch: -4, zoom: 1.6, focusX: 43, focusY: 66 },
  { id: 'rear', label: 'Asymmetric Stays', shortLabel: 'Stays', yaw: -22, pitch: 5, zoom: 1.5, focusX: 28, focusY: 52 },
];

export const HOTSPOTS = [
  {
    id: 'torayca',
    title: 'TorayCa® M40X Nanoalloy',
    posX: 50,
    posY: 46,
    desc: 'Ultra-high tensile carbon composite with Nanoalloy matrix. Delivers 392 GPa lateral stiffness and explosive sprint responsiveness with zero structural fatigue.',
    spec: '392 GPa Tensile | 865g Frame',
    badge: 'CARBON COMPOSITE',
  },
  {
    id: 'onda',
    title: 'Onda ForkFlap™ 47mm Rake',
    posX: 73,
    posY: 62,
    desc: 'Iconic wave profile with 47mm rake stabilizes high-speed alpine descents while integrated aero winglets shield the front disc caliper from lateral turbulence.',
    spec: '47mm Rake | 390g Carbon',
    badge: 'AERODYNAMICS',
  },
  {
    id: 'cockpit',
    title: 'MOST Talon Ultra Fast',
    posX: 65,
    posY: 28,
    desc: 'One-piece integrated cockpit featuring twisted lever hoods and 100% internal TiCR™ cable integration saving 5.2 Watts at 40 km/h.',
    spec: '315g | 7° Flare | TiCR™',
    badge: 'TOTAL INTEGRATION',
  },
  {
    id: 'keel',
    title: 'Aero-Keel 3.5° Rotated BB',
    posX: 47,
    posY: 65,
    desc: 'Trickle-down technology from Filippo Ganna’s Hour Record. Down tube rotated 3.5° to optimize bottom bracket airflow around elite hydration cages.',
    spec: '3.5° Pitch | 70mm Italian Thread',
    badge: 'HOUR RECORD TECH',
  },
  {
    id: 'drivetrain',
    title: 'Shimano Dura-Ace Di2 12S',
    posX: 43,
    posY: 67,
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
  const bikeStageRef = useRef(null);
  const shadowRef = useRef(null);
  const glowRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const hotspotRefs = useRef({});

  const [selectedColor, setSelectedColor] = useState(activeColorway);
  const [activeTab, setActiveTab] = useState('360'); // '360' | 'windtunnel' | 'xray' | 'telemetry'
  const [activeCameraView, setActiveCameraView] = useState('hero');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeLighting, setActiveLighting] = useState(STUDIO_LIGHTING_MODES[0]);
  const [selectedExplodedLayer, setSelectedExplodedLayer] = useState(0);
  const [aeroYawSlider, setAeroYawSlider] = useState(0);
  const [isHeatmapOn, setIsHeatmapOn] = useState(false);
  const [fps, setFps] = useState(60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  // Physics & Camera State for Butter-Smooth 60-120FPS GPU Animation
  const stateRef = useRef({
    currentYaw: 18,
    targetYaw: 18,
    currentPitch: 3,
    targetPitch: 3,
    currentZoom: 1.02,
    targetZoom: 1.02,
    currentFocusX: 50,
    targetFocusX: 50,
    currentFocusY: 50,
    targetFocusY: 50,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    lastDragTime: 0,
    velocity: 0,
  });

  // Sync external colorway
  useEffect(() => {
    if (activeColorway && activeColorway.id !== selectedColor.id) {
      setSelectedColor(activeColorway);
    }
  }, [activeColorway]);

  // --- HARDWARE ACCELERATED DIRECT GPU RENDER LOOP ---
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    let frameCount = 0;

    const loop = (now) => {
      animationFrameId = requestAnimationFrame(loop);

      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      const s = stateRef.current;

      // Auto-turntable gentle continuous spin when idle
      if (isSpinning && !s.isDragging && activeTab === '360') {
        s.targetYaw += 0.22;
      }

      // Smooth exponential lerp (luxurious velocity damping)
      const lerpFactor = 0.085;
      s.currentYaw += (s.targetYaw - s.currentYaw) * lerpFactor;
      s.currentPitch += (s.targetPitch - s.currentPitch) * lerpFactor;
      s.currentZoom += (s.targetZoom - s.currentZoom) * lerpFactor;
      s.currentFocusX += (s.targetFocusX - s.currentFocusX) * lerpFactor;
      s.currentFocusY += (s.targetFocusY - s.currentFocusY) * lerpFactor;

      // Pure continuous sinusoidal 3D orbit (Zero snapping, zero jumps across 360°)
      const rad = (s.currentYaw * Math.PI) / 180;
      const smoothRotY = Math.sin(rad) * 30; // Max 30 deg smooth perspective tilt
      const smoothRotX = -s.currentPitch;
      const transX = (50 - s.currentFocusX) * 0.8;
      const transY = (50 - s.currentFocusY) * 0.8;
      const scale = s.currentZoom;

      // 1. Direct GPU Transform on Bike Stage
      if (bikeStageRef.current) {
        bikeStageRef.current.style.transformOrigin = `${s.currentFocusX}% ${s.currentFocusY}%`;
        bikeStageRef.current.style.transform = `scale(${scale}) translate3d(${transX}%, ${transY}%, 0px) rotateY(${smoothRotY}deg) rotateX(${smoothRotX}deg)`;
      }

      // 2. Direct Transform on Floor Contact Shadow
      if (shadowRef.current) {
        const shadowSkew = smoothRotY * 0.2;
        const shadowOpacity = 0.75 + Math.abs(Math.cos(rad)) * 0.2;
        shadowRef.current.style.transform = `scale(${scale}) translateY(${s.currentPitch * 1.6}px) rotate(${shadowSkew}deg)`;
        shadowRef.current.style.opacity = shadowOpacity.toString();
      }

      // 3. Direct Transform on Floor Ambient Glow
      if (glowRef.current) {
        glowRef.current.style.transform = `scale(${scale})`;
      }

      // 4. Update Hotspots Position Directly (Silky 120FPS tracking)
      HOTSPOTS.forEach((spot) => {
        const el = hotspotRefs.current[spot.id];
        if (!el) return;

        const rawX = spot.posX;
        const rawY = spot.posY;
        const screenX = 50 + (rawX - s.currentFocusX) * scale;
        const screenY = 50 + (rawY - s.currentFocusY) * scale;

        const isVisible = screenX >= 6 && screenX <= 94 && screenY >= 6 && screenY <= 94;
        el.style.left = `${screenX}%`;
        el.style.top = `${screenY}%`;
        el.style.opacity = isVisible ? '1' : '0';
        el.style.pointerEvents = isVisible ? 'auto' : 'none';
      });
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSpinning, activeTab]);

  // --- CFD WIND TUNNEL PARTICLE CANVAS ---
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const count = 70;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 500),
        len: Math.random() * 55 + 25,
        speed: Math.random() * 5 + 4,
        opacity: Math.random() * 0.7 + 0.2,
        curve: (Math.random() - 0.5) * 2.5,
        color: i % 3 === 0 ? '#00F0FF' : i % 5 === 0 ? '#FF5E0E' : '#FFFFFF',
      });
    }

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeTab === 'windtunnel' || isHoveringStage) {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = activeTab === 'windtunnel' ? p.opacity : p.opacity * 0.35;
          ctx.lineWidth = 1.6;

          const yawShift = (aeroYawSlider / 20) * 12;
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(
            p.x - p.len * 0.5,
            p.y + p.curve + yawShift,
            p.x - p.len,
            p.y + p.curve * 2 + yawShift * 1.5
          );
          ctx.stroke();

          p.x += p.speed + (activeTab === 'windtunnel' ? 4 : 1.2);
          if (p.x > canvas.width + p.len) {
            p.x = -p.len;
            p.y = Math.random() * canvas.height;
          }
        });
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [activeTab, aeroYawSlider, isHoveringStage]);

  // --- MOUSE & TOUCH ORBIT DRAGGING ---
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const s = stateRef.current;
    s.isDragging = true;
    s.dragStart = { x: e.clientX, y: e.clientY };
    s.lastDragTime = performance.now();
    setIsSpinning(false);
  };

  const handleMouseMove = (e) => {
    const s = stateRef.current;
    if (!s.isDragging) return;

    const deltaX = e.clientX - s.dragStart.x;
    const deltaY = e.clientY - s.dragStart.y;

    s.targetYaw += deltaX * 0.45;
    s.targetPitch = Math.max(-16, Math.min(16, s.targetPitch - deltaY * 0.2));
    s.dragStart = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    stateRef.current.isDragging = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const s = stateRef.current;
      s.isDragging = true;
      s.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setIsSpinning(false);
    }
  };

  const handleTouchMove = (e) => {
    const s = stateRef.current;
    if (!s.isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - s.dragStart.x;
    const deltaY = e.touches[0].clientY - s.dragStart.y;

    s.targetYaw += deltaX * 0.45;
    s.targetPitch = Math.max(-16, Math.min(16, s.targetPitch - deltaY * 0.2));
    s.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    stateRef.current.isDragging = false;
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
    const s = stateRef.current;
    s.targetYaw = cam.yaw;
    s.targetPitch = cam.pitch;
    s.targetZoom = cam.zoom;
    s.targetFocusX = cam.focusX;
    s.targetFocusY = cam.focusY;
    setIsSpinning(false);
    sfx.playHover();
  };

  const resetStage = () => {
    setActiveCameraView('hero');
    const s = stateRef.current;
    s.targetYaw = 18;
    s.targetPitch = 3;
    s.targetZoom = 1.02;
    s.targetFocusX = 50;
    s.targetFocusY = 50;
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
    <div className={`relative w-full flex flex-col gap-3.5 sm:gap-4 ${className}`}>
      {/* ============================================================ */}
      {/* 1. 3D VIRTUAL ATELIER STAGE BOX                             */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHoveringStage(true)}
        onMouseLeave={() => {
          setIsHoveringStage(false);
          stateRef.current.isDragging = false;
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full select-none overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.14] bg-gradient-to-b from-[#0b0e17]/98 via-[#06080e]/98 to-[#020305] shadow-[0_35px_90px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-3xl h-[340px] xs:h-[380px] sm:h-[460px] md:h-[680px] lg:h-[800px] flex flex-col justify-between cursor-grab active:cursor-grabbing ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen min-h-screen' : ''
        }`}
      >
        {/* --- LAYER 1: ATMOSPHERIC STUDIO LIGHTING & SPECULAR SHINE --- */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-30 transition-all duration-1000 ease-out"
          style={{ backgroundColor: selectedColor.primaryColor || activeLighting.ambient }}
        />
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[160px] pointer-events-none opacity-25 transition-all duration-1000 ease-out"
          style={{ backgroundColor: selectedColor.accentColor || activeLighting.underglow }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

        {/* --- LAYER 2: 3D VOLUMETRIC STAGE WITH AUTHENTIC PINARELLO DOGMA F --- */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none pt-10 sm:pt-14 pb-10 sm:pb-16 md:pb-36">
          {/* Dynamic Studio Stage Ground Reflection & Contact Shadow Disc */}
          <div
            ref={shadowRef}
            className="absolute bottom-12 sm:bottom-16 md:bottom-24 w-[85%] sm:w-[75%] md:w-[68%] max-w-[850px] h-14 sm:h-20 md:h-24 rounded-[100%] bg-gradient-to-r from-transparent via-black/90 to-transparent blur-xl pointer-events-none will-change-transform"
          />

          {/* Dynamic Ground Ambient Ring */}
          <div
            ref={glowRef}
            className="absolute bottom-14 sm:bottom-18 md:bottom-26 w-[75%] sm:w-[65%] md:w-[58%] max-w-[750px] h-10 sm:h-14 md:h-16 rounded-[100%] blur-md pointer-events-none transition-colors duration-700 will-change-transform"
            style={{
              background: `radial-gradient(ellipse, ${selectedColor.accentColor}33 0%, transparent 75%)`,
            }}
          />

          {/* 3D Photorealistic Pinarello Dogma F Model Assembly (Direct GPU Ref) */}
          <div
            className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none translate-y-1 sm:translate-y-3"
            style={{
              perspective: '1400px',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              ref={bikeStageRef}
              className="relative w-[96%] xs:w-[90%] sm:w-[84%] max-w-4xl flex items-center justify-center will-change-transform bg-transparent"
            >
              {/* Authentic Master Pinarello Dogma F Monocoque Render */}
              <img
                src={selectedColor.bikeImage}
                alt={`${selectedColor.name} — Pinarello Dogma F`}
                className="w-full h-auto object-contain pointer-events-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] filter contrast-[1.03] brightness-[1.02] select-none bg-transparent"
                draggable={false}
              />

              {/* Aero Pressure Heatmap Overlay (in CFD mode only) */}
              {activeTab === 'windtunnel' && isHeatmapOn && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 transition-opacity duration-300 rounded-full blur-xl"
                  style={{
                    background:
                      'radial-gradient(circle at 75% 55%, rgba(0,240,255,0.6) 0%, rgba(255,94,14,0.4) 40%, rgba(228,0,43,0.3) 70%, transparent 95%)',
                  }}
                />
              )}

              {/* TorayCa X-Ray Dissection Glow (in X-Ray Mode only) */}
              {activeTab === 'xray' && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-60 animate-pulse transition-all duration-300 rounded-full blur-xl"
                  style={{
                    background: `radial-gradient(ellipse at center, ${EXPLODED_LAYERS[selectedExplodedLayer].color}55 0%, transparent 75%)`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* --- LAYER 3: CFD AERODYNAMIC WIND STREAMLINES 2D OVERLAY --- */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* --- LAYER 4: TOP STUDIO DECK & STATUS BAR --- */}
        <div className="relative z-30 p-3 sm:p-5 md:p-6 flex items-center justify-between gap-2 sm:gap-4 pointer-events-none">
          {/* Left: Compact Atelier Treviso Live Badge */}
          <div className="flex items-center gap-2 pointer-events-auto min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl shadow-lg text-[10px] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse shrink-0" />
              <span className="tracking-[0.15em] sm:tracking-[0.2em] text-zinc-300 uppercase font-semibold shrink-0">
                DOGMA F
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-white font-bold truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">{selectedColor.name}</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-[#FF5E0E] font-semibold hidden sm:inline">{selectedColor.code}</span>
              <span className="text-zinc-600 hidden md:inline">|</span>
              <span className="text-[#00F0FF] font-semibold hidden md:inline">{fps} FPS</span>
            </div>
          </div>

          {/* Right: Quick Studio Toggles */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-xl shadow-lg pointer-events-auto shrink-0">
            <button
              onClick={() => {
                setIsSpinning(!isSpinning);
                sfx.playHover();
              }}
              className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer ${
                isSpinning
                  ? 'bg-[#D4FF00]/20 text-[#D4FF00] shadow-[0_0_12px_rgba(212,255,0,0.35)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Toggle Auto 360° Turntable"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin-slow' : ''}`} />
            </button>

            <button
              onClick={resetStage}
              className="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-white transition-all hover:scale-110 cursor-pointer"
              title="Reset Stage to 3/4 Hero"
            >
              <Compass className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-white transition-all hover:scale-110 cursor-pointer"
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

        {/* --- LAYER 5: 3D SPATIAL HOTSPOT OVERLAYS --- */}
        {(activeTab === '360' || activeTab === 'telemetry') && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            {HOTSPOTS.map((spot) => {
              const isActive = activeHotspot?.id === spot.id;

              return (
                <div
                  key={spot.id}
                  ref={(el) => (hotspotRefs.current[spot.id] = el)}
                  className="absolute pointer-events-auto will-change-transform"
                  style={{
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
                      className={`relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#00F0FF] text-black border-white scale-125 shadow-[0_0_25px_#00F0FF]'
                          : 'bg-black/80 text-white border-white/35 hover:border-white hover:scale-115 hover:bg-black/95 shadow-xl'
                      }`}
                      title={spot.title}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-35" />
                      <span className="font-mono text-[10px] sm:text-xs font-black">+</span>
                    </button>

                    {/* Interactive Engineering Spec Popover */}
                    {isActive && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="fixed sm:absolute bottom-6 left-4 right-4 sm:bottom-auto sm:left-1/2 sm:-top-3 sm:-translate-x-1/2 sm:-translate-y-full w-auto sm:w-80 max-w-sm mx-auto p-3.5 sm:p-4 rounded-2xl bg-[#0b0e14]/95 border border-[#00F0FF]/40 text-white backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 animate-fadeIn"
                      >
                        <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
                          <span className="font-mono text-[9px] text-[#00F0FF] font-bold tracking-widest uppercase">
                            {spot.badge}
                          </span>
                          <span className="font-mono text-[9.5px] text-zinc-400 font-semibold">
                            {spot.spec}
                          </span>
                        </div>
                        <div className="font-display text-xs sm:text-sm font-black uppercase tracking-tight text-white mb-1">
                          {spot.title}
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-300 font-sans leading-relaxed">
                          {spot.desc}
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono text-[9px] text-zinc-500">
                            TREVISO R&D LABS
                          </span>
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="text-[10px] font-mono text-[#00F0FF] hover:text-white font-bold cursor-pointer"
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
        )}

        {/* --- DESKTOP OVERLAY MODES (Hidden on mobile, mobile renders outside) --- */}
        {activeTab === 'windtunnel' && (
          <div className="hidden md:block absolute top-18 right-6 z-30 w-80 p-4 rounded-2xl bg-black/90 border border-[#00F0FF]/30 backdrop-blur-2xl shadow-2xl space-y-3 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs font-bold uppercase">
                <Wind className="w-4 h-4" />
                <span>CFD Aero Dynamics</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">40 KM/H AIRFLOW</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[9px] font-mono text-zinc-400 uppercase">DRAG COEFFICIENT</div>
                <div className="font-display text-xl font-black text-white mt-0.5">
                  {dynamicCdA} <span className="text-xs font-mono text-[#00F0FF]">CdA</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[9px] font-mono text-zinc-400 uppercase">WATT SAVINGS</div>
                <div className="font-display text-xl font-black text-[#D4FF00] mt-0.5">
                  -{dynamicWattSaved} <span className="text-xs font-mono">W</span>
                </div>
              </div>
            </div>

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

            <button
              onClick={() => {
                setIsHeatmapOn(!isHeatmapOn);
                sfx.playClick();
              }}
              className={`w-full py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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

        {activeTab === 'xray' && (
          <div className="hidden md:block absolute top-18 left-6 z-30 w-96 p-4 rounded-2xl bg-black/90 border border-[#FF5E0E]/40 backdrop-blur-2xl shadow-2xl space-y-3 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#FF5E0E] font-mono text-xs font-bold uppercase">
                <Layers className="w-4 h-4" />
                <span>TorayCa® X-Ray</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">LAYER 0{selectedExplodedLayer + 1}/04</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {EXPLODED_LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setSelectedExplodedLayer(idx);
                    sfx.playClick();
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold text-left transition-all cursor-pointer ${
                    selectedExplodedLayer === idx
                      ? 'bg-[#FF5E0E] text-black shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {layer.tag}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="font-display text-xs font-black uppercase text-white tracking-wider">
                {EXPLODED_LAYERS[selectedExplodedLayer].name}
              </div>
              <div className="font-mono text-[10px] text-[#FF5E0E] font-semibold">
                {EXPLODED_LAYERS[selectedExplodedLayer].subtitle}
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                {EXPLODED_LAYERS[selectedExplodedLayer].desc}
              </p>
              <div className="pt-1.5 border-t border-white/10 text-[10px] font-mono text-[#D4FF00] font-bold">
                {EXPLODED_LAYERS[selectedExplodedLayer].stat}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="hidden md:block absolute top-18 right-6 z-30 w-80 p-4 rounded-2xl bg-black/90 border border-[#D4FF00]/30 backdrop-blur-2xl shadow-2xl space-y-3 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#D4FF00] font-mono text-xs font-bold uppercase">
                <Gauge className="w-4 h-4" />
                <span>Chassis Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 animate-pulse">LIVE SENSORS</span>
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

        {/* --- DESKTOP BOTTOM LUXURY CONTROL DOCK (Layer 6: Inside box on md+) --- */}
        <div className="hidden md:flex relative z-30 p-4 lg:p-6 pt-1 flex-col items-center gap-3 pointer-events-none">
          {/* Tier 1: Inspection Mode Tabs Bar */}
          <div className="w-full flex items-center justify-center pointer-events-auto">
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/85 border border-white/20 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] shrink-0">
              <button
                onClick={() => {
                  setActiveTab('360');
                  sfx.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
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
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
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
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
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
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                  activeTab === 'telemetry'
                    ? 'bg-[#D4FF00] text-black shadow-[0_0_20px_rgba(212,255,0,0.5)] scale-105'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>TELEMETRY HUD</span>
              </button>
            </div>
          </div>

          {/* Tier 2: Camera Focal View Presets */}
          <div className="w-full flex items-center justify-center overflow-x-auto no-scrollbar py-0.5 pointer-events-auto">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/75 border border-white/10 backdrop-blur-2xl shadow-xl shrink-0">
              {CAMERA_VIEWS.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setCameraPreset(cam.id)}
                  className={`px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold tracking-wider transition-all duration-300 shrink-0 cursor-pointer ${
                    activeCameraView === cam.id
                      ? 'bg-white text-black font-bold shadow-md scale-105'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cam.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tier 3: Swatches & Studio Atmosphere Deck */}
          <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-5xl px-2 pointer-events-auto">
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
                    className={`px-2.5 py-1 rounded-full text-[9.5px] font-mono transition-all cursor-pointer ${
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
            <div className="flex items-center gap-2.5 p-1.5 rounded-full bg-black/80 border border-white/15 backdrop-blur-2xl shadow-xl">
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
                    className={`relative group flex items-center justify-center p-0.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                        : 'opacity-65 hover:opacity-100 hover:scale-110'
                    }`}
                    title={`${c.name} — ${c.edition}`}
                    aria-label={`Select ${c.name} color`}
                  >
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 shadow-inner overflow-hidden relative flex items-center justify-center"
                      style={{
                        background:
                          c.swatchGradient ||
                          `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 50%, ${c.rearColor} 100%)`,
                      }}
                    >
                      {c.swatchImg && (
                        <img
                          src={c.swatchImg}
                          alt={c.name}
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      )}
                    </div>
                    {isSelected && (
                      <span
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-black"
                        style={{ backgroundColor: c.accentColor || '#00F0FF' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Guidance */}
            <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-3">
              <span>DRAG 360° ORBIT</span>
              <span>•</span>
              <span>TAP HOTSPOTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MOBILE-ONLY LUXURY CONTROL DECK (Placed OUTSIDE 3D Box)   */}
      {/* ============================================================ */}
      <div className="block md:hidden w-full space-y-2 pointer-events-auto">
        {/* Mobile Active Mode Details Panel */}
        {activeTab === 'windtunnel' && (
          <div className="p-3 rounded-xl bg-black/90 border border-[#00F0FF]/30 backdrop-blur-2xl shadow-xl space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-[#00F0FF] font-mono text-[11px] font-bold uppercase">
                <Wind className="w-3.5 h-3.5" />
                <span>CFD Aero Dynamics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-zinc-400">40 KM/H AIRFLOW</span>
                <button
                  onClick={() => setActiveTab('360')}
                  className="p-1 text-zinc-400 hover:text-white text-xs font-mono font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[8.5px] font-mono text-zinc-400 uppercase">DRAG COEFFICIENT</div>
                <div className="font-display text-base font-black text-white mt-0.5">
                  {dynamicCdA} <span className="text-[10px] font-mono text-[#00F0FF]">CdA</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[8.5px] font-mono text-zinc-400 uppercase">WATT SAVINGS</div>
                <div className="font-display text-base font-black text-[#D4FF00] mt-0.5">
                  -{dynamicWattSaved} <span className="text-[10px] font-mono">W</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-300 mb-0.5">
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
                className="w-full accent-[#00F0FF] cursor-pointer h-1"
              />
              <div className="flex justify-between text-[7.5px] font-mono text-zinc-500 mt-0.5">
                <span>-20° PORT</span>
                <span>0° HEADWIND</span>
                <span>+20° STARBOARD</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsHeatmapOn(!isHeatmapOn);
                sfx.playClick();
              }}
              className={`w-full py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isHeatmapOn
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_12px_#00F0FF]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{isHeatmapOn ? 'HEATMAP: ACTIVE' : 'TOGGLE AERO HEATMAP'}</span>
            </button>
          </div>
        )}

        {activeTab === 'xray' && (
          <div className="p-3 rounded-xl bg-black/90 border border-[#FF5E0E]/40 backdrop-blur-2xl shadow-xl space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-[#FF5E0E] font-mono text-[11px] font-bold uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>TorayCa® X-Ray</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-zinc-400">LAYER 0{selectedExplodedLayer + 1}/04</span>
                <button
                  onClick={() => setActiveTab('360')}
                  className="p-1 text-zinc-400 hover:text-white text-xs font-mono font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1">
              {EXPLODED_LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setSelectedExplodedLayer(idx);
                    sfx.playClick();
                  }}
                  className={`px-2 py-1 rounded-md text-[9px] font-mono font-bold text-left transition-all cursor-pointer ${
                    selectedExplodedLayer === idx
                      ? 'bg-[#FF5E0E] text-black shadow-sm'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {layer.tag}
                </button>
              ))}
            </div>

            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 space-y-0.5">
              <div className="font-display text-[11px] font-black uppercase text-white tracking-wider">
                {EXPLODED_LAYERS[selectedExplodedLayer].name}
              </div>
              <div className="font-mono text-[9px] text-[#FF5E0E] font-semibold">
                {EXPLODED_LAYERS[selectedExplodedLayer].subtitle}
              </div>
              <p className="text-[10px] text-zinc-300 font-sans leading-relaxed line-clamp-2">
                {EXPLODED_LAYERS[selectedExplodedLayer].desc}
              </p>
              <div className="pt-1 border-t border-white/10 text-[9px] font-mono text-[#D4FF00] font-bold">
                {EXPLODED_LAYERS[selectedExplodedLayer].stat}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="p-3 rounded-xl bg-black/90 border border-[#D4FF00]/30 backdrop-blur-2xl shadow-xl space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-[#D4FF00] font-mono text-[11px] font-bold uppercase">
                <Gauge className="w-3.5 h-3.5" />
                <span>Chassis Telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-zinc-400 animate-pulse">LIVE SENSORS</span>
                <button
                  onClick={() => setActiveTab('360')}
                  className="p-1 text-zinc-400 hover:text-white text-xs font-mono font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[9px] text-zinc-400 mb-0.5">
                  <span>POWER TRANSFER</span>
                  <span className="text-white font-bold">99.4%</span>
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#D4FF00] w-[99.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-zinc-400 mb-0.5">
                  <span>LATERAL STIFFNESS</span>
                  <span className="text-[#D4FF00] font-bold">392 GPa</span>
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-[#D4FF00] w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-zinc-400 mb-0.5">
                  <span>WEIGHT (F/R)</span>
                  <span className="text-[#00F0FF] font-bold">48% : 52%</span>
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden flex">
                  <div className="h-full bg-[#00F0FF] w-[48%]" />
                  <div className="h-full bg-[#FF5E0E] w-[52%]" />
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8.5px] font-mono text-zinc-400">
              <span>WEIGHT: 865g FRAME</span>
              <span className="text-white font-bold">TOTAL: 6.77 KG</span>
            </div>
          </div>
        )}

        {/* Main Mobile Controls Card */}
        <div className="p-2.5 xs:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/[0.06] via-[#0e121b]/95 to-[#080b11]/98 border border-white/[0.12] backdrop-blur-3xl shadow-xl flex flex-col gap-2">
          {/* Row 1: Mode Switcher Tabs (4 equal columns, fits 100% width on any phone, zero scroll) */}
          <div className="grid grid-cols-4 w-full gap-1 p-0.5 rounded-full bg-black/85 border border-white/15 backdrop-blur-2xl shadow-sm">
            <button
              onClick={() => {
                setActiveTab('360');
                sfx.playClick();
              }}
              className={`flex items-center justify-center gap-1 py-1 px-1 rounded-full text-[9px] xs:text-[10px] font-mono font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                activeTab === '360'
                  ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.4)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <RotateCcw className="w-2.5 h-2.5 xs:w-3 xs:h-3 shrink-0" />
              <span>360°</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('windtunnel');
                sfx.playClick();
              }}
              className={`flex items-center justify-center gap-1 py-1 px-1 rounded-full text-[9px] xs:text-[10px] font-mono font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                activeTab === 'windtunnel'
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_10px_rgba(0,240,255,0.5)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Wind className="w-2.5 h-2.5 xs:w-3 xs:h-3 shrink-0" />
              <span>AERO</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('xray');
                sfx.playClick();
              }}
              className={`flex items-center justify-center gap-1 py-1 px-1 rounded-full text-[9px] xs:text-[10px] font-mono font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                activeTab === 'xray'
                  ? 'bg-[#FF5E0E] text-black shadow-[0_0_10px_rgba(255,94,14,0.5)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-2.5 h-2.5 xs:w-3 xs:h-3 shrink-0" />
              <span>X-RAY</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('telemetry');
                sfx.playClick();
              }}
              className={`flex items-center justify-center gap-1 py-1 px-1 rounded-full text-[9px] xs:text-[10px] font-mono font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-[#D4FF00] text-black shadow-[0_0_10px_rgba(212,255,0,0.5)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gauge className="w-2.5 h-2.5 xs:w-3 xs:h-3 shrink-0" />
              <span>HUD</span>
            </button>
          </div>

          {/* Row 2: Camera Angles Preset Chips (Flex-wrap, fits cleanly without horizontal scroll) */}
          <div className="flex flex-wrap items-center justify-center gap-1 w-full py-0.5">
            {CAMERA_VIEWS.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setCameraPreset(cam.id)}
                className={`px-2 py-0.5 rounded-full text-[8.5px] xs:text-[9.5px] font-mono font-semibold tracking-tight transition-all duration-300 shrink-0 cursor-pointer ${
                  activeCameraView === cam.id
                    ? 'bg-white text-black font-bold shadow-sm scale-105'
                    : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cam.shortLabel || cam.label}
              </button>
            ))}
          </div>

          {/* Row 3: Colorway Finish Swatches & Lighting Atmosphere */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1.5 border-t border-white/10 w-full">
            {/* Swatches */}
            <div className="flex items-center justify-center gap-1 xs:gap-1.5 p-1 rounded-full bg-black/80 border border-white/15">
              <span className="font-mono text-[8.5px] xs:text-[9px] uppercase tracking-wider text-zinc-400 px-1 font-bold">
                FINISH:
              </span>
              {COLORWAYS.map((c) => {
                const isSelected = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectColorway(c)}
                    className={`relative flex items-center justify-center p-0.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'scale-125 ring-1.5 ring-white ring-offset-1 ring-offset-black shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                        : 'opacity-65 hover:opacity-100 hover:scale-110'
                    }`}
                    title={`${c.name} — ${c.edition}`}
                    aria-label={`Select ${c.name} color`}
                  >
                    <div
                      className="w-4 h-4 xs:w-4.5 xs:h-4.5 rounded-full border border-white/40 shadow-inner overflow-hidden relative flex items-center justify-center"
                      style={{
                        background:
                          c.swatchGradient ||
                          `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 50%, ${c.rearColor} 100%)`,
                      }}
                    >
                      {c.swatchImg && (
                        <img
                          src={c.swatchImg}
                          alt={c.name}
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      )}
                    </div>
                    {isSelected && (
                      <span
                        className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-black"
                        style={{ backgroundColor: c.accentColor || '#00F0FF' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Atmosphere Mood Buttons */}
            <div className="flex items-center justify-center gap-0.5 xs:gap-1 p-0.5 rounded-full bg-black/60 border border-white/10">
              {STUDIO_LIGHTING_MODES.map((light) => (
                <button
                  key={light.id}
                  onClick={() => {
                    setActiveLighting(light);
                    sfx.playClick();
                  }}
                  className={`px-1.5 xs:px-2 py-0.5 rounded-full text-[8px] xs:text-[8.5px] font-mono transition-all cursor-pointer ${
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
        </div>
      </div>
    </div>
  );
};

