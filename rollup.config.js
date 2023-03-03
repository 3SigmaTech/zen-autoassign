import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'index.js',
    output: {
        file: 'build/3st-autoassign.js',
        format: 'umd',
        name: 'autoassign',
    },
    plugins: [
        resolve({
            jsnext: true,
            //only: ['fmin'],
            main: true
        }),
        commonjs()
    ]
};