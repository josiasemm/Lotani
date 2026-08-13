export function Logo({ className = "h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 150"
      className={className}
      role="img"
      aria-label="LOTANI"
      fill="currentColor"
    >
      <path d="M 60 35 V 115 H 105 V 100 H 76 V 35 H 60 Z" />
      <path d="M 145 35 L 120 75 L 145 115 H 185 L 210 75 L 185 35 H 145 Z M 153 49 H 177 L 194 75 L 177 101 H 153 L 136 75 L 153 49 Z" />
      <path d="M 225 35 V 49 H 252 V 115 H 268 V 49 H 295 V 35 H 225 Z" />
      <path d="M 335 35 L 305 115 H 322 L 329 95 H 356 L 363 115 H 380 L 350 35 H 335 Z M 334 81 L 342 56 L 351 81 H 334 Z" />
      <path d="M 395 35 V 115 H 410 L 443 60 V 115 H 458 V 35 H 443 L 410 90 V 35 H 395 Z" />
      <path d="M 475 35 V 115 H 491 V 35 H 475 Z" />
    </svg>
  );
}