const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    host: "0.0.0.0",
    port: 1234,
    allowedHosts: [
      'sandbox.floriankempenich.com'
    ]
  }
};
