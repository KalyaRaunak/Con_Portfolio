"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <main className="w-full bg-[#0F0F10] relative overflow-hidden">
      {/* Subtle light orange background tone (minimal accent) */}
      <div className="absolute glow-effect w-[450px] h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] pointer-events-none select-none z-0" />

      <section className="relative h-full container text-[#F5F5F5] mx-auto rounded-lg py-14 bg-transparent z-10" ref={testimonialRef}>
        <article className="max-w-screen-md mx-auto text-center space-y-2">
          <TimelineContent as="h1" className="xl:text-4xl text-3xl font-display uppercase tracking-tight text-white font-medium" animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            Trusted by Startups and the world's largest companies
          </TimelineContent>
          <TimelineContent as="p" className="mx-auto text-[#A1A1AA] max-w-md" animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            Let's hear how hypersphere client's feels about our service
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3 gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ">
            <TimelineContent animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-[#171717] overflow-hidden rounded-lg border border-white/5 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p className="text-[#A1A1AA]">
                  "Hypersphere has been a game-changer for us. Their service is
                  top-notch and their team is incredibly responsive."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-sm text-[#F5F5F5]">
                      Guillermo Rauch
                    </h2>
                    <p className="text-[#A1A1AA] text-xs">CEO of Enigma</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-[#EA580C] text-black overflow-hidden rounded-lg border border-[#EA580C]/20 p-5">
              <article className="mt-auto">
                <p className="font-medium">
                  "We've seen incredible results with Hypersphere. Their
                  expertise, dedication."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl text-black">Rika Shinoda</h2>
                    <p className="text-black/70 text-sm">CEO of Kintsugi</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=687&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#171717] text-white overflow-hidden rounded-lg border border-white/5 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-[#A1A1AA]">
                  "Their team is highly professional, and their innovative
                  solutions have truly transformed the way we operate."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg text-[#F5F5F5]">
                      Reacher{" "}
                    </h2>
                    <p className="text-[#A1A1AA] text-sm">CEO of OdeaoLabs</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#171717] text-white overflow-hidden rounded-lg border border-white/5 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-[#A1A1AA]">
                  "We're extremely satisfied with Hypersphere. Their expertise
                  and dedication have exceeded our expectations."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg text-[#F5F5F5]">John </h2>
                    <p className="text-[#A1A1AA] text-sm">CEO of Labsbo</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-[#171717] text-white overflow-hidden rounded-lg border border-white/5 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-[#A1A1AA]">
                  "Their customer support is absolutely exceptional. They are
                  always available, incredibly helpful."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg text-[#F5F5F5]">
                      Steven Sunny
                    </h2>
                    <p className="text-[#A1A1AA] text-sm">CEO of boxefi</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=687&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-[#EA580C] text-black overflow-hidden rounded-lg border border-[#EA580C]/20 p-5">
              <article className="mt-auto">
                <p className="font-medium">
                  "Hypersphere has been a key partner in our growth journey."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl text-black">Guillermo Rauch</h2>
                    <p className="text-black/70 text-sm">CEO of OdeaoLabs</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=765&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-[#171717] overflow-hidden rounded-lg border border-white/5 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p className="text-[#A1A1AA]">
                  "Hypersphere has been a true game-changer for us. Their
                  exceptional service, combined with their deep expertise and
                  commitment to excellence, has made a significant impact on our
                  business."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl text-[#F5F5F5]">Paul Brauch</h2>
                    <p className="text-[#A1A1AA] text-sm">CTO of Spectrum</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=687&auto=format&fit=crop"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover grayscale opacity-90"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>

        <div className="absolute border-b border-white/10 bottom-4 h-16 z-[2] md:w-full w-[90%] md:left-0 left-[5%]">
          <div className="container mx-auto w-full h-full relative before:absolute before:-left-2 before:-bottom-2 before:w-4 before:h-4 before:bg-[#0F0F10] before:border before:border-white/10 after:absolute after:-right-2 after:-bottom-2 after:w-4 after:h-4 after:bg-[#0F0F10] after:border after:border-white/10"></div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
