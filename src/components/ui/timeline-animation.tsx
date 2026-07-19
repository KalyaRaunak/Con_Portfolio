import React from "react";
import { motion } from "framer-motion";

interface TimelineContentProps {
  as?: string;
  className?: string;
  animationNum?: number;
  customVariants?: any;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export function TimelineContent({
  as = "div",
  className = "",
  animationNum = 0,
  customVariants,
  children,
}: TimelineContentProps) {
  // Wrap any element name dynamically in a framer-motion component
  const Component = motion(as as any);

  return (
    <Component
      className={className}
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={animationNum}
    >
      {children}
    </Component>
  );
}
