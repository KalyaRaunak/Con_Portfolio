import { OrbitingCircles } from "./ui/orbiting-circles";
import { Mail, Phone } from "lucide-react";

export default function TechEcosystem() {
  return (
    <section className="py-24 md:py-32 bg-[#0F0F10] relative overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute glow-effect w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mb-16">
          <div className="flex items-center justify-center space-x-2 animate-fade-in">
            <span className="h-[1px] w-8 bg-[#EA580C]/50" />
            <span className="eyebrow text-[#EA580C] uppercase tracking-widest text-[11px]">Connect With Us</span>
            <span className="h-[1px] w-8 bg-[#EA580C]/50" />
          </div>
          <h2 className="section-headline text-white uppercase">
            Platforms & Channels
          </h2>
          <p className="body-default text-[#A1A1AA] max-w-lg mx-auto">
            Reach out across your favorite platforms — we're active and ready to collaborate.
          </p>
        </div>

        {/* Orbiting Circles Container */}
        <div className="relative flex h-[500px] w-full max-w-xl items-center justify-center overflow-hidden rounded-lg bg-transparent">
          {/* Central Logo Icon */}
          <div 
            className="w-16 h-22 md:w-20 md:h-28 bg-white hover:bg-[#EA580C] transition-colors duration-300 z-10 cursor-pointer"
            style={{
              maskImage: "url(/images/logo.png)",
              WebkitMaskImage: "url(/images/logo.png)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat"
            }}
          />

          {/* Inner Circles (radius: 90, duration: 20s) — WhatsApp, Instagram, Mail */}
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            duration={20}
            delay={-20}
            radius={90}
            iconSize={48}
          >
            <a href="https://wa.me/918200935110?text=Hello%20Converge,%20I'd%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.whatsapp />
            </a>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            duration={20}
            delay={-13}
            radius={90}
            iconSize={48}
          >
            <a href="https://www.instagram.com/convergedigitals?igsh=NTJqd2FxdTZ2dzMy" target="_blank" rel="noopener noreferrer" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.instagram />
            </a>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            duration={20}
            delay={-6}
            radius={90}
            iconSize={48}
          >
            <a href="mailto:hello@convergedigitals.com" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.mail />
            </a>
          </OrbitingCircles>

          {/* Outer Circles (radius: 190, duration: 25s, reverse) — Contra/Behance, X, Google, Call */}
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            radius={190}
            duration={25}
            delay={-24}
            reverse
            iconSize={48}
          >
            <a href="https://contra.com/converge_digitals_4d28indg?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=converge_digitals_4d28indg" target="_blank" rel="noopener noreferrer" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.behance />
            </a>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            radius={190}
            duration={25}
            delay={-18}
            reverse
            iconSize={48}
          >
            <a href="https://x.com/ConvergeDigit" target="_blank" rel="noopener noreferrer" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.x />
            </a>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            radius={190}
            duration={25}
            delay={-12}
            reverse
            iconSize={48}
          >
            <a href="https://convergedigitals.com/" target="_blank" rel="noopener noreferrer" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.google />
            </a>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[48px] border-none bg-transparent pointer-events-auto"
            radius={190}
            duration={25}
            delay={-6}
            reverse
            iconSize={48}
          >
            <a href="tel:+918200935110" className="pointer-events-auto z-30 cursor-pointer">
              <Icons.call />
            </a>
          </OrbitingCircles>
        </div>
      </div>
    </section>
  );
}

const Icons = {
  whatsapp: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.477 1.33 4.992L2 22l5.148-1.347a9.96 9.96 0 004.862 1.258h.004c5.506 0 9.99-4.478 9.99-9.985 0-2.667-1.038-5.175-2.924-7.06A9.927 9.927 0 0012.012 2zm5.836 14.457c-.244.688-1.42 1.312-1.96 1.378-.504.062-1.157.108-3.342-.79-2.793-1.147-4.577-3.99-4.717-4.175-.138-.184-1.13-1.503-1.13-2.868 0-1.365.714-2.036.968-2.312.253-.277.554-.346.738-.346.184 0 .369.002.531.009.172.007.402-.065.629.479.231.554.785 1.916.853 2.054.069.138.115.3.023.484-.092.185-.138.3-.277.462-.138.162-.292.361-.416.485-.138.138-.283.292-.122.569.161.277.718 1.185 1.54 1.917 1.057.94 1.95 1.233 2.227 1.372.277.138.438.115.6-.069.162-.185.693-.808.878-1.085.185-.277.369-.231.623-.138.254.092 1.615.762 1.892.9.277.138.462.208.531.323.069.115.069.669-.175 1.357z" />
      </svg>
    </div>
  ),
  behance: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0057FF] text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7v-2h7v2zm-11.758 5.75c1.07 0 1.942-.81 1.942-2.022 0-1.29-1.025-2.03-2.146-2.03H6v4.052h4.242zm.234 5.37c1.37 0 2.446-.88 2.446-2.34 0-1.46-1.096-2.28-2.39-2.28H6v4.62h4.476zM3 4h7.525c2.72 0 4.79 1.41 4.79 3.65 0 1.54-.86 2.68-2.14 3.23 1.63.48 2.76 1.83 2.76 3.73 0 2.62-2.2 4.39-5.22 4.39H3V4zm16.5 7.6c-2.4 0-3.9 1.6-3.9 3.9s1.5 3.9 3.9 3.9c1.8 0 3.2-1 3.7-2.5h-2.1c-.3.6-.9.9-1.6.9-1.1 0-1.8-.7-1.9-1.8h5.7c.1-.4.1-.8.1-1.2 0-2.1-1.5-3.2-3.9-3.2zm-1.8 3.1c.1-1 .8-1.7 1.8-1.7s1.7.7 1.8 1.7h-3.6z" />
      </svg>
    </div>
  ),
  instagram: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#FCCC63] via-[#E4405F] to-[#833AB4] text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </div>
  ),
  mail: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#EA580C] text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <Mail className="w-5.5 h-5.5 text-white" />
    </div>
  ),
  x: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black border border-white/20 text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
  ),
  google: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-white/10 text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    </div>
  ),
  call: () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#34A853] text-white hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer">
      <Phone className="w-5.5 h-5.5 text-white" />
    </div>
  ),
};
