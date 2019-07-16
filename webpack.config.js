const path = require("path");

module.exports = {
  entry: "./src/view.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    host: "0.0.0.0"
  }
};
