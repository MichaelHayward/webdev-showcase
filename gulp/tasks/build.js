var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: "docs"
		}
	});
});

gulp.task('deleteDistFolder', /*['icons'], */function() {
	return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
	var pathsToCopy = [
		'./app**/*',
		'!./app/*.html',
		'./app/*',
		'./app/CNAME',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**',
	]
	
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./docs'));
});

gulp.task('copyBlogPosts', ['deleteDistFolder'], function() {
	console.log('hello');
	var postsToCopy = [
		'./app/blogposts/*.html',
	]
	
	return gulp.src(postsToCopy)
		.pipe(gulp.dest('./docs/blogposts'));
});

gulp.task('optimizeImages', ['deleteDistFolder',], function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
	gulp.start('usemin');
	gulp.start('useminBlogposts');
});


gulp.task('usemin', ['styles', 'scripts'], function() {
	return gulp.src('./app/*.html')
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest('./docs'));
});

gulp.task('useminBlogposts', ['styles', 'scripts'], function() {
	return gulp.src('./app/blogposts/*.html')
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()}, function() {return uglify()}]
		}))
		.pipe(gulp.dest('./docs/blogposts'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'copyBlogPosts', 'optimizeImages', 'useminTrigger']);