export function getLuminance([R, G, B]) {
  ;[R, G, B] = [R, G, B].map(x => x / 255).map(x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return R * 0.2126 + G * 0.7152 + B * 0.0722
}

export function getContrastRatio(a, b) {
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}
