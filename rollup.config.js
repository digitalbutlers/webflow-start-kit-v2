import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import path, { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';


const ROOT_DIRECTORY = 'src';
const COMPONENTS_DIRECTORY = 'components';
const ASSETS_DIRECTORY = 'assets';
const IMAGES_DIRECTORY = 'images';
const FONTS_DIRECTORY = 'fonts';

const COMPONENTS_ROOT_FILE_NAME = 'index';
const GLOBAL_FILES_NAME = 'main';

const EXTENSIONS = {
	SCRIPTS: 'js',
	STYLES: 'css',
};

const GLOBAL_SCRIPT_PATH = resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	ROOT_DIRECTORY,
	`${GLOBAL_FILES_NAME}.${EXTENSIONS.SCRIPTS}`,
);


const generateInput = () => {
	const componentsPath = resolve(ROOT_DIRECTORY, COMPONENTS_DIRECTORY);
	const componentsDirectories = readdirSync(componentsPath);

	const input = {
		main: GLOBAL_SCRIPT_PATH,
	};

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

const generateEntryFileNames = ({ facadeModuleId }) => {
	const isMainScript = facadeModuleId === GLOBAL_SCRIPT_PATH.replaceAll('\\', '/');

	return isMainScript
		? `${GLOBAL_FILES_NAME}.${EXTENSIONS.SCRIPTS}`
		: `${COMPONENTS_DIRECTORY}/[name]/${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.SCRIPTS}`;
};

const generateAssetFileNames = ({ name }) => {
	const isComponentStyle = name.startsWith(COMPONENTS_DIRECTORY) && name.endsWith(`${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.STYLES}`);

	if (isComponentStyle) {
		const symbolsToRemove = new RegExp(`${COMPONENTS_DIRECTORY}|${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.STYLES}|/`, 'gi');
		const componentName = name.replaceAll(symbolsToRemove, '');
		return `${COMPONENTS_DIRECTORY}/${componentName}/${COMPONENTS_ROOT_FILE_NAME}.${EXTENSIONS.STYLES}`;
	}

	const isMainStyle = name === `${GLOBAL_FILES_NAME}.${EXTENSIONS.STYLES}`;
	if (isMainStyle) {
		return `${GLOBAL_FILES_NAME}.${EXTENSIONS.STYLES}`;
	}

	if (/\.(png|jpe?g|gif|webp|svg)$/i.test(name ?? '')) {
		return `${ASSETS_DIRECTORY}/${IMAGES_DIRECTORY}/[name][extname]`;
	}

	if (/\.(woff(2)?|ttf|eot)$/i.test(name ?? '')) {
		return `${ASSETS_DIRECTORY}/${FONTS_DIRECTORY}/[name][extname]`;
	}

	const extension = name.split('.').at(-1);

	return `${ASSETS_DIRECTORY}/${extension}/[name][extname]`;
};

export default {
	input: generateInput(),
	output: {
		format: 'cjs',
		entryFileNames: generateEntryFileNames,
		assetFileNames: generateAssetFileNames,
	},
	plugins: [
		getBabelOutputPlugin({
			presets: ['@babel/preset-env'],
		}),
	],
};
