const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./js/index.js",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  cache: false,
  output: {
    filename: "index.js",
    path: process.env.OUTPUT_PATH || path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".elm"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "..", "build", "bin"),
      publicPath: "/",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SRB2 v2.2.13",
      xhtml: true,
      template: "index.html",
      cache: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          {
            loader: "elm-webpack-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
