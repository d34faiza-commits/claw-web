import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { agents, figure, type Agent } from "@/data/agents";
import { cn } from "@/lib/utils";

// Ruangan 3D dari CSS: dinding bergradasi, jendela bercahaya, lantai berperspektif, bokeh, dan bayangan kaki.
function Scene({ scene }: { scene: Agent["scene"] }) {
  const [top, bottom] = scene.wall;
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${top} 0%, ${bottom} 68%)` }} />
      {/* Jendela + berkas cahaya */}
      <div
        className="absolute top-[8%] right-[10%] h-[34%] w-[30%] rounded-t-full opacity-70"
        style={{ background: `linear-gradient(180deg, ${scene.light}, transparent)`, boxShadow: `0 0 60px 10px ${scene.light}55` }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[70%] opacity-40 mix-blend-soft-light"
        style={{ background: `linear-gradient(225deg, ${scene.light} 0%, transparent 55%)` }}
      />
      {/* Bokeh */}
      <div className="absolute top-[18%] left-[12%] size-10 rounded-full blur-md" style={{ background: `${scene.light}66` }} />
      <div className="absolute top-[30%] left-[30%] size-5 rounded-full blur-sm" style={{ background: `${scene.light}88` }} />
      <div className="absolute top-[12%] left-[45%] size-7 rounded-full blur-md" style={{ background: `${scene.light}55` }} />
      {/* Lantai berperspektif */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] overflow-hidden [perspective:400px]">
        <div
          className="absolute inset-x-[-50%] top-0 h-[200%] origin-top [transform:rotateX(62deg)]"
          style={{
            background: `repeating-linear-gradient(90deg, ${scene.floor} 0 46px, color-mix(in srgb, ${scene.floor} 82%, white) 46px 48px)`,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-6" style={{ background: `linear-gradient(180deg, ${bottom}, transparent)` }} />
      </div>
      {/* Bayangan kaki */}
      <div className="absolute bottom-[9%] left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-md" />
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]" />
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
        <motion.div className="absolute inset-0" variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <Scene scene={a.scene} />
        </motion.div>
        <motion.img
          src={figure(a.id)}
          alt={`${a.name}, karakter AI ${a.role}`}
          loading="lazy"
          draggable={false}
          variants={{ hover: { y: -14, scale: 1.04 } }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="absolute bottom-[8%] left-1/2 h-[80%] w-auto max-w-[92%] -translate-x-1/2 object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
        />
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
