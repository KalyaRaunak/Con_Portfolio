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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mobileProgressBarRef = useRef<HTMLDivElement>(null);

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
          const number = step.querySelector(".timeline-number-mobile");

          gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            }
          })
          .fromTo(step,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, ease: "power1.out" }, 0)
          .fromTo(number,
            { color: "rgba(234, 88, 12, 0.4)", filter: "drop-shadow(0 0 0px rgba(234, 88, 12, 0))" },
            { color: "#EA580C", filter: "drop-shadow(0 0 8px rgba(234, 88, 12, 0.4))", ease: "power1.out" }, 0);
        });

        const mobileProgressBar = mobileProgressBarRef.current;
        if (mobileProgressBar) {
          gsap.fromTo(
            mobileProgressBar,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: mobileProgressBar.parentElement,
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
              }
            }
          );
        }
        return;
      }

      // Desktop: Pinned horizontal grid with staggered off-screen slide-ins (Unchanged Animation)
      const progressBar = progressBarRef.current;
      if (!progressBar) return;

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: "+=1800", // Pinned scroll length
          invalidateOnRefresh: true,
        }
      });

      // Extend progress line across from left to right
      pinTimeline.fromTo(progressBar,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 1.0 },
        0
      );

      // Stagger sliding in each step horizontally from off-screen right
      const steps = container.querySelectorAll(".timeline-step-desktop");
      steps.forEach((step, idx) => {
        if (idx === 0) return; // Step 1 is already sitting in its column

        const stepNum = step.querySelector(".timeline-num-desktop");
        const iconContainer = step.querySelector(".timeline-icon-container");
        const screenWidth = window.innerWidth;

        pinTimeline.fromTo(
          step,
          { opacity: 0, x: () => screenWidth },
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.25 },
          (idx - 1) / (steps.length - 1)
        );

        if (iconContainer) {
          pinTimeline.fromTo(
            iconContainer,
            { borderColor: "rgba(255, 255, 255, 0.05)", backgroundColor: "#171717" },
            { borderColor: "#EA580C", backgroundColor: "rgba(234, 88, 12, 0.1)", duration: 0.15 },
            ((idx - 1) / (steps.length - 1)) + 0.1
          );
        }

        if (stepNum) {
          pinTimeline.fromTo(
            stepNum,
            { filter: "drop-shadow(0 0 0px rgba(234, 88, 12, 0))" },
            { filter: "drop-shadow(0 0 12px rgba(234, 88, 12, 0.45))", duration: 0.15 },
            ((idx - 1) / (steps.length - 1)) + 0.1
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0F0F10] border-t border-white/5" id="process-section">
      {/* Desktop Horizontal View */}
      <div className="hidden lg:flex flex-col justify-end pb-32 h-screen relative overflow-hidden px-16">
        {/* Intro Header (Top-Left aligned matching 1st image) */}
        <div className="absolute top-20 left-16 max-w-lg z-10 select-none">
          <span className="eyebrow text-[#EA580C] uppercase block mb-2">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        {/* 6-Column Layout Container */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Connector line passing behind the centers of the icons */}
          <div className="absolute top-[148px] left-[24px] right-[14%] h-[2px] bg-white/5 z-0">
            <div
              ref={progressBarRef}
              className="h-full bg-[#EA580C] origin-left scale-x-0 w-full"
            />
          </div>

          {/* Grid of Steps (Left-aligned text layout matching 1st image) */}
          <div className="grid grid-cols-6 gap-8 relative z-10">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className="timeline-step-desktop flex flex-col justify-center select-none text-left"
                style={{ opacity: idx === 0 ? 1 : 0 }} // Step 1 visible on load
              >
                {/* Step number on top */}
                <div className="timeline-num-desktop font-display text-[#EA580C] text-8xl leading-none select-none transition-all duration-300">
                  {step.num}
                </div>

                {/* Icon beside Title (Flex-row layout matching 1st image) */}
                <div className="flex items-center space-x-3 mt-6 mb-4">
                  <div className="timeline-icon-container p-3 bg-[#171717] rounded-xl border border-white/5 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="font-display text-2xl text-[#F5F5F5] uppercase tracking-tight leading-none">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="body-default text-[#A1A1AA] text-sm leading-relaxed max-w-[210px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical View (Keeps unchanged) */}
      <div className="lg:hidden py-24 px-6">
        <div className="mb-16 border-b border-white/5 pb-8">
          <span className="eyebrow text-[#EA580C] uppercase block mb-4">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        <div className="relative pl-8 space-y-16">
          {/* Vertical progress line background */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/5 z-0" />
          
          {/* Active vertical progress line */}
          <div 
            ref={mobileProgressBarRef}
            className="absolute left-[15px] top-2 w-[2px] bg-[#EA580C] origin-top scale-y-0 z-10"
            style={{ height: "calc(100% - 16px)" }}
          />

          {STEPS.map((step) => (
            <div key={step.id} className="timeline-step-mobile relative flex flex-col items-start text-left">
              <div className="font-display text-5xl text-[#EA580C]/40 leading-none select-none timeline-number-mobile">
                {step.num}
              </div>

              <div className="flex items-center space-x-3 mt-4 mb-3">
                <div className="p-2 bg-[#171717] rounded-lg border border-white/5">
                  {step.icon}
                </div>
                <h3 className="font-display text-2xl text-[#F5F5F5] uppercase tracking-tight">
                  {step.title}
                </h3>
              </div>

              <p className="body-default text-[#A1A1AA]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
