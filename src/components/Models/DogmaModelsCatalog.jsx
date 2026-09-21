import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Award,
  Sliders,
  ChevronRight,
  Check,
  Activity,
  Gauge,
  Wind,
  Compass,
  Eye,
  Info,
  ExternalLink,
  Flame,
  Radio,
  Maximize2,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const PINARELLO_MODELS = [
  {
    id: 'dura-ace-di2',
    index: '01',
    name: 'DOGMA F DURA ACE Di2',
    shortName: 'DURA-ACE Di2',
    brand: 'SHIMANO',
    tagline: 'PEAK WORLDTOUR SUPREMACY',
    description:
      'The definitive benchmark of competitive road racing. Equipped with Shimano’s ultra-rapid 12-speed semi-wireless electronic transmission and Dura-Ace C50 carbon wheelset, engineered for instantaneous power response.',
    groupset: 'Shimano Dura-Ace Di2 R9270 12S Wireless',
    brakes: 'Hydraulic Disc Brake (Concealed Flat Mount)',
    wheels: 'Shimano Dura-Ace C50 Tubeless Ready Carbon',
    cockpit: 'MOST Talon Ultra Fast Integrated Carbon 1K',
    saddle: 'MOST Lynx Ultrafast Carbon 145mm',
    weight: '6.77 kg',
    weightLbs: '14.92 lbs',
    priceEur: '€14,800',
    priceUsd: '$15,500',
    badge: 'WORLDTOUR FLAGSHIP',
    badgeColor: '#00F0FF',
    finishCode: 'DF-SHI-9270',
    telemetry: {
      powerEfficiency: 99.4,
      aeroDelta: -4.8,
      stiffness: 392,
      lateralCompliance: 94.6,
    },
    hotspots: [
      {
        id: 'fork',
        title: 'ONDA FORK FLAP™ 47MM',
        desc: 'Patented aero-blade fork profile with 47mm rake cancels lateral vortex turbulent drag around the front disc caliper.',
        x: '20%',
        y: '58%',
      },
      {
        id: 'cockpit',
        title: 'TICR™ TOTAL INTEGRATION',
        desc: '100% internal cable routing through the Most Talon Ultra Fast integrated cockpit saves 5W at 40 km/h.',
        x: '34%',
        y: '22%',
      },
      {
        id: 'frame',
        title: 'TORAYCA® M40X CARBON',
        desc: 'Next-generation nanoalloy composite delivering exceptional 392 GPa tensile modulus with ultra-high lateral stiffness.',
        x: '52%',
        y: '42%',
      },
      {
        id: 'bb',
        title: 'ASYMMETRIC BB SECTION',
        desc: 'Italian-threaded asymmetric bottom bracket shell perfectly counterbalances unilateral drivetrain torque forces.',
        x: '56%',
        y: '68%',
      },
    ],
    mainImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
    colorways: [
      {
        name: 'Luxter Red Gold',
        code: 'E120',
        swatchImg: 'https://pinarello.com/storage/Variant/d77b58f160312ec04b79445406ad6f35.png',
        colorHex: '#9E0018',
        accentGlow: 'rgba(158, 0, 24, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Edge Crystal White',
        code: 'E121',
        swatchImg: 'https://pinarello.com/storage/Variant/c5cd77a628a14f18680ca72f652a5da0.png',
        colorHex: '#FFFFFF',
        accentGlow: 'rgba(255, 255, 255, 0.35)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Venice Blue',
        code: 'E122',
        swatchImg: 'https://pinarello.com/storage/Variant/9306bb0fc95a5d62a656d7ff96d8d944.png',
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.5)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'Bob Black Stealth',
        code: 'E123',
        swatchImg: 'https://pinarello.com/storage/Variant/17db459feed7d8f6df8ed77e9ae51fde.png',
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.4)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
      {
        name: 'INEOS Team WorldTour',
        code: 'E124',
        swatchImg: 'https://pinarello.com/storage/Variant/6b721202ab0c4aae8912aade70116fd5.png',
        colorHex: '#E4002B',
        accentGlow: 'rgba(228, 0, 43, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #E4002B 0%, #FF5E0E 45%, #0A0C10 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
    ],
  },
  {
    id: 'sram-red-axs',
    index: '02',
    name: 'DOGMA F SRAM RED AXS',
    shortName: 'SRAM RED AXS',
    brand: 'SRAM',
    tagline: 'PURE WIRELESS INTELLIGENCE',
    description:
      'Completely wireless electronic 12-speed perfection with intuitive eTap shift logic, paired with ultra-light DT Swiss ARC 1100 carbon aero wheels for razor-sharp acceleration and hill climbs.',
    groupset: 'SRAM RED AXS E-Tap 12S Full Wireless',
    brakes: 'Hydraulic Disc Brake (Integrated Caliper Mounts)',
    wheels: 'DT Swiss ARC 1100 Dicut 50mm Carbon',
    cockpit: 'MOST Talon Ultra Fast Integrated Carbon 1K',
    saddle: 'MOST Lynx Ultrafast Carbon 145mm',
    weight: '6.71 kg',
    weightLbs: '14.79 lbs',
    priceEur: '€15,200',
    priceUsd: '$15,900',
    badge: 'WIRELESS REVOLUTION',
    badgeColor: '#E5A93C',
    finishCode: 'DF-SRAM-RED',
    telemetry: {
      powerEfficiency: 99.6,
      aeroDelta: -5.1,
      stiffness: 392,
      lateralCompliance: 95.2,
    },
    hotspots: [
      {
        id: 'fork',
        title: 'ONDA FORK FLAP™ 47MM',
        desc: 'Asymmetric aerofoil fork legs guide airflow seamlessly past the disc caliper assembly.',
        x: '20%',
        y: '58%',
      },
      {
        id: 'cockpit',
        title: 'AXS WIRELESS COCKPIT',
        desc: 'Zero wires or shift cables extending from the hoods—the cleanest aerodynamic frontal area in the pro peloton.',
        x: '34%',
        y: '22%',
      },
      {
        id: 'frame',
        title: 'FLATBACK AERO TUBE PROFILE',
        desc: 'Truncated airfoil cross-sections adhere strictly to UCI regulations while maximizing crosswind stability.',
        x: '52%',
        y: '42%',
      },
      {
        id: 'bb',
        title: 'CARBON ASYMMETRY',
        desc: 'Differential carbon ply orientation balances asymmetric pedaling strain during maximal sprint efforts.',
        x: '56%',
        y: '68%',
      },
    ],
    mainImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
    colorways: [
      {
        name: 'Edge Crystal White',
        code: 'E121',
        swatchImg: 'https://pinarello.com/storage/Variant/5117db936fc89c5e8cc58dcc6cd6732e.png',
        colorHex: '#FFFFFF',
        accentGlow: 'rgba(255, 255, 255, 0.35)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Red Gold',
        code: 'E120',
        swatchImg: 'https://pinarello.com/storage/Variant/03b1418abfed338beab8bf35420c0244.png',
        colorHex: '#9E0018',
        accentGlow: 'rgba(158, 0, 24, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
      {
        name: 'Luxter Venice Blue',
        code: 'E122',
        swatchImg: 'https://pinarello.com/storage/Variant/037cbd714e3db532413d5938c16af10e.png',
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.5)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'Bob Stealth Matt',
        code: 'E123',
        swatchImg: 'https://pinarello.com/storage/Variant/df5eeaa085bb24be276d3d38207715cc.png',
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.4)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
    ],
  },
  {
    id: 'ineos-replica',
    index: '03',
    name: 'DOGMA F INEOS GRENADIERS REPLICA',
    shortName: 'INEOS REPLICA',
    brand: 'WORLDTOUR',
    tagline: 'OFFICIAL WORLDTOUR TEAM RACING SPEC',
    description:
      'The identical machine ridden across the 21 stages of the Tour de France and Giro d’Italia. Complete with FC-R9200-P integrated dual-sided power meter and pro team livery graphics.',
    groupset: 'Shimano Dura-Ace Di2 + FC-R9200-P Dual Power',
    brakes: 'Hydraulic Disc Flat Mount with Onda Flap™',
    wheels: 'Shimano Dura-Ace C50 Pro WorldTour Spec',
    cockpit: 'MOST Talon Ultra Fast Integrated Pro Custom 1K',
    saddle: 'MOST Lynx Ultrafast Carbon 145mm INEOS Team',
    weight: '6.75 kg',
    weightLbs: '14.88 lbs',
    priceEur: '€16,500',
    priceUsd: '$17,200',
    badge: 'GRAND TOUR CHAMPION',
    badgeColor: '#E4002B',
    finishCode: 'DF-INEOS-WT',
    telemetry: {
      powerEfficiency: 99.8,
      aeroDelta: -5.3,
      stiffness: 395,
      lateralCompliance: 96.0,
    },
    hotspots: [
      {
        id: 'fork',
        title: 'ONDA FORK FLAP™ INEOS',
        desc: 'Wind-tunnel optimized aerodynamic winglet directing high-velocity air away from spinning spokes.',
        x: '20%',
        y: '58%',
      },
      {
        id: 'cockpit',
        title: 'PRO TALON COCKPIT',
        desc: 'Ultra-stiff 1K carbon monocoque cockpit tuned specifically for 1,800-watt bunch sprints.',
        x: '34%',
        y: '22%',
      },
      {
        id: 'frame',
        title: 'RACE NUMBER TAB INTEGRATION',
        desc: 'Aero seatpost featuring concealed UCI transponder mount and direct battery retaining cage.',
        x: '52%',
        y: '42%',
      },
      {
        id: 'bb',
        title: 'DUAL POWER METER BB',
        desc: 'Factory-calibrated dual strain gauges measuring real-time left/right power balance with 1.5% accuracy.',
        x: '56%',
        y: '68%',
      },
    ],
    mainImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
    colorways: [
      {
        name: 'INEOS WorldTour Team',
        code: 'E124',
        swatchImg: 'https://pinarello.com/storage/Variant/94f31784affde4307c160af60a57e597.png',
        colorHex: '#E4002B',
        accentGlow: 'rgba(228, 0, 43, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #E4002B 0%, #FF5E0E 45%, #0A0C10 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
      },
      {
        name: 'Luxter Red Gold Edition',
        code: 'E120',
        swatchImg: 'https://pinarello.com/storage/Variant/d77b58f160312ec04b79445406ad6f35.png',
        colorHex: '#9E0018',
        accentGlow: 'rgba(158, 0, 24, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
    ],
  },
  {
    id: 'pq3-replica',
    index: '04',
    name: 'DOGMA F PQ3 TEAM REPLICA',
    shortName: 'PQ3 COMMEMORATIVE',
    brand: 'SPECIAL EDITION',
    tagline: 'LIMITED COMMEMORATIVE RACING BUILD',
    description:
      'Created in reverence to Treviso’s historic racing triumphs. Featuring custom stealth carbon raw weave aesthetics, MOST Ultrafast 45 carbon wheels, and bespoke titanium hardware accents.',
    groupset: 'Shimano Dura-Ace Di2 R9270 12S Special Edition',
    brakes: 'Integrated Aero Disc with Titanium Hardware',
    wheels: 'MOST Ultrafast 45 Full Carbon Tubeless',
    cockpit: 'MOST Talon Ultra Fast Integrated Carbon 1K',
    saddle: 'MOST Lynx Carbon PQ3 Edition',
    weight: '6.80 kg',
    weightLbs: '14.99 lbs',
    priceEur: '€15,900',
    priceUsd: '$16,600',
    badge: 'LIMITED ARCHIVE',
    badgeColor: '#D4FF00',
    finishCode: 'DF-PQ3-LTD',
    telemetry: {
      powerEfficiency: 99.1,
      aeroDelta: -4.7,
      stiffness: 392,
      lateralCompliance: 94.8,
    },
    hotspots: [
      {
        id: 'fork',
        title: 'ONDA 47MM FORK',
        desc: 'Aerodynamic cross-section matched to MOST 45mm wheel profile for unified flow laminar attachment.',
        x: '20%',
        y: '58%',
      },
      {
        id: 'cockpit',
        title: 'TICR™ STEALTH ROUTING',
        desc: 'Concealed cockpit routing with titanium top cap and integrated out-front telemetry computer mount.',
        x: '34%',
        y: '22%',
      },
      {
        id: 'frame',
        title: 'RAW TORAYCA WEAVE',
        desc: 'Ultra-thin transparent clear coat showcases the hand-laid carbon composite structure made in Italy.',
        x: '52%',
        y: '42%',
      },
      {
        id: 'bb',
        title: 'TORQUE DISPERSION BB',
        desc: 'Widened asymmetric bottom bracket junctions disperse high-torque efforts during out-of-saddle climbs.',
        x: '56%',
        y: '68%',
      },
    ],
    mainImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
    colorways: [
      {
        name: 'Team PQ3 Bob Edition',
        code: 'E123',
        swatchImg: 'https://pinarello.com/storage/Variant/4d11fb7aaf25c7f20cf5e68d8214b890.png',
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.4)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
      {
        name: 'Luxter Venice Blue Edition',
        code: 'E122',
        swatchImg: 'https://pinarello.com/storage/Variant/9306bb0fc95a5d62a656d7ff96d8d944.png',
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.5)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
    ],
  },
  {
    id: 'super-record-13',
    index: '05',
    name: 'DOGMA F SUPER RECORD WIRELESS',
    shortName: 'SUPER RECORD 13S',
    brand: 'CAMPAGNOLO',
    tagline: 'ALL-ITALIAN HERITAGE & PERFECTION',
    description:
      'The pure embodiment of Italian cycling aristocracy. Campagnolo Super Record Wireless 13-speed groupset harmonized with Campagnolo Bora Ultra WTO 45 carbon wheels for unmatched road acoustics and mechanical feel.',
    groupset: 'Campagnolo Super Record Wireless 13S',
    brakes: 'Campagnolo Hydraulic Ergopower 160mm/140mm',
    wheels: 'Campagnolo Bora Ultra WTO 45 DB Ceramic',
    cockpit: 'MOST Talon Ultra Fast Integrated Carbon 1K',
    saddle: 'MOST Lynx Carbon Super Record Custom',
    weight: '6.82 kg',
    weightLbs: '15.03 lbs',
    priceEur: '€16,200',
    priceUsd: '$16,900',
    badge: 'ALL-ITALIAN HERITAGE',
    badgeColor: '#00F0FF',
    finishCode: 'DF-CAMP-13S',
    telemetry: {
      powerEfficiency: 99.3,
      aeroDelta: -4.9,
      stiffness: 392,
      lateralCompliance: 95.0,
    },
    hotspots: [
      {
        id: 'fork',
        title: 'ONDA OVAL FORK',
        desc: 'Distinctive wave profile cancels high-frequency road vibrations while maintaining laser-sharp cornering precision.',
        x: '20%',
        y: '58%',
      },
      {
        id: 'cockpit',
        title: 'ERGOPOWER SHIFT PODS',
        desc: 'Customized thumb-and-finger electronic shift triggers tailored to natural Italian ergonomics.',
        x: '34%',
        y: '22%',
      },
      {
        id: 'frame',
        title: 'TORAYCA® M40X MATRIX',
        desc: 'High-tensile carbon cloth woven with aerospace-grade epoxy resin matrix for extreme torsional rigidity.',
        x: '52%',
        y: '42%',
      },
      {
        id: 'bb',
        title: 'CAMPAGNOLO ULTRA-TORQUE',
        desc: 'Hirth joint bottom bracket spindle delivers zero play and instantaneous crank arm power transmission.',
        x: '56%',
        y: '68%',
      },
    ],
    mainImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
    colorways: [
      {
        name: 'Bob Stealth Carbon',
        code: 'E123',
        swatchImg: 'https://pinarello.com/storage/Variant/f3a1926a6e7015ea40b34125443c9a8a.png',
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.4)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
      {
        name: 'Edge Crystal White',
        code: 'E121',
        swatchImg: 'https://pinarello.com/storage/Variant/c192a5a1d4a6f6227ff8e791caf5c20a.png',
        colorHex: '#FFFFFF',
        accentGlow: 'rgba(255, 255, 255, 0.35)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/dc764fa23aec829be6cf724d6012db5c.png',
      },
      {
        name: 'Luxter Venice Blue',
        code: 'E122',
        swatchImg: 'https://pinarello.com/storage/Variant/55cf0e9736eb3f3f500f33e17b821c1c.png',
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.5)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'Luxter Red Gold',
        code: 'E120',
        swatchImg: 'https://pinarello.com/storage/Variant/e8f92cc34a0941669914faaebb6a0377.png',
        colorHex: '#9E0018',
        accentGlow: 'rgba(158, 0, 24, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b5f62a38e44f3e7f4c2800fd49f5bc46.png',
      },
    ],
  },
];

