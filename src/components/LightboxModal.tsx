import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import type { FilterProject } from "../data/projects";

interface LightboxModalProps {
  project: FilterProject;
  initialIndex: number;
  onClose: () => void;
}

export default function LightboxModal({ project, initialIndex, onClose }: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false); // starts unmuted by default (sound ON)
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = project.slides || (project.video ? [project.video] : [project.image]);
  const currentSlide = slides[currentIndex];
  const isVideo = currentSlide.toLowerCase().endsWith(".mp4") || currentSlide.toLowerCase().endsWith(".mov");

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [slides.length]);

  // Touch Swipe gestures support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // Reset end point
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 md:p-8"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar Controls */}
      <div className="w-full flex items-center justify-between z-50 text-white select-none">
        <div className="flex flex-col">
          <span className="eyebrow text-[#EA580C] uppercase tracking-wider text-xs">{project.category}</span>
          <h3 className="font-display text-lg md:text-2xl uppercase tracking-tight">{project.title}</h3>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Mute button for videos */}
          {isVideo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted((prev) => !prev);
              }}
              className="text-white/60 hover:text-white transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Slide Viewer */}
      <div 
        className="relative flex-1 w-full flex items-center justify-center py-4"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
      >
        {isVideo ? (
          <div className="h-full aspect-[9/16] max-h-[75vh] md:max-h-[80vh] relative bg-black flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
            {/* Blurred backdrop video */}
            <video
              key={`bg-${currentSlide}`}
              src={currentSlide}
              loop
              muted
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl opacity-30 pointer-events-none"
            />
            {/* Sharp foreground video */}
            <video
              ref={videoRef}
              key={`fg-${currentSlide}`}
              src={currentSlide}
              loop
              muted={isMuted}
              playsInline
              autoPlay
              className="relative z-10 h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="h-full max-h-[75vh] md:max-h-[80vh] aspect-[4/3] md:aspect-[16/10] relative bg-black flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
            {/* Blurred backdrop image */}
            <img
              key={`bg-${currentSlide}`}
              src={currentSlide}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-30 pointer-events-none"
            />
            {/* Sharp foreground image */}
            <img
              key={`fg-${currentSlide}`}
              src={currentSlide}
              alt={`${project.title} slide`}
              className="relative z-10 h-full w-auto object-contain"
            />
          </div>
        )}

        {/* On-Screen Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 z-50 bg-black/60 hover:bg-[#EA580C] hover:scale-110 text-white rounded-full p-3 md:p-4 transition-all duration-300 backdrop-blur-md border border-white/10 cursor-pointer shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 z-50 bg-black/60 hover:bg-[#EA580C] hover:scale-110 text-white rounded-full p-3 md:p-4 transition-all duration-300 backdrop-blur-md border border-white/10 cursor-pointer shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Bottom slide counter and indicator dots */}
      <div className="w-full flex flex-col items-center space-y-4 z-50 text-white select-none">
        {slides.length > 1 && (
          <>
            <div className="font-display text-sm tracking-widest opacity-60">
              {currentIndex + 1} / {slides.length}
            </div>
            
            <div className="flex space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? "bg-[#EA580C] scale-125" : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
