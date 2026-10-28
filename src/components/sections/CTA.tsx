import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { agents, avatar } from "@/data/agents";
import { CONTACT_URL } from "@/data/site";

export function CTA() {
  const crew = agents.filter((a) => a.active).slice(0, 6);
  return (
    <section id="kontak" className="relative scroll-mt-24 px-4 py-24 sm:py-32">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-teal-300/20 bg-gradient-to-br from-teal-600/25 via-ink-2 to-ink px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute -top-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-teal-400/25 blur-[110px] animate-glow" />

        <div className="relative flex justify-center -space-x-3">
          {crew.map((a, i) => (
            <motion.img
              key={a.id}
              src={avatar(a.id)}
              alt={`${a.name}, agent AI`}
              width={52}
              height={52}
              loading="lazy"
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
              whileHover={{ y: -6, scale: 1.1, zIndex: 10 }}
              className="relative size-12 rounded-full border-2 border-ink bg-mint object-cover sm:size-14"
            />
          ))}
        </div>

        <h2 className="relative mx-auto mt-8 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl">
          Konten jujur, <span className="text-gradient">tamu datang.</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
          Ceritakan properti Anda dalam discovery call 30 menit. Kami tunjukkan contoh alur fact sheet → draft → approval dengan data simulasi.
        </p>
        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={CONTACT_URL}>
            Jadwalkan discovery call <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href="#paket" variant="ghost">
            Bandingkan paket
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
