import { existsSync, writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
import stringify from 'json-stringify-pretty-compact'

const configPath = resolve('style-forge.colors.config.json')

const defaultConfig = {
  defaultFormat: 'HSL',
  outputDir: 'src/assets/styles/colors',
  atomicSubDir: "single",
  paletteRanges: [
    [0, 0, [0]],
    [240, 100, [50]],
    [120, 100, [25]],
    [39, 100, [50]],
    [0, 100, [50]],
    [197, 71, [73]],
    [300, 76, [72]],
    [60, 100, [50]],
  ]
}

if (!existsSync(configPath)) {
  writeFileSync(configPath, stringify(defaultConfig))
  console.log('🆕 Created style-forge.colors.config.json with default settings')
}

export const config = JSON.parse(readFileSync(configPath, 'utf-8'))
