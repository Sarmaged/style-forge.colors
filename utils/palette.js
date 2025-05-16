import { resolve } from 'path'
import { config } from './config.js'
import { writeFileWithDirs } from './fs.js'
import { generateSingleColorCSS } from '../generators/styleBlocks.js'
import { getProjectRoot } from './getProjectRoot.js'

export async function handleSingleColor(H, S, L) {
  const css = generateSingleColorCSS(H, S, L)

  const filePath = [config.output.dir, config.modules.colors.dir, config.modules.colors.atomicSubDir, `${H}.${S}.${L}.css`]
  const path = resolve(getProjectRoot(), ...filePath)

  await writeFileWithDirs(path, css)
  console.log(`✅ Generated → ${filePath.join('/')}`)
}

export async function handlePaletteRanges(ranges) {
  console.log('🎨 Generating colors from config.modules.colors.paletteRanges...\n')
  for (const [H, S, lightnessList] of ranges) {
    for (const L of lightnessList) {
      await handleSingleColor(H, S, L)
    }
  }
}
