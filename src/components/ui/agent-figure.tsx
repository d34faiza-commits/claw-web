import { motion, type MotionValue } from "motion/react";
import { figure, type Agent } from "@/data/agents";
import { cn } from "@/lib/utils";

/**
 * Figur agent "hidup": napas & goyang idle, berkedip lewat kelopak berwarna kulit,
 * dan (opsional) menoleh lewat rotateX/rotateY dari pemanggil.
 * Mengisi kotak induknya; induk wajib memberi `aspectRatio: a.ratio` agar posisi mata tepat.
 */
export function AgentFigure({
  a,
  i,
  rotateX,
  rotateY,
  eager = false,
  className,
}: {
  a: Agent;
  i: number;
  rotateX?: MotionValue<number>;
  rotateY?: MotionValue<number>;
  eager?: boolean;
  className?: string;
}) {
  // Variasi per agent supaya tidak bergerak serempak.
  const dur = 3.6 + (i % 4) * 0.45;
  const blinkDur = 4.2 + ((i * 7) % 5) * 0.6;

  return (
    <motion.div className={cn("relative size-full origin-bottom", className)} style={{ rotateX, rotateY }}>
      <motion.div
        className="relative size-full origin-bottom"
        animate={{ scaleY: [1, 1.014, 1], y: [0, -3, 0], rotate: [-0.7, 0.7, -0.7] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: (i % 5) * 0.3 }}
      >
        <img
          src={figure(a.id)}
          alt={`${a.name}, ${a.role}`}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          className="size-full object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]"
        />
        {a.eyes.map((e, k) => (
          <span
            key={k}
            aria-hidden
            className="absolute animate-blink rounded-[50%] blur-[0.4px]"
            style={
              {
                left: `${e.x - (e.w * 1.45) / 2}%`,
                top: `${e.y - (e.h * 1.45) / 2}%`,
                width: `${e.w * 1.45}%`,
                height: `${e.h * 1.45}%`,
                background: `radial-gradient(ellipse at 50% 30%, color-mix(in srgb, ${e.skin} 72%, white), color-mix(in srgb, ${e.skin} 85%, white) 80%)`,
                "--blink-dur": `${blinkDur}s`,
                "--blink-delay": `${-((i * 1.3) % blinkDur)}s`,
              } as React.CSSProperties
            }
          >
            {/* Garis mata tertutup (lengkung bulu mata) */}
            <span className="absolute inset-x-[14%] top-[38%] h-[30%] rounded-b-full border-b-[3px] border-[#3b2418]/80" />
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
