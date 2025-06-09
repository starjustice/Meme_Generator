/**
 * Clamp a number between a minimum and maximum range.
 *
 * @param val - The value to clamp.
 * @param min - The minimum allowed value.
 * @param max - The maximum allowed value.
 * @returns The clamped value, ensuring it's never less than `min` or more than `max`.
 *
 * Example:
 *   clamp(120, 0, 100) => 100
 *   clamp(-10, 0, 100) => 0
 *   clamp(50, 0, 100) => 50
 */

export function clamp(val: number, min: number, max: number) {
  // First, ensure val is at least `min` using Math.max
  // Then, ensure the result is no more than `max` using Math.min
  return Math.min(Math.max(val, min), max);
}
