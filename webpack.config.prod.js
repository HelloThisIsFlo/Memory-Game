const merge = require("webpack-merge");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  }
});
