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
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, ease: "power1.out" }, 0)
          .fromTo(number,
            { color: "rgba(255, 255, 255, 0.2)" },
            { color: "#EA580C", ease: "power1.out" }, 0);
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

      // Desktop: Smooth Pinned Scroll Timeline
      const progressBar = progressBarRef.current;
      if (!progressBar) return;

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: "+=1000",
          invalidateOnRefresh: true,
        }
      });

      // 1. Draw solid orange connector line across from left to right
      pinTimeline.fromTo(
        progressBar,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 1.0 },
        0
      );

      // 2. Sequential step highlights
      const steps = container.querySelectorAll(".timeline-step-desktop");
      steps.forEach((step, idx) => {
        const stepNum = step.querySelector(".timeline-num-desktop");
        const iconContainer = step.querySelector(".timeline-icon-container");
        const stepTitle = step.querySelector(".timeline-title-desktop");
        const stepDesc = step.querySelector(".timeline-desc-desktop");

        const startTime = idx / (steps.length - 1);

        if (idx > 0) {
          pinTimeline.fromTo(
            step,
            { opacity: 0.25, y: 16 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 },
            startTime
          );
        } else {
          pinTimeline.to(
            step,
            { opacity: 1, y: 0, duration: 0.1 },
            0
          );
        }

        if (iconContainer) {
          pinTimeline.fromTo(
            iconContainer,
            { borderColor: "rgba(255, 255, 255, 0.08)", backgroundColor: "#171717" },
            { borderColor: "#EA580C", backgroundColor: "rgba(234, 88, 12, 0.1)", duration: 0.15 },
            startTime
          );
        }

        if (stepNum) {
          pinTimeline.fromTo(
            stepNum,
            { color: "rgba(255, 255, 255, 0.2)" },
            { color: "#EA580C", duration: 0.15 },
            startTime
          );
        }

        if (stepTitle) {
          pinTimeline.fromTo(
            stepTitle,
            { color: "#A1A1AA" },
            { color: "#F5F5F5", duration: 0.15 },
            startTime
          );
        }

        if (stepDesc) {
          pinTimeline.fromTo(
            stepDesc,
            { opacity: 0.6 },
            { opacity: 1, duration: 0.15 },
            startTime
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0F0F10] border-t border-white/5 py-24 md:py-32" id="process-section">
      {/* Desktop View Container */}
      <div className="hidden lg:flex flex-col justify-center max-w-7xl mx-auto px-12 md:px-16 w-full select-none">
        {/* Intro Header */}
        <div className="w-full mb-16 border-b border-white/5 pb-8">
          <span className="eyebrow text-[#EA580C] uppercase block mb-3">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        {/* 6-Column Steps Layout */}
        <div className="relative w-full">
          <div className="grid grid-cols-6 gap-6 relative">
            {STEPS.map((step, idx) => (
              <div
                key={step.id}
                className="timeline-step-desktop flex flex-col justify-start text-left transition-opacity duration-300"
                style={{ opacity: idx === 0 ? 1 : 0.25 }}
              >
                {/* Step number on top */}
                <div className="timeline-num-desktop font-display text-white/20 text-6xl lg:text-7xl leading-none select-none transition-colors duration-300 mb-6">
                  {step.num}
                </div>

                {/* Sleek 1px Hairline Connector Bar (Between number and icon/title row - NO intersection with icon or text) */}
                <div className="relative w-full h-[1px] bg-white/10 mb-6">
                  <div
                    ref={idx === 0 ? progressBarRef : null}
                    className="absolute inset-0 bg-[#EA580C] origin-left scale-x-0 h-full w-full"
                  />
                </div>

                {/* Icon beside Title */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="timeline-icon-container p-2.5 bg-[#171717] rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="timeline-title-desktop font-display text-lg lg:text-xl text-[#A1A1AA] uppercase tracking-tight leading-none transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="timeline-desc-desktop body-default text-[#A1A1AA] text-xs lg:text-sm leading-relaxed opacity-60 transition-opacity duration-300">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="lg:hidden px-6 max-w-xl mx-auto">
        <div className="mb-16 border-b border-white/5 pb-8">
          <span className="eyebrow text-[#EA580C] uppercase block mb-4">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        <div className="relative pl-8 space-y-16">
          {/* Vertical progress line background */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[1px] bg-white/10 z-0" />
          
          {/* Active vertical progress line */}
          <div 
            ref={mobileProgressBarRef}
            className="absolute left-[15px] top-2 w-[1px] bg-[#EA580C] origin-top scale-y-0 z-10"
            style={{ height: "calc(100% - 16px)" }}
          />

          {STEPS.map((step) => (
            <div key={step.id} className="timeline-step-mobile relative flex flex-col items-start text-left">
              <div className="font-display text-5xl text-white/30 leading-none select-none timeline-number-mobile">
                {step.num}
              </div>

              <div className="flex items-center space-x-3 mt-4 mb-3">
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
