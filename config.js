export const NAME = 'webflow-start-kit-v2';
export const HOSTNAME = 'cdn.digitalbutlers.me';
export const PATHNAME = 'projects';
export const CDN_REMOTE_ROOT = `https://${HOSTNAME}/${PATHNAME}/${NAME}`;

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
};

