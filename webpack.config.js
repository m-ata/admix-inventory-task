const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
          },
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
          },
          {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          },
        ],
      },
      devServer: {
        historyApiFallback: true,
        proxy: {
          "*": {
            target: "https://services.admixplay.com",
            secure: false,
            changeOrigin: true,
          },
        },    
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src", "index.html"),
        }),
      ],
}


