
import { useState } from "react";

const CLIENTS = [
  { name: "NILGIRI CO.", id: 1 },
  { name: "VELUNOR LUXURY", id: 2 },
  { name: "OCEAN BLUE", id: 3 },
  { name: "SCOOPÉ CO.", id: 4 },
  { name: "VNS HOSTELS", id: 5 },
  { name: "STHEER LABS", id: 6 },
  { name: "SAI ACADEMY", id: 7 },
  { name: "GAYATRI SERVICES", id: 8 },
];

export default function Marquee() {
  // Duplicate list to ensure seamless infinite looping
  const doubleClients = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
  const [tappedIndices, setTappedIndices] = useState<Record<number, boolean>>({});

  const handleTap = (idx: number) => {
    setTappedIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section className="bg-[#171717] border-y border-white/5 py-12 md:py-16 overflow-hidden">
      <div className="marquee-container relative w-full flex overflow-x-hidden">
        {/* Style rule using Tailwind's arbitrary values or inline style for hover state pause */}
        <style dangerouslySetInnerHTML={{__html: `
          .marquee-container:has(.logo-item:hover) .marquee-content {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="marquee-content flex items-center space-x-20 md:space-x-32 flex-nowrap">
          {doubleClients.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              onClick={() => handleTap(idx)}
              className="logo-item flex-shrink-0 cursor-pointer select-none transition-all duration-500 hover:scale-105"
            >
              <span className={`font-display text-4xl md:text-5xl tracking-tighter transition-all duration-300 ${
                tappedIndices[idx]
                  ? "text-[#EA580C] opacity-100"
                  : "text-white/40 hover:text-[#EA580C] hover:opacity-100"
              }`}>
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
