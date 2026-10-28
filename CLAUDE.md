# CLAUDE.md — claw-web

Baca [AGENTS.md](./AGENTS.md): berlaku sama untuk Claude, ChatGPT/Codex, dan agent lain.

Ringkas:
- **Selalu backup:** commit + push semua hasil kerja ke branch kerja di GitHub, setiap bagian selesai.
- Branch `claude/…` → PR ke `main` → CI `build` + `audit` hijau → `auto-merge.yml` me-merge otomatis (exact-head guard). Opt-out: draft / label `no-auto-merge`.
- `npm run build` dan `npm audit --audit-level=high` wajib lulus sebelum push.
