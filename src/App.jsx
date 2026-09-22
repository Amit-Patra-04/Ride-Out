import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar/Navbar';
import { HeroShowcase } from './components/Hero/HeroShowcase';
import { BookingModal } from './components/BookingModal/BookingModal';
import ClickSpark from './components/ClickSpark/ClickSpark';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const handleOpenBooking = (customData = {}) => {
    setBookingData(customData);
    setIsBookingOpen(true);
  };

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="relative min-h-screen bg-[#0b0f19] text-zinc-100 selection:bg-[#E4002B] selection:text-white overflow-hidden font-sans">
        {/* Dynamic Floating Italian Racing Header */}
        <Navbar onBookRideClick={() => handleOpenBooking({})} />

        {/* Main Experience Showcase */}
        <main>
          <HeroShowcase onOpenBooking={handleOpenBooking} />
        </main>

        {/* Pinarello Atelier Treviso Reservation Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialData={bookingData}
        />
      </div>
    </ClickSpark>
  );
}

