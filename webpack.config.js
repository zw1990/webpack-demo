// https://segmentfault.com/a/1190000010871559#articleHeader16
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // devtool:'inline-source-map',  // https://webpack.js.org/configuration/devtool/#devtool
  // devtool:'eval-source-map',
  devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
    contentBase: path.resolve(__dirname, 'dist'), // 设置静态资源的根目录
    hot: true, // 告诉 dev-server 我们在用 HMR (只能一个entry)
    hotOnly: true // 指定如果热加载失败了禁止刷新页面 (这是 webpack 的默认行为)，这样便于我们知道失败是因为何种错误
  },
  entry: './src/index.js',
  // entry: {
  //   app: './src/index.js',
  //   print: './src/print.js'
  // },
  output: { //只有一个output配置
    filename: '[name].bundle.js', //默认 main.bundle.js
    path: path.resolve(__dirname, 'dist'),  //输出目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      // title: 'webpack demo',  // 生成 HTML 文档的标题
      // filename: 'index.html' // 写入 HTML 文件的文件名，默认 `index.html`

      template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new CleanWebpackPlugin(['dist']), // 第一个参数是要清理的目录的字符串数组
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new webpack.NamedModulesPlugin(), // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
    new webpack.BannerPlugin('版权所有，翻版必究'),
  ],
  module: {
    // 多个loader写在rules里面
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader:'file-loader', //可以加载任何文件
            options: {
              name: '[name]_[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
          test: /(\.jsx|\.js)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          query: {
              presets: ['es2015']
          }
      }
    ]
  },
};