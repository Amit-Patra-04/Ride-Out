import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NavLink } from './NavLink';
import { MagneticButton } from './MagneticButton';
import { FullscreenMenu } from './FullscreenMenu';
import { EASING, sfx } from '../../utils/animations';
import {
  Volume2,
  VolumeX,
  ArrowRight,
} from 'lucide-react';

const NAV_LINKS = [
  { label: '3D AERO', href: '#hero-3d' },
  { label: 'MODELS', href: '#models' },
  { label: 'INNOVATION', href: '#innovations' },
  { label: 'SPECS', href: '#specifications' },
  { label: 'WIND TUNNEL', href: '#windtunnel', className: 'hidden xl:flex' },
  { label: 'ATELIER', href: '#configurator' },
  { label: 'GALLERY', href: '#gallery', className: 'hidden 2xl:flex' },
  { label: 'HERITAGE', href: '#heritage', className: 'hidden xl:flex' },
];

const ALL_SECTIONS = [
  { label: '3D AERO', id: 'hero-3d' },
  { label: 'MODELS', id: 'models' },
  { label: 'INNOVATION', id: 'innovations' },
  { label: 'SPECS', id: 'specifications' },
  { label: 'WIND TUNNEL', id: 'windtunnel' },
  { label: 'ATELIER', id: 'configurator' },
  { label: 'GALLERY', id: 'gallery' },
  { label: 'HERITAGE', id: 'heritage' },
];

