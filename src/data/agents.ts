// Sumber: clau-agent/agents/registry.json (nama, pilar, status). Avatar: crop 256×256 dari repo yang sama.
export type Eye = { x: number; y: number; w: number; h: number; skin: string };

export type Agent = {
  id: string;
  name: string;
  role: string;
  blurb: string;
  pillar: string;
  active: boolean;
  /** Nama ruangan hospitality di kartu carousel (ilustrasi: components/ui/hospitality-scenes.tsx). */
  scene: { setting: string };
  /** Rasio lebar/tinggi figur full-body (public/agents/full/<id>.webp). */
  ratio: number;
  /** Posisi mata dalam % kotak figur (pusat, lebar, tinggi) + warna kulit kelopak, untuk animasi kedip. */
  eyes: [Eye, Eye];
  /** true bila public/agents/scene/<id>.webp sudah ada (lihat docs/avatar-scene-prompts.md). */
  sceneImage?: boolean;
};

export const agents: Agent[] = [
  { id: "caption-writer", name: "Tara", role: "AI Caption Writer", blurb: "Caption feed yang hangat, jujur, dan sesuai voice brand Anda.", pillar: "AI Marketing", active: true, scene: { setting: "Teras villa saat senja" }, ratio: 0.6611, eyes: [{ x: 31.12, y: 46.24, w: 13.07, h: 8.64, skin: "#deaa71" }, { x: 68.21, y: 46.18, w: 12.89, h: 8.52, skin: "#deaa71" }] },
  { id: "reel-scripter", name: "Raka", role: "AI Reel Scripter", blurb: "Naskah Reels & TikTok per detik, lengkap dengan shot list.", pillar: "AI Marketing", active: true, scene: { setting: "Studio konten" }, ratio: 0.5522, eyes: [{ x: 33.09, y: 35.65, w: 11.95, h: 6.6, skin: "#f1b076" }, { x: 66.59, y: 36.81, w: 11.73, h: 6.48, skin: "#f1b076" }] },
  { id: "story-writer", name: "Sekar", role: "AI Story Writer", blurb: "Set Stories 3 frame untuk promo, event, dan behind the scene.", pillar: "AI Marketing", active: true, scene: { setting: "Kafe pagi hari" }, ratio: 0.4389, eyes: [{ x: 30.97, y: 32.73, w: 14.76, h: 6.48, skin: "#f7c08c" }, { x: 68.07, y: 32.57, w: 13.94, h: 6.12, skin: "#f6c795" }] },
  { id: "listing-writer", name: "Bayu", role: "AI OTA Listing Writer", blurb: "Deskripsi listing OTA & website yang akurat dan mudah ditemukan.", pillar: "AI Marketing", active: true, scene: { setting: "Lobi resort tepi pantai" }, ratio: 0.5233, eyes: [{ x: 33.04, y: 39.16, w: 10.55, h: 5.52, skin: "#f5c688" }, { x: 66.86, y: 38.84, w: 11.92, h: 6.24, skin: "#f0bd7c" }] },
  { id: "review-responder", name: "Laras", role: "AI Review Responder", blurb: "Draft balasan review Google & OTA. Review negatif ke owner.", pillar: "AI Marketing", active: true, scene: { setting: "Meja front office" }, ratio: 0.6189, eyes: [{ x: 42.42, y: 37.5, w: 10.86, h: 6.72, skin: "#f5ce9b" }, { x: 71.81, y: 37.19, w: 11.44, h: 7.08, skin: "#f5c996" }] },
  { id: "calendar-planner", name: "Dimas", role: "AI Calendar Planner", blurb: "Kalender konten bulanan: libur nasional, Ramadan, Nyepi, musim liburan.", pillar: "AI Marketing", active: true, scene: { setting: "Ruang perencanaan" }, ratio: 0.5611, eyes: [{ x: 32.1, y: 40.97, w: 11.55, h: 6.48, skin: "#e8a265" }, { x: 68.2, y: 40.54, w: 11.98, h: 6.72, skin: "#e4a065" }] },
  { id: "campaign-planner", name: "Ayu", role: "AI Campaign Planner", blurb: "Rencana kampanye musiman: Lebaran, Nataru, long weekend.", pillar: "AI Marketing", active: true, scene: { setting: "Ruang kampanye" }, ratio: 0.6044, eyes: [{ x: 38.59, y: 35.14, w: 10.92, h: 6.6, skin: "#ffd290" }, { x: 69.34, y: 34.34, w: 10.52, h: 6.36, skin: "#fed495" }] },
  { id: "localizer", name: "Nara", role: "AI Localizer", blurb: "Konten bilingual ID ⇄ EN yang terasa natural, bukan terjemahan kaku.", pillar: "AI Marketing", active: true, scene: { setting: "Perpustakaan bahasa" }, ratio: 0.88, eyes: [{ x: 39.3, y: 36.6, w: 7.23, h: 6.36, skin: "#edb578" }, { x: 59.69, y: 36.69, w: 7.23, h: 6.36, skin: "#edb578" }] },
  { id: "report-builder", name: "Intan", role: "AI Report Builder", blurb: "Laporan bulanan satu halaman, angka apa adanya dari insight platform.", pillar: "AI Business Intelligence", active: true, scene: { setting: "Ruang analitik" }, ratio: 0.6111, eyes: [{ x: 20.73, y: 38.3, w: 10.21, h: 6.24, skin: "#f7c78f" }, { x: 51.71, y: 38.9, w: 11.59, h: 7.08, skin: "#f4c489" }] },
  { id: "sales-assistant", name: "Galih", role: "AI Sales Assistant", blurb: "Draft balasan inquiry & penawaran untuk tim sales Anda.", pillar: "AI Sales", active: false, scene: { setting: "Kantor sales" }, ratio: 0.4667, eyes: [{ x: 31.5, y: 34.16, w: 10.8, h: 5.04, skin: "#fad49a" }, { x: 66.54, y: 33.8, w: 11.57, h: 5.4, skin: "#f8d49a" }] },
  { id: "guest-messenger", name: "Sari", role: "AI Guest Messenger", blurb: "Pesan pra-kedatangan & after-stay yang personal untuk tamu.", pillar: "AI Sales", active: false, scene: { setting: "Lounge tamu" }, ratio: 0.5322, eyes: [{ x: 34.72, y: 34.99, w: 11.72, h: 6.24, skin: "#fbcb94" }, { x: 69.0, y: 34.88, w: 12.4, h: 6.6, skin: "#f3c189" }] },
  { id: "sop-writer", name: "Teguh", role: "AI SOP Writer", blurb: "SOP operasional yang rapi untuk housekeeping, F&B, dan front office.", pillar: "AI Admin", active: false, scene: { setting: "Ruang operasional" }, ratio: 0.5111, eyes: [{ x: 33.05, y: 32.42, w: 10.33, h: 5.28, skin: "#fddaa8" }, { x: 66.63, y: 32.84, w: 9.86, h: 5.04, skin: "#fbdaa8" }] },
];

export const avatar = (id: string) => `/agents/${id}.webp`;
// Figur full-body tanpa latar (dipotong dari master clau-agent/agents/avatars).
export const figure = (id: string) => `/agents/full/${id}.webp`;
export const sceneImage = (id: string) => `/agents/scene/${id}.webp`;
