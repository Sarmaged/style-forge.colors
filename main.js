#!/usr/bin/env node

import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

// packages
import chalk from 'chalk'
import inquirer from 'inquirer'

// utils
import { config } from './utils/config.js'
import { colors } from './utils/colors.js'
import { RGBToHSL, HSLToRGB } from './utils/convert.js'
import { handleSingleColor, handlePaletteRanges } from './utils/palette.js'
import { getProjectRoot } from './utils/getProjectRoot.js'

const projectRoot = getProjectRoot()

async function main() {
  console.clear()

  console.log(`
    ${chalk.hex('#00ffff').bold('  ⚡ STYLE-FORGE.COLORS ⚡  ')}
    ${chalk.hex('#f0f').bold('⚛️ Atomic HSL-based generator')}
  `)

  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'Select mode:',
      choices: [
        '🎨 Generate CSS file by',
        '📐 Generate from paletteRanges (from config)',
        '🌈 Generate full palette for H / S range',
        '🖌️ Select named colors to generate (HSL)',
        '🧩 Combine CSS files',
        '🚪 Exit',
      ],
    },
  ])

  if (mode === '🚪 Exit') {
    console.log('\n👋 Bye!')
    process.exit(0)
  }

  let format = config.modules.colors.defaultFormat || 'HSL'

  if (mode === '🎨 Generate CSS file by') {
    const formatAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'format',
        message: 'Select input format:',
        choices: ['HSL', 'RGB', 'HEX'],
        default: config.modules.colors.defaultFormat || 'HSL',
      },
    ])
    format = formatAnswer.format

    let H, S, L

    if (format === 'HSL') {
      const input = await inquirer.prompt([
        { type: 'input', name: 'h', message: 'Hue (0–360):', validate: v => !isNaN(v) && v >= 0 && v <= 360 },
        { type: 'input', name: 's', message: 'Saturation (0–100):', validate: v => !isNaN(v) && v >= 0 && v <= 100 },
        { type: 'input', name: 'l', message: 'Lightness (0–100):', validate: v => !isNaN(v) && v >= 0 && v <= 100 },
      ])
      H = parseInt(input.h)
      S = parseInt(input.s)
      L = parseInt(input.l)
    }

    if (format === 'RGB') {
      const input = await inquirer.prompt([
        { type: 'input', name: 'r', message: 'Red (0–255):', validate: v => !isNaN(v) && v >= 0 && v <= 255 },
        { type: 'input', name: 'g', message: 'Green (0–255):', validate: v => !isNaN(v) && v >= 0 && v <= 255 },
        { type: 'input', name: 'b', message: 'Blue (0–255):', validate: v => !isNaN(v) && v >= 0 && v <= 255 },
      ])
      const [r, g, b] = [parseInt(input.r), parseInt(input.g), parseInt(input.b)]
      const hsl = RGBToHSL([r, g, b])
      H = Math.round(hsl[0])
      S = Math.round(hsl[1])
      L = Math.round(hsl[2])
    }

    if (format === 'HEX') {
      const input = await inquirer.prompt([
        {
          type: 'input',
          name: 'hex',
          message: 'HEX (e.g. #ff00aa):',
          validate: v => /^#?[0-9A-Fa-f]{6}$/.test(v),
        },
      ])
      const hex = input.hex.replace('#', '')
      const bigint = parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      const hsl = RGBToHSL([r, g, b])
      H = Math.round(hsl[0])
      S = Math.round(hsl[1])
      L = Math.round(hsl[2])
    }

    await handleSingleColor(H, S, L)
  }
  if (mode === '📐 Generate from paletteRanges (from config)') {
    if (config.modules.colors.paletteRanges && Array.isArray(config.modules.colors.paletteRanges)) {
      await handlePaletteRanges(config.modules.colors.paletteRanges)
    } else {
      console.log('⚠️  No paletteRanges found in config.modules.colors.paletteRanges')
    }
  }
  if (mode === '🌈 Generate full palette for H / S range') {
    const { h, s, step } = await inquirer.prompt([
      { type: 'input', name: 'h', message: 'Hue (0–360):', validate: v => !isNaN(v) && v >= 0 && v <= 360 },
      { type: 'input', name: 's', message: 'Saturation (0–100):', validate: v => !isNaN(v) && v >= 0 && v <= 100 },
      {
        type: 'input',
        name: 'step',
        message: 'Step for Lightness (1–100):',
        default: 5,
        validate: v => !isNaN(v) && v > 0 && v <= 100,
      },
    ])
    const H = parseInt(h)
    const S = parseInt(s)
    const stepSize = parseInt(step)

    for (let L = 0; L <= 100; L += stepSize) {
      await handleSingleColor(H, S, L)
    }
    console.log(`✅ Full palette generated for H=${H}, S=${S} with step ${stepSize}`)
  }
  if (mode === '🖌️ Select named colors to generate (HSL)') {
    const names = Array.from(colors.keys()).sort()

    const choices = names.map(name => {
      const hsl = colors.get(name)?.hsl
      if (!hsl) return name
      const rgb = HSLToRGB(hsl)
      return {
        name: chalk.rgb(...rgb)(name),
        value: name,
      }
    })

    const { selected } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: 'Select named colors:',
        choices,
        validate: arr => arr.length > 0 || 'Select at least one color.',
      },
    ])

    for (const name of selected) {
      const color = colors.get(name)
      if (!color || !color.hsl) continue
      const [H, S, L] = color.hsl.map(Math.round)
      await handleSingleColor(H, S, L)
    }
  }
  if (mode === '🧩 Combine CSS files') {
    const outputDir = resolve(projectRoot, config.output.dir, config.modules.colors.dir)
    const srcDir = resolve(outputDir, config.modules.colors.atomicSubDir)

    if (!existsSync(srcDir)) {
      console.log(`❌ Folder "${srcDir}" not found.`)
      return
    }

    const replace = x => x.replace('.css', '').split('.').map(Number)

    const allFiles = readdirSync(srcDir)
      .filter(name => name.endsWith('.css') && !name.startsWith('combined'))
      .sort((a, b) => {
        const [ha, sa, la] = replace(a)
        const [hb, sb, lb] = replace(b)
        return ha - hb || sa - sb || la - lb
      })

    if (allFiles.length === 0) {
      console.log(`❌ No .css files found in "${srcDir}" — nothing to combine.`)
      return
    }

    const colorized = allFiles.map(name => {
      const [h, s, l] = replace(name)
      const rgb = HSLToRGB([h, s, l])
      return {
        name: chalk.rgb(...rgb)(name),
        value: name,
      }
    })

    const { selected } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: 'Select CSS files to combine:',
        choices: colorized,
        validate: arr => arr.length > 0 || 'Select at least one file.',
      },
    ])

    console.log('\nSelected files:')
    selected.forEach((name, i) => console.log(`${i + 1}. ${name}`))

    const { orderInput } = await inquirer.prompt([
      {
        type: 'input',
        name: 'orderInput',
        message: 'Enter desired order (e.g. 2,1,3) or leave empty to keep default order:',
        validate: input => {
          if (!input.trim()) return true
          const indexes = input.split(',').map(i => parseInt(i.trim(), 10))
          const isValid = indexes.length === selected.length && indexes.every(i => i > 0 && i <= selected.length)
          return isValid || 'Enter valid sequence using all indexes (e.g. 2,1,3)'
        },
      },
    ])

    let orderedFiles = selected
    if (orderInput.trim()) {
      const indexes = orderInput.split(',').map(i => parseInt(i.trim(), 10) - 1)
      orderedFiles = indexes.map(i => selected[i])
    }

    const crypto = await import('crypto')
    const hash = crypto.randomBytes(4).toString('hex')

    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Output filename (without extension):',
        default: `combined-${hash}`,
      },
    ])

    const targetPath = join(outputDir, `${name}.css`)
    let combined = ''

    for (const file of orderedFiles) {
      const content = readFileSync(join(srcDir, file), 'utf-8')
      combined += `/* ${file} */\n` + content + '\n\n'
    }

    writeFileSync(targetPath, combined)
    console.log(`✅ Combined ${orderedFiles.length} files into ${name}.css`)
    console.log(`📦 Size: ${(Buffer.byteLength(combined) / 1024).toFixed(2)} KB`)
  }
}

main().catch(err => {
  if (err?.isTtyError || err?.message?.includes('SIGINT') || err.name === 'ExitPromptError') {
    console.log('\n👋 Bye!\n')
    process.exit(0)
  }

  console.error('\n❌ Unhandled error:', err)
  process.exit(1)
})
