var gulpUtil = require("gulp-util");
var through = require("through2");
var handlebars = require("handlebars");
var getUrlFromFilePath = require("./get-url-from-file-path");

const PLUGIN_NAME = 'gulp-handlebars-compile';

/**
 * Gulp plugin that compiles the Handlebars expressions out of a file.
 */
function gulpHandlebarsCompile() {
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

            var context = {
                url: getUrlFromFilePath(file.path, file.cwd),
            };
            
            try {
                var result = compiled(context);
                file.contents = new Buffer(result);
            }
            catch (ex) {
                this.emit("error", new gulpUtil.PluginError(PLUGIN_NAME, "Handlebars exception in " + file.path));
                callback();
                return;
            }
        }

        this.push(file);
        callback();
    });
}

module.exports = gulpHandlebarsCompile;
