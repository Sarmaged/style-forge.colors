export function HSLToRGB([H, S, L]) {
  // Validate input
  if (isNaN(H) || isNaN(S) || isNaN(L) || H < 0 || H > 360 || S < 0 || S > 100 || L < 0 || L > 100) {
    throw new Error('Invalid input. HSL values must be numbers within valid ranges.');
  }

  // Normalize S and L to the range [0, 1]
  S /= 100;
  L /= 100;

  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs((H / 60) % 2 - 1));
  const m = L - C / 2;

  let R = 0, G = 0, B = 0;

  if (H < 60) {
    R = C;
    G = X;
  } else if (H < 120) {
    R = X;
    G = C;
  } else if (H < 180) {
    G = C;
    B = X;
  } else if (H < 240) {
    G = X;
    B = C;
  } else if (H < 300) {
    R = X;
    B = C;
  } else {
    R = C;
    B = X;
  }

  // Convert RGB values to the range [0, 255] and round them
  R = Math.round((R + m) * 255);
  G = Math.round((G + m) * 255);
  B = Math.round((B + m) * 255);

  return [R, G, B];
}
export function RGBToHEX([r, g, b]) {
  return ('#' + [r, g, b].map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join(''))
}
export function RGBToHSL([r, g, b]) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }

    h *= 60
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}
