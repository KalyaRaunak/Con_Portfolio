import { OrbitingCircles } from "./ui/orbiting-circles";
import { 
  PenTool, 
  Code2, 
  Cpu, 
  Globe, 
  Sparkles, 
  Database, 
  Smartphone, 
  Search, 
  Zap, 
  ShieldCheck
} from "lucide-react";

export default function TechEcosystem() {
  return (
    <section className="py-24 md:py-32 bg-[#0F0F10] relative overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute glow-effect w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mb-16">
          <div className="flex items-center justify-center space-x-2">
            <span className="h-[1px] w-8 bg-[#EA580C]/50" />
            <span className="eyebrow text-[#EA580C] uppercase tracking-widest text-[11px]">Technology Hub</span>
            <span className="h-[1px] w-8 bg-[#EA580C]/50" />
          </div>
          <h2 className="section-headline text-white uppercase">
            Our Tech Ecosystem
          </h2>
          <p className="body-default text-[#A1A1AA] max-w-lg mx-auto">
            We build with cutting-edge technologies to guarantee maximum speed, security, and scalability for every project.
          </p>
        </div>

        {/* Orbiting Circles Container */}
        <div className="relative flex h-[500px] w-full max-w-lg items-center justify-center overflow-hidden rounded-full border border-white/5 bg-transparent/20 backdrop-blur-sm">
          {/* Central Logo */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-white font-display text-2xl font-bold tracking-widest shadow-[0_0_60px_rgba(234,88,12,0.15)] animate-pulse">
            <span className="text-[#EA580C]">C</span>
          </div>

          {/* Inner Circle (radius: 100, speed: 20s) */}
          <OrbitingCircles radius={100} duration={25} iconSize={44}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <PenTool size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Code2 size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Cpu size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Globe size={20} />
            </div>
          </OrbitingCircles>

          {/* Outer Circle (radius: 180, speed: 45s, reverse) */}
          <OrbitingCircles radius={180} duration={45} reverse iconSize={44}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Sparkles size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Database size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Smartphone size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Search size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <Zap size={20} />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-white/5 text-[#A1A1AA] hover:text-[#EA580C] hover:border-[#EA580C]/30 transition-colors duration-300">
              <ShieldCheck size={20} />
            </div>
          </OrbitingCircles>
        </div>
      </div>
    </section>
  );
}
