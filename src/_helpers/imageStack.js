/**
 * {{imageStack}} Handlebars helper. Spits out our responsive image size stack. Relies on
 * there being images with the *.<width>w.* file naming convention.
 *
 * @param {string} base - a partial web path to the file, ex: "assets/test"
 * @param {string} ext - the file extension, including the period, ex: ".jpg"
 */
module.exports.register = function(Handlebars, options) {
    Handlebars.registerHelper("imageStack", function(base, ext, options) {
        return base + ".640w" + ext + " 640w, " +
            base + ".750w" + ext + " 750w, " +
            base + ".1080w" + ext + " 1080w, " +
            base + ".1440w" + ext + " 1440w, " +
            base + ".1920w" + ext + " 1920w, " +
            base + ".2560w" + ext + " 2560w";
    });
};
