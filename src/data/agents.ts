// Sumber: clau-agent/agents/registry.json (nama, pilar, status). Avatar: crop 256×256 dari repo yang sama.
export type Agent = {
  id: string;
  name: string;
  role: string;
  blurb: string;
  pillar: string;
  active: boolean;
  /** Suasana ruangan di kartu carousel: warna dinding (atas → bawah), lantai, dan cahaya. */
  scene: { wall: [string, string]; floor: string; light: string; setting: string };
};

export const agents: Agent[] = [
  { id: "caption-writer", name: "Tara", role: "AI Caption Writer", blurb: "Caption feed yang hangat, jujur, dan sesuai voice brand Anda.", pillar: "AI Marketing", active: true, scene: { wall: ["#F6B98A", "#E9846A"], floor: "#7A4A3A", light: "#FFE3B8", setting: "Teras villa saat senja" } },
  { id: "reel-scripter", name: "Raka", role: "AI Reel Scripter", blurb: "Naskah Reels & TikTok per detik, lengkap dengan shot list.", pillar: "AI Marketing", active: true, scene: { wall: ["#3B2B6E", "#1E1B4B"], floor: "#151233", light: "#C084FC", setting: "Studio konten" } },
  { id: "story-writer", name: "Sekar", role: "AI Story Writer", blurb: "Set Stories 3 frame untuk promo, event, dan behind the scene.", pillar: "AI Marketing", active: true, scene: { wall: ["#F9D7E3", "#E9A8C4"], floor: "#8C5B70", light: "#FFF1F6", setting: "Kafe pagi hari" } },
  { id: "listing-writer", name: "Bayu", role: "AI OTA Listing Writer", blurb: "Deskripsi listing OTA & website yang akurat dan mudah ditemukan.", pillar: "AI Marketing", active: true, scene: { wall: ["#9ED8E8", "#5BA8C8"], floor: "#2F5E73", light: "#E6FAFF", setting: "Lobi resort tepi pantai" } },
  { id: "review-responder", name: "Laras", role: "AI Review Responder", blurb: "Draft balasan review Google & OTA. Review negatif ke owner.", pillar: "AI Marketing", active: true, scene: { wall: ["#C8E6C9", "#86C29A"], floor: "#3F6B50", light: "#F1FFF2", setting: "Meja front office" } },
  { id: "calendar-planner", name: "Dimas", role: "AI Calendar Planner", blurb: "Kalender konten bulanan: libur nasional, Ramadan, Nyepi, musim liburan.", pillar: "AI Marketing", active: true, scene: { wall: ["#FDE68A", "#F2B84B"], floor: "#7C5A1E", light: "#FFF8DC", setting: "Ruang perencanaan" } },
  { id: "campaign-planner", name: "Ayu", role: "AI Campaign Planner", blurb: "Rencana kampanye musiman: Lebaran, Nataru, long weekend.", pillar: "AI Marketing", active: true, scene: { wall: ["#FDBA74", "#F0743E"], floor: "#7A3A1C", light: "#FFE9D2", setting: "Ruang kampanye" } },
  { id: "localizer", name: "Nara", role: "AI Localizer", blurb: "Konten bilingual ID ⇄ EN yang terasa natural, bukan terjemahan kaku.", pillar: "AI Marketing", active: true, scene: { wall: ["#A5B4FC", "#6D7FE6"], floor: "#2E3A82", light: "#EEF0FF", setting: "Perpustakaan bahasa" } },
  { id: "report-builder", name: "Intan", role: "AI Report Builder", blurb: "Laporan bulanan satu halaman, angka apa adanya dari insight platform.", pillar: "AI Business Intelligence", active: true, scene: { wall: ["#5EEAD4", "#14B8A6"], floor: "#0F4F49", light: "#E7FFFB", setting: "Ruang analitik" } },
  { id: "sales-assistant", name: "Galih", role: "AI Sales Assistant", blurb: "Draft balasan inquiry & penawaran untuk tim sales Anda.", pillar: "AI Sales", active: false, scene: { wall: ["#94A3B8", "#475569"], floor: "#1E293B", light: "#E2E8F0", setting: "Kantor sales" } },
  { id: "guest-messenger", name: "Sari", role: "AI Guest Messenger", blurb: "Pesan pra-kedatangan & after-stay yang personal untuk tamu.", pillar: "AI Sales", active: false, scene: { wall: ["#FBCFE8", "#D99BC0"], floor: "#6E4560", light: "#FFF0F8", setting: "Lounge tamu" } },
  { id: "sop-writer", name: "Teguh", role: "AI SOP Writer", blurb: "SOP operasional yang rapi untuk housekeeping, F&B, dan front office.", pillar: "AI Admin", active: false, scene: { wall: ["#C4B5FD", "#8B7BE0"], floor: "#3F357A", light: "#F3F0FF", setting: "Ruang operasional" } },
];

export const avatar = (id: string) => `/agents/${id}.webp`;
// Figur full-body tanpa latar (dipotong dari master clau-agent/agents/avatars).
export const figure = (id: string) => `/agents/full/${id}.webp`;
