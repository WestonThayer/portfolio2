var gulpUtil = require("gulp-util");
var through = require("through2");
var handlebars = require("handlebars");

const PLUGIN_NAME = 'gulp-handlebars-to-html';

/**
 * Gulp plugin that compiles the Handlebars expressions out of a file.
 */
function gulpHandlebarsToHtml() {
    return through.obj(function(file, enc, callback) {
        if (file.isNull()) {
            this.push(null);
            callback();
            return;
        }

        if (file.isStream()) {
            this.emit("error", new gulpUtil.PluginError(PLUGIN_NAME, "Streams are not supported!"));
            callback();
            return;
        }

        if (file.isBuffer()) {
            var contents = file.contents.toString("utf-8");
            var compiled = handlebars.compile(contents);
            var result = compiled();

            file.contents = new Buffer(result);
        }

        this.push(file);
        callback();
    });
}

module.exports = gulpHandlebarsToHtml;
