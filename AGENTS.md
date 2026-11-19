# SciStitch website development guide

## Scope of this file

- Keep `AGENTS.md` for development guidelines: repository structure, editing conventions, accessibility, testing, and publishing.
- Put all public-facing content in page templates under `src/` or in the data files those templates render. Keep copy, project descriptions, biographies, release dates, program details, and source links with the pages they support.
- Update this guide only when development guidelines change. Routine website content edits do not require changes here.

## Site structure

- Use the existing Eleventy and Nunjucks build. Edit page content in `src/*.njk`, shared markup in `src/_includes/`, and reusable content and configuration in `src/_data/`.
- Keep site-wide navigation in `src/_data/navigation.json` and shared metadata in `src/_data/site.json`. Keep page-specific metadata and shared contact component settings in page front matter.
- Use `src/_data/portfolio.json` and the shared project card template for portfolio entries. Keep project details on `/projects/` and link to the page from elsewhere.
- Use `src/_data/professionals.json` and the shared profile template for approved Network listings. Change active membership status only with consent and confirmed involvement.
- Keep styles and lightweight scripting in `styles.css` and `script.js`. Keep assets local and retain their licenses and attribution.
- Preserve public routes, fragment targets, root-relative assets, and unique page metadata. Keep canonical URLs and the sitemap in sync, and reuse the existing social banner.
- Leave template escaping enabled. Use `safe` only for trusted HTML authored in the repository.

## Editing conventions

- Write for the visitor’s decision or next action. On Projects, connect a recognizable problem to concrete work and an example readers can inspect. Cut introductory lines that repeat the heading or cards.
- Verify factual claims against reliable sources. Distinguish completed work, contributions, and release targets. Avoid unsupported claims about ownership, readiness, outcomes, or commitments.
- Keep personal attribution where it helps explain the work or credit contributors. Use public sources and avoid exposing private details or linking private repositories.
- Use the configured contact address and functional `mailto:` links. Add a form only if it has a working submission path.

## Design and accessibility

- Reuse the existing visual system, CSS variables, and shared components. Prefer native HTML and CSS over adding a framework or dependencies.
- Keep content, navigation, and contact links usable without JavaScript. Use scripts for progressive enhancement.
- Preserve the skip link, semantic landmarks, one `h1`, logical heading order, visible keyboard focus, and `aria-current="page"` on active navigation links.
- Ensure mobile navigation exposes its expanded state, closes on Escape and link selection, and resets at desktop widths. Keep hidden controls out of the tab order.
- Support narrow screens, reduced motion, and forced colors. Give informative images descriptive alternative text and hide decorative graphics from assistive technology.

## Verification

Use Node.js 24 or newer. From the repository root:

```sh
npm ci
npm test
npm run dev
```

`npm test` builds the site and checks generated HTML, metadata, navigation, links, fragments, and the public output. When browser testing is available, preview affected pages at desktop and mobile widths, including 320px, and check keyboard and no-JavaScript behavior.

Before committing:

```sh
git diff --check
git check-ignore PLAN.md _site/index.html node_modules/
git ls-files PLAN.md _site node_modules
```

The final command should produce no output. Keep generated files, dependencies, and local planning files out of source branches.

## Git and publishing

- Create PR branches in `xmnlab/scistitch.github.io` from `main` in `scistitch/scistitch.github.io`. Open PRs against upstream `main`.
- Keep PR validation read-only. Publish only from upstream `main` via `.github/workflows/site.yml`, which builds `_site/`, mirrors its contents to `gh-pages`, and deploys the generated artifact through GitHub Pages Actions.
- Keep GitHub Pages configured to use GitHub Actions. Preserve `CNAME`, `.nojekyll`, the domain configuration, licenses, and the dependency lockfile.
