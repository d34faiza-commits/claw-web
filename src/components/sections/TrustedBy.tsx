import { BedDouble, Coffee, Heart, Map, Palmtree, UtensilsCrossed, Hotel, Waves } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

// Jujur: CLAU belum memajang logo klien. Bagian ini menunjukkan untuk siapa CLAU dibangun dan di mana kontennya tayang.
const verticals = [
  { icon: Palmtree, label: "Villa & Resort" },
  { icon: Coffee, label: "Kafe & Coffee Shop" },
  { icon: UtensilsCrossed, label: "Restoran" },
  { icon: Waves, label: "Beach Club" },
  { icon: Heart, label: "Wedding Organizer" },
  { icon: Map, label: "Tour & Travel" },
  { icon: Hotel, label: "Hotel Butik" },
  { icon: BedDouble, label: "Homestay" },
];
const channels = ["Instagram", "TikTok", "Facebook", "Google Business Profile", "Booking.com", "Agoda", "Traveloka", "Airbnb", "Tiket.com"];

export function TrustedBy() {
  return (
    <section className="relative py-16">
      <Reveal className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Dibangun khusus untuk bisnis hospitality Indonesia</p>
      </Reveal>
      <Reveal delay={0.1} className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...verticals, ...verticals].map(({ icon: Icon, label }, i) => (
            <div key={i} aria-hidden={i >= verticals.length} className="flex items-center gap-3 rounded-2xl px-5 py-3 glass">
              <Icon className="size-5 text-teal-300" />
              <span className="font-display text-sm font-semibold whitespace-nowrap text-slate-200 sm:text-base">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.2} className="mx-auto mt-10 max-w-4xl px-4">
        <p className="text-center text-xs text-slate-500">Konten disiapkan untuk kanal yang dipakai tamu Anda</p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {channels.map((c) => (
            <li key={c} className="font-display text-sm font-bold tracking-tight text-slate-500 transition-colors hover:text-slate-200 sm:text-base">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
