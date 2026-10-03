# Repository guide for agents

## Project

SciStitch's public company website is served at **https://scistitch.com/** using GitHub Pages. It is plain HTML, CSS, and JavaScript, with no build step or application dependencies. Keep the site directly deployable from the repository root.

## Files and routes

- `index.html` — homepage (`/`), expertise overview, approach, team introduction, and contact.
- `projects/index.html` — selected past team contributions to OSL incubator projects and infrastructure, Infodengue, and LiteRev at `/projects/`.
- `services/index.html` — services (`/services/`), capabilities and ways to work together.
- `partnership/index.html` — partnership (`/partnership/`), Open Science Labs relationship and collaboration.
- `about/index.html` — about (`/about/`), the team's origins at OSL, the Infodengue and LiteRev collaborations, independence as SciStitch, and a Team section.
- `styles.css` — shared typography, layout, components, and responsive/accessibility rules.
- `script.js` — progressive enhancements for mobile navigation and the copyright year.
- `assets/` — local SVG illustrations, founder portrait, favicon, Manrope fonts, and upstream licenses.
- `CNAME` — custom domain; preserve `scistitch.com`.
- `.nojekyll` — tells GitHub Pages to serve the static files directly; preserve it.
- `README.md` — setup, editing, preview, and publishing instructions.
- `PLAN.md` — local working plan, deliberately ignored by Git. Never force-add it.

Shared navigation and footers are written in each HTML file so they work without JavaScript. Update all five pages together when changing either. About navigation links point to `/about/`; the homepage `#about` section remains a short introduction. Use root-relative internal links and assets, directory routes with trailing slashes, and unique page titles, descriptions, canonical URLs, and Open Graph metadata.

## Brand and content

- Brand: **SciStitch**. Positioning: scientific thinking, thoughtful engineering, and open-source consulting and development.
- Founder: **Ivan Ogasawara**, research software engineer; website https://ivanogasawara.com/.
- About focuses on the team and its shared history. At OSL, a team formed to support external open-source research projects, including **Infodengue**. Some collaborators were subsequently contracted directly by that project. OSL then formed another team to work on **LiteRev**. The research software engineering team moved into SciStitch as an independent consulting organization that OSL can call on for external requests. These historical details are supplied by the site owner; keep the sequence and distinguish work done at OSL from later SciStitch engagements. Do not add dates, contract terms, staff counts, or claims that all contributors moved to SciStitch.
- Use **Infodengue**, the spelling on its official site: https://info.dengue.mat.br/ and `/informacoes/`. LiteRev (https://literev.unige.ch/) is connected to **The GRAPH Network** (Global Research and Analyses for Public Health) and research at the **University of Geneva (UNIGE)**. GRAPH describes itself as a multidisciplinary network formed through collaboration involving UNIGE's Institute of Global Health; do not describe it as a university department or imply ownership. Sources: https://thegraphnetwork.org/, https://thegraphnetwork.org/our-team/, and the UNIGE researcher profile linked from About.
- Keep individual profiles within About's Team section (`#team`); only Ivan is currently supplied for listing. He is SciStitch's founder and OSL's founder and executive director. His authorship of **Makim** and **Sugar** belongs in the short team biography; the Projects page may also highlight these tools as past team work at OSL, rather than a separate founder portfolio. Official references: https://makim.org/, https://github.com/sugar-org/sugar, Ivan's website, and https://opensciencelabs.org/about/team/. Do not invent team members, roles, or project ownership.
- SciStitch is an independent OSL partner, not a subsidiary. The consulting referral relationship does not imply exclusivity, automatic acceptance of work, or guaranteed staffing.
- The portrait `assets/ivan-ogasawara.jpg` is copied unchanged from `docs/images/Ivan-Ogasawara.jpg` in Ivan's public website repository, `xmnlab/xmnlab.github.io`. Retain `assets/ivan-portrait-license.txt` and the README attribution.
- Official business contact: **connect@scistitch.com**. Use working `mailto:` links; do not invent a contact address or add a nonfunctional submission form.
- SciStitch partners with **Open Science Labs (OSL)** to provide consulting and open-source development in scientific computing, data analysis, web development, DevOps, packaging, project management, developer tools, and related areas.
- OSL's official website: https://opensciencelabs.org/. Describe the relationship as a partnership; do not imply exclusivity, ownership, guaranteed staffing, or authority to make agreements on OSL's behalf.
- Use the official OSL logo in `assets/osl-logo.svg`, copied unchanged from `theme/icons/osl-logo-black.svg` in the OpenScienceLabs/opensciencelabs.github.io repository. Link partner logos to https://opensciencelabs.org/. Preserve the original proportions and colors; do not recreate the logo as styled text. The upstream license is retained in `assets/osl-license.txt`.
- OSL's community and program descriptions on the partnership page are based on its official `/about/`, `/opportunities/`, `/projects/incubation/`, `/projects/affiliation/`, `/learning/`, and `/about/formula/` pages. Preserve these source links. Keep OSL's mentoring and contributor programs distinct from SciStitch's consulting services; do not imply guaranteed placements, funding, program availability, or OSL ownership of affiliated projects. Recheck the official pages before changing program claims.
- Keep detailed capabilities and practical project scenarios on Services. Partnership focuses on SciStitch's relationship with OSL, access to its international community and partner network, community initiatives, and routes to fiscal-host support for eligible joint work.
- Fiscal hosting is arranged through OSL for eligible collaborations; do not describe SciStitch itself as automatically hosted. Verify details against OSL's `/about/fiscal-sponsor/` and `/consulting/` pages and Open Source Collective's contract guidance. The page distinguishes OSL's Open Source Collective arrangements from its stated GRAPH Network/ASCRES relationship and from SciStitch's independent contracts. OSL's listed partners are not automatically direct SciStitch partners.
- SciStitch welcomes new partnerships with companies, independent collaborators, foundations, institutions, communities, and nonprofits. Invitations should cover shared projects, research, education, knowledge exchange, and community work, with inquiries sent to `connect@scistitch.com`.
- Do not invent client lists, testimonials, statistics, certifications, prices, or delivery promises.

