import { getLuminance, getContrastRatio } from '../utils/tools.js'
import { HSLToRGB } from '../utils/convert.js'

const blackLum = getLuminance(HSLToRGB([0, 0, 0]))

export function generateSingleColorCSS(H, S, L) {
  const baseLum = getLuminance(HSLToRGB([H, S, L]))
  const contrast = getContrastRatio(blackLum, baseLum)
  const textL = contrast > 7 ? 10 : 90
  const textL_REV = contrast < 7 ? 10 : 90

  const lines = []

  const SELECTOR = `.sf-c-${H}\\:${S}\\:${L}`
  const HSL = `hsl(${H}, ${S}%, ${L}%)`
  const LUM = `hsl(${H}, ${S}%, ${textL}%)`

  const TX_LUM_REV = `hsl(${H}, ${S}%, ${textL_REV}%)`
  const BG_LUM_REV = `hsl(${H}, ${S}%, ${100 - L}%)`

  // var
  lines.push(`${SELECTOR}\\:var { --sf-c-${H}-${S}-${L}: ${H} ${S} ${L} }`)

  // light
  lines.push(`${SELECTOR}, ${SELECTOR}\\:st { color: ${LUM}; background-color: ${HSL} }`)

  // Text
  lines.push(`${SELECTOR}\\:txt, ${SELECTOR}\\:txt\\:st, ${SELECTOR}\\:txt\\:rv { color: ${HSL} }`)

  lines.push('')

  // dark
  lines.push(`html[data-theme='dark'] ${SELECTOR}, html.dark ${SELECTOR} { color: ${TX_LUM_REV}; background-color: ${BG_LUM_REV} }`)
  lines.push(`html[data-theme='dark'] ${SELECTOR}\\:st, html.dark ${SELECTOR}\\:st { color: ${LUM}; background-color: ${HSL} }`)
  lines.push(`html[data-theme='dark'] ${SELECTOR}\\:txt, html.dark ${SELECTOR}\\:txt { color: hsl(${H}, ${S}%, ${90}%) }`)
  lines.push(`html[data-theme='dark'] ${SELECTOR}\\:txt\\:st, html.dark ${SELECTOR}\\:txt\\:st { color: ${HSL} }`)
  lines.push(`html[data-theme='dark'] ${SELECTOR}\\:txt\\:rv, html.dark ${SELECTOR}\\:txt\\:rv { color: hsl(${H}, ${S}%, ${10}%) }`)

  lines.push('')

  // auto
  lines.push(`@media (prefers-color-scheme: dark) {`)
  lines.push(`  html[data-theme='auto'] ${SELECTOR}, html.auto ${SELECTOR} { color: ${TX_LUM_REV}; background-color: ${BG_LUM_REV} }`)
  lines.push(`  html[data-theme='auto'] ${SELECTOR}\\:st, html.auto ${SELECTOR}\\:st { color: ${LUM}; background-color: ${HSL} }`)
  lines.push(`  html[data-theme='auto'] ${SELECTOR}\\:txt, html.auto ${SELECTOR}\\:txt { color: hsl(${H}, ${S}%, ${90}%) }`)
  lines.push(`  html[data-theme='auto'] ${SELECTOR}\\:txt\\:st, html.auto ${SELECTOR}\\:txt\\:st { color: ${HSL} }`)
  lines.push(`  html[data-theme='auto'] ${SELECTOR}\\:txt\\:rv, html.auto ${SELECTOR}\\:txt\\:rv { color: hsl(${H}, ${S}%, ${10}%) }`)
  lines.push(`}`)

  return lines.join('\n')
}
