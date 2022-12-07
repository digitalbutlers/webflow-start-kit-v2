/**
 * All you need to do here is change 'NAME' variable to your project name
 * (make it the same as package's name).
 * It will be used for generating a project's directory at cdn.digitalbutlers.me
 * so it MUST be in kebab-case.
 * */


export const NAME = 'webflow-start-kit-v2';
export const HOSTNAME = 'cdn.digitalbutlers.me';
export const PATHNAME = 'projects';
export const CDN_REMOTE_ROOT = `https://${HOSTNAME}/${PATHNAME}/${NAME}`;

export const MODES = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
	WEBFLOW: 'webflow',
};

export const DEPLOY_POSTFIX = '-deploy';

export const FTP = {
	HOST: '148.251.76.226',
	PORT: 21,
	REMOTE_ROOT: `${PATHNAME}/${NAME}/`,
};

export const DIRECTORIES = {
	ROOT: 'src',
	BUILD: 'dist',
	COMPONENTS: 'components',
	ASSETS: 'assets',
	SCRIPTS: 'scripts',
	STYLES: 'styles',
	IMAGES: 'images',
	FONTS: 'fonts',
};

export const FILE_EXTENSIONS = {
	BUILD: {
		SCRIPTS: 'js',
		STYLES: 'css',
	},
};
export const FILE_NAMES = {
	COMPONENT_ROOT: 'index',
	GLOBAL: 'main',
	WEBFLOW: 'webflow',
};

export const ATTRIBUTES = {
	COMPONENT_ID: 'data-component-id',
	HAS_STYLES_FILE: 'data-component-has-styles',
};

