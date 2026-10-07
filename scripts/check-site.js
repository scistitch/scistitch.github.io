import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";

const output = "_site";
const navigation = JSON.parse(readFileSync("src/_data/navigation.json", "utf8"));
const site = JSON.parse(readFileSync("src/_data/site.json", "utf8"));
const routes = ["/", ...navigation.map((item) => item.url), "/images/logo/"];
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
  for (const nav of elements.filter((e) => e.tag === "nav")) {
    const links = [];
    walk(nav.node, (node) => {
      if (node.tagName === "a") links.push(Object.fromEntries(node.attrs.map((a) => [a.name, a.value])));
    });
    assert.deepEqual(links.filter((a) => a.href.startsWith("/")).map((a) => a.href), navigation.map((n) => n.url), `${route}: navigation routes`);
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
];
assert.deepEqual(files(output).sort(), expectedFiles.sort(), "Output must contain only public pages and assets");
for (const path of expectedFiles.filter((f) => !f.endsWith(".html"))) {
  assert(readFileSync(join(output, path)).equals(readFileSync(path)), `${path}: passthrough file changed`);
}
assert.equal(readFileSync(join(output, "CNAME"), "utf8").trim(), "scistitch.com");
console.log(`Checked ${pages.size} pages: HTML, metadata, navigation, references, links, and public output.`);
