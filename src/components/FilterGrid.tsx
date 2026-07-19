import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";

interface FilterProject {
  id: string;
  title: string;
  category: string; // matches filter: "Website" | "Branding" | "AI Creative" | "Marketing" | "Automation"
  service: string;
  image: string;
  video?: string;
}

const PROJECTS: FilterProject[] = [
  {
    id: "ocean-blue",
    title: "Ocean Blue Education",
    category: "Website",
    service: "Coaching Institute Web & Ad Campaigns",
    image: "/images/ocean_blue.png",
    video: "/videos/ocean-blue.mp4"
  },
  {
    id: "stheer-uk",
    title: "STHEER UK",
    category: "Website",
    service: "Digital Solutions & UI Architecture",
    image: "/images/stheer_uk.png",
    video: "/videos/stheer-demo.mp4"
  },
  {
    id: "mahesh-masala",
    title: "Mahesh Masala",
    category: "Website",
    service: "Spices Brand Identity & Store",
    image: "/images/mahesh_masala.png",
    video: "/videos/mahesh-masala.mp4"
  },
  {
    id: "vns-hostel",
    title: "VNS Hostel",
    category: "Website",
    service: "Student Accommodation Booking Platform",
    image: "/images/vns_hostel.png",
    video: "/videos/vns-hostel.mp4"
  },
  {
    id: "ssi",
    title: "SSI",
    category: "Website",
    service: "Coaching Institute Enrollment Systems",
    image: "/images/ssi_education.png"
  },
  {
    id: "enki",
    title: "ENKI",
    category: "Website",
    service: "Organic Mushroom Branding & Design",
    image: "/images/enki_mushrooms.png",
    video: "/videos/enki.mp4"
  },
  {
    id: "ganpati-computers",
    title: "Ganpati Computers",
    category: "Website",
    service: "IT Repair Booking & CRM Pipelines",
    image: "/images/ganpati_computers.png"
  },
  {
    id: "nilgiri",
    title: "Nilgiri Co.",
    category: "Website",
    service: "Premium Tea E-Commerce Platform",
    image: "/images/nilgiri_co.png",
    video: "/videos/nilgiri.mp4"
  },
  {
    id: "the-mist",
    title: "THE MIST",
    category: "Website",
    service: "Luxury Fragrance Digital Showcase",
    image: "/images/the_mist.png",
    video: "/videos/the-mist.mp4"
  },
  {
    id: "kunj-infra-logo",
    title: "Kunj Infra Logo",
    category: "Branding",
    service: "Infrastructure Brand Identity",
    image: "/images/kunj_infra_logo.png"
  },
  {
    id: "enki-logo",
    title: "ENKI Logo",
    category: "Branding",
    service: "Organic Apothecary Brand Identity",
    image: "/images/enki_logo.png"
  },
  {
    id: "velunor-brand",
    title: "Velunor",
    category: "Branding",
    service: "Luxury Fragrance Package Design",
    image: "/images/velunor_perfume.png"
  },
  {
    id: "velunor-blue",
    title: "Velunor Blue",
    category: "Branding",
    service: "Oceanic Fragrance Bottle Design",
    image: "/images/velunor_blue.png"
  },
  {
    id: "velunor-red",
    title: "Velunor Red",
    category: "Branding",
    service: "Crimson Fragrance Bottle Design",
    image: "/images/velunor_red.png"
  },
  {
    id: "watch-poster",
    title: "Watch Poster",
    category: "Branding",
    service: "Chronograph Advertising Campaign",
    image: "/images/watch_poster.png"
  },
  {
    id: "jwel-showcase",
    title: "Jwel Showcase",
    category: "Branding",
    service: "Luxury Jewelry Digital Layouts",
    image: "/images/jwel_showcase.png"
  },
  {
    id: "scoope-brand",
    title: "Scoope",
    category: "Branding",
    service: "Artisanal Ice Cream Branding",
    image: "/images/scoope_icecream.png"
  },
  {
    id: "nilgiri-brand",
    title: "Nilgiri.co",
    category: "Branding",
    service: "Organic Tea Packaging & Identity",
    image: "/images/nilgiri_co.png"
  },
  {
    id: "magazine",
    title: "Magzine",
    category: "Branding",
    service: "Editorial Print Publication Mockups",
    image: "/images/magzine.png"
  },
  {
    id: "one8-green",
    title: "one8 Green",
    category: "AI Creative",
    service: "Athletic Sneaker Concept Generation",
    image: "/images/one8_green.png"
  },
  {
    id: "one8-red",
    title: "one8 Red",
    category: "AI Creative",
    service: "Athletic Sneaker Concept Generation",
    image: "/images/one8_red.png"
  },
  {
    id: "one8-sports",
    title: "One8 sports",
    category: "AI Creative",
    service: "Activewear Gear Mockups",
    image: "/images/one8_sports.png"
  },
  {
    id: "watch-creative",
    title: "Watch",
    category: "AI Creative",
    service: "Futuristic Holographic Smartwatch Concept",
    image: "/images/watch_creative.png"
  },
  {
    id: "creative-cuts",
    title: "Creative Cuts",
    category: "AI Creative",
    service: "Modern Barbershop Concept Art",
    image: "/images/creative_cuts.png"
  }
];

