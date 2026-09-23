import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  FileCheck,
  Download,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Send,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const OFFICIAL_PREFOOTER_SUPPORT = [
  {
    title: 'WARRANTY',
    desc: 'Warranty terms & coverage',
    href: 'https://pinarello.com/europe/en/conventional-warranty',
    icon: Shield,
    badge: '5-YR WARRANTY',
  },
  {
    title: 'FALSE FRAMES',
    desc: 'Anti-counterfeiting verification',
    href: 'https://pinarello.com/europe/en/false-frames',
    icon: AlertTriangle,
    badge: 'AUTHENTICITY',
  },
  {
    title: 'REGISTRATION',
    desc: 'Official bike chassis passport',
    href: 'https://pinarello.com/europe/en/frame-registration',
    icon: FileCheck,
    badge: 'PASSPORT',
  },
  {
    title: 'DOWNLOADS',
    desc: 'Technical manuals & CAD',
    href: 'https://pinarello.com/europe/en/documents-downloads',
    icon: Download,
    badge: 'MANUALS',
  },
  {
    title: 'ORDERS',
    desc: 'Order tracking & delivery',
    href: 'https://pinarello.com/europe/en/contact-form?topic=ecommerce-orders',
    icon: ShoppingBag,
    badge: 'CONCIERGE',
  },
];

export const FOOTER_NAVIGATION_COLUMNS = [
  {
    category: 'BIKES',
    categoryHref: 'https://pinarello.com/europe/en/bikes',
    links: [
      { name: 'Road', href: 'https://pinarello.com/europe/en/bikes/road' },
      { name: 'Gravel', href: 'https://pinarello.com/europe/en/bikes/gravel' },
      { name: 'E-Bikes', href: 'https://pinarello.com/europe/en/bikes/e-bikes' },
      { name: 'MTB', href: 'https://pinarello.com/europe/en/bikes/mtb' },
      { name: 'MyWay', href: 'https://pinarello.com/europe/en/myway' },
    ],
  },
  {
    category: 'ACCESSORIES',
    categoryHref: 'https://pinarello.com/europe/en/accessories',
    links: [
      { name: 'Components', href: 'https://pinarello.com/europe/en/accessories/components' },
      { name: 'Men Apparel', href: 'https://pinarello.com/europe/en/accessories/apparel-man-summer' },
      { name: 'Women Apparel', href: 'https://pinarello.com/europe/en/accessories/apparel-woman-summer' },
    ],
  },
  {
    category: 'PINARELLO WORLD',
    categoryHref: 'https://pinarello.com/europe/en/our-dna',
    links: [
      { name: 'News', href: 'https://pinarello.com/europe/en/news' },
      { name: 'Store Locator', href: 'https://pinarello.com/europe/en/store-locator' },
      { name: 'Our DNA', href: 'https://pinarello.com/europe/en/our-dna' },
      { name: 'History', href: 'https://pinarello.com/europe/en/pinarello-history' },
      { name: 'Hall of Fame', href: 'https://pinarello.com/europe/en/hall-of-fame' },
      { name: 'Contacts', href: 'https://pinarello.com/europe/en/contact-form' },
    ],
  },
  {
    category: 'SUPPORT',
    categoryHref: 'https://pinarello.com/europe/en/conditions-of-sales',
    links: [
      { name: 'Sales Terms', href: 'https://pinarello.com/europe/en/conditions-of-sales' },
      { name: 'Terms of Use', href: 'https://pinarello.com/europe/en/terms-of-use' },
      { name: 'Returns', href: 'https://pinarello.com/europe/en/return-form' },
      { name: 'Withdrawal', href: 'https://pinarello.com/europe/en/right-of-withdrawal' },
      { name: 'Delivery', href: 'https://pinarello.com/europe/en/time-of-delivery' },
      { name: 'Payments', href: 'https://pinarello.com/europe/en/payments-methods' },
      { name: 'Disputes', href: 'https://pinarello.com/europe/en/dispute-resolution' },
    ],
  },
];

