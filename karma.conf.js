module.exports = function(config) {
	config.set({
		 basePath: '.',

		frameworks: ['jasmine'],

		files: [
			// Polyfills.
			'node_modules/core-js/client/core.js',

			'node_modules/reflect-metadata/Reflect.js',

			// System.js for module loading
			'node_modules/systemjs/dist/system-polyfills.js',
			'node_modules/systemjs/dist/system.src.js',

			// Zone.js dependencies
			'node_modules/zone.js/dist/zone.js',
			'node_modules/zone.js/dist/proxy.js',
			'node_modules/zone.js/dist/sync-test.js',
			'node_modules/zone.js/dist/jasmine-patch.js',
			'node_modules/zone.js/dist/async-test.js',
			'node_modules/zone.js/dist/fake-async-test.js',
			'node_modules/zone.js/dist/long-stack-trace-zone.js',

			// RxJs.
			{ pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
			{ pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },


			{ pattern: 'karma-test-shim.js', included: true, watched: true },

			// paths loaded via module imports
			// Angular itself
			{ pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
			{ pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true },

			{ pattern: 'node_modules/systemjs-plugin-babel/**/*.js', included: false, watched: false },

			// Our built application code
			{ pattern: 'dist/**/*.js', included: false, watched: true },

			// paths to support debugging with source maps in dev tools
			{ pattern: 'src/**/*.ts', included: false, watched: false },
			{ pattern: 'dist/**/*.js.map', included: false, watched: false }
		],

		reporters: [ 'progress' ],

		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: [ 'Chrome' ],
		singleRun: false
	});
}