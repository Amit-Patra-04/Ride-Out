import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASING, sfx } from '../../utils/animations';
import { MagneticButton } from '../Navbar/MagneticButton';
import {
  Zap,
  Cpu,
  ArrowUpRight,
  Radio,
  Compass,
  Check,
  Shield,
  Wind,
  Eye,
  Activity,
  Play,
  RotateCcw,
  Gauge,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VEHICLES = [
  {
    id: 'apex-gt',
    name: 'APEX GT',
    edition: 'QUANTUM HYPER-TOURER',
    category: 'Hyper-Tourer',
    speed: 412,
    accel: '1.78s',
    power: '1,420 HP',
    range: '940 KM',
    drag: '0.18 Cd',
    downforce: '1,200 KG',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFpH01unngQX9vVDPuE0etvmvcQQDNmlerQNDoNcilOAXaO203JmoHcwBMtK1jktjZZrwVOZPf5_M8g-tIK3wZS5KAFr7MPjs3vgDu82Nfckb8_dToKDWfskwEOHShrll1_6E3mCtKM16o6UWVuGHZKtmuN-Grs0c5J-qGXh73kP3ONDzYJ_n84DfauiohlWku5PxA-RrBbCWm6SAu4y0Pdv8ltIMDmTOsL9vCGpdmoXHQHL5d_HThNi7m5NQG3JsPmberNMy3O_wN',
    color: '#00F0FF',
    accentClass: 'text-brand-accent',
    desc: 'Bespoke carbon monocoque with dual axial-flux motors, cryogenic cooling, and neural trajectory prediction.',
  },
  {
    id: 'phantom-stealth',
    name: 'PHANTOM STEALTH 09',
    edition: 'AUTONOMOUS CRUISER',
    category: 'Autonomous Cruiser',
    speed: 360,
    accel: '2.10s',
    power: '1,180 HP',
    range: '1,120 KM',
    drag: '0.20 Cd',
    downforce: '950 KG',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaYdOtb3m3DlItf6bMWrsQSLzF0ewDRuD0in3cUc9oeFoogOvlWQxegI91JSRP_95yo0Pejl15YvVdgP81ZOsS1L9OM4umNFCb7nHdPcrFlLjUd5fUlwP_0Xbpp_U8AMCbUdOwz_6L1AnYCQpX0Uitg2bjBFL6jgdWfolMBrm7tz0eOVDVCFG46Qu-3xIHB3jy8a-6n59HVLtPk_y1uiZZLt6rweLp_masiWFF0NffjkNeMlfCidp4Gorv174FNafs115xv2Z3MOhp',
    color: '#D4FF00',
    accentClass: 'text-brand-lime',
    desc: 'Quantum surround lidar array with Level-5 autonomous cruise. Engineered for transcontinental nocturnal transit.',
  },
  {
    id: 'vortex-r',
    name: 'VORTEX-R EXPEDITION',
    edition: 'ALL-TERRAIN KINETIC',
    category: 'All-Terrain Kinetic',
    speed: 310,
    accel: '2.45s',
    power: '1,050 HP',
    range: '880 KM',
    drag: '0.24 Cd',
    downforce: '1,450 KG',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_K3c-9peX5xJ_BFu25hcxAhq7w6-QCYm_o_kWZzazSlLkWhJ_QS1ZHxNPi8tCG4dxiY6t0HTjc5gtgnFubmE92bII1phFkaU7Dx0Upq_0OojozXPCoUptLZoxmJVxFKJ_O-yszZKky_GNfxYfZJ7AJxm_Zqg9PG2NEwn_gxYdtxEq87wl1FTvHsECaUK4Y1cIRjAUUARKTt1bVeMDfmTdQZ-6SOTngy3jB9jR9Ty2ezUKiHhZC7kDlxTcM-_hd5e7A1eYmgQ4rgZs',
    color: '#FF3366',
    accentClass: 'text-[#FF3366]',
    desc: 'Adaptive magnetorheological suspension with terrain scan AI. Built for extreme alpine and dune expeditions.',
  },
];

const COLOR_OPTIONS = [
  { name: 'Matte Obsidian', hex: '#0a0c10' },
  { name: 'Electric Cyan', hex: '#00F0FF' },
  { name: 'Volt Lime', hex: '#D4FF00' },
  { name: 'Solar Crimson', hex: '#FF3366' },
  { name: 'Arctic Silver', hex: '#E5E2E1' },
];

const EXPEDITIONS = [
  {
    id: 'tokyo',
    name: 'TOKYO NIGHT CYBER-RING',
    country: 'JAPAN',
    distance: '180 KM',
    time: '38 MIN',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    tags: ['NEON ARTERIAL', 'HIGHWAY MATRIX', 'LEVEL-5 READY'],
  },
  {
    id: 'alpine',
    name: 'ALPINE HIGHWAY GLACIER PASS',
    country: 'SWITZERLAND',
    distance: '340 KM',
    time: '1H 12MIN',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    tags: ['ELEVATION CLIMB', 'ALL-TERRAIN', 'THERMAL OPTIMIZED'],
  },
  {
    id: 'coastal',
    name: 'CALIFORNIA COASTAL WARP',
    country: 'USA',
    distance: '420 KM',
    time: '1H 25MIN',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    tags: ['PACIFIC RUN', 'AERO SPRINT', 'COASTAL TURBINE'],
  },
];

const TERMINALS = [
  { city: 'TOKYO SKYPORT', code: 'NRT-01', status: 'ACTIVE', pods: '14 AVAILABLE', ping: '0.4ms' },
  { city: 'ZURICH HELIPORT', code: 'ZRH-04', status: 'ACTIVE', pods: '8 AVAILABLE', ping: '0.6ms' },
  { city: 'SAN FRANCISCO BAY', code: 'SFO-09', status: 'ACTIVE', pods: '19 AVAILABLE', ping: '0.3ms' },
  { city: 'DUBAI MARINA PORT', code: 'DXB-02', status: 'ACTIVE', pods: '12 AVAILABLE', ping: '0.8ms' },
  { city: 'LONDON BATTERSEA', code: 'LON-07', status: 'ACTIVE', pods: '11 AVAILABLE', ping: '0.5ms' },
];

export const HeroShowcase = ({ onOpenBooking }) => {
  const [activeCarIdx, setActiveCarIdx] = useState(0);
  const [activeColor, setActiveColor] = useState(COLOR_OPTIONS[0]);
  const [viewMode, setViewMode] = useState('studio'); // 'studio' | 'aero' | 'thermal' | 'xray'
  const [isLaunching, setIsLaunching] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [torqueBias, setTorqueBias] = useState(70);
  const [batteryTemp, setBatteryTemp] = useState(38);
  const [suspensionHeight, setSuspensionHeight] = useState(115);

  const car = VEHICLES[activeCarIdx];
  const heroStageRef = useRef(null);
  const carImgRef = useRef(null);
  const blackCardRef = useRef(null);

  // Entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: EASING.smooth } });

    tl.fromTo(
      '.hero-anim-item',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.8, delay: 0.05 }
    );
  }, []);

  // 3D Parallax tilt on mouse movement
  const handleHeroMouseMove = (e) => {
    if (!carImgRef.current || isLaunching) return;
    const rect = heroStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(carImgRef.current, {
      rotateY: x * 7,
      rotateX: -y * 4,
      transformPerspective: 1200,
      duration: 0.35,
      ease: EASING.smooth,
    });
  };

  const handleHeroMouseLeave = () => {
    if (!carImgRef.current || isLaunching) return;
    gsap.to(carImgRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: EASING.smooth,
    });
  };

  // 3D Holographic Card Mouse Follow
  const handleCardMouseMove = (e) => {
    if (!blackCardRef.current) return;
    const rect = blackCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(blackCardRef.current, {
      rotateY: x * 12,
      rotateX: -y * 8,
      transformPerspective: 800,
      duration: 0.3,
      ease: EASING.smooth,
    });
  };

  const handleCardMouseLeave = () => {
    if (!blackCardRef.current) return;
    gsap.to(blackCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: EASING.smooth,
    });
  };

  // Interactive Test Launch Simulator
  const handleTestLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    sfx.playClick();

    const speedObj = { speed: 0 };
    const targetSpeed = car.speed;

    gsap.to(heroStageRef.current, {
      y: -3,
      duration: 0.08,
      repeat: 14,
      yoyo: true,
      ease: 'power1.inOut',
    });

    gsap.to(speedObj, {
      speed: targetSpeed,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => {
        setCurrentSpeed(Math.round(speedObj.speed));
      },
      onComplete: () => {
        setTimeout(() => {
          gsap.to(speedObj, {
            speed: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: () => {
              setCurrentSpeed(Math.round(speedObj.speed));
            },
            onComplete: () => {
              setIsLaunching(false);
            },
          });
        }, 1200);
      },
    });
  };

  const selectVehicle = (idx) => {
    sfx.playClick();
    setActiveCarIdx(idx);

    if (carImgRef.current) {
      gsap.fromTo(
        carImgRef.current,
        { opacity: 0.2, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.4, ease: EASING.smooth }
      );
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-obsidian-void text-zinc-100 selection:bg-brand-accent selection:text-black">
      {/* Dynamic Background Atmosphere Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[850px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-[650px] h-[650px] rounded-full bg-brand-accent/[0.045] blur-[170px]" />
        <div className="absolute top-32 right-1/4 w-[550px] h-[550px] rounded-full bg-brand-lime/[0.035] blur-[180px]" />
      </div>

      {/* High-Precision Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0" />

      {/* ========================================================================= */}
      {/* SECTION 1: UNIFIED EDITORIAL CINEMATIC HERO */}
      {/* ========================================================================= */}
      <section
        id="models"
        className="relative z-10 min-h-screen pt-24 sm:pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-between"
      >
        {/* Top Minimal Telemetry Coordinate Bar */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-zinc-500 border-b border-white/[0.06] pb-3 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
              <span>SKYPORT MATRIX // TOKYO NRT-01</span>
            </span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="hidden sm:inline text-zinc-400">LAT 35.6762° N // LONG 139.6503° E</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>POWERTRAIN EFFICIENCY: 99.4%</span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="hidden md:inline text-brand-lime">L5 AUTONOMY ONLINE</span>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div className="hero-anim-item text-center max-w-4xl mx-auto mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-zinc-400 mb-3 border-white/[0.08]">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span className="text-zinc-200 uppercase tracking-widest font-semibold">{car.edition}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-brand-accent">2026 ARCHITECTURE</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] uppercase text-white">
            ARCHITECTURE <br />
            <span className="text-gradient-cyan">OF VELOCITY</span>
          </h1>

          <p className="max-w-lg mx-auto text-zinc-400 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
            Zero friction, solid-state powertrain, and instant quantum dispatch. Engineered for transcontinental high-speed expeditions.
          </p>
        </div>

        {/* Main Stage: Vehicle Visual with 3D Parallax & Mode Switcher */}
        <div
          ref={heroStageRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="hero-anim-item relative my-auto py-2 flex flex-col items-center justify-center select-none"
        >
          {/* Giant Kinetic Background Watermark Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
            <span className="font-display font-black text-[15vw] leading-none uppercase tracking-tighter text-white/[0.025] whitespace-nowrap">
              {car.name.split(' ')[0]}
            </span>
          </div>

          {/* Top HUD: Visualizer Mode Selector */}
          <div className="relative z-20 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-obsidian-surface/80 backdrop-blur-xl rounded-full border border-white/[0.08] mb-3 shadow-lg">
            {[
              { id: 'studio', label: 'STUDIO', icon: Eye },
              { id: 'aero', label: 'AERODYNAMICS', icon: Wind },
              { id: 'thermal', label: 'THERMAL SCAN', icon: Activity },
              { id: 'xray', label: 'X-RAY CHASSIS', icon: Cpu },
            ].map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    sfx.playHover();
                    setViewMode(mode.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-accent text-black font-semibold shadow-glow-cyan/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Vehicle Stage with Aerodynamic Streamlines */}
          <div className="relative w-full max-w-5xl aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center z-10">
            {/* Aerodynamic Streamlines Overlay (SVG) */}
            {viewMode === 'aero' && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 1000 450"
                fill="none"
              >
                <path
                  d="M 50 180 Q 250 160, 480 130 T 950 140"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  className="aero-streamline opacity-75"
                />
                <path
                  d="M 50 210 Q 280 180, 520 160 T 950 170"
                  stroke="#00F0FF"
                  strokeWidth="2"
                  className="aero-streamline-fast opacity-90"
                />
                <path
                  d="M 50 260 Q 300 240, 560 220 T 950 240"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  className="aero-streamline opacity-60"
                />
                <path
                  d="M 120 300 Q 400 290, 680 270 T 950 300"
                  stroke="#D4FF00"
                  strokeWidth="1"
                  className="aero-streamline opacity-50"
                />
              </svg>
            )}

            {/* Vehicle Image */}
            <img
              ref={carImgRef}
              src={
                viewMode === 'xray'
                  ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhnV2PSu3Wrhp2pSeTJmEQrbziCKx-fQxnkAODMqUTFeyG6PAPQPDzGCjIbigAJ4H8UJqB-Cs04XbD-Fkw27lKIheaQuwCkmIgJCeMBDSKAtD6kButUDOWtOxW1c9-qfxDp1xWFYHsWNl8Gxdwzt2knTy6jLsTv1gR3XbfCPq7yodWZFVFEsrtNFaZV4bqPpoOJiFId5XneBdxdO6tAabu22TKkFGudQjpso-VrxcvU_hW6O_FmoFcnaxX5VvVjXqgwkSF-Bx_1ykF'
                  : car.image
              }
              alt={car.name}
              className={`w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(0,240,255,0.12)] transition-all duration-500 ${
                viewMode === 'thermal'
                  ? 'hue-rotate-90 saturate-200 contrast-125'
                  : viewMode === 'xray'
                  ? 'brightness-110 drop-shadow-[0_0_40px_rgba(0,240,255,0.3)]'
                  : ''
              }`}
            />

            {/* Ground Reflection Glow */}
            <div
              className="absolute bottom-2 w-3/4 h-8 rounded-full blur-2xl opacity-40 transition-colors duration-500 pointer-events-none"
              style={{ backgroundColor: activeColor.hex }}
            />
          </div>

          {/* Floating Telemetry Pods (Left & Right) */}
          <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-2 px-2 sm:px-6 z-20">
            {/* Left Specs Cluster */}
            <div className="flex items-center gap-3">
              <div className="glass-panel px-3.5 py-2 rounded-xl border-white/[0.08] flex items-center gap-2.5">
                <div className="w-1 h-5 bg-brand-accent rounded-full" />
                <div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">0-100 ACCEL</div>
                  <div className="text-xs font-mono font-bold text-white">{car.accel}</div>
                </div>
              </div>

              <div className="glass-panel px-3.5 py-2 rounded-xl border-white/[0.08] flex items-center gap-2.5">
                <div className="w-1 h-5 bg-brand-lime rounded-full" />
                <div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">TOP VELOCITY</div>
                  <div className="text-xs font-mono font-bold text-white">{car.speed} KM/H</div>
                </div>
              </div>

              <div className="hidden sm:flex glass-panel px-3.5 py-2 rounded-xl border-white/[0.08] items-center gap-2.5">
                <div className="w-1 h-5 bg-brand-accent rounded-full" />
                <div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">DRAG COEFF</div>
                  <div className="text-xs font-mono font-bold text-brand-accent">{car.drag}</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Test Launch HUD */}
            <div className="flex items-center gap-3">
              <div className="glass-panel px-4 py-2 rounded-xl border-white/[0.08] flex items-center gap-3">
                <Gauge className="w-4 h-4 text-brand-accent" />
                <div>
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">LIVE SPEEDOMETER</div>
                  <div className="text-sm font-mono font-bold text-white flex items-baseline gap-1">
                    <span className="text-brand-accent text-base">{currentSpeed}</span>
                    <span className="text-[9px] text-zinc-400">KM/H</span>
                  </div>
                </div>

                <button
                  onClick={handleTestLaunch}
                  disabled={isLaunching}
                  className={`ml-2 px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    isLaunching
                      ? 'bg-brand-lime text-black animate-pulse'
                      : 'bg-brand-accent/20 hover:bg-brand-accent hover:text-black border border-brand-accent/40 text-brand-accent'
                  }`}
                >
                  {isLaunching ? (
                    <>
                      <RotateCcw className="w-3 h-3 animate-spin" />
                      <span>WARP</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>TEST LAUNCH</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Model Switcher Dock & Color Finishes */}
        <div className="hero-anim-item mt-4 pt-3 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Vehicle Switcher */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {VEHICLES.map((v, i) => {
              const isSelected = activeCarIdx === i;
              return (
                <button
                  key={v.id}
                  onClick={() => selectVehicle(i)}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-250 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-brand-accent/60 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="h-8 w-12 rounded-md overflow-hidden bg-obsidian-surface">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <div className={`text-xs font-display font-bold ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                      {v.name}
                    </div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">{v.category}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Color Palettes + Quick Dispatch */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider hidden sm:inline">
                FINISH:
              </span>
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    sfx.playHover();
                    setActiveColor(c);
                  }}
                  title={c.name}
                  className={`h-4.5 w-4.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeColor.name === c.name
                      ? 'scale-125 ring-2 ring-brand-accent ring-offset-2 ring-offset-obsidian-void'
                      : 'hover:scale-110 opacity-70'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>

            <MagneticButton
              onClick={() => {
                sfx.playClick();
                if (onOpenBooking) onOpenBooking();
              }}
              className="px-4.5 py-2 rounded-full bg-brand-accent hover:bg-white text-black font-mono font-semibold text-xs tracking-wider transition-all duration-300 shadow-glow-cyan/30 cursor-pointer"
            >
              <span>RESERVE {car.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: INTERACTIVE CHASSIS & DRIVE ARCHITECTURE EXPLORER */}
      {/* ========================================================================= */}
      <section id="chassis" className="relative z-10 py-20 border-t border-white/[0.06] max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>[ 02 // DRIVE ARCHITECTURE ]</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
              SOLID-STATE CHASSIS LAB
            </h2>
          </div>
          <p className="hidden md:block text-xs font-mono text-zinc-400 max-w-xs text-right">
            Real-time interactive telemetry modulation. Dual axial flux motors paired with dynamic magnetic damping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Telemetry Control Panel */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="glass-panel p-4.5 rounded-2xl border-white/[0.07]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">TORQUE VECTORING</span>
                <span className="text-xs font-mono font-bold text-brand-accent">
                  {torqueBias}% REAR BIAS
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={torqueBias}
                onChange={(e) => setTorqueBias(Number(e.target.value))}
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1.5">
                <span>50:50 BALANCED</span>
                <span>100% DRIFT / TRACK</span>
              </div>
            </div>

            <div className="glass-panel p-4.5 rounded-2xl border-white/[0.07]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">SUSPENSION CLEARANCE</span>
                <span className="text-xs font-mono font-bold text-brand-lime">
                  {suspensionHeight} MM (AERO-LOW)
                </span>
              </div>
              <input
                type="range"
                min="90"
                max="160"
                value={suspensionHeight}
                onChange={(e) => setSuspensionHeight(Number(e.target.value))}
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1.5">
                <span>90MM (CIRCUIT)</span>
                <span>160MM (ALL-TERRAIN)</span>
              </div>
            </div>

            <div className="glass-panel p-4.5 rounded-2xl border-white/[0.07]">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">BATTERY MATRIX TEMP</span>
                <span className="text-xs font-mono font-bold text-brand-accent">
                  {batteryTemp}°C (CRYOGENIC OPTIMAL)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="65"
                value={batteryTemp}
                onChange={(e) => setBatteryTemp(Number(e.target.value))}
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1.5">
                <span>20°C COLD</span>
                <span>65°C THERMAL LIMIT</span>
              </div>
            </div>
          </div>

          {/* Blueprint Wireframe Graphic */}
          <div className="lg:col-span-7 relative glass-panel p-4 sm:p-6 rounded-2xl border-white/[0.07] flex items-center justify-center overflow-hidden group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhnV2PSu3Wrhp2pSeTJmEQrbziCKx-fQxnkAODMqUTFeyG6PAPQPDzGCjIbigAJ4H8UJqB-Cs04XbD-Fkw27lKIheaQuwCkmIgJCeMBDSKAtD6kButUDOWtOxW1c9-qfxDp1xWFYHsWNl8Gxdwzt2knTy6jLsTv1gR3XbfCPq7yodWZFVFEsrtNFaZV4bqPpoOJiFId5XneBdxdO6tAabu22TKkFGudQjpso-VrxcvU_hW6O_FmoFcnaxX5VvVjXqgwkSF-Bx_1ykF"
              alt="Electric Drive Chassis Blueprint"
              className="w-full h-auto object-contain filter drop-shadow-[0_0_35px_rgba(0,240,255,0.25)] transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hotspot Chips */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md border border-white/[0.08] text-[9px] font-mono text-brand-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-ping" />
              <span>SCHEMATIC // REV 4.2</span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded-md border border-white/[0.08] text-[9px] font-mono text-zinc-300">
              <span>ACTIVE STATUS: CALIBRATED</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CURATED EXPEDITION ROUTES */}
      {/* ========================================================================= */}
      <section id="expeditions" className="relative z-10 py-20 border-t border-white/[0.06] max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-lime uppercase tracking-widest mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>[ 03 // GLOBAL EXPEDITIONS ]</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
              ICONIC HIGH-SPEED ROUTES
            </h2>
          </div>
          <p className="text-zinc-400 text-xs font-mono mt-2 md:mt-0 max-w-xs">
            Reserve automated private transit pods across curated scenic hyper-routes with bespoke cockpit atmospheres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EXPEDITIONS.map((route) => (
            <div
              key={route.id}
              onClick={() => {
                sfx.playClick();
                if (onOpenBooking) onOpenBooking();
              }}
              className="group relative rounded-2xl overflow-hidden glass-panel border-white/[0.07] hover:border-brand-accent/40 transition-all duration-400 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-surface via-transparent to-black/30" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/[0.1] text-[9px] font-mono text-white">
                  {route.country}
                </div>
              </div>

              <div className="p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-brand-accent transition-colors duration-200">
                    {route.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {route.tags.map((tag) => (
                      <span key={tag} className="text-[8px] font-mono text-zinc-400 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.05]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-2.5">
                    <span className="text-brand-accent font-semibold">{route.distance}</span>
                    <span className="text-zinc-600">•</span>
                    <span>{route.time}</span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-brand-accent group-hover:text-black transition-all">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: HOLOGRAPHIC BLACK PASS & TIERS */}
      {/* ========================================================================= */}
      <section id="blackpass" className="relative z-10 py-20 border-t border-white/[0.06] max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Description & Tier Matrix */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>[ 04 // SOVEREIGN MEMBERSHIP ]</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
              RIDE-OUT BLACK PASS
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Tier-1 encrypted access to the private high-speed transit network. Guaranteed dispatch in under 3 minutes across all worldwide skyport terminals.
            </p>

            <div className="mt-6 space-y-2.5">
              {[
                { title: 'Sub-3 Minute Guaranteed Priority Dispatch', desc: 'Pre-warmed cockpit tailored to your biometric profile.' },
                { title: 'Unlimited High-Speed Transcontinental Terminals', desc: 'No tolls, zero queue delay, encrypted tunnel priority.' },
                { title: 'Private Hypercar Pod Allocation', desc: 'Apex GT and Phantom Stealth reservation privileges.' },
              ].map((perk, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">{perk.title}</div>
                    <div className="text-[10px] font-sans text-zinc-400 mt-0.5">{perk.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3D Interactive Holographic Black Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              ref={blackCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-md aspect-[1.586/1] rounded-2xl p-6 glass-panel border-white/[0.15] shadow-2xl flex flex-col justify-between overflow-hidden cursor-grab will-change-transform bg-gradient-to-br from-[#121520] via-[#090b10] to-[#040507]"
            >
              {/* Metallic Sheen Specular Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-brand-accent/20 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-tight text-white">RIDE·OUT</span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-brand-accent px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20 uppercase">
                  SOVEREIGN TIER-1
                </span>
              </div>

              {/* Card Hologram Chip */}
              <div className="my-auto relative z-10 flex items-center gap-4">
                <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200/40 via-yellow-500/20 to-amber-600/40 border border-yellow-300/30 flex items-center justify-center">
                  <div className="w-6 h-3.5 border border-yellow-200/40 rounded-sm" />
                </div>
                <div className="text-[11px] font-mono tracking-widest text-zinc-300">
                  RO-9940-0284-QUANTUM
                </div>
              </div>

              <div className="flex items-end justify-between relative z-10 text-xs font-mono">
                <div>
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest">MEMBER IDENTIFIER</div>
                  <div className="text-zinc-200 font-semibold mt-0.5">ALEXANDER V. VANCE</div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest">VALID THRU</div>
                  <div className="text-brand-accent font-semibold mt-0.5">2030 // PROTOCOL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: REAL-TIME GLOBAL HIGH-SPEED TERMINALS */}
      {/* ========================================================================= */}
      <section id="terminals" className="relative z-10 py-20 border-t border-white/[0.06] max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-accent uppercase tracking-widest mb-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>[ 05 // TERMINAL GRID ]</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
              ACTIVE SKYPORT MATRIX
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[10px] font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>GLOBAL PROTOCOL: 100% OPERATIONAL</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TERMINALS.map((term) => (
            <div
              key={term.code}
              className="glass-panel p-4 rounded-xl border-white/[0.06] hover:border-brand-accent/40 transition-colors flex flex-col justify-between h-30"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-zinc-500">{term.code}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div>
                <div className="text-xs font-display font-bold text-white">{term.city}</div>
                <div className="text-[10px] font-mono text-brand-accent mt-0.5">{term.pods}</div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 pt-2 border-t border-white/[0.04]">
                <span>LATENCY: {term.ping}</span>
                <span className="text-emerald-400 font-semibold">{term.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: EDITORIAL FOOTER & CTA */}
      {/* ========================================================================= */}
      <footer className="relative z-10 py-16 border-t border-white/[0.06] max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-white/[0.08] text-center flex flex-col items-center">
          <div className="h-9 w-9 rounded-xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent mb-4">
            <Zap className="w-4 h-4 fill-current" />
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight uppercase max-w-lg">
            EXPERIENCE NEXT-GEN MOBILITY
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mt-2.5 leading-relaxed">
            Join the decentralized Ride-Out network. Instant dispatch across worldwide terminal corridors.
          </p>

          <div className="mt-6">
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                if (onOpenBooking) onOpenBooking();
              }}
              className="px-6 py-3 rounded-full bg-brand-accent hover:bg-white text-black font-mono font-bold text-xs tracking-wider transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-glow-cyan/30"
            >
              <span>DISPATCH HYPER-POD</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <div>© 2026 RIDE-OUT TECHNOLOGIES. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <a href="#models" className="hover:text-zinc-300 transition-colors">MODELS</a>
            <a href="#chassis" className="hover:text-zinc-300 transition-colors">CHASSIS LAB</a>
            <a href="#expeditions" className="hover:text-zinc-300 transition-colors">EXPEDITIONS</a>
            <a href="#blackpass" className="hover:text-zinc-300 transition-colors">BLACK PASS</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
