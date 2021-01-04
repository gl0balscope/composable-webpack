const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (mode) => {
  const config = {
    module: {
      rules: [
        {
          test: /\.css$/,
          // use: ['style-loader', 'css-loader'],
          use: [{ loader: MiniCssExtractPlugin.loader, options: {} }, 'css-loader', 'postcss-loader'],
          sideEffects: true
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  }

  return config
}
