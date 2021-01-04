const { WebpackPluginServe } = require('webpack-plugin-serve')

module.exports = (mode) => {
  return {
    watch: true,
    entry: ['webpack-plugin-serve/client'],
    plugins: [
      new WebpackPluginServe({
        historyFallback: true,
        hmr: true,
        port: 9001,
        static: './dist',
        waitForBuild: true
      })
    ]
  }
}
