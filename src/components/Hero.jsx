"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
      gsap.from(".hero-line",  { y: 90, opacity: 0, stagger: 0.1, duration: 1.1, ease: "power4.out", delay: 0.6 });
      
      // Premium staggered letter effect for the main name
      gsap.from(".hero-letter", { 
        y: 100, 
        opacity: 0, 
        rotateX: -40,
        stagger: 0.06, 
        duration: 1.2, 
        ease: "power4.out", 
        delay: 0.7 
      });

      gsap.from(".hero-sub",   { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.4 });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 60%",
          end:   "bottom 10%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[112svh] items-center overflow-hidden px-6 pb-16 pt-28 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="relative z-20 w-full max-w-[1700px]">
        <div className="mb-7 md:mb-9">
          <p
            aria-label="Kumar S."
            className="mb-3 flex text-[clamp(1.65rem,3.2vw,3.5rem)] font-black uppercase leading-none tracking-[0.08em] text-white"
          >
            {"KUMAR ".split("").map((char, index) => (
              <span key={index} className="hero-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span className="text-[#F26B38]">
              {"S.".split("").map((char, index) => (
                <span key={index} className="hero-letter inline-block">
                  {char}
                </span>
              ))}
            </span>
          </p>
          <p className="hero-label text-[10px] font-semibold uppercase tracking-[0.34em] text-white/60 sm:text-xs">
            Creative Director
          </p>
        </div>

        <h1
          id="hero-title"
          className="mb-7 flex max-w-[1020px] flex-col font-black uppercase leading-[0.88] tracking-[-0.055em] text-white [font-size:clamp(2.6rem,4.3vw,6rem)]"
        >
          <span className="hero-line block">I CREATE</span>
          <span className="hero-line block">VISUAL EXPERIENCES</span>
          <span className="hero-line block">
            THAT <span className="text-[#F26B38]">INSPIRE.</span>
          </span>
        </h1>

        <div className="hero-sub max-w-[620px]">
          <p className="max-w-[38rem] text-sm font-medium leading-relaxed text-white/65 sm:text-base md:text-lg">
            Creative storytelling, <span className="text-[#F26B38]">motion design</span>, <span className="text-[#F26B38]">AI filmmaking</span> and visual production.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#work-section"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F26B38] px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-black transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26B38] sm:px-7 sm:text-xs"
            >
              Explore My Work
            </a>
            <a
              href="/Kumar_S_Creative_Producer-Resume.pdf"
              download="Kumar_S_Resume.pdf"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#F26B38]/60 px-6 text-[10px] font-bold uppercase tracking-[0.17em] text-[#F26B38] transition-colors duration-300 hover:bg-[#F26B38] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26B38] sm:px-7 sm:text-xs"
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m-5-5 5 5 5-5M5 21h14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
