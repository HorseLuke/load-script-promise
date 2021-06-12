import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const env = process.env.NODE_ENV;

const output = {
    file: './dist/loadScriptPromise.js',
    format: 'umd',
    name: 'loadScriptPromise',
    sourcemap: false
};

if(env == "production"){
    output.file = "./dist/loadScriptPromise.min.js";
    output.sourcemap = true;
}

const plugins = [
    babel({
        exclude: 'node_modules/**',
        "runtimeHelpers": true,
    })
];

if(env == "production"){
    plugins.push(terser());
}

plugins.push(resolve());
plugins.push(commonjs());




const config = {
    input: './index.js',
    output: output,
    plugins: plugins
};


export default config;