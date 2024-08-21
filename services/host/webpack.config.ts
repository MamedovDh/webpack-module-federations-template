// import { BuildMode, BuildPlatform, buildWebpack } from '../../packages/webpack-config/src'
import { BuildMode, BuildPlatform, buildWebpack } from '@packages/build-config'
import path from 'path'
import webpack from 'webpack'
import packageJson from './package.json'


interface EnvVariable {
	mode: BuildMode
	port: number
	analyzer?: boolean
	platform: BuildPlatform
	SHOP_REMOTE_URL?: string
	ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariable) => {
	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			output: path.resolve(__dirname, 'build'),
			src: path.resolve(__dirname, 'src'),
			public: path.resolve(__dirname, 'public'),
		},
		mode: env.mode ?? 'development',
		analyzer: env.analyzer ?? false,
		platform: env.platform ?? 'desktop'
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'host',
		filename: 'remoteEntry.js',

		remotes: {
			// admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`, // add microfrontend for this
		},
		shared: {
			...packageJson.dependencies,
			react: {
				eager: true,
				// requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				eager: true,
				// requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				eager: true,
				// requiredVersion: packageJson.dependencies['react-dom'],
			},
		},
	}))

	return config
}

