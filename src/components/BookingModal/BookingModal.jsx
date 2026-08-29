import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EASING, sfx } from '../../utils/animations';
import {
  X,
  MapPin,
  Calendar,
  Zap,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Radio,
} from 'lucide-react';

export const BookingModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const [step, setStep] = useState('form');
  const [pickup, setPickup] = useState('Tokyo Skyport Terminal 01');
  const [destination, setDestination] = useState('Mount Fuji Alpine Heliport');
  const [selectedVehicle, setSelectedVehicle] = useState('Apex GT');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('form');

      gsap.killTweensOf([backdropRef.current, cardRef.current]);
      gsap.set(modalRef.current, { display: 'flex' });

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 30, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: EASING.smooth }
      );
    } else if (modalRef.current) {
      document.body.style.overflow = '';

      gsap.to(cardRef.current, {
        y: 20,
        scale: 0.96,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sfx.playChime();
    setStep('success');
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[110] hidden items-center justify-center p-4 sm:p-6 select-none"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl opacity-0 cursor-pointer"
      />

      {/* Modal Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md rounded-2xl glass-panel border-white/[0.12] p-6 sm:p-7 shadow-2xl bg-obsidian-surface/95 text-zinc-100 opacity-0"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">RESERVE QUANTUM TRANSIT</h3>
              <p className="text-[9px] font-mono text-zinc-500 uppercase">INSTANT SKYPORT DISPATCH</p>
            </div>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="h-7 w-7 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-brand-accent" />
                Pickup Location
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-brand-accent/60 transition-colors font-sans"
                placeholder="Enter skyport..."
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-brand-lime" />
                Destination Terminal
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-brand-lime/60 transition-colors font-sans"
                placeholder="Enter destination..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-mono uppercase text-zinc-400 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  Departure
                </label>
                <input
                  type="text"
                  defaultValue="IMMEDIATE"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[11px] text-zinc-300 font-mono focus:outline-none focus:border-brand-accent/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-zinc-400 mb-1 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-zinc-500" />
                  Vehicle Class
                </label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#0e1118] border border-white/[0.08] text-[11px] text-zinc-300 font-mono focus:outline-none focus:border-brand-accent/50"
                >
                  <option>Apex GT (Hyper)</option>
                  <option>Phantom Stealth (Cruiser)</option>
                  <option>Vortex-R (Expedition)</option>
                </select>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-300">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                ENCRYPTED PROTOCOL
              </span>
              <span className="text-brand-accent font-semibold">120 RIDE CREDITS</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                data-cursor="DISPATCH"
                className="w-full py-3 rounded-xl bg-brand-accent hover:bg-white text-black font-mono font-bold text-xs tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.2)] flex items-center justify-center gap-2"
              >
                <span>CONFIRM & DISPATCH POD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-5 space-y-3.5">
            <div className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-xl text-white">DISPATCH INITIATED</h4>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Your <span className="text-brand-accent font-medium">{selectedVehicle}</span> is routing to <span className="text-white font-medium">{pickup}</span>. Estimated arrival in <strong>3 minutes</strong>.
            </p>
            <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/[0.06] text-[10px] font-mono text-zinc-400">
              POD ID: RO-9940 • TELEMETRY ACTIVE
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white text-[11px] font-mono tracking-wider transition-colors"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

