const sveltePreprocess = require('svelte-preprocess')

const generatePreprocessConfig = (mode) => {
  const preprocessConfig = {
    postcss: true
  }

  return sveltePreprocess(preprocessConfig)
}

module.exports = {
  preprocess: generatePreprocessConfig('development'),
  generatePreprocessConfig
}
