import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import sucrase from '@rollup/plugin-sucrase';
import pkg from './package.json';

// Common.
const input = './src/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const banner = `/**
* Muuri-react v${pkg.version}
* ${pkg.homepage}
* Copyright (c) 2020-present, Paol-imi
* Released under the MIT license
* https://github.com/Paol-imi/muuri-react/blob/master/LICENSE
* @license MIT
*/
`;

// Babel options.
const getBabelOptions = ({useESModules}) => ({
  exclude: 'node_modules/**',
  extensions,
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', {useESModules}]],
});

const plugins = (esm) => [
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript', 'jsx'],
  }),
  babel(getBabelOptions({useESModules: esm})),
  resolve({
    extensions,
    preferBuiltins: false,
    mainFields: ['module', 'main'],
  }),
  commonjs({
    include: 'node_modules/**',
    extensions,
  }),
];

export default [
  // Universal module definition (UMD) build
  {
    input,
    output: {
      file: 'dist/muuri-react.js',
      format: 'umd',
      name: 'MuuriReact',
      globals: {react: 'React', muuri: 'Muuri'},
      banner,
      sourcemap: true,
    },
    external: ['react', 'muuri'],
    plugins: [
      ...plugins(true),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
      }),
    ],
  },

  // Minified UMD build
  {
    input,
    output: {
      file: 'dist/muuri-react.min.js',
      format: 'umd',
      name: 'MuuriReact',
      globals: {react: 'React', muuri: 'Muuri'},
      banner,
      sourcemap: true,
    },
    external: ['react', 'muuri'],
    plugins: [
      ...plugins(true),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      terser(),
    ],
  },

  // CommonJS build
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      banner,
      sourcemap: true,
      exports: 'named',
    },
    external: id => !id.startsWith('.') && !id.startsWith('/'),
    plugins: plugins(false),
  },

  // ES module build
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
      banner,
      sourcemap: true,
    },
    external: id => !id.startsWith('.') && !id.startsWith('/'),
    plugins: plugins(true),
  },
];
