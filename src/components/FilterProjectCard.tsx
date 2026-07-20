import { useEffect, useRef, useState } from "react";
import type { FilterProject } from "../data/projects";

interface FilterProjectCardProps {
  project: FilterProject;
  onClick: () => void;
}

export default function FilterProjectCard({ project, onClick }: FilterProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Viewport Intersection Observer for mobile & desktop visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Slideshow cycle interval logic (Option B: Play/Cycle on Hover for desktop, Autoplay on Screen for mobile)
  useEffect(() => {
    if (!project.slides || project.slides.length === 0) return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const shouldCycle = hasHover ? isHovered : isIntersecting;

    if (!shouldCycle) {
      setCurrentSlide(0); // Reset to 1st slide (keep 1st slide as cover image)
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % project.slides!.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [project.slides, isHovered, isIntersecting]);

  // Video playback controller (Play on Hover for desktop, Autoplay in viewport for mobile)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      if (isHovered) {
        video.play().catch((err) => console.log("Hover video play blocked:", err));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    } else {
      if (isIntersecting) {
        video.play().catch((err) => console.log("Viewport video play blocked:", err));
      } else {
        video.pause();
      }
    }
  }, [isHovered, isIntersecting]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/5 bg-[#171717] aspect-[4/3] cursor-pointer"
      data-cursor="view"
    >
      {/* Media Content */}
      {project.slides && project.slides.length > 0 ? (
        <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
          {project.slides.map((slide, index) => {
            const isVideoSlide = slide.toLowerCase().endsWith(".mp4") || slide.toLowerCase().endsWith(".mov");
            const isActive = index === currentSlide;

            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none z-0"
                }`}
              >
                {/* Video Slide */}
                {isVideoSlide && isActive ? (
                  <>
                    <video
                      src={slide}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover scale-150 blur-2xl opacity-30 pointer-events-none"
                    />
                    <video
                      src={slide}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="relative z-10 h-full aspect-[9/16] object-contain transition-transform duration-750 ease-out group-hover:scale-102"
                    />
                  </>
                ) : !isVideoSlide ? (
                  <>
                    <img
                      src={slide}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-30 pointer-events-none"
                    />
                    <img
                      src={slide}
                      alt=""
                      className="relative z-10 h-full w-auto object-contain transition-transform duration-750 ease-out group-hover:scale-102"
                      loading="lazy"
                    />
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : project.isReel && project.video ? (
        /* Reels Video (Option A with blurred backdrop + poster) */
        <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
          {/* Blurred backdrop */}
          <img
            src={project.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-150 blur-2xl opacity-30 pointer-events-none"
          />
          {/* Sharp video */}
          <video
            ref={videoRef}
            src={project.video}
            poster={project.image}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            className="relative z-10 h-full aspect-[9/16] object-contain transition-transform duration-750 ease-out group-hover:scale-102"
          />
        </div>
      ) : project.video ? (
        /* Default Video */
        <video
          ref={videoRef}
          src={project.video}
          poster={project.image}
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
        />
      ) : (
        /* Default Image */
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Bottom Gradient overlay for legibility (z-20 to sit on top of video/image) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95 pointer-events-none z-20" />

      {/* Top-left category badge (z-30 to stay in front) */}
      <div className="absolute top-6 left-6 pointer-events-none z-30">
        <span className="eyebrow bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white text-[11px] shadow-lg">
          {project.category}
        </span>
      </div>

      {/* Bottom Project Details (z-30 to guarantee typography is always in front of media) */}
      <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col transform transition-all duration-300 ease-out pointer-events-none">
        <h4 className="font-display text-2xl uppercase text-[#F5F5F5] group-hover:text-[#EA580C] tracking-tight drop-shadow-lg transition-colors duration-300">
          {project.title}
        </h4>
        <span className="caption text-[#A1A1AA] mt-1 drop-shadow-md group-hover:text-white transition-colors duration-300">
          {project.service}
        </span>
      </div>
    </div>
  );
}
