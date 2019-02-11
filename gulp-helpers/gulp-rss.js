var gulpUtil = require("gulp-util");
var through = require("through2");
var feed = require("feed");
var path = require("path");

const PLUGIN_NAME = 'gulp-rss';

/**
 * Gulp plugin generates RSS feeds, expends to be called after gulp-templatize
 */
function gulpRss() {
    var author = {
        name: "Weston Thayer",
        email: "me@westonthayer.com",
        link: "http://westonthayer.com",
    };

    var rssFeed = new feed.Feed({
        title: "Weston Thayer’s Blog",
        description: "Writing a few times a year about design, development, and everything in between",
        id: "http://westonthayer.com/writing/",
        link: "http://westonthayer.com/writing/",
        image: "http://westonthayer.com/assets/default-meta-img.jpg",
        favicon: "http://westonthayer.com/assets/favicon-48.png",
        copyright: "All rights reserved, 2019, Weston Thayer",
        updated: new Date(),
        feedLinks: {
            atom: "http://westonthayer.com/writing/rss.xml",
        },
        author: author,
    });

    var latestFile;

    return through.obj(function(file, enc, callback) {
        // Called for each file
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
            var front = file.frontmatter;

            rssFeed.addItem({
                title: front.title,
                id: front.url,
                link: front.url,
                description: front.description,
                content: contents,
                author: author,
                date: new Date(front.asideList1[0] + "Z"), // Always work in UTC in case we compile this set outside PST
                image: front.metaImage && front.url + front.metaImage,
            });

            latestFile = file;
        }

        this.push(file);
        callback();
    }, function(callback) {
        // Called at stream end
        if (!latestFile) {
            callback();
            return;
        }

        // Kind of a hack to create a file, just copy info from the latest
        // processed file. We'll move it somewhere else with gulp.dest
        var file = latestFile.clone({ contents: false });
        file.path = path.join(latestFile.base, "rss.xml");

        // Make sure posts are in chronological order
        rssFeed.items.sort((a, b) => b.date - a.date);

        file.contents = new Buffer(rssFeed.rss2());

        this.push(file);
        callback();
    });
}

module.exports = gulpRss;