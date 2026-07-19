import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  range?: number; // active radius
  speed?: number;
  [key: string]: any;
}

export default function MagneticButton({
  children,
  className = "",
  range = 45,
  speed = 0.3,
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return; // Disable on touch devices

    const container = containerRef.current;
    if (!container) return;

    // Use quickTo for high performance 60fps springs
    const xTo = gsap.quickTo(container, "x", { duration: speed, ease: "power2.out" });
    const yTo = gsap.quickTo(container, "y", { duration: speed, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance between cursor and center of button
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < range) {
        // Pull strength scales with distance (closer = stronger pull)
        const strength = 0.4;
        xTo(deltaX * strength);
        yTo(deltaY * strength);
      } else {
        // Return to center if out of range
        xTo(0);
        yTo(0);
      }
    };

    const onMouseLeave = () => {
      // Smoothly animate back to center on leave
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, speed]);

  return (
    <div
      ref={containerRef}
      className={`inline-block transition-transform duration-100 ease-out ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
