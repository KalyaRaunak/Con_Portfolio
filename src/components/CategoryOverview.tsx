import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface CategoryItem {
  id: number;
  title: string;
  count: string;
  description: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    title: "Websites",
    count: "08 Projects",
    description: "Immersive custom digital platforms built with premium spacing, speed, and motion design.",
    image: "/images/nilgiri_co.png"
  },
  {
    id: 2,
    title: "Brand Identity",
    count: "04 Projects",
    description: "Holistic visual systems, curated typography, and bespoke design guidelines for creative labels.",
    image: "/images/scoope_icecream.png"
  },
  {
    id: 3,
    title: "AI Creatives",
    count: "03 Projects",
    description: "Cutting-edge AI-assisted generation, art direction, and product photography visualization.",
    image: "/images/velunor_perfume.png"
  },
  {
    id: 4,
    title: "Social Media Management",
    count: "05 Projects",
    description: "Organic growth campaigns, content creation, brand positioning, and social channel design.",
    image: "/images/ocean_blue.png"
  },
  {
    id: 5,
    title: "AI & SaaS Products",
    count: "06 Projects",
    description: "End-to-end product strategy, frontend interfaces, SaaS dashboards, and AI application engineering.",
    image: "/images/stheer_uk.png"
  }
];

export default function CategoryOverview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    // Accordion toggle behavior on mobile/tablet click
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section className="py-24 md:py-40 bg-[#0F0F10] border-t border-white/5 relative overflow-hidden" id="services-section">
      {/* Subtle light orange background tone (minimal accent) */}
      <div className="absolute glow-effect w-[500px] h-[500px] top-1/2 right-[-10%] -translate-y-1/2 rounded-full opacity-[0.04] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8">
          <div>
            <span className="eyebrow text-[#EA580C] uppercase block mb-4">What We Do</span>
            <h2 className="section-headline text-white uppercase">
              Core Expertise
            </h2>
          </div>
          <p className="body-default text-[#A1A1AA] max-w-sm mt-4 md:mt-0">
            We focus on a selective set of capabilities to deliver work that actually moves the needle.
          </p>
        </div>

        {/* Categories List */}
        <div className="border-t border-white/5">
          {CATEGORIES.map((cat) => {
            const isHovered = hoveredId === cat.id;
            const isExpanded = expandedId === cat.id;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleRowClick(cat.id)}
                className={`relative border-b border-white/5 py-8 md:py-12 px-2 md:px-6 cursor-pointer transition-colors duration-500 hover:bg-[#171717] group ${
                  isExpanded ? "bg-[#171717]" : ""
                }`}
                data-cursor="view"
              >
                {/* Row Main Line */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                    <span className="font-display text-4xl md:text-6xl lg:text-7xl uppercase text-[#F5F5F5] group-hover:text-white transition-colors duration-300">
                      {cat.title}
                    </span>
                    {/* Project Count (Visible on hover on desktop, always visible on mobile/active) */}
                    <span className={`caption text-[#A1A1AA] uppercase mt-1 md:mt-0 transition-opacity duration-300 ${
                      isHovered || isExpanded ? "opacity-100" : "md:opacity-0"
                    }`}>
                      {cat.count}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`text-[#A1A1AA] group-hover:text-[#EA580C] group-hover:rotate-45 transition-all duration-300 ${
                    isExpanded ? "rotate-45 text-[#EA580C]" : ""
                  }`}>
                    <ArrowUpRight size={36} className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                </div>

                {/* Sub-info layout */}
                {/* Desktop: Hover Reveal */}
                <div
                  className={`hidden md:grid grid-cols-12 gap-6 mt-6 transition-all duration-500 overflow-hidden ${
                    isHovered ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="col-span-8 flex flex-col justify-center">
                    <p className="body-default text-[#A1A1AA] max-w-xl">
                      {cat.description}
                    </p>
                  </div>
                  
                  {/* Thumbnail Image sliding in */}
                  <div className="col-span-4 flex justify-end relative h-32 overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                        isHovered ? "scale-100 translate-x-0" : "scale-110 translate-x-12"
                      }`}
                    />
                  </div>
                </div>

                {/* Mobile: Accordion Expand */}
                <div
                  className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="body-default text-[#A1A1AA] mb-4">
                    {cat.description}
                  </p>
                  <div className="h-48 w-full overflow-hidden rounded-xl border border-white/5">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
