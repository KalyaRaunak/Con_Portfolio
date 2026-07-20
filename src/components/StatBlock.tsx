import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface StatBlockProps {
  target: number;
  suffix: string;
  label: string;
}

export default function StatBlock({ target, suffix, label }: StatBlockProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration: 2.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          setCount(Math.floor(obj.value));
        }
      });
    }, el);

    return () => ctx.revert();
  }, [target]);

  return (
    <div ref={ref} className="border-t border-white/5 pt-6">
      <div className="font-display text-4xl md:text-5xl lg:text-6xl text-[#EA580C]">
        {count}{suffix}
      </div>
      <p className="caption text-[#A1A1AA] mt-2 uppercase">{label}</p>
    </div>
  );
}
