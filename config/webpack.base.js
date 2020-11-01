const path = require("path");

const paths = {
  root: path.resolve(__dirname, "../"),
  source: path.resolve(__dirname, "../sources"),
  bundle: path.resolve(__dirname, "../bundle"),
};

const plugins = {
  Html: require("html-webpack-plugin"),
  Copy: require("copy-webpack-plugin"),
  Define: require("webpack").DefinePlugin,
  ExtractCss: require('mini-css-extract-plugin')
};

module.exports = (options) => {
  const isDevelopment = options.mode === "development";
  const isProduction = options.mode === "production";
  return {
    entry: {
      index: "./sources/index.tsx",
      worker: "./sources/worker.ts",
      content: "./sources/scripts/content.ts"
    },
    output: {
      path: paths.bundle,
      publicPath: "/",
      filename: "[name].js" ,
    },
    module: {
      rules: [
        {
          use: "ts-loader",
          test: /\.tsx?$/,
          exclude: /node_modules/,
        },
        {
          test: /\.(css|less)$/,
          use: [
            plugins.ExtractCss.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                modules: {
                  localIdentName: "[name]__[local]_[hash:base64:5]",
                },
              },
            },
            "less-loader",
          ].filter(Boolean),
        }
      ],
    },
    context: paths.root,
    // devtool: isDevelopment && 'inline-source-map',
    resolve: {
      alias: {
        "~": paths.source,
        uikit: path.resolve(paths.source, "uikit"),
        shared: path.resolve(paths.source, "shared"),
        static: path.resolve(paths.source, "static"),
        features: path.resolve(paths.source, "features"),
        entities: path.resolve(paths.source, "entities"),
        components: path.resolve(paths.source, "components"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new plugins.Define({
        "process.env.NODE_ENV": JSON.stringify(options.mode),
      }),
      new plugins.ExtractCss(),
      new plugins.Copy({
        patterns: [
          {
            from: "public",
            to: paths.bundle,
          },
          {
            from: "sources/manifest.json",
            to: paths.bundle,
          },
          {
            from: "sources/static",
            to: paths.bundle,
          },
        ],
      }),
    ],
  };
};
