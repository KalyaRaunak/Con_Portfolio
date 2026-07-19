import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FilterProject {
  id: string;
  title: string;
  category: string; // matches filter: "Website" | "Branding" | "AI Creative" | "Marketing" | "Automation"
  service: string;
  image: string;
}

const PROJECTS: FilterProject[] = [
  {
    id: "nilgiri",
    title: "Nilgiri Co",
    category: "Website",
    service: "E-Commerce & Branding",
    image: "/images/nilgiri_co.png"
  },
  {
    id: "velunor",
    title: "Velunor Perfume",
    category: "AI Creative",
    service: "Art Direction & AI Art",
    image: "/images/velunor_perfume.png"
  },
  {
    id: "ocean-blue",
    title: "Ocean Blue Education",
    category: "Marketing",
    service: "Campaigns & Marketing",
    image: "/images/ocean_blue.png"
  },
  {
    id: "scoope",
    title: "Scoopé Ice Cream",
    category: "Branding",
    service: "Identity & Web Design",
    image: "/images/scoope_icecream.png"
  },
  {
    id: "gayatri",
    title: "Gayatri Stitching",
    category: "Automation",
    service: "Web Platform & CRM",
    image: "/images/gayatri_stitching.png"
  },
  {
    id: "vns",
    title: "VNS Hostel",
    category: "Website",
    service: "UI/UX & Web Dev",
    image: "/images/vns_hostel.png"
  }
];

const FILTERS = ["All", "Website", "Branding", "AI Creative", "Marketing", "Automation"];

export default function FilterGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<FilterProject[]>(PROJECTS);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Smooth transition between filters
    const ctx = gsap.context(() => {
      // Fade out current items
      gsap.to(grid.children, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          // Update items state
          if (activeFilter === "All") {
            setFilteredProjects(PROJECTS);
          } else {
            setFilteredProjects(PROJECTS.filter((p) => p.category === activeFilter));
          }

          // Fade back in updated list
          gsap.fromTo(
            grid.children,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", stagger: 0.05 }
          );
        }
      });
    }, grid);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section className="py-24 md:py-40 bg-[#0F0F10] border-t border-white/5" id="work-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8">
          <div>
            <span className="eyebrow text-[#EA580C] uppercase block mb-4">Portfolio</span>
            <h2 className="section-headline text-white uppercase">All Work</h2>
          </div>
          <p className="body-default text-[#A1A1AA] max-w-sm mt-4 md:mt-0">
            A curated showcase of projects where strategy, design, and code converge.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-16 border-b border-white/5 pb-6">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative py-2 text-sm uppercase tracking-widest font-display transition-colors duration-300 ${
                  isActive ? "text-[#EA580C]" : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                {filter}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EA580C] animate-width-reveal" />
                )}
              </button>
            );
          })}
        </div>

        {/* Work Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/5 bg-[#171717] aspect-[4/3] cursor-pointer"
              data-cursor="view"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Bottom Gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              {/* Top-left category badge */}
              <div className="absolute top-6 left-6">
                <span className="eyebrow bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white text-[11px]">
                  {project.category}
                </span>
              </div>

              {/* Bottom Project Details */}
              {/* Desktop: Slide up on hover. Mobile: Always visible */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <h4 className="font-display text-2xl uppercase text-[#F5F5F5] tracking-tight">
                  {project.title}
                </h4>
                <span className="caption text-[#A1A1AA] mt-1">{project.service}</span>
              </div>

              {/* Mobile details (always visible at bottom on touch devices) */}
              <div className="md:hidden absolute bottom-6 left-6 right-6 flex flex-col">
                <h4 className="font-display text-2xl uppercase text-[#F5F5F5] tracking-tight">
                  {project.title}
                </h4>
                <span className="caption text-[#A1A1AA] mt-1">{project.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
