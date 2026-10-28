# claw-web

Landing page **CLAU AI**: agensi + platform AI marketing untuk hospitality Indonesia (villa, resto, wedding, travel).

## Stack

React 19 + Vite + TypeScript · Tailwind CSS v4 · Motion (`import { motion } from "motion/react"`) · lucide-react

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + build ke dist/
```

## Struktur

| Path | Isi |
|---|---|
| `src/App.tsx` | Urutan section: Hero → Trusted By → The Agents → Keamanan Konten (Bento) → How it Works → Pricing → CTA |
| `src/components/sections/` | Satu file per section |
| `src/components/ui/orbiting-circles.tsx` | Dari 21st.dev `ruixen.ui/hero-section06`, diadaptasi tanpa Next.js |
| `src/components/ui/bento-grid.tsx` | Dari 21st.dev `kokonutd/bento-grid`, ditambah slot visual + hover Motion |
| `src/components/ui/reveal.tsx` · `button.tsx` | Scroll reveal (fade-in + slide-up) dan tombol dengan hover Motion |
| `src/data/agents.ts` | 12 agent, mengikuti `clau-agent/agents/registry.json`, + suasana ruangan (`scene`) per kartu |
| `src/data/site.ts` | Navigasi + `CONTACT_URL` |
| `public/agents/` | Avatar 3D kepala 256×256 (orbit hero, CTA), salinan dari `clau-agent/frontend/public/agents/` |
| `public/agents/full/` | Figur 3D full-body tanpa latar (carousel agent), dipotong dari master `clau-agent/agents/avatars/` dengan `rembg` (isnet-general-use), tinggi 900 px |

## Aturan isi

- Isi paket dari `clau-market/commercial/service-catalog.md`. **Harga tidak ditampilkan** (dikirim lewat proposal).
- Level approval & penanda risiko mengikuti `clau-market/rules/08`.
- Tanpa logo/testimoni klien sampai ada klien nyata yang mengizinkan; contoh data berlabel SIMULASI.
- Avatar = karakter AI fiktif; agent selalu ditampilkan sebagai AI.

## Sebelum tayang publik (NEXT ACTION)

- [ ] Isi `CONTACT_URL` di `src/data/site.ts` dengan kontak resmi (WhatsApp Business / form).
- [ ] Cek nama & merek CLAU di DJKI, domain, handle sosmed (brand-guideline § 1).
- [ ] Review copywriting oleh Pak Indra / Dea Karisna.
