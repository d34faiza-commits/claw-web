// Adegan lebar (1600×900) untuk hero & section meja: berlapis jauh/tengah/dekat untuk parallax,
// dengan elemen hidup (daun bergoyang, sinar berdenyut, debu melayang, uap, bohlam berkedip).
// Tanpa teks, logo, atau simbol sakral (aturan avatar CLAU).
import { motion, type MotionValue } from "motion/react";

type Layer = { x?: MotionValue<number>; y?: MotionValue<number> };

const leafGreens = ["#1f4d2e", "#2a6b3d", "#3d8a4f", "#24563a", "#4f9a5c", "#173d26"];

function Foliage({ seed, count, x0, x1, y0, y1, r0, r1 }: { seed: number; count: number; x0: number; x1: number; y0: number; y1: number; r0: number; r1: number }) {
  // Pseudo-acak deterministik supaya render server/klien sama.
  const rnd = (k: number) => {
    const v = Math.sin(seed * 999 + k * 77.7) * 10000;
    return v - Math.floor(v);
  };
  return (
    <g>
      {Array.from({ length: count }, (_, k) => (
        <ellipse
          key={k}
          cx={x0 + rnd(k) * (x1 - x0)}
          cy={y0 + rnd(k + 50) * (y1 - y0)}
          rx={r0 + rnd(k + 100) * (r1 - r0)}
          ry={(r0 + rnd(k + 150) * (r1 - r0)) * 0.8}
          fill={leafGreens[k % leafGreens.length]}
          opacity={0.75 + rnd(k + 200) * 0.25}
        />
      ))}
    </g>
  );
}

function Motes({ x, y, w, h, n, color = "#FFF4D6" }: { x: number; y: number; w: number; h: number; n: number; color?: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, k) => (
        <circle
          key={k}
          className="animate-mote"
          cx={x + ((k * 137) % w)}
          cy={y + ((k * 89) % h)}
          r={1.5 + (k % 3)}
          fill={color}
          style={{ animationDelay: `${-k * 0.9}s`, animationDuration: `${7 + (k % 5)}s` }}
        />
      ))}
    </g>
  );
}

