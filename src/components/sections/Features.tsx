import { BadgeCheck, CalendarHeart, FileCheck2, Lock, ShieldAlert, ShieldCheck, Timer, Users, X, Check } from "lucide-react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

function FactSheetVisual() {
  const rows = [
    { k: "Harga kamar weekday", label: "CLIENT CONFIRMATION", tone: "text-emerald-300 bg-emerald-400/10", used: true },
    { k: "Jarak ke pantai", label: "FIELD VERIFICATION", tone: "text-sky-300 bg-sky-400/10", used: true },
    { k: "Menu halal", label: "ASSUMPTION", tone: "text-amber-300 bg-amber-400/10", used: false },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-ink/60 p-4 font-mono text-xs">
      <div className="mb-3 flex items-center justify-between text-slate-500">
        <span>fact-sheet · Villa Contoh Ubud</span>
        <span className="text-[10px]">SIMULASI</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.k} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
            <span className="text-slate-300">{r.k}</span>
            <span className="flex items-center gap-2">
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${r.tone}`}>{r.label}</span>
              {r.used ? <Check className="size-3.5 text-emerald-300" /> : <X className="size-3.5 text-amber-300" />}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-amber-200/80">→ "Halal" tidak ditulis di caption sampai klien mengonfirmasi.</p>
    </div>
  );
}

function RiskVisual() {
  const flags = ["Harga & promo", "Orang di foto", "Klaim halal & alkohol", "Iklan & influencer", "Review negatif", "Agama & budaya"];
  return (
    <div className="flex flex-wrap gap-2">
      {flags.map((f, i) => (
        <span
          key={f}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
            i < 3 ? "border-amber-300/30 bg-amber-400/10 text-amber-200" : "border-white/10 bg-white/5 text-slate-300"
          }`}
        >
          {f}
        </span>
      ))}
      <span className="mt-1 w-full text-xs text-slate-400">Terdeteksi → level approval naik otomatis (dicek di server).</span>
    </div>
  );
}

function NoPublishVisual() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink/60 px-4 py-3">
      <span className="flex items-center gap-2 text-sm text-slate-300">
        <Lock className="size-4 text-teal-300" /> Auto-publish
      </span>
      <span className="relative h-6 w-11 cursor-not-allowed rounded-full bg-white/10" aria-label="Auto-publish tidak tersedia">
        <span className="absolute top-1 left-1 size-4 rounded-full bg-slate-500" />
      </span>
    </div>
  );
}

function ApprovalVisual() {
  const steps = [
    { l: "L1", who: "Konten rutin", what: "Content lead CLAU + approver Anda" },
    { l: "L2", who: "Harga, promo, orang, listing", what: "Review independen + approval per konten" },
    { l: "L3", who: "Iklan, review negatif, agama/budaya", what: "Langsung ke owner / GM Anda" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.l} className="relative rounded-2xl border border-white/10 bg-ink/60 p-4">
          <span className="font-display text-2xl font-extrabold text-teal-300">{s.l}</span>
          <p className="mt-1 text-sm font-semibold text-white">{s.who}</p>
          <p className="text-xs text-slate-400">{s.what}</p>
          {i < steps.length - 1 && <span className="absolute top-1/2 -right-2.5 hidden h-px w-2 bg-teal-300/40 sm:block" />}
        </div>
      ))}
    </div>
  );
}

const items: BentoItem[] = [
  {
    title: "Fact Sheet yang Anda konfirmasi",
    description: "Harga, fasilitas, jarak, kebijakan: semua klaim di konten dicek per kalimat ke fact sheet. Yang belum dikonfirmasi tidak ditulis.",
    icon: <FileCheck2 className="size-5" />,
    status: "Inti",
    colSpan: 2,
    visual: <FactSheetVisual />,
    highlight: true,
  },
  {
    title: "Penanda risiko otomatis",
    description: "Konten berisiko ditandai dan naik level approval sebelum sampai ke Anda.",
    icon: <ShieldAlert className="size-5" />,
    visual: <RiskVisual />,
  },
  {
    title: "Tidak ada auto-publish",
    description: "AI tidak bisa memposting. Konten tayang hanya setelah approval, oleh Anda atau tim CLAU.",
    icon: <Lock className="size-5" />,
    status: "Aman untuk brand",
    visual: <NoPublishVisual />,
  },
  {
    title: "QA manusia & approval berlapis",
    description: "Human-in-the-loop sungguhan: AI tidak pernah menyetujui hasil kerjanya sendiri.",
    icon: <Users className="size-5" />,
    colSpan: 2,
    visual: <ApprovalVisual />,
  },
  {
    title: "Privasi tamu & UU PDP",
    description: "Data disamarkan sebelum dikirim ke model AI. Data tiap klien terisolasi. Foto orang wajib ada consent.",
    icon: <ShieldCheck className="size-5" />,
    tags: ["UU PDP", "Consent"],
  },
  {
    title: "Paham kalender Indonesia",
    description: "Ramadan, Lebaran, Nyepi, Galungan, libur sekolah, long weekend. Bilingual ID & EN.",
    icon: <CalendarHeart className="size-5" />,
    tags: ["Lokal", "Bilingual"],
  },
  {
    title: "Koreksi cepat",
    description: "Ada konten salah tayang? Draft koreksi atau takedown ≤ 4 jam kerja setelah dilaporkan.",
    icon: <Timer className="size-5" />,
    meta: "SLA",
    tags: ["Tanggung jawab"],
  },
];

const compare = [
  ["AI langsung memposting puluhan konten", "AI menyiapkan draft, manusia memutuskan"],
  ["Klaim harga & fasilitas tanpa dicek", "Setiap klaim dicek ke fact sheet terkonfirmasi"],
  ["Anda sendiri yang harus QA", "QA tim CLAU + reviewer independen"],
  ["Template generik global", "Spesialis villa, resto, wedding, travel Indonesia"],
];

export function Features() {
  return (
    <section id="keamanan" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute top-1/3 left-0 -z-10 size-[500px] rounded-full bg-teal-600/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Keamanan Konten"
          title={
            <>
              Bukan SaaS AI murah. <br className="hidden sm:block" />
              <span className="text-gradient">Agensi yang bisa dipertanggungjawabkan.</span>
            </>
          }
          subtitle="Satu caption dengan harga yang salah atau klaim halal yang keliru bisa merusak reputasi properti Anda. Karena itu CLAU dibangun dengan pagar pengaman di setiap langkah."
        />
        <div className="mt-16">
          <BentoGrid items={items} />
        </div>

        <Reveal className="mt-16 overflow-hidden rounded-3xl glass">
          <div className="grid grid-cols-2 border-b border-white/10 text-sm font-semibold">
            <div className="p-4 text-slate-400 sm:px-6">Tool AI otomatis biasa</div>
            <div className="flex items-center gap-2 bg-teal-400/[0.06] p-4 text-teal-200 sm:px-6">
              <BadgeCheck className="size-4" /> CLAU AI
            </div>
          </div>
          {compare.map(([a, b]) => (
            <div key={a} className="grid grid-cols-2 border-b border-white/5 text-sm last:border-0">
              <div className="flex gap-2 p-4 text-slate-500 sm:px-6">
                <X className="mt-0.5 size-4 shrink-0 text-slate-600" /> {a}
              </div>
              <div className="flex gap-2 bg-teal-400/[0.04] p-4 text-slate-200 sm:px-6">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {b}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
