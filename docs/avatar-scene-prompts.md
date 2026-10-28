# Prompt Avatar 3D dengan Latar Ruangan

> Untuk carousel **The Agents** di landing page. Tujuannya: setiap agent tampil sebagai figur 3D di dalam ruangan kerja yang sesuai perannya.
> Status: **ASSUMPTION**. Gambar hasilnya perlu dicek Pak Indra / Dea Karisna sebelum dipakai publik (sama seperti status avatar di `clau-agent/agents/avatars/README.md`).

## Aturan (wajib, dari brand-guideline § 3d dan README avatar)

- Karakter **fiktif**, tidak meniru wajah staf atau orang nyata.
- **Pakaian, gaya rambut, dan properti sama dengan figur yang sekarang**, supaya agent tetap dikenali (crop kepala di orbit hero dan CTA tidak diganti).
- Batik hanya sebagai pakaian. Tanpa simbol sakral atau keagamaan di ruangan.
- **Tanpa teks, huruf, logo, merek, atau watermark**, termasuk di layar, poster, dan papan. Layar cukup berisi bentuk/grafik abstrak.
- Jangan meniru karakter atau gaya merek lain (mis. kostum astronot Sintra). Ciri CLAU: figurine vinyl chibi, berpakaian kerja Indonesia.

## Cara pakai

1. Generate tiap gambar dengan **prompt dasar + bagian karakter + bagian ruangan** di bawah. Rasio **3:4 portrait** (mis. 1152×1536), figur berdiri di tengah, seluruh badan terlihat, kaki di sekitar 85% tinggi gambar.
2. Pilih hasil terbaik, lalu simpan sebagai WebP ≤ 200 KB dengan lebar 900 px:
   `public/agents/scene/<id>.webp` (mis. `public/agents/scene/caption-writer.webp`).
3. Di `src/data/agents.ts`, tambahkan `sceneImage: true` pada agent tersebut. Kartu otomatis memakai gambar ruangan dan tidak lagi memakai latar CSS.
4. `npm run build` lalu cek tampilan di desktop dan HP.

## Prompt dasar (dipakai untuk semua agent)

```
3D chibi vinyl figurine character, Pixar-style, soft matte clay and fabric materials,
big head small body proportions, large warm brown eyes, gentle closed-mouth smile,
rosy cheeks, Indonesian appearance, full body standing, front view, centered,
standing inside a detailed miniature diorama room, cinematic soft lighting,
shallow depth of field with softly blurred background, warm realistic interior,
high detail, clean, friendly, professional, portrait 3:4 composition.
No text, no letters, no numbers, no logo, no brand, no watermark, no readable screens.
```

## Per agent

| ID (`<id>.webp`) | Nama | Karakter (jaga sama dengan figur sekarang) | Ruangan |
|---|---|---|---|
| `caption-writer` | Tara | young woman, long straight black hair with blunt bangs, mint green jacket with gold buttons over teal top, brown batik wrap skirt, holding an orange pencil and a black smartphone | open-air Balinese villa terrace at golden-hour sunset, wooden deck, rattan chair, potted frangipani, infinity pool and palm trees softly blurred behind |
| `reel-scripter` | Raka | young man, short wavy black hair, green batik short-sleeve shirt, beige chinos, white sneakers, holding a phone gimbal stabilizer | small content creator studio, ring light, softbox, camera on tripod, purple and teal ambient LED glow, blank monitor with abstract timeline shapes |
| `story-writer` | Sekar | young woman, pink hijab, cream long coat, light grey trousers, holding a smartphone showing colorful abstract bars | cozy Indonesian café in the morning, wooden bar counter, espresso machine, pastel pink tiles, hanging plants, soft window light |
| `listing-writer` | Bayu | young man, neat black hair, round brown glasses, navy sweater vest over white shirt, dark trousers, holding a clipboard with a small villa picture | bright beachfront resort lobby, wooden reception desk, rattan lamps, tropical plants, sea view through large open doors |
| `review-responder` | Laras | young woman, brown hair tied back, teal blazer with small gold badge (no text), black skirt, holding a white speech bubble with a red heart | hotel front office desk, small brass service bell, tidy key rack without numbers, soft green walls, warm lamp light |
| `calendar-planner` | Dimas | young man, short black hair, pencil behind ear, mint green polo shirt, beige trousers, holding a large spiral calendar with colorful dots (no numbers) | sunny planning room, corkboard with colorful sticky notes (blank), wooden desk with coffee mug, warm yellow afternoon light |
| `campaign-planner` | Ayu | young woman, brown bob haircut with bangs, rust orange blazer over cream sweater, dark trousers, holding a white megaphone and a rolled paper scroll | creative campaign room, mood board with abstract color swatches and photos of beaches and food (no text), warm orange accent lights |
| `localizer` | Nara | young man, curly black hair, round glasses, light blue sweater over white collar, holding a small globe, two blank speech bubbles floating beside him | cozy library corner, tall wooden bookshelves with plain book spines, world map shapes without labels, soft blue evening light |
| `report-builder` | Intan | young woman, long black hair in a low ponytail, large round brown glasses, navy blazer over white shirt, grey trousers, holding a tablet with a simple bar chart (no numbers) | modern analytics room, wall screens with abstract teal charts and lines (no text), clean desk, cool teal ambient light |
| `sales-assistant` | Galih | young man, neat black hair, dark teal suit with white shirt, holding a brown leather notebook and a blank business card | calm sales office, meeting table with two chairs, window with city lights blurred, slate grey walls, warm desk lamp |
| `guest-messenger` | Sari | young woman, teal hijab, mint cardigan over white blouse, brown trousers, holding a smartphone with blank chat bubbles, small brass bell at her feet | elegant guest lounge of a boutique hotel, plush sofa, welcome drink tray with fruit, soft pink and gold ambient light |
| `sop-writer` | Teguh | middle-aged man, short black hair with grey temples, lavender purple polo shirt, dark grey trousers, holding a clipboard with a checklist of ticks (no text) | hotel operations back office, shelves with neatly folded towels and labeled-free storage boxes, housekeeping cart, soft lavender light |

## Contoh prompt lengkap (Tara)

```
3D chibi vinyl figurine character, Pixar-style, soft matte clay and fabric materials,
big head small body proportions, large warm brown eyes, gentle closed-mouth smile,
rosy cheeks, Indonesian appearance, full body standing, front view, centered,
young woman, long straight black hair with blunt bangs, mint green jacket with gold buttons
over teal top, brown batik wrap skirt, holding an orange pencil and a black smartphone,
standing inside a detailed miniature diorama room: open-air Balinese villa terrace at
golden-hour sunset, wooden deck, rattan chair, potted frangipani, infinity pool and palm trees
softly blurred behind, cinematic soft lighting, shallow depth of field, warm realistic interior,
high detail, clean, friendly, professional, portrait 3:4 composition.
No text, no letters, no numbers, no logo, no brand, no watermark, no readable screens.
```

## Checklist sebelum dipakai

- [ ] Wajah, rambut, pakaian, dan properti cocok dengan figur sekarang (bandingkan dengan `public/agents/full/<id>.webp`).
- [ ] Tidak ada teks/logo yang muncul (cek layar, poster, papan).
- [ ] Tidak ada simbol sakral; batik hanya di pakaian.
- [ ] File WebP ≤ 200 KB, lebar 900 px, rasio 3:4.
- [ ] Dicek Pak Indra / Dea Karisna, lalu status di tabel avatar diperbarui.
