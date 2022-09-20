const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("content/images", "images")
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addGlobalData("layout", "default.njk");
  return {
    dir: {
        input: './content',
        data: '../_data',
        includes: '../_includes',
    }
  };
};