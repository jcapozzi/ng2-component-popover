'use strict';

var gulp			= require( 'gulp' ),
	rollup 			= require( 'rollup-stream' ),
	source			= require( 'vinyl-source-stream' ),
	ts				= require( 'gulp-typescript' ),
	debug			= require( 'gulp-debug' ),
	sourcemaps		= require( 'gulp-sourcemaps' ),
	merge 			= require( 'merge2' ),
	del		 		= require( 'del' );

var tsProject = ts.createProject( 'tsconfig.json' );

gulp.task( 'rollup', [ 'typescript:compile' ], function() {
	return rollup( 'rollup.config.js' )
		.pipe( source( 'ng2-component-popover.umd.js' ) )
		.pipe( gulp.dest( './dist/bundles' ) );
});

gulp.task( 'clean:dist', function() {
	del( [ 'dist' ] );
});

gulp.task( 'typescript:compile', [ 'clean:dist' ], function( done ) {
	var tsResult = gulp.src( [ './index.ts', './src/**/*.ts' ], { base: './' } )
		.pipe( debug( { title: "typescript in" } ) )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	return merge([
		tsResult.js
			.pipe( sourcemaps.write( './', {
				includeContent: true,
				sourceRoot: './'
			}))
			.pipe( debug( { title: "typescript out" } ) )
			.pipe( gulp.dest( 'dist' ) ),
		tsResult.dts
			.pipe( debug( { title: "typescript declaration out" } ) )
			.pipe( gulp.dest( 'dist' ) )
	]);
});

gulp.task( 'demo:build', [ 'rollup' ], function() {
	// manually install package
	gulp.src( 'dist/**/*' )
		.pipe( gulp.dest( 'demo/node_modules/ng2-component-popover' ) );
});

gulp.task( 'watch:src', function() {
	gulp.watch( [ './index.ts', './src/**/*.ts' ], [ 'demo:build' ] );
});

function osPath( path ) {
	return /^win/.test( os.platform() ) ? path+'.cmd' : path;
}