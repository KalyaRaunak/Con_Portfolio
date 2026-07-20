import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  video?: string;
  link: string;
  layout: "left" | "right";
  slides?: string[];
  isReel?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Carousel slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayTimerRef = useRef<any>(null);

  const resetAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    if (project.slides && project.slides.length > 0) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % project.slides!.length);
      }, 2500); // slide transitions every 2.5 seconds (2-3s range)
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [project.slides]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.slides) return;
    setCurrentSlide((prev) => (prev - 1 + project.slides!.length) % project.slides!.length);
    resetAutoplay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.slides) return;
    setCurrentSlide((prev) => (prev + 1) % project.slides!.length);
    resetAutoplay();
  };

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const media = mediaRef.current;
    const text = textRef.current;

    if (!container || !imageWrapper || !media || !text) return;

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

      // 2. Parallax scale on scroll: media goes from 1.15 to 1.0 as container moves through viewport
      gsap.fromTo(
        media,
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

  // Autoplay / Hover video logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hasHover = window.matchMedia("(hover: hover)").matches;
    let observer: IntersectionObserver | null = null;

    // Reels videos should autoplay on viewport entry on BOTH mobile and desktop
    if (!hasHover || project.isReel) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch((err) => {
                console.log("Viewport autoplay failed:", err);
              });
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
    } else {
      // Desktop behavior: play on hover, pause/reset on leave
      const card = containerRef.current;
      if (card) {
        const handleMouseEnter = () => {
          video.play().catch((err) => {
            console.log("Hover play failed:", err);
          });
        };
        const handleMouseLeave = () => {
          video.pause();
          video.currentTime = 0;
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [project.video, project.isReel]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row gap-y-12 items-center py-20 md:py-32 border-b border-white/5 ${
        project.layout === "left" ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Text Content */}
      <div
        ref={textRef}
        className={`w-full md:w-5/12 flex flex-col justify-center space-y-6 ${
          project.layout === "left" 
            ? "md:pr-12" 
            : "md:pl-12"
        }`}
      >
        {/* Meta / Eyebrow */}
        <div className="flex items-center space-x-4 animate-reveal">
          <span className="eyebrow text-[#EA580C] uppercase">{project.industry}</span>
          <span className="h-[1px] w-6 bg-white/10" />
          <span className="caption text-[#A1A1AA]">{project.year}</span>
        </div>

        {/* Project Name */}
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group/title">
          <h3 className="card-title text-[#F5F5F5] group-hover/title:text-[#EA580C] uppercase tracking-tight animate-reveal transition-colors duration-300">
            {project.name}
          </h3>
        </a>

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
      <div className="w-full md:w-7/12">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full group/card"
        >
          <div
            ref={imageWrapperRef}
            className="w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/5 relative"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            data-cursor="view"
          >
            {/* Branding Carousel */}
            {project.slides && project.slides.length > 0 ? (
              <div
                ref={mediaRef as React.RefObject<HTMLDivElement>}
                className="w-full h-full relative origin-center scale-115 transition-transform duration-700 ease-out bg-black flex items-center justify-center overflow-hidden"
              >
                {project.slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none z-0"
                    }`}
                  >
                    {/* Blurred backdrop image */}
                    <img
                      src={slide}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-30 pointer-events-none"
                    />
                    
                    {/* Sharp centered image */}
                    <img
                      src={slide}
                      alt={`${project.name} slide ${index + 1}`}
                      className="relative z-10 h-full w-auto object-contain"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}

                {/* Left/Right Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 hover:scale-110 text-white rounded-full p-2.5 transition-all duration-300 backdrop-blur-md border border-white/10 opacity-0 group-hover/card:opacity-100 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/90 hover:scale-110 text-white rounded-full p-2.5 transition-all duration-300 backdrop-blur-md border border-white/10 opacity-0 group-hover/card:opacity-100 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            ) : project.isReel && project.video ? (
              /* Option A: Reels Centered with Blurred Backdrop */
              <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
                {/* Blurred backdrop video */}
                <video
                  src={project.video}
                  loop
                  muted
                  playsInline
                  autoPlay
                  className="absolute inset-0 w-full h-full object-cover scale-150 blur-2xl opacity-30 pointer-events-none"
                />
                
                {/* Sharp foreground video */}
                <video
                  ref={(el) => {
                    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
                    (mediaRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
                  }}
                  src={project.video}
                  poster={project.image}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="relative z-10 h-full aspect-[9/16] object-contain origin-center transition-transform duration-700 ease-out group-hover/card:scale-105"
                />
              </div>
            ) : project.video ? (
              /* Default Video Content */
              <video
                ref={(el) => {
                  (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
                  (mediaRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
                }}
                src={project.video}
                poster={project.image}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover origin-center scale-115 transition-transform duration-700 ease-out group-hover/card:scale-105"
              />
            ) : (
              /* Default Image Content */
              <img
                ref={mediaRef as React.RefObject<HTMLImageElement>}
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover origin-center scale-115 transition-transform duration-700 ease-out group-hover/card:scale-105"
                loading="lazy"
              />
            )}
          </div>
        </a>
      </div>
    </div>
  );
}
