import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development'
	const isProd = options.mode === 'production'

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}

	const svgrLoader = {
		test: /\.svg$/i,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								}
							}
						]
					}
				}
			}
		],
	}

	const cssLoader = {
		loader: "css-loader",
		options: {
			esModule: false,
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
			}
		}
	}

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			cssLoader,
			{
				loader: "sass-loader",
			}
		],
	}

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
							before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				}
			}
		]
	}

	return [
		assetLoader,
		sassLoader,
		tsLoader,
		svgrLoader
	]
}