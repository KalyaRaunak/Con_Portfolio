import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const content = contentRef.current;
    if (!content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, content);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 bg-[#0F0F10] border-t border-white/5 relative overflow-hidden flex items-center justify-center"
    >
      {/* Subtle light orange background tone (minimal accent) */}
      <div className="absolute glow-effect w-[450px] h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] pointer-events-none select-none z-0" />

      {/* Oversized background quote mark, reminiscent of the hero glow */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        style={{
          transform: "translateY(-10px)"
        }}
      >
        <span 
          className="font-display text-[#EA580C] opacity-5 select-none leading-none"
          style={{
            fontSize: "clamp(300px, 40vw, 600px)",
          }}
        >
          “
        </span>
      </div>

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-8"
      >
        <span className="eyebrow text-[#EA580C] uppercase tracking-widest">
          Client Feedback
        </span>

        {/* Large premium typography quote */}
        <blockquote className="body-large text-[#F5F5F5] font-light leading-relaxed tracking-wide max-w-3xl italic">
          "Converge didn't just build us a website; they designed a system that redefined how our audience interacts with our brand online. Their obsession with small details and smooth motion created an experience that our competitors are already trying to copy."
        </blockquote>

        {/* Author details */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="w-12 h-12 rounded-full border border-[#EA580C]/20 bg-[#171717] overflow-hidden flex items-center justify-center">
            <span className="font-display text-[#EA580C] text-lg">VK</span>
          </div>
          <div className="text-left">
            <cite className="not-italic font-display uppercase tracking-tight text-white block text-lg">
              Vikram Krishnan
            </cite>
            <span className="caption text-[#A1A1AA] block text-xs mt-0.5">
              Founder, Nilgiri Co.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
