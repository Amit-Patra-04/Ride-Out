import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar/Navbar';
import { HeroShowcase } from './components/Hero/HeroShowcase';
import { BookingModal } from './components/BookingModal/BookingModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian-void text-zinc-100 selection:bg-brand-accent selection:text-black overflow-hidden font-sans">
      {/* Dynamic Island Floating Header */}
      <Navbar onBookRideClick={() => setIsBookingOpen(true)} />

      {/* Main Experience Showcase */}
      <main>
        <HeroShowcase onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Interactive Booking Pod Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

