import { ClipboardCheck, PenLine, ScanSearch, UserCheck, Send } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/reveal";

const steps = [
  { icon: ClipboardCheck, title: "Discovery & Fact Sheet", who: "Anda + tim CLAU", body: "Kami kenali properti, tamu, dan voice brand Anda. Anda mengonfirmasi fact sheet: harga, fasilitas, kebijakan." },
  { icon: PenLine, title: "Agent AI menyusun draft", who: "Tara, Raka, Dimas, dkk.", body: "Kalender bulanan, caption, naskah Reels, Stories, listing OTA, dan balasan review disusun sesuai kalender Indonesia." },
  { icon: ScanSearch, title: "Fact-check & penanda risiko", who: "AI + aturan konten 01–09", body: "Setiap kalimat dicek ke fact sheet. Harga, orang, agama/budaya, atau review negatif otomatis menaikkan level approval." },
  { icon: UserCheck, title: "QA manusia & approval", who: "Content lead, reviewer, Anda", body: "Draft lewat QA tim CLAU dan reviewer independen, lalu ke approver Anda sesuai level L1, L2, atau L3." },
  { icon: Send, title: "Dijadwalkan oleh manusia", who: "Anda atau tim CLAU", body: "Hanya konten yang sudah disetujui yang dijadwalkan, lewat akses partner tanpa berbagi password. Tidak ada auto-publish." },
];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="cara-kerja" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="How it Works"
          title={
            <>
              Dari brief sampai tayang, <span className="text-gradient">manusia selalu di dalam loop</span>
            </>
          }
          subtitle="Lima langkah yang sama untuk setiap konten, setiap klien. Tercatat di platform, jadi selalu jelas siapa memeriksa apa."
        />

        <ol ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute top-2 bottom-2 left-6 w-px bg-white/10 sm:left-1/2" aria-hidden />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-6 w-px origin-top bg-gradient-to-b from-teal-300 via-teal-400 to-emerald-400 sm:left-1/2"
            aria-hidden
          />
          {steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-10 grid grid-cols-[3rem_1fr] gap-5 last:mb-0 sm:grid-cols-2 sm:gap-14"
              >
                <span className="relative z-10 flex size-12 items-center justify-center rounded-2xl border border-teal-300/30 bg-ink-2 text-teal-300 shadow-[0_0_30px_-5px_rgba(45,212,191,0.5)] sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2">
                  <s.icon className="size-5" />
                </span>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`rounded-3xl p-6 glass transition-colors duration-300 hover:border-teal-300/25 ${right ? "sm:col-start-2" : "sm:col-start-1 sm:text-right"}`}
                >
                  <span className="font-mono text-xs text-teal-300/80">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase">{s.who}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.body}</p>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
