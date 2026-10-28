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
| `src/App.tsx` | Urutan section: Hero (lounge villa + Tara) → Trusted By → Showcase (close-up wajah agent) → The Agents (carousel) → Desk Scene (agent di meja resepsionis) → Keamanan Konten (Bento) → How it Works (+ diagram alur) → Pricing → CTA |
| `src/components/sections/` | Satu file per section |
| `src/components/ui/orbiting-circles.tsx` | Dari 21st.dev `ruixen.ui/hero-section06`, diadaptasi tanpa Next.js |
| `src/components/ui/bento-grid.tsx` | Dari 21st.dev `kokonutd/bento-grid`, ditambah slot visual + hover Motion |
| `src/components/ui/agent-figure.tsx` | Figur agent hidup: napas/goyang idle, kedip (kelopak berwarna kulit), menoleh via rotateX/rotateY |
| `src/components/ui/wide-scenes.tsx` · `hospitality-scenes.tsx` | Adegan SVG berlapis (parallax) untuk hero & meja · 12 ruangan hospitality per peran untuk kartu |
| `src/components/ui/reveal.tsx` · `button.tsx` | Scroll reveal (fade-in + slide-up) dan tombol dengan hover Motion |
| `public/agents/scene/` | (Opsional) render 3D dengan ruangan asli per agent; prompt & cara pasang: `docs/avatar-scene-prompts.md` |
| `public/scenes/` · `scripts/scenes/` | Latar ilustrasi 4K berlapis (WebP 1920 & 3840) untuk hero & meja; dibuat ulang dengan `python3 scripts/scenes/build.py` (butuh Pillow + Playwright/Chromium) |
| `src/data/agents.ts` | 12 agent, mengikuti `clau-agent/agents/registry.json`, + suasana ruangan (`scene`) per kartu |
| `src/data/site.ts` | Navigasi + `CONTACT_URL` |
| `public/agents/` | Avatar 3D kepala 256×256 (orbit hero, CTA), salinan dari `clau-agent/frontend/public/agents/` |
| `public/agents/full/` | Figur 3D full-body tanpa latar (carousel agent), dipotong dari master `clau-agent/agents/avatars/` dengan `rembg` (isnet-general-use), tinggi 900 px |

## Untuk AI agent

Baca [AGENTS.md](./AGENTS.md): selalu backup ke repo, branch AI → PR → CI hijau → merge otomatis (`.github/workflows/auto-merge.yml`).

## Aturan isi

- Isi paket dari `clau-market/commercial/service-catalog.md`. **Harga tidak ditampilkan** (dikirim lewat proposal).
- Level approval & penanda risiko mengikuti `clau-market/rules/08`.
- Tanpa logo/testimoni klien sampai ada klien nyata yang mengizinkan; contoh data berlabel SIMULASI.
- Avatar = karakter AI fiktif; agent selalu ditampilkan sebagai AI.

## Sebelum tayang publik (NEXT ACTION)

- [ ] Isi `CONTACT_URL` di `src/data/site.ts` dengan kontak resmi (WhatsApp Business / form).
- [ ] Cek nama & merek CLAU di DJKI, domain, handle sosmed (brand-guideline § 1).
- [ ] Review copywriting oleh Pak Indra / Dea Karisna.
