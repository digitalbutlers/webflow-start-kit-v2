import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import path, { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';


const ROOT_DIRECTORY = 'src';
const COMPONENTS_DIRECTORY = 'components';
const COMPONENTS_ROOT_FILE_NAME = 'index';

const EXTENSIONS = {
	SCRIPTS: 'js',
	STYLES: 'css',
};

const generateRollupInput = () => {
	const componentsPath = resolve(ROOT_DIRECTORY, COMPONENTS_DIRECTORY);
	const componentsDirectories = readdirSync(componentsPath);

	const input = {};

	componentsDirectories.forEach((componentDirectory) => {
		input[componentDirectory] = resolve(
			path.dirname(fileURLToPath(import.meta.url)),
			componentsPath,
			componentDirectory,
			`${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.SCRIPTS}`,
		);
	});

	return input;
};


export default {
	input: generateRollupInput(),
	output: {
		format: 'cjs',
		entryFileNames: `${COMPONENTS_DIRECTORY}/[name]/${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.SCRIPTS}`,
		chunkFileNames: `${COMPONENTS_DIRECTORY}/[name]/${COMPONENTS_ROOT_FILE_NAME}-[hash].${EXTENSIONS.SCRIPTS}`,
		assetFileNames: ({ name }) => {
			const isComponentStyle = name.startsWith(COMPONENTS_DIRECTORY) && name.endsWith(`${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.STYLES}`);

			if (isComponentStyle) {
				const symbolsToRemove = new RegExp(new RegExp(`${COMPONENTS_DIRECTORY}|${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.STYLES}|/`, 'gi'));
				const componentName = name.replaceAll(symbolsToRemove, '');
				return `${COMPONENTS_DIRECTORY}/${componentName}/${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.STYLES}`;
			}


			if (/\.css$/i.test(name ?? '')) {
				return 'styles/[name].css';
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

			const extensionType = name.split('.').at(1);

			return `${extensionType}/[name][extname]`;
		},
	},
	plugins: [
		getBabelOutputPlugin({
			presets: ['@babel/preset-env'],
		}),
	],
};
