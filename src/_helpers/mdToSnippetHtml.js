var marked = require("marked");

/**
 * {{mdToSnippetHtml}} Handlebars helper. Converts Markdown strings to HTML, but
 * any links will instead just be underlined.
 *
 * @param {string} md - a Markdown string
 *
 * @returns an HTML string
 */
module.exports.register = function(Handlebars, options) {
    Handlebars.registerHelper("mdToSnippetHtml", function(md, options) {
        var renderer = new marked.Renderer();
        renderer.link = function(href, title, text) {
            return "<u>" + text + "</u>";
        };
        
        var html = marked(md, { smartypants: true, renderer: renderer });
        return new Handlebars.SafeString(html);
    });
};
