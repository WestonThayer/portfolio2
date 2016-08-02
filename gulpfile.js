"use strict";
 
var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var cached = require("gulp-cached");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");

var handlebarsRegisterPartials = require("./gulp-helpers/gulp-handlebars-register-partials");
var handlebarsRegisterHelpers = require("./gulp-helpers/gulp-handlebars-register-helpers");
var handlebarsCompile = require("./gulp-helpers/gulp-handlebars-compile");
var templatize = require("./gulp-helpers/gulp-templatize");

// Register partial hbs files so that Handlebars.js knows where to find them
gulp.task("register-partials", function() {
    return gulp.src("src/_partials/*.hbs")
        .pipe(handlebarsRegisterPartials());
});

// Register Handlebars helpers
gulp.task("register-helpers", function() {
    return gulp.src("src/_helpers/*.js")
        .pipe(handlebarsRegisterHelpers());
});

gulp.task("build-html", ["register-partials", "register-helpers"], function() {
    return gulp.src("src/**/*.html")
        .pipe(cached("build-html"))
        .pipe(handlebarsCompile())
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
});

gulp.task("build-md-normal", ["register-partials", "register-helpers"], function() {
    return gulp.src("src/**/index.md")
        .pipe(cached("build-md-normal"))
        .pipe(handlebarsCompile())
        .pipe(templatize())
        .pipe(gulp.dest("dist/"))
        .pipe(connect.reload());
});

gulp.task("build-sass", function() {
    return gulp.src("src/_styles/**/*.scss")
        .pipe(sass({
            includePaths: ["node_modules/"]
        }).on("error", sass.logError))
        .pipe(gulp.dest("dist/css/"))
        .pipe(connect.reload());
});

gulp.task("deploy-build-sass", function() {
    return gulp.src("src/_styles/**/*.scss")
        .pipe(sass({
            includePaths: ["node_modules/"],
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("build-scripts", function() {
    return gulp.src("src/_scripts/*.js")
        .pipe(gulp.dest("dist/js/"))
        .pipe(connect.reload());
});

gulp.task("deploy-build-scripts", function() {
    return gulp.src("src/_scripts/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

var copyAssetSrc = "src/**/*.{jpg,png,mp4,gif}";

gulp.task("copy-assets", function() {
    return gulp.src(copyAssetSrc)
        .pipe(gulp.dest("dist/"));
});

gulp.task("deploy-copy-assets", function() {
    return gulp.src(copyAssetSrc)
        .pipe(imagemin())
        .pipe(gulp.dest("dist/"));
});

// Build, then start a server
gulp.task("serve", [
    "build-html",
    "build-md-normal",
    "build-sass",
    "build-scripts",
    "copy-assets"
], function() {
    connect.server({
        root: "dist",
        livereload: true
    });
});

// Build, start a server, and watch for changes
gulp.task("watch", ["serve"], function(cb) {
    gulp.watch("src/**/*.html", ["build-html"]);
    gulp.watch(["src/_styles/**/*.scss"], ["build-sass"]);
    gulp.watch("src/_scripts/*.js", ["build-scripts"]);
    gulp.watch("src/**/index.md", ["build-md-normal"]);
    
    gulp.watch(["src/_templates/*.hbs", "src/_partials/*.hbs"], ["build-html", "build-md-normal"])
        .on("change", function(event) {
            // Clear the gulp-cached cache if a Handlebars template changes,
            // we have to rebuild everything
            cached.caches = {};
        });
});

gulp.task("deploy", [
    "build-html",
    "build-md-normal",
    "deploy-build-sass",
    "deploy-build-scripts",
    "deploy-copy-assets"
], function() {
    return gulp.src("src/.htaccess")
        .pipe(gulp.dest("dist/"));
});
