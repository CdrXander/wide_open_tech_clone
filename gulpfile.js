var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');
    //babel-preset-es2015

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('build-css', function() {
	gulp.src('./scss/*')
	    .pipe(sourcemaps.init())			//Remember original state
        .pipe(print())
        .pipe(sass())						//Pass to SASS
        .pipe(cachebust.resources())		//Clear the cache
        .pipe(concat('main.css'))			//Concat all output of those files into styles.css
        .pipe(sourcemaps.write('./'))	//Write out original files. THIS IS FOR DEBUGGING
        .pipe(gulp.dest('./css'));			//Write everything out into a folder called dist
})

gulp.task('clean', function(cb) {
	del([
		'css'
		], cb);
})

gulp.task('build', ['build-css'], function() {
	return gulp.src('index.html')
		.pipe(cachebust.references())
		.pipe(gulp.dest('css'));
})

gulp.task('watch', function() {
    return gulp.watch([
        './index.html',
        './scss/*.*css', 
        ], ['build']);
});