const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 최초 진입점 파일 경로
  output: { // webpack 실행 후 번들의 이름과 경로
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 번들링 폴더로 복사할 HTML 파일
    }),
  ],
  devServer: {
    port: 3001,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true, // 404 페이지 대신 index.html로 이동합니다.
    hot: true, // 변경된 사항만 갱신
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.(png|jpg|gif)$/,
        use : 'file-loader'
      },
      {
          test : /\.txt$/,
          use : 'raw-loader'
      },
    ]
  },
};