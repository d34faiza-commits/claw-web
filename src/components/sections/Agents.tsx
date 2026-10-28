import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/reveal";
import { agents, avatar } from "@/data/agents";
import { cn } from "@/lib/utils";

export function Agents() {
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

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl p-5 glass transition-[border-color,box-shadow] duration-300",
                "hover:border-teal-300/25 hover:shadow-[0_24px_60px_-24px_rgba(45,212,191,0.4)]",
                !a.active && "opacity-80",
              )}
            >
              <div className="pointer-events-none absolute -top-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-teal-400/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between">
                <div className="relative">
                  <div className="size-16 overflow-hidden rounded-2xl bg-gradient-to-br from-mint to-teal-100 ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_-10px_rgba(45,212,191,0.6)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                    <img src={avatar(a.id)} alt={`Avatar ${a.name}, karakter AI`} width={64} height={64} loading="lazy" className="size-full object-cover" />
                  </div>
                  {a.active && <span className="absolute -right-1 -bottom-1 size-3.5 rounded-full border-2 border-ink bg-emerald-400" aria-hidden />}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                    a.active ? "bg-teal-400/10 text-teal-200" : "bg-white/5 text-slate-400",
                  )}
                >
                  {a.active ? "Aktif" : "Segera hadir"}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-xl font-bold text-white">{a.name}</h3>
              <p className="relative text-sm font-medium text-teal-300/90">{a.role}</p>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-400">{a.blurb}</p>
              <p className="relative mt-4 text-[11px] tracking-wide text-slate-500 uppercase">{a.pillar}</p>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Avatar adalah karakter AI fiktif, bukan foto staf. Agent selalu ditampilkan sebagai AI, bukan manusia.
        </p>
      </div>
    </section>
  );
}
