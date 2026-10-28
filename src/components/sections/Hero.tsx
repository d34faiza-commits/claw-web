import { ArrowRight, CalendarClock, Check, Lock, ShieldCheck, TriangleAlert } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Button } from "@/components/ui/button";
import { agents, avatar } from "@/data/agents";
import { CONTACT_URL } from "@/data/site";

const inner = agents.slice(0, 4);
const outer = agents.slice(4);

function OrbitAvatar({ id, name, size }: { id: string; name: string; size: number }) {
  return (
    <div className="group relative">
      <div
        className="overflow-hidden rounded-full bg-mint p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_30px_-6px_rgba(45,212,191,0.55)] ring-1 ring-teal-300/30 transition-transform duration-300 group-hover:scale-110"
        style={{ width: size, height: size }}
      >
        <img src={avatar(id)} alt={`${name}, agent AI`} width={size} height={size} className="size-full rounded-full object-cover" loading="eager" />
      </div>
      <span className="absolute top-full left-1/2 mt-1.5 -translate-x-1/2 rounded-full border border-white/10 bg-ink/80 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-slate-200 backdrop-blur">
        {name}
      </span>
    </div>
  );
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  // Efek interaktif: spotlight mengikuti kursor + orbit sedikit miring (parallax).
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgba(45,212,191,0.14), transparent 60%)`;
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);

  return (
    <section
      id="top"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="relative isolate overflow-hidden pt-32 pb-10 sm:pt-40"
    >
      <div className="absolute inset-0 -z-20 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <motion.div className="absolute inset-0 -z-10" style={{ background: spotlight }} />
      <div className="absolute top-0 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-teal-500/20 blur-[120px] animate-glow" />

      <div className="mx-auto max-w-6xl px-4 text-center">
        <motion.a
          {...fade(0)}
          href="#keamanan"
          className="group relative mx-auto inline-grid overflow-hidden rounded-full px-1 py-1 shadow-[0_1000px_0_0_hsl(220_30%_8%)_inset]"
        >
          {/* Border berkilau berputar, dari badge 21st.dev hero-section06 */}
          <span className="absolute inset-0 overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#5eead4_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          <span className="absolute inset-px rounded-full bg-ink-2 transition-colors duration-300 group-hover:bg-slate-900" />
          <span className="relative z-10 flex items-center gap-2 py-0.5 pr-3 text-xs text-slate-200 sm:text-sm">
            <span className="flex h-5 items-center rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 px-2 text-[10px] font-bold tracking-wide text-slate-950">
              BARU
            </span>
            AI menyiapkan, manusia memutuskan
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </motion.a>

        <motion.h1
          {...fade(0.1)}
          className="mx-auto mt-7 max-w-4xl font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-[5.2rem]"
        >
          Tim marketing AI <br className="hidden sm:block" />
          untuk <span className="text-gradient">hospitality Indonesia</span>
        </motion.h1>

        <motion.p {...fade(0.2)} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          CLAU adalah agensi + platform: 12 agent AI menyusun konten untuk villa, resto, wedding, dan travel Anda.
          Setiap fakta dicek ke fact sheet, setiap draft lewat QA manusia, dan{" "}
          <span className="text-slate-200">tidak ada yang tayang tanpa persetujuan Anda.</span>
        </motion.p>

        <motion.div {...fade(0.3)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={CONTACT_URL}>
            Jadwalkan discovery call
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button href="#cara-kerja" variant="ghost">
            Lihat cara kerja
          </Button>
        </motion.div>

        <motion.ul {...fade(0.4)} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 sm:text-sm">
          {["Fakta dikonfirmasi klien", "QA manusia berlapis", "Tanpa auto-publish"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-4 text-teal-300" /> {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Panggung orbit agent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-6 flex h-[360px] items-center justify-center [perspective:1200px] sm:h-[520px] lg:h-[640px]"
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative flex size-[640px] shrink-0 scale-[0.54] items-center justify-center [transform-style:preserve-3d] sm:scale-[0.8] lg:scale-100"
        >
          <div className="absolute size-[300px] rounded-full bg-teal-500/10 blur-3xl" />
          <OrbitingCircles radius={150} iconSize={60} speed={0.6}>
            {inner.map((a) => (
              <OrbitAvatar key={a.id} id={a.id} name={a.name} size={60} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles radius={270} iconSize={54} speed={0.35} reverse>
            {outer.map((a) => (
              <OrbitAvatar key={a.id} id={a.id} name={a.name} size={54} />
            ))}
          </OrbitingCircles>

          {/* Inti: approval manusia */}
          <div className="relative z-10 flex size-[184px] flex-col items-center justify-center rounded-full text-center glass shadow-[0_0_80px_-10px_rgba(45,212,191,0.5)]">
            <div className="absolute inset-2 rounded-full border border-dashed border-teal-300/25" />
            <ShieldCheck className="size-8 text-teal-300" />
            <p className="mt-2 font-display text-sm font-bold text-white">Approval manusia</p>
            <p className="mt-1 text-[11px] leading-tight text-slate-400">L1 · L2 · L3<br />sebelum tayang</p>
          </div>
        </motion.div>

        {/* Kartu status melayang (desktop) */}
        <FloatChip className="top-[14%] left-[6%] xl:left-[12%]" delay={0.9} icon={<Check className="size-4 text-emerald-300" />} title="Fakta terkonfirmasi" sub="Harga kamar · CLIENT CONFIRMATION" />
        <FloatChip className="top-[48%] right-[4%] xl:right-[10%]" delay={1.1} icon={<TriangleAlert className="size-4 text-amber-300" />} title="Penanda: harga & promo" sub="Approval naik ke L2" />
        <FloatChip className="bottom-[10%] left-[8%] xl:left-[14%]" delay={1.3} icon={<Lock className="size-4 text-teal-300" />} title="Auto-publish: tidak ada" sub="Anda yang menekan tombol" />
        <FloatChip className="top-[8%] right-[10%] xl:right-[16%]" delay={1.5} icon={<CalendarClock className="size-4 text-sky-300" />} title="Kalender Nyepi & Lebaran" sub="Disiapkan otomatis oleh Dimas" />
      </motion.div>
    </section>
  );
}

function FloatChip({ className, delay, icon, title, sub }: { className: string; delay: number; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute hidden items-center gap-3 rounded-2xl px-4 py-3 text-left glass shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] lg:flex ${className}`}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-white/5">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="block text-xs text-slate-400">{sub}</span>
      </span>
    </motion.div>
  );
}
