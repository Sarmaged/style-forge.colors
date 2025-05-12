
# Style-Forge.Colors

![npm](https://img.shields.io/npm/v/style-forge.colors)
![license](https://img.shields.io/npm/l/style-forge.colors)
![npm](https://img.shields.io/npm/dm/style-forge.colors)
![build](https://github.com/Style-Forge/colors/actions/workflows/release.yml/badge.svg)

`Style-Forge.Colors` is an atomic CSS palette generator based on the HSL color model. Generate exactly the colors you need — programmatically, interactively, or by name. Perfect for design systems, theming, and scalable UIs.

## 🚀 Quick Start

```bash
npx sf.color
```

or use the full name:

```bash
npx style-forge.colors
```

## ✨ What you can do
* 🎨 Generate atomic HSL-based CSS color files
* ⚙️ Run fully in terminal — no JavaScript or framework required
* 🔁 Combine selected .css files into a palette
* 📦 Use in Tailwind, Vue, React, Svelte, or raw CSS

## 🎨 Supported Input Formats

| Format | Example Input     | Example Output          |
|--------|-------------------|--------------------------|
| `HSL`  | `259 100 42`      | `hsl(259, 100%, 42%)`    |
| `RGB`  | `120 200 255`     | `rgb(120, 200, 255)`     |
| `HEX`  | `#FF00AA`         | `#ff00aa`                |

You can use any of the above formats when generating a color CSS file.  
The output includes a fully scoped, theme-aware CSS module for light, dark, and auto modes.

## 🎯 Modifier Suffixes

Style-Forge Colors provides utility modifiers to fine-tune element behavior:

| Suffix     | Meaning                             | Applies to |
|------------|--------------------------------------|----------|
| `:st`      | Static. Ignores theme-based changes. | `bg`, `txt` |
| `:txt`     | Text color based on contrast logic.  | `txt` |
| `:txt:st`  | Static text color.                   | `txt`    |
| `:txt:rv`  | Reversed text (for strong contrast). | `txt`    |

> Combine them like `.sf-c-180:100:50:txt:st` for consistent control across themes.

## Documentation

To check out docs, visit [style-forge.github.io](https://style-forge.github.io/colors/)

## Support the project ⭐

If you feel awesome and want to support us in a small way, please consider starring and sharing the repo! This helps us getting known and grow the community. 🙏

<img src="https://github.com/style-forge/hub/raw/main/public/github-star.gif" alt="style-forge-star" />

## Modules

<table>
  <tr>
    <th>Module</th>
    <th colspan="2">Links</th>
    <th>Version</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>hub</td>
    <td><a href="https://github.com/Style-Forge/hub" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge" alt="npm"></td>
    <td>Central repository that integrates all project modules.</td>
  </tr>
  <tr>
    <td>base</td>
    <td><a href="https://github.com/Style-Forge/base" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.base" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.base" alt="npm"></td>
    <td>Basic styles and foundational components of the project.</td>
  </tr>
  <tr>
    <td>form</td>
    <td><a href="https://github.com/Style-Forge/form" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.form" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.form" alt="npm"></td>
    <td>Styles and components for creating forms.</td>
  </tr>
  <tr>
    <td>helpers</td>
    <td><a href="https://github.com/Style-Forge/helpers" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.helpers" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.helpers" alt="npm"></td>
    <td>Utility functions and helpers for the project.</td>
  </tr>
  <tr>
    <td>└&nbsp;media</td>
    <td><a href="https://github.com/Style-Forge/media" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.media" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.media" alt="npm"></td>
    <td>Comprehensive CSS media query helpers for responsive web design.</td>
  </tr>
  <tr>
    <td>themes</td>
    <td><a href="https://github.com/Style-Forge/themes" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.themes" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.themes" alt="npm"></td>
    <td>Themes and styling options for the project.</td>
  </tr>
  <tr>
    <td>patterns</td>
    <td><a href="https://github.com/Style-Forge/patterns" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.patterns" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.patterns" alt="npm"></td>
    <td>Reusable patterns and templates for the project.</td>
  </tr>
  <tr>
    <td>colors</td>
    <td><a href="https://github.com/Style-Forge/colors" target="_blank">GitHub</a></td>
    <td><a href="https://npmjs.com/package/style-forge.colors" target="_blank">NPM</a></td>
    <td><img src="https://img.shields.io/npm/v/style-forge.colors" alt="npm"></td>
    <td>Atomic HSL-based color generator and palette engine.</td>
  </tr>
</table>

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/branch-name`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push your changes to the forked repository: `git push origin feature/branch-name`.
5. Create a pull request in the original repository.

For more detailed information, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
