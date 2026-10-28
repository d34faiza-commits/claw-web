// Adegan lebar untuk hero & section meja: lapisan ilustrasi 4K (public/scenes, dibuat oleh
// scripts/scenes/build.py) untuk parallax, plus overlay SVG ringan untuk elemen hidup
// (sinar berdenyut, debu melayang, kilau air, cahaya bohlam, uap kopi).
// Overlay memakai viewBox 3840×2160 + slice, sama dengan object-cover gambar, jadi posisinya pas.
import { motion, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

type Layer = { x?: MotionValue<number>; y?: MotionValue<number> };

function SceneLayer({ name, style, eager, children }: { name: string; style?: Layer; eager?: boolean; children?: ReactNode }) {
  return (
    // Sedikit diperbesar supaya tepi tidak terlihat saat lapisan bergeser.
    <motion.div className="absolute inset-0 scale-[1.06]" style={style}>
      <img
        src={`/scenes/${name}-1920.webp`}
        srcSet={`/scenes/${name}-1920.webp 1920w, /scenes/${name}-3840.webp 3840w`}
        sizes="100vw"
        alt=""
        aria-hidden
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      {children && (
        <svg viewBox="0 0 3840 2160" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
          {children}
        </svg>
      )}
    </motion.div>
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
          r={3 + (k % 3) * 2}
          fill={color}
          style={{ animationDelay: `${-k * 0.9}s`, animationDuration: `${7 + (k % 5)}s` }}
        />
      ))}
    </g>
  );
}

/** Hero: lounge villa Bali. Lapis: far (pemandangan luar) · room (interior) · near (perabot depan). */
export function VillaLounge({ far, mid, near }: { far?: Layer; mid?: Layer; near?: Layer }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <SceneLayer name="villa-lounge-far" style={far} eager>
        <defs>
          <linearGradient id="vl-glint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Kilau di permukaan kolam */}
        <rect x="300" y="1236" width="900" height="30" fill="url(#vl-glint)" className="animate-shimmer" />
        <rect x="1500" y="1300" width="700" height="24" fill="url(#vl-glint)" className="animate-shimmer" style={{ animationDelay: "-4s" }} />
      </SceneLayer>
      <SceneLayer name="villa-lounge-room" style={mid} eager>
        <defs>
          <linearGradient id="vl-ray" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff3d1" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffe9b8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Berkas sinar di dinding & lantai */}
        <g className="animate-ray">
          <path d="M2700 0 L3080 0 L3840 900 L3840 1320 Z" fill="url(#vl-ray)" opacity="0.6" />
          <path d="M3220 0 L3420 0 L3840 520 L3840 690 Z" fill="url(#vl-ray)" opacity="0.5" />
          <path d="M2900 1600 L3840 1600 L3840 2160 L3420 2160 Z" fill="#fff3d1" opacity="0.12" />
        </g>
        <Motes x={2650} y={120} w={1150} h={1100} n={22} />
      </SceneLayer>
      <SceneLayer name="villa-lounge-near" style={near} eager />
    </div>
  );
}

/** Section meja: meja resepsionis. Lapis: far (lobi) · mid (monitor) · desk (permukaan meja & properti). */
export function ReceptionDesk({ far, mid }: { far?: Layer; mid?: Layer }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <SceneLayer name="reception-desk-far" style={far} />
      <SceneLayer name="reception-desk-mid" style={mid} />
      <SceneLayer name="reception-desk-desk">
        <defs>
          <radialGradient id="rd-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffcf7a" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Cahaya filamen bohlam yang berkedip halus */}
        <circle cx="520" cy="880" r="360" fill="url(#rd-glow)" className="animate-flicker" />
        <path d="M500 900 q20 -80 40 0" stroke="#ffd27a" strokeWidth="14" fill="none" className="animate-flicker" />
        {/* Uap kopi */}
        {[2580, 2620, 2660].map((x, k) => (
          <path
            key={x}
            d={`M${x} 1620 q-28 -60 0 -120 q28 -60 0 -120`}
            stroke="#ffffff"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            className="animate-steam"
            style={{ animationDelay: `${-k * 0.8}s` }}
          />
        ))}
        <Motes x={200} y={300} w={800} h={700} n={12} color="#fff1c9" />
      </SceneLayer>
    </div>
  );
}
