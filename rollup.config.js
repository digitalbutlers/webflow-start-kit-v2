import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import path, { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { DIRECTORIES, FILE_EXTENSIONS, FILE_NAMES } from './config.js';

import { deploy } from './deployment.config.js';

const GLOBAL_SCRIPT_PATH = resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	DIRECTORIES.ROOT,
	`${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`,
);


const generateInput = () => {
	const componentsPath = resolve(DIRECTORIES.ROOT, DIRECTORIES.COMPONENTS);
	const componentsDirectories = readdirSync(componentsPath);

	const input = {
		main: GLOBAL_SCRIPT_PATH,
	};

	componentsDirectories.forEach((componentDirectory) => {
		input[componentDirectory] = resolve(
			path.dirname(fileURLToPath(import.meta.url)),
			componentsPath,
			componentDirectory,
			`${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`,
		);
	});

	return input;
};

const generateEntryFileNames = ({ facadeModuleId }) => {
	const isMainScript = facadeModuleId === GLOBAL_SCRIPT_PATH.replaceAll('\\', '/');

	return isMainScript
		? `${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`
		: `${DIRECTORIES.COMPONENTS}/[name]/${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`;
};

const generateAssetFileNames = ({ name }) => {
	const isComponentStyle = name.startsWith(DIRECTORIES.COMPONENTS) && name.endsWith(`${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.STYLES}`);

	if (isComponentStyle) {
		const symbolsToRemove = new RegExp(`${DIRECTORIES.COMPONENTS}|${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.STYLES}|/`, 'gi');
		const componentName = name.replaceAll(symbolsToRemove, '');
		return `${DIRECTORIES.COMPONENTS}/${componentName}/${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.STYLES}`;
	}

	const isMainStyle = name === `${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.STYLES}`;
	if (isMainStyle) {
		return `${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.STYLES}`;
	}

	if (/\.(png|jpe?g|gif|webp|svg)$/i.test(name ?? '')) {
		return `${DIRECTORIES.ASSETS}/${DIRECTORIES.IMAGES}/[name][extname]`;
	}

	if (/\.(woff(2)?|ttf|eot)$/i.test(name ?? '')) {
		return `${DIRECTORIES.ASSETS}/${DIRECTORIES.FONTS}/[name][extname]`;
	}

	const extension = name.split('.').at(-1);

	return `${DIRECTORIES.ASSETS}/${extension}/[name][extname]`;
};

const rollupConfig = ({ modeDirectory, isDeployMode }) => ({
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
		{
			name: 'db-ftp-deploy-plugin',
			writeBundle(options, bundle) {
				if (!isDeployMode) return;

				const files = Object
					.keys(bundle)
					.map((file) => `${modeDirectory}/${file}`);

				deploy(files);
			},
		},
	],
});

export default rollupConfig;
