/**
 * 1. Build this file once you filled config files.
 * 2. Copy-paste content from built webflow.js file to project custom code section.
 * 3. Use data-component-id and data-component-has-styles attributes on your elements to connect scripts and styles.
 * */


import {
	ATTRIBUTES,
	CDN_REMOTE_ROOT,
	MODES,
	DIRECTORIES,
	FILE_NAMES,
	FILE_EXTENSIONS,
} from '../config.js';

const modeSubdirectory = (window.location.origin.includes('webflow.io')
	? MODES.DEVELOPMENT
	: MODES.PRODUCTION);

const getFilesPaths = () => {
	const scripts = [
		`${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`,
	];
	const styles = [
		`${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.STYLES}`,
	];

	document.querySelectorAll(`[${ATTRIBUTES.COMPONENT_ID}]`)
		.forEach((componentElement) => {
			const componentId = componentElement.getAttribute(ATTRIBUTES.COMPONENT_ID);
			const hasStyles = componentElement.getAttribute(ATTRIBUTES.HAS_STYLES_FILE) === 'true';

			scripts.push(`${DIRECTORIES.COMPONENTS}/${componentId}/${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`);
			if (hasStyles) {
				styles.push(`${DIRECTORIES.COMPONENTS}/${componentId}/${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.STYLES}`);
			}
		});

	return {
		scripts: [...new Set(scripts)],
		styles: [...new Set(styles)],
	};
};

const insertScript = ({
	parent = document.body,
	path,
}) => {
	const script = document.createElement('script');
	script.setAttribute('src', path);
	parent.append(script);
};

const insertStyle = ({
	parent = document.head,
	path,
}) => {
	const style = document.createElement('link');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('href', path);
	parent.append(style);
};
const insertFiles = () => {
	const { scripts, styles } = getFilesPaths();

	scripts
		.forEach((scriptPath) => {
			insertScript({
				path: `${CDN_REMOTE_ROOT}/${modeSubdirectory}/${scriptPath}`,
			});
		});

	styles
		.forEach((stylePath) => {
			insertStyle({
				path: `${CDN_REMOTE_ROOT}/${modeSubdirectory}/${stylePath}`,
			});
		});
};

insertFiles();
