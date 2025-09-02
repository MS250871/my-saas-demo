import chroma from 'chroma-js';

/**
 * Generates 11 color shades (50-950) from a base color hex using chroma.js.
 * Interpolates in 'lab' color space for perceptual uniformity.
 * Returns array: [50, 100, ..., 950] as hex strings.
 */
export function generateShadesChromaJs(hex: string): string[] {
  // Validate input; fallback to Tailwind indigo if invalid
  let base: string;
  try {
    base = chroma(hex).hex();
  } catch {
    base = '#6366f1';
  }

  // Define endpoints for the scale (white -> base -> black)
  // Define endpoints for the scale (white -> base -> black)
  const scale = chroma.scale(['#ffffff', base, '#000000']).mode('lab');
  // Tailwind-like shade positions (empirically tuned)
  const stops = [
    0.01, 0.07, 0.16, 0.27, 0.4, 0.5, 0.63, 0.73, 0.83, 0.91, 0.98,
  ];

  return stops.map((t) => scale(t).hex());
}
