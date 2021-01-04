const { merge } = require('webpack-merge')

const loadConfigForMode = (mode) => {
  const modeConfig = require(`./modeConfigs/webpack.${mode}.js`)

  if (typeof modeConfig !== 'function') {
    throw new Error(`Config for mode=${mode} is not a function`)
  }

  return modeConfig(mode)
}

const loadConfigForPresets = (presets, mode) => {
  const presetConfigs = presets.map((preset) => {
    const presetConfig = require(`./presetConfigs/webpack.${preset}.js`)

    if (typeof presetConfig !== 'function') {
      throw new Error(`Config for preset=${preset} is not a function`)
    }

    return presetConfig(mode)
  })

  return merge({}, ...presetConfigs)
}

const mergeWithPresetsFromCLI = (presetsFromConfig, argv) => {
  const { presets: presetsFromCLI = [] } = argv
  const mergedPresets = [...new Set(presetsFromConfig.concat(presetsFromCLI))]

  return mergedPresets
}

module.exports = {
  loadConfigForMode,
  loadConfigForPresets,
  mergeWithPresetsFromCLI
}
