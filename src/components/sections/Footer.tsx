import { Logo } from "@/components/Logo";
import { nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-slate-400">Agensi + platform AI marketing untuk hospitality Indonesia. AI menyiapkan, manusia memutuskan.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-slate-400 transition-colors hover:text-white">{n.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} CLAU AI. Hak cipta dilindungi.</p>
        <p>Avatar agent adalah karakter AI fiktif. Contoh data di halaman ini adalah SIMULASI.</p>
      </div>
    </footer>
  );
}
