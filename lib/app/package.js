var profile = (function () {
	'use strict';

	var testResourceRe = /^app\/tests\//,
		miniResourceRe = /\.styl$/,

		copyOnly = function (filename, mid) {
			var list = {
				'app/package': 1,
				'app/package.json': 1
			};
			return (mid in list) || (/^dote-client\/resources\//.test(mid) && !/\.(css|styl)$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
		};

	return {
		resourceTags: {
			test: function (filename, mid) {
				return testResourceRe.test(mid);
			},

			mini: function (filename) {
				return miniResourceRe.test(filename);
			},

			copyOnly: function (filename, mid) {
				return copyOnly(filename, mid);
			},

			amd: function (filename, mid) {
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		}
	};
})();