const FILTERS = ["All", "Website", "Branding", "AI Creative", "Marketing", "Automation"];

interface FilterProjectCardProps {
  project: FilterProject;
}

function FilterProjectCard({ project }: FilterProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hasHover = window.matchMedia("(hover: hover)").matches;
    let observer: IntersectionObserver | null = null;

    if (!hasHover) {
      // Mobile behavior: autoplay video when scrolled into view
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch((err) => {
                console.log("Mobile autoplay failed:", err);
              });
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
    } else {
      // Desktop behavior: play on hover, pause/reset on leave
      const card = containerRef.current;
      if (card) {
        const handleMouseEnter = () => {
          video.play().catch((err) => {
            console.log("Hover play failed:", err);
          });
        };
        const handleMouseLeave = () => {
          video.pause();
          video.currentTime = 0;
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [project.video]);

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/5 bg-[#171717] aspect-[4/3] cursor-pointer"
      data-cursor="view"
    >
      {/* Media: Video or Image */}
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.image}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
        />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Bottom Gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90 pointer-events-none" />

      {/* Top-left category badge */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <span className="eyebrow bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white text-[11px]">
          {project.category}
        </span>
      </div>

      {/* Bottom Project Details */}
      {/* Desktop: Slide up on hover. Mobile: Always visible */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-col md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none">
        <h4 className="font-display text-2xl uppercase text-[#F5F5F5] tracking-tight">
          {project.title}
        </h4>
        <span className="caption text-[#A1A1AA] mt-1">{project.service}</span>
      </div>

      {/* Mobile details (always visible at bottom on touch devices) */}
      <div className="md:hidden absolute bottom-6 left-6 right-6 flex flex-col pointer-events-none">
        <h4 className="font-display text-2xl uppercase text-[#F5F5F5] tracking-tight">
          {project.title}
        </h4>
        <span className="caption text-[#A1A1AA] mt-1">{project.service}</span>
      </div>
    </div>
  );
}

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

  const currentFilter = externalFilter !== undefined ? externalFilter : internalFilter;

  const setActiveFilter = (filter: string) => {
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
          {filteredProjects.map((project) => (
            <FilterProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom Go Back Button */}
        {onGoBack && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={onGoBack}
              className="inline-flex items-center space-x-3 font-display uppercase tracking-widest text-sm bg-white/5 hover:bg-[#EA580C] text-white px-8 py-4 rounded-full border border-white/10 transition-colors duration-300 shadow-md cursor-pointer"
              data-cursor="view"
            >
              <ArrowLeft size={18} />
              <span>Back To Categories Overview</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
