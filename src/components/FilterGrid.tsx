import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { PROJECTS } from "../data/projects";
import type { FilterProject } from "../data/projects";
import FilterProjectCard from "./FilterProjectCard";
import LightboxModal from "./LightboxModal";

const FILTERS = ["All", "Website", "Branding", "AI Creative", "Marketing", "Automation"];
const INITIAL_PROJECT_LIMIT = 6;

interface FilterGridProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  onGoBack?: () => void;
}

export default function FilterGrid({
  activeFilter: externalFilter,
  onFilterChange,
  onGoBack
}: FilterGridProps = {}) {
  const [internalFilter, setInternalFilter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<{
    project: FilterProject;
    slideIndex: number;
  } | null>(null);

  const currentFilter = externalFilter !== undefined ? externalFilter : internalFilter;

  const setActiveFilter = (filter: string) => {
    setIsExpanded(false); // Reset expansion on filter switch
    if (onFilterChange) {
      onFilterChange(filter);
    } else {
      setInternalFilter(filter);
    }
  };

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
          if (currentFilter === "All") {
            setFilteredProjects(PROJECTS);
          } else {
            setFilteredProjects(PROJECTS.filter((p) => p.category === currentFilter));
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
  }, [currentFilter]);

  // Projects to display (either limited to INITIAL_PROJECT_LIMIT or all if expanded)
  const displayedProjects = isExpanded
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_LIMIT);

  return (
    <section className="py-24 md:py-40 bg-[#0F0F10] border-t border-white/5 relative overflow-hidden" id="work-section">
      {/* Subtle light orange background tone (minimal accent) */}
      <div className="absolute glow-effect w-[500px] h-[500px] top-1/2 left-[-10%] -translate-y-1/2 rounded-full opacity-[0.04] pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="eyebrow text-[#EA580C] uppercase block">Portfolio</span>
              {onGoBack && (
                <button
                  onClick={onGoBack}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-display text-[#EA580C] hover:text-white transition-colors duration-300 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 cursor-pointer"
                  data-cursor="view"
                >
                  <ArrowLeft size={14} />
                  <span>Go Back To Categories</span>
                </button>
              )}
            </div>
            <h2 className="section-headline text-white uppercase">All Work</h2>
          </div>
          <p className="body-default text-[#A1A1AA] max-w-sm mt-4 md:mt-0">
            A curated showcase of projects where strategy, design, and code converge.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-16 border-b border-white/5 pb-6">
          {FILTERS.map((filter) => {
            const isActive = currentFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative py-2 text-sm uppercase tracking-widest font-display transition-colors duration-300 cursor-pointer ${
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
          {displayedProjects.map((project) => (
            <FilterProjectCard
              key={project.id}
              project={project}
              onClick={() => {
                if ((project.slides && project.slides.length > 0) || (project.isReel && project.video)) {
                  setActiveLightbox({ project, slideIndex: 0 });
                }
              }}
            />
          ))}
        </div>

        {/* View All Projects / Show Less Button */}
        {filteredProjects.length > INITIAL_PROJECT_LIMIT && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center space-x-3 font-display uppercase tracking-widest text-xs md:text-sm bg-white/5 hover:bg-[#EA580C] text-white px-8 py-4 rounded-full border border-white/10 transition-colors duration-300 shadow-md cursor-pointer group"
              data-cursor="view"
            >
              <span>{isExpanded ? "Show Fewer Projects" : `View All Projects (${filteredProjects.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
            </button>
          </div>
        )}

        {/* Bottom Go Back Button */}
        {onGoBack && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={onGoBack}
              className="inline-flex items-center space-x-3 font-display uppercase tracking-widest text-xs md:text-sm bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full border border-white/10 transition-colors duration-300 shadow-md cursor-pointer"
              data-cursor="view"
            >
              <ArrowLeft size={16} />
              <span>Back To Categories Overview</span>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <LightboxModal
          project={activeLightbox.project}
          initialIndex={activeLightbox.slideIndex}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </section>
  );
}

