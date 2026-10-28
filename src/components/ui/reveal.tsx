import { motion, type HTMLMotionProps } from "motion/react";

// Scroll reveal standar halaman: fade-in + slide-up sekali saat masuk viewport.
export function Reveal({ delay = 0, y = 28, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-teal-200 uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
