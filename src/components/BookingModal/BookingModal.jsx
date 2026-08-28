import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EASING, sfx } from '../../utils/animations';
import { MagneticButton } from '../Navbar/MagneticButton';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const BookingModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [pickup, setPickup] = useState('Neo-Tokyo Central Skyport');
  const [destination, setDestination] = useState('Mount Fuji High-Speed Hub');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('form');

      gsap.killTweensOf([backdropRef.current, cardRef.current]);
      gsap.set(modalRef.current, { display: 'flex' });

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 50, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: EASING.cinematic }
      );
    } else if (modalRef.current) {
      document.body.style.overflow = '';

      gsap.to(cardRef.current, {
        y: 30,
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sfx.playClick();
    setStep('success');
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[110] hidden items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl opacity-0 cursor-pointer"
      />

      {/* Modal Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg rounded-3xl glass-panel-glow border-white/20 p-6 sm:p-8 shadow-2xl bg-[#0b0d14fa] text-white opacity-0"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">RESERVE QUANTUM TRANSIT</h3>
              <p className="text-[11px] font-mono text-zinc-400">INSTANT DISPATCH // LEVEL-5 AUTONOMY</p>
            </div>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                Pickup Location
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors font-sans"
                placeholder="Enter skyport or station..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-lime" />
                Destination Terminal
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-brand-lime transition-colors font-sans"
                placeholder="Enter destination terminal..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  Date
                </label>
                <input
                  type="text"
                  defaultValue="TODAY // IMMEDIATE"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 font-mono focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  Fleet Class
                </label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-[#11131a] border border-white/10 text-xs text-zinc-300 font-mono focus:outline-none focus:border-brand-accent">
                  <option>APEX GT (HYPER)</option>
                  <option>PHANTOM STEALTH (CRUISER)</option>
                  <option>VORTEX-R (ALL-TERRAIN)</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                ENCRYPTED PROTOCOL
              </span>
              <span className="text-brand-accent font-bold">EST. 120 RIDE CREDITS</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                data-cursor="CONFIRM"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-accent via-cyan-400 to-brand-lime text-black font-display font-bold text-sm tracking-wide shadow-glow-cyan hover:shadow-glow-lime transform hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                CONFIRM & DISPATCH POD
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-2xl text-white">DISPATCH INITIATED</h4>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto">
              Your Apex GT is routing to <span className="text-brand-accent font-semibold">{pickup}</span>. Estimated arrival in <strong>3 minutes</strong>.
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-zinc-400">
              VEHICLE ID: RO-9940 • TELEMETRY LINK ACTIVE
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider transition-colors"
            >
              CLOSE WINDOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
