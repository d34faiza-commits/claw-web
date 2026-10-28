import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { HospitalityScene } from "@/components/ui/hospitality-scenes";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { agents, figure, sceneImage, type Agent } from "@/data/agents";
import { cn } from "@/lib/utils";

// Figur "hidup": napas & goyang idle, menoleh ke arah kursor, dan berkedip lewat kelopak berwarna kulit.
function LivingFigure({ a, i }: { a: Agent; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 120, damping: 16 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 16 });
  // Variasi per agent supaya tidak bergerak serempak.
  const dur = 3.6 + (i % 4) * 0.45;
  const blinkDur = 4.2 + ((i * 7) % 5) * 0.6;

  return (
    <div
      className="absolute inset-0 [perspective:900px]"
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
      <div className="absolute bottom-[8%] left-1/2 h-[80%] -translate-x-1/2" style={{ aspectRatio: a.ratio }}>
        <motion.div
          className="relative size-full origin-bottom"
          variants={{ hover: { y: -14, scale: 1.04 } }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{ rotateX, rotateY }}
        >
          <motion.div
            className="relative size-full origin-bottom"
            animate={{ scaleY: [1, 1.014, 1], y: [0, -3, 0], rotate: [-0.7, 0.7, -0.7] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.3 }}
          >
            <img
              src={figure(a.id)}
              alt={`${a.name}, ${a.role}`}
              loading="lazy"
              draggable={false}
              className="size-full object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
            />
            {a.eyes.map((e, k) => (
              <span
                key={k}
                aria-hidden
                className="absolute animate-blink rounded-[50%] blur-[0.4px]"
                style={
                  {
                    left: `${e.x - (e.w * 1.45) / 2}%`,
                    top: `${e.y - (e.h * 1.45) / 2}%`,
                    width: `${e.w * 1.45}%`,
                    height: `${e.h * 1.45}%`,
                    background: `radial-gradient(ellipse at 50% 30%, color-mix(in srgb, ${e.skin} 72%, white), color-mix(in srgb, ${e.skin} 85%, white) 80%)`,
                    "--blink-dur": `${blinkDur}s`,
                    "--blink-delay": `${-((i * 1.3) % blinkDur)}s`,
                  } as React.CSSProperties
                }
              >
                {/* Garis mata tertutup (lengkung bulu mata) */}
                <span className="absolute inset-x-[14%] top-[38%] h-[30%] rounded-b-full border-b-[3px] border-[#3b2418]/80" />
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function AgentCard({ a, i }: { a: Agent; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(i, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[340px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-shadow duration-500 group-hover:shadow-[0_40px_90px_-30px_rgba(45,212,191,0.45)]">
        {a.sceneImage ? (
          // Render 3D dengan ruangan asli (docs/avatar-scene-prompts.md) menggantikan ilustrasi SVG.
          <motion.img
            src={sceneImage(a.id)}
            alt={`${a.name}, ${a.role}, di ${a.scene.setting.toLowerCase()}`}
            loading="lazy"
            draggable={false}
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <>
            <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <HospitalityScene id={a.id} />
            </motion.div>
            {/* Bayangan kaki + vignette, menyatukan figur dengan ruangan */}
            <div className="absolute bottom-[7%] left-1/2 h-7 w-[50%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-md" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_110px_rgba(0,0,0,0.38)]" />
            <LivingFigure a={a} i={i} />
          </>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">{a.scene.setting}</span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md",
              a.active ? "bg-emerald-400/90 text-emerald-950" : "bg-black/45 text-white/80",
            )}
          >
            {a.active ? "Aktif" : "Segera hadir"}
          </span>
        </div>
      </div>
      <div className="px-1 pt-6">
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{a.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          <span className="text-slate-200">{a.role}.</span> {a.blurb}
        </p>
        <p className="mt-3 text-[11px] tracking-wide text-slate-500 uppercase">{a.pillar}</p>
      </div>
    </motion.article>
  );
}

export function Agents() {
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 340) + 24), behavior: "smooth" });
  };

  return (
    <section id="agent" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="The Agents"
          title={
            <>
              Kenalkan tim AI Anda, <span className="text-gradient">masing-masing spesialis</span>
            </>
          }
          subtitle="Setiap agent punya satu keahlian, persona, dan batas yang jelas. Mereka menyiapkan draft. Keputusan tetap di tangan tim CLAU dan Anda."
        />
      </div>

      <Reveal className="relative mt-16">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-[max(1rem,calc((100vw-72rem)/2+1rem))] sm:px-[max(1rem,calc((100vw-72rem)/2+1rem))] [&::-webkit-scrollbar]:hidden"
        >
          {agents.map((a, i) => (
            <AgentCard key={a.id} a={a} i={i} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[200px] hidden justify-between px-6 sm:flex lg:px-10">
          {([-1, 1] as const).map((dir) => (
            <motion.button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label={dir < 0 ? "Agent sebelumnya" : "Agent berikutnya"}
              className="pointer-events-auto flex size-14 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors hover:bg-slate-800"
            >
              {dir < 0 ? <ArrowLeft className="size-6" /> : <ArrowRight className="size-6" />}
            </motion.button>
          ))}
        </div>
      </Reveal>

      <p className="mx-auto mt-6 max-w-6xl px-4 text-center text-xs text-slate-500">
        Geser untuk melihat semua 12 agent. Avatar adalah karakter AI fiktif, bukan foto staf. Agent selalu ditampilkan sebagai AI, bukan manusia.
      </p>
    </section>
  );
}
