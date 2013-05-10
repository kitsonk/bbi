
var loadModule = 'bbi/server';

dojoConfig = {
	baseUrl: 'src',
	async: true,
	packages: [
		{ name: 'dojo', location: 'dojo' },
		{ name: 'bbi', location: 'bbi' }
	],
	deps: [ loadModule ]
};

require('./src/dojo/dojo.js');