let gulp = require('gulp'),
	scss = require('gulp-sass'),
	concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');
		

gulp.task('scss', function(){
	return gulp.src('app/scss/**/*.scss')
        .pipe(scss({outputStyle: 'expanded'}))
        .pipe(autoprefixer({
			overrideBrowserslist: ['last 10 versions'],
		}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
	return gulp.src('app/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({'suffix' : '.min'}))
		.pipe(gulp.dest('app/css'))
});

// gulp.task('script', function(){
// 	return gulp.src(['',
// 					''])
// 				.pipe(concat('libs.min.js'))
// 				.pipe(uglifyjs())
// 				.pipe(gulp.dest('app/js'))
// });

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('html', function(){
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
	return gulp.src(['app/js/main.js', 'app/js/libs.min.js'])
	.pipe(browserSync.reload({stream: true}))
}); 

gulp.task('build', function(){

	let buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

	let buildCss = gulp.src(['app/css/style.css', 'app/css/libs.min.css'])
		.pipe(gulp.dest('dist/css'))

	let buildJs = gulp.src(['app/js/main.js', 'app/js/libs.min.js'])
	.pipe(gulp.dest('dist/js'))

	let buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch(['app/js/main.js', 'app/js/libs.min.js'], gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('css', 'scss', 'browser-sync', 'watch'));