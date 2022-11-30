export const NAME = 'webflow-start-kit-v2';
export const HOSTNAME = 'digitalbutlers.me';
export const PATHNAME = 'any_scripts';
export const CUSTOM_CODE_DIRECTORY = `https://${HOSTNAME}/${PATHNAME}/${NAME}`;

export const FTP = {
	HOST: 'dbutlers.beget.tech',
	PORT: 21,
	REMOTE_ROOT: `/${HOSTNAME}/public_html/${PATHNAME}/${NAME}/`,
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