/** Hero: lounge villa tropis, pergola kayu, kebun & kolam di luar, sinar matahari di dinding. */
export function VillaLounge({ far, mid, near }: { far?: Layer; mid?: Layer; near?: Layer }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <filter id="vl-b8"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="vl-b2"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="vl-b5"><feGaussianBlur stdDeviation="5" /></filter>
        <linearGradient id="vl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe3f0" />
          <stop offset="1" stopColor="#f6e7c8" />
        </linearGradient>
        <linearGradient id="vl-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b3f24" />
          <stop offset="1" stopColor="#2a160c" />
        </linearGradient>
        <linearGradient id="vl-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9d2c6" />
          <stop offset="1" stopColor="#f3eee6" />
        </linearGradient>
        <linearGradient id="vl-ray" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6dc" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vl-pool" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3fb8c9" />
          <stop offset="0.5" stopColor="#8fe3ea" />
          <stop offset="1" stopColor="#3fb8c9" />
        </linearGradient>
      </defs>

      {/* Lapisan jauh: langit, kebun tropis, kolam */}
      <motion.g style={far} filter="url(#vl-b8)">
        <rect x="-100" y="-50" width="1800" height="700" fill="url(#vl-sky)" />
        <Foliage seed={1} count={70} x0={-80} x1={1100} y0={120} y1={560} r0={40} r1={110} />
        <rect x="-100" y="560" width="1200" height="60" fill="url(#vl-pool)" className="animate-shimmer" />
        <Foliage seed={2} count={30} x0={-80} x1={1100} y0={20} y1={200} r0={60} r1={140} />
      </motion.g>

      {/* Lapisan tengah: dinding, jendela, pergola, bufet, lampu gantung */}
      <motion.g style={mid} filter="url(#vl-b2)">
        {/* Dinding kanan bersinar */}
        <path d="M1080 0 H1700 V700 H1080 Z" fill="url(#vl-wall)" />
        <g className="animate-ray">
          <path d="M1120 0 L1240 0 L1600 520 L1480 560 Z" fill="url(#vl-ray)" opacity="0.7" />
          <path d="M1290 0 L1350 0 L1700 430 L1640 470 Z" fill="url(#vl-ray)" opacity="0.55" />
        </g>
        {/* Kusen jendela besar */}
        <g fill="#1d140e">
          <rect x="-100" y="90" width="1180" height="16" />
          <rect x="-100" y="600" width="1180" height="22" />
          {[120, 400, 680, 960].map((x) => (
            <rect key={x} x={x} y="90" width="14" height="530" />
          ))}
          <rect x="1068" y="0" width="20" height="700" />
        </g>
        {/* Pergola */}
        <g fill="#2a1b12">
          {[0, 120, 240, 360].map((y) => (
            <rect key={y} x="-100" y={y - 6} width="1200" height="18" opacity="0.9" />
          ))}
          {[60, 300, 540, 780, 1020].map((x) => (
            <path key={x} d={`M${x} -20 L${x + 30} -20 L${x + 70} 110 L${x + 40} 110 Z`} />
          ))}
        </g>
        {/* Lampu gantung rotan */}
        {[330, 760].map((x, k) => (
          <g key={x} className="animate-sway" style={{ transformOrigin: `${x}px 0px`, animationDelay: `${-k * 2}s` }}>
            <line x1={x} y1="0" x2={x} y2="150" stroke="#1d140e" strokeWidth="3" />
            <ellipse cx={x} cy="195" rx="70" ry="52" fill="#7a5530" opacity="0.92" />
            <ellipse cx={x} cy="195" rx="70" ry="52" fill="none" stroke="#3b2716" strokeWidth="3" strokeDasharray="6 8" />
            <circle cx={x} cy="225" r="34" fill="#ffd98a" opacity="0.25" />
          </g>
        ))}
        {/* Bufet kayu & dekor */}
        <rect x="1150" y="560" width="520" height="150" rx="6" fill="#5a3a22" />
        <rect x="1150" y="552" width="520" height="14" rx="4" fill="#7c5434" />
        {[1190, 1330, 1470].map((x) => (
          <rect key={x} x={x} y="590" width="110" height="10" rx="3" fill="#3d2616" />
        ))}
        <rect x="1440" y="330" width="150" height="222" rx="4" fill="#efe6d6" stroke="#2a1b12" strokeWidth="6" />
        <path d="M1460 520 C1490 420 1520 470 1540 380 C1555 430 1575 400 1580 520 Z" fill="#c2412d" opacity="0.85" />
        <path d="M1470 360 h40 v60 h-40 z" fill="#2a1b12" opacity="0.7" />
        <ellipse cx="1240" cy="545" rx="22" ry="10" fill="#3a2b20" />
        <path d="M1226 545 q14 -60 28 0 z" fill="#2f4a3a" />
        <path d="M1300 552 q-6 -40 10 -50 q16 10 10 50 z" fill="#4b3a2c" />
      </motion.g>

      {/* Lantai kayu mengilap */}
      <rect x="-100" y="690" width="1800" height="260" fill="url(#vl-floor)" />
      <g stroke="#1a0d06" strokeWidth="2" opacity="0.5">
        {Array.from({ length: 14 }, (_, k) => (
          <line key={k} x1={700 + k * 30} y1="690" x2={-600 + k * 230} y2="900" />
        ))}
      </g>
      <path d="M1180 700 L1620 700 L1700 900 L1300 900 Z" fill="#fff6dc" opacity="0.08" className="animate-ray" />
      <Motes x={1100} y={60} w={480} h={520} n={18} />

      {/* Lapisan dekat: daun di sudut, blur kuat (kedalaman) */}
      <motion.g style={near} filter="url(#vl-b5)">
        <g className="animate-sway" style={{ transformOrigin: "60px 900px" }}>
          {[-40, -15, 10, 35].map((r, k) => (
            <ellipse key={k} cx="60" cy="760" rx="34" ry="150" fill={leafGreens[k + 1]} transform={`rotate(${r} 60 900)`} />
          ))}
        </g>
      </motion.g>
    </svg>
  );
}

