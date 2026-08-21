import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import type { FilterProject } from "../data/projects";

interface LightboxModalProps {
  project: FilterProject;
  initialIndex: number;
  onClose: () => void;
}

export default function LightboxModal({ project, initialIndex, onClose }: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const slides = project.slides || (project.video ? [project.video] : [project.image]);
  const currentSlide = slides[currentIndex];
  const isVideo = currentSlide.toLowerCase().endsWith(".mp4") || currentSlide.toLowerCase().endsWith(".mov");

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    };
  }, [handlePrev, handleNext, closeModal]);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
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

  const handleOverlayMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 md:p-8"
      onMouseDown={handleOverlayMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="w-full h-full flex flex-col justify-between items-center outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Controls */}
        <div className="w-full flex items-center justify-between z-50 text-white select-none">
          <div className="flex flex-col">
            <span id={descId} className="eyebrow text-[#EA580C] uppercase tracking-wider text-xs">{project.category}</span>
            <h3 id={titleId} className="font-display text-lg md:text-2xl uppercase tracking-tight">{project.title}</h3>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Mute button for videos */}
            {isVideo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((prev) => !prev);
                }}
                className="text-white/60 hover:text-white transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            )}

            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              className="text-white/60 hover:text-white transition-colors p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Slide Viewer */}
        <div className="relative flex-1 w-full flex items-center justify-center py-4">
          {isVideo ? (
            <div className="h-full aspect-[9/16] max-h-[75vh] md:max-h-[80vh] relative bg-black flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
              <video
                key={`bg-${currentSlide}`}
                src={currentSlide}
                loop
                muted
                playsInline
                autoPlay
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl opacity-30 pointer-events-none"
              />
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
              <img
                key={`bg-${currentSlide}`}
                src={currentSlide}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-30 pointer-events-none"
              />
              <img
                key={`fg-${currentSlide}`}
                src={currentSlide}
                alt={`${project.title} slide ${currentIndex + 1} of ${slides.length}`}
                className="relative z-10 h-full w-auto object-contain"
              />
            </div>
          )}

          {/* On-Screen Navigation Arrows */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 md:left-6 z-50 bg-black/60 hover:bg-[#EA580C] hover:scale-110 text-white rounded-full p-3 md:p-4 transition-all duration-300 backdrop-blur-md border border-white/10 cursor-pointer shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
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
              <div className="font-display text-sm tracking-widest opacity-60" aria-live="polite">
                {currentIndex + 1} / {slides.length}
              </div>

              <div className="flex space-x-2" role="tablist" aria-label="Slides">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentIndex}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? "bg-[#EA580C] scale-125" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
