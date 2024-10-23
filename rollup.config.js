export default [
	{
		input: 'src/main.js',
		output: [
			{ file: 'dist/barcode-parser.cjs', format: 'cjs' },
			{ file: 'dist/barcode-parser.mjs', format: 'es' }
		]
	}
];
