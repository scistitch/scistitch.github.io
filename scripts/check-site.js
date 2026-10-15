import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";

const output = "_site";
const navigation = JSON.parse(readFileSync("src/_data/navigation.json", "utf8"));
const site = JSON.parse(readFileSync("src/_data/site.json", "utf8"));
const routes = ["/", ...navigation.map((item) => item.url), "/contact/", "/images/logo/"];
const pages = new Map();
function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes || []) walk(child, visit);
}
function files(directory, prefix = "") {
  return readdirSync(directory).flatMap((name) => {
    const relative = join(prefix, name);
    return statSync(join(directory, name)).isDirectory()
      ? files(join(directory, name), relative)
      : [relative];
  });
}

for (const route of routes) {
  const filename = `${route.slice(1)}index.html`;
  const errors = [];
  const document = parse(readFileSync(join(output, filename), "utf8"), {
    onParseError: (error) => errors.push(error.code),
  });
  assert.deepEqual(errors, [], `${route}: HTML parse errors`);
  const elements = [];
  walk(document, (node) => {
    if (node.tagName) elements.push({ tag: node.tagName, attrs: Object.fromEntries(node.attrs.map((a) => [a.name, a.value])), node });
  });
  const ids = elements.filter((e) => e.attrs.id).map((e) => e.attrs.id);
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate IDs`);
  assert.equal(elements.filter((e) => e.tag === "h1").length, 1, `${route}: expected one h1`);
  assert(elements.some((e) => e.tag === "main" && e.attrs.id === "main"));
  assert(elements.some((e) => e.tag === "a" && e.attrs.href === "#main"));
  assert.equal(elements.find((e) => e.tag === "link" && e.attrs.rel === "canonical")?.attrs.href, site.url + route);
  assert.equal(elements.find((e) => e.tag === "meta" && e.attrs.property === "og:url")?.attrs.content, site.url + route);
  assert(elements.find((e) => e.tag === "meta" && e.attrs.name === "description")?.attrs.content);
  const meta = (attribute, value) => elements.find((e) =>
    e.tag === "meta" && e.attrs[attribute] === value)?.attrs.content;
  assert.equal(meta("property", "og:site_name"), "SciStitch", `${route}: Open Graph site name`);
  assert.equal(meta("property", "og:image"), site.url + site.socialImage, `${route}: Open Graph image`);
  assert.equal(meta("property", "og:image:secure_url"), site.url + site.socialImage, `${route}: secure image URL`);
  assert.equal(meta("property", "og:image:type"), "image/png", `${route}: Open Graph image type`);
  assert.equal(meta("property", "og:image:width"), "1200", `${route}: Open Graph image width`);
  assert.equal(meta("property", "og:image:height"), "630", `${route}: Open Graph image height`);
  assert(meta("property", "og:image:alt"), `${route}: Open Graph alternative text`);
  assert.equal(meta("name", "twitter:card"), "summary_large_image", `${route}: social card type`);
  assert.equal(meta("name", "twitter:title"), meta("property", "og:title"), `${route}: social card title`);
  assert.equal(meta("name", "twitter:description"), meta("property", "og:description"), `${route}: social card description`);
  assert.equal(meta("name", "twitter:image"), site.url + site.socialImage, `${route}: social card image`);
  assert(meta("name", "twitter:image:alt"), `${route}: social card alternative text`);
  for (const nav of elements.filter((e) => e.tag === "nav")) {
    const links = [];
    walk(nav.node, (node) => {
      if (node.tagName === "a") links.push(Object.fromEntries(node.attrs.map((a) => [a.name, a.value])));
    });
    const expectedInternalLinks = [
      ...navigation.map((n) => n.url),
      ...(nav.attrs["aria-label"] === "Mobile navigation" ? ["/contact/"] : []),
    ];
    assert.deepEqual(links.filter((a) => a.href.startsWith("/")).map((a) => a.href), expectedInternalLinks, `${route}: navigation routes`);
    assert.deepEqual(links.filter((a) => a["aria-current"] === "page").map((a) => a.href), navigation.some((item) => item.url === route) ? [route] : [], `${route}: active navigation`);
  }
  assert(!readFileSync(join(output, filename), "utf8").match(/\{%|\{\{/), `${route}: unrendered template`);
  pages.set(route, { filename, ids, elements });
}

for (const [route, page] of pages) {
  for (const { attrs } of page.elements) {
    for (const key of ["aria-controls", "aria-labelledby"]) {
      for (const id of (attrs[key] || "").split(/\s+/).filter(Boolean)) assert(page.ids.includes(id), `${route}: missing ${id}`);
    }
    for (const key of ["href", "src"]) {
      const value = attrs[key];
      if (!value) continue;
      const url = new URL(value, site.url + route);
      if (url.origin !== site.url) continue;
      const path = decodeURIComponent(url.pathname);
      const target = path.endsWith("/") ? path.slice(1) + "index.html" : path.slice(1);
      assert(existsSync(join(output, target)), `${route}: missing ${value}`);
      if (url.hash) assert(pages.get(path)?.ids.includes(decodeURIComponent(url.hash.slice(1))), `${route}: missing fragment ${value}`);
    }
  }
}
const expectedFiles = [
  ...[...pages.values()].map((p) => p.filename),
  ...files("assets", "assets"),
  ...files("images", "images"),
  "styles.css", "script.js", "CNAME", ".nojekyll", "LICENSE",
  "robots.txt", "sitemap.xml",
];
assert.deepEqual(files(output).sort(), expectedFiles.sort(), "Output must contain only public pages and assets");
// Generated crawler files have no matching source file at the repository root.
const generatedFiles = new Set(["robots.txt", "sitemap.xml"]);
for (const path of expectedFiles.filter((f) => !f.endsWith(".html") && !generatedFiles.has(f))) {
  assert(readFileSync(join(output, path)).equals(readFileSync(path)), `${path}: passthrough file changed`);
}
const homepageHrefs = pages.get("/").elements.filter((element) => element.tag === "a").map((element) => element.attrs.href);
const aboutHrefs = pages.get("/about/").elements.filter((element) => element.tag === "a").map((element) => element.attrs.href);
assert(homepageHrefs.includes("/projects/"), "homepage missing experience link");
assert(aboutHrefs.includes("/projects/"), "about page missing experience link");
assert(pages.get("/about/").ids.includes("our-story"), "about page missing story anchor");
for (const project of ["osl-projects", "infodengue", "literev"]) {
  assert(pages.get("/projects/").ids.includes(project), `missing ${project} experience section`);
  assert(!homepageHrefs.includes(`/projects/#${project}`), `homepage repeats ${project} portfolio content`);
  assert(!aboutHrefs.includes(`/projects/#${project}`), `about page repeats ${project} portfolio navigation`);
}
assert(homepageHrefs.includes("/contact/"), "homepage missing inquiry CTA");
const inquiryHrefs = pages.get("/contact/").elements.filter((element) => element.tag === "a").map((element) => element.attrs.href);
assert(inquiryHrefs.some((href) => href.startsWith("mailto:connect@scistitch.com?subject=")), "contact page missing email action");
// Check that the existing brand banner is an actual 1200 × 630 PNG.
const socialImage = readFileSync(join(output, site.socialImage.slice(1)));
assert.equal(socialImage.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "social image PNG signature");
assert.equal(socialImage.readUInt32BE(16), 1200, "social image width");
assert.equal(socialImage.readUInt32BE(20), 630, "social image height");
const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locs, routes.map((route) => site.url + route), "sitemap canonical page URLs");
assert.equal(new Set(locs).size, locs.length, "sitemap has no duplicate URLs");
assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), "sitemap XML namespace");
const robots = readFileSync(join(output, "robots.txt"), "utf8");
assert(robots.includes("User-agent: *"), "robots crawler declaration");
assert(robots.includes("Allow: /"), "robots crawl permission");
assert(robots.includes("Sitemap: " + site.url + "/sitemap.xml"), "robots sitemap discovery");
assert.equal(readFileSync(join(output, "CNAME"), "utf8").trim(), "scistitch.com");
console.log(`Checked ${pages.size} pages: HTML, SEO/social metadata, sitemap, robots, navigation, links, and public output.`);
