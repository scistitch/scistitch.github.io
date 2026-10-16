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

This builds the site and checks generated HTML, canonical and social metadata, sitemap and robots files, navigation, local links, challenge program content and contact links, network membership grouping, fragment targets, assets, and the public output file list. JavaScript syntax is checked too. Preview all content routes at desktop and mobile widths, including 320px, with keyboard navigation and JavaScript disabled when browser tooling is available.

## Editing

- `src/index.njk`, `src/services.njk`, `src/projects.njk`, `src/partnership.njk`, `src/network.njk`, and `src/about.njk`: page-specific content and front matter.
- `src/contact.njk`: project inquiry guidance and an email link with a suggested brief (no submission form or stored inquiry data).
- `src/challenges.njk`: institution-guided open challenges, network joining pathways, review timeline, open licensing, author credit, and the initial agreements policy.
- `src/_includes/base.njk`: document layout.
- `src/_includes/head.njk`, `header.njk`, `footer.njk`, `navigation.njk`, `wordmark.njk`, and `contact.njk`: shared page elements. Navigation is rendered from one shared macro; contact text is supplied by each page’s front matter.
- `src/_data/navigation.json`: navigation labels and routes, used by every navigation surface.
- `src/_data/site.json`: canonical site URL, shared business contact, and social preview image path.
- `src/sitemap.njk` and `src/robots.njk`: XML sitemap and crawler rules generated from site data and navigation.
- `images/logo/social-banner.png`: existing 1200 × 630 official sharing graphic used by Open Graph and social card metadata.
- `styles.css`, `script.js`, and `assets/`: source styles, progressive enhancements, local artwork, fonts, portraits, and their licenses. These are copied without changes.
- `eleventy.config.js`: template configuration and the public files to copy.
- `scripts/check-site.js`: checks the generated site.
- `AGENTS.md`: content and implementation guidance. `PLAN.md` remains ignored.

Pages keep their existing directory URLs. Front matter supplies the title, descriptions, permalink, and contact section. HTML in `contact.title` and `contact.description` is trusted repository content; it is rendered with Nunjucks’s `safe` filter to preserve line breaks. Other interpolated fields are escaped.

Professional Network profiles are managed in `src/_data/professionals.json`; members are independent collaborators, not employees. Explicit `"status": "active"` identifies a person currently engaged in SciStitch initiatives and features them in the Active Members section; omitted status keeps them in the wider network. Obtain a person's agreement before changing their status; only the founder is initially highlighted.

### Open Challenges editorial rules

Challenges come from institutions or groups willing to define and validate a genuine scientific or social-impact problem. The institutional contact must commit to feedback and review checkpoints. Challenges are not presumed to exist until accepted.

The proposed 12-week cycle is illustrative, not a guaranteed service level. A challenge must have an agreed **Challenge Charter** and appropriate **Contributor Participation Agreement** before organized work begins; sensitive data or unpublished research may require additional confidentiality and data-access permissions. Simple public contributions can use an open-source contribution policy instead. Confirm whether participation is voluntary or paid; never use challenges to deliver unpaid proprietary client work.

All outputs generated for a challenge should be openly released where lawful and ethically appropriate, using appropriate open licenses for data, code, models, methods, documentation and research outputs. Sensitive or third-party-restricted original data cannot be disclosed; arrange shareable derivatives, aggregation or synthetic examples and document the limitations, or do not accept the work as an open challenge. For scientific articles, use open-access publication or a legally shareable open-access preprint. Offer coauthorship to everyone who meets recognized authorship standards and appropriately credit all other contributions.

The existing `/projects/` Experience page documents prior OSL work and is not an affiliated-project directory. Someone's external project remains independent when they join the network; only institution-validated and approved challenge outputs can appear in a future SciStitch Challenge Portfolio. No currently open or completed institutional challenges are claimed by this update.

## Build and publishing

`npm run build` writes `_site/`. Generated files and `node_modules/` are ignored and must never be committed to `main` or feature branches. Static source assets remain versioned.

Pull requests run `npm ci` and `npm test` with read-only repository permissions. After a push to upstream `main` (including a merged PR), CI:

1. Builds and validates the site.
2. Writes only generated `_site/` files into the `gh-pages` branch, including `CNAME` and `.nojekyll`.
3. Uploads the same generated output as the GitHub Pages Actions artifact.
4. Deploys that artifact via the official Pages action and verifies that the homepage responds successfully.

The publish job is restricted to `scistitch/scistitch.github.io` on `main`; fork builds and pull requests cannot publish. A manual workflow run on upstream `main` can retry publishing. Builds are reproducible through `package-lock.json`.

### Required GitHub Pages setting

Under **Settings → Pages → Build and deployment**, choose **Source: GitHub Actions**. The `main` branch contains Eleventy templates, not a root `index.html`. Publishing the repository root from `main` produces a 404 website even if GitHub's automatic "Pages Build and Deployment" workflow reports success.

The custom workflow in `.github/workflows/site.yml` is the only supported deployment workflow. It keeps `main` for Eleventy source, updates `gh-pages` with generated site files, and explicitly deploys that same `_site/` output through GitHub Pages Actions. `gh-pages` remains an output branch, not the Pages source setting. **Do not select "Deploy from a branch" with `main`**, which would deploy unbuilt templates and cause 404s.

The GitHub Pages configuration in the repository settings is not stored in Git, so a maintainer must select **Source: GitHub Actions** separately. That disables GitHub's competing automatic source-branch deployment.

The CI check distinguishes generated `robots.txt` and `sitemap.xml` from source passthrough assets; the site should not be deployed if `npm test` fails.

The deployment uses `GITHUB_TOKEN`; no personal access token or deploy key is needed. Repository/organization policies must allow the publish job's `contents: write`, `pages: write`, and `id-token: write` permissions, and any `github-pages` environment approval rules still apply. Require the `build` check before merging pull requests so that a failed site test cannot land on `main`.

`CNAME` (`scistitch.com`) and `.nojekyll` are copied into both published outputs. Keep the existing custom domain and HTTPS settings; DNS changes are not required.

## License

The site uses the repository's BSD 3-Clause license. Manrope is provided under the SIL Open Font License; see `assets/manrope-license.txt`.

The Open Science Labs logo is copied unchanged from [`theme/icons/osl-logo-black.svg` in their official website repository](https://github.com/OpenScienceLabs/opensciencelabs.github.io/blob/main/theme/icons/osl-logo-black.svg), where it is used in the footer. Its upstream BSD 3-Clause license is retained in `assets/osl-license.txt`. The logo identifies our partner and links to [Open Science Labs](https://opensciencelabs.org/).

Ivan Ogasawara's portrait is copied unchanged from [`docs/images/Ivan-Ogasawara.jpg` in his public website repository](https://github.com/xmnlab/xmnlab.github.io/blob/main/docs/images/Ivan-Ogasawara.jpg) and is also used on [his personal website](https://ivanogasawara.com/). The source repository's BSD 3-Clause license is retained in `assets/ivan-portrait-license.txt`.
