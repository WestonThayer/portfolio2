"use strict";
 
var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var cached = require("gulp-cached");
var rename = require("gulp-rename");

var handlebarsRegisterPartials = require("./gulp-helpers/gulp-handlebars-register-partials");
var handlebarsRegisterHelpers = require("./gulp-helpers/gulp-handlebars-register-helpers");
var handlebarsCompile = require("./gulp-helpers/gulp-handlebars-compile");

// Register partial hbs files so that Handlebars.js knows where to find them
gulp.task("register-partials", function() {
    return gulp.src(["src/_templates/*.hbs", "src/_partials/*.hbs"])
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

gulp.task("build-sass", function() {
    return gulp.src("src/_styles/**/*.scss")
        .pipe(sass({
            includePaths: ["node_modules/"]
        }).on("error", sass.logError))
        .pipe(gulp.dest("dist/css/"))
        .pipe(connect.reload());
});

gulp.task("build-scripts", function() {
    return gulp.src("src/_scripts/*.js")
        .pipe(gulp.dest("dist/js/"))
        .pipe(connect.reload());
});

gulp.task("copy-assets", function() {
    return gulp.src("src/assets/**/*.{jpg,png}")
        .pipe(gulp.dest("dist/assets/"));
});

// Build, then start a server
gulp.task("serve", ["build-html", "build-sass", "build-scripts", "copy-assets"], function() {
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
    
    gulp.watch(["src/_templates/*.hbs", "src/_partials/*.hbs"], ["build-html"])
        .on("change", function(event) {
            // Clear the gulp-cached cache if a Handlebars template changes,
            // we have to rebuild everything
            cached.caches = {};
        });
});
