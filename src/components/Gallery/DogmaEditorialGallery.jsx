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
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const GALLERY_SLIDES = [
  {
    id: 'slide-1',
    title: 'Aero Headtube & TiCR Cockpit',
    location: 'Pinarello Wind Tunnel Facility, Treviso',
    caption: 'Streamlined 8mm narrower nose cone, elliptical steering tube, and MOST Talon Ultra Fast cockpit integration.',
    imageUrl: 'https://pinarello.com/storage/ProductGallery/8e30f5a9c36350dc4f3c222446855c4b.jpg',
    tag: 'STUDIO AERO FOCUS',
  },
  {
    id: 'slide-2',
    title: 'Alpine Descent Precision',
    location: 'Passo dello Stelvio, Italian Alps',
    caption: 'New Onda fork with 47mm rake provides razor-sharp high-speed stability and downhill tracking confidence.',
    imageUrl: 'https://pinarello.com/storage/ProductGallery/3fe908c0936aaa74d1a46f442d24b09f.jpg',
    tag: 'WORLDTOUR TESTING',
  },
  {
    id: 'slide-3',
    title: 'TorayCa M40X Monocoque Chassis',
    location: 'Atelier Treviso Handcrafting',
    caption: 'Nanoalloy composite matrix delivering unyielding lateral bottom bracket stiffness under explosive sprint surges.',
    imageUrl: 'https://pinarello.com/storage/ProductGallery/c28dd5445845c28eeede36b44a5f61f9.jpg',
    tag: 'CARBON ENGINEERING',
  },
  {
    id: 'slide-4',
    title: 'Aero-Keel BB & Asymmetric Stays',
    location: 'Computational Fluid Dynamics Lab',
    caption: '3.5° rotated aero keel bottom bracket with integrated thru-axles eliminating drag-inducing external bolt holes.',
    imageUrl: 'https://pinarello.com/storage/ProductGallery/aa365cb48c17536181742afbc801f4f0.jpg',
    tag: 'HOUR RECORD TECH',
  },
  {
    id: 'slide-5',
    title: 'Grand Tour Racing Dominance',
    location: 'Col du Tourmalet, Tour de France',
    caption: 'Tested and proven across thousands of kilometers at the summit of elite international professional cycling.',
    imageUrl: 'https://pinarello.com/storage/ProductGallery/15b2653fee8c3795c66ae4015284f92b.jpg',
    tag: 'PALMARES DYNASTY',
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
    <section id="gallery" className="relative py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Ambient Section Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E4002B]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E5A93C] text-xs font-mono tracking-widest uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Official Dogma F Photography</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none">
            EDITORIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E5A93C]">GALLERY</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl font-sans">
            High-resolution photography showcasing the Dogma F in its element—from the design studio in Treviso to iconic Alpine mountain passes.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs text-zinc-400">
            <strong className="text-white">0{currentSlideIndex + 1}</strong> / 0{GALLERY_SLIDES.length}
          </span>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Big Feature Slide */}
      <div className="relative rounded-3xl overflow-hidden bg-obsidian-surface/80 border border-white/10 shadow-2xl group">
        <div className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-black/95">
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            key={currentSlide.imageUrl}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

          {/* Top Tag & Fullscreen Action */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full bg-black/70 border border-white/20 text-white text-[11px] font-mono tracking-widest uppercase font-bold backdrop-blur-md">
              {currentSlide.tag}
            </span>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="pointer-events-auto p-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
              title="Expand High-Resolution Image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Captions Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-1">
                {currentSlide.location}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {currentSlide.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {currentSlide.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div className="p-4 sm:p-6 bg-black/90 border-t border-white/10 grid grid-cols-5 gap-3 sm:gap-4">
          {GALLERY_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all duration-300 ${
                currentSlideIndex === idx
                  ? 'border-[#E4002B] scale-[1.03] shadow-[0_0_15px_rgba(228,0,43,0.4)]'
                  : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-1 left-1.5 font-mono text-[9px] text-white/90 font-bold drop-shadow">
                0{idx + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-110"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            />
            <div className="mt-4 text-center">
              <div className="font-display text-xl font-bold text-white uppercase">
                {currentSlide.title}
              </div>
              <div className="font-mono text-xs text-zinc-400 mt-1">
                {currentSlide.location} • Pinarello Dogma F Official Archive
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
