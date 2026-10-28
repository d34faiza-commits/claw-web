// Diadaptasi dari 21st.dev — ruixen.ui/hero-section06 (OrbitingCircles), tanpa dependensi Next.js.
import React from "react";
import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const count = React.Children.count(children);
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <circle
            className="stroke-white/10 stroke-1"
            strokeDasharray="4 6"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => (
        <div
          style={
            {
              "--duration": calculatedDuration,
              "--radius": radius,
              "--angle": (360 / count) * index,
              "--icon-size": `${iconSize}px`,
            } as React.CSSProperties
          }
          className={cn(
            "absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full",
            reverse && "[animation-direction:reverse]",
            className,
          )}
          {...props}
        >
          {child}
        </div>
      ))}
    </>
  );
}
