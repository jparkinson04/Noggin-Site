// The Noggin mark: the brain that dots the i in the wordmark.
// Copied shape-for-shape from public/brand/noggin-mark.svg (the app's source of
// truth). Never redraw it, and never add a shadow, outline or gradient.
export default function BrainMark({ size = 112, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="102.1 -17.8 468.7 468.7"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ fill: "var(--brand)" }}
    >
      <ellipse cx="470" cy="346" rx="52" ry="26" />
      <path d="M120 225 C112 140 190 70 305 62 C430 54 522 100 550 188 C568 258 512 316 452 326 C426 330 406 326 384 338 C350 356 300 352 255 340 C215 330 190 320 175 300 C168 290 182 284 172 272 C140 262 124 246 120 225 Z" />
    </svg>
  );
}
