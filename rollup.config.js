import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

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
        terser()
    ]
};


export default config;