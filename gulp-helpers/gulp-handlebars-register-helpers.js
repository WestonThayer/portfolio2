var gulpUtil = require("gulp-util");
var through = require("through2");
var handlebars = require("handlebars");

const PLUGIN_NAME = 'gulp-handlebars-register-helpers';

// Helpers must be a *.js file and export a 'register' function that takes a
// Handlebars instance
function gulpHandlebarsRegisterHelpers() {
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
            var h = require(file.path);
            h.register(handlebars);
        }
        
        this.push(file);
        callback();
    });
}

module.exports = gulpHandlebarsRegisterHelpers;