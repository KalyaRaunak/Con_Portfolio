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
  const horizontalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preference or if mobile viewport
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion || isMobile) return;

    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !horizontal || !progressBar) return;

    // Calculate the horizontal scroll amount
    // Total width of the horizontal element minus the window width
    const scrollWidth = horizontal.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1, // smooth synchronization
          start: "top top",
          end: () => `+=${horizontal.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // Animate the horizontal translate
      pinTimeline.to(horizontal, {
        x: -scrollWidth,
        ease: "none"
      }, 0);

      // Animate the line drawing progress
      pinTimeline.to(progressBar, {
        scaleX: 1,
        ease: "none"
      }, 0);

      // Stagger steps opacity and scale as they enter view
      const steps = horizontal.querySelectorAll(".timeline-step");
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: step,
              containerAnimation: pinTimeline, // syncs with horizontal scrolling trigger
              start: "left 85%",
              end: "left 45%",
              scrub: true,
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0F0F10] border-t border-white/5" id="process-section">
      {/* Desktop Horizontal View */}
      <div className="hidden lg:block overflow-hidden h-screen flex items-center relative">
        {/* Intro header text - fixed at the top-left */}
        <div className="absolute top-20 left-12 max-w-lg z-10">
          <span className="eyebrow text-[#EA580C] uppercase block mb-2">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        {/* Progress Line container - runs behind items */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2">
          {/* Active progress bar */}
          <div
            ref={progressBarRef}
            className="h-full bg-[#EA580C] origin-left scale-x-0 w-full"
          />
        </div>

        {/* Horizontal scroll content container */}
        <div
          ref={horizontalRef}
          className="flex items-center space-x-12 px-32 h-full whitespace-nowrap"
          style={{ width: "fit-content" }}
        >
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="timeline-step w-[350px] flex-shrink-0 relative flex flex-col justify-center select-none"
            >
              {/* Step number */}
              <div className="font-display text-[#EA580C] text-8xl leading-none select-none select-none">
                {step.num}
              </div>
              
              {/* Step icon and Title */}
              <div className="flex items-center space-x-3 mt-6 mb-4">
                <div className="p-3 bg-[#171717] rounded-xl border border-white/5">
                  {step.icon}
                </div>
                <h3 className="font-display text-3xl text-[#F5F5F5] uppercase tracking-tight">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="body-default text-[#A1A1AA] whitespace-normal max-w-[320px]">
                {step.desc}
              </p>
            </div>
          ))}

          {/* End cap to keep horizontal layout spacing */}
          <div className="w-[100px] flex-shrink-0" />
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="lg:hidden py-24 px-6">
        <div className="mb-16 border-b border-white/5 pb-8">
          <span className="eyebrow text-[#EA580C] uppercase block mb-4">Our Process</span>
          <h2 className="section-headline text-white uppercase">How We Work</h2>
        </div>

        <div className="relative pl-8 space-y-16 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
          {STEPS.map((step) => (
            <div key={step.id} className="relative flex flex-col items-start text-left">
              {/* Indicator dot */}
              <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-[#0F0F10] border-2 border-[#EA580C] flex items-center justify-center z-10" />

              <div className="font-display text-5xl text-[#EA580C]/40 leading-none select-none">
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
