import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { CONTACT_URL } from "@/data/site";
import { cn } from "@/lib/utils";

// Isi paket: clau-market/commercial/service-catalog.md § 2. Harga sengaja tidak ditampilkan (dikirim lewat proposal).
const plans = [
  {
    name: "Esensial",
    fit: "Villa kecil, kafe, homestay",
    features: ["GBP + 1 kanal (IG atau Facebook)", "Kalender konten bulanan", "12 konten feed (4 naskah Reels)", "8 set Stories · 4 post GBP", "Hingga 30 balasan review", "Laporan bulanan 1 halaman"],
  },
  {
    name: "Growth",
    fit: "Villa/hotel butik, resto, WO, operator trip",
    featured: true,
    features: ["IG + Facebook + TikTok + GBP + 1 OTA", "Kalender + 1 kampanye musiman", "20 konten feed (8 naskah Reels)", "12 set Stories · 4 post GBP", "Hingga 80 balasan review", "Bilingual ID/EN · refresh listing OTA", "Laporan + call 30 menit"],
  },
  {
    name: "Signature",
    fit: "Properti/grup multi-kanal, konten harian",
    features: ["Hingga 5 kanal + 2 OTA", "Strategi 30 hari + 2 kampanye", "30 caption · 12 konsep visual · 8 naskah video", "20 set Stories · 8 post GBP", "Hingga 150 balasan review (prioritas)", "Semua agent AI Marketing", "Laporan + call mingguan"],
  },
];

export function Pricing() {
  return (
    <section id="paket" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute right-0 bottom-0 -z-10 size-[520px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Paket"
          title={
            <>
              Paket bulanan, <span className="text-gradient">semua dengan QA manusia</span>
            </>
          }
          subtitle="Setiap paket memakai alur approval yang sama. Harga disesuaikan dengan jumlah kanal dan properti Anda, dan dikirim lewat proposal setelah discovery call."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={cn(
                "relative flex flex-col rounded-3xl p-7 transition-shadow duration-300",
                p.featured
                  ? "border border-teal-300/40 bg-gradient-to-b from-teal-500/[0.16] via-teal-500/[0.05] to-transparent shadow-[0_30px_80px_-30px_rgba(45,212,191,0.55)] backdrop-blur-xl lg:-my-4 lg:py-11"
                  : "glass hover:shadow-[0_24px_60px_-28px_rgba(45,212,191,0.35)]",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-teal-400 px-3 py-1 text-xs font-bold text-slate-950">
                  <Sparkles className="size-3" /> Rekomendasi
                </span>
              )}
              <h3 className="font-display text-2xl font-extrabold text-white">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{p.fit}</p>
              <div className="mt-6 border-y border-white/10 py-5">
                <p className="font-display text-3xl font-extrabold tracking-tight text-white">Sesuai proposal</p>
                <p className="mt-1 text-xs text-slate-500">per bulan · rincian di proposal</p>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {f}
                  </li>
                ))}
              </ul>
              <Button href={CONTACT_URL} variant={p.featured ? "primary" : "ghost"} className="mt-8 w-full">
                Minta proposal <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl p-6 text-center glass sm:flex-row sm:text-left">
          <div>
            <p className="font-display font-bold text-white">Semua paket termasuk</p>
            <p className="mt-1 text-sm text-slate-400">Fact sheet terkonfirmasi · AI fact-check · penanda risiko · review independen · tanpa auto-publish · 2 putaran revisi per konten</p>
          </div>
          <p className="shrink-0 text-xs text-slate-500">Add-on: kampanye musiman, listing OTA, pack review, penjadwalan oleh tim CLAU</p>
        </Reveal>
      </div>
    </section>
  );
}
