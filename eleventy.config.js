export default function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({ autoescape: true });
  for (const path of ["assets", "styles.css", "script.js", "CNAME", ".nojekyll", "LICENSE"]) {
    eleventyConfig.addPassthroughCopy(path);
  }
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
  };
}
