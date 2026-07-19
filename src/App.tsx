import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import MagneticButton from "./components/MagneticButton";
import Marquee from "./components/Marquee";
import CategoryOverview from "./components/CategoryOverview";
import ProjectCard from "./components/ProjectCard";
import type { Project } from "./components/ProjectCard";

import FilterGrid from "./components/FilterGrid";
import Timeline from "./components/Timeline";
import Testimonial from "@/components/ui/demo";
import TechEcosystem from "./components/TechEcosystem";
import Footer from "./components/Footer";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Project mock data conforming to spec requirements
const FEATURED_PROJECTS: Project[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue Education",
    industry: "Education",
    services: ["Website Design", "Branding"],
    year: "2025",
    description: "A premium coaching portal built with tailored curriculum maps, conversion layouts, and a strict oceanic typography system. Delivering accessible, high-performance learning resources.",
    image: "/images/ocean_blue.png",
    video: "/videos/ocean-blue.mp4",
    link: "https://www.oceanblueeducation.com",
    layout: "left"
  },
  {
    id: "stheer-uk",
    name: "STHEER UK",
    industry: "Digital Solutions",
    services: ["Website Design", "UI/UX"],
    year: "2025",
    description: "Bespoke digital architecture for a United Kingdom-based technology company. Optimized for massive loading speed, accessibility, and modern aesthetic animations.",
    image: "/images/stheer_uk.png",
    video: "/videos/stheer-demo.mp4",
    link: "https://www.stheer.co.uk",
    layout: "right"
  },
  {
    id: "mahesh-masala",
    name: "Mahesh Masala",
    industry: "Food & Beverage",
    services: ["Branding", "Website Design"],
    year: "2025",
    description: "Artisanal packaging, digital branding, and online commerce platform for a heritage spices manufacturer, connecting traditional taste with modern digital design.",
    image: "/images/mahesh_masala.png",
    video: "/videos/mahesh-masala.mp4",
    link: "https://maheshmasalagruhudhyog.com",
    layout: "left"
  },
  {
    id: "vns-hostel",
    name: "VNS Hostel",
    industry: "Hospitality",
    services: ["Website Design", "UI/UX"],
    year: "2024",
    description: "Modern student housing booking engine and responsive catalog layout. Built with sleek geometric grids to simplify reservation flows and room previews.",
    image: "/images/vns_hostel.png",
    video: "/videos/vns-hostel.mp4",
    link: "https://vns-tau.vercel.app/",
    layout: "right"
  },
  {
    id: "enki",
    name: "ENKI",
    industry: "Retail & Agriculture",
    services: ["Branding", "Website Design"],
    year: "2024",
    description: "Organic visual identity and digital catalog for a premium mushroom farm and supplement brand, focusing on natural textures and earthy color tones.",
    image: "/images/enki_mushrooms.png",
    video: "/videos/enki.mp4",
    link: "https://enki-bay.vercel.app/",
    layout: "left"
  },
  {
    id: "nilgiri",
    name: "Nilgiri Co.",
    industry: "Beverage & Wellness",
    services: ["E-Commerce", "Branding"],
    year: "2025",
    description: "A premium organic tea brand experience highlighting direct-from-source agricultural transparency, custom flavor profiling interfaces, and earthy color palettes.",
    image: "/images/nilgiri_co.png",
    video: "/videos/nilgiri.mp4",
    link: "https://nilgiri.co",
    layout: "right"
  },
  {
    id: "the-mist",
    name: "THE MIST",
    industry: "Luxury Retail",
    services: ["Website Design", "Brand Identity"],
    year: "2025",
    description: "An immersive e-commerce destination for a luxury fragrance label, featuring misting micro-animations, sensory product layouts, and editorial typography.",
    image: "/images/the_mist.png",
    video: "/videos/the-mist.mp4",
    link: "https://themistfragrances.com",
    layout: "left"
  }
];

// Helper components for stats counter count-up animations
interface StatBlockProps {
  target: number;
  suffix: string;
  label: string;
}

