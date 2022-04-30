// Derived from https://github.com/microsoft/vscode-anycode/blob/82850955c5893258c5c3381e3d4d116bc34086d5/anycode/esbuild.js

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const esbuild = require('esbuild')

let watch;
if (process.argv.includes('--watch')) {
	watch = {
		onRebuild(error, result) {
			if (error) {
				console.error('watch build failed:', error);
			} else {
				console.log('watch build succeeded');
			}
		}
	}
}

const clientBuildOptions = {
	bundle: true,
	external: ['vscode'],
	target: 'es2020',
	format: 'cjs',
	watch
}

const browserClient = esbuild.build({
	...clientBuildOptions,
	entryPoints: ['src/extension.ts'],
	outfile: 'dist/delores-dev-dev.extension.browser.js',
}).catch((e) => {
	console.error(e)
});

const nodeClient = esbuild.build({
	...clientBuildOptions,
	platform: 'node',
	entryPoints: ['src/extension.ts'],
	outfile: 'dist/delores-dev-dev.extension.node.js',
}).catch((e) => {
	console.error(e)
});


Promise.all([
	browserClient, nodeClient
]).then(() => {
	if (watch) {
		console.log('done building, watching for file changes')
	} else {
		console.log('done building')
	}
})