export const SOCIAL_CHANNELS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/PinarelloBikes/',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M16 6.748h-1.694c-1.13 0-1.13.442-1.13 1.277v1.668h2.495l-.377 2.945h-2.118V20h-2.823v-7.362H8V9.693h2.353V7.73c0-2.405 1.459-3.73 3.53-3.73.988 0 1.646.098 2.117.098v2.65z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/pinarello_official/',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M15.307 4.053c1.28.054 2.4.374 3.36 1.28.96.907 1.226 2.08 1.28 3.36C20 9.813 20 10.88 20 12s0 2.187-.053 3.307c-.054 1.28-.374 2.4-1.28 3.36-.907.96-2.08 1.226-3.36 1.28C14.187 20 13.12 20 12 20s-2.187 0-3.307-.053c-1.28-.054-2.4-.374-3.36-1.28-.96-.907-1.226-2.08-1.28-3.36-.04-.84-.05-1.65-.052-2.475L4 12c0-1.12 0-2.187.053-3.307.054-1.28.374-2.4 1.28-3.36.907-.96 2.08-1.226 3.36-1.28.84-.04 1.65-.05 2.475-.052L12 4c1.12 0 2.187 0 3.307.053zM7.36 5.76c-.373.16-.64.32-.907.587-.266.266-.48.533-.586.906-.427 1.067-.32 3.574-.32 4.694s-.107 3.68.32 4.693c.16.373.32.64.586.907.267.266.534.48.907.586 1.067.427 3.573.32 4.693.32 1.12 0 3.68.107 4.694-.32.373-.16.64-.32.906-.586.267-.267.48-.534.587-.907.427-1.067.32-3.573.32-4.693 0-1.12.107-3.627-.32-4.694-.16-.373-.32-.64-.587-.906-.266-.267-.533-.48-.906-.587-1.067-.427-3.574-.32-4.694-.32s-3.68-.107-4.693.32zM12 7.893c2.293 0 4.107 1.814 4.107 4.107S14.293 16.107 12 16.107 7.893 14.293 7.893 12 9.707 7.893 12 7.893zm0 1.44a2.667 2.667 0 100 5.334 2.667 2.667 0 000-5.334zm4.267-2.56c.533 0 .96.427.96.96 0 .534-.427.96-.96.96a.955.955 0 01-.96-.96c0-.533.426-.96.96-.96z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/user/princeoftheroad',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12.382 6c1.29.008 5.468.056 6.65.357.775.198 1.384.778 1.591 1.516.336 1.194.372 3.545.376 4.035v.182c-.004.49-.04 2.842-.376 4.035-.207.738-.816 1.319-1.591 1.516-1.293.33-6.17.356-6.932.358h-.2c-.763-.002-5.64-.028-6.933-.358-.774-.197-1.384-.778-1.591-1.516-.323-1.145-.369-3.359-.376-3.967v-.318c.006-.61.052-2.822.375-3.968.207-.738.817-1.318 1.591-1.516 1.184-.3 5.361-.348 6.651-.355zm-2.223 3.468v5.065L14.863 12 10.16 9.467z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://twitter.com/pinarello_com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Strava',
    href: 'https://www.strava.com/clubs/pinarelloofficial',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7.925 15.659h4.173" />
      </svg>
    ),
  },
];

