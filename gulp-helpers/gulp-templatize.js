var gulpUtil = require("gulp-util");
var through = require("through2");
var handlebars = require("handlebars");
var frontmatter = require("front-matter");
var marked = require("marked");
var fs = require("fs");
var highlightJs = require("highlight.js");
var escapeHtml = require('escape-html');
var getUrlFromFilePath = require("./get-url-from-file-path");

const PLUGIN_NAME = 'gulp-templatize';

/**
 * Given a Markdown file with YAML frontmatter,
 * - parse the frontmatter
 * - compile the Markdown
 * - find the Handlebars template file supplied by the frontmatter
 * - compile the Handlebars template with the frontmatter as context
 * 
 * @param {string} templateFile - optional name of a template to render into (overriding template in the frontmatter)
 */
function gulpTemplatize(templateFile) {
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

            if (context.url) {
                this.emit("error", new gulpUtil.PluginError(PLUGIN_NAME, "You can't set 'url' in the frontmatter, it is reserved!"));
                callback();
                return;
            }
            
            var markedRenderer = new marked.Renderer();
            markedRenderer.code = function(code, lang) {
                var validLang = highlightJs.getLanguage(lang);
                var highlightedCode;
                
                if (!validLang || !lang) {
                    if (!validLang && lang) {
                        // Only warn if the supplied language is incorrect. Silent if no language
                        // was given
                        //gulpUtil.log("WARN: unrecognized language: " + lang + ", in " + file.path);
                    }
                    
                    // Syntax highlight command prompt snippets ourselves
                    if (lang === "cmdprompt") {
                        var cmdRegex = /(^C:\\.+\&gt;)(.+)$/gm;
                        code = escapeHtml(code);
                        
                        highlightedCode = code.replace(cmdRegex, '<span class="hljs-doctag">$1</span><span class="hljs-keyword">$2</span>');
                        
                        lang = "csharp";
                    }
                    else {
                        highlightedCode = escapeHtml(code);
                        lang = "nohighlight";
                    }
                }
                else {
                    highlightedCode = highlightJs.highlight(lang, code).value;
                }
                
                return '<pre class="hljs"><code class="lang-' + lang + '">' + highlightedCode + '</code></pre>';
            };
            
            context.body = marked(parsed.body, { smartypants: true, renderer: markedRenderer });

            context.url = getUrlFromFilePath(file.path, file.cwd);

            if (templateFile) {
                // Override
                context.template = templateFile;
            }
            
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
                file.frontmatter = context;
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
