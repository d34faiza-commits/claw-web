import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AgentFigure } from "@/components/ui/agent-figure";
import { ReceptionDesk } from "@/components/ui/wide-scenes";
import { agents } from "@/data/agents";

// Tiga agent "bekerja" di atas meja resepsionis; parallax saat digulir.
const crew = [
  { id: "listing-writer", left: "30%", ml: "20%", h: "36%", tilt: 8 },
  { id: "review-responder", left: "50%", ml: "50%", h: "40%", tilt: 0 },
  { id: "calendar-planner", left: "70%", ml: "80%", h: "36%", tilt: -8 },
].map((c) => ({ ...c, a: agents.find((x) => x.id === c.id)!, i: agents.findIndex((x) => x.id === c.id) }));

export function DeskScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const far = { y: useTransform(scrollYProgress, [0, 1], [-30, 30]) };
  const mid = { y: useTransform(scrollYProgress, [0, 1], [-60, 50]) };
  const crewY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

  return (
    <section ref={ref} className="relative isolate h-[clamp(620px,92svh,900px)] overflow-hidden bg-ink">
      <ReceptionDesk far={far} mid={mid} />

      <motion.div style={{ y: crewY }} className="absolute inset-0">
        {crew.map((c) => (
          <div
            key={c.id}
            className="absolute bottom-[40%] -translate-x-1/2 [perspective:900px] max-sm:!h-[22%] max-sm:![left:var(--ml)]"
            style={{ left: c.left, height: c.h, aspectRatio: c.a.ratio, "--ml": c.ml } as React.CSSProperties}
          >
            <div className="absolute -bottom-2 left-1/2 h-6 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/45 blur-md" />
            <motion.div className="size-full" initial={{ rotateY: 0 }} whileInView={{ rotateY: c.tilt }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
              <AgentFigure a={c.a} i={c.i} />
            </motion.div>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-transparent via-black/70 to-black" />
      <motion.div style={{ y: titleY }} className="absolute inset-x-0 bottom-0 px-4 pb-14 text-center sm:pb-20">
        <h2 className="mx-auto max-w-5xl font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          AI menyiapkan setiap hari. <span className="text-gradient">Manusia yang memutuskan.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Bayu menulis listing OTA, Laras menyiapkan balasan review, Dimas menyusun kalender konten. Semua draft menunggu QA dan persetujuan Anda.
        </p>
      </motion.div>
    </section>
  );
}
