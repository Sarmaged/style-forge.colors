import { existsSync, writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
import stringify from 'json-stringify-pretty-compact'

// Utils
import { getProjectRoot } from './getProjectRoot.js'

const defaultColorsConfig = {
  atomicSubDir: 'single',
  defaultFormat: 'HSL',
  dir: 'colors',
  paletteRanges: [
    [0, 0, [0]],
    [240, 100, [50]],
    [120, 100, [25]],
    [39, 100, [50]],
    [0, 100, [50]],
    [197, 71, [73]],
    [300, 76, [72]],
    [60, 100, [50]],
  ],
}

const configPath = resolve(getProjectRoot(), 'styleforgerc.json')

if (!existsSync(configPath)) {
  writeFileSync(
    configPath,
    stringify({
      output: {
        dir: 'src/assets/styles',
        name: 'style-forge',
      },
      modules: {
        colors: defaultColorsConfig,
      },
    }),
  )
}

const config = JSON.parse(readFileSync(configPath, 'utf-8'))

config.modules = config.modules || {}
config.modules.colors = config.modules.colors || {}

const target = config.modules.colors

for (const [key, value] of Object.entries(defaultColorsConfig)) {
  if (!(key in target)) target[key] = value
}

writeFileSync(configPath, stringify(config, { maxLength: 100 }))

export { config }
