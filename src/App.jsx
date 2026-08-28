import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar/Navbar';
import { HeroShowcase } from './components/Hero/HeroShowcase';
import { CustomCursor } from './components/Navbar/CustomCursor';
import { BookingModal } from './components/BookingModal/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth momentum scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06070A] text-white selection:bg-brand-accent selection:text-black overflow-hidden font-sans">
      {/* Custom Interactive Follower Cursor */}
      <CustomCursor />

      {/* Awwwards Navigation Bar */}
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
