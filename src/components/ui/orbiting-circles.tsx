import React from "react";

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
}

export function OrbitingCircles({
  className = "",
  children,
  reverse = false,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
}: OrbitingCirclesProps) {
  const childrenArray = React.Children.toArray(children);
  const totalChildren = childrenArray.length;

  return (
    <>
      {/* Path SVG */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-white/10 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {/* Orbiting Children */}
      {childrenArray.map((child, index) => {
        // Distribute children evenly by offsetting their start times using negative delay
        const childDelay = -((index * duration) / totalChildren);

        return (
          <div
            key={index}
            style={{
              "--radius": radius,
              "--duration": `${duration}s`,
              "--delay": `${childDelay}s`,
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            } as React.CSSProperties}
            className={`absolute flex items-center justify-center rounded-full animate-orbit ${
              reverse ? "[animation-direction:reverse]" : ""
            } ${className}`}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
