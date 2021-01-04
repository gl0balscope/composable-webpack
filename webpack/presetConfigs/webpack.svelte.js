const Path = require('path')
const { merge } = require('webpack-merge')
const { generatePreprocessConfig } = require('../../svelte.config.js')

const developmentConfig = {
  module: {
    rules: [
      {
        test: /\.svelte$/,
        /** exclude all things in node_modules except packages that start with 'svelte' */
        exclude: /node_modules\/(?!svelte)/,
        use: {
          loader: 'svelte-loader-hot',
          options: {
            preprocess: generatePreprocessConfig('development'),
            // NOTE Svelte's dev mode MUST be enabled for HMR to work
            // -- in a real config, you'd probably set it to false for prod build,
            //    based on a env variable or so
            dev: true,

            // NOTE emitCss: true is currently not supported with HMR
            emitCss: false,
            // Enable HMR
            hotReload: true, // Default: false
            // Extra HMR options
            hotOptions: {
              // Prevent preserving local component state
              noPreserveState: false,

              // If this string appears anywhere in your component's code, then local
              // state won't be preserved, even when noPreserveState is false
              noPreserveStateKey: '@!hmr',

              // Prevent doing a full reload on next HMR update after fatal error
              noReload: false,

              // Try to recover after runtime errors in component init
              optimistic: false,

              // --- Advanced ---

              // Prevent adding an HMR accept handler to components with
              // accessors option to true, or to components with named exports
              // (from <script context="module">). This have the effect of
              // recreating the consumer of those components, instead of the
              // component themselves, on HMR updates. This might be needed to
              // reflect changes to accessors / named exports in the parents,
              // depending on how you use them.
              acceptAccessors: true,
              acceptNamedExports: true
            }
          }
        }
      }
    ]
  }
}

const productionConfig = {
  module: {
    rules: [
      {
        test: /\.svelte$/,
        /** exclude all things in node_modules except packages that start with 'svelte' */
        exclude: /node_modules\/(?!svelte)/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: generatePreprocessConfig('production'),
            /** needs to be false until webpack 5 support is fixed */
            emitCss: false,
            hotReload: false
          }
        }
      }
    ]
  }
}

module.exports = (mode) => {
  const commonConfig = {
    resolve: {
      alias: {
        svelte: Path.resolve(__dirname, '../../node_modules', 'svelte')
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main']
    }
  }

  const configForMode = mode === 'production' ? productionConfig : developmentConfig

  return merge(commonConfig, configForMode)
}
