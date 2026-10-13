import { cn } from "@/lib/utils"

/*
  The brandXpo symbol, rebuilt as vector from the supplied master artwork
  (matches brandXpo-Symbol-*.png to within antialiasing). Two fixed pieces:
  the upper "leaf" and the forward-facing b. Never move them relative to each other.
*/
export const SYMBOL_VIEWBOX = "288 206 448 610"
export const SYMBOL_TOP_PATH = "M288 206H333.5A101 101 0 0 1 436 307V434.5L332 390C305.5 377.5 288 353.5 288 318.5Z"
export const SYMBOL_B_PATH =
  "M288 488.5L436 557V691.5L598 612.5Q607 605.3 598 596.5L462 535V381L650 467C702 493.5 736 538.5 736 600.5C736 646 712.5 691.5 654.5 720L481 800.5C457.5 811 434.5 816.5 405 815.5C335 814 288 769 288 696.5Z"

export function BrandSymbol({
  className,
  title = "brandXpo",
  animated = false,
}: {
  className?: string
  title?: string
  animated?: boolean
}) {
  return (
    <svg viewBox={SYMBOL_VIEWBOX} className={className} fill="currentColor" role="img" aria-label={title}>
      <path d={SYMBOL_TOP_PATH} className={animated ? "wipe-down" : undefined} style={{ animationDelay: "0.15s" }} />
      <path d={SYMBOL_B_PATH} className={animated ? "wipe-right" : undefined} style={{ animationDelay: "0.55s" }} />
    </svg>
  )
}

/*
  Horizontal signature. Uses the supplied outlined artwork as an alpha mask so
  the exact lockup renders in the current text color.
  The wordmark is never retyped.
*/
export function BrandLockup({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="brandXpo"
      className={cn("inline-block bg-current aspect-[1075/229]", className)}
      style={{
        WebkitMaskImage: "url(/brand/logo-lockup.png)",
        maskImage: "url(/brand/logo-lockup.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  )
}
