const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  watch: true,
  mode: 'development',
  // mode: 'production',
  // devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    filename: 'game.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loaders: 'ts-loader' },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader', options: { minimize: true } }
        ]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]

  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