- Projects presents past contributions by the people behind SciStitch, including work at OSL before independence. The owner supplied the contribution details: OSL incubator work on Makim, Sugar, and PyMedX; creation and maintenance of OSL infrastructure (bots, CI, websites, plugins, DevOps, and support tools); Infodengue data visualization, DevOps, and web development; LiteRev technical leadership, AI, clustering, data processing, benchmarking, Celery task orchestration, Elasticsearch, DevOps, and web development. Do not recast these as later SciStitch client engagements or invent results, dates, or current maintenance commitments. PyMedX is a fork of the archived gijswobben/pymed project.

## Design and implementation

- Preserve the minimalist visual system: warm white/paper, cobalt blue, dark ink, self-hosted Manrope, monospace labels, fine borders, generous spacing, and mathematical line art.
- Reuse CSS variables and shared components; write new CSS and JavaScript in a readable style.
- Prefer native HTML/CSS/SVG over dependencies, icon libraries, remote fonts, or stock imagery. Do not introduce a framework or build requirement without a concrete need.
- Keep content, navigation, illustrations, and contact links usable without JavaScript. Use JavaScript only for progressive enhancements.
- Include a skip link, semantic landmarks, one clear `h1`, logical heading order, accessible names, visible keyboard focus, and `aria-current="page"` on the active navigation link.
- Mobile navigation must expose its expanded state, close on Escape and link selection, and reset when returning to desktop. Do not leave hidden controls keyboard-focusable.
- Support narrow screens, keyboard interaction, reduced motion, and forced colors. Decorative SVGs should be hidden from assistive technology; informative artwork needs descriptive alternative text.
- Keep SVG artwork local and fonts self-hosted with their license.
- About uses `assets/team-paths.svg` and Partnership uses `assets/partnership-network.svg`. Keep these hero illustrations distinct: the team's shared journey and connections across communities, respectively. Their descriptive alt text and captions should match the artwork.

## Preview and verification

Run from the repository root:

```sh
python -m http.server 8000
node --check script.js
git diff --check
git check-ignore PLAN.md
git ls-files PLAN.md
```

Visit `/`, `/projects/`, `/services/`, `/partnership/`, and `/about/` on http://localhost:8000. Check desktop and mobile widths, local links and fragment targets, page metadata, menu keyboard behavior, current-page indicators, console errors, and no-JavaScript rendering. The last command above should print nothing. Use available browser tooling for screenshots and interaction checks; do not add runtime dependencies just to preview the site.

## Git and publishing

Preserve unrelated user changes. `conda.yaml` was already untracked when this work began; it is not required to run the static site. `AGENTS.md` is intended as repository documentation; only `PLAN.md` is explicitly kept out of Git.

GitHub Pages publishes the root of `main`. A push to `main` can publish the website: follow the user's requested scope before committing, pushing, or changing deployment settings. Do not alter DNS, the custom domain, or licensing as part of routine page edits.
