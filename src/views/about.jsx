"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BIO, CREATIVE, EXPERIENCE, HEADING, SECTION, TECH } from "@/app/about/content";

function RichText({ text }) {
  return text.split(/\*([^*]+)\*/g).map((part, index) =>
    index % 2 ? (
      <span key={index} className="font-serif italic text-white/90">{part}</span>
    ) : (
      part
    ),
  );
}

export default function AboutPage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".about-label, .about-heading, .about-bio, .about-skill", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".about-art", { scale: 1.04, opacity: 0, duration: 1.2, ease: "power3.out" });
    }, sectionRef);
    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-dvh overflow-hidden bg-[#080808] px-6 pb-20 pt-28 md:px-14 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_25%,rgba(242,107,56,0.13),transparent_36%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-20">
        <div className="about-art relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
          <div className="absolute inset-0 bg-[url('/portfolio-placeholders/motion-graphics.png')] bg-cover bg-center opacity-75" role="img" aria-label="Temporary motion graphics visual study" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/10" />
          <p className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.35em] text-white/60">Visual study · temporary artwork</p>
        </div>

        <div>
          <p className="about-label mb-5 text-[10px] font-medium uppercase tracking-[0.5em] text-[#F26B38]">{SECTION.label}</p>
          <h1 className="about-heading mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-7xl">
            <span className="block">{HEADING.line1}</span>
            <span className="block">{HEADING.line2}</span>
            <span className="block text-[#F26B38]">{HEADING.line3}</span>
          </h1>
          <div className="mb-10 space-y-4 text-sm leading-relaxed text-white/55 md:text-base">
            {BIO.map((text) => <p className="about-bio" key={text}><RichText text={text} /></p>)}
          </div>

          <a
            href="/Kumar_S_Creative_Producer-Resume.pdf"
            download="Kumar_S_Resume.pdf"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#F26B38]/40 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#F26B38] transition-colors hover:bg-[#F26B38] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26B38]"
          >
            Download Resume
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m-5-5 5 5 5-5M5 21h14" />
            </svg>
          </a>

          <div className="grid gap-8 border-t border-white/10 pt-7 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/45">Creative direction</h2>
              <ul className="flex flex-wrap gap-2">
                {TECH.map(({ name }) => <li className="about-skill rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-wider text-white/75" key={name}>{name}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/45">Creative disciplines</h2>
              <ul className="flex flex-wrap gap-2">
                {CREATIVE.map(({ name }) => <li className="about-skill rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-wider text-white/75" key={name}>{name}</li>)}
              </ul>
            </div>
            <div className="sm:col-span-2">
              {EXPERIENCE.map(({ role, period }) => (
                <p className="about-skill text-xs uppercase tracking-[0.2em] text-white/50" key={role}>
                  <span className="text-white">{period}</span> · {role}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
