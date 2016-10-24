module.exports = {
  devtool: 'source-map',
  entry: "./src/index.js",
  output: {
    path: "./dist/public/",
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    contentBase: "./dist/public",
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
}
