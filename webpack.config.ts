import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import dotenv from 'dotenv';

type NODE_ENV = 'production' | 'development';
const mode = process.env.NODE_ENV as NODE_ENV;

export default {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: './index.tsx',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    inline: true,
    hot: true,
    port: Number(process.env.PORT),
    publicPath: '/',
    host: '0.0.0.0',
    historyApiFallback: {
      index: '/',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [createStyledComponentsTransformer()],
          }),
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './html/index.html' }),
    new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: 'assets', noErrorOnMissing: true }] }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
  ],
} as Configuration;
