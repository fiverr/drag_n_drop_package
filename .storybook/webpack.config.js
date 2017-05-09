const webpack = require('@kadira/storybook/node_modules/webpack');

// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  module: {
    loaders: [
      {
        test: /(\.css$)|(\.scss$)/,
        loader: 'style!raw!sass'
      }
    ]
  }
};
