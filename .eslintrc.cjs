module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['airbnb-base', 'plugin:unicorn/recommended', 'prettier'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	ignorePatterns: ['dist/**/*.*'],
	rules: {
		'prettier/prettier': [1],
		'import/extensions': [2, 'always', { ignorePackages: true }],
		// TODO (import/no-unresolved): Use https://github.com/johvin/eslint-import-resolver-alias for handling inline imports
		'import/no-unresolved': [2, { ignore: ['\\.?inline$'] }],
		'import/prefer-default-export': 0,
		'unicorn/no-for-loop': 0,
		'unicorn/no-array-for-each': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
