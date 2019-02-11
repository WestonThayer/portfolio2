var path = require("path");

/**
 * Generate the production URL for the current page being compiled. Relies on our strategy
 * of nesting dir/index.html (where 'dir' would be the path).
 * 
 * @param {string} filePath - the full location of the file
 * @param {string} cwd
 * @returns {string} - A URL for the current page
 */
function getUrlFromFilePath(filePath, cwd) {
    var relativeFilePath = path.relative(cwd + "/src", filePath);
    var relativeUrlPath = path.dirname(relativeFilePath);

    if (relativeUrlPath === ".") {
        // This would be /index.html
        relativeUrlPath = "";
    }
    else {
        relativeUrlPath += "/"; // add trailing slash
    }

    return "http://westonthayer.com/" + relativeUrlPath;
}

module.exports = getUrlFromFilePath;