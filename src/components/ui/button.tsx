import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"a"> & { variant?: "primary" | "ghost" };

export function Button({ variant = "primary", className, children, ...props }: Props) {
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[background-color,box-shadow,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300",
        variant === "primary" &&
          "bg-teal-400 text-slate-950 shadow-[0_0_0_1px_rgba(94,234,212,0.4),0_10px_40px_-10px_rgba(45,212,191,0.7)] hover:bg-teal-300 hover:shadow-[0_0_0_1px_rgba(153,246,228,0.6),0_14px_50px_-8px_rgba(45,212,191,0.85)]",
        variant === "ghost" && "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}
