const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (args) => {
  console.log(args);
  return {
    entry: {
      app: ["./src/index.js", "./src/index.styl"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/template.pug",
        filename: args.dev ? "index.html" : "main-[contenthash].html",
        minify: false,
      }),
      new MiniCssExtractPlugin({
        filename: args.dev ? "index.css" : "main-[contenthash].css",
      }),
    ],
    output: {
      filename: args.dev ? "index.js" : "main-[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    experiments: {
      topLevelAwait: true,
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: "html-loader",
              options: {
                minimize: false,
              },
            },
            {
              loader: "pug-html-loader",
              options: {
                pretty: true,
              },
            },
          ],
        },
        {
          test: /\.styl(us)?$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"], // 将 Stylus 文件编译为 CSS
        },
      ],
    },
  };
};
