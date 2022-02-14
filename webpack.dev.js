const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (args) => {
  console.log(args);
  return merge(common(args), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
    },
  });
};
