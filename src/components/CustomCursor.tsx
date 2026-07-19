import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial opacity to 0
    gsap.set(cursor, { opacity: 0, scale: 1 });

    // GSAP quickTo for smooth performance at 60fps
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const onMouseEnterWindow = () => {
      setIsVisible(true);
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    // Global event listener for hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find closest interactive element or one with data-cursor
      const interactive = target.closest("[data-cursor], a, button, [role='button']");
      
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor") || "";
        setHoverText(text.toUpperCase());
        
        // Custom styling for hovered state
        gsap.to(cursor, {
          width: text ? 80 : 50,
          height: text ? 80 : 50,
          backgroundColor: text ? "rgba(234, 88, 12, 0.15)" : "rgba(255, 255, 255, 0.1)",
          borderColor: "#EA580C",
          borderWidth: 1,
          borderStyle: "solid",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor], a, button, [role='button']");
      
      if (interactive) {
        // If we are leaving the interactive element
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!relatedTarget || !relatedTarget.closest("[data-cursor], a, button, [role='button']")) {
          setIsHovered(false);
          setHoverText("");
          
          gsap.to(cursor, {
            width: 8,
            height: 8,
            backgroundColor: "#EA580C",
            borderWidth: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed top-0 left-0 flex items-center justify-center rounded-full text-white font-display text-[9px] tracking-widest z-[9999]"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {isHovered && hoverText && (
        <span className="animate-fade-in font-display tracking-widest text-[#EA580C] text-[10px]">
          {hoverText}
        </span>
      )}
    </div>
  );
}
