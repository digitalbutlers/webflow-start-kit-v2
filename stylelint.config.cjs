module.exports = {
	extends: [
		'stylelint-config-recommended-scss',
		'stylelint-config-idiomatic-order',
	],
	plugins: [
		'stylelint-scss',
		'stylelint-color-format',
		'stylelint-high-performance-animation',
		'stylelint-declaration-block-no-ignored-properties',
		'stylelint-use-logical-spec',
	],
	rules: {
		'string-quotes': 'double',
		indentation: 'tab',
		'selector-class-pattern': false,
		'scss/at-function-pattern': false,
		'max-nesting-depth': [3, {
			ignore: ['pseudo-classes'],
		}],
		'value-no-vendor-prefix': [true, {
			ignoreValues: ['box'],
		}],
		'order/properties-alphabetical-order': false,
		'scss/at-import-partial-extension': false,
		'scss/at-import-partial-extension-blacklist': false,
		'color-format/format': {
			format: 'hsl',
		},
		'plugin/no-low-performance-animation-properties': [true, { ignore: 'paint-properties' }],
		'plugin/declaration-block-no-ignored-properties': true,
		'liberty/use-logical-spec': true,
	},
};
