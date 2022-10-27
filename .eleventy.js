const CleanCSS = require("clean-css");
const markdownIt = require("markdown-it");
const slugify = require("@sindresorhus/slugify");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("content/images", "images")
    eleventyConfig.addPassthroughCopy('.nojekyll');
    eleventyConfig.addPassthroughCopy('CNAME');
    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });
    eleventyConfig.addGlobalData("layout", "default.njk");

    // Handle Obsidian-style links
    const markdownLib = markdownIt({
        html: true,
        linkify: true,
    })
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-attrs'))
        .use(require('markdown-it-obsidian-images')({ relativeBaseURL: '../' }))
        .use(function (md) {
            // Recognize Mediawiki links ([[text]])
            md.linkify.add("[[", {
                validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
                normalize: match => {
                    const parts = match.raw.slice(2, -2).split("|");
                    parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                    match.text = (parts[1] || parts[0]).trim();
                    match.url = `/${slugify(parts[0].trim())}/`;
                }
            })
        })
    eleventyConfig.setLibrary("md", markdownLib);
    eleventyConfig.addFilter("markdownify", string => {
        return markdownLib.render(string)
    })

    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob(["content/**/*.md"]);
    });

    return {
        dir: {
            input: './content',
            data: '../_data',
            includes: '../_includes',
        }
    };
};