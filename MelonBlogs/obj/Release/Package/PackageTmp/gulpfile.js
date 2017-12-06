"use strict";
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    webpack = require('webpack')

//var paths = {
//    webroot: "./wwwroot/"
//};
 
var webpackConfig = {
    config: require("./Scripts/webpack.config.js")
};

//paths.node_modules_libs = [
//    'node_modules/jquery/dist/jquery.js',
//    'node_modules/react/react.js',
//    'node_modules/react-dom/dist/react-dom.js',
//    'node_modules/webpack/bin/webpack.js'
//]
//paths.lib = paths.webroot + 'lib/*.js';
//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.concatJsDest = paths.webroot + "js/site.min.js";

gulp.task('build-compiler', function () {
    if (!webpackConfig.compiler)
        webpackConfig.compiler = webpack(webpackConfig.config);
});

gulp.task('build', ['build-compiler'], function (cb) {
    webpackConfig.compiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("build", err);
        cb();
    });
});

gulp.task('watch', ['build'], function () {
    gulp.watch(["Scripts/**/*"], ["build"]);
})

//gulp.task('lib', function () {     //复制npm包到web root中
//    gulp.src(paths.node_modules_libs).pipe(gulp.dest(paths.webroot + 'lib'))
//});

//gulp.task("clean:js", function (cb) {   //清理压缩后的js文件
//    rimraf(paths.concatJsDest, cb);
//});
//gulp.task("min:js", function () {  //将需要的js压缩并合并成一个文件以减少http请求数
//    gulp.src([paths.js, "!" + paths.minJs, paths.lib], { base: "." }).pipe(concat(paths.concatJsDest))
//        .pipe(uglify())
//        .pipe(gulp.dest("."));
//});