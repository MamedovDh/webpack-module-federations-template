import { BuildMode, BuildPlatform, buildWebpack } from '@packages/build-config'
import path from 'path'
import webpack from 'webpack'
import packageJson from './package.json'

interface EnvVariable {
	mode : BuildMode
	port : number
	analyzer ?: boolean
	platform : BuildPlatform
}

export default (env : EnvVariable) => {
	const config : webpack.Configuration = buildWebpack({
		port: env.port ?? 3002,
		paths: {
			entry : path.resolve(__dirname, 'src', 'index.tsx'),
			html : path.resolve(__dirname, 'public', 'index.html'),
			output : path.resolve(__dirname, 'build'),
			src : path.resolve(__dirname, 'src'),
			public : path.resolve(__dirname, 'public'),
		},
		mode: env.mode ?? 'development',
		analyzer : env.analyzer ?? false,
		platform : env.platform ?? 'desktop'
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'template',
		filename: 'remoteEntry.js',
		exposes: {
			'./Router': './src/router/Router.tsx',
		},
		shared: {
			...packageJson.dependencies,
			react: {
				eager: true,
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			},
		},
	}))

	return config
}

// ts-loader умеет работать с JSX, в противном случае пришлось бы подключать и настраивать babel-loader