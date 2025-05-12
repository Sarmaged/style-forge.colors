import { config } from './config.js'
import { writeFileWithDirs } from './fs.js'
import { generateSingleColorCSS } from '../generators/styleBlocks.js'

export async function handleSingleColor(H, S, L) {
  const css = generateSingleColorCSS(H, S, L)
  const path = `${config.outputDir}/${config.atomicSubDir}/${H}.${S}.${L}.css`
  await writeFileWithDirs(path, css)
  console.log(`✅ Generated → ${path}`)
}

export async function handlePaletteRanges(ranges) {
  console.log('🎨 Generating colors from config.paletteRanges...')
  for (const [H, S, lightnessList] of ranges) {
    for (const L of lightnessList) {
      await handleSingleColor(H, S, L)
    }
  }
}
