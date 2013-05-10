var profile = (function () {
	return {
		releaseDir: '../lib',
		basePath: 'src',
		action: 'release',
		mini: true,
		selectorEngine: 'lite',
		layerOptimize: 'closure',
		cssOptimize: 'comments',

		packages: [
			{ name: 'dojo', location: 'dojo' },
			{ name: 'app', location: 'app' }
		],

		defaultConfig: {
			hasCache: {
				'dojo-built': 1,
				'dojo-loader': 1,
				'dom': 1,
				'host-browser': 1,
				'config-selectorEngine': 'lite'
			},
			locale: 'en-us',
			async: 1
		},

		staticHasFeatures: {
			'config-dojo-loader-catches': 0,
			'config-tlmSiblingOfDojo': 0,
			'dojo-log-api': 0,
			'dojo-sync-loader': 0,
			'dojo-timeout-api': 0,
			'dojo-sniff': 0,
			'dojo-cdn': 0,
			'config-strip-strict': 0,
			'dojo-loader-eval-hint-url': 1,
			'dojo-firebug': 0,
			'native-xhr': 1,
			'dojo-debug-message': 0,
			'quirks': 0,
			'dijit-legacy-requires': 0,
			'opera': 0
		},

		layers: {
			'dojo/dojo': {
				include: [ 'app/main' ],
				customBase: true,
				boot: true
			}
		}
	};
})();