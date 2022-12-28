/**
 * 1. This file will be built by `webflow` command.
 * 2. Copy-paste content from built webflow.js file to project custom code section.
 * 3. Use data-component-id attribute on your elements to connect scripts.
 * */

import {
	generateScriptsPaths,
	generateStylesPaths,
	insertScript,
	insertStyle,
	onCustomFilesLoad,
	onCustomFilesError,
} from './_utilities/index.js';

const init = () => {
	const scriptsPaths = generateScriptsPaths();
	const stylesPaths = generateStylesPaths();

	const scriptsPromises = scriptsPaths.map((scriptPath) =>
		insertScript({
			path: scriptPath,
		})
	);
	const stylesPromises = stylesPaths.map((stylePath) =>
		insertStyle({
			path: stylePath,
		})
	);

	Promise.all([...scriptsPromises, ...stylesPromises])
		.then(onCustomFilesLoad)
		.catch(onCustomFilesError);
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
