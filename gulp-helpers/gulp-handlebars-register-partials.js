var path = require("path");

var gulpUtil = require("gulp-util");
var through = require("through2");
var handlebars = require("handlebars");

const PLUGIN_NAME = 'gulp-handlebars-register-partials';

// Expects partial files to end with .hbs
function gulpHandlebarsRegisterPartials() {
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
            handlebars.registerPartial(path.basename(file.path, ".hbs"), file.contents.toString("utf-8"));
        }
        
        this.push(file);
        callback();
    });
}

module.exports = gulpHandlebarsRegisterPartials;