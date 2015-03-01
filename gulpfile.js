var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    camelize: true
});
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('jshint', function () {
	return gulp.src("src/**/*.js")
		.pipe($.jshint().on('error', $.util.log))
		.pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('move', function() {
	return gulp.src("src/**/*.js")
		.pipe(gulp.dest('dist'));
})

gulp.task('minify', function() {
	return gulp.src("dist/angular-click-to-confirm.js")
		.pipe($.uglify())
		.pipe($.rename('angular-click-to-confirm.min.js'))
		.pipe(gulp.dest('dist'))
});

gulp.task('serve', function() {
	browserSync({
	  notify: false,
	  server: {
	  	baseDir: ["app","./"],
	  }
	});

	gulp.watch(['app/**/*.html'], reload);
	gulp.watch(['src/**/*.js'], ['jshint','move',reload]);
});

gulp.task('build', function() {
 	runSequence('jshint','move','minify');
});

gulp.task('default', [
	'jshint',
	'move',
	'minify',
	'serve'
]);