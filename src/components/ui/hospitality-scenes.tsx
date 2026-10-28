// Ilustrasi ruangan hospitality per agent (SVG 300×400), tajam (tanpa blur) dengan pencahayaan sederhana.
// Tanpa teks, logo, atau simbol sakral (aturan avatar CLAU).
import type { ReactNode } from "react";

const W = 300;
const H = 400;
const FLOOR = 300;

function Room({ id, wall, floor, children }: { id: string; wall: [string, string]; floor: [string, string]; children: ReactNode }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={wall[0]} />
          <stop offset="1" stopColor={wall[1]} />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={floor[0]} />
          <stop offset="1" stopColor={floor[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={FLOOR} fill={`url(#${id}-wall)`} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={`url(#${id}-floor)`} />
      {children}
      {/* Pencahayaan: cahaya lembut dari atas, bayangan sudut dinding-lantai, kilap lantai */}
      <rect width={W} height={H} fill="url(#room-top-light)" />
      <rect y={FLOOR} width={W} height="14" fill="#000" opacity="0.18" />
      <ellipse cx={W / 2} cy={FLOOR + 40} rx="120" ry="18" fill="#fff" opacity="0.08" />
    </>
  );
}

/** Papan lantai berperspektif dari titik hilang di tengah. */
function Planks({ color, n = 9 }: { color: string; n?: number }) {
  return (
    <g stroke={color} strokeWidth="1.2" opacity="0.45">
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        return <line key={i} x1={110 + t * 80} y1={FLOOR} x2={-120 + t * 540} y2={H} />;
      })}
      <line x1="0" y1={FLOOR + 30} x2={W} y2={FLOOR + 30} opacity="0.5" />
      <line x1="0" y1={FLOOR + 70} x2={W} y2={FLOOR + 70} opacity="0.5" />
    </g>
  );
}

function Plant({ x, y, s = 1, pot = "#B45309", leaf = "#2F7D4F" }: { x: number; y: number; s?: number; pot?: string; leaf?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-50, -25, 0, 25, 50].map((r, i) => (
        <ellipse key={i} cx="0" cy="-34" rx="9" ry="32" fill={leaf} opacity={0.85 + (i % 2) * 0.15} transform={`rotate(${r} 0 0)`} />
      ))}
      <path d="M-16 0 h32 l-5 26 h-22 z" fill={pot} />
    </g>
  );
}

function Palm({ x, y, s = 1, color = "#3B2A2A" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <path d="M-4 0 C-2 -60 6 -110 14 -150 L20 -149 C12 -108 6 -60 5 0 Z" />
      {[-150, -115, -70, -30, 10].map((r, i) => (
        <path key={i} d="M17 -150 C40 -165 70 -160 90 -140 C66 -150 40 -150 17 -146 Z" transform={`rotate(${r + 90} 17 -150)`} />
      ))}
    </g>
  );
}

function Pendant({ x, len = 60, color = "#F5D08A", shade = "#C08A4A" }: { x: number; len?: number; color?: string; shade?: string }) {
  return (
    <g>
      <line x1={x} y1="0" x2={x} y2={len} stroke="#00000055" strokeWidth="1.5" />
      <path d={`M${x - 16} ${len + 16} Q${x} ${len - 8} ${x + 16} ${len + 16} Z`} fill={shade} />
      <circle cx={x} cy={len + 18} r="16" fill={color} opacity="0.35" />
      <circle cx={x} cy={len + 15} r="5" fill={color} />
    </g>
  );
}

function Window({ x, y, w, h, sky, frame = "#FFFFFF", children }: { x: number; y: number; w: number; h: number; sky: [string, string]; frame?: string; children?: ReactNode }) {
  const gid = `win-${x}-${y}-${sky[0].slice(1)}`;
  return (
    <g>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <clipPath id={`${gid}-c`}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${gid})`} />
      <g clipPath={`url(#${gid}-c)`}>{children}</g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={frame} strokeWidth="5" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={frame} strokeWidth="3" />
    </g>
  );
}

function Shelf({ x, y, w, color = "#8B5E3C" }: { x: number; y: number; w: number; color?: string }) {
  return <rect x={x} y={y} width={w} height="5" rx="1" fill={color} />;
}

const scenes: Record<string, () => ReactNode> = {
  // Tara: teras villa Bali saat senja, kolam infinity dan pohon kelapa.
  "caption-writer": () => (
    <Room id="tara" wall={["#FFB677", "#F37F6B"]} floor={["#9A6244", "#5C3826"]}>
      <circle cx="210" cy="190" r="34" fill="#FFE7A8" opacity="0.95" />
      <rect y="225" width={W} height="40" fill="#E88A7A" opacity="0.6" />
      <rect y="262" width={W} height="38" fill="#3FB5B0" />
      <rect y="262" width={W} height="4" fill="#BDF3EC" opacity="0.8" />
      <Palm x={30} y={268} s={1.1} />
      <Palm x={275} y={268} s={0.9} />
      <Planks color="#2E1B12" />
      <Plant x={262} y={330} s={0.9} leaf="#3F7F46" pot="#E8D5B5" />
      <g fill="#FFFFFF">
        <circle cx="255" cy="270" r="4" />
        <circle cx="262" cy="266" r="4" />
        <circle cx="267" cy="273" r="4" />
      </g>
    </Room>
  ),
  // Raka: studio konten dengan ring light, softbox, dan lampu LED.
  "reel-scripter": () => (
    <Room id="raka" wall={["#3A2C78", "#1C1A4A"]} floor={["#221E52", "#110F2C"]}>
      <rect x="0" y="40" width={W} height="4" fill="#C084FC" opacity="0.8" />
      <circle cx="50" cy="150" r="38" fill="none" stroke="#FFF4E0" strokeWidth="9" />
      <circle cx="50" cy="150" r="52" fill="#FFF4E0" opacity="0.12" />
      <line x1="50" y1="190" x2="50" y2="300" stroke="#0B0A1E" strokeWidth="4" />
      <path d="M50 300 l-22 30 M50 300 l22 30 M50 300 v32" stroke="#0B0A1E" strokeWidth="3" />
      <rect x="225" y="100" width="58" height="72" rx="4" fill="#F8F3FF" opacity="0.9" />
      <rect x="225" y="100" width="58" height="72" rx="4" fill="none" stroke="#0B0A1E" strokeWidth="4" />
      <line x1="254" y1="172" x2="254" y2="300" stroke="#0B0A1E" strokeWidth="4" />
      <circle cx="150" cy="80" r="60" fill="#7C3AED" opacity="0.25" />
      <circle cx="260" cy="250" r="40" fill="#2DD4BF" opacity="0.18" />
      <Planks color="#8B5CF6" n={7} />
    </Room>
  ),
  // Sekar: kafe pagi hari, meja bar kayu, mesin espresso, lampu gantung.
  "story-writer": () => (
    <Room id="sekar" wall={["#FBE0EA", "#EBB3C9"]} floor={["#A9786A", "#6E4A40"]}>
      <Window x={18} y={70} w={80} h={120} sky={["#FFF7E8", "#FFE3C4"]} frame="#F6EDE6" />
      <Pendant x={150} len={40} />
      <Pendant x={215} len={55} />
      <Shelf x={190} y={150} w={90} />
      <g fill="#FFFFFF">
        <rect x="198" y="134" width="14" height="16" rx="3" />
        <rect x="220" y="134" width="14" height="16" rx="3" />
        <rect x="242" y="134" width="14" height="16" rx="3" />
      </g>
      <rect x="0" y="235" width={W} height="65" fill="#8A5A44" />
      <rect x="0" y="228" width={W} height="10" fill="#C79A74" />
      <rect x="225" y="190" width="50" height="40" rx="6" fill="#4B5563" />
      <rect x="232" y="198" width="36" height="10" rx="3" fill="#D1D5DB" />
      <Plant x={40} y={228} s={0.7} leaf="#4D8B5A" pot="#F3E6DA" />
      <Planks color="#3E2A22" />
    </Room>
  ),
  // Bayu: lobi resort tepi pantai dengan lengkungan menghadap laut.
  "listing-writer": () => (
    <Room id="bayu" wall={["#F5EBDD", "#E4D2B8"]} floor={["#D8C6A8", "#A8916E"]}>
      {[20, 110, 200].map((x) => (
        <g key={x}>
          <path d={`M${x} 260 V120 a40 40 0 0 1 80 0 V260 Z`} fill="#8FD3EA" />
          <rect x={x} y="205" width="80" height="55" fill="#2E9CC0" />
          <rect x={x} y="205" width="80" height="3" fill="#D8F6FF" />
          <path d={`M${x} 260 V120 a40 40 0 0 1 80 0 V260`} fill="none" stroke="#FFFFFF" strokeWidth="6" />
        </g>
      ))}
      <Pendant x={60} len={30} shade="#B07A43" />
      <Pendant x={240} len={30} shade="#B07A43" />
      <Plant x={18} y={300} s={1.1} leaf="#2E7D52" pot="#E9DCC4" />
      <Plant x={284} y={300} s={1.1} leaf="#2E7D52" pot="#E9DCC4" />
      <Planks color="#8C7656" n={7} />
    </Room>
  ),
  // Laras: meja front office hotel, rak kunci, bel resepsionis.
  "review-responder": () => (
    <Room id="laras" wall={["#D3EBD5", "#9FCDAE"]} floor={["#6E8F78", "#3E5A47"]}>
      <rect x="196" y="70" width="86" height="96" rx="4" fill="#7A5638" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={204 + (i % 4) * 19} y={80 + Math.floor(i / 4) * 28} width="12" height="18" rx="2" fill="#E8C98F" />
      ))}
      <rect x="22" y="80" width="64" height="80" rx="3" fill="#F7F3EA" stroke="#C9A66B" strokeWidth="4" />
      <circle cx="54" cy="120" r="18" fill="#7FB59A" />
      <rect x="0" y="232" width={W} height="68" fill="#5B4636" />
      <rect x="0" y="226" width={W} height="10" fill="#A27B57" />
      <path d="M244 226 a14 14 0 0 1 28 0 Z" fill="#D4A72C" />
      <rect x="240" y="224" width="36" height="4" rx="2" fill="#8A6A1E" />
      <Planks color="#22362A" n={7} />
    </Room>
  ),
  // Dimas: ruang perencanaan, papan gabus dengan sticky note, jendela sore.
  "calendar-planner": () => (
    <Room id="dimas" wall={["#FDECA6", "#F2C25B"]} floor={["#A0773A", "#6B4E22"]}>
      <rect x="16" y="70" width="100" height="120" rx="4" fill="#C8955C" />
      {["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"].map((c, i) => (
        <rect key={c} x={26 + (i % 3) * 30} y={82 + Math.floor(i / 3) * 52} width="22" height="22" fill={c} transform={`rotate(${(i % 2 ? 4 : -5)} ${37 + (i % 3) * 30} ${93 + Math.floor(i / 3) * 52})`} />
      ))}
      <Window x={200} y={60} w={84} h={130} sky={["#FFF6D6", "#FFD98A"]} frame="#FFF8E7" />
      <rect x="170" y="250" width="130" height="10" fill="#8B5E34" />
      <rect x="200" y="226" width="18" height="24" rx="3" fill="#FFFFFF" />
      <Planks color="#3D2B12" />
    </Room>
  ),
  // Ayu: ruang kampanye dengan mood board foto pantai & makanan, lampu untai.
  "campaign-planner": () => (
    <Room id="ayu" wall={["#FFC995", "#F08548"]} floor={["#8A4A2A", "#55301A"]}>
      <path d="M0 40 Q75 70 150 45 T300 50" fill="none" stroke="#5A3420" strokeWidth="1.5" />
      {[20, 55, 95, 135, 175, 215, 255, 285].map((x, i) => (
        <circle key={x} cx={x} cy={48 + Math.sin(i) * 8} r="4" fill="#FFF3C4" />
      ))}
      <rect x="180" y="85" width="105" height="125" rx="4" fill="#F7EBDD" />
      <rect x="188" y="94" width="42" height="34" fill="#4FB3D9" />
      <rect x="188" y="117" width="42" height="11" fill="#F2D49B" />
      <rect x="236" y="94" width="40" height="52" fill="#E76F51" />
      <circle cx="256" cy="120" r="12" fill="#F4A261" />
      <rect x="188" y="134" width="42" height="66" fill="#2A9D8F" />
      <rect x="236" y="152" width="40" height="48" fill="#E9C46A" />
      <rect x="18" y="100" width="70" height="90" rx="4" fill="#FFF7EE" opacity="0.85" />
      <Plant x={50} y={300} s={1} leaf="#3D7A4B" pot="#FFFFFF" />
      <Planks color="#2E180C" />
    </Room>
  ),
  // Nara: pojok perpustakaan dengan rak buku dan peta dunia.
  "localizer": () => (
    <Room id="nara" wall={["#B9C3FF", "#7584E0"]} floor={["#3B3F86", "#22255A"]}>
      {[0, 222].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="78" height="260" fill="#6B4A33" />
          {[70, 130, 190, 250].map((y, r) => (
            <g key={y}>
              <rect x={x} y={y + 40} width="78" height="6" fill="#4A3222" />
              {Array.from({ length: 7 }, (_, i) => (
                <rect key={i} x={x + 5 + i * 10} y={y + 4 + ((i + r) % 3) * 4} width="8" height={36 - ((i + r) % 3) * 4} fill={["#E76F51", "#2A9D8F", "#E9C46A", "#F4F1DE", "#457B9D", "#A8DADC", "#C77DFF"][(i + r) % 7]} />
              ))}
            </g>
          ))}
        </g>
      ))}
      <rect x="96" y="60" width="108" height="66" rx="4" fill="#F1E6C8" />
      <path d="M108 80 q12 -8 22 2 q8 10 -4 18 q-14 4 -18 -20 Z M140 76 q20 -6 34 4 q6 14 -10 16 q-10 12 -18 0 q-10 -8 -6 -20 Z M180 100 q10 -4 14 6 q-6 8 -14 -6 Z" fill="#9BB89A" />
      <Planks color="#151842" n={7} />
    </Room>
  ),
  // Intan: ruang analitik dengan layar grafik di dinding.
  "report-builder": () => (
    <Room id="intan" wall={["#155E58", "#0B3B37"]} floor={["#0E3F3A", "#062522"]}>
      {[
        [18, 70],
        [196, 70],
      ].map(([x, y]) => (
        <g key={x}>
          <rect x={x} y={y} width="86" height="62" rx="6" fill="#06201E" stroke="#2DD4BF" strokeOpacity="0.5" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={x + 10 + i * 15} y={y + 50 - (10 + ((i * 7 + x) % 30))} width="9" height={10 + ((i * 7 + x) % 30)} fill="#5EEAD4" opacity="0.85" />
          ))}
        </g>
      ))}
      <rect x="18" y="150" width="86" height="50" rx="6" fill="#06201E" stroke="#2DD4BF" strokeOpacity="0.5" strokeWidth="2" />
      <polyline points="26,190 44,176 60,182 76,164 96,170" fill="none" stroke="#FBBF24" strokeWidth="3" />
      <rect x="196" y="150" width="86" height="50" rx="6" fill="#06201E" stroke="#2DD4BF" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="239" cy="175" r="16" fill="none" stroke="#5EEAD4" strokeWidth="7" strokeDasharray="60 40" />
      <rect x="0" y="262" width={W} height="10" fill="#1F6F66" />
      <circle cx="150" cy="40" r="80" fill="#2DD4BF" opacity="0.12" />
      <Planks color="#2DD4BF" n={7} />
    </Room>
  ),
  // Galih: kantor sales dengan jendela kota senja dan meja rapat.
  "sales-assistant": () => (
    <Room id="galih" wall={["#A9B4C4", "#5D6B80"]} floor={["#334155", "#1E293B"]}>
      <Window x={14} y={50} w={272} h={160} sky={["#F7B267", "#6D5A9E"]} frame="#E2E8F0">
        {[
          [20, 120, 30],
          [55, 90, 26],
          [86, 135, 34],
          [125, 100, 28],
          [158, 70, 36],
          [200, 115, 30],
          [235, 85, 40],
        ].map(([x, y, w]) => (
          <g key={x}>
            <rect x={x} y={y} width={w} height={210 - y} fill="#2B2F4A" />
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x={x + 5 + (i % 2) * (w / 2 - 2)} y={y + 8 + Math.floor(i / 2) * 18} width="6" height="8" fill="#FFD27A" opacity={(i + x) % 3 ? 0.9 : 0.25} />
            ))}
          </g>
        ))}
      </Window>
      <rect x="0" y="255" width={W} height="12" rx="3" fill="#6B4F3A" />
      <Plant x={276} y={300} s={1} leaf="#2F6B4F" pot="#CBD5E1" />
      <Planks color="#0F172A" n={7} />
    </Room>
  ),
  // Sari: lounge tamu hotel butik, sofa, minuman selamat datang, lampu dinding.
  "guest-messenger": () => (
    <Room id="sari" wall={["#FCDDEB", "#DDA4C4"]} floor={["#8A5A72", "#5A3A4B"]}>
      <rect x="105" y="60" width="90" height="70" rx="4" fill="#F8EEDC" stroke="#C9A24B" strokeWidth="5" />
      <path d="M115 120 Q135 80 150 105 T185 95 V120 Z" fill="#E9A8C0" />
      {[40, 260].map((x) => (
        <g key={x}>
          <rect x={x - 3} y="110" width="6" height="18" fill="#C9A24B" />
          <path d={`M${x - 12} 110 h24 l-6 -20 h-12 z`} fill="#FFF3D6" />
          <circle cx={x} cy="100" r="22" fill="#FFE9B0" opacity="0.35" />
        </g>
      ))}
      <rect x="-10" y="215" width="320" height="60" rx="18" fill="#B0577E" />
      <rect x="-10" y="200" width="320" height="30" rx="14" fill="#C96D96" />
      <rect x="215" y="258" width="70" height="8" rx="3" fill="#C9A24B" />
      <path d="M232 258 l-4 -20 h12 l-4 20 z M254 258 l-4 -20 h12 l-4 20 z" fill="#FDE68A" opacity="0.9" />
      <circle cx="244" cy="240" r="5" fill="#F97316" />
      <Planks color="#3A2330" n={7} />
    </Room>
  ),
  // Teguh: back office housekeeping, rak handuk terlipat dan troli.
  "sop-writer": () => (
    <Room id="teguh" wall={["#D9D0FF", "#9E8FE8"]} floor={["#4C428F", "#2C2560"]}>
      {[0, 222].map((x) => (
        <g key={x}>
          <rect x={x} y="50" width="78" height="250" fill="#E9E4FF" opacity="0.5" />
          {[110, 170, 230].map((y, r) => (
            <g key={y}>
              <Shelf x={x} y={y} w={78} color="#7A6BC9" />
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <rect x={x + 6 + i * 24} y={y - 26} width="20" height="12" rx="3" fill={["#FFFFFF", "#BFE3F5", "#FFFFFF"][(i + r) % 3]} />
                  <rect x={x + 6 + i * 24} y={y - 13} width="20" height="12" rx="3" fill={["#F5F5F5", "#FFFFFF", "#D7F0E6"][(i + r) % 3]} />
                </g>
              ))}
            </g>
          ))}
        </g>
      ))}
      <rect x="96" y="70" width="108" height="70" rx="6" fill="#F4F1FF" opacity="0.7" />
      <rect x="236" y="250" width="56" height="44" rx="4" fill="#8B7FD1" />
      <rect x="240" y="236" width="48" height="14" rx="3" fill="#FFFFFF" />
      <circle cx="246" cy="298" r="5" fill="#2C2560" />
      <circle cx="282" cy="298" r="5" fill="#2C2560" />
      <Planks color="#1E1850" n={7} />
    </Room>
  ),
};

export function HospitalityScene({ id }: { id: string }) {
  const draw = scenes[id];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <radialGradient id="room-top-light" cx="0.5" cy="0" r="0.9">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {draw?.()}
    </svg>
  );
}
