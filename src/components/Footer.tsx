import { useRef, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cta = ctaRef.current;
    if (!cta) return;

    // Shift background brightness as CTA enters view
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cta,
        { backgroundColor: "#0F0F10" },
        {
          backgroundColor: "#171717",
          duration: 1.0,
          scrollTrigger: {
            trigger: cta,
            start: "top 70%",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );

      // Staggered text fade in
      const ctaElements = cta.querySelectorAll(".cta-fade");
      gsap.fromTo(
        ctaElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cta,
            start: "top 60%",
            toggleActions: "play none none none"
          }
        }
      );
    }, cta);

    return () => ctx.revert();
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Contact & CTA Section (Bookend layout matching Hero) */}
      <section
        ref={ctaRef}
        className="py-32 md:py-48 bg-[#0F0F10] relative overflow-hidden border-t border-white/5 flex flex-col items-center justify-center text-center transition-colors duration-500"
        id="contact-section"
      >
        {/* Glow effect at the bottom */}
        <div className="absolute glow-effect w-[400px] h-[400px] bottom-0 left-1/2 -translate-x-1/2 rounded-full opacity-10" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center space-y-8">
          <span className="eyebrow text-[#EA580C] uppercase tracking-widest cta-fade">
            Let's Collaborate
          </span>

          <h2 className="font-display text-5xl md:text-8xl uppercase leading-none tracking-tighter text-[#F5F5F5] cta-fade">
            Ready to build <br />
            something <br />
            exceptional?
          </h2>

          <div className="pt-8 cta-fade">
            <MagneticButton>
              <a
                href="https://wa.me/919999999999?text=Hello%20Converge,%20I'd%20like%20to%20discuss%20a%20project!"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display uppercase tracking-widest text-sm bg-[#EA580C] text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-lg shadow-[#EA580C]/20"
                data-cursor="chat"
              >
                Let's Build Together
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer
        ref={footerRef}
        className="bg-[#171717] pt-20 pb-8 border-t border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16">

            {/* Studio Info */}
            <div className="space-y-4 col-span-1 md:col-span-2">
              <span className="font-display uppercase text-2xl tracking-tight text-white block">
                CONVERGE DIGITALS
              </span>
              <p className="body-default text-[#A1A1AA] max-w-sm">
                A creative studio built for brands that refuse to look ordinary. We obsess over strategy, typography, space, and motion.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <span className="eyebrow text-[#EA580C] block">Inquiries</span>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@converge.agency"
                    className="caption text-[#A1A1AA] hover:text-white transition-colors duration-300"
                  >
                    hello@converge.agency
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+911234567890"
                    className="caption text-[#A1A1AA] hover:text-white transition-colors duration-300"
                  >
                    +91 1234567890
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials & Back to Top */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="eyebrow text-[#EA580C] block">Connect</span>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a
                    href="#"
                    className="caption text-[#A1A1AA] hover:text-white transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="caption text-[#A1A1AA] hover:text-white transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="caption text-[#A1A1AA] hover:text-white transition-colors duration-300"
                  >
                    Read.cv
                  </a>
                </div>
              </div>

              {/* Back to top button */}
              <div className="pt-4">
                <button
                  onClick={handleBackToTop}
                  className="inline-flex items-center space-x-2 text-[#A1A1AA] hover:text-[#EA580C] transition-colors duration-300 group"
                >
                  <span className="eyebrow uppercase">Back To Top</span>
                  <ArrowUp size={16} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Location */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 text-[#A1A1AA] caption">
            <p>© {new Date().getFullYear()} Converge Creative Agency. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center">
              <span>INDIA</span>
            </p>
          </div>

          {/* Giant low-opacity background wordmark at the bottom - echoing the hero glow bookend */}
          <div className="w-full text-center select-none pointer-events-none mt-12 overflow-hidden flex items-center justify-center relative">
            <span
              className="font-display text-[#EA580C] opacity-15 blur-[60px] md:blur-[100px] select-none leading-none tracking-tighter uppercase inline-block translate-y-4"
              style={{
                fontSize: "clamp(120px, 24vw, 440px)",
              }}
            >
              CONVERGE
            </span>
          </div>

        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={handleBackToTop}
        className={`fixed bottom-24 right-6 z-[999] bg-[#171717]/85 backdrop-blur-md border border-white/10 text-white hover:bg-[#EA580C] hover:border-[#EA580C] p-4 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center group cursor-pointer ${
          showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
      </button>

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919999999999?text=Hello%20Converge,%20I'd%20like%20to%20discuss%20a%20project!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] bg-[#EA580C] hover:bg-white text-white hover:text-black p-4 rounded-full shadow-2xl border border-white/10 hover:border-[#EA580C] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
        data-cursor="chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.706 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
