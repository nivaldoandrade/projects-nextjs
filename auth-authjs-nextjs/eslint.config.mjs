import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
	{
		rules: {
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'space-before-function-paren': ['error', {
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			}],
			'arrow-spacing': ['error', { before: true, after: true }],
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'eol-last': ['error', 'always'],
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],
			'no-duplicate-imports': 'error',
			'no-console': 'warn',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'interface',
					format: ['PascalCase'],
					custom: {
						regex: '^I[A-Z]',
						match: true,
					},
				},
			],
		},
	},
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
]);

export default eslintConfig;
