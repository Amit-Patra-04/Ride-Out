import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Camera,
  Maximize2,
  X,
  Compass,
  Aperture,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { sfx } from '../../utils/animations';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import AccordionGallery from './AccordionGallery';
import { GALLERY_SLIDES } from './galleryData';

export { GALLERY_SLIDES };

const ACCORDION_ITEMS = GALLERY_SLIDES.map((slide) => ({
  image: slide.imageUrl,
  label: slide.title,
  tag: slide.tag,
  location: slide.location,
  caption: slide.caption,
  cameraSpec: slide.cameraSpec,
}));

export const DogmaEditorialGallery = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Touch Swipe Gesture State with Direction Awareness
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);
  const thumbnailRefs = useRef([]);
  const filmstripRef = useRef(null);

  const currentSlide = GALLERY_SLIDES[activeSlideIndex] || GALLERY_SLIDES[0];

  useEffect(() => {
    setMounted(true);
    GALLERY_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageUrl;
    });
  }, []);

  // Slide navigation handlers
  const goToNextSlide = useCallback(() => {
    sfx.playClick();
    setActiveSlideIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
  }, []);

  const goToPrevSlide = useCallback(() => {
    sfx.playClick();
    setActiveSlideIndex((prev) => (prev - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length);
  }, []);

  const selectSlide = useCallback((index) => {
    sfx.playClick();
    setActiveSlideIndex(index);
  }, []);

  // Auto-scroll filmstrip so active thumbnail is centered smoothly
  useEffect(() => {
    const el = thumbnailRefs.current[activeSlideIndex];
    if (el && filmstripRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeSlideIndex]);

  // Direction-Aware Touch Handling (preserves native vertical page scrolling)
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = (touchStartY.current || 0) - (touchEndY.current || 0);

    // Only fire horizontal slide change if horizontal swipe dominates vertical scroll
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
  };

  // Disable background scroll (Lenis + Native) when Fullscreen Inspection popup is open
  useEffect(() => {
    if (isLightboxOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isLightboxOpen]);

  // Keyboard navigation (Escape to close, Left/Right arrows to browse)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        sfx.playClick();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToNextSlide, goToPrevSlide]);

  return (
    <section
      id="gallery"
      className="relative w-full py-16 sm:py-24 md:py-36 overflow-hidden bg-gradient-to-b from-[#0e1322] via-[#131a2a] to-[#0d121f] border-t border-white/[0.08]"
    >
      {/* 1. Refined Darkroom Lightbox Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-white/[0.035] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] bg-[#E4002B]/[0.035] rounded-full blur-[200px] pointer-events-none" />

      {/* 2. Bespoke Editorial Darkroom Lightbox Guides & Viewfinder Targets */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="460" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeDasharray="4 8" />
          <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="8 16" />
          <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="8 16" />
        </svg>
      </div>

      {/* --- INNER CENTERED CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-5 sm:pb-8 border-b border-white/10 gap-5 sm:gap-8 text-center md:text-left items-center md:items-start">
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 backdrop-blur-md shadow-inner font-bold text-center">
              <Camera className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E4002B]" />
              <span>06 // EDITORIAL ARCHIVE // OFFICIAL DOGMA F ARCHIVE</span>
            </div>
            <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.05] text-center md:text-left">
              EDITORIAL{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#E4002B] mt-1 sm:mt-2">
                PHOTOGRAPHY
              </span>
            </h2>
            <p className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg text-zinc-200 max-w-2xl font-sans leading-relaxed font-normal text-center md:text-left mx-auto md:mx-0">
              High-resolution photography showcasing the Dogma F in its element—from the design studio in Treviso to iconic Alpine mountain passes.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 font-mono text-xs shrink-0">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.06] border border-white/15 text-zinc-200 font-bold backdrop-blur-md text-[10px] sm:text-xs">
              07 PRO ARCHIVAL PLATES
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. DESKTOP VIEW: INTERACTIVE 3D ACCORDION GALLERY (md and up) */}
        {/* ============================================================ */}
        <div className="hidden md:block relative z-10">
          <AccordionGallery
            items={ACCORDION_ITEMS}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#E4002B"
            overlayColor="#060010"
            textColor="#ffffff"
            grayscale={false}
            showLabels={true}
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={520}
            gap={12}
            radius={24}
            orientation="horizontal"
            onActiveChange={(idx) => {
              setActiveSlideIndex(idx);
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* 2. MOBILE & TABLET VIEW: TOUCH-SWIPE EDITORIAL CAROUSEL (< md) */}
        {/* ============================================================ */}
        <div className="block md:hidden relative z-10 space-y-3.5">
          {/* Main Hero Photo Container with Direction-Aware Swipe Gestures */}
          <div
            className="relative w-full aspect-[4/3] xs:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0d14] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] select-none group touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              key={currentSlide.id}
              onClick={() => {
                sfx.playClick();
                setIsLightboxOpen(true);
              }}
              className="w-full h-full object-cover transition-all duration-500 animate-fadeIn cursor-pointer"
              draggable={false}
            />

            {/* High-end Atelier Vignette Gradients */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />

            {/* Top Floating Badge Bar */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-[#E4002B] text-[9.5px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                {currentSlide.tag}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-zinc-200 text-[9.5px] font-mono font-bold backdrop-blur-md shadow-md">
                PLATE <strong className="text-white">0{activeSlideIndex + 1}</strong> / 0{GALLERY_SLIDES.length}
              </span>
            </div>

            {/* Floating Touch Arrow Controls */}
            <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
                className="p-2 xs:p-2.5 rounded-full bg-black/80 hover:bg-[#E4002B] text-white border border-white/30 backdrop-blur-md pointer-events-auto transition-all active:scale-90 shadow-xl cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
                className="p-2 xs:p-2.5 rounded-full bg-black/80 hover:bg-[#E4002B] text-white border border-white/30 backdrop-blur-md pointer-events-auto transition-all active:scale-90 shadow-xl cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Tap to Fullscreen Button Overlay */}
            <div className="absolute bottom-2.5 right-2.5 z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.playClick();
                  setIsLightboxOpen(true);
                }}
                className="px-3 py-1.5 rounded-full bg-black/85 hover:bg-[#E4002B] border border-white/30 text-white text-[10px] xs:text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <Maximize2 className="w-3 h-3 text-[#E4002B]" />
                <span>INSPECT</span>
              </button>
            </div>
          </div>

          {/* Interactive Slide Pagination Dots for Mobile */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            {GALLERY_SLIDES.map((_, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-6 h-1.5 bg-[#E4002B] shadow-[0_0_8px_#E4002B]'
                      : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Horizontal Thumbnails Filmstrip with Auto-scroll */}
          <div
            ref={filmstripRef}
            className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth w-full px-1"
          >
            {GALLERY_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  type="button"
                  onClick={() => selectSlide(idx)}
                  className={`relative flex-shrink-0 w-16 h-11 xs:w-20 xs:h-13 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#E4002B] scale-105 shadow-[0_0_12px_rgba(228,0,43,0.7)]'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded text-[7.5px] font-mono font-bold leading-none ${
                      isActive ? 'bg-[#E4002B] text-white' : 'bg-black/80 text-zinc-300'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- ACTIVE SLIDE TELEMETRY & METADATA BAR --- */}
        <div className="mt-5 sm:mt-8 p-4 xs:p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.05] via-[#10141e]/95 to-[#0b0e14]/98 border border-white/[0.12] backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-3xl space-y-1.5 sm:space-y-2 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#E4002B]/20 border border-[#E4002B]/40 text-[#E4002B] font-bold uppercase tracking-wider">
                {currentSlide.tag}
              </span>
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#E4002B]" />
                <span>{currentSlide.location}</span>
              </span>
            </div>
            <h3 className="font-display text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              {currentSlide.caption}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 shrink-0 w-full md:w-auto">
            <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl sm:rounded-2xl bg-black/60 border border-white/15 text-[10px] sm:text-xs font-mono text-zinc-300 text-center">
              <Aperture className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4002B] shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-none">{currentSlide.cameraSpec}</span>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setIsLightboxOpen(true);
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(228,0,43,0.4)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>FULLSCREEN INSPECTION</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* GLASSMORPHISM SINGLE-IMAGE FULLSCREEN INSPECTION MODAL       */}
      {/* ============================================================ */}
      {isLightboxOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 md:p-6 bg-black/90 backdrop-blur-2xl backdrop-saturate-150 animate-fadeIn select-none"
          onClick={() => {
            sfx.playClick();
            setIsLightboxOpen(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient Background Spotlights */}
          <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[#E4002B]/15 rounded-full blur-[170px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-white/[0.08] rounded-full blur-[190px] pointer-events-none" />

          {/* Glassmorphic Modal Container Card */}
          <div
            className="relative w-full max-w-5xl h-[92vh] max-h-[840px] flex flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0c1017]/95 to-[#06080d]/98 border border-white/20 backdrop-blur-3xl shadow-[0_50px_140px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Top Glass Bar */}
            <div className="flex items-center justify-between px-3.5 sm:px-7 py-2.5 sm:py-3.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-md font-mono shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#E4002B]/20 border border-[#E4002B]/40 text-[#E4002B] text-[9.5px] sm:text-xs font-bold uppercase tracking-wider">
                  {currentSlide.tag}
                </span>
                <span className="text-zinc-300 text-xs hidden sm:flex items-center gap-1.5 font-medium">
                  <Compass className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>{currentSlide.location}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[9.5px] sm:text-[11px] font-mono text-zinc-300 font-bold px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10">
                  PLATE <strong className="text-white">0{activeSlideIndex + 1}</strong> / 0{GALLERY_SLIDES.length}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    setIsLightboxOpen(false);
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-[#E4002B] text-white border border-white/20 hover:border-[#E4002B] transition-all hover:scale-110 active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
                  aria-label="Close Fullscreen Inspection"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Main Single-Image Inspection Stage with Navigation */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center p-2.5 sm:p-6 overflow-hidden bg-black/75 touch-pan-y">
              {/* Prev / Next Modal Arrows */}
              <button
                type="button"
                onClick={goToPrevSlide}
                className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/65 hover:bg-[#E4002B] text-white border border-white/20 backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-xl"
                aria-label="Previous plate"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                key={currentSlide.id}
                className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.98)] filter contrast-[1.02] brightness-[1.01] select-none animate-fadeIn"
                draggable={false}
              />

              <button
                type="button"
                onClick={goToNextSlide}
                className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/65 hover:bg-[#E4002B] text-white border border-white/20 backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-xl"
                aria-label="Next plate"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Bottom Archival Dossier Bar */}
            <div className="p-3.5 sm:p-6 bg-gradient-to-r from-black/95 via-[#0c1017]/95 to-black/95 border-t border-white/15 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4 shrink-0 max-h-[30vh] overflow-y-auto">
              <div className="max-w-3xl space-y-1 text-left">
                <h4 className="font-display text-base sm:text-2xl font-black text-white uppercase tracking-tight">
                  {currentSlide.title}
                </h4>
                <p className="text-[11px] sm:text-sm text-zinc-300 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {currentSlide.caption}
                </p>
              </div>

              {/* Camera Optics Specs */}
              <div className="flex items-center gap-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-xl bg-white/[0.06] border border-white/15 text-[10px] sm:text-xs font-mono text-zinc-300 shrink-0 self-start md:self-auto">
                <Aperture className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4002B] shrink-0" />
                <span className="truncate max-w-[260px] sm:max-w-none">{currentSlide.cameraSpec}</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};



