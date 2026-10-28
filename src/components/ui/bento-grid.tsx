// Diadaptasi dari 21st.dev — kokonutd/bento-grid: ditambah slot `visual`, rowSpan, dan hover Motion.
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  visual?: React.ReactNode;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  highlight?: boolean;
}

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:auto-rows-[minmax(220px,auto)] md:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-3xl p-6 glass",
            "transition-[border-color,box-shadow] duration-300 hover:border-teal-300/25",
            "hover:shadow-[0_0_0_1px_rgba(45,212,191,0.08),0_24px_60px_-20px_rgba(45,212,191,0.25)]",
            item.colSpan === 2 && "md:col-span-2",
            item.rowSpan === 2 && "md:row-span-2",
            item.highlight && "border-teal-300/20 bg-gradient-to-br from-teal-500/[0.12] to-transparent",
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:6px_6px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-teal-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-teal-300 transition-colors duration-300 group-hover:bg-teal-400/15">
              {item.icon}
            </div>
            {item.status && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                {item.status}
              </span>
            )}
          </div>

          {item.visual && <div className="relative mt-5 flex-1">{item.visual}</div>}

          <div className={cn("relative space-y-2", item.visual ? "mt-5" : "mt-auto pt-6")}>
            <h3 className="font-display text-lg font-bold tracking-tight text-white">
              {item.title}
              {item.meta && <span className="ml-2 text-xs font-normal text-slate-400">{item.meta}</span>}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
          </div>

          {item.tags && (
            <div className="relative mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
