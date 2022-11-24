import {getBabelOutputPlugin} from '@rollup/plugin-babel';

import {resolve} from 'path';
import {readdirSync} from 'fs'


const ROOT_DIRECTORY = 'src'
const COMPONENTS_DIRECTORY = 'components'
const COMPONENTS_ROOT_FILE_NAME = 'index'

const getRollupInput = () => {
	const componentsPath = resolve(ROOT_DIRECTORY, COMPONENTS_DIRECTORY)
	const componentsDirs = readdirSync(componentsPath)

	const input = {}

	componentsDirs.forEach(componentDir => {
			const scriptFile = readdirSync(resolve(componentsPath, componentDir))
				.find(file => file.endsWith('.js',) || file.endsWith('.ts'))

			input[componentDir] = resolve(__dirname, componentsPath, componentDir, scriptFile)
		}
	)

	return input
}


export default {
	input: getRollupInput(),
	output: {
		format: 'cjs',
		entryFileNames: `${COMPONENTS_DIRECTORY}/[name]/${COMPONENTS_ROOT_FILE_NAME}.js`,
		chunkFileNames: `${COMPONENTS_DIRECTORY}/[name]/${COMPONENTS_ROOT_FILE_NAME}-[hash].js`,
		assetFileNames: ({name}) => {

			const isComponentStyle = name.startsWith(COMPONENTS_DIRECTORY) && name.endsWith(`${COMPONENTS_ROOT_FILE_NAME}.css`)

			if(isComponentStyle) {
				const symbolsToRemove = new RegExp(new RegExp(`${COMPONENTS_DIRECTORY}|${COMPONENTS_ROOT_FILE_NAME}.css|/`, 'gi'))
				const componentName = name.replaceAll(symbolsToRemove, '');
				return `${COMPONENTS_DIRECTORY}/${componentName}/${COMPONENTS_ROOT_FILE_NAME}.css`;
			}


			if (/\.css$/i.test(name ?? '')) {
				return `styles/[name].css`;
			}

			if (/\.(png|jpe?g|gif|webp)$/i.test(name ?? '')) {
				return 'img/[name][extname]';
			}

			if (/\.(svg)$/i.test(name ?? '')) {
				return 'svg/[name].svg';
			}

			if (/\.(woff(2)?|ttf|eot)$/i.test(name ?? '')) {
				return 'fonts/[name][extname]';
			}

			const extType = name.split('.').at(1);

			return `${extType}/[name][extname]`;
		},
	},
	plugins: [
		getBabelOutputPlugin({
			presets: ['@babel/preset-env'],
		}),
	],
};
