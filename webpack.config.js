const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { merge } = require('webpack-merge')
const argv = require('webpack-nano/argv')
const { loadConfigForMode, loadConfigForPresets, mergeWithPresetsFromCLI } = require('./webpack/configLoadingUtils.js')

module.exports = () => {
  const { mode } = argv

  const baseConfig = {
    mode,
    entry: ['./src/index.js'],
    plugins: [new MiniHtmlWebpackPlugin({ context: { title: 'Yeehaw!' } })]
  }

  const commonPresets = ['svelte', 'tailwind']
  const presetsToLoad = mergeWithPresetsFromCLI(commonPresets, argv)

  const finalConfig = merge(baseConfig, loadConfigForMode(mode), loadConfigForPresets(presetsToLoad, mode))

  return finalConfig
}
