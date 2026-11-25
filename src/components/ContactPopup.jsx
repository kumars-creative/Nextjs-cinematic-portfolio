"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";

export default function ContactPopup({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 shadow-2xl md:p-10"
            initial={{ y: 22, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 12, scale: 0.98 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact dialog"
              className="absolute right-5 top-5 rounded-full p-2 text-white/40 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26B38]"
            >
              <FiX size={18} aria-hidden="true" />
            </button>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[#F26B38]">Kumar S. · Creative Director</p>
            <h2 id="contact-dialog-title" className="mb-3 text-3xl font-black tracking-tight text-white">Have a story in mind?</h2>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/45">
              Share a little about what you&apos;re making and the kind of visual world you want to create.
            </p>
            <Link
              href="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 rounded-full bg-[#F26B38] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26B38]"
            >
              Start a conversation
              <FiArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
