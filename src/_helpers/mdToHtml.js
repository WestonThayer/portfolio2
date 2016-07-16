var marked = require("marked");

/**
 * {{mdToHtml}} Handlebars helper. Converts Markdown strings to HTML.
 *
 * @param {string} md - a Markdown string
 *
 * @returns an HTML string
 */
module.exports.register = function(Handlebars, options) {
    Handlebars.registerHelper("mdToHtml", function(md, options) {
        var html = marked(md, { smartypants: true });
        return new Handlebars.SafeString(html);
    });
};
