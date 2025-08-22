// lib/utils.ts
/**
 * Minimal utility to join conditional class names.
 * Usage: cn("a", cond && "b", isActive ? "c" : "d")
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
