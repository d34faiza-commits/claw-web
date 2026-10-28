# AGENTS.md — claw-web

> Entry point untuk **semua AI coding agent**: Claude Code, ChatGPT/OpenAI Codex, Copilot, Gemini, Cursor, dan lainnya.
> Aturan induk lintas repo: [clau-core AGENTS.md](https://github.com/d34faiza-commits/clau-core/blob/main/AGENTS.md) dan AI-BOUNDARY. Status & handoff: [clau-content docs/status.md](https://github.com/d34faiza-commits/clau-content/blob/main/docs/status.md).

## Repo ini

Landing page publik **CLAU AI** (React + Vite + Tailwind v4 + Motion). Detail struktur: [README.md](./README.md).

```bash
npm ci
npm run build     # typecheck + build; wajib lulus sebelum push
npm audit --audit-level=high
```

## 1. Selalu backup ke repo (perintah owner, 2026-10-28)

Container/sesi AI bersifat sementara. **Semua hasil kerja wajib di-commit dan di-push ke branch kerja di GitHub**, jangan hanya disimpan di container:

- Commit + push setiap kali satu bagian kerja selesai (bukan hanya di akhir sesi).
- Aset yang dibuat/diolah (gambar, prompt, dokumen, script) ikut di-commit di folder yang sesuai (`public/`, `docs/`, `scripts/`).
- Bila push gagal (mis. 403/akses), laporkan ke owner dan buat cadangan (`git bundle`) sampai push berhasil.
- Jangan commit screenshot QA lokal, `node_modules/`, `dist/`, `.env`, credential, atau data klien nyata.

## 2. Branch, PR, dan merge otomatis

1. Kerja di feature branch dengan prefix agent: `claude/…`, `codex/…`, `openai/…`, `chatgpt/…`, `copilot/…`, `gemini/…`, `cursor/…`, `devin/…`, atau `ai/…`. Jangan push langsung ke `main`.
2. Validasi lokal (`npm run build`, `npm audit --audit-level=high`) + self-review diff → buka PR ke `main`.
3. Workflow [`auto-merge.yml`](.github/workflows/auto-merge.yml) me-merge PR dari branch AI **setelah CI (`build`, `audit`) hijau di head terbaru**, dengan guard `--match-head-commit`. Tidak perlu menunggu owner menekan merge (clau-core AGENTS.md § Merge Otomatis Setelah CI Hijau).
4. Bila CI merah atau konflik: perbaiki di branch yang sama lalu push; jangan bypass, jangan skip test.
5. Opt-out: jadikan PR **draft** atau beri label **`no-auto-merge`** (mis. perubahan yang perlu dicek owner dulu).

Merge otomatis hanya untuk **kode/dokumentasi repo ini**. Bukan approval konten klien, bukan publish ke sosial media, bukan perubahan harga.

## 3. Aturan isi halaman

- Tanpa harga di repo (dikirim lewat proposal), tanpa logo/testimoni klien sampai ada izin klien nyata.
- Level approval & penanda risiko mengikuti `clau-market/rules/08`. Contoh data diberi label SIMULASI.
- Avatar agent = karakter AI fiktif; aturan gambar: [docs/avatar-scene-prompts.md](docs/avatar-scene-prompts.md).
- Klaim baru (angka, SLA, fitur) wajib bersumber dari repo CLAU (`clau-market/commercial/`, `clau-agent`); jangan mengarang.
- Otoritas perubahan isi: **Pak Indra** atau **Dea Karisna (d34faiza)**.

## 4. Commit

Format: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`. Jangan cantumkan model ID di commit/PR.
