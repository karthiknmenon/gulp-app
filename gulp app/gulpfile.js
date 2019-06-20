var gulp = require('gulp');
var imagemin= require('gulp-imagemin-fix');
var sass= require('gulp-sass');
// var liveServer=require('gulp-live-server');
var rseqeuence=require('run-sequence');
var fsequence=require('run-sequence');
// void refresh = require('gulp-refresh');
var browserSync = require('browser-sync').create();
// var watch= require('gulp-watch')
// to copy HTML files
gulp.task('copyHTML', function(){
    return  gulp.src("./src/html/*.html")
    .pipe(gulp.dest('dist/html/'));
});
// to optimize images
gulp.task('imageMIN',function(){
    return gulp.src("./src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'))
});
// to convert scss to css
gulp.task('scssCompiler',function(){
    return gulp.src("./src/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css/"))
});
// watch
gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss')
});
//refresh load


gulp.task('sass', function() {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});
gulp.task('serve', ['sass'], function() {
    
    browserSync.init({
            proxy: "local.dev"
    });

    gulp.watch("./sass/main.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// gulp.task('default',['serve']);
//dev
gulp.task('dev-build',function(cb){
    rseqeuence(['watch', 'scssCompiler','serve'], cb);

});
//production
gulp.task('prod', function(cb){
    fsequence(['scssCompiler', 'imageMIN', 'copyHTML'], cb);
});
