import { ArrowRight, Check, Lock, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { AgentFigure } from "@/components/ui/agent-figure";
import { Button } from "@/components/ui/button";
import { VillaLounge } from "@/components/ui/wide-scenes";
import { agents } from "@/data/agents";
import { CONTACT_URL } from "@/data/site";

const tara = agents.find((a) => a.id === "caption-writer")!;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Parallax kursor: lapisan jauh bergeser sedikit, dekat bergeser banyak, figur di antaranya.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const far = { x: useTransform(sx, (v) => v * -12), y: useTransform(sy, (v) => v * -6) };
  const mid = { x: useTransform(sx, (v) => v * -26), y: useTransform(sy, (v) => v * -10) };
  const near = { x: useTransform(sx, (v) => v * -70), y: useTransform(sy, (v) => v * -24) };
  const figX = useTransform(sx, (v) => v * -38);
  const rotateY = useTransform(sx, [-1, 1], [-10, 10]);
  const rotateX = useTransform(sy, [-1, 1], [5, -5]);
  // Scroll: adegan sedikit membesar & teks naik saat digulir.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative isolate overflow-hidden bg-ink md:h-[clamp(680px,100svh,940px)]"
    >
      <motion.div className="absolute inset-0 -z-20" style={{ scale: sceneScale }} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
        <VillaLounge far={far} mid={mid} near={near} />
      </motion.div>
      {/* Gelap di sisi teks & bawah, supaya headline terbaca */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,8,13,0.8)_0%,rgba(5,8,13,0.7)_55%,rgba(5,8,13,0.9)_100%)] md:bg-[linear-gradient(90deg,rgba(5,8,13,0.92)_0%,rgba(5,8,13,0.7)_38%,rgba(5,8,13,0.05)_70%),linear-gradient(180deg,transparent_60%,rgba(5,8,13,0.9)_100%)]" />

      <motion.div style={{ y: textY }} className="relative mx-auto flex max-w-6xl flex-col justify-start px-4 pt-28 md:h-full md:justify-center md:pt-16">
        <div className="max-w-2xl">
          <motion.a {...fade(0.1)} href="#keamanan" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md transition-colors hover:bg-black/50 sm:text-sm">
            <span className="flex h-5 items-center rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 px-2 text-[10px] font-bold tracking-wide text-slate-950">BARU</span>
            AI menyiapkan, manusia memutuskan
            <ArrowRight className="size-3.5" />
          </motion.a>
          <motion.h1 {...fade(0.2)} className="mt-6 font-display text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.6rem]">
            Tim agent AI untuk <span className="text-gradient">hospitality Indonesia</span>
          </motion.h1>
          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tim 12 agent AI menyusun konten villa, resto, wedding, dan travel Anda setiap hari. Setiap fakta dicek ke fact sheet, setiap draft lewat QA manusia,{" "}
            <span className="text-white">dan tidak ada yang tayang tanpa persetujuan Anda.</span>
          </motion.p>
          <motion.div {...fade(0.4)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={CONTACT_URL}>
              Jadwalkan discovery call
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="#agent" variant="ghost">
              Kenalan dengan agent
            </Button>
          </motion.div>
          <motion.ul {...fade(0.5)} className="mt-7 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300 sm:flex">
            {["Fakta dikonfirmasi klien", "QA manusia berlapis", "Tanpa auto-publish"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-teal-300" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Tara berdiri di lounge */}
      <motion.div
        className="relative mx-auto mt-4 h-[320px] [perspective:1000px] md:absolute md:right-[8%] md:bottom-[3%] md:mx-0 md:mt-0 md:h-[70%] lg:right-[12%]"
        style={{ aspectRatio: tara.ratio, x: figX }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute -bottom-2 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-lg" />
        <AgentFigure a={tara} i={0} rotateX={rotateX} rotateY={rotateY} eager />
      </motion.div>

      {/* Kartu status di dekat Tara (desktop) */}
      <FloatChip className="top-[30%] right-[3%] lg:right-[5%]" delay={1.2} icon={<ShieldCheck className="size-4 text-emerald-300" />} title="Fakta terkonfirmasi" sub="Harga kamar · CLIENT CONFIRMATION" />
      <FloatChip className="bottom-[12%] right-[2%] lg:right-[4%]" delay={1.5} icon={<Lock className="size-4 text-teal-300" />} title="Auto-publish: tidak ada" sub="Anda yang menekan tombol" />
    </section>
  );
}

function FloatChip({ className, delay, icon, title, sub }: { className: string; delay: number; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute hidden items-center gap-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md lg:flex ${className}`}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="block text-xs text-slate-300">{sub}</span>
      </span>
    </motion.div>
  );
}
