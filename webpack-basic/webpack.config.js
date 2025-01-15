const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 指定 Webpack 构建的入口文件
  entry: './src/index.js',
  // 指定 Webpack 构建输出的配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 使用 contenthash 生成带有哈希值的文件名
    filename: 'js/bundle.[contenthash].js',
  },
  module: {
    // 指定一组规则，用于确定如何处理不同类型的文件
    rules: [
      {
        // 用于匹配文件路径
        test: /\.js$/,
        exclude: /node_modules/,
        // 指定使用的加载器
        use: {
          // 指定加载器的名称
          loader: 'babel-loader',
          // 配置加载器的选项
          options: {
            // 指定 Babel 预设，这里使用 @babel/preset-env 和 @babel/preset-react，分别用于转换 ES6+ 代码和 JSX 代码
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // {
      //   test: /\.css$/, // 匹配所有以 .css 结尾的文件
      //   use: ['style-loader', 'css-loader'], // 使用 style-loader 和 css-loader 处理 CSS 文件
      // },
      {
        test: /\.css$/, // 匹配所有以 .css 结尾的文件
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 使用 MiniCssExtractPlugin.loader 和 css-loader 处理 CSS 文件
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: 'asset/resource', // 使用 Webpack 5 内置的资源模块处理图片文件
        generator: {
          filename: 'assets/[name].[contenthash][ext]', // 使用 contenthash 生成带有哈希值的文件名，并放到 assets 目录中
        }
      },
    ],
  },
  // 定义插件的配置
  plugins: [
    // 创建一个新的 HTML 文件，并自动将打包后的 JavaScript 文件插入其中
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 插件将 public 目录中的静态资源复制到构建输出目录中。
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // 使用 contenthash 生成带有哈希值的 CSS 文件名
    }),
  ],
  // 配置开发服务器的选项
  devServer: {
    // 指定开发服务器提供内容的目录
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // 启用 gzip 压缩
    compress: true,
    port: 9000,
  },
};