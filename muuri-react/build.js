const esbuild = require('esbuild');
const pkg = require('./package.json');

const banner = `/**
* Muuri-react v${pkg.version}
* ${pkg.homepage}
* Copyright (c) 2020-present, Paol-imi
* Released under the MIT license
* https://github.com/Paol-imi/muuri-react/blob/master/LICENSE
* @license MIT
*/`;

async function build() {
  // Build ESM
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/muuri-react.esm.js',
    bundle: true,
    sourcemap: true,
    platform: 'neutral',
    format: 'esm',
    target: ['es2015'],
    external: ['react', 'muuri'],
    banner: { js: banner },
  });

  // Build CJS
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/muuri-react.cjs.js',
    bundle: true,
    sourcemap: true,
    platform: 'neutral',
    format: 'cjs',
    target: ['es2015'],
    external: ['react', 'muuri'],
    banner: { js: banner },
  });

  // Build UMD
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/muuri-react.js',
    bundle: true,
    sourcemap: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'MuuriReact',
    target: ['es2015'],
    external: ['react', 'muuri'],
    banner: { js: banner },
  });

  // Build minified UMD
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/muuri-react.min.js',
    bundle: true,
    sourcemap: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'MuuriReact',
    target: ['es2015'],
    external: ['react', 'muuri'],
    banner: { js: banner },
    minify: true,
  });
}

build().catch(() => process.exit(1));
