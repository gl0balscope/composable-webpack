// const { merge } = require('webpack-merge')
// const devServerConfig = require('../presetConfigs/webpack.devServer.js')

// module.exports = (mode) => {
//   const commonDevelopmentConfig = {
//     watch: true
//   }

//   return merge(commonDevelopmentConfig, devServerConfig(mode))
// }

module.exports = (mode) => {
  return {
    devtool: 'eval-source-map'
  }
}
