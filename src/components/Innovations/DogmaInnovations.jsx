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

  return (
    <section id="innovations" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#E4002B]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Pinarello R&D Innovations</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
          ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E5A93C]">BREAKTHROUGHS</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-400 font-sans">
          Discover how Pinarello Treviso re-imagined every square millimeter of the Dogma F with carbon M40X, Hour Record aerodynamics, and computational frame geometry.
        </p>
      </div>

      {/* Interactive Innovation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-obsidian-surface/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
        {/* Navigation Feature List */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-2 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
            SELECT R&D COMPONENT
          </div>

          <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
            {OFFICIAL_INNOVATIONS.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white/10 border-white/30 text-white shadow-[0_0_20px_rgba(228,0,43,0.2)]'
                      : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isSelected ? 'bg-[#E4002B] shadow-[0_0_8px_#E4002B]' : 'bg-zinc-600'
                      }`}
                    />
                    <div>
                      <div className="font-display text-sm font-bold uppercase tracking-wide">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">
                        {item.statLabel}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-[#00F0FF]' : 'text-zinc-500'
                    }`}
                  >
                    {item.stat}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>TOTAL INNOVATIONS: 9</span>
            <span className="text-[#E4002B] font-semibold">TORAYCA M40X</span>
          </div>
        </div>

        {/* Video & Editorial Presentation Area */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          {/* Main Media Player (Video or Hi-Res Image) */}
          <div className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/90 border border-white/15 shadow-2xl flex items-center justify-center group">
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
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse" />
              <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">
                {activeItem.highlight}
              </span>
            </div>

            {/* Video Controls (if video) */}
            {activeItem.mediaType === 'video' && (
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={togglePlayPause}
                  className="p-2 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all"
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Editorial Description & Metric Callouts */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="max-w-xl">
              <div className="text-[11px] font-mono text-[#E4002B] uppercase tracking-widest mb-1 font-bold">
                {activeItem.subtitle}
              </div>

              {/* Pinarello Signature Outlined Heading */}
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                <span className="outlinelight mr-2">{activeItem.titleOutline}</span>
                <span>{activeItem.titleBold}</span>
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {activeItem.desc}
              </p>
            </div>

            {/* Large Prominent Engineering Metric Badge */}
            <div className="shrink-0 p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-center md:text-right min-w-[170px]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                {activeItem.statLabel}
              </div>
              <div className="font-display text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-white mt-1">
                {activeItem.stat}
              </div>
              <div className="text-[10px] font-mono text-[#E4002B] uppercase mt-1 font-semibold">
                UCI Homologated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
