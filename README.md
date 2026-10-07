# SciStitch

The SciStitch company website, published at [scistitch.com](https://scistitch.com/) through GitHub Pages.

## Editing the site

- `index.html`: homepage, expertise overview, partnership introduction, approach, and team introduction.
- `projects/index.html`: selected past team contributions to OSL incubator projects and infrastructure, Infodengue, and LiteRev at `/projects/`.
- `services/index.html`: consulting and development capabilities, practical project scenarios, and engagement options at `/services/`.
- `partnership/index.html`: the Open Science Labs relationship, its wider network and fiscal-host arrangements, and invitations for new SciStitch partnerships at `/partnership/`.
- `network/index.html`: Professional Network at `/network/`, describing independent collaborators who may join specific projects according to fit and availability.
- `about/index.html`: the team's origins at Open Science Labs, its Infodengue and LiteRev collaborations, independence as SciStitch, and the Team section at `/about/`.
- `styles.css`: typography, colors, layout, and responsive styles.
- `script.js`: mobile navigation and the copyright year.
- `assets/`: mathematical SVG illustrations, founder portrait, favicon, self-hosted Manrope fonts, and upstream licenses.
- `assets/team-paths.svg` and `assets/partnership-network.svg`: distinct local hero illustrations for About (paths gathering into a shared direction) and Partnership (a globe with open connections).
- `assets/osl-logo.svg`: official Open Science Labs logo, linked to their homepage. Keep its proportions and colors unchanged.
- `AGENTS.md`: repository, content, design, and verification guidance for coding agents.
- `PLAN.md`: local implementation plan, intentionally excluded from Git by `.gitignore`.

This is a static website. No dependencies, installation, or build are required.

Keep shared navigation and footers consistent across all six HTML files. Internal links and assets use root-relative paths, and each page has its own title, description, canonical URL, and Open Graph metadata. The content, illustrations, and navigation remain available without JavaScript; the mobile menu is progressively enhanced when JavaScript runs.

The services page covers scientific computing, data analysis, web development, DevOps, packaging, developer tools, project management, and applied AI, with examples showing how these capabilities work together. The partnership page explains SciStitch's relationship with [Open Science Labs](https://opensciencelabs.org/), including community and partner connections, programs, and routes to fiscal support for eligible joint initiatives. It also invites companies, collaborators, foundations, institutions, communities, and nonprofits to explore new partnerships with SciStitch.

The official contact email is **connect@scistitch.com**. Keep displayed addresses and all `mailto:` links consistent across the site.

The About page follows the team's story: supporting external research projects at OSL, collaborating with Infodengue, forming a later team for LiteRev, and establishing SciStitch as an independent consulting organization that OSL can call on. The historical sequence and Infodengue's direct contracting of some collaborators come from the site owner. Official project, GRAPH Network, and UNIGE sources supply names, project descriptions, and research connections. These early collaborations are presented as work at OSL. Ivan's short profile sits in the Team section, with Makim and Sugar linked as examples of his authorship. Keep detailed services and partnership arrangements on their respective pages.

## Local preview

From the repository root, run:

```sh
python -m http.server 8000
```

Then open http://localhost:8000, http://localhost:8000/projects/, http://localhost:8000/services/, http://localhost:8000/partnership/, http://localhost:8000/network/, and http://localhost:8000/about/. Preview through the server rather than opening files directly, so root-relative links resolve correctly.

## Verification

```sh
node --check script.js
git diff --check
git check-ignore PLAN.md
git ls-files PLAN.md
```

The ignore check should print `PLAN.md`; the tracked-file check should print nothing. Node is only needed for the JavaScript syntax check, not to serve the site.

In a browser, check all six routes at desktop and mobile widths, including 320px. Confirm that links and section anchors work, the active page is indicated, and the menu opens, closes on Escape, and resets on desktop. Check keyboard focus, reduced-motion preferences, and navigation with JavaScript disabled.

## Publishing

GitHub Pages publishes the root of the `main` branch automatically. Commit and push changes to `main` to update the website. The `.nojekyll` file tells Pages to serve these files directly.

The existing `CNAME` file contains `scistitch.com`; keep it in place to retain the custom domain. DNS and HTTPS settings are managed separately from the page source.

## License

The site uses the repository's BSD 3-Clause license. Manrope is provided under the SIL Open Font License; see `assets/manrope-license.txt`.

The Open Science Labs logo is copied unchanged from [`theme/icons/osl-logo-black.svg` in their official website repository](https://github.com/OpenScienceLabs/opensciencelabs.github.io/blob/main/theme/icons/osl-logo-black.svg), where it is used in the footer. Its upstream BSD 3-Clause license is retained in `assets/osl-license.txt`. The logo identifies our partner and links to [Open Science Labs](https://opensciencelabs.org/).

Ivan Ogasawara's portrait is copied unchanged from [`docs/images/Ivan-Ogasawara.jpg` in his public website repository](https://github.com/xmnlab/xmnlab.github.io/blob/main/docs/images/Ivan-Ogasawara.jpg) and is also used on [his personal website](https://ivanogasawara.com/). The source repository's BSD 3-Clause license is retained in `assets/ivan-portrait-license.txt`.
