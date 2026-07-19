import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: string;
  name: string;
  industry: string;
  services: string[];
  year: string;
  description: string;
  image: string;
  link: string;
  layout: "left" | "right";
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!container || !imageWrapper || !image || !text) return;

    // Create a GSAP Context to handle responsive/scoped animation cleanups automatically
    const ctx = gsap.context(() => {
      // 1. Clip path reveal & image scale on entrance
      gsap.fromTo(
        imageWrapper,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Parallax scale on scroll: image goes from 1.15 to 1.0 as container moves through viewport
      gsap.fromTo(
        image,
        { scale: 1.15 },
        {
          scale: 1.0,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 3. Staggered text fade-up
      const textElements = text.querySelectorAll(".animate-reveal");
      gsap.fromTo(
        textElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, [project]);

  return (
    <div
      ref={containerRef}
      className={`gutter-grid gap-y-12 items-center py-20 md:py-32 border-b border-white/5 ${
        project.layout === "left" ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Text Content */}
      <div
        ref={textRef}
        className={`col-span-12 md:col-span-5 flex flex-col justify-center space-y-6 ${
          project.layout === "left" 
            ? "order-2 md:order-1 md:pr-12" 
            : "order-2 md:order-2 md:pl-12"
        }`}
      >
        {/* Meta / Eyebrow */}
        <div className="flex items-center space-x-4 animate-reveal">
          <span className="eyebrow text-[#EA580C] uppercase">{project.industry}</span>
          <span className="h-[1px] w-6 bg-white/10" />
          <span className="caption text-[#A1A1AA]">{project.year}</span>
        </div>

        {/* Project Name */}
        <h3 className="card-title text-[#F5F5F5] uppercase tracking-tight animate-reveal">
          {project.name}
        </h3>

        {/* Services Badges */}
        <div className="flex flex-wrap gap-2 animate-reveal">
          {project.services.map((service, idx) => (
            <span
              key={idx}
              className="caption border border-white/5 px-3 py-1 rounded-full text-[#A1A1AA]"
            >
              {service}
            </span>
          ))}
        </div>

        {/* Case Study Snippet */}
        <p className="body-default text-[#A1A1AA] leading-relaxed max-w-lg animate-reveal">
          {project.description}
        </p>

        {/* Visit Link */}
        <div className="pt-4 animate-reveal">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[#F5F5F5] hover:text-[#EA580C] group font-display uppercase tracking-widest text-[12px] transition-colors duration-300"
            data-cursor="view"
          >
            <span>Visit Project</span>
            <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Image Content */}
      <div
        className={`col-span-12 md:col-span-7 ${
          project.layout === "left" 
            ? "order-1 md:order-2" 
            : "order-1 md:order-1"
        }`}
      >
        <div
          ref={imageWrapperRef}
          className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/5 relative"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          data-cursor="view"
        >
          <img
            ref={imageRef}
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover origin-center scale-115"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
