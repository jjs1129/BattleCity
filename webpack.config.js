const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const OptimizationCss = require("optimize-css-assets-webpack-plugin");
module.exports = (env, argv) => {
  console.log("---", env || argv.mode, "---");
  const devMode = argv.mode === "development" || env !== "production";
  if (devMode) {
    return {
      mode: "development",
      entry: {
        app: path.join(__dirname, "src", "js/index.js"),
      },
      target: "web",
      resolve: {
        extensions: [".js"],
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[name]-[hash:5].min.[ext]",
                  limit: 8192,
                  esModule: false,
                },
              },
            ],
          },
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
        ],
      },
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build/react"),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "index.html"),
        }),
      ],
      devServer: {
        port: 8083,
        compress: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'build'),
        historyApiFallback: true,
      },
      devtool: "inline-source-map",
    };
  } else {
    return {
      mode: "production",
      entry: {
        app: path.join(__dirname, "src", "js/index.js"),
      },
      target: "web",
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.s?css$/,
            use: [MiniCss.loader, "css-loader"],
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[name]-[hash:5].min.[ext]",
                  limit: 8192,
                  esModule: false,
                },
              },
            ],
          },
        ],
      },
      output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build/react"),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "src", "index.html"),
          minify: {
            collapseWhitespace: true,
            removeComments: true,
          },
        }),
        new MiniCss(),
      ],
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "async",
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: "~",
          // name: true,
          cacheGroups: {
            vendors: {
              test: /\/node_modules\//,
              priority: -10,
              chunks: "initial",
            },
            "react-vendor": {
              test: /react/,
              priority: 1,
              chunks: "initial",
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };
  }
};