/** Section meja: permukaan meja resepsionis, lampu bohlam kaca, bel, kopi beruap, monitor & keyboard. */
export function ReceptionDesk({ far, mid }: { far?: Layer; mid?: Layer }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <filter id="rd-b10"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="rd-b3"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="rd-glow"><feGaussianBlur stdDeviation="18" /></filter>
        <linearGradient id="rd-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8cbb8" />
          <stop offset="1" stopColor="#9c8a74" />
        </linearGradient>
        <linearGradient id="rd-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a27a" />
          <stop offset="1" stopColor="#7a5636" />
        </linearGradient>
        <radialGradient id="rd-bulb" cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Lobi di belakang, sangat buram */}
      <motion.g style={far} filter="url(#rd-b10)">
        <rect x="-100" y="-50" width="1800" height="560" fill="url(#rd-wall)" />
        <path d="M560 470 V180 a140 140 0 0 1 280 0 V470 Z" fill="#eaf4f2" opacity="0.9" />
        <Foliage seed={3} count={18} x0={560} x1={840} y0={260} y1={460} r0={20} r1={50} />
        {[180, 320, 1180, 1320, 1460].map((x, k) => (
          <circle key={x} cx={x} cy={120 + (k % 2) * 60} r={34 + (k % 3) * 10} fill="#ffe2a8" opacity="0.55" />
        ))}
        <rect x="-100" y="380" width="1800" height="40" fill="#6d5a47" opacity="0.6" />
      </motion.g>

      {/* Monitor (kanan atas) & lampu bohlam (kiri), sedikit buram */}
      <motion.g style={mid} filter="url(#rd-b3)">
        <rect x="1060" y="-40" width="640" height="300" rx="18" fill="#141414" />
        <rect x="1078" y="-22" width="604" height="262" rx="8" fill="#20252b" />
        {["#3b82f6", "#f97316", "#22c55e", "#a855f7", "#eab308"].map((c, k) => (
          <g key={c}>
            <rect x={1100 + k * 116} y="20" width="100" height="120" rx="10" fill={c} opacity="0.85" />
            <circle cx={1150 + k * 116} cy="70" r="26" fill="#f5d0b0" />
            <circle cx={1150 + k * 116} cy="58" r="28" fill="#2b1d16" opacity="0.8" />
          </g>
        ))}
        <rect x="1120" y="250" width="40" height="120" fill="#cfcfcf" />
        {/* Lampu bohlam kaca */}
        <ellipse cx="250" cy="520" rx="170" ry="40" fill="#e9e4da" />
        <path d="M110 520 Q110 420 180 400 L320 400 Q390 420 390 520 Z" fill="#f2eee6" />
        <rect x="205" y="330" width="90" height="74" rx="10" fill="#c8b48a" />
        <g className="animate-flicker">
          <circle cx="250" cy="200" r="160" fill="#ffcf7a" opacity="0.35" filter="url(#rd-glow)" />
        </g>
        <path d="M180 330 Q150 110 250 70 Q350 110 320 330 Z" fill="url(#rd-bulb)" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3" />
        <path d="M240 320 V190 M260 320 V190" stroke="#8a6a3a" strokeWidth="3" />
        <path d="M240 190 q10 -40 20 0" stroke="#ffb547" strokeWidth="6" fill="none" className="animate-flicker" />
      </motion.g>

      {/* Permukaan meja */}
      <path d="M-100 560 L1700 560 L1700 950 L-100 950 Z" fill="url(#rd-desk)" />
      <g stroke="#5a3d24" strokeWidth="2" opacity="0.35">
        {Array.from({ length: 12 }, (_, k) => (
          <path key={k} d={`M-100 ${590 + k * 30} Q800 ${575 + k * 32} 1700 ${590 + k * 31}`} fill="none" />
        ))}
      </g>
      <rect x="-100" y="555" width="1800" height="8" fill="#e2c49e" opacity="0.7" />

      {/* Bel resepsionis */}
      <ellipse cx="470" cy="760" rx="78" ry="18" fill="#00000033" />
      <path d="M402 752 a68 64 0 0 1 136 0 Z" fill="#d4a72c" />
      <path d="M420 742 a50 44 0 0 1 60 -36" stroke="#fff3c4" strokeWidth="6" fill="none" opacity="0.7" />
      <rect x="392" y="748" width="156" height="14" rx="6" fill="#8a6a1e" />
      <rect x="464" y="676" width="12" height="18" rx="4" fill="#8a6a1e" />

      {/* Kopi beruap */}
      <ellipse cx="1250" cy="800" rx="70" ry="16" fill="#00000033" />
      <path d="M1190 720 h120 l-10 78 a50 14 0 0 1 -100 0 Z" fill="#f8f5ef" />
      <path d="M1310 735 q34 6 22 34 q-8 14 -26 12" stroke="#f8f5ef" strokeWidth="10" fill="none" />
      <ellipse cx="1250" cy="720" rx="60" ry="12" fill="#5b3a22" />
      {[1225, 1255, 1285].map((x, k) => (
        <path key={x} d={`M${x} 700 q-14 -30 0 -60 q14 -30 0 -60`} stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" className="animate-steam" style={{ animationDelay: `${-k * 0.8}s` }} />
      ))}

      {/* Keyboard */}
      <path d="M1330 640 L1720 610 L1720 720 L1380 760 Z" fill="#ececec" />
      {Array.from({ length: 20 }, (_, k) => (
        <rect key={k} x={1380 + (k % 10) * 32} y={652 + Math.floor(k / 10) * 34 - (k % 10) * 2.6} width="24" height="24" rx="4" fill="#d6d6d6" />
      ))}

      {/* Tanaman kecil & kartu kunci */}
      <path d="M860 790 h60 l-8 50 h-44 z" fill="#b45309" />
      <g className="animate-sway" style={{ transformOrigin: "890px 790px" }}>
        {[-30, 0, 30].map((r) => (
          <ellipse key={r} cx="890" cy="740" rx="12" ry="46" fill="#3d8a4f" transform={`rotate(${r} 890 790)`} />
        ))}
      </g>
      <rect x="650" y="820" width="110" height="68" rx="8" fill="#0f766e" transform="rotate(-8 705 854)" />
      <rect x="664" y="834" width="40" height="8" rx="3" fill="#ccfbf1" transform="rotate(-8 705 854)" />
      <Motes x={80} y={60} w={420} h={420} n={10} color="#fff1c9" />
    </svg>
  );
}
