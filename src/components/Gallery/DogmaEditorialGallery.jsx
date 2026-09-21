import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Camera,
  Maximize2,
  X,
  Compass,
  Aperture,
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

  const currentSlide = GALLERY_SLIDES[activeSlideIndex] || GALLERY_SLIDES[0];

  useEffect(() => {
    setMounted(true);
    GALLERY_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageUrl;
    });
  }, []);

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

  // Keyboard navigation (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        sfx.playClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <section
      id="gallery"
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#0b0e14] via-[#111622] to-[#0b0e14] border-t border-white/[0.08]"
    >
      {/* 1. Refined Darkroom Lightbox Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-white/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[900px] h-[550px] bg-[#E4002B]/[0.05] rounded-full blur-[200px] pointer-events-none" />

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-white/10 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-4 backdrop-blur-md shadow-inner font-bold">
              <Camera className="w-3.5 h-3.5 text-[#E4002B]" />
              <span>06 // EDITORIAL ARCHIVE // OFFICIAL DOGMA F ARCHIVE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.05]">
              EDITORIAL{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#E4002B] mt-1 sm:mt-2">
                PHOTOGRAPHY
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-200 max-w-2xl font-sans leading-relaxed font-normal">
              High-resolution photography showcasing the Dogma F in its element—from the design studio in Treviso to iconic Alpine mountain passes.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/15 text-zinc-200 font-bold backdrop-blur-md">
              07 PRO ARCHIVAL PLATES
            </span>
          </div>
        </div>

        {/* --- INTERACTIVE ACCORDION GALLERY --- */}
        <div className="relative z-10">
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

        {/* --- ACTIVE SLIDE TELEMETRY & METADATA BAR --- */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] via-[#10141e]/95 to-[#0b0e14]/98 border border-white/[0.12] backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-[#E4002B]/20 border border-[#E4002B]/40 text-[#E4002B] font-bold uppercase tracking-wider">
                {currentSlide.tag}
              </span>
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#E4002B]" />
                <span>{currentSlide.location}</span>
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {currentSlide.title}
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {currentSlide.caption}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/60 border border-white/15 text-xs font-mono text-zinc-300">
              <Aperture className="w-4 h-4 text-[#E4002B]" />
              <span>{currentSlide.cameraSpec}</span>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setIsLightboxOpen(true);
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(228,0,43,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
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
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/90 backdrop-blur-2xl backdrop-saturate-150 animate-fadeIn select-none"
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
            className="relative w-full max-w-5xl h-[90vh] max-h-[820px] flex flex-col rounded-3xl bg-gradient-to-b from-white/[0.12] via-[#0c1017]/95 to-[#06080d]/98 border border-white/20 backdrop-blur-3xl shadow-[0_50px_140px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Glass Bar */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-md font-mono shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#E4002B]/20 border border-[#E4002B]/40 text-[#E4002B] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  {currentSlide.tag}
                </span>
                <span className="text-zinc-300 text-xs hidden sm:flex items-center gap-1.5 font-medium">
                  <Compass className="w-3.5 h-3.5 text-[#E4002B]" />
                  <span>{currentSlide.location}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-zinc-300 font-bold px-3.5 py-1 rounded-full bg-white/5 border border-white/10">
                  PLATE <strong className="text-white">{activeSlideIndex + 1}</strong> / {GALLERY_SLIDES.length}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    sfx.playClick();
                    setIsLightboxOpen(false);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-[#E4002B] text-white border border-white/20 hover:border-[#E4002B] transition-all hover:scale-110 active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
                  aria-label="Close Fullscreen Inspection"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Single-Image Inspection Stage */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-black/75">
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                key={currentSlide.id}
                className="max-w-full max-h-full object-contain rounded-2xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.98)] filter contrast-[1.02] brightness-[1.01] select-none animate-fadeIn"
                draggable={false}
              />
            </div>

            {/* Modal Bottom Archival Dossier Bar */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-black/95 via-[#0c1017]/95 to-black/95 border-t border-white/15 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
              <div className="max-w-3xl space-y-1">
                <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {currentSlide.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {currentSlide.caption}
                </p>
              </div>

              {/* Camera Optics Specs */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-xs font-mono text-zinc-300 shrink-0">
                <Aperture className="w-4 h-4 text-[#E4002B]" />
                <span>{currentSlide.cameraSpec}</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};


