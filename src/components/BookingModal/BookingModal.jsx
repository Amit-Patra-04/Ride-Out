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
  Sparkles,
  Flame,
  Award,
} from 'lucide-react';

export const BookingModal = ({ isOpen, onClose, initialData = {} }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const cardRef = useRef(null);
  const [step, setStep] = useState('form');
  const [dealership, setDealership] = useState('Pinarello Flagship Atelier — Treviso, Italy');
  const [serviceType, setServiceType] = useState('Custom Dogma F Atelier Build & Fitment');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

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
        className="relative z-10 w-full max-w-lg rounded-2xl glass-panel border-white/[0.12] p-6 sm:p-8 shadow-2xl bg-obsidian-surface/95 text-zinc-100 opacity-0"
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#FF3B00]/10 border border-[#FF3B00]/30 flex items-center justify-center text-[#FF5E0E]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
                Pinarello Atelier Treviso
              </h3>
              <p className="text-[10px] font-mono text-[#FF5E0E] uppercase">
                DOGMA F ALLOCATION RESERVATION
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            {initialData.model && (
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
                <div className="text-[10px] text-zinc-500 uppercase">SELECTED BUILD</div>
                <div className="font-display text-sm font-bold text-white mt-0.5">{initialData.model}</div>
                <div className="text-zinc-400 text-[11px] mt-1 flex justify-between">
                  <span>Livery: {initialData.colorway || 'Team INEOS Grenadiers'}</span>
                  <span className="text-[#00F0FF] font-bold">{initialData.weight || '6.77 KG'}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">
                Service & Experience Type
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-[#0e1118] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF3B00]"
              >
                <option value="Custom Dogma F Atelier Build & Fitment">
                  Custom Dogma F Atelier Build & Fitment
                </option>
                <option value="VIP Treviso Factory Delivery & Pro Fitting">
                  VIP Treviso Factory Delivery & Pro Fitting
                </option>
                <option value="WorldTour Race Specification Test Ride">
                  WorldTour Race Specification Test Ride
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">
                Preferred Pinarello Partner Lounge
              </label>
              <select
                value={dealership}
                onChange={(e) => setDealership(e.target.value)}
                className="w-full bg-[#0e1118] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF3B00]"
              >
                <option value="Pinarello Flagship Atelier — Treviso, Italy">
                  Pinarello Flagship Atelier — Treviso, Italy
                </option>
                <option value="Pinarello London Flagship — Regent St, UK">
                  Pinarello London Flagship — Regent St, UK
                </option>
                <option value="Pinarello New York Boutique — Manhattan, USA">
                  Pinarello New York Boutique — Manhattan, USA
                </option>
                <option value="Pinarello Tokyo Ginza — Tokyo, Japan">
                  Pinarello Tokyo Ginza — Tokyo, Japan
                </option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">
                  Rider Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Filippo Ganna"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#0e1118] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF3B00]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#0e1118] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF3B00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">
                Official Email Dossier
              </label>
              <input
                type="email"
                required
                placeholder="rider@worldtour.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full bg-[#0e1118] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF3B00]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF3B00] via-[#FF6A00] to-[#FF3B00] text-white font-bold uppercase tracking-widest text-xs shadow-glow-crimson hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <span>Confirm Dogma F Allocation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl font-bold uppercase text-white">
              Dogma F Allocation Confirmed
            </h4>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-sm mx-auto">
              An Atelier Master Builder from Treviso will contact you at <span className="text-white">{clientEmail || 'your email'}</span> to review your custom TorayCa M40X layup specifications and geometry profile.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Close & Return to 3D Stage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
