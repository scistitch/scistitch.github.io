# SciStitch

The SciStitch company website at [scistitch.com](https://scistitch.com/), built with Eleventy and Nunjucks and hosted on GitHub Pages.

## Local development

Use Node.js 24 or newer and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Eleventy rebuilds when templates or assets change.

```sh
npm test
```

This builds the site and checks generated HTML, page metadata, navigation, local links, fragment targets, assets, and the public output file list. JavaScript syntax is checked too. Preview all six routes at desktop and mobile widths, including 320px, with keyboard navigation and JavaScript disabled when browser tooling is available.

## Editing

- `src/index.njk`, `src/services.njk`, `src/projects.njk`, `src/partnership.njk`, `src/network.njk`, and `src/about.njk`: page-specific content and front matter.
- `src/_includes/base.njk`: document layout.
- `src/_includes/head.njk`, `header.njk`, `footer.njk`, `navigation.njk`, `wordmark.njk`, and `contact.njk`: shared page elements. Navigation is rendered from one shared macro; contact text is supplied by each page’s front matter.
- `src/_data/navigation.json`: navigation labels and routes, used by every navigation surface.
- `src/_data/site.json`: canonical site URL and shared business contact.
- `styles.css`, `script.js`, and `assets/`: source styles, progressive enhancements, local artwork, fonts, portraits, and their licenses. These are copied without changes.
- `eleventy.config.js`: template configuration and the public files to copy.
- `scripts/check-site.js`: checks the generated site.
- `AGENTS.md`: content and implementation guidance. `PLAN.md` remains ignored.

Pages keep their existing directory URLs. Front matter supplies the title, descriptions, permalink, and contact section. HTML in `contact.title` and `contact.description` is trusted repository content; it is rendered with Nunjucks’s `safe` filter to preserve line breaks. Other interpolated fields are escaped.

Professional Network members are independent collaborators, not employees. Approved profiles are maintained in `src/_data/professionals.json` and rendered with `src/_includes/professional-card.njk`. Keep biographies concise and source names, expertise, and photos from supplied or verified public profiles.

## Build and publishing

`npm run build` writes `_site/`. Generated files and `node_modules/` are ignored and must never be committed to `main` or feature branches. Static source assets remain versioned.

Pull requests run `npm ci` and `npm test` with read-only repository permissions. After a push to upstream `main` (including a merged PR), CI:

1. Builds and validates the site.
2. Pushes only `_site/` contents to `gh-pages`, removing obsolete published files.
3. Deploys that same output using GitHub’s official Pages actions.

The publish job is restricted to `scistitch/scistitch.github.io` on `main`; fork builds and pull requests cannot publish. A manual workflow run on upstream `main` can retry publishing. Builds are reproducible through `package-lock.json`.

### One-time migration setting

**Before merging this migration, set Settings → Pages → Build and deployment → Source to GitHub Actions.** The current root-of-`main` publishing configuration will no longer work because source branches contain templates instead of generated HTML.

The workflow updates `gh-pages` with `GITHUB_TOKEN` and deploys explicitly: GitHub does not trigger a branch-based Pages build from commits pushed using that token. No personal access token or deploy key is needed. Repository/organization policies must allow the publish job’s `contents: write`, `pages: write`, and `id-token: write` permissions, and any `github-pages` environment approval rules still apply.

`CNAME` (`scistitch.com`) and `.nojekyll` are copied into both published outputs. Keep the existing custom domain and HTTPS settings; DNS changes are not required.

## License

The site uses the repository's BSD 3-Clause license. Manrope is provided under the SIL Open Font License; see `assets/manrope-license.txt`.

The Open Science Labs logo is copied unchanged from [`theme/icons/osl-logo-black.svg` in their official website repository](https://github.com/OpenScienceLabs/opensciencelabs.github.io/blob/main/theme/icons/osl-logo-black.svg), where it is used in the footer. Its upstream BSD 3-Clause license is retained in `assets/osl-license.txt`. The logo identifies our partner and links to [Open Science Labs](https://opensciencelabs.org/).

Ivan Ogasawara's portrait is copied unchanged from [`docs/images/Ivan-Ogasawara.jpg` in his public website repository](https://github.com/xmnlab/xmnlab.github.io/blob/main/docs/images/Ivan-Ogasawara.jpg) and is also used on [his personal website](https://ivanogasawara.com/). The source repository's BSD 3-Clause license is retained in `assets/ivan-portrait-license.txt`.

Sandro Loch’s network biography is based on [OSL’s team page](https://opensciencelabs.org/about/team/), which identifies him as a web developer experienced in Python, Docker, Conda, and Django and an open-source contributor. His portrait is copied unchanged from [his public GitHub avatar](https://avatars.githubusercontent.com/u/3450741?v=4), also used on OSL’s team page. This source attribution does not assign the portrait the repository’s code license. The LinkedIn destination is supplied by the site owner.
