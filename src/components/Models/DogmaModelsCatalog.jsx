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
    tagline: 'DESIGN THE EXCEPTIONAL • WORLDTOUR SUPREMACY',
    description:
      'The definitive benchmark of competitive road racing. Equipped with Shimano’s ultra-rapid 12-speed semi-wireless electronic transmission, FC-R9200-P integrated dual-sided power meter, and Princeton Peak 4550 / DT Swiss ARC 1400 carbon wheels, engineered for instantaneous power response.',
    groupset: 'Shimano Dura-Ace Di2 R9270 12S Wireless + FC-R9200-P Power',
    brakes: 'Shimano Dura-Ace BR-R9270 Hydraulic Flat Mount with Onda Flap™',
    wheels: 'Princeton Peak 4550 DB / DT Swiss ARC 1400 50mm Carbon',
    cockpit: 'MOST Talon Ultra Fast Integrated Carbon 1K',
    saddle: 'MOST Lynx Ultrafast Carbon 145mm',
    weight: '6.77 kg',
    weightLbs: '14.92 lbs',
    priceEur: '€14,800',
    priceUsd: '$15,500',
    badge: 'DESIGN THE EXCEPTIONAL',
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
    mainImage: 'https://pinarello.com/storage/Variant/4d02f3c52fbbb17f6bda27c7f732a754.png',
    colorways: [
      {
        name: 'Cobalt Phantom',
        code: 'E122',
        swatchImg: null,
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/4d02f3c52fbbb17f6bda27c7f732a754.png',
      },
      {
        name: 'Luxter Blue Shiny',
        code: 'E122-S',
        swatchImg: null,
        colorHex: '#1E40AF',
        accentGlow: 'rgba(30, 64, 175, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #1E40AF 0%, #60A5FA 50%, #0F172A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/13276f1037ade22fed59c48b651dce60.png',
      },
      {
        name: 'Phantom Ice',
        code: 'E121-ICE',
        swatchImg: null,
        colorHex: '#E2E8F0',
        accentGlow: 'rgba(226, 232, 240, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #1E293B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/9f976ca9146169c56fc5a16d5e880941.png',
      },
      {
        name: 'Molten Sand',
        code: 'E126',
        swatchImg: null,
        colorHex: '#C5832B',
        accentGlow: 'rgba(197, 131, 43, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #C5832B 0%, #F59E0B 50%, #1C1917 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/91ffed894ed26265eacc590f1c413189.png',
      },
      {
        name: 'Luxter Grey Matt',
        code: 'E127',
        swatchImg: null,
        colorHex: '#8A8D91',
        accentGlow: 'rgba(138, 141, 145, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #8A8D91 0%, #52525B 50%, #18181B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/824d5fa105e1bf4bf993c37ab08bac89.png',
      },
      {
        name: 'Luxter Amber',
        code: 'E128',
        swatchImg: null,
        colorHex: '#D97706',
        accentGlow: 'rgba(217, 119, 6, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 50%, #292524 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/c1f7333957eae5fe6bef0c2dd6b13088.png',
      },
      {
        name: 'Luxter Turquoise',
        code: 'E129',
        swatchImg: null,
        colorHex: '#00A896',
        accentGlow: 'rgba(0, 168, 150, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #00A896 0%, #06B6D4 50%, #083344 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/c2bb4d5c6af179c53c0de3d0b6d44859.png',
      },
      {
        name: 'Starry Red',
        code: 'E120-R',
        swatchImg: null,
        colorHex: '#DC2626',
        accentGlow: 'rgba(220, 38, 38, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #450A0A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/be33d7bc2fefd4ffcad7c383b7253dcb.png',
      },
      {
        name: 'Luxter Blue',
        code: 'E122-B',
        swatchImg: null,
        colorHex: '#2563EB',
        accentGlow: 'rgba(37, 99, 235, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 50%, #0F172A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2e3e79a1fbe40a90f7c0f1e9d0a7827f.png',
      },
      {
        name: 'Luxter Red Gold',
        code: 'E120',
        swatchImg: null,
        colorHex: '#9E0018',
        accentGlow: 'rgba(158, 0, 24, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/9cb3b45127f236db100f6e774fee1655.png',
      },
      {
        name: 'Luxter Venice',
        code: 'E122-V',
        swatchImg: null,
        colorHex: '#1D3557',
        accentGlow: 'rgba(29, 53, 87, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #1D3557 0%, #457B9D 50%, #0B132B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/31d2b1ac4cd5fd339fa27639fcbef8ba.png',
      },
      {
        name: 'Edge Crystal White',
        code: 'E121',
        swatchImg: null,
        colorHex: '#FFFFFF',
        accentGlow: 'rgba(255, 255, 255, 0.4)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/c5a5fa361adca9981bafc4510388c9d4.png',
      },
      {
        name: 'Black on Black (BOB)',
        code: 'E123',
        swatchImg: null,
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/5f50df702e278da3f5a1bd91f81f7bdb.png',
      },
      {
        name: 'Aurik Yellow',
        code: 'E125',
        swatchImg: null,
        colorHex: '#EAB308',
        accentGlow: 'rgba(234, 179, 8, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #EAB308 0%, #FDE047 50%, #1C1917 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/b996caf01dc7d017caa2895dbdf9b2bd.png',
      },
    ],
  },
  {
    id: 'sram-red-axs',
    index: '02',
    name: 'DOGMA F SRAM RED ETAP AXS',
    shortName: 'SRAM RED AXS',
    brand: 'SRAM',
    tagline: 'PURE WIRELESS INTELLIGENCE • RAZOR-SHARP RESPONSE',
    description:
      'Completely wireless electronic 12-speed perfection with intuitive eTap shift logic and Quarq DZero integrated power spider, paired with ultra-light Princeton Peak 4550 / DT Swiss ARC 1400 carbon wheels for hill climbs and high-wattage bunch sprints.',
    groupset: 'SRAM RED AXS E-Tap 12S Wireless + Quarq DZero Power',
    brakes: 'SRAM RED HRD Flat Mount Hydraulic Disc',
    wheels: 'Princeton Peak 4550 DB / DT Swiss ARC 1400 50mm Carbon',
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
        title: 'ONDA FORK FLAP™ SRAM',
        desc: 'Custom caliper shroud optimized for SRAM Red flat-mount hydraulic calipers to eliminate localized wake separation.',
        x: '20%',
        y: '58%',
      },
      {
        id: 'cockpit',
        title: 'WIRELESS COCKPIT BLIPS',
        desc: 'Wireless satellite sprint shifters integrated into the drop bends of the Most Talon 1K handlebar.',
        x: '34%',
        y: '22%',
      },
      {
        id: 'frame',
        title: 'SLIMMER TOP TUBE (-8MM)',
        desc: 'Narrowed head tube and nose profile reduces frontal area by 8mm, saving 0.2W per km at racing speeds.',
        x: '52%',
        y: '42%',
      },
      {
        id: 'bb',
        title: 'AERO-KEEL 3.5° BB',
        desc: 'Rotated aerodynamic bottom bracket keel cleans airflow around the front chainrings and power meter spider.',
        x: '56%',
        y: '68%',
      },
    ],
    mainImage: 'https://pinarello.com/storage/Variant/e5063f1f8b57062e2c58d2bde7e61a4d.png',
    colorways: [
      {
        name: 'Luxter Turquoise',
        code: 'E129',
        swatchImg: null,
        colorHex: '#00A896',
        accentGlow: 'rgba(0, 168, 150, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #00A896 0%, #06B6D4 50%, #083344 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/e5063f1f8b57062e2c58d2bde7e61a4d.png',
      },
      {
        name: 'Luxter Blue Shiny',
        code: 'E122-S',
        swatchImg: null,
        colorHex: '#1E40AF',
        accentGlow: 'rgba(30, 64, 175, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #1E40AF 0%, #60A5FA 50%, #0F172A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/375894c215a3e5323c6eeaf9ab858caf.png',
      },
      {
        name: 'Luxter Amber',
        code: 'E128',
        swatchImg: null,
        colorHex: '#D97706',
        accentGlow: 'rgba(217, 119, 6, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 50%, #292524 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2d862fe1d3682087fc9024f725292e4a.png',
      },
      {
        name: 'Luxter Grey Matt',
        code: 'E127',
        swatchImg: null,
        colorHex: '#8A8D91',
        accentGlow: 'rgba(138, 141, 145, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #8A8D91 0%, #52525B 50%, #18181B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/26ebceacac61796c5dfa7da851818e16.png',
      },
      {
        name: 'Obsidian Emerald',
        code: 'E130',
        swatchImg: null,
        colorHex: '#0D5C3A',
        accentGlow: 'rgba(13, 92, 58, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #0D5C3A 0%, #10B981 50%, #041F14 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/659c3cbc607d21ff2d8c5127b81c6a3d.png',
      },
      {
        name: 'Molten Sand',
        code: 'E126',
        swatchImg: null,
        colorHex: '#C5832B',
        accentGlow: 'rgba(197, 131, 43, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #C5832B 0%, #F59E0B 50%, #1C1917 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/375f7fa9eb52806a77181d5512edb12c.png',
      },
      {
        name: 'Cobalt Phantom',
        code: 'E122',
        swatchImg: null,
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/7840284bc77f656a1fd75efa969416c3.png',
      },
      {
        name: 'Luxter Blue',
        code: 'E122-B',
        swatchImg: null,
        colorHex: '#2563EB',
        accentGlow: 'rgba(37, 99, 235, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 50%, #0F172A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/5c88324eb5a5d97560ee550d1f9a36b0.png',
      },
      {
        name: 'Luxter Red Gold',
        code: 'E120',
        swatchImg: null,
        colorHex: '#9E0018',
        accentGlow: 'rgba(158, 0, 24, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #9E0018 0%, #D4AF37 50%, #07080A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/95b624eefcabdc9fba56e9bebd6bb931.png',
      },
      {
        name: 'Luxter Venice',
        code: 'E122-V',
        swatchImg: null,
        colorHex: '#1D3557',
        accentGlow: 'rgba(29, 53, 87, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #1D3557 0%, #457B9D 50%, #0B132B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/7345d045ad7c6b13ea5457a1998ca5bc.png',
      },
      {
        name: 'Edge Crystal White',
        code: 'E121',
        swatchImg: null,
        colorHex: '#FFFFFF',
        accentGlow: 'rgba(255, 255, 255, 0.4)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #0F1218 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/e33a5b46c2fc41cc71bab31ad995aeee.png',
      },
      {
        name: 'Black on Black (BOB)',
        code: 'E123',
        swatchImg: null,
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2a3ef84437955e23a663b502a7d4241f.png',
      },
      {
        name: 'Aurik Yellow',
        code: 'E125',
        swatchImg: null,
        colorHex: '#EAB308',
        accentGlow: 'rgba(234, 179, 8, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #EAB308 0%, #FDE047 50%, #1C1917 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/7193066a2ccdf63fcf0a1649b2b8fdd4.png',
      },
    ],
  },
  {
    id: 'pq3-replica',
    index: '03',
    name: 'DOGMA F PQ3 TEAM REPLICA',
    shortName: 'PQ3 REPLICA',
    brand: 'LIMITED ARCHIVE',
    tagline: 'COMMEMORATIVE PODIUM RACING REPLICA • LIMITED EDITION',
    description:
      'Created in reverence to Treviso’s historic racing triumphs and WorldTour podium domination. Featuring custom stealth carbon raw weave aesthetics, MOST Ultrafast 45 carbon wheels, and bespoke titanium hardware accents.',
    groupset: 'Shimano Dura-Ace Di2 R9270 12S Special Edition + Pro Telemetry',
    brakes: 'Integrated Flat Mount Disc with Titanium Hardware & Onda Flap™',
    wheels: 'MOST Ultrafast 45 Full Carbon / DT Swiss ARC 1100 Dicut 50',
    cockpit: 'MOST Talon Ultra Fast Integrated Carbon 1K Custom PQ3',
    saddle: 'MOST Lynx Carbon PQ3 Commemorative Edition',
    weight: '6.78 kg',
    weightLbs: '14.95 lbs',
    priceEur: '€16,200',
    priceUsd: '$16,900',
    badge: 'LIMITED ARCHIVE',
    badgeColor: '#00F0FF',
    finishCode: 'DF-PQ3-LTD',
    telemetry: {
      powerEfficiency: 99.2,
      aeroDelta: -4.9,
      stiffness: 395,
      lateralCompliance: 95.0,
    },
    hotspots: [
      {
        id: 'fork',
        title: 'ONDA 47MM FORK PQ3',
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
    mainImage: 'https://pinarello.com/storage/Variant/192c9c133ebcd0197f2438f6e1574b84.png',
    colorways: [
      {
        name: 'Team PQ3 Replica Livery',
        code: 'PQ3-LTD',
        swatchImg: null,
        colorHex: '#00F0FF',
        accentGlow: 'rgba(0, 240, 255, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #00F0FF 0%, #D4AF37 50%, #0A0C10 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/192c9c133ebcd0197f2438f6e1574b84.png',
      },
      {
        name: 'PQ3 Bob Stealth Carbon',
        code: 'PQ3-BOB',
        swatchImg: null,
        colorHex: '#27272A',
        accentGlow: 'rgba(63, 63, 70, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #3F3F46 0%, #18181B 50%, #050507 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/2512612cda2a7990b42cdbd74d6fd6fb.png',
      },
    ],
  },
  {
    id: 'ineos-replica',
    index: '04',
    name: 'DOGMA F INEOS TEAM REPLICA',
    shortName: 'INEOS REPLICA',
    brand: 'WORLDTOUR',
    tagline: 'OFFICIAL WORLDTOUR TEAM RACING SPEC',
    description:
      'The identical machine ridden across the 21 stages of the Tour de France and Giro d’Italia. Complete with FC-R9200-P integrated dual-sided power meter, Shimano Dura-Ace C50 WorldTour wheels, and pro team livery graphics.',
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
    badgeColor: '#9f8d5e',
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
    mainImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
    colorways: [
      {
        name: 'INEOS WorldTour Team Livery',
        code: 'E124',
        swatchImg: null,
        colorHex: '#9f8d5e',
        accentGlow: 'rgba(159, 141, 94, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #9f8d5e 0%, #989c98 50%, #2d2c2d 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/efc4353d2dac3a9f530ec465fb24fce3.png',
      },
      {
        name: 'INEOS Grand Tour Champion',
        code: 'E124-GT',
        swatchImg: null,
        colorHex: '#9f8d5e',
        accentGlow: 'rgba(159, 141, 94, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #9f8d5e 0%, #989c98 50%, #2d2c2d 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/94f31784affde4307c160af60a57e597.png',
      },
    ],
  },
  {
    id: 'super-record-13',
    index: '05',
    name: 'DOGMA F SUPER RECORD 13',
    shortName: 'SUPER RECORD 13S',
    brand: 'CAMPAGNOLO',
    tagline: 'ALL-ITALIAN HERITAGE & 13-SPEED WIRELESS PERFECTION',
    description:
      'The pure embodiment of Italian cycling aristocracy. Campagnolo Super Record Wireless 13-speed groupset with HPPM spider power meter, harmonized with Campagnolo Bora Ultra WTO 45 carbon wheels for unmatched road acoustics and mechanical feel.',
    groupset: 'Campagnolo Super Record Wireless 13S + HPPM Power',
    brakes: 'Campagnolo Hydraulic Ergopower 160mm/140mm Disc',
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
    mainImage: 'https://pinarello.com/storage/Variant/24bf579547d3dce4f708642ec7d1bb66.png',
    colorways: [
      {
        name: 'Gunmetal Black 2025',
        code: 'E131',
        swatchImg: null,
        colorHex: '#4A4E54',
        accentGlow: 'rgba(74, 78, 84, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #4A4E54 0%, #282A2E 50%, #0D0E10 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/24bf579547d3dce4f708642ec7d1bb66.png',
      },
      {
        name: 'Luxter Turquoise',
        code: 'E129',
        swatchImg: null,
        colorHex: '#00A896',
        accentGlow: 'rgba(0, 168, 150, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #00A896 0%, #06B6D4 50%, #083344 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/a5b19a120054562e75503897874c4333.png',
      },
      {
        name: 'Luxter Blue Shiny',
        code: 'E122-S',
        swatchImg: null,
        colorHex: '#1E40AF',
        accentGlow: 'rgba(30, 64, 175, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #1E40AF 0%, #60A5FA 50%, #0F172A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/0c010a81ecc9e935f8ff5b9dbbbf6609.png',
      },
      {
        name: 'Luxter Amber',
        code: 'E128',
        swatchImg: null,
        colorHex: '#D97706',
        accentGlow: 'rgba(217, 119, 6, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 50%, #292524 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/c4d8dd9334d47f9f73e06d2751044475.png',
      },
      {
        name: 'Luxter Grey Matt',
        code: 'E127',
        swatchImg: null,
        colorHex: '#8A8D91',
        accentGlow: 'rgba(138, 141, 145, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #8A8D91 0%, #52525B 50%, #18181B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/849377ea982b053de48d28411b5c9c51.png',
      },
      {
        name: 'Obsidian Emerald',
        code: 'E130',
        swatchImg: null,
        colorHex: '#0D5C3A',
        accentGlow: 'rgba(13, 92, 58, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #0D5C3A 0%, #10B981 50%, #041F14 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/0c78019f73420d49cc040a8304e4d4ba.png',
      },
      {
        name: 'Cobalt Phantom',
        code: 'E122',
        swatchImg: null,
        colorHex: '#0B3C95',
        accentGlow: 'rgba(11, 60, 149, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #0B3C95 0%, #00D2FF 50%, #06070A 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/10b7c6c252a8e588e985a9421c7ed4c7.png',
      },
      {
        name: 'Phantom Ice',
        code: 'E121-ICE',
        swatchImg: null,
        colorHex: '#E2E8F0',
        accentGlow: 'rgba(226, 232, 240, 0.45)',
        swatchGradient: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #1E293B 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/0e76207b31aa172489d74686560bcebe.png',
      },
      {
        name: 'Molten Sand',
        code: 'E126',
        swatchImg: null,
        colorHex: '#C5832B',
        accentGlow: 'rgba(197, 131, 43, 0.55)',
        swatchGradient: 'linear-gradient(135deg, #C5832B 0%, #F59E0B 50%, #1C1917 100%)',
        bikeImage: 'https://pinarello.com/storage/Variant/73476156fb391a7b4fec83416ea95e26.png',
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
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0e1322] via-[#151c2e] to-[#0f1423] border-t border-white/[0.08]"
    >
      {/* --- LAYER 1: CINEMATIC REFINED STUDIO BACKDROP --- */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full blur-[180px] pointer-events-none opacity-20 transition-all duration-1000 ease-out"
        style={{ backgroundColor: currentColorway.colorHex || '#9f8d5e' }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-white/[0.035] rounded-full blur-[180px] pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[200px] pointer-events-none transition-all duration-1000 ease-out opacity-20"
        style={{ backgroundColor: currentColorway.colorHex || '#9f8d5e' }}
      />

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
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 pb-4 border-b border-white/10 mb-8 font-mono text-[11px] tracking-[0.25em] text-zinc-400 uppercase text-center sm:text-left">
            <div className="flex items-center justify-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white font-bold text-[10px] border border-white/15 shrink-0">
                02
              </span>
              <span className="text-[#00F0FF] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                FACTORY REPERTORY
              </span>
              <span className="text-zinc-600">//</span>
              <span>TREVISO RACING DIVISION</span>
            </div>

            <div className="flex items-center justify-center gap-4 text-zinc-400 font-mono text-[10px]">
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 text-center lg:text-left items-center lg:items-start">
            <div className="max-w-2xl xl:max-w-3xl space-y-3 flex flex-col items-center lg:items-start w-full">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FF5E0E] font-bold text-center lg:text-left">
                FIVE MASTERWORK RACING CONFIGURATIONS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-2xl text-center lg:text-left">
                DISTINCTION IN{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 via-40% to-[#FF5E0E] drop-shadow-lg mt-1">
                  EVERY BUILD.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2 space-y-4 flex flex-col items-center lg:items-start w-full">
              <p className="text-sm sm:text-base text-zinc-300 font-sans font-light leading-relaxed text-center lg:text-left">
                Every Dogma F model is configured with zero compromises. Select your electronic groupset tier to inspect race-calibrated chassis telemetry, aerodynamics, and official paint finishes.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 font-mono text-[10px] text-zinc-400">
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
                className="absolute w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full blur-[130px] transition-all duration-700 pointer-events-none opacity-45"
                style={{
                  background: currentColorway.swatchGradient || currentColorway.colorHex || '#9f8d5e',
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
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-xl">
                  {currentModel.colorways.map((c, cIdx) => {
                    const isSelected = selectedColorwayIndex === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => handleSelectColorway(cIdx)}
                        onMouseEnter={() => sfx.playHover()}
                        className={`relative group w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border transition-all duration-300 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'scale-125 border-white ring-2 ring-[#00F0FF] ring-offset-2 ring-offset-black shadow-[0_0_20px_rgba(0,240,255,0.6)] z-10'
                            : 'border-white/25 opacity-75 hover:opacity-100 hover:scale-115 hover:border-white/60'
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
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
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
