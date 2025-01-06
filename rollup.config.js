import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'BarcodeParser',
			file: 'dist/barcode-parser.umd.js',
			format: 'umd'
		},
		plugins: [
			resolve(), 
			commonjs(),
            terser() 
		]
	},

	{
		input: 'src/main.js',
		output: { 
			file: 'dist/barcode-parser.esm.js', 
			format: 'es' 
		},
		plugins: [
			resolve(),
			commonjs(),
            terser()
		]
	},

	{
		input: 'src/main.js',
		output: [
			{ file: 'dist/barcode-parser.cjs', format: 'cjs' },
			{ file: 'dist/barcode-parser.mjs', format: 'es' }
		]
	}
];
