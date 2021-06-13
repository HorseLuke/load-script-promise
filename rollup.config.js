import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const env = process.env.NODE_ENV;

const output = [];

output.push({
    file: './dist/loadScriptPromise.js',
    format: 'iife',
    name: 'loadScriptPromise',
    sourcemap: false
});

output.push({
    file: './dist/loadScriptPromise.min.js',
    format: 'iife',
    name: 'loadScriptPromise',
    sourcemap: true,
    plugins: [terser()]
});


const plugins = [
    commonjs(),
    resolve(),
    babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime'
    })
];


const config = {
    input: './index.js',
    output: output,
    plugins: plugins
};


export default config;