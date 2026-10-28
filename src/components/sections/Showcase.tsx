import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { AgentFigure } from "@/components/ui/agent-figure";
import { Reveal } from "@/components/ui/reveal";
import { agents, avatar } from "@/data/agents";
import { cn } from "@/lib/utils";

// Close-up wajah agent di latar hitam (gaya kartu karakter): berganti otomatis, bisa dipilih, menoleh ke kursor.
const FIG_H = 900; // tinggi figur penuh (px) sebelum di-crop ke bagian kepala

export function Showcase() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const a = agents[idx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % agents.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 90, damping: 16 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 90, damping: 16 });

  return (
    <section
      className="relative overflow-hidden bg-black py-20 sm:py-28"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="absolute top-1/3 left-1/2 -z-0 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/15 blur-[120px]" />

      {/* Jendela crop kepala */}
      <div className="relative mx-auto h-[360px] w-full max-w-[760px] overflow-hidden [perspective:1100px] sm:h-[500px] lg:h-[600px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-1/2 origin-top -translate-x-1/2 scale-[0.6] sm:scale-[0.85] lg:scale-100"
            style={{ height: FIG_H, aspectRatio: a.ratio }}
          >
            <AgentFigure a={a} i={idx} rotateX={rotateX} rotateY={rotateY} />
          </motion.div>
        </AnimatePresence>
        {/* Pantulan lantai/kabut di bawah kepala */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent via-black/70 to-black" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide text-teal-300">
            {a.name} · {a.role}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl">
            Temukan agent AI yang tepat untuk bisnis hospitality Anda
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Setiap bisnis berbeda, begitu juga timnya. Villa butuh caption dan listing OTA, resto butuh kalender promo, WO butuh balasan review yang hati-hati. Setiap agent memegang satu peran, dan tim CLAU memeriksa hasilnya.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {agents.map((ag, k) => (
            <motion.button
              key={ag.id}
              type="button"
              onClick={() => setIdx(k)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Lihat ${ag.name}, ${ag.role}`}
              aria-pressed={k === idx}
              className={cn(
                "flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-sm transition-colors",
                k === idx ? "border-teal-300/60 bg-teal-400/15 text-white" : "border-white/10 bg-white/5 text-slate-400 hover:text-white",
              )}
            >
              <img src={avatar(ag.id)} alt="" width={28} height={28} loading="lazy" className="size-7 rounded-full bg-mint object-cover" />
              {ag.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
