import React, { useState } from 'react';
import {
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ExternalLink,
  Compass,
  Aperture,
  Film,
  Eye,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const GALLERY_SLIDES = [
  {
    id: 'slide-1',
    title: 'Aero Headtube & TiCR Cockpit',
    location: 'Pinarello Wind Tunnel Facility, Treviso',
    caption:
      'Streamlined 8mm narrower nose cone, elliptical steering tube, and MOST Talon Ultra Fast cockpit integration.',
    imageUrl:
      'https://pinarello.com/storage/ProductGallery/8e30f5a9c36350dc4f3c222446855c4b.jpg',
    tag: 'STUDIO AERO FOCUS',
    cameraSpec: 'Hasselblad H6D-100c • 100mm f/2.2 • 1/500s • ISO 64',
  },
  {
    id: 'slide-2',
    title: 'Alpine Descent Precision',
    location: 'Passo dello Stelvio, Italian Alps',
    caption:
      'New Onda fork with 47mm rake provides razor-sharp high-speed stability and downhill tracking confidence.',
    imageUrl:
      'https://pinarello.com/storage/ProductGallery/3fe908c0936aaa74d1a46f442d24b09f.jpg',
    tag: 'WORLDTOUR TESTING',
    cameraSpec: 'Leica SL2 • 50mm Summilux f/1.4 • 1/4000s • ISO 100',
  },
  {
    id: 'slide-3',
    title: 'TorayCa M40X Monocoque Chassis',
    location: 'Atelier Treviso Handcrafting',
    caption:
      'Nanoalloy composite matrix delivering unyielding lateral bottom bracket stiffness under explosive sprint surges.',
    imageUrl:
      'https://pinarello.com/storage/ProductGallery/c28dd5445845c28eeede36b44a5f61f9.jpg',
    tag: 'CARBON ENGINEERING',
    cameraSpec: 'Phase One IQ4 150MP • 80mm Schneider • 1/250s • ISO 50',
  },
  {
    id: 'slide-4',
    title: 'Aero-Keel BB & Asymmetric Stays',
    location: 'Computational Fluid Dynamics Lab',
    caption:
      '3.5° rotated aero keel bottom bracket with integrated thru-axles eliminating drag-inducing external bolt holes.',
    imageUrl:
      'https://pinarello.com/storage/ProductGallery/aa365cb48c17536181742afbc801f4f0.jpg',
    tag: 'HOUR RECORD TECH',
    cameraSpec: 'Sony A1 • 24-70mm GM II f/2.8 • 1/1600s • ISO 160',
  },
  {
    id: 'slide-5',
    title: 'Grand Tour Racing Dominance',
    location: 'Col du Tourmalet, Tour de France',
    caption:
      'Tested and proven across thousands of kilometers at the summit of elite international professional cycling.',
    imageUrl:
      'https://pinarello.com/storage/ProductGallery/15b2653fee8c3795c66ae4015284f92b.jpg',
    tag: 'PALMARES DYNASTY',
    cameraSpec: 'Canon EOS R3 • 70-200mm f/2.8L IS • 1/3200s • ISO 200',
  },
];

export const DogmaEditorialGallery = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentSlide = GALLERY_SLIDES[currentSlideIndex];

  const handleNext = () => {
    sfx.playClick();
    setCurrentSlideIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
  };

  const handlePrev = () => {
    sfx.playClick();
    setCurrentSlideIndex((prev) => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
  };

  const handleThumbnailClick = (idx) => {
    sfx.playClick();
    setCurrentSlideIndex(idx);
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#1a111a] via-[#1d1226] to-[#1b1410]"
    >
      {/* 1. Volumetric Atmospheric Multi-tier Spotlights - Seamless Diffuse Blend */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1250px] h-[900px] bg-[#E4002B]/32 rounded-full blur-[200px] pointer-events-none aurora-blob-1" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[1150px] h-[1150px] bg-[#E5A93C]/28 rounded-full blur-[200px] pointer-events-none aurora-blob-2" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[1050px] h-[1050px] bg-[#00F0FF]/18 rounded-full blur-[220px] pointer-events-none aurora-breathing" />

      {/* 2. Bespoke Editorial Darkroom Lightbox Guides & Viewfinder Targets */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="460" fill="none" stroke="rgba(229,169,60,0.12)" strokeWidth="1.5" strokeDasharray="4 8" />
          <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="8 16" />
          <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="8 16" />
        </svg>
      </div>

      {/* 3. Contained Architectural Watermark Typography */}
      <div className="absolute top-10 inset-x-0 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-[0.06] sm:opacity-[0.07] leading-none font-display font-black tracking-tight">
        <span className="text-[9.5vw] sm:text-[8.5vw] md:text-[7.5vw] whitespace-nowrap text-white">
          EDITORIAL
        </span>
        <span className="text-[7.5vw] sm:text-[6.5vw] md:text-[5.5vw] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-300 to-transparent -mt-[1.5vw]">
          DOGMA F GALLERY
        </span>
      </div>

      {/* --- INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-white/15 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/35 text-[#E5A93C] text-[11px] font-mono tracking-[0.2em] uppercase mb-4 backdrop-blur-md shadow-inner font-bold">
              <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>06 // EDITORIAL ARCHIVE // OFFICIAL DOGMA F ARCHIVE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-[0.92]">
              EDITORIAL{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E4002B] via-white via-40% to-[#E5A93C]">
                PHOTOGRAPHY
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-200 max-w-2xl font-sans leading-relaxed font-normal">
              High-resolution photography showcasing the Dogma F in its element—from the design studio in Treviso to iconic Alpine mountain passes.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={handlePrev}
              onMouseEnter={() => sfx.playHover()}
              className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 hover:from-white/25 hover:to-white/15 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="font-mono text-sm px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-md font-bold">
              <strong className="text-white text-base">0{currentSlideIndex + 1}</strong>
              <span className="mx-1.5 text-zinc-400">/</span>
              <span className="text-zinc-300">0{GALLERY_SLIDES.length}</span>
            </div>

            <button
              onClick={handleNext}
              onMouseEnter={() => sfx.playHover()}
              className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 hover:from-white/25 hover:to-white/15 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Big Feature Slide */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.09] via-white/[0.04] to-[#120e17]/95 border border-white/20 shadow-[0_35px_100px_rgba(0,0,0,0.8)] group">
          <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-black/90">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              key={currentSlide.imageUrl}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />

            {/* Vignette Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* Top Tag & Fullscreen Action */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="px-4 py-2 rounded-full bg-black/85 border border-white/25 text-white text-xs font-mono tracking-widest uppercase font-bold backdrop-blur-xl shadow-xl flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>{currentSlide.tag}</span>
              </span>
              <button
                onClick={() => {
                  sfx.playClick();
                  setIsLightboxOpen(true);
                }}
                className="pointer-events-auto p-3 rounded-2xl bg-black/85 hover:bg-black border border-white/25 text-white backdrop-blur-xl transition-all hover:scale-110 shadow-xl"
                title="Expand High-Resolution Image"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Captions Overlay */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{currentSlide.location}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed font-normal">
                  {currentSlide.caption}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/80 border border-white/20 text-[10px] font-mono text-zinc-300 backdrop-blur-md shrink-0 font-bold">
                <Aperture className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>{currentSlide.cameraSpec}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation Strip */}
          <div className="p-4 sm:p-6 bg-black/80 border-t border-white/15 grid grid-cols-5 gap-3 sm:gap-4">
            {GALLERY_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleThumbnailClick(idx)}
                onMouseEnter={() => sfx.playHover()}
                className={`relative rounded-2xl overflow-hidden aspect-video border-2 transition-all duration-300 ${
                  currentSlideIndex === idx
                    ? 'border-[#E4002B] scale-[1.03] shadow-[0_0_25px_rgba(228,0,43,0.5)] ring-2 ring-white/50'
                    : 'border-white/15 hover:border-white/40 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1.5 left-2 font-mono text-[10px] text-white font-bold drop-shadow-md">
                  0{idx + 1}
                </div>
                {currentSlideIndex === idx && (
                  <div className="absolute inset-0 bg-[#E4002B]/15 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
            <button
              onClick={() => {
                sfx.playClick();
                setIsLightboxOpen(false);
              }}
              className="absolute top-6 right-6 z-50 p-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-all hover:scale-110 shadow-2xl"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-6xl max-h-[88vh] w-full flex flex-col items-center justify-center">
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/25 shadow-[0_0_80px_rgba(0,0,0,0.95)]"
              />
              <div className="mt-5 text-center">
                <div className="font-display text-2xl font-black text-white uppercase tracking-wide">
                  {currentSlide.title}
                </div>
                <div className="font-mono text-xs text-zinc-300 mt-1 flex items-center justify-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentSlide.location}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-[#E5A93C] font-bold">{currentSlide.cameraSpec}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
