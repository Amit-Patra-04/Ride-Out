import React, { useState, useEffect } from 'react';
import {
  Layers,
  Zap,
  Shield,
  Wind,
  Cpu,
  Sparkles,
  Check,
  Scale,
  Gauge,
  Activity,
  ArrowRight,
  SlidersHorizontal,
  CircleDot,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  MapPin,
  Building,
  Award,
  Crown,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Compass,
  Grid,
  ZoomIn,
  ZoomOut,
  Wrench,
  RotateCcw,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const OFFICIAL_SPECS_DATA = [
  {
    id: 'frame-fork',
    name: 'Frame & Fork Architecture',
    icon: Layers,
    badge: 'TORAYCA M40X CARBON',
    desc: 'The monocoque carbon foundation featuring eTICR internal routing and aero-keel geometry.',
    components: [
      {
        id: 'spec-frame',
        partCode: 'PIN-DOGMA-F-FRM-01',
        name: 'TorayCa M40X Monocoque Frame',
        spec: 'TorayCa M40X Carbon, TiCR™ Cable Routing, Italian BB',
        role: 'Main Chassis & Lateral Power Backbone',
        image: '/assets/specs/frame.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'TorayCa M40X Nanoalloy Reinforced Composite (392 GPa)',
        weight: '865 g (Size 53, unpainted)',
        torque: 'N/A (Monocoque Structure)',
        cdaDelta: '-0.0042 m² (vs Dogma F12)',
        isoRating: 'ISO 4210-6 Racing Homologated',
        highlight: '392 GPa Tensile Modulus • +12% Stiffness',
        dimensions: 'Available in 9 Pro-Fit Sizes (43.0 to 62.0)',
        engineeringNotes:
          'Utilizes TorayCa M40X high tensile modulus carbon fiber with Nanoalloy technology to maximize lateral rigidity during out-of-the-saddle sprint efforts while shaving weight.',
      },
      {
        id: 'spec-fork',
        partCode: 'PIN-ONDA-FRK-02',
        name: 'eTICR Onda Aero Fork with ForkFlap™',
        spec: 'NEW eTICR Onda Fork with ForkFlap™, 1.5\' upper and lower steerer',
        role: 'Front Aerodynamics & High-Speed Stability',
        image: '/assets/specs/fork.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'TorayCa T1100 1K & M40X Carbon',
        weight: '375 g (Uncut Steerer)',
        torque: '10.0 Nm (Thru-Axle Dropouts)',
        cdaDelta: '-3.2% Fork Area Drag',
        isoRating: 'ISO 4210-6 Impact Tested',
        highlight: '47mm Rake • Caliper Vortex Elimination',
        dimensions: '47mm Offset / 370mm Axle-to-Crown',
        engineeringNotes:
          'Features signature s-wave Onda damping profile with integrated ForkFlap fairings that smooth turbulent wake shedding from the front flat-mount hydraulic disc caliper.',
      },
      {
        id: 'spec-bottom-bracket',
        partCode: 'SHI-BB9200-ITA-03',
        name: 'Shimano Dura-Ace SM-BB9200 BB',
        spec: 'Shimano Dura Ace SM-BB9200, Italian Thread 70mm',
        role: 'Italian Threaded 70mm Bottom Bracket Shell',
        image: '/assets/specs/bottom_bracket.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBottomBracket/SM-BB92-41B-shic219-primary_1.jpg',
        material: 'Hardened Chrome Steel Ball Bearings + Aircraft Alloy Shell',
        weight: '54 g',
        torque: '35 - 50 Nm (Italian Threaded)',
        cdaDelta: '-1.2% (Housing Aero-Keel 3.5° Rotation)',
        isoRating: 'DIN 79100 Precision Spec',
        highlight: '70mm Italian Thread • Zero Creak Tolerance',
        dimensions: '70mm Shell Width / 36mm x 24 TPI',
        engineeringNotes:
          'Threaded Italian bottom bracket shell guarantees zero creaking, absolute bearing coaxiality, and tool-friendly WorldTour serviceability in all weather conditions.',
      },
      {
        id: 'spec-headset',
        partCode: 'PIN-TICR-HDS-04',
        name: 'eTICR Elliptical Headset Bearing Assembly',
        spec: 'Drop-in Bearing 1-1/8\' - 1.5\' (Internal routing)',
        role: 'Elliptical Steering Tube Bearing Assembly',
        image: '/assets/specs/headset.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Sealed Angular Contact Stainless Steel Bearings',
        weight: '62 g',
        torque: '4.5 Nm (Top Cap Preload)',
        cdaDelta: '-8 mm Frontal Nose Cone Width',
        isoRating: 'ISO 4210-2 Steering Certified',
        highlight: '8mm Narrower Frontal Width Profile',
        dimensions: '1-1/8" Upper / 1.5" Lower Differentiated Race',
        engineeringNotes:
          'Elliptical steerer configuration allows complete internal conduit passage for hydraulic hoses and Di2 electronic wiring without compromising steerer cross-sectional strength.',
      },
      {
        id: 'spec-seatpost',
        partCode: 'PIN-FLATBACK-SP-05',
        name: 'Pinarello Aero FlatBack Seatpost',
        spec: 'Pinarello Aero Seatpost with 3D printed Titanium Top Seatclamp',
        role: 'Integrated Aero Mast & Battery Retainer',
        image: '/assets/specs/seatpost.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'TorayCa Carbon & 3D Printed Titanium Ti-6Al-4V Clamp',
        weight: '165 g (350mm Length)',
        torque: '8.5 Nm (Seatpost Wedge Clamp)',
        cdaDelta: '-2.1% Truncated Profile Aero Gain',
        isoRating: 'ISO 4210-9 Fatigue Tested (100,000 Cycles)',
        highlight: 'Drag-Reducing FlatBack Aerofoil Profile',
        dimensions: '350mm Length / 15mm Setback',
        engineeringNotes:
          'Truncated aerofoil FlatBack cross-section meets UCI dimensional rules while providing vertical compliance over rough tarmac and housing the Shimano BT-DN300 battery internally.',
      },
      {
        id: 'spec-seat-clamp',
        partCode: 'PIN-FSC-WEDGE-06',
        name: 'FSC Concealed Frontal Seat Clamp',
        spec: 'FSC Frontal Seat Clamp, Integrated and Sealed',
        role: 'Concealed Aerodynamic Wedgelock System',
        image: '/assets/specs/seat_clamp.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Monocoque Wedge Assembly with Titanium Bolt',
        weight: '28 g',
        torque: '8.5 Nm (Max Torque Rating)',
        cdaDelta: 'Zero Boundary-Layer Vortex',
        isoRating: 'ISO 4210-9 Slip-Resistant Spec',
        highlight: '-35g Weight Reduction • Sweat Sealed',
        dimensions: 'Internal Flush Monocoque Cavity',
        engineeringNotes:
          'Frontal integrated seat clamp design is completely hidden inside top-tube junction with rubber silicone weather seal, preventing sweat ingress and eliminating external clamp drag.',
      },
      {
        id: 'spec-axles',
        partCode: 'FUL-AXL-12MM-07',
        name: 'Fulcrum Ultra Light Aero Thru-Axles',
        spec: 'Fulcrum Ultra Light Axles 12x100 & 12x142, tool-free removal',
        role: 'Flush-Integrated Aerodynamic Thru-Axles',
        image: '/assets/specs/axles.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Hard Anodized 7075-T6 Aircraft Billet Alloy',
        weight: '58 g (Pair: Front + Rear)',
        torque: '10 - 12 Nm (Thread Pitch M12x1.5)',
        cdaDelta: 'Concealed Blind-Hole Dropout Profile',
        isoRating: 'ISO 4210-4 Hub & Axle Spec',
        highlight: '100% Flush Embedded Dropout Blind Hole',
        dimensions: '12x100mm Front / 12x142mm Rear',
        engineeringNotes:
          'The right-side fork and rear dropout feature blind hole integration with zero exposed axle thread, optimizing boundary airflow and saving weight over quick-release levers.',
      },
      {
        id: 'spec-bottle-cage',
        partCode: 'PIN-TRAP-PACX-08',
        name: 'Trap Pacx Carbon Cage & Fly Bottle (550ml)',
        spec: 'Trap Pacx Bottle Cage, Fly Bottle Pinarello Bottle 550ml',
        role: 'Aero-Shielded Hydration System',
        image: '/assets/specs/bottle_cage.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'Injected Carbon Fiber Structure + BPA-Free Polypropylene',
        weight: '24 g (Cage) / 54 g (Bottle)',
        torque: '2.5 Nm (Titanium Torx Mount Bolts)',
        cdaDelta: 'Integrated Down Tube Airflow Recess',
        isoRating: 'FDA / EU Food Contact Compliant',
        highlight: 'Recessed Down Tube Airflow Harmonization',
        dimensions: '550 ml Capacity / Standard 74mm Dia',
        engineeringNotes:
          'Engineered in tandem with down tube aerodynamic keel profile to minimize air separation behind the front wheel and maintain laminar airflow toward the bottom bracket.',
      },
    ],
  },
  {
    id: 'drivetrain-cockpit',
    name: 'Drivetrain, Cockpit & Transmission',
    icon: Cpu,
    badge: 'SHIMANO DURA-ACE Di2 12S',
    desc: 'Wireless electronic shifting with dual power meter crankset and MOST 1K integrated cockpit.',
    components: [
      {
        id: 'spec-crankset',
        partCode: 'SHI-FC-R9200-P-09',
        name: 'Shimano Dura-Ace FC-R9200 Crankset',
        spec: 'Shimano Dura Ace FC-R9200, Hollowtech II 12S (50-34T / 54-40T)',
        role: 'Hollow Forged Power Transmission with Dual Strain Gauges',
        image: '/assets/specs/crankset.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICCrankset/FC-R9200-P-shic219-primary_1.jpg',
        material: 'Hollowtech II Duralumin Alloy + Reinforced Composite Outer Ring',
        weight: '752 g (With Dual Power Meter, 54/40T)',
        torque: '12 - 14 Nm (Pinch Bolts) / 40 Nm (Chainring Bolts)',
        cdaDelta: '99.4% Lateral Power Transfer Index',
        isoRating: 'ISO 4210-8 Fatigue Resistance',
        highlight: '99.4% Lateral Power Transfer Index',
        dimensions: '170 / 172.5 / 175mm Crank Lengths (110mm BCD 4-Arm)',
        engineeringNotes:
          'Hollow forged aluminum crankarms provide benchmark stiffness-to-weight ratio with dual-sided strain gauge power measurement accurate within ±1.5% at cadence up to 180 RPM.',
      },
      {
        id: 'spec-front-derailleur',
        partCode: 'SHI-FD-R9250-10',
        name: 'Shimano Dura-Ace Di2 FD-R9250 Derailleur',
        spec: 'Shimano Dura Ace Di2 FD-R9250 12S (Braze-on)',
        role: 'Ultra-Fast 0.12s Electronic Chain Lifter',
        image: '/assets/specs/front_derailleur.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICFrontDerailleur/FD-R9250-shic219-primary_1.jpg',
        material: 'Aluminum Cage + Carbon-Fiber Reinforced Polymer Linkages',
        weight: '96 g',
        torque: '5.0 Nm (Braze-On Clamp Bolt)',
        cdaDelta: '-45% Shift Response Latency',
        isoRating: 'IPX8 Waterproof Submersible',
        highlight: '45% Faster Front Shift Speed vs R9150',
        dimensions: 'Capacity: 16T / Top Chainring: 50-55T',
        engineeringNotes:
          'Direct-drive internal stepper motor executes chain shifts between inner and outer chainrings in just 0.12 seconds with auto-trim to eliminate chain rub across all 24 gear ratios.',
      },
      {
        id: 'spec-rear-derailleur',
        partCode: 'SHI-RD-R9250-11',
        name: 'Shimano Dura-Ace Di2 RD-R9250 Shadow RD',
        spec: 'Shimano Dura Ace Di2 RD-R9250 12S Shadow',
        role: 'Integrated Central Charging Port & Wireless Master Brain',
        image: '/assets/specs/rear_derailleur.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICRearDerailleur/RD-R9250-shic219-primary_1.jpg',
        material: 'Carbon Composite Cage + Cold Forged Alloy Links',
        weight: '215 g',
        torque: '8 - 10 Nm (Direct Hanger Mount)',
        cdaDelta: 'Low-Profile Shadow Aerofoil Geometry',
        isoRating: 'IPX8 Waterproof Electronic Enclosure',
        highlight: 'Direct Mount Derailleur Hanger Interface',
        dimensions: 'Max Cog: 34T / Min Cog: 11T / Total Cap: 37T',
        engineeringNotes:
          'Houses the central Di2 wireless antenna (ANT+ / Bluetooth LE), LED mode indicator, and magnetic charging port in a low-profile Shadow geometry tucked inboard against crash damage.',
      },
      {
        id: 'spec-cassette',
        partCode: 'SHI-CS-R9200-12',
        name: 'Shimano Dura-Ace CS-R9200 12-Speed Cassette',
        spec: 'Shimano Dura Ace CS-R9200 12S (11-30T / 11-34T)',
        role: 'Hyperglide+ Titanium & Steel Sprocket Cluster',
        image: '/assets/specs/cassette.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICCassetteSprocket/CS-R9200-12-shic219-primary_1.jpg',
        material: 'Titanium (5 Largest Cogs) + Nickel-Plated Steel + Carbon Spider',
        weight: '223 g (11-30T) / 253 g (11-34T)',
        torque: '35 - 50 Nm (Lockring Torque)',
        cdaDelta: 'Hyperglide+ Ramp Shift Synchronization',
        isoRating: 'DIN 79100 Drivetrain Spec',
        highlight: 'Seamless Shifting under 1,500W Sprint Load',
        dimensions: '11-12-13-14-15-16-17-19-21-24-27-30T',
        engineeringNotes:
          'Hyperglide+ ramp technology guides the chain simultaneously upward and downward, allowing seamless shifting under maximum 1,500W sprint wattages without backing off pedal pressure.',
      },
      {
        id: 'spec-chain',
        partCode: 'SHI-CN-M9100-13',
        name: 'Shimano Dura-Ace CN-M9100 12S Drive Chain',
        spec: 'Shimano Dura Ace CN-M9100 12S with Quick-Link',
        role: 'Chromized Roller Precision Drive Link',
        image: '/assets/specs/chain.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICChain/CN-M9100-shic219-primary_1.jpg',
        material: 'SIL-TEC Fluorine Coating + Hollow Chromium Steel Pins',
        weight: '242 g (114 Links)',
        torque: 'N/A (Quick-Link One-Way Tool Install)',
        cdaDelta: '-3.8W Friction Power Loss vs Standard Steel',
        isoRating: 'ISO 606 Precision Chain Standard',
        highlight: 'Ultra-Low Friction & Extended Wear Life',
        dimensions: '1/2" x 11/128" / 12-Speed Specific Pitch',
        engineeringNotes:
          'SIL-TEC advanced surface fluoropolymer plating on plates and rollers reduces drivetrain drag by 3.8 Watts while extending service life across wet and dusty spring classics.',
      },
      {
        id: 'spec-handlebar',
        partCode: 'PIN-TALON-ULTRA-14',
        name: 'MOST Talon Ultra Fast Integrated Carbon 1K',
        spec: 'MOST Talon Ultra Fast Integrated Carbon 1K Cockpit',
        role: '1-Piece Aero Bar with 100% Internal TiCR Routing',
        image: '/assets/specs/handlebar.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'TorayCa 1K High Modulus Carbon Monocoque',
        weight: '315 g (110mm Stem / 42cm Width)',
        torque: '5.0 Nm (Stem Steerer Clamp) / 5.0 Nm (Shifter Clamps)',
        cdaDelta: '-5.0W Cockpit Aero Drag Savings',
        isoRating: 'ISO 4210-5 Handlebar Drop Test Certified',
        highlight: '315g Weight • 7° Sprint Flare Drops',
        dimensions: '16 Stem/Bar Size Variations (90/400 to 140/460)',
        engineeringNotes:
          'Aerodynamic wing section with integrated computer mount channel, 7° flared drops for sprint forearm clearance, and 100% concealed TiCR internal routing channels.',
      },
      {
        id: 'spec-handlebar-tape',
        partCode: 'MOST-ULTRAGRIP-15',
        name: 'MOST Ultragrip Evo 3mm High-Tack Bar Tape',
        spec: 'MOST Ultragrip Evo 3mm High-Tack Damping Wrap',
        role: 'Micro-Perforated Vibration Damping Bar Wrap',
        image: '/assets/specs/handlebar_tape.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'High-Density EVA Polymer Core + Polyurethane Hydrophobic Outer',
        weight: '68 g (Pair with Bar End Plugs)',
        torque: 'N/A (Adhesive Silicon Backing)',
        cdaDelta: '+28% High-Frequency Road Vibration Absorption',
        isoRating: 'Hypoallergenic WorldTour Grade',
        highlight: 'All-Weather Tactile Wet Control',
        dimensions: '3.0mm Thickness / 210cm Length Per Roll',
        engineeringNotes:
          'Features a graduated 3.0mm thickness with micro-diamond grip texture, providing non-slip tactile traction when riding without gloves in torrential rain or high humidity.',
      },
      {
        id: 'spec-saddle',
        partCode: 'MOST-LYNX-SUPERFLOW-16',
        name: 'MOST Lynx Ultrafast Superflow L Carbon',
        spec: 'MOST Lynx Ultrafast Superflow L Carbon Saddle (145mm)',
        role: 'Short-Fit Pressure Relieving Racing Saddle',
        image: '/assets/specs/saddle.jpg',
        fallbackImage: 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
        material: 'CarboKeramic 7x9mm Oval Rails + Carbon Reinforced Shell',
        weight: '129 g',
        torque: '8.0 Nm (Seatpost Saddle Rail Clamp)',
        cdaDelta: 'Optimized Forward Pelvic Rotation',
        isoRating: 'ISO 4210-9 Saddle Impact Homologation',
        highlight: '129g Featherweight • Superflow Cutout',
        dimensions: '245mm Length x 145mm Width (Short Fit)',
        engineeringNotes:
          'Short nose design with full central Superflow anatomical cutout alleviates soft-tissue pressure during aggressive in-the-drops aero positioning on high-power breakaways.',
      },
    ],
  },
  {
    id: 'brakes-wheels',
    name: 'Braking Systems, Wheels & Tires',
    icon: Wind,
    badge: 'PRINCETON PEAK 4550 & DURA-ACE DISC',
    desc: 'Hydraulic disc braking with Freeza heat dissipation and sinusoidal carbon aero wheels.',
    components: [
      {
        id: 'spec-front-brake',
        partCode: 'SHI-BR-R9270-F-17',
        name: 'Dura-Ace BR-R9270 Front Hydraulic Caliper & RT-CL900',
        spec: 'Dura Ace BR-R9270 Flat-Mount 2-Piston Caliper + 160mm Ice-Tech Rotor',
        role: 'Flat-Mount Hydraulic Disc with Servo Wave Action',
        image: '/assets/specs/front_brake.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICBrake/cg4SHICBrakeCaliper/BR-R9270-F-shic219-primary_1.jpg',
        material: 'Mono-Block Forged Aluminum Caliper + Ice-Tech 3-Layer Alloy Rotor',
        weight: '107 g (Caliper) / 114 g (160mm Rotor)',
        torque: '6.0 - 8.0 Nm (Flat-Mount Screws) / 40 Nm (CenterLock Ring)',
        cdaDelta: '-30% Rotor Heat Fade under High Alpine Descents',
        isoRating: 'ISO 4210-4 High-Speed Braking Homologated',
        highlight: '160mm CenterLock Ice-Tech Freeza Rotor',
        dimensions: 'Flat Mount Standard / 160mm Rotor Disc',
        engineeringNotes:
          'Mono-block construction prevents caliper body flex under maximum braking deceleration, combined with 10% wider pad clearance to eliminate rotor rub during out-of-the-saddle climbing.',
      },
      {
        id: 'spec-rear-brake',
        partCode: 'SHI-BR-R9270-R-18',
        name: 'Dura-Ace BR-R9270 Rear Hydraulic Caliper & RT-CL900',
        spec: 'Dura Ace BR-R9270 Flat-Mount 2-Piston Caliper + 140mm Ice-Tech Rotor',
        role: 'Flat-Mount Hydraulic Disc Integrated Rear Assembly',
        image: '/assets/specs/rear_brake.jpg',
        fallbackImage: 'https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/products/cg2SHICComponent/cg3SHICDiscBrakeRotor/cg4SHICDiscBrakeRotor/RT-CL900-140-shic219-primary_1.jpg',
        material: 'Mono-Block Forged Aluminum Caliper + Ice-Tech Freeza Rotor',
        weight: '98 g (Caliper) / 96 g (140mm Rotor)',
        torque: '6.0 - 8.0 Nm (Flat-Mount Screws) / 40 Nm (CenterLock Ring)',
        cdaDelta: 'Low Noise Resin Fin Pad Dissipation',
        isoRating: 'ISO 4210-4 High-Speed Braking Homologated',
        highlight: '140mm Low-Profile Rotor for Modulated Control',
        dimensions: 'Flat Mount Standard / 140mm Rotor Disc',
        engineeringNotes:
          'Aero-profile rear disc assembly delivers modulated deceleration on technical descents with specialized resin cooling pads that maintain consistent hydraulic bite points at 300°C.',
      },
      {
        id: 'spec-wheelset',
        partCode: 'PCW-PEAK4550-DB-19',
        name: 'PRINCETON CARBONWORKS PEAK 4550 DB Wheelset',
        spec: 'Princeton CarbonWorks Peak 4550 Sinusoidal Carbon Clincher/Tubeless',
        role: 'Sinusoidal Aerodynamic High-Power Wheelset',
        image: '/assets/specs/wheelset.jpg',
        fallbackImage: 'https://roadbikeaction.com/wp-content/uploads/2021/06/Princeton-Carbonworks-Peak-4550-cross-scaled.jpg',
        material: 'Variable-Depth Full High-Modulus Carbon Rim + Sapim CX-Ray Bladed Spokes',
        weight: '1,280 g (Complete Wheelset Pair with Tactic Racing Hubs)',
        torque: '10 Nm (Thru-Axles) / 40 Nm (Cassette Freehub)',
        cdaDelta: '-8.6W Wheel Aerodynamic Drag in Crosswinds',
        isoRating: 'UCI Homologated Racing Wheelset',
        highlight: '45-50mm Wave Depth • Disc Brake Optimized',
        dimensions: '45-50mm Variable Depth / 21mm Internal / 26mm External',
        engineeringNotes:
          'Proprietary sinusoidal undulating rim depth (varying smoothly between 45mm and 50mm) eliminates turbulent crosswind stall vortices while maintaining supreme rotational stiffness.',
      },
      {
        id: 'spec-tires',
        partCode: 'CONTI-GP5000S-TR-20',
        name: 'Continental Grand Prix 5000 S TR 28-622 Tires',
        spec: 'Continental Grand Prix 5000 S TR 700x28c Tubeless Ready',
        role: 'Tubeless-Ready WorldTour Racing Rubber',
        image: '/assets/specs/tires.jpg',
        fallbackImage: 'https://www.continental-tires.com/adobe/dynamicmedia/deliver/dm-aid--1d78b7a8-16ea-4800-b280-7897c9676b22/Continental_Grand-Prix-5000-S-TR_ChristopherLanaway_Lifestyle_32.jpg?width=600',
        material: 'BlackChili Synthetic / Natural Rubber Matrix + Vectran Breaker Ply',
        weight: '280 g (Per Tire)',
        torque: 'Max 94 PSI (Tubeless Hooked) / 73 PSI (Hookless Rim)',
        cdaDelta: '-20% Rolling Resistance (Crr = 0.0028)',
        isoRating: 'ISO 5775 Bicycle Tire Standard',
        highlight: '700x28c Width • Unsurpassed Cornering Grip',
        dimensions: '28-622 (700 x 28c) / Hookless & Hooked Compatible',
        engineeringNotes:
          'Lighter, faster, and with reinforced sidewall protection. BlackChili compound bonds at microscopic polymer level to deliver cornering confidence in wet mountain conditions.',
      },
    ],
  },
  {
    id: 'warranty-importer',
    name: 'Authenticity, Warranty & Importer',
    icon: Shield,
    badge: 'GENUINE PRODUCT & SERVICE',
    desc: 'Official warranty coverage, import documentation, and customer care support.',
    components: [],
  },
];

export const DogmaSpecs = () => {
  const [activeTab, setActiveTab] = useState(OFFICIAL_SPECS_DATA[0].id);
  const [selectedCompModal, setSelectedCompModal] = useState(null);
  const [blueprintGridOverlay, setBlueprintGridOverlay] = useState(true);
  const [activeModalTab, setActiveModalTab] = useState('overview'); // overview, torque, materials

  const selectedCategory =
    OFFICIAL_SPECS_DATA.find((c) => c.id === activeTab) || OFFICIAL_SPECS_DATA[0];

  // Disable background scroll when modal is open
  useEffect(() => {
    if (selectedCompModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCompModal]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCompModal) return;
      if (e.key === 'Escape') {
        setSelectedCompModal(null);
      } else if (e.key === 'ArrowRight') {
        handleNextComp();
      } else if (e.key === 'ArrowLeft') {
        handlePrevComp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCompModal, activeTab]);

  const handleNextComp = () => {
    if (!selectedCompModal || !selectedCategory.components.length) return;
    const currentIdx = selectedCategory.components.findIndex(
      (c) => c.id === selectedCompModal.id
    );
    const nextIdx = (currentIdx + 1) % selectedCategory.components.length;
    setSelectedCompModal(selectedCategory.components[nextIdx]);
    sfx.playClick();
  };

  const handlePrevComp = () => {
    if (!selectedCompModal || !selectedCategory.components.length) return;
    const currentIdx = selectedCategory.components.findIndex(
      (c) => c.id === selectedCompModal.id
    );
    const prevIdx =
      (currentIdx - 1 + selectedCategory.components.length) %
      selectedCategory.components.length;
    setSelectedCompModal(selectedCategory.components[prevIdx]);
    sfx.playClick();
  };

  return (
    <section
      id="specifications"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0e1321] via-[#131a29] to-[#0d121f] border-t border-white/[0.08]"
    >
      {/* --- LAYER 1: REFINED LUXURY AMBIENT BACKDROP --- */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-white/[0.035] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] bg-[#E4002B]/[0.035] rounded-full blur-[200px] pointer-events-none" />

      {/* Bespoke Blueprint Precision Calipers & Telemetry Guides */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="40%" r="480" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="50%" cy="40%" r="720" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="5%" y1="40%" x2="95%" y2="40%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="8 16" />
          <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="8 16" />
        </svg>
      </div>

      {/* Contained Architectural Watermark */}
      <div className="absolute top-12 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.025] sm:opacity-[0.03] leading-none font-display font-black tracking-tight">
        <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">BLUEPRINT</span>
        <span className="text-[8vw] sm:text-[7vw] md:text-[6vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-transparent -mt-[1.5vw]">
          SPECIFICATIONS
        </span>
      </div>

      {/* --- LAYER 2: INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* --- OFFICIAL QUOTE BANNER: ITALIAN HAUTE COUTURE --- */}
        <div className="relative mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-[#10141e]/90 border border-white/[0.12] backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 uppercase tracking-widest backdrop-blur-md shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#E4002B]" />
              <span>PINARELLO DESIGN PHILOSOPHY // TREVISO, ITALIA</span>
            </div>

            <p className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight">
              &ldquo;We don&rsquo;t distinguish between all-round and aero bikes. The Dogma F is designed to win on all terrains, combining unmatched stiffness with aerodynamic supremacy.&rdquo;
            </p>

            <div className="font-mono text-xs text-zinc-300 tracking-wider uppercase font-semibold">
              <span className="text-[#00F0FF]">Fausto Pinarello</span> — Chairman & Master Frame Builder
            </div>
          </div>

          {/* 3 Core Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4002B] shrink-0 animate-pulse shadow-[0_0_8px_#E4002B]" />
              <span className="text-zinc-200">
                Lightweight & aerodynamic wheels for instantaneous sprint torque transfer
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shrink-0 animate-pulse shadow-[0_0_8px_#00F0FF]" />
              <span className="text-zinc-200">
                Chassis geometry balanced for WorldTour acceleration and alpine stability
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] shrink-0 animate-pulse shadow-[0_0_8px_#D4FF00]" />
              <span className="text-zinc-200">
                Ultra-wide 12-speed electronic gear range for high-gradient climbing
              </span>
            </div>
          </div>
        </div>

        {/* --- SECTION HEADER: ARCHITECTURAL FLAGSHIP EDITORIAL --- */}
        <div className="relative z-10 mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-8 font-mono text-[11px] tracking-[0.25em] text-zinc-300 uppercase">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                04
              </span>
              <span className="text-[#00F0FF] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                TECHNICAL BLUEPRINT
              </span>
              <span className="text-zinc-500">//</span>
              <span className="text-zinc-200">EXHAUSTIVE FRAME SPECIFICATIONS</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 font-mono text-[10px]">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold backdrop-blur-md">
                12 FACTORY CATEGORIES
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-[#00F0FF] font-bold hidden sm:inline">
                UCI HOMOLOGATED 700C
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl xl:max-w-3xl space-y-3">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#E4002B] font-bold">
                FACTORY TOLERANCES & METRIC SPECIFICATIONS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-2xl">
                MINUTE SPECS &{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#E4002B] drop-shadow-lg mt-1">
                  ARCHITECTURE.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2 space-y-4">
              <p className="text-sm sm:text-base text-zinc-200 font-sans font-normal leading-relaxed">
                Explore complete mechanical specifications with uncropped visual component breakdowns, composite material layups, torque tolerances, and click-to-inspect blueprint telemetry.
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-zinc-300">
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  SHIMANO DURA-ACE
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  PRINCETON CARBON
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  TALON 1K COCKPIT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- QUICK SPEC SUMMARY BAR --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">INTENDED USE</span>
            <span className="font-display text-lg sm:text-xl font-black text-white mt-1">Road Racing</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">WHEEL SIZE</span>
            <span className="font-display text-lg sm:text-xl font-black text-white mt-1">700c (30mm max)</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">BRAKING SYSTEM</span>
            <span className="font-display text-lg sm:text-xl font-black text-white mt-1">Hydraulic Disc</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">FRAME MATERIAL</span>
            <span className="font-display text-lg sm:text-xl font-black text-[#E4002B] mt-1">TorayCa M40X</span>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-lg flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">FORK PROFILE</span>
            <span className="font-display text-lg sm:text-xl font-black text-zinc-200 mt-1">Onda 47mm Rake</span>
          </div>
        </div>

        {/* --- CATEGORY SELECTOR TABS --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {OFFICIAL_SPECS_DATA.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  sfx.playClick();
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 border backdrop-blur-xl ${
                  isActive
                    ? 'bg-[#E4002B] text-white font-bold border-[#E4002B] shadow-[0_0_25px_rgba(228,0,43,0.4)] scale-105'
                    : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* --- ACTIVE TAB: UNCROPPED BLUEPRINT COMPONENT CARDS --- */}
        {selectedCategory.id !== 'warranty-importer' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide flex items-center gap-2.5">
                  <span>{selectedCategory.name}</span>
                  <span className="text-xs font-mono text-cyan-400 font-normal px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    CLICK CARD TO INSPECT BLUEPRINT
                  </span>
                </h3>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">{selectedCategory.desc}</p>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 font-mono text-xs text-zinc-200 font-bold shadow-md">
                {selectedCategory.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {selectedCategory.components.map((comp, idx) => (
                <div
                  key={comp.id || idx}
                  onClick={() => {
                    setSelectedCompModal(comp);
                    sfx.playClick();
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.06] via-[#131929]/90 to-[#0e1422]/95 border border-white/[0.12] hover:border-cyan-500/50 backdrop-blur-3xl transition-all duration-300 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,240,255,0.15)]"
                >
                  {/* Visual Uncropped Component Canvas with Technical Blueprint Grid */}
                  <div className="relative w-full aspect-[4/3] bg-[radial-gradient(ellipse_at_center,_#182236_0%,_#0e1422_100%)] overflow-hidden flex items-center justify-center p-4 sm:p-5 border-b border-white/10 group-hover:border-cyan-500/30 transition-colors">
                    {/* Subtle CAD Blueprint Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />

                    {/* Corner Caliper Crosshairs */}
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-400/40 pointer-events-none select-none">
                      ┌ 0.00
                    </div>
                    <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400/40 pointer-events-none select-none">
                      1.00 ┐
                    </div>
                    <div className="absolute bottom-2 left-2 text-[8px] font-mono text-cyan-400/40 pointer-events-none select-none">
                      └ CAD
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-400/40 pointer-events-none select-none">
                      ISO ┘
                    </div>

                    {/* Part Code Badge Top Right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[8.5px] font-mono text-cyan-300 uppercase tracking-widest font-semibold backdrop-blur-md">
                        {comp.partCode ? comp.partCode.split('-').slice(-2).join('-') : `P-${idx + 1}`}
                      </span>
                    </div>

                    {/* Top Left Name Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/85 border border-white/20 text-white font-mono text-[9px] uppercase font-bold backdrop-blur-md shadow-md">
                        {comp.name.split(' ')[0]}
                      </span>
                    </div>

                    {/* Uncropped High-Fidelity Image Rendering */}
                    <img
                      src={comp.image}
                      alt={comp.name}
                      onError={(e) => {
                        if (comp.fallbackImage && e.currentTarget.src !== comp.fallbackImage) {
                          e.currentTarget.src = comp.fallbackImage;
                        } else {
                          e.currentTarget.src = 'https://pinarello.com/storage/thumbs/ProductFamily/2832__resize__af22b54a27abdb3ea30f29cccb5be987.jpg';
                        }
                      }}
                      className="w-full h-full max-h-[90%] max-w-[90%] object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:scale-108 transition-transform duration-500 ease-out z-10"
                    />

                    {/* Hover Inspect Magnifying Glass Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_#00F0FF]">
                        <Maximize2 className="w-3 h-3" />
                        INSPECT BLUEPRINT
                      </span>
                    </div>

                    {/* Bottom Technical Highlight Badge */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/85 border border-white/15 text-zinc-200 font-mono text-[8.5px] font-bold uppercase backdrop-blur-md shadow-lg truncate max-w-full">
                        <Zap className="w-2.5 h-2.5 text-[#E4002B] shrink-0" />
                        <span className="truncate">{comp.highlight}</span>
                      </span>
                    </div>
                  </div>

                  {/* Technical Details Footer */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[9.5px] font-mono text-cyan-400 uppercase tracking-widest mb-1 truncate font-bold flex items-center justify-between">
                        <span>{comp.role}</span>
                        {comp.weight && <span className="text-zinc-400 font-normal">{comp.weight.split(' ')[0]} {comp.weight.split(' ')[1]}</span>}
                      </div>
                      <h4 className="font-display text-sm sm:text-base font-extrabold text-white uppercase group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                        {comp.spec}
                      </h4>
                    </div>

                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10.5px]">
                      <span className="text-zinc-400 uppercase font-bold text-[9px]">MATERIAL</span>
                      <span className="text-zinc-200 font-semibold text-right truncate max-w-[150px]">
                        {comp.material.split('(')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* --- WARRANTY, EXCLUSIONS & IMPORTER AUTHENTICITY SECTION --- */
          <div className="space-y-8">
            {/* Warranty Certificate Card */}
            <div className="bg-gradient-to-b from-white/[0.04] via-[#090b0f]/90 to-[#07080a]/95 border border-white/[0.08] rounded-3xl p-6 sm:p-10 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                      Official Product Warranty & Authenticity
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono">
                      Genuine Pinarello factory warranty against manufacturing defects in materials and workmanship.
                    </p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-green-500/15 border border-green-500/40 text-green-300 font-mono text-xs font-bold uppercase shadow-sm">
                  100% GENUINE HOMOLOGATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-sm text-zinc-300">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 backdrop-blur-md">
                  <div className="font-mono text-xs text-white uppercase font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                    <span>Warranty Coverage & Terms</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    This is a genuine product covered by factory warranty from the date of original purchase against manufacturing defects in materials and workmanship.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-zinc-300 pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>Available exclusively to the original purchaser/buyer.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>Service must be performed by the Brand or an authorized reseller.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00F0FF] font-bold">•</span>
                      <span>Online frame registration extends factory warranty coverage to 5 years.</span>
                    </li>
                  </ul>
                </div>

                {/* Exclusions Summary */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 backdrop-blur-md">
                  <div className="font-mono text-xs text-white uppercase font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF5E0E]" />
                    <span>Standard Warranty Exclusions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed font-normal">
                    <li>• Misuse, improper installation, or unauthorized third-party alterations.</li>
                    <li>• Normal wear and tear, cosmetic scratches, dents, or natural weathering.</li>
                    <li>• Accidents, impacts, collisions, or exposure to extreme external forces.</li>
                    <li>• Water damage (water-repellant carbon construction, not submersible).</li>
                    <li>• Use of unapproved third-party accessories or incompatible fitments.</li>
                  </ul>
                </div>
              </div>

              {/* Importer & Customer Care Details */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 flex items-start gap-4">
                  <Building className="w-5 h-5 text-[#FF5E0E] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white uppercase font-bold mb-1">
                      Official Importer & Distributor
                    </div>
                    <div className="text-xs text-zinc-200 font-sans leading-relaxed font-normal">
                      <strong>Ensign Sports</strong><br />
                      502, Hill Glade, Opp. HDFC Bank Pali Road, Bandra, Mumbai - 400050, Maharashtra, India. (MH-27)
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-zinc-400">
                      Net Quantity: 1N • Commodity: Bicycles
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/50 border border-white/10 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs text-white uppercase font-bold mb-1">
                      Customer Care & Technical Support
                    </div>
                    <div className="text-xs text-zinc-200 font-sans leading-relaxed font-normal">
                      291, 10 Main, 5 Block, Jayanagar, Bangalore - 560041, Karnataka.<br />
                      Phone: <span className="text-white font-mono font-semibold">(080) 47183232</span><br />
                      Email: <span className="text-[#00F0FF] font-mono font-bold">support@bumsonthesaddle.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN BLUEPRINT TECHNICAL INSPECTION MODAL */}
      {/* ========================================================================= */}
      {selectedCompModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-2xl animate-fade-in select-none">
          {/* Backdrop Click Close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedCompModal(null)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#090d15] border border-cyan-500/30 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-cyan-500/20 bg-black/60 backdrop-blur-md flex items-center justify-between gap-4 font-mono">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_10px_#00F0FF]" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xs uppercase tracking-wider">
                    {selectedCompModal.partCode || 'PINARELLO CAD SCHEMATIC'}
                  </span>
                  <span className="text-[10px] text-cyan-400">
                    {selectedCompModal.name} // HIGH RESOLUTION DOSSIER
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBlueprintGridOverlay(!blueprintGridOverlay)}
                  className={`px-3 py-1.5 rounded-xl border text-[10px] font-mono flex items-center gap-1.5 transition-all ${
                    blueprintGridOverlay
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                  title="Toggle Blueprint CAD Grid"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CAD GRID</span>
                </button>

                {/* Prev / Next */}
                <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5">
                  <button
                    onClick={handlePrevComp}
                    className="p-1.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Previous Component (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextComp}
                    className="p-1.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Next Component (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedCompModal(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#E4002B] text-zinc-300 hover:text-white transition-colors"
                  title="Close Blueprint Modal (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Full Uncropped Component Blueprint Visual Canvas */}
              <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl bg-[radial-gradient(ellipse_at_center,_#111928_0%,_#05080e_100%)] border border-cyan-500/20 p-6 flex items-center justify-center overflow-hidden shadow-inner">
                {/* Blueprint Grid Overlay */}
                {blueprintGridOverlay && (
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                )}

                {/* Precision CAD Caliper Dimension Lines */}
                <div className="absolute inset-0 pointer-events-none select-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="90%" x2="90%" y2="90%" stroke="rgba(0,240,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="10%" y1="87%" x2="10%" y2="93%" stroke="rgba(0,240,255,0.6)" strokeWidth="1.5" />
                    <line x1="90%" y1="87%" x2="90%" y2="93%" stroke="rgba(0,240,255,0.6)" strokeWidth="1.5" />
                    <text x="50%" y="87%" fill="#00F0FF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      {selectedCompModal.dimensions || '100% FACTORY SCALE'}
                    </text>
                  </svg>
                </div>

                {/* Component Image Fully Uncropped */}
                <img
                  src={selectedCompModal.image}
                  alt={selectedCompModal.name}
                  onError={(e) => {
                    if (selectedCompModal.fallbackImage) {
                      e.currentTarget.src = selectedCompModal.fallbackImage;
                    }
                  }}
                  className="w-full h-full max-h-[92%] max-w-[92%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] z-10"
                />

                {/* Corner Technical Stamps */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 border border-cyan-500/30 text-cyan-300 font-mono text-[9px] uppercase font-bold backdrop-blur-md">
                    ISO 4210 HOMOLOGATED
                  </span>
                </div>
              </div>

              {/* Right Column: Detailed Telemetry & Blueprint Dossier */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E4002B]/15 border border-[#E4002B]/30 text-[#E4002B] font-mono text-[10px] font-bold uppercase tracking-widest mb-2">
                    {selectedCompModal.role}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    {selectedCompModal.name}
                  </h3>
                  <p className="text-sm font-mono text-cyan-300 mt-1">
                    {selectedCompModal.spec}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 font-mono text-xs">
                  <button
                    onClick={() => setActiveModalTab('overview')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeModalTab === 'overview'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Engineering Dossier
                  </button>
                  <button
                    onClick={() => setActiveModalTab('torque')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeModalTab === 'torque'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Torque & Tolerances
                  </button>
                </div>

                {/* Tab Content */}
                {activeModalTab === 'overview' ? (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      {selectedCompModal.engineeringNotes}
                    </p>

                    {/* Metric Spec Cards */}
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[9.5px] text-zinc-400 uppercase font-bold">MATERIAL COMPOSITION</div>
                        <div className="text-xs font-bold text-white mt-1">{selectedCompModal.material}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[9.5px] text-zinc-400 uppercase font-bold">FACTORY WEIGHT</div>
                        <div className="text-xs font-bold text-[#00F0FF] mt-1">{selectedCompModal.weight || 'Proprietary'}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[9.5px] text-zinc-400 uppercase font-bold">AERODYNAMIC BENEFIT</div>
                        <div className="text-xs font-bold text-[#D4FF00] mt-1">{selectedCompModal.cdaDelta || 'Laminar Flow'}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <div className="text-[9.5px] text-zinc-400 uppercase font-bold">ISO / UCI CODE</div>
                        <div className="text-xs font-bold text-white mt-1">{selectedCompModal.isoRating || 'UCI Certified'}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-xs uppercase">
                        <Wrench className="w-4 h-4" />
                        Official Factory Torque Limit
                      </div>
                      <div className="text-2xl font-black text-white font-display">
                        {selectedCompModal.torque}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Always use a calibrated torque wrench with carbon grip paste where applicable. Never exceed specified torque values to prevent composite delamination.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">SERVICE INTERVAL</div>
                      <div className="text-xs text-white">Every 5,000 km or 6 Months for WorldTour Precision</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-cyan-500/20 bg-black/70 flex items-center justify-between font-mono text-[10.5px] text-zinc-400">
              <span>PINARELLO DOGMA F FACTORY ARCHIVE // TREVISO, ITALIA</span>
              <span className="text-cyan-400 font-bold">ALL RIGHTS RESERVED © 2025</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
