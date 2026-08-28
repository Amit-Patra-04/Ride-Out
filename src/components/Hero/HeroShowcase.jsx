import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASING, sfx } from '../../utils/animations';
import { MagneticButton } from '../Navbar/MagneticButton';
import {
  Zap,
  Shield,
  Gauge,
  Cpu,
  Navigation,
  Sparkles,
  ArrowUpRight,
  Radio,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VEHICLES = [
  {
    id: 'apex-gt',
    name: 'APEX GT // QUANTUM',
    category: 'Hyper-Tourer',
    speed: '412 km/h',
    accel: '1.78s',
    range: '940 km',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80',
    color: '#00F0FF',
    desc: 'Bespoke aerodynamic architecture with dual flux-density motors and neural trajectory prediction.',
  },
  {
    id: 'cyber-phantom',
    name: 'PHANTOM STEALTH 09',
    category: 'Autonomous Cruiser',
    speed: '360 km/h',
    accel: '2.10s',
    range: '1,120 km',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    color: '#CCFF00',
    desc: 'Lidar array with 360-degree quantum surround matrix. Built for night expeditions and trans-continental runs.',
  },
  {
    id: 'vortex-r',
    name: 'VORTEX-R EXPEDITION',
    category: 'All-Terrain Kinetic',
    speed: '310 km/h',
    accel: '2.45s',
    range: '880 km',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80',
    color: '#FF5500',
    desc: 'Adaptive magnetorheological suspension with terrain scan AI. Capable of conquering alpine snow and desert dunes.',
  },
];

export const HeroShowcase = ({ onOpenBooking }) => {
  const [activeCar, setActiveCar] = useState(0);
  const heroRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const badgeRef = useRef(null);
  const carImageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: EASING.cinematic } });

    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
    )
      .fromTo(
        titleLine1Ref.current,
        { y: 80, rotateX: -20, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        titleLine2Ref.current,
        { y: 80, rotateX: -20, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, duration: 1 },
        '-=0.7'
      )
      .fromTo(
        carImageRef.current,
        { scale: 0.9, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: EASING.smooth },
        '-=0.6'
      );
  }, []);

  const handleSelectCar = (index) => {
    sfx.playClick();
    setActiveCar(index);

    if (carImageRef.current) {
      gsap.fromTo(
        carImageRef.current,
        { opacity: 0.4, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.6, ease: EASING.smooth }
      );
    }
  };

  const car = VEHICLES[activeCar];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-brand-accent/15 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-28 right-1/4 w-[450px] h-[450px] rounded-full bg-brand-lime/10 blur-[140px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-72 left-1/3 w-80 h-80 rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-40 z-0" />

      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen pt-32 sm:pt-40 md:pt-48 pb-20 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
      >
        {/* Top Hero Text */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-white/15 text-xs font-mono text-zinc-300 mb-6 shadow-glow-cyan/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span className="text-brand-accent font-semibold tracking-wider">NEXT-GEN MOBILITY</span>
            <span className="text-zinc-600">/</span>
            <span>AUTONOMOUS PROTOCOL 2026</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] sm:leading-[1] mb-6">
            <div ref={titleLine1Ref} className="overflow-hidden">
              <span className="text-white">UNLEASH THE </span>
              <span className="text-gradient-cyan">FUTURE</span>
            </div>
            <div ref={titleLine2Ref} className="overflow-hidden mt-1 sm:mt-2">
              <span className="text-zinc-400 font-light">OF </span>
              <span className="text-gradient-lime">PURE MOTION.</span>
            </div>
          </h1>

          <p className="max-w-2xl text-zinc-400 text-sm sm:text-base md:text-lg font-sans leading-relaxed mb-8">
            Experience ultra-smooth autonomous rides, cybernetic hypercars, and seamless city expeditions designed with uncompromising aesthetic excellence.
          </p>

          {/* Hero Action CTA Group */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                if (onOpenBooking) onOpenBooking();
              }}
              dataCursor="BOOK"
              className="px-7 py-3.5 rounded-full bg-brand-accent hover:bg-white text-black font-display font-bold text-sm tracking-wide shadow-glow-cyan transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>RESERVE HYPER-RIDE</span>
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                sfx.playClick();
                const el = document.getElementById('fleet');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              dataCursor="DISCOVER"
              className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-display font-semibold text-sm tracking-wide transition-all duration-300"
            >
              <span>EXPLORE FLEET</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </MagneticButton>
          </div>
        </div>

        {/* Hero Interactive Vehicle Visualizer */}
        <div id="fleet" className="mt-16 sm:mt-24 relative">
          {/* Vehicle Selector Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {VEHICLES.map((v, i) => (
              <button
                key={v.id}
                onClick={() => handleSelectCar(i)}
                data-cursor="SELECT"
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                  activeCar === i
                    ? 'bg-white/15 border-brand-accent text-white shadow-glow-cyan/30'
                    : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: v.color }}
                />
                <span>{v.name.split('//')[0]}</span>
              </button>
            ))}
          </div>

          {/* Large Hero Card Showcase */}
          <div
            ref={carImageRef}
            className="relative rounded-3xl overflow-hidden glass-panel border-white/15 p-4 sm:p-8 shadow-glass transition-all duration-500"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090e] via-transparent to-black/30" />

              {/* Live Telemetry HUD Overlay */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-3">
                <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[11px] font-mono text-brand-accent flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-brand-accent animate-pulse" />
                  <span>ONLINE // ACTIVE FLEET</span>
                </div>
              </div>

              {/* Overlay Details */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-md">
                  <span className="text-xs font-mono text-brand-accent uppercase tracking-widest">
                    {car.category}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white mt-1">
                    {car.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 line-clamp-2">
                    {car.desc}
                  </p>
                </div>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-black/70 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/15">
                  <div className="text-center sm:text-left">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Top Velocity</div>
                    <div className="text-sm sm:text-lg font-display font-bold text-white">{car.speed}</div>
                  </div>
                  <div className="text-center sm:text-left border-x border-white/10 px-2 sm:px-4">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">0-100 KM/H</div>
                    <div className="text-sm sm:text-lg font-display font-bold text-brand-accent">{car.accel}</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">Quantum Range</div>
                    <div className="text-sm sm:text-lg font-display font-bold text-brand-lime">{car.range}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTELLIGENCE & TELEMETRY */}
      <section id="intelligence" className="relative z-10 py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-mono text-brand-accent mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>NEURAL ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              PRECISION TELEMETRY. <br />
              <span className="text-gradient-cyan">ZERO FRICTION.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              Every Ride-Out vehicle communicates across a decentralized quantum mesh network, dynamically adjusting suspension, velocity, and power distribution in real-time.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { title: 'Sub-Millisecond Neural Routing', desc: 'Predictive obstacle bypass with instant traffic re-calculation.' },
                { title: 'Biometric Airflow Cockpit', desc: 'Ambient climate and spatial sound tailored to passenger heart-rate.' },
                { title: 'Autonomous Level-5 Fleet Protocol', desc: 'Certified ultra-safe navigation with triple-redundant lidar sensors.' },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col justify-between h-64 hover:border-brand-accent/40 transition-colors">
              <div className="flex items-center justify-between">
                <Gauge className="w-8 h-8 text-brand-accent" />
                <span className="text-xs font-mono text-zinc-500">01 // EFFICIENCY</span>
              </div>
              <div>
                <div className="text-4xl font-display font-black text-white">99.4%</div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">Energy Transfer Ratio</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col justify-between h-64 hover:border-brand-lime/40 transition-colors">
              <div className="flex items-center justify-between">
                <Shield className="w-8 h-8 text-brand-lime" />
                <span className="text-xs font-mono text-zinc-500">02 // SAFETY</span>
              </div>
              <div>
                <div className="text-4xl font-display font-black text-white">0.0001%</div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">Incident Rate / Million KM</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col justify-between h-64 sm:col-span-2 hover:border-white/30 transition-colors">
              <div className="flex items-center justify-between">
                <Navigation className="w-8 h-8 text-brand-orange" />
                <span className="text-xs font-mono text-zinc-500">03 // GLOBAL MATRIX</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-display font-black text-white">48 CITIES</div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">High-Speed Terminals Active</div>
                </div>
                <div className="text-xs font-mono text-brand-accent flex items-center gap-1">
                  <span>EXPANDING 2026</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPEDITIONS */}
      <section id="expeditions" className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-brand-lime uppercase tracking-widest">CURATED JOURNEYS</span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-1">
              ICONIC EXPEDITION ROUTES
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0">
            Book private high-speed transit across scenic hyper-routes with personalized cockpit ambiances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Tokyo Night Cyber-Ring',
              distance: '180 KM',
              duration: '38 MIN',
              img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Alpine Peak Highway',
              distance: '340 KM',
              duration: '1 HR 12 MIN',
              img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'California Coastal Warp',
              distance: '420 KM',
              duration: '1 HR 25 MIN',
              img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
            },
          ].map((route, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden glass-panel border-white/10 hover:border-brand-accent/50 transition-all duration-500 cursor-pointer"
              data-cursor="ROUTE"
              onClick={() => {
                sfx.playClick();
                if (onOpenBooking) onOpenBooking();
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={route.img}
                  alt={route.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-3 text-xs font-mono text-brand-accent">
                  <span>{route.distance}</span>
                  <span className="text-zinc-500">•</span>
                  <span>{route.duration}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mt-1 group-hover:text-brand-accent transition-colors">
                  {route.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FOOTER / CTA */}
      <footer id="about" className="relative z-10 py-20 border-t border-white/10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border-white/15 text-center flex flex-col items-center">
          <div className="h-12 w-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent mb-6 shadow-glow-cyan">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight max-w-2xl">
            READY TO REDEFINE YOUR MOVEMENT?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mt-4">
            Join the decentralized Ride-Out network. Experience first-class autonomous travel at lightning speeds.
          </p>

          <div className="mt-8">
            <MagneticButton
              onClick={() => {
                sfx.playClick();
                if (onOpenBooking) onOpenBooking();
              }}
              dataCursor="JOIN"
              className="px-8 py-4 rounded-full bg-brand-accent hover:bg-white text-black font-display font-bold text-base tracking-wide shadow-glow-cyan transition-all transform hover:scale-105"
            >
              <span>ACCESS THE NETWORK</span>
              <ArrowUpRight className="w-5 h-5" />
            </MagneticButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div>© 2026 RIDE-OUT TECHNOLOGIES. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300">PRIVACY PROTOCOL</a>
            <a href="#" className="hover:text-zinc-300">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-zinc-300">ENCRYPTION AUDIT</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
