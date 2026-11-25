"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION } from "@/app/contact/content";

gsap.registerPlugin(ScrollTrigger);

const fieldClass =
  "contact-field w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors focus:border-[#F26B38]/60 focus:outline-none";

export default function Contact({ standalone = false }) {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const context = gsap.context(() => {
      if (standalone) {
        gsap.from(".contact-label", { y: 20, opacity: 0, duration: 0.5, delay: 0.2 });
        gsap.from(".contact-heading", { y: 40, opacity: 0, duration: 0.8, ease: "power4.out", delay: 0.3 });
        gsap.from(".contact-field", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5, delay: 0.45 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
          once: true,
        },
      });
      timeline
        .from(".contact-label", { y: 14, opacity: 0, duration: 0.3, ease: "power3.out" })
        .from(".contact-heading", { y: 35, opacity: 0, duration: 0.4, ease: "power4.out" }, 0.05)
        .from(".contact-field", { y: 20, opacity: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, 0.15)
        .from(".contact-button", { y: 15, opacity: 0, duration: 0.3, ease: "power2.out" }, 0.45);
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => context.revert();
  }, [standalone]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(response.ok ? "sent" : "error");
      if (response.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact-section"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center px-6 pb-24 pt-24 md:px-20 md:pt-20"
    >
      <p className="contact-label mb-8 text-[10px] font-medium uppercase tracking-[0.5em] text-[#F26B38]">
        {SECTION.label}
      </p>
      <div className="grid w-full max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div>
          <h2 className="contact-heading max-w-xl text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-7xl">
            Have a story to shape?
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/45 md:text-base">
            Share a little about your project, the idea behind it, and what you&apos;d like to create.
          </p>
        </div>

        <form onSubmit={handleSubmit} aria-label="Project inquiry form" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-[10px] uppercase tracking-[0.3em] text-white/45">Name</label>
            <input
              id="contact-name"
              className={fieldClass}
              type="text"
              name="name"
              autoComplete="name"
              maxLength={80}
              placeholder="Your name"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-[10px] uppercase tracking-[0.3em] text-white/45">Email</label>
            <input
              id="contact-email"
              className={fieldClass}
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-[10px] uppercase tracking-[0.3em] text-white/45">Project details</label>
            <textarea
              id="contact-message"
              className={`${fieldClass} resize-y`}
              name="message"
              rows={5}
              maxLength={2000}
              placeholder="Tell me what you&apos;re working on…"
              required
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-red-300">Something went wrong. Please try again.</p>
          )}
          {status === "sent" && (
            <p role="status" className="text-sm text-[#F26B38]">Message sent. Thank you for reaching out.</p>
          )}
          <button
            className="contact-button mt-2 inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-full bg-[#F26B38] px-7 text-[10px] font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send project inquiry"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </section>
  );
}
