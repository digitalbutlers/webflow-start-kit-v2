import { ATTRIBUTES, CDN_REMOTE_ROOT, DIRECTORIES, FILE_EXTENSIONS, FILE_NAMES, MODES } from '../../../config.js';

const modeSubdirectory = window.location.origin.includes('webflow.io') ? MODES.DEVELOPMENT : MODES.PRODUCTION;

export const generateScriptsPaths = () => {
	const scripts = [`${CDN_REMOTE_ROOT}/${modeSubdirectory}/${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`];

	document.querySelectorAll(`[${ATTRIBUTES.COMPONENT_ID}]`).forEach((componentElement) => {
		const componentId = componentElement.getAttribute(ATTRIBUTES.COMPONENT_ID);

		scripts.push(
			`${CDN_REMOTE_ROOT}/${modeSubdirectory}/${DIRECTORIES.COMPONENTS}/${componentId}/${FILE_NAMES.COMPONENT_ROOT}.${FILE_EXTENSIONS.BUILD.SCRIPTS}`
		);
	});

	return [...new Set(scripts)];
};

export const generateStylesPaths = () => [
	`${CDN_REMOTE_ROOT}/${modeSubdirectory}/${FILE_NAMES.GLOBAL}.${FILE_EXTENSIONS.BUILD.STYLES}`,
];
