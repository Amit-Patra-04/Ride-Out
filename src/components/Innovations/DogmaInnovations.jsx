import React, { useState, useRef } from 'react';
import {
  Layers,
  Wind,
  Shield,
  Zap,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  ChevronRight,
  Activity,
  Compass,
  ArrowRight,
  Eye,
  Flame,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const OFFICIAL_INNOVATIONS = [
  {
    id: 'carbon-m40x',
    title: 'CARBON M40X',
    titleOutline: 'CARBON',
    titleBold: 'M40X',
    subtitle: 'NANOALLOY REINFORCED COMPOSITE',
    desc: 'The DOGMA evolves, changing its skin to surprise you one more time. We tested this new carbon fiber lay-up on our X-Light models and INEOS Grenadiers team bikes. This new fibre has an exceptional tensile modulus that allowed us to reach the next level of lateral stiffness performance on the latest generation of our DOGMA F.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/fe61da2c4e7023edd6328fff5244baf6.mp4',
    poster: 'https://pinarello.com/storage/thumbs/ProductFamily/1344__resize__af22b54a27abdb3ea30f29cccb5be987.jpg',
    stat: '+12%',
    statLabel: 'LATERAL SPRINT STIFFNESS',
    highlight: 'Tested under Grand Tour mountain finishes',
  },
  {
    id: 'aero-keel-bb',
    title: 'NEW AERO-KEEL BB',
    titleOutline: 'NEW',
    titleBold: 'AERO-KEEL BB',
    subtitle: '3.5° COMPUTATIONAL ROTATION',
    desc: 'Trickle-down technology from the Hour Record, The new DOGMA F down tube is rotated by 3.5°, to create a keel shape that improves the aero performance of the BB area by 1.2% while housing standard Italian-threaded bottom bracket shells.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/7bf270d08161e896a3636dab72613925.mp4',
    stat: '-1.2%',
    statLabel: 'BB AREA AERO DRAG',
    highlight: 'Filippo Ganna Hour Record CFD Technology',
  },
  {
    id: 'down-tube',
    title: 'DOWN TUBE',
    titleOutline: 'DOWN',
    titleBold: 'TUBE',
    subtitle: 'SLIMMED FRONTAL PENETRATION',
    desc: 'The downtube has been completely redesigned to reduce the thickness and therefore improve the frontal aerodynamic performance of the frame and minimize turbulent air wake over water bottle cages.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/ddb6f42276ee555bd1a08fefc3509587.mp4',
    stat: '-4.8%',
    statLabel: 'FRONTAL DRAG (CdA)',
    highlight: 'Aero FlatBack Profile',
  },
  {
    id: 'top-tube-nose',
    title: 'TOP TUBE & NOSE',
    titleOutline: 'TOP',
    titleBold: 'TUBE NOSE',
    subtitle: '8MM SLIMMER AERO NOSE CONE',
    desc: 'Our unique head tube "nose" shape, introduced first on the DOGMA F8 in 2014, evolves again, reducing the volume and the width of the nose area by 8mm with a more streamlined design to improve frontal aero penetration at high yaw angles.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/baa4f16e596f2ba0a15d3ab64abefe73.mp4',
    stat: '-8 mm',
    statLabel: 'NOSE CONE WIDTH REDUCTION',
    highlight: 'Patented Aero Nose Evolution',
  },
  {
    id: 'headset-steerer',
    title: 'ELLIPTICAL HEADSET',
    titleOutline: 'ELLIPTICAL',
    titleBold: 'STEERER',
    subtitle: 'DIFFERENTIATED BEARING DIAMETERS',
    desc: 'To reduce the frontal width of headtube, Pinarello engineers designed an innovative elliptical steering tube and a completely new headset with differentiated bearings diameter—wider on the bottom and narrower at the top—for internal TiCR routing.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/51c4b67149282905231f3c5428db17dd.mp4',
    stat: '100%',
    statLabel: 'INTERNAL TICR™ INTEGRATION',
    highlight: 'Elliptical Carbon Steerer',
  },
  {
    id: 'thru-axles',
    title: 'INTEGRATED THRU AXLES',
    titleOutline: 'THRU',
    titleBold: 'AXLES',
    subtitle: 'CONCEALED FORK & DROPOUT INTEGRATION',
    desc: 'New shorter thru axles. The bolt on the right side of the fork has been integrated directly in the carbon fiber lay-up, eliminating the external hole. Same has been accomplished on the frame with integrated rear derailleur dropout.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/1ba269b3ed1e43d8c63613770cbfd2d6.mp4',
    stat: 'Flush',
    statLabel: 'CARBON BLEND FINISH',
    highlight: 'Zero Exposed Axle Holes',
  },
  {
    id: 'new-onda-fork',
    title: 'NEW ONDA FORK',
    titleOutline: 'NEW',
    titleBold: 'ONDA FORK',
    subtitle: '47MM PRO RACING RAKE',
    desc: 'The new slimmer fork design improves aerodynamics with a 47mm rake, rigorously tested with Team INEOS Grenadiers pro rider feedback to sharpen downhill carving precision and stability at 80+ km/h.',
    mediaType: 'image',
    mediaUrl: 'https://pinarello.com/storage/Technology/663e6ff8cbedabf2e2c307ac0457dfd5.jpg',
    stat: '47 mm',
    statLabel: 'STABILITY RAKE',
    highlight: 'Integrated ForkFlap™ Wing',
  },
  {
    id: 'seatpost-clamp',
    title: 'INTEGRATED SEAT CLAMP',
    titleOutline: 'INTEGRATED',
    titleBold: 'SEAT CLAMP',
    subtitle: 'INTERNAL DUST & SWEAT SEALED',
    desc: 'Our seatpost clamp has been reduced in size and fully integrated inside the frame seat tube. This new solution reduces weight, improves the industrial design, and seals the system from dust and sweat intrusion.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/58cbe2c3287b493e187b2338df865933.mp4',
    stat: '-35g',
    statLabel: 'CLAMP SYSTEM WEIGHT',
    highlight: 'Monocoque Integrated Wedge',
  },
  {
    id: 'talon-ultra-fast',
    title: 'NEW TALON ULTRA FAST',
    titleOutline: 'TALON',
    titleBold: 'ULTRA FAST',
    subtitle: 'ERGONOMIC TWISTED HOOD COCKPIT',
    desc: 'The new Talon Ultra Fast integrated cockpit is lighter, stiffer, and more aerodynamic. Designed with a natural twisted lever position, it allows WorldTour riders to settle into a narrow, ultra-aero forearm position safely.',
    mediaType: 'video',
    mediaUrl: 'https://pinarello.com/storage/Technology/6a9a2c56e8850736135f0559e3e242ff.mp4',
    stat: '-5 Watts',
    statLabel: 'POWER SAVED AT 40 KM/H',
    highlight: '7° Sprint Drop Flare',
  },
];

export const DogmaInnovations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const activeItem = OFFICIAL_INNOVATIONS[activeIndex];

  const handleSelectTab = (index) => {
    sfx.playClick();
    setActiveIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    sfx.playHover();
  };

  return (
    <section
      id="innovations"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#090d18] via-[#160d20] to-[#0c1326]"
    >
      {/* --- LAYER 1: VIBRANT ANIMATED ATMOSPHERIC AURORAS --- */}
      <div className="absolute top-1/4 -right-20 w-[1150px] h-[1150px] bg-[#E4002B]/35 rounded-full blur-[200px] pointer-events-none aurora-blob-1" />
      <div className="absolute bottom-1/4 -left-20 w-[1050px] h-[1050px] bg-[#00F0FF]/28 rounded-full blur-[200px] pointer-events-none aurora-blob-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[900px] bg-[#FF5E0E]/22 rounded-full blur-[220px] pointer-events-none aurora-breathing" />

      {/* Bespoke Dynamic Energy Streamlines & Precision Vector Guides */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-50">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 C300,100 800,300 1400,150 C1800,50 2100,250 2500,180" fill="none" stroke="rgba(228,0,43,0.35)" strokeWidth="2" className="aero-streamline" />
          <path d="M-100,600 C400,500 900,700 1500,550 C1900,450 2200,650 2600,580" fill="none" stroke="rgba(0,240,255,0.35)" strokeWidth="2" className="aero-streamline-fast" />
          <circle cx="20%" cy="30%" r="320" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="80%" cy="70%" r="360" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="6 12" />
        </svg>
      </div>

      {/* Contained Architectural Watermark */}
      <div className="absolute top-12 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.05] sm:opacity-[0.06] leading-none font-display font-black tracking-tight">
        <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">INNOVATIONS</span>
        <span className="text-[8vw] sm:text-[7vw] md:text-[6vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-transparent -mt-[1.5vw]">
          R&D TREVISO
        </span>
      </div>

      {/* Side Technical & Geographic Calibration Labels */}
      <div className="absolute top-36 left-8 hidden 2xl:flex flex-col gap-6 font-mono text-[9px] text-zinc-400 tracking-[0.25em] uppercase select-none pointer-events-none z-10">
        <div className="space-y-1">
          <span className="block text-red-400 font-bold text-[9.5px]">LABORATORIO R&D</span>
          <span className="text-zinc-300">TREVISO // ITALIA</span>
          <span className="block text-zinc-400">VILLORBA RACING ARCHIVE</span>
        </div>
      </div>

      <div className="absolute top-36 right-8 hidden 2xl:flex flex-col gap-6 font-mono text-[9px] text-zinc-400 tracking-[0.25em] uppercase text-right select-none pointer-events-none z-10">
        <div className="space-y-1">
          <span className="block text-cyan-400 font-bold text-[9.5px]">COMPOSITE MATRIX</span>
          <span className="text-zinc-300">TORAYCA® M40X</span>
          <span className="block text-zinc-400">392 GPA TENSILE</span>
        </div>
      </div>

      {/* --- LAYER 2: INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header: Grand Editorial Flagship */}
        <div className="relative z-10 mb-14 sm:mb-16">
          {/* Top Kicker Registry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 mb-8 font-mono text-[11px] tracking-[0.25em] text-zinc-300 uppercase">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-[10px] border border-red-500/40 shadow-[0_0_10px_rgba(228,0,43,0.3)]">
                03
              </span>
              <span className="text-[#FF5E0E] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF5E0E] animate-pulse" />
                R&D BREAKTHROUGHS
              </span>
              <span className="text-zinc-500">//</span>
              <span className="text-zinc-200">PATENTED CHASSIS DYNAMICS</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-300 font-mono text-[10px]">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold backdrop-blur-md">
                INNOVATION 0{activeIndex + 1} / 09
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-[#00F0FF] font-bold hidden sm:inline">
                TORAYCA M40X COMPOSITE
              </span>
            </div>
          </div>

          {/* Master Grand Headline & Editorial Description */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-2">
              <span className="block font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-[#FF5E0E] font-bold">
                NINE REVOLUTIONARY ENGINEERING MILESTONES
              </span>
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
                ENGINEERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 via-40% to-[#E4002B] drop-shadow-lg">
                  BREAKTHROUGHS.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2 space-y-4">
              <p className="text-sm sm:text-base text-zinc-200 font-sans font-normal leading-relaxed">
                Discover how Pinarello Treviso re-imagined every square millimeter of the Dogma F with carbon M40X, Hour Record aerodynamics, and computational frame geometry.
              </p>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-zinc-300">
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  9 PATENTED SYSTEMS
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  HOUR RECORD TECH
                </span>
                <span className="px-3 py-1 rounded-md bg-white/[0.08] border border-white/15 font-semibold text-white">
                  TICR™ INTERNAL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN INTERACTIVE INNOVATION STAGE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-[#0c0e16]/90 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-3xl shadow-[0_35px_100px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden">
          {/* Navigation Feature List (Left 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0">
            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-300 uppercase tracking-widest pb-3 border-b border-white/10 font-bold">
              <span>SELECT R&D COMPONENT</span>
              <span className="text-[#00F0FF] font-black">0{activeIndex + 1}/09</span>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
              {OFFICIAL_INNOVATIONS.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(idx)}
                    onMouseEnter={() => sfx.playHover()}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border backdrop-blur-md ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600/30 via-white/[0.12] to-white/[0.06] border-red-500/60 text-white shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_25px_rgba(228,0,43,0.35)] scale-[1.02]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#E4002B] scale-125 shadow-[0_0_12px_#E4002B]'
                            : 'bg-zinc-500'
                        }`}
                      />
                      <div>
                        <div className="font-display text-sm font-black uppercase tracking-wide text-white">
                          {item.title}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">
                          {item.statLabel}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg ${
                        isSelected
                          ? 'bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                          : 'text-zinc-400 bg-white/5'
                      }`}
                    >
                      {item.stat}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-300 font-bold">
              <span>9 OFFICIAL PATENTS</span>
              <span className="text-[#FF5E0E]">TORAYCA M40X</span>
            </div>
          </div>

          {/* Video & Editorial Presentation Area (Right 8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            {/* Main Media Player (Video or Hi-Res Image) */}
            <div className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/90 border border-white/20 shadow-2xl flex items-center justify-center group">
              {activeItem.mediaType === 'video' ? (
                <video
                  ref={videoRef}
                  key={activeItem.mediaUrl}
                  src={activeItem.mediaUrl}
                  poster={activeItem.poster}
                  playsInline
                  autoPlay
                  muted={isMuted}
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activeItem.mediaUrl}
                  alt={activeItem.title}
                  key={activeItem.mediaUrl}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Video Watermark & Tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 border border-white/20 backdrop-blur-xl shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4002B] animate-pulse" />
                <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
                  {activeItem.highlight}
                </span>
              </div>

              {/* Video Controls (if video) */}
              {activeItem.mediaType === 'video' && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-black/85 hover:bg-black border border-white/20 text-white backdrop-blur-xl transition-all hover:scale-110 shadow-lg"
                    aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00F0FF]" />}
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="p-3 rounded-full bg-black/85 hover:bg-black border border-white/20 text-white backdrop-blur-xl transition-all hover:scale-110 shadow-lg"
                    aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-[#FF5E0E]" /> : <Play className="w-4 h-4 text-[#00F0FF]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Editorial Description & Metric Callouts */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              <div className="max-w-xl space-y-2">
                <div className="text-[11px] font-mono text-[#FF5E0E] uppercase tracking-widest font-bold">
                  {activeItem.subtitle}
                </div>

                {/* Pinarello Signature Outlined Heading */}
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  <span className="outlinelight mr-2">{activeItem.titleOutline}</span>
                  <span>{activeItem.titleBold}</span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed font-normal">
                  {activeItem.desc}
                </p>
              </div>

              {/* Large Prominent Engineering Metric Badge */}
              <div className="shrink-0 p-6 rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.04] border border-white/20 text-center md:text-right min-w-[200px] backdrop-blur-xl shadow-xl">
                <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest font-bold">
                  {activeItem.statLabel}
                </div>
                <div className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-white to-[#D4FF00] mt-1 drop-shadow-md">
                  {activeItem.stat}
                </div>
                <div className="text-[10px] font-mono text-[#FF5E0E] uppercase mt-1 font-bold">
                  UCI HOMOLOGATED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
