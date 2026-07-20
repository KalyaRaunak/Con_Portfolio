import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Search, Layers, Cpu, Award, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const STEPS: Step[] = [
  {
    id: "discover",
    num: "01",
    title: "Discover",
    desc: "We learn your business, your users, and what 'done well' actually means for you.",
    icon: <Search className="w-6 h-6 text-[#EA580C]" />
  },
  {
    id: "strategy",
    num: "02",
    title: "Strategy",
    desc: "We map the site or campaign to a goal, not a template.",
    icon: <Eye className="w-6 h-6 text-[#EA580C]" />
  },
  {
    id: "design",
    num: "03",
    title: "Design",
    desc: "Every screen is designed with intent — nothing dropped in from a kit.",
    icon: <Layers className="w-6 h-6 text-[#EA580C]" />
  },
  {
    id: "develop",
    num: "04",
    title: "Develop",
    desc: "Built clean, fast, and built to last past launch day.",
    icon: <Cpu className="w-6 h-6 text-[#EA580C]" />
  },
  {
    id: "launch",
    num: "05",
    title: "Launch",
    desc: "Shipped, tested, and handed off without loose ends.",
    icon: <Award className="w-6 h-6 text-[#EA580C]" />
  },
  {
    id: "grow",
    num: "06",
    title: "Grow",
    desc: "Ongoing marketing, automation, and iteration once it's live.",
    icon: <TrendingUp className="w-6 h-6 text-[#EA580C]" />
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile vertical scroll reveal
        const mobileSteps = container.querySelectorAll(".timeline-step-mobile");
        mobileSteps.forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 55%",
                scrub: true,
              }
            }
          );
        });
        return;
      }

      // Desktop: Pinned Scroll Timeline (Step 1 strictly visible on load, steps 2-6 reveal 1-by-1 sequentially on scroll)
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: "+=1800", // Pinned scroll distance to give clear spacing between step reveals
          invalidateOnRefresh: true,
        }
      });

      const steps = Array.from(container.querySelectorAll<HTMLElement>(".timeline-step-desktop"));

      // Set initial states: Step 1 visible at start, Steps 2-6 hidden off-y
      steps.forEach((step, idx) => {
        if (idx > 0) {
          gsap.set(step, { opacity: 0, y: 32 });
        } else {
          gsap.set(step, { opacity: 1, y: 0 });
        }
      });

      // Animate steps 2 to 6 into view one after another as user scrolls down
      steps.forEach((step, idx) => {
        if (idx === 0) return; // Step 1 already visible

        // Distribute step reveals evenly across the scroll duration
        pinTimeline.to(
          step,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          (idx - 1) * 0.8
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0F0F10] border-t border-white/5" id="process-section">
      {/* Desktop View Container */}
      <div className="hidden lg:flex flex-col justify-end pb-24 md:pb-32 h-screen relative overflow-hidden px-12 md:px-16">
        {/* Intro Header (Top-Left aligned matching reference image) */}
        <div className="absolute top-16 left-12 md:left-16 max-w-lg z-10 select-none">
          <span className="eyebrow text-[#EA580C] uppercase block mb-2">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        {/* 6-Column Steps Layout */}
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-6 gap-6 relative z-10">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className="timeline-step-desktop flex flex-col justify-start select-none text-left transition-all duration-300"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              >
                {/* Step number on top (Clean orange Anton font) */}
                <div className="timeline-num-desktop font-display text-[#EA580C] text-7xl lg:text-8xl leading-none select-none mb-6">
                  {step.num}
                </div>

                {/* Icon beside Title */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="timeline-icon-container p-2.5 bg-[#171717] rounded-xl border border-white/10 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="timeline-title-desktop font-display text-xl lg:text-2xl text-[#F5F5F5] uppercase tracking-tight leading-none">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="timeline-desc-desktop body-default text-[#A1A1AA] text-xs lg:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="lg:hidden py-24 px-6 max-w-xl mx-auto">
        <div className="mb-16 border-b border-white/5 pb-8">
          <span className="eyebrow text-[#EA580C] uppercase block mb-4">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        <div className="space-y-12">
          {STEPS.map((step) => (
            <div key={step.id} className="timeline-step-mobile flex flex-col items-start text-left">
              <div className="font-display text-5xl text-[#EA580C] leading-none select-none mb-2">
                {step.num}
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-[#171717] rounded-lg border border-white/10">
                  {step.icon}
                </div>
                <h3 className="font-display text-2xl text-[#F5F5F5] uppercase tracking-tight">
                  {step.title}
                </h3>
              </div>

              <p className="body-default text-[#A1A1AA] text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
