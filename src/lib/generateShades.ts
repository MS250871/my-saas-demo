import { TinyColor } from '@ctrl/tinycolor';

export function generateShades(hex: string) {
  // Based on Tailwind algorithm approximation
  const base = new TinyColor(hex);
  return [
    base.clone().lighten(36).toHexString(), // 50
    base.clone().lighten(24).toHexString(), // 100
    base.clone().lighten(16).toHexString(), // 200
    base.clone().lighten(8).toHexString(), // 300
    base.clone().lighten(4).toHexString(), // 400
    base.toHexString(), // 500
    base.clone().darken(8).toHexString(), // 600
    base.clone().darken(16).toHexString(), // 700
    base.clone().darken(24).toHexString(), // 800
    base.clone().darken(32).toHexString(), // 900
    base.clone().darken(40).toHexString(), // 950
  ];
}
