const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common(args), {
  mode: "production",
  devtool: "source-map",
});