function StatBlock({ target, suffix, label }: StatBlockProps) {
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

function TorchLogoReveal() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="relative w-full flex-1 min-h-[350px] lg:min-h-[400px] flex flex-col items-center justify-center space-y-8 select-none mt-4">
      {/* Custom Mechanical Toggle Switch */}
      <div className="toggle-container">
        <input
          className="toggle-input"
          type="checkbox"
          checked={isOn}
          onChange={(e) => setIsOn(e.target.checked)}
        />
        <div className="toggle-handle-wrapper">
          <div className="toggle-handle">
            <div className="toggle-handle-knob"></div>
            <div className="toggle-handle-bar-wrapper">
              <div className="toggle-handle-bar"></div>
            </div>
          </div>
        </div>
        <div className="toggle-base">
          <div className="toggle-base-inside"></div>
        </div>
      </div>

      {/* Logo container */}
      <div className="relative w-full max-w-sm h-[420px] flex items-center justify-center">
        {/* Glowing Logo */}
        <div
          className="absolute inset-0 bg-white transition-all duration-500 ease-out"
          style={{
            maskImage: "url(/images/logo.png)",
            WebkitMaskImage: "url(/images/logo.png)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            opacity: isOn ? 0.95 : 0,
            transform: isOn ? "scale(1.05) rotate(0deg)" : "scale(0.9) rotate(-5deg)",
            filter: isOn ? "drop-shadow(0 0 25px rgba(255,255,255,0.15))" : "none",
          }}
        />

        {/* Offline Placeholder */}
        <div
          className={`absolute inset-0 border border-dashed border-white/5 rounded-3xl flex items-center justify-center transition-opacity duration-500 ${
            isOn ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="text-[10px] eyebrow text-white/10 uppercase tracking-widest">
            Offline
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleSelectCategory = (filter: string) => {
    setActiveFilter(filter);
    const workSection = document.getElementById("work-section");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGoBackToCategories = () => {
    setActiveFilter("All");
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // 1. Lenis smooth scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 2. Global Scroll progress bar linking
    gsap.to("#scroll-progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // 3. Hero entrance animations & background media parallax
    const ctx = gsap.context(() => {
      // Fade up hero description & CTA links
      gsap.fromTo(
        ".hero-fade-up",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );

      // Hero background media parallax scroll effect
      gsap.to("#hero-bg-media", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Hero glow watermark parallax scroll effect
      gsap.to("#hero-glow", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 4. About paragraph text highlight scrub effect
      const aboutWords = document.querySelectorAll(".about-word");
      if (aboutWords.length > 0) {
        gsap.fromTo(
          aboutWords,
          { color: "rgba(161, 161, 170, 0.25)" },
          {
            color: "#EA580C",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: "#about-paragraph-text",
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            }
          }
        );
      }
    });

    // Fade out scroll cue on first user scroll action
    const handleScrollFadeCue = () => {
      if (window.scrollY > 50 && scrollCueRef.current) {
        gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.3 });
        window.removeEventListener("scroll", handleScrollFadeCue);
      }
    };
    window.addEventListener("scroll", handleScrollFadeCue);

    // Clean up
    return () => {
      lenis.destroy();
      gsap.ticker.remove(ScrollTrigger.update);
      window.removeEventListener("scroll", handleScrollFadeCue);
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-[#0F0F10] text-[#F5F5F5] min-h-screen relative font-body selection:bg-[#EA580C] selection:text-white">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation bar */}
      <Navbar />

      {/* 1. Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-end px-6 md:px-12 pb-24"
        id="hero-section"
      >
        {/* Full-bleed motion graphics background with parallax scroll support */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            id="hero-bg-media"
            src="https://v1.pinimg.com/videos/iht/expMp4/39/26/74/392674ab0ea6f0d621ca88a206dbb76f_720w.mp4"
            poster="https://i.pinimg.com/videos/thumbnails/originals/39/26/74/392674ab0ea6f0d621ca88a206dbb76f.0000000.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-115 origin-center"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F10]/80 via-transparent to-[#0F0F10]" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Glow behind the title: heavily blurred CONVERGE wordmark in accent orange, low opacity */}
        <div
          id="hero-glow"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
        >
          <span 
            className="font-display text-[#EA580C] opacity-10 blur-[40px] md:blur-[60px] select-none leading-none tracking-tighter uppercase inline-block"
            style={{
              fontSize: "clamp(120px, 24vw, 440px)",
            }}
          >
            CONVERGE
          </span>
        </div>

        {/* Bottom overlay grid for subcopy and CTAs */}
        <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 flex flex-col items-start space-y-6">
            
            {/* Tagline / Eyebrow */}
            <span className="eyebrow text-[#EA580C] uppercase tracking-widest hero-fade-up">
              Creative Agency
            </span>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 mt-2 w-full hero-fade-up">
              <p className="body-large text-white/90 flex-1 leading-relaxed font-light max-w-xl">
                We craft unforgettable digital platforms, branding systems, and custom automation for labels that refuse to look ordinary.
              </p>
              
              <div className="flex flex-row items-center gap-6 mt-4 md:mt-0">
                <MagneticButton>
                  <a
                    href="#work-section"
                    className="font-display uppercase tracking-widest text-sm bg-[#EA580C] hover:bg-white text-white hover:text-black px-6 py-3 rounded-full transition-colors duration-300 shadow-md shadow-[#EA580C]/20"
                    data-cursor="view"
                  >
                    View Work
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="#contact-section"
                    className="eyebrow text-[#F5F5F5] hover:text-[#EA580C] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#EA580C] hover:after:w-full after:transition-all after:duration-300"
                    data-cursor="chat"
                  >
                    Let's Talk
                  </a>
                </MagneticButton>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Cue at Bottom */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-10 left-12 flex flex-col items-start space-y-2 pointer-events-none select-none z-20"
        >
          <span className="eyebrow text-white/55 uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[60%] bg-[#EA580C] animate-scroll-cue" />
          </div>
        </div>
      </section>

      {/* 2. About Converge Section */}
      <section
        className="py-32 md:py-48 bg-[#0F0F10] border-t border-white/5 relative z-10 overflow-hidden"
        id="about-section"
      >
        {/* Subtle light orange background tone (minimal accent) */}
        <div className="absolute glow-effect w-[500px] h-[500px] top-1/2 left-[-10%] -translate-y-1/2 rounded-full opacity-[0.05] pointer-events-none select-none z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            
            {/* Left column large statement */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="eyebrow text-[#EA580C] uppercase block mb-6">About Us</span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F5F5] uppercase tracking-tight leading-[0.95] max-w-xl">
                  We don't sell packages. We build the thing your competitors will screenshot.
                </h2>
              </div>
              <TorchLogoReveal />
            </div>

            {/* Right column supporting copy + stats grid */}
            <div className="lg:col-span-6 lg:border-l lg:border-white/5 lg:pl-16 flex flex-col justify-between">
              <p id="about-paragraph-text" className="body-large leading-relaxed max-w-xl mb-16 select-none">
                {"Converge started as a two-person team frustrated with agencies that shipped the same templated site to every client with a different logo pasted on top. We work differently: small enough to obsess over every pixel, senior enough to think past the pixel — into strategy, motion, and the systems that keep a brand consistent long after launch. Every project gets a point of view before it gets a Figma file."
                  .split(" ")
                  .map((word, idx) => (
                    <span
                      key={idx}
                      className="about-word inline-block mr-[0.25em] text-white/20 transition-colors duration-300"
                    >
                      {word}
                    </span>
                  ))}
              </p>



              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                <StatBlock target={15} suffix="+" label="Projects Shipped" />
                <StatBlock target={5} suffix="+" label="Industries Served" />
                <StatBlock target={100} suffix="%" label="Custom Design — Zero Templates" />
                
                {/* Static qualitative stat card */}
                <div className="border-t border-white/5 pt-6">
                  <div className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
                    —
                  </div>
                  <p className="caption text-[#A1A1AA] mt-2 uppercase">Fast-Growing Studio</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Client Logo Strip Marquee */}
      <Marquee />

      {/* 4. Category Overview */}
      <CategoryOverview onSelectCategory={handleSelectCategory} />

      {/* 5. Featured Projects */}
      <section className="py-24 md:py-40 bg-[#0F0F10] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8">
            <div>
              <span className="eyebrow text-[#EA580C] uppercase block mb-4">Showcase</span>
              <h2 className="section-headline text-white uppercase">Featured Projects</h2>
            </div>
            <p className="body-default text-[#A1A1AA] max-w-sm mt-4 md:mt-0">
              A selected look at some of our recent product releases, branding platforms, and bespoke web apps.
            </p>
          </div>

          {/* Project List */}
          <div className="flex flex-col">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. All Work Filter Grid */}
      <FilterGrid
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onGoBack={handleGoBackToCategories}
      />

      {/* 7. How We Work Timeline */}
      <Timeline />

      {/* 8. Testimonial */}
      <Testimonial />

      {/* Orbiting Circles Technology Ecosystem */}
      <TechEcosystem />

      {/* 9 & 10. CTA & Footer (combined layout with WhatsApp FAB) */}
      <Footer />
    </div>
  );
}
