declare module 'culori' {
  // Color types
  export type Color = string | { [key: string]: any };

  // Parses a hex color string and returns a color object or undefined
  export function parseHex(hex: string): Color | undefined;

  // Formats a color object or string to a hex string
  export function formatHex(color: Color): string;

  // Interpolates between colors in a given color space
  export function interpolate(
    colors: Color[],
    options?: { space?: string }
  ): (t: number) => Color;
}
