export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="CLAU AI, ke atas">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect width="32" height="32" rx="9" fill="#0F766E" />
        <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" fill="none" stroke="#CCFBF1" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="22.4" cy="16" r="2" fill="#5EEAD4" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        CLAU <span className="text-teal-300">AI</span>
      </span>
    </a>
  );
}