export const DogmaFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    sfx.playChime();
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#0b0e14] via-[#101522] to-[#05070a] border-t border-white/[0.08] text-white overflow-hidden">
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-white/[0.025] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[900px] h-[450px] bg-[#9f8d5e]/[0.035] rounded-full blur-[220px] pointer-events-none" />

      {/* ============================================================ */}
      {/* 1. PRE-FOOTER: SUPPORT FAST-ACCESS PORTAL                   */}
      {/* ============================================================ */}
      <div className="relative z-10 border-b border-white/10 bg-white/[0.015] backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-2 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">
                <Shield className="w-3 h-3 text-[#00F0FF]" />
                <span>OFFICIAL TREVISO SERVICE</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight text-center lg:text-left">
                SUPPORT & ASSISTANCE
              </h3>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed font-normal text-center lg:text-left">
                Access official technical documentation, warranty homologation, anti-counterfeiting verification, and direct order tracking.
              </p>
            </div>

            {/* Right 5 Fast Access Action Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {OFFICIAL_PREFOOTER_SUPPORT.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sfx.playHover()}
                    className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-300 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 min-w-0"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-[#00F0FF]/15 group-hover:border-[#00F0FF]/40 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#00F0FF] block mb-1 whitespace-nowrap truncate">
                        {item.badge}
                      </span>
                      <span className="font-display font-bold text-xs text-white uppercase tracking-wide block leading-snug whitespace-nowrap truncate">
                        {item.title}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. NEWSLETTER VIP DISPATCH (RECEIVE PREVIEWS & UPDATES)     */}
      {/* ============================================================ */}
      <div className="relative z-10 border-b border-white/10 bg-gradient-to-r from-[#0d121c]/90 via-[#131929]/90 to-[#0e1320]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
              <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#9f8d5e] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#9f8d5e]" />
                <span>RECEIVE EXCLUSIVE PREVIEW AND UPDATES</span>
              </span>
              <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight text-center lg:text-left">
                JOIN THE PINARELLO CIRCLE
              </h4>
              <p className="text-xs text-zinc-300 font-sans max-w-xl leading-relaxed text-center lg:text-left">
                Join us to discover new products, learn about our latest technologies, keep up with local and digital events, and receive WorldTour bulletins from Treviso.
              </p>
            </div>

            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Grazie! You have been successfully registered for exclusive Treviso bulletins.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    required
                    className="flex-1 px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-white text-black hover:bg-[#00F0FF] hover:text-black font-mono text-xs uppercase font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shrink-0 shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  >
                    <span>SUBSCRIBE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. SITE TREE DIRECTORY & OFFICIAL COLUMNS                    */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Navigation Matrix: 4 Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
            {FOOTER_NAVIGATION_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="space-y-4 min-w-0">
                <a
                  href={col.categoryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pb-2 border-b border-white/15 text-white font-bold uppercase tracking-wider text-[11px] hover:text-[#00F0FF] transition-colors whitespace-nowrap truncate"
                >
                  {col.category}
                </a>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx} className="min-w-0">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sfx.playHover()}
                        className="text-zinc-400 hover:text-white transition-colors py-0.5 block text-[12px] whitespace-nowrap truncate"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Brand Column: Insignia, Social Channels & Headquarter (4 cols) */}
          <div className="lg:col-span-4 lg:pl-6 lg:border-l lg:border-white/10 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              {/* Crest & Title */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-white shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                    <path
                      d="M31.979 6.723c-.181-1.322-1.486-2.508-3.113-3.386-.41-.221-.843-.421-1.282-.6-.19-.076-.38-.147-.57-.22A39.37 39.37 0 0019.217.476a40.119 40.119 0 00-6.865-.47h-.048l-.074.002c-.08.003-.158.005-.235.005L11.76.02c-.193.005-.388.01-.583.022l-.062.004c-.043 0-.085.004-.13.006-.135.006-.272.014-.406.023a30.319 30.319 0 00-1.325.101 10.17 10.17 0 01-.286.027l-.299.03c-.024.003-.045.007-.068.008l-.219.027c-.122.015-.246.028-.366.044L7.69.354c-.138.02-.277.036-.416.057-.133.02-.268.038-.402.062-.03.003-.062.01-.093.012l-.283.047c-.109.018-.22.036-.328.056-.002 0-.006 0-.01.002-.092.014-.185.033-.277.048l-.045.009a.645.645 0 00-.066.012A70.218 70.218 0 004.377.94l-.274.062c-.02.006-.04.01-.058.014a35.5 35.5 0 00-1.246.307c-.024.009-.05.013-.073.02-.238.062-.472.128-.708.196-.016.004-.03.007-.047.013-.217.062-.434.127-.651.195a35.226 35.226 0 00-1.217.394H.101c-.002.002-.005.002-.008.002-.008.002-.016.003-.023.008-.117.043-.077.213.044.219h.002l.034-.008.198-.03a48.241 48.241 0 0115.431-.103c.315.049.626.113.938.166.044.006.092.006.136.014.735.109 1.776.31 2.87.61.086.02.172.035.256.057.125.03.25.063.375.095l.234.061a10.271 10.271 0 011.831.649c.713.334 1.41.752 1.964 1.308l.063.068.05.054c.02.02.04.043.06.065.202.223.362.459.469.708.116.254.182.521.155.794-.001.029-.01.057-.013.087-.003.022-.008.046-.01.068-.017.132-.05.264-.096.393-.015.041-.025.081-.041.124a2.491 2.491 0 01-.224.398c-1.435 2.312-6.699 3.409-13.51 3.724a60.53 60.53 0 01-2.305.098c-.705.016-1.41.013-2.115.005h-.188v-.003c-.295-.006-.589-.008-.882-.017-.046-.001-.09-.001-.135-.004-.113 0-.118.178 0 .178.017.002.035.002.052.005a29.964 29.964 0 016.243.971c.483.135 1.328.608.775 1.159-.19.185-.494.333-.777.413-.044.01-.085.022-.125.032a14.83 14.83 0 01-3.769.401h-.004c-.104.005-.106.17.002.17h.003a15.774 15.774 0 014.114.549c.006 0 .012.003.02.005.08.016.162.04.247.07.002 0 .004.003.007.003.26.095.703.314.655.65-.045.32-.482.508-.754.59 0 0-.006.003-.006 0l-.06.019a11.87 11.87 0 01-3.029.416c-.12 0-.125.178-.004.178v.002a11.277 11.277 0 013.586.602c.217.09.561.27.559.541-.002.265-.32.441-.534.531h-.01a.517.517 0 01-.064.028c-.015.005-.03.011-.046.015l-.022.006c-.007.005-.017.006-.024.007-.016.007-.034.011-.05.018a5.745 5.745 0 01-2.205.251v.004c-.118 0-.124.184 0 .184v.002c1.61.28 2.914 1.429 3.38 2.937.04.134.075.27.102.408v.003a37.504 37.504 0 011.133 8.818c0 .107.172.113.177.003v-.005a37.346 37.346 0 012.028-11.741l.001-.005c.125-.355.251-.712.384-1.064.003-.006.006-.01.006-.016.08-.185.16-.366.247-.546.419-.884.949-1.708 1.568-2.461a12.42 12.42 0 015.501-3.832l.021-.007c.19-.057.377-.118.565-.179l.035-.012c.442-.147.882-.3 1.316-.463.006-.002.012-.003.018-.008.269-.098.537-.203.803-.305 1.913-.803 3.652-2.035 4.14-3.456.121-.353.164-.727.113-1.097"
                      fill="currentColor"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-display font-black text-lg text-white uppercase tracking-wider block">
                    CICLI PINARELLO SRL
                  </span>
                  <span className="font-mono text-[9.5px] text-zinc-400 uppercase tracking-widest block font-bold">
                    TREVISO, ITALIA • EST. 1952
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Official racing bicycle supplier to INEOS Grenadiers and WorldTour champions across all 21 Grand Tour stages.
              </p>

              {/* Social Channels Icons */}
              <div className="pt-2">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-3 font-semibold">
                  FOLLOW PINARELLO OFFICIAL:
                </span>
                <div className="flex items-center gap-2">
                  {SOCIAL_CHANNELS.map((s, sIdx) => (
                    <a
                      key={sIdx}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      onClick={() => sfx.playHover()}
                      className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-110 shadow-sm"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Corporate Data & Legal Homologation */}
            <div className="pt-6 border-t border-white/10 font-mono text-[10.5px] text-zinc-400 space-y-2">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                <span>
                  Headquarter: Viale della Repubblica, 12, 31020 Villorba (TV) — C.F. and VAT 05994100963
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-400 pt-1">
                <a
                  href="https://pinarello.com/europe/en/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline decoration-zinc-700 transition-colors whitespace-nowrap"
                >
                  Privacy
                </a>
                <span>|</span>
                <a
                  href="https://pinarello.com/europe/en/cookies-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline decoration-zinc-700 transition-colors whitespace-nowrap"
                >
                  Cookies
                </a>
                <span>|</span>
                <a
                  href="https://pinarello.com/europe/en/dichiarazione-di-accessibilita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline decoration-zinc-700 transition-colors whitespace-nowrap"
                >
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Technical Banner */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-400">
          <div>
            © 2026 CICLI PINARELLO SRL — ALL RIGHTS RESERVED • WORLDTOUR UCI HOMOLOGATED
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">TREVISO ATELIER DIRECT LIVE LINK ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