export const DogmaModelsCatalog = ({ onOpenBooking }) => {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [selectedColorwayIndex, setSelectedColorwayIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'telemetry' | 'aerodynamics'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const stageRef = useRef(null);

  const currentModel = PINARELLO_MODELS[selectedModelIndex];
  const currentColorway =
    currentModel.colorways[selectedColorwayIndex] || currentModel.colorways[0];

  const handleSelectModel = (idx) => {
    if (idx === selectedModelIndex) return;
    setSelectedModelIndex(idx);
    setSelectedColorwayIndex(0);
    setActiveHotspot(null);
    sfx.playClick();
  };

  const handleSelectColorway = (cIdx) => {
    if (cIdx === selectedColorwayIndex) return;
    setSelectedColorwayIndex(cIdx);
    sfx.playClick();
  };

  // Interactive 3D mouse parallax on the bike stage
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHoveringStage(true);
    sfx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHoveringStage(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="models"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0b0e14] via-[#111622] to-[#0b0e14] border-t border-white/[0.08]"
    >
      {/* --- LAYER 1: CINEMATIC REFINED STUDIO BACKDROP --- */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full blur-[180px] pointer-events-none opacity-25 transition-all duration-1000 ease-out"
        style={{ backgroundColor: currentColorway.colorHex || '#E4002B' }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-white/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] bg-[#E4002B]/[0.05] rounded-full blur-[200px] pointer-events-none" />

      {/* Bespoke Precision Telemetry Axis & Dynamic Flow Guides */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-35">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="420" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 9" />
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Background Architectural Watermark Typography with Balanced Padding */}
      <div className="absolute top-12 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.03] sm:opacity-[0.04] leading-none font-display font-black tracking-tight">
        <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">REPERTORY</span>
        <span className="text-[8vw] sm:text-[7vw] md:text-[6vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-transparent -mt-[1.5vw]">
          DOGMA F
        </span>
      </div>

      {/* Side Technical & Geographic Calibration Labels */}
      <div className="absolute top-36 left-8 hidden 2xl:flex flex-col gap-6 font-mono text-[9px] text-zinc-600 tracking-[0.25em] uppercase select-none pointer-events-none z-10">
        <div className="space-y-1">
          <span className="block text-zinc-500 font-bold text-[9.5px]">CATALOGUE REGISTRY</span>
          <span>SERIE DOGMA F // MY26</span>
          <span className="block text-zinc-600">TREVISO RACING ARCHIVE</span>
        </div>
      </div>

      <div className="absolute top-36 right-8 hidden 2xl:flex flex-col gap-6 font-mono text-[9px] text-zinc-600 tracking-[0.25em] uppercase text-right select-none pointer-events-none z-10">
        <div className="space-y-1">
          <span className="block text-zinc-500 font-bold text-[9.5px]">HOMOLOGATION</span>
          <span>UCI 700C CHASSIS</span>
          <span className="block text-zinc-600">5 OFFICIAL BUILDS</span>
        </div>
      </div>

      {/* --- LAYER 2: INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* --- SECTION HEADER: ARCHITECTURAL FLAGSHIP EDITORIAL --- */}
        <div className="relative z-10 mb-14 sm:mb-16">
          {/* Top Kicker Registry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-8 font-mono text-[11px] tracking-[0.25em] text-zinc-400 uppercase">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white font-bold text-[10px] border border-white/15">
                02
              </span>
              <span className="text-[#00F0FF] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                FACTORY REPERTORY
              </span>
              <span className="text-zinc-600">//</span>
              <span>TREVISO RACING DIVISION</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-400 font-mono text-[10px]">
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                EDITION 0{selectedModelIndex + 1} / 05
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-[#E4002B] font-bold hidden sm:inline">
                WORLDTOUR BENCHMARK
              </span>
            </div>
          </div>

          {/* Master Grand Headline & Editorial Description */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl xl:max-w-3xl space-y-3">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FF5E0E] font-bold">
                FIVE MASTERWORK RACING CONFIGURATIONS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-2xl">
                DISTINCTION IN{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 via-40% to-[#FF5E0E] drop-shadow-lg mt-1">
                  EVERY BUILD.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2 space-y-4">
              <p className="text-sm sm:text-base text-zinc-300 font-sans font-light leading-relaxed">
                Every Dogma F model is configured with zero compromises. Select your electronic groupset tier to inspect race-calibrated chassis telemetry, aerodynamics, and official paint finishes.
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-zinc-400">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                  TORAYCA® M40X
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                  ONDA FORKFLAP™
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10">
                  TICR™ 100% INTERNAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- GRAND ARCHITECTURAL MODEL SELECTOR DECK --- */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PINARELLO_MODELS.map((model, idx) => {
            const isSelected = selectedModelIndex === idx;
            return (
              <button
                key={model.id}
                onClick={() => handleSelectModel(idx)}
                onMouseEnter={() => sfx.playHover()}
                className={`relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 group overflow-hidden border backdrop-blur-xl ${
                  isSelected
                    ? 'bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-transparent border-white/35 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(255,255,255,0.12)] scale-[1.02]'
                    : 'bg-white/[0.02] border-white/8 hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                {/* Active Accent Top Edge Glow */}
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500 shadow-[0_0_12px_#00F0FF]"
                    style={{
                      background: `linear-gradient(90deg, #E4002B 0%, #FF5E0E 50%, #00F0FF 100%)`,
                    }}
                  />
                )}

                {/* Top Row: Index & Brand */}
                <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase mb-3">
                  <span
                    className={`font-bold transition-colors ${
                      isSelected ? 'text-[#00F0FF]' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  >
                    // {model.index}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider ${
                      isSelected
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    {model.brand}
                  </span>
                </div>

                {/* Middle: Short Name */}
                <div className="font-display text-sm sm:text-base font-black text-white tracking-tight uppercase leading-tight line-clamp-2 min-h-[2.5rem]">
                  {model.shortName}
                </div>

                {/* Bottom: Price & Badge */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs sm:text-sm font-black text-white block">
                      {model.priceEur}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-400 block">
                      {model.weight}
                    </span>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isSelected ? '#00F0FF' : 'rgba(255,255,255,0.2)',
                      transform: isSelected ? 'scale(1.4)' : 'scale(1)',
                      boxShadow: isSelected ? '0 0 10px #00F0FF' : 'none',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* --- MAIN CINEMATIC 3D SHOWCASE & TELEMETRY STAGE --- */}
        <div className="relative z-10 bg-gradient-to-b from-white/[0.05] via-[#10141e]/95 to-[#0b0e14]/98 border border-white/[0.12] rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] overflow-hidden">
          {/* Subtle Engineering Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

          {/* Top Floating Stage HUD Status */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10.5px] font-mono font-bold tracking-widest uppercase border shadow-md"
                style={{
                  backgroundColor: `${currentModel.badgeColor}15`,
                  borderColor: `${currentModel.badgeColor}40`,
                  color: currentModel.badgeColor,
                }}
              >
                <Zap className="w-3.5 h-3.5" />
                {currentModel.badge}
              </span>

              <span className="font-mono text-xs text-zinc-400 hidden sm:inline">
                FINISH CODE: <strong className="text-white font-bold">{currentModel.finishCode}</strong>
              </span>
            </div>

            {/* Interactive Mode Toggles */}
            <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-white/15 font-mono text-[11px] uppercase shadow-lg">
              <button
                onClick={() => {
                  setActiveTab('specs');
                  sfx.playClick();
                }}
                className={`px-4 py-2 rounded-xl transition-all duration-200 font-bold ${
                  activeTab === 'specs'
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => {
                  setActiveTab('telemetry');
                  sfx.playClick();
                }}
                className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 font-bold ${
                  activeTab === 'telemetry'
                    ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-black" />
                Telemetry
              </button>
            </div>
          </div>

          {/* Core Stage Split: Bike Spotlight & Interactive Specs Matrix */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
            {/* --- LEFT: HIGH-RES 3D PARALLAX BIKE STAGE (7 COLS) --- */}
            <div
              ref={stageRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px] cursor-crosshair select-none"
              style={{ perspective: 1200 }}
            >
              {/* Dynamic Multi-Layer Backlight Aura */}
              <div
                className="absolute w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full blur-[130px] transition-all duration-700 pointer-events-none opacity-40"
                style={{
                  backgroundColor: currentColorway.colorHex || '#E4002B',
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
                }}
              />

              {/* Studio Radial Floor Plate & Laser Guide */}
              <div className="absolute bottom-10 sm:bottom-12 w-[85%] h-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-[100%] blur-xl pointer-events-none" />

              {/* Calibration Wheelbase Baseline */}
              <div className="absolute bottom-6 w-[85%] flex items-center justify-between font-mono text-[9px] text-zinc-500 uppercase tracking-widest pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  FRONT: 12×100MM
                </span>
                <div className="flex-1 mx-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
                  <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 px-2 bg-[#0c0f16] text-[8.5px] text-zinc-400 font-bold">
                    WHEELBASE: 974 MM
                  </span>
                </div>
                <span className="flex items-center gap-1.5">
                  REAR: 12×142MM
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4002B]" />
                </span>
              </div>

              {/* Main Interactive High-Res Cutout Image with Gyro Parallax */}
              <div
                className="relative z-10 w-full flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: isHoveringStage
                    ? `rotateX(${-mousePos.y * 8}deg) rotateY(${mousePos.x * 12}deg) scale(1.03)`
                    : 'rotateX(0deg) rotateY(0deg) scale(1)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={currentColorway.bikeImage || currentModel.mainImage}
                  alt={`${currentModel.name} - ${currentColorway.name}`}
                  key={`${currentModel.id}-${currentColorway.name}-${selectedColorwayIndex}`}
                  className="w-full max-w-2xl object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)] filter brightness-105 contrast-105 transition-all duration-500"
                  loading="eager"
                />

                {/* Floating Interactive Engineering Hotspots */}
                {currentModel.hotspots.map((spot) => {
                  const isActive = activeHotspot?.id === spot.id;
                  return (
                    <div
                      key={spot.id}
                      className="absolute z-30 transition-transform duration-300"
                      style={{
                        left: spot.x,
                        top: spot.y,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <button
                        onClick={() => {
                          setActiveHotspot(isActive ? null : spot);
                          sfx.playClick();
                        }}
                        onMouseEnter={() => sfx.playHover()}
                        className={`relative group flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border backdrop-blur-md transition-all duration-300 ${
                          isActive
                            ? 'bg-[#00F0FF] text-black border-white scale-125 shadow-[0_0_20px_#00F0FF]'
                            : 'bg-black/75 text-white border-white/35 hover:border-white hover:scale-115 hover:bg-black/95 shadow-xl'
                        }`}
                        title={spot.title}
                      >
                        <span className="absolute inset-0 rounded-full animate-ping opacity-35 bg-[#00F0FF]" />
                        <Info className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      {/* Active Hotspot Glass Popover Card */}
                      {isActive && (
                        <div className="absolute left-1/2 -top-3 -translate-x-1/2 -translate-y-full w-64 sm:w-76 p-4 rounded-2xl bg-[#0b0e14]/95 border border-[#00F0FF]/40 text-white backdrop-blur-2xl shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10">
                            <span className="font-mono text-[9px] text-[#00F0FF] font-bold tracking-widest uppercase">
                              PATENTED INNOVATION
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                          </div>
                          <div className="font-display text-xs sm:text-sm font-black uppercase tracking-tight text-white mb-1">
                            {spot.title}
                          </div>
                          <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                            {spot.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* --- FLOATING LUXURY LIVERY SWATCH DOCK --- */}
              <div className="relative z-20 mt-8 flex flex-col items-center gap-3 bg-[#0B0D12]/95 border border-white/15 px-6 py-3.5 rounded-2xl backdrop-blur-2xl shadow-2xl">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  <span className="text-zinc-500">OFFICIAL FINISH:</span>
                  <strong className="text-white font-bold">{currentColorway.name}</strong>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[9.5px] text-[#00F0FF] font-bold">
                    {currentColorway.code}
                  </span>
                </div>

                {/* Swatch preview buttons */}
                <div className="flex items-center gap-3">
                  {currentModel.colorways.map((c, cIdx) => {
                    const isSelected = selectedColorwayIndex === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => handleSelectColorway(cIdx)}
                        onMouseEnter={() => sfx.playHover()}
                        className={`relative group w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border transition-all duration-300 flex items-center justify-center ${
                          isSelected
                            ? 'scale-125 border-white ring-2 ring-[#00F0FF] ring-offset-2 ring-offset-black shadow-[0_0_20px_rgba(0,240,255,0.6)]'
                            : 'border-white/25 opacity-70 hover:opacity-100 hover:scale-110 hover:border-white/60'
                        }`}
                        style={{ background: c.swatchGradient || c.colorHex }}
                        title={`${c.name} (${c.code})`}
                      >
                        {c.swatchImg && (
                          <img
                            src={c.swatchImg}
                            alt={c.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* --- RIGHT: SPECIFICATIONS MATRIX & TELEMETRY DECK (5 COLS) --- */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Title & Tagline */}
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>SPECIFICATION DOSSIER</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                  {currentModel.name}
                </h3>
                <p className="text-xs font-mono text-[#FF5E0E] uppercase tracking-widest mt-1.5 font-bold">
                  {currentModel.tagline}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-3 leading-relaxed font-light">
                  {currentModel.description}
                </p>
              </div>

              {/* TAB CONTENT 1: FULL SPECIFICATIONS TABLE */}
              {activeTab === 'specs' && (
                <div className="space-y-2.5 font-mono text-xs animate-in fade-in duration-300">
                  {/* Groupset */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-white/20 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>GROUPSET</span>
                    </div>
                    <span className="text-white font-semibold text-right max-w-[210px] truncate">
                      {currentModel.groupset}
                    </span>
                  </div>

                  {/* Wheelset */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-white/20 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Gauge className="w-3.5 h-3.5 text-[#FF5E0E]" />
                      <span>WHEELSET</span>
                    </div>
                    <span className="text-white font-semibold text-right max-w-[210px] truncate">
                      {currentModel.wheels}
                    </span>
                  </div>

                  {/* Integrated Cockpit */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-white/20 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Layers className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span>COCKPIT</span>
                    </div>
                    <span className="text-white font-semibold text-right max-w-[210px] truncate">
                      {currentModel.cockpit}
                    </span>
                  </div>

                  {/* Braking System */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:border-white/20 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                      <span>BRAKING</span>
                    </div>
                    <span className="text-white font-semibold text-right max-w-[210px] truncate">
                      {currentModel.brakes}
                    </span>
                  </div>

                  {/* Weight & Clearance */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.1]">
                      <span className="block text-[10px] text-zinc-500 uppercase font-bold">CHASSIS MASS</span>
                      <span className="font-display text-base font-black text-[#00F0FF]">
                        {currentModel.weight}
                      </span>
                      <span className="text-[10px] text-zinc-400 block font-mono">({currentModel.weightLbs})</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.1]">
                      <span className="block text-[10px] text-zinc-500 uppercase font-bold">MAX TIRE CLEARANCE</span>
                      <span className="font-display text-base font-black text-white">
                        700 × 30c
                      </span>
                      <span className="text-[10px] text-zinc-400 block font-mono">All-Road Aero</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: TELEMETRY GAUGES */}
              {activeTab === 'telemetry' && (
                <div className="space-y-4 font-mono text-xs animate-in fade-in duration-300">
                  {/* Telemetry 1: Power Transfer */}
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 flex items-center gap-2 font-bold">
                        <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
                        POWER EFFICIENCY
                      </span>
                      <span className="text-[#00F0FF] font-bold text-sm">
                        {currentModel.telemetry.powerEfficiency}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00F0FF] to-[#0B3C95] rounded-full transition-all duration-700"
                        style={{ width: `${currentModel.telemetry.powerEfficiency}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400">
                      Asymmetric Chainstay Counterbalance • Zero BB Flex
                    </span>
                  </div>

                  {/* Telemetry 2: Aero Drag Delta */}
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 flex items-center gap-2 font-bold">
                        <Wind className="w-3.5 h-3.5 text-[#FF5E0E]" />
                        AERODYNAMIC DRAG (CdA)
                      </span>
                      <span className="text-[#FF5E0E] font-bold text-sm">
                        {currentModel.telemetry.aeroDelta}% CdA
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF5E0E] to-[#E4002B] rounded-full transition-all duration-700"
                        style={{ width: '92%' }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400">
                      -3.2 Watts Saved at 40 km/h vs Preceding WorldTour Benchmark
                    </span>
                  </div>

                  {/* Telemetry 3: Carbon Modulus */}
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300 flex items-center gap-2 font-bold">
                        <Layers className="w-3.5 h-3.5 text-[#D4FF00]" />
                        TORAYCA® M40X MODULUS
                      </span>
                      <span className="text-[#D4FF00] font-bold text-sm">
                        {currentModel.telemetry.stiffness} GPa
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D4FF00] to-[#9E0018] rounded-full transition-all duration-700"
                        style={{ width: '98%' }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400">
                      Extreme Tensile Resistance with High-Damping Matrix
                    </span>
                  </div>
                </div>
              )}

              {/* Price & Action Terminal */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                    MSRP FACTORY DELIVERED
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                    <span>{currentModel.priceEur}</span>
                    <span className="text-xs font-mono text-zinc-400 font-normal">
                      / {currentModel.priceUsd}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <a
                    href="#specifications"
                    onClick={() => sfx.playClick()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white font-mono text-xs uppercase font-bold transition-all hover:scale-105 shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW DOSSIER</span>
                  </a>

                  <a
                    href="#configurator"
                    onClick={() => sfx.playClick()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs uppercase font-bold shadow-[0_0_25px_rgba(228,0,43,0.45)] hover:shadow-[0_0_35px_rgba(228,0,43,0.7)] hover:scale-105 transition-all duration-300"
                  >
                    <Sliders className="w-3.5 h-3.5 text-white" />
                    <span>CUSTOMIZE IN ATELIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
