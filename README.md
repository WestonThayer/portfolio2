# portfolio2

Simple home for http://westonthayer.com.

## Building

1. Install [node.js](https://nodejs.org/en/), v4.4.5 LTS or close to it
2. Install Git and [git-lfs](https://git-lfs.github.com/)
3. `npm install`

## Creating image assets

Most photos will probably be responsive images. If that's the case, these are the widths to export.

640, 750, 1080, 1440, 1920, 2560

important phone widths: 640 (2x), 750 (2x), 1080 (3x), 1440 (3x)
important desktop widths: 1366 (1x), 1920, 2304 (2x), 2560 (2x), 2880, 4096, 5120

That will get us crisp images on the most important devices.

## Typography

We use font metrics to precisely position type. Getting accurate font metrics is key. The best way to do that is to inspect the font metrics using the [app](https://github.com/WestonThayer/FontMetricsUwp). You can pull a font from Typekit by following [these instructions](http://aenism.com/font-files-off-typekit/). Note that sync'd fonts on Typekit often have different metrics than the web fonts.
