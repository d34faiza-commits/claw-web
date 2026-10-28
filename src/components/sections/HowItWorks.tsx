import { ClipboardCheck, PenLine, ScanSearch, UserCheck, Send } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

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

        <FlowDiagram />

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

// Mekanisme alur konten: jalur draft → tayang lewat manusia, loop revisi, dan jalur auto-publish yang tidak ada.
const nodes = [
  { x: 10, label: "Fact sheet", sub: "dikonfirmasi klien" },
  { x: 205, label: "Agent AI", sub: "menyusun draft" },
  { x: 400, label: "Fact-check AI", sub: "+ penanda risiko" },
  { x: 595, label: "QA & approval", sub: "manusia L1–L3", human: true },
  { x: 790, label: "Dijadwalkan", sub: "oleh manusia", human: true },
];
const BW = 140;
const BH = 58;
const Y = 70;

function FlowDiagram() {
  return (
    <Reveal className="mx-auto mt-14 max-w-5xl">
      <figure className="overflow-x-auto rounded-3xl p-5 glass sm:p-7">
        <svg
          viewBox="0 0 940 300"
          role="img"
          aria-label="Alur konten CLAU: fact sheet ke agent AI, fact-check, QA dan approval manusia, lalu dijadwalkan manusia ke kanal. Jalur langsung dari agent AI ke kanal (auto-publish) tidak ada."
          className="mx-auto h-auto w-full min-w-[640px] text-slate-300"
        >
          <defs>
            <marker id="fd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
            </marker>
            <marker id="fd-arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#5eead4" />
            </marker>
          </defs>

          {/* Loop revisi: QA mengembalikan draft ke agent */}
          <path d={`M665 ${Y} C665 18 275 18 275 ${Y}`} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#fd-arrow)" />
          <text x="465" y="26" textAnchor="middle" fontSize="12" fill="currentColor" fillOpacity="0.75">revisi bila ada yang salah</text>

          {/* Panah utama berlabel */}
          {[
            { from: 0, label: "fakta" },
            { from: 1, label: "draft" },
            { from: 2, label: "ditandai" },
            { from: 3, label: "disetujui" },
          ].map(({ from, label }) => {
            const x1 = nodes[from].x + BW;
            const x2 = nodes[from + 1].x;
            const teal = from === 3;
            return (
              <g key={label}>
                <line x1={x1 + 2} y1={Y + BH / 2} x2={x2 - 4} y2={Y + BH / 2} stroke={teal ? "#5eead4" : "currentColor"} strokeWidth="1.8" markerEnd={teal ? "url(#fd-arrow-teal)" : "url(#fd-arrow)"} />
                <text x={(x1 + x2) / 2} y={Y + BH / 2 - 8} textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.8">{label}</text>
              </g>
            );
          })}

          {nodes.map((n) => (
            <g key={n.label}>
              <rect x={n.x} y={Y} width={BW} height={BH} rx="12" fill={n.human ? "#2dd4bf" : "currentColor"} fillOpacity={n.human ? 0.14 : 0.06} stroke={n.human ? "#5eead4" : "currentColor"} strokeOpacity={n.human ? 0.8 : 0.35} />
              <text x={n.x + BW / 2} y={Y + 25} textAnchor="middle" fontSize="13" fontWeight="700" fill={n.human ? "#ccfbf1" : "currentColor"}>{n.label}</text>
              <text x={n.x + BW / 2} y={Y + 43} textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">{n.sub}</text>
            </g>
          ))}

          {/* Kanal tayang */}
          <rect x="790" y="220" width={BW} height={BH} rx="12" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.35" />
          <text x="860" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">Kanal tayang</text>
          <text x="860" y="263" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.7">IG · GBP · OTA</text>
          <line x1="860" y1={Y + BH + 2} x2="860" y2="216" stroke="#5eead4" strokeWidth="1.8" markerEnd="url(#fd-arrow-teal)" />
          <text x="868" y="180" fontSize="11" fill="currentColor" fillOpacity="0.8">akses partner</text>

          {/* Jalur yang tidak ada: agent AI langsung ke kanal */}
          <path d={`M275 ${Y + BH + 2} V249 H784`} fill="none" stroke="#fb7185" strokeWidth="1.8" strokeDasharray="6 6" />
          <g transform="translate(530 249)">
            <circle r="13" fill="#05080d" stroke="#fb7185" strokeWidth="1.8" />
            <path d="M-5 -5 L5 5 M5 -5 L-5 5" stroke="#fb7185" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          <text x="530" y="285" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fda4af">auto-publish: tidak ada</text>
        </svg>
        <figcaption className="mt-4 text-center text-sm text-slate-400">
          Setiap konten lewat jalur yang sama sampai disetujui manusia. Agent AI tidak punya jalur langsung ke kanal tayang.
        </figcaption>
      </figure>
    </Reveal>
  );
}