export const Navbar = ({ onBookRideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('3D AERO');
  const [isMuted, setIsMuted] = useState(false);

  const navContainerRef = useRef(null);
  const indicatorRef = useRef(null);
  const linksContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSections = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = ALL_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(ALL_SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPos >= top) {
            setActiveLink(ALL_SECTIONS[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSections, { passive: true });
    handleScrollSections();
    return () => window.removeEventListener('scroll', handleScrollSections);
  }, []);

  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: EASING.smooth,
        delay: 0.1,
      }
    );
  }, []);

  const handleLinkHover = (targetElement) => {
    if (!indicatorRef.current || !targetElement || !linksContainerRef.current) return;

    const containerRect = linksContainerRef.current.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const left = targetRect.left - containerRect.left;
    const width = targetRect.width;

    gsap.to(indicatorRef.current, {
      x: left,
      width: width,
      opacity: 1,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  const handleLinksContainerLeave = () => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const toggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
    if (!muted) sfx.playClick();
  };

  return (
    <>
      <header
        ref={navContainerRef}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-2 sm:pt-2.5 px-3 sm:px-6 flex justify-center transition-all duration-300"
      >
        <div
          className={`w-full max-w-5xl pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between rounded-full px-3 sm:px-4 py-1.5 gap-2 sm:gap-3 ${
            isScrolled ? 'glass-navbar-scrolled' : 'glass-navbar'
          }`}
        >
          {/* Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-2 group select-none flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              sfx.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="h-6 w-6 rounded-md bg-[#E4002B]/20 border border-[#E4002B]/40 flex items-center justify-center text-[#E4002B] group-hover:border-[#E4002B] group-hover:shadow-[0_0_12px_rgba(228,0,43,0.5)] group-hover:scale-105 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-current">
                <path d="M31.979 6.723c-.181-1.322-1.486-2.508-3.113-3.386-.41-.221-.843-.421-1.282-.6-.19-.076-.38-.147-.57-.22A39.37 39.37 0 0019.217.476a40.119 40.119 0 00-6.865-.47h-.048l-.074.002c-.08.003-.158.005-.235.005L11.76.02c-.193.005-.388.01-.583.022l-.062.004c-.043 0-.085.004-.13.006-.135.006-.272.014-.406.023a30.319 30.319 0 00-1.325.101 10.17 10.17 0 01-.286.027l-.299.03c-.024.003-.045.007-.068.008l-.219.027c-.122.015-.246.028-.366.044L7.69.354c-.138.02-.277.036-.416.057-.133.02-.268.038-.402.062-.03.003-.062.01-.093.012l-.283.047c-.109.018-.22.036-.328.056-.002 0-.006 0-.01.002-.092.014-.185.033-.277.048l-.045.009a.645.645 0 00-.066.012A70.218 70.218 0 004.377.94l-.274.062c-.02.006-.04.01-.058.014a35.5 35.5 0 00-1.246.307c-.024.009-.05.013-.073.02-.238.062-.472.128-.708.196-.016.004-.03.007-.047.013-.217.062-.434.127-.651.195a35.226 35.226 0 00-1.217.394H.101c-.002.002-.005.002-.008.002-.008.002-.016.003-.023.008-.117.043-.077.213.044.219h.002l.034-.008.198-.03a48.241 48.241 0 0115.431-.103c.315.049.626.113.938.166.044.006.092.006.136.014.735.109 1.776.31 2.87.61.086.02.172.035.256.057.125.03.25.063.375.095l.234.061a10.271 10.271 0 011.831.649c.713.334 1.41.752 1.964 1.308l.063.068.05.054c.02.02.04.043.06.065.202.223.362.459.469.708.116.254.182.521.155.794-.001.029-.01.057-.013.087-.003.022-.008.046-.01.068-.017.132-.05.264-.096.393-.015.041-.025.081-.041.124a2.491 2.491 0 01-.224.398c-1.435 2.312-6.699 3.409-13.51 3.724a60.53 60.53 0 01-2.305.098c-.705.016-1.41.013-2.115.005h-.188v-.003c-.295-.006-.589-.008-.882-.017-.046-.001-.09-.001-.135-.004-.113 0-.118.178 0 .178.017.002.035.002.052.005a29.964 29.964 0 016.243.971c.483.135 1.328.608.775 1.159-.19.185-.494.333-.777.413-.044.01-.085.022-.125.032a14.83 14.83 0 01-3.769.401h-.004c-.104.005-.106.17.002.17h.003a15.774 15.774 0 014.114.549c.006 0 .012.003.02.005.08.016.162.04.247.07.002 0 .004.003.007.003.26.095.703.314.655.65-.045.32-.482.508-.754.59 0 0-.006.003-.006 0l-.06.019a11.87 11.87 0 01-3.029.416c-.12 0-.125.178-.004.178v.002a11.277 11.277 0 013.586.602c.217.09.561.27.559.541-.002.265-.32.441-.534.531h-.01a.517.517 0 01-.064.028c-.015.005-.03.011-.046.015l-.022.006c-.007.005-.017.006-.024.007-.016.007-.034.011-.05.018a5.745 5.745 0 01-2.205.251v.004c-.118 0-.124.184 0 .184v.002c1.61.28 2.914 1.429 3.38 2.937.04.134.075.27.102.408v.003a37.504 37.504 0 011.133 8.818c0 .107.172.113.177.003v-.005a37.346 37.346 0 012.028-11.741l.001-.005c.125-.355.251-.712.384-1.064.003-.006.006-.01.006-.016.08-.185.16-.366.247-.546.419-.884.949-1.708 1.568-2.461a12.42 12.42 0 015.501-3.832l.021-.007c.19-.057.377-.118.565-.179l.035-.012c.442-.147.882-.3 1.316-.463.006-.002.012-.003.018-.008.269-.098.537-.203.803-.305 1.913-.803 3.652-2.035 4.14-3.456.121-.353.164-.727.113-1.097" fill="currentColor" fillRule="evenodd"/>
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xs sm:text-[13px] tracking-[0.16em] text-white uppercase group-hover:text-[#E4002B] transition-colors duration-200">
                PINARELLO
              </span>
              <span className="hidden sm:inline-flex text-[9px] font-mono text-zinc-400 tracking-wider pl-1.5 border-l border-white/10 font-medium items-center gap-1">
                DOGMA <span className="text-[#E4002B] font-bold">F</span>
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav
            ref={linksContainerRef}
            onMouseLeave={handleLinksContainerLeave}
            className="relative hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md"
          >
            <div
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute top-0.5 bottom-0.5 rounded-full bg-white/[0.08] border border-white/[0.12] pointer-events-none opacity-0 shadow-sm transition-opacity"
              style={{ left: 0, width: 0 }}
            />

            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                badge={link.badge}
                className={link.className || ''}
                isActive={activeLink === link.label}
                onClick={() => {
                  setActiveLink(link.label);
                }}
                onMouseEnter={(e) => handleLinkHover(e.currentTarget)}
              />
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
              title={isMuted ? 'Unmute Mechanical Audio' : 'Mute Audio'}
              aria-label="Toggle Audio"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#00F0FF]" />
              )}
            </button>

            {/* Atelier Reservation CTA Button */}
            <MagneticButton
              strength={0.15}
              onClick={() => {
                sfx.playClick();
                if (onBookRideClick) onBookRideClick();
              }}
              className="rounded-full px-2.5 sm:px-3.5 py-1 bg-gradient-to-r from-[#E4002B] via-[#FF5E0E] to-[#E4002B] bg-[length:200%_auto] text-white font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(228,0,43,0.35)] hover:shadow-[0_0_18px_rgba(228,0,43,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>RESERVE</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>

            {/* Menu Directory Button */}
            <button
              onClick={() => {
                sfx.playClick();
                setIsMenuOpen(true);
              }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all group"
              title="Open Experience Directory"
              aria-label="Open Navigation Menu"
            >
              <div className="flex flex-col gap-1 items-end">
                <span className="w-3.5 h-[1.5px] bg-white group-hover:bg-[#FF5E0E] transition-colors rounded-full" />
                <span className="w-2 h-[1.5px] bg-[#E4002B] rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Curtain Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

