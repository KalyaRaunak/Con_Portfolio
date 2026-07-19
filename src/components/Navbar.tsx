import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  // Scroll listener for show/hide and background transition
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine background surface state
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update navbar visibility with GSAP
  useEffect(() => {
    if (!navbarRef.current) return;
    
    gsap.to(navbarRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [isVisible]);

  // Mobile menu open animation
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      
      // Animate takeover screen
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.75,
        ease: "power4.inOut"
      });

      // Animate links staggered
      if (menuLinksRef.current) {
        const links = menuLinksRef.current.children;
        gsap.fromTo(
          links,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.2 }
        );
      }
    } else {
      // Re-enable scroll
      document.body.style.overflow = "unset";

      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.6,
        ease: "power4.inOut"
      });
    }
  }, [isOpen]);

  const handleLinkClick = (selector: string) => {
    setIsOpen(false);
    const element = document.querySelector(selector);
    if (element) {
      // We will scroll using Lenis (which coordinates with window scroll)
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <div 
        className="fixed top-0 left-0 w-full h-[2px] bg-[#EA580C] z-[9999] origin-left scale-x-0" 
        id="scroll-progress-bar"
      />

      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-[1000] px-6 py-4 md:px-12 md:py-6 transition-colors duration-300 ${
          isScrolled 
            ? "bg-[#171717]/95 border-b border-white/5 backdrop-blur-md" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#"
            className="font-display uppercase text-2xl tracking-tight text-[#F5F5F5] hover:text-[#EA580C] transition-colors duration-300"
            data-cursor="home"
          >
            CONVERGE DIGITALS
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => handleLinkClick("#work-section")}
              className="eyebrow text-[#A1A1AA] hover:text-[#EA580C] transition-colors duration-300"
            >
              Work
            </button>
            <button
              onClick={() => handleLinkClick("#about-section")}
              className="eyebrow text-[#A1A1AA] hover:text-[#EA580C] transition-colors duration-300"
            >
              Studio
            </button>
            <button
              onClick={() => handleLinkClick("#process-section")}
              className="eyebrow text-[#A1A1AA] hover:text-[#EA580C] transition-colors duration-300"
            >
              Process
            </button>
            
            <MagneticButton>
              <button
                onClick={() => handleLinkClick("#contact-section")}
                className="eyebrow px-5 py-2 border border-white/10 rounded-full text-[#F5F5F5] hover:bg-[#EA580C] hover:border-[#EA580C] hover:text-white transition-all duration-300"
              >
                Let's Talk
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#F5F5F5] hover:text-[#EA580C] transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Takeover Screen */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#0F0F10] z-[2000] flex flex-col justify-between p-8 md:p-16"
        style={{ clipPath: "circle(0% at 90% 10%)" }}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-display uppercase text-2xl tracking-tight text-[#F5F5F5]">
            CONVERGE DIGITALS
          </span>
          
          <MagneticButton className="p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 text-[#F5F5F5] hover:text-[#EA580C] bg-[#171717] rounded-full border border-white/5"
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
          </MagneticButton>
        </div>

        {/* Menu Links */}
        <div
          ref={menuLinksRef}
          className="flex flex-col space-y-6 md:space-y-10 my-auto text-left"
        >
          <button
            onClick={() => handleLinkClick("#work-section")}
            className="font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#EA580C] transition-colors text-left"
          >
            01 / Work
          </button>
          <button
            onClick={() => handleLinkClick("#about-section")}
            className="font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#EA580C] transition-colors text-left"
          >
            02 / Studio
          </button>
          <button
            onClick={() => handleLinkClick("#process-section")}
            className="font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#EA580C] transition-colors text-left"
          >
            03 / Process
          </button>
          <button
            onClick={() => handleLinkClick("#contact-section")}
            className="font-display text-5xl md:text-7xl uppercase tracking-tighter hover:text-[#EA580C] transition-colors text-left"
          >
            04 / Let's Talk
          </button>
        </div>

        {/* Mobile Menu Footer */}
        <div className="flex flex-col sm:flex-row justify-between border-t border-white/5 pt-6 text-[#A1A1AA] caption">
          <div>
            <p className="eyebrow text-white mb-2">Connect</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-[#EA580C] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#EA580C] transition-colors">LinkedIn</a>
              <a href="mailto:hello@converge.agency" className="hover:text-[#EA580C] transition-colors">hello@converge.agency</a>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="eyebrow text-white mb-2">Location</p>
            <p>INDIA</p>
          </div>
        </div>
      </div>
    </>
  );
}
