# portfolio2

Simple home for http://westonthayer.com.

## Building

1. Install [node.js](https://nodejs.org/en/), v4.4.5 LTS or close to it
2. Install Git and [git-lfs](https://git-lfs.github.com/)
3. `npm install`

## Running

`npm run watch`. Doesn't watch for changes to assets, so you need to restart the server if you're changing those.

`npm run serve`. Doesn't watch, just builds and starts a server.

## Deploying

`npm run deploy`. Doesn't actually deploy, just puts files in `dist/` that are minified, autoprefixed, etc. Copy those to the server.

## Creating image assets

Most photos will probably be responsive images. If that's the case, these are the widths to export.

640, 750, 1080, 1440, 1920, 2560

important phone widths: 640 (2x), 750 (2x), 1080 (3x), 1440 (3x)
important desktop widths: 1366 (1x), 1920, 2304 (2x), 2560 (2x), 2880, 4096, 5120

That will get us crisp images on the most important devices.

### Post feature images

Use the above widths on a 1680x448 artboard.

### Post content images

Go for a 670 wide artboard, then export at 1340w and 670w.

## Typography

We use font metrics to precisely position type. Getting accurate font metrics is key. The best way to do that is to inspect the font metrics using the [app](https://github.com/WestonThayer/FontMetricsUwp). You can pull a font from Typekit by following [these instructions](http://aenism.com/font-files-off-typekit/). Note that sync'd fonts on Typekit often have different metrics than the web fonts.
