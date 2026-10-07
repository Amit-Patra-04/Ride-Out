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

  // Touch Swipe Gesture State with Non-Passive Native Listeners
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselContainerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isHorizontalSwipe = useRef(null);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const thumbnailRefs = useRef([]);
  const filmstripRef = useRef(null);

  const currentSlide = GALLERY_SLIDES[activeSlideIndex] || GALLERY_SLIDES[0];

  useEffect(() => {
    setMounted(true);
    GALLERY_SLIDES.forEach((slide) => {
      const img = new Image();
      img.decoding = 'async';
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

  // Native non-passive Touch Gesture handlers for mobile carousel (prevents window/screen sliding when swiping)
  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        isHorizontalSwipe.current = null;
        dragOffsetRef.current = 0;
        isDraggingRef.current = true;
      }
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || touchStartX.current === null || !e.touches || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - touchStartX.current;
      const diffY = currentY - touchStartY.current;

      // Determine intent early
      if (isHorizontalSwipe.current === null) {
        if (Math.abs(diffX) > 7 || Math.abs(diffY) > 7) {
          isHorizontalSwipe.current = Math.abs(diffX) >= Math.abs(diffY);
          if (isHorizontalSwipe.current) {
            setIsDragging(true);
          }
        }
      }

      // If horizontal swipe, prevent browser from panning/scrolling the screen or page
      if (isHorizontalSwipe.current === true) {
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();

        // Elastic dampening at boundaries
        let offset = diffX;
        if (
          (activeSlideIndex === 0 && diffX > 0) ||
          (activeSlideIndex === GALLERY_SLIDES.length - 1 && diffX < 0)
        ) {
          offset = diffX * 0.25;
        }
        dragOffsetRef.current = offset;
        setDragOffset(offset);
      }
    };

    const onTouchEnd = (e) => {
      if (!isDraggingRef.current) return;
      const offset = dragOffsetRef.current;
      const wasHorizontal = isHorizontalSwipe.current;

      isDraggingRef.current = false;
      touchStartX.current = null;
      touchStartY.current = null;
      isHorizontalSwipe.current = null;
      dragOffsetRef.current = 0;
      setIsDragging(false);
      setDragOffset(0);

      if (wasHorizontal) {
        if (e && e.cancelable) e.preventDefault();
        const threshold = 40;
        if (offset < -threshold) {
          goToNextSlide();
        } else if (offset > threshold) {
          goToPrevSlide();
        }
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: false });
    container.addEventListener('touchcancel', onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [activeSlideIndex, goToNextSlide, goToPrevSlide]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-14 pb-5 sm:pb-6 md:pb-8 border-b border-white/10 gap-5 sm:gap-6 md:gap-8 text-center md:text-left items-center md:items-start">
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="inline-flex items-center justify-center md:justify-start gap-1.5 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[9.5px] xs:text-[10.5px] sm:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 backdrop-blur-md shadow-inner font-bold text-center md:text-left">
              <Camera className="w-3 sm:w-3.5 h-3 sm:w-3.5 text-[#E4002B]" />
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
            activeIndex={activeSlideIndex}
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
            onActiveChange={selectSlide}
          />
        </div>

        {/* ============================================================ */}
        {/* 2. MOBILE & TABLET VIEW: TOUCH-SWIPE EDITORIAL CAROUSEL (< md) */}
        {/* ============================================================ */}
        <div className="block md:hidden relative z-10 space-y-3.5">
          {/* Main Hero Photo Container with Swipe Gestures */}
          <div
            ref={carouselContainerRef}
            data-lenis-prevent="true"
            className="relative w-full aspect-[4/3] xs:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0d14] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group select-none touch-pan-y"
            style={{
              touchAction: 'pan-y',
              overscrollBehaviorX: 'contain',
              overscrollBehaviorY: 'auto',
            }}
          >
            {/* Sliding Multi-Image Carousel Track */}
            <div
              className="flex w-full h-full will-change-transform select-none"
              style={{
                transform: isDragging
                  ? `translateX(calc(-${activeSlideIndex * 100}% + ${dragOffset}px))`
                  : `translateX(-${activeSlideIndex * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                touchAction: 'pan-y',
              }}
            >
              {GALLERY_SLIDES.map((slide, idx) => (
                <div key={slide.id} className="w-full h-full flex-shrink-0 relative overflow-hidden select-none">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover pointer-events-none select-none [-webkit-user-drag:none]"
                    draggable={false}
                  />
                  {/* High-end Atelier Vignette Gradients */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />
                </div>
              ))}
            </div>

            {/* Top Floating Badge Bar */}
            <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-20">
              <span className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-[#E4002B] text-[9.5px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                {currentSlide.tag}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-zinc-200 text-[9.5px] font-mono font-bold backdrop-blur-md shadow-md">
                PLATE <strong className="text-white">0{activeSlideIndex + 1}</strong> / 0{GALLERY_SLIDES.length}
              </span>
            </div>

            {/* Floating Touch Arrow Controls (Touch-isolated) */}
            <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
              <button
                type="button"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
                className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-black/80 hover:bg-[#E4002B] active:bg-[#E4002B] text-white border border-white/30 backdrop-blur-md pointer-events-auto transition-all active:scale-90 shadow-xl flex items-center justify-center cursor-pointer touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </button>
              <button
                type="button"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
                className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-black/80 hover:bg-[#E4002B] active:bg-[#E4002B] text-white border border-white/30 backdrop-blur-md pointer-events-auto transition-all active:scale-90 shadow-xl flex items-center justify-center cursor-pointer touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Bottom Tap to Fullscreen Button Overlay */}
            <div className="absolute bottom-2.5 right-2.5 z-20">
              <button
                type="button"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.playClick();
                  setIsLightboxOpen(true);
                }}
                className="px-3 py-1.5 rounded-full bg-black/85 hover:bg-[#E4002B] active:bg-[#E4002B] border border-white/30 text-white text-[10px] xs:text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95 touch-manipulation pointer-events-auto"
              >
                <Maximize2 className="w-3 h-3 text-[#E4002B] pointer-events-none" />
                <span className="pointer-events-none">INSPECT</span>
              </button>
            </div>
          </div>

          {/* Interactive Slide Pagination Dots for Mobile */}
          <div className="flex items-center justify-center gap-1 py-1">
            {GALLERY_SLIDES.map((_, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  onClick={() => selectSlide(idx)}
                  className="p-2 -m-1 flex items-center justify-center cursor-pointer touch-manipulation"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`transition-all duration-300 rounded-full block pointer-events-none ${
                      isActive
                        ? 'w-7 h-2 bg-[#E4002B] shadow-[0_0_10px_#E4002B]'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Horizontal Thumbnails Filmstrip with Auto-scroll */}
          <div
            ref={filmstripRef}
            data-lenis-prevent="true"
            className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth w-full px-1 touch-pan-x"
            style={{
              touchAction: 'pan-x',
              overscrollBehaviorX: 'contain',
            }}
          >
            {GALLERY_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  ref={(el) => (thumbnailRefs.current[idx] = el)}
                  type="button"
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  onClick={() => selectSlide(idx)}
                  className={`relative flex-shrink-0 w-16 h-11 xs:w-20 xs:h-13 rounded-xl overflow-hidden border-2 transition-all cursor-pointer touch-manipulation active:scale-95 ${
                    isActive
                      ? 'border-[#E4002B] scale-105 shadow-[0_0_12px_rgba(228,0,43,0.7)] ring-1 ring-[#E4002B]'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                  <span
                    className={`absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded text-[7.5px] font-mono font-bold leading-none pointer-events-none select-none ${
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
        <div className="mt-5 sm:mt-8 p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.05] via-[#10141e]/95 to-[#0b0e14]/98 border border-white/[0.12] backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          <div className="flex-1 space-y-2 text-center md:text-left flex flex-col items-center md:items-start w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#E4002B]/20 border border-[#E4002B]/40 text-[#E4002B] font-bold uppercase tracking-wider">
                {currentSlide.tag}
              </span>
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#E4002B] shrink-0" />
                <span>{currentSlide.location}</span>
              </span>
            </div>
            <h3 className="font-display text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight text-center md:text-left">
              {currentSlide.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed text-center md:text-left max-w-3xl">
              {currentSlide.caption}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center md:items-center lg:items-end xl:items-center justify-center md:justify-between lg:justify-end gap-2.5 sm:gap-3 md:gap-3.5 shrink-0 w-full lg:w-auto pt-3.5 sm:pt-4 md:pt-4 lg:pt-0 border-t sm:border-t md:border-t lg:border-t-0 border-white/10">
            <div className="flex items-center justify-center md:justify-start gap-2 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-black/60 border border-white/15 text-[10.5px] sm:text-xs font-mono text-zinc-300 text-center md:text-left w-full sm:w-auto shrink-0">
              <Aperture className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4002B] shrink-0" />
              <span className="whitespace-normal sm:whitespace-nowrap">{currentSlide.cameraSpec}</span>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setIsLightboxOpen(true);
              }}
              className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(228,0,43,0.4)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shrink-0 whitespace-nowrap"
            >
              <Maximize2 className="w-3.5 h-3.5 shrink-0" />
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
          data-lenis-prevent="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 md:p-6 bg-black/90 backdrop-blur-2xl backdrop-saturate-150 animate-fadeIn"
          onClick={() => {
            sfx.playClick();
            setIsLightboxOpen(false);
          }}
        >
          {/* Ambient Background Spotlights */}
          <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-[#E4002B]/15 rounded-full blur-[170px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-white/[0.08] rounded-full blur-[190px] pointer-events-none" />

          {/* Glassmorphic Modal Container Card */}
          <div
            className="relative w-full max-w-5xl h-[92vh] max-h-[840px] flex flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0c1017]/95 to-[#06080d]/98 border border-white/20 backdrop-blur-3xl shadow-[0_50px_140px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
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
            <div
              className="relative flex-1 min-h-0 flex items-center justify-center p-2.5 sm:p-6 overflow-hidden bg-black/75 touch-pan-y select-none"
            >
              {/* Prev / Next Modal Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
                className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-[#E4002B] active:bg-[#E4002B] text-white border border-white/20 backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-xl flex items-center justify-center touch-manipulation"
                aria-label="Previous plate"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 pointer-events-none" />
              </button>

              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.98)] pointer-events-none select-none transition-opacity duration-150 will-change-transform"
                draggable={false}
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
                className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-[#E4002B] active:bg-[#E4002B] text-white border border-white/20 backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-xl flex items-center justify-center touch-manipulation"
                aria-label="Next plate"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 pointer-events-none" />
              </button>
            </div>

            {/* Modal Bottom Archival Dossier Bar */}
            <div className="p-3.5 sm:p-5 md:p-6 bg-gradient-to-r from-black/95 via-[#0c1017]/95 to-black/95 border-t border-white/15 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4 shrink-0 max-h-[30vh] overflow-y-auto">
              <div className="max-w-3xl space-y-1 text-left">
                <h4 className="font-display text-base sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                  {currentSlide.title}
                </h4>
                <p className="text-[11px] sm:text-xs md:text-sm text-zinc-300 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {currentSlide.caption}
                </p>
              </div>

              {/* Camera Optics Specs */}
              <div className="flex items-center gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/[0.06] border border-white/15 text-[10px] sm:text-xs font-mono text-zinc-300 shrink-0 self-start md:self-auto">
                <Aperture className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E4002B] shrink-0" />
                <span className="whitespace-normal sm:whitespace-nowrap">{currentSlide.cameraSpec}</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};



