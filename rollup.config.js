import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const env = process.env.NODE_ENV


const config = {
    input: './index.js',
    output: {
        file: './dist/loadScriptPromise.js',
        format: 'umd',
        name: 'loadScriptPromise',
        sourcemap:true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            "runtimeHelpers": true,
        }),
        //terser(),
        resolve(),
        commonjs(),
    ]
};


export default config;