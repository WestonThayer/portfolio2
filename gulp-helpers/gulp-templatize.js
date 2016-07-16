var gulpUtil = require("gulp-util");
var through = require("through2");
var handlebars = require("handlebars");
var frontmatter = require("front-matter");
var marked = require("marked");
var fs = require("fs");

const PLUGIN_NAME = 'gulp-templatize';

/**
 * Given a Markdown file with YAML frontmatter,
 * - parse the frontmatter
 * - compile the Markdown
 * - find the Handlebars template file supplied by the frontmatter
 * - compile the Handlebars template with the frontmatter as context
 */
function gulpTemplatize() {
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
            var parsed = frontmatter(contents);
            var context = parsed.attributes;
            
            if (context.body) {
                this.emit("error", new gulpUtil.PluginError(PLUGIN_NAME, "You can't set 'body' in the frontmatter, it is reserved!"));
                callback();
                return;
            }
            
            context.body = marked(parsed.body, { smartypants: true });
            
            if (!context.template) {
                this.emit("error", new gulpUtil.PluginError(PLUGIN_NAME, "No template specified for " + file.path));
                callback();
                return;
            }
            
            var template = fs.readFileSync("src/_templates/" + context.template).toString("utf-8");
            var compiledTemplate = handlebars.compile(template);
            
            try {
                var result = compiledTemplate(context);
                file.contents = new Buffer(result);
                file.path = gulpUtil.replaceExtension(file.path, ".html");
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

module.exports = gulpTemplatize;
