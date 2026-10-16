# Repository guide for agents

## Project

SciStitch’s public company website is served at **https://scistitch.com/** using GitHub Pages. Eleventy and Nunjucks generate static HTML; no frontend framework or browser runtime is needed. Source stays on `main` and feature branches. GitHub Actions builds `_site/`, commits only generated files to `gh-pages`, and explicitly deploys the same artifact. The repository's GitHub Pages setting must use **GitHub Actions** rather than source-branch deployment from `main`.

## Files and routes

- `src/index.njk` — homepage (`/`).
- `src/services.njk` — capabilities and ways to work together (`/services/`).
- `src/projects.njk` — past OSL, Infodengue, and LiteRev contributions (`/projects/`).
- `src/partnership.njk` — OSL relationship and collaboration (`/partnership/`).
- `src/network.njk` — Active Members and the wider professional network (`/network/`).
- `src/challenges.njk` — real institution-led open challenges, professional joining paths, review stages, licensing, publication, and participation agreements (`/challenges/`).
- `src/contact.njk` — inquiry guidance and a working email action (`/contact/`).
- `src/about.njk` — team history, values, and founder profile (`/about/`).
- `src/_includes/` — base layout, metadata, shared header/footer, navigation macro, wordmark, and contact section.
- `src/_data/navigation.json` — shared navigation labels and routes.
- `src/_data/site.json` — canonical site URL, shared contact, and social image.
- `src/sitemap.njk`, `src/robots.njk` — canonical sitemap and crawler guidance.
- `images/logo/social-banner.png` — official 1200 × 630 social image; reuse it instead of inventing artwork.
- `styles.css`, `script.js`, `assets/` — static source assets, copied unchanged into the output.
- `CNAME`, `.nojekyll`, `LICENSE` — preserved and copied to the public output.
- `eleventy.config.js`, `package.json`, `package-lock.json` — build configuration and locked dependencies.
- `scripts/check-site.js` — generated-site verification.
- `.github/workflows/site.yml` — PR checks and upstream-main publishing: validate, mirror `_site/` to `gh-pages`, and deploy that built artifact via GitHub Pages Actions. Use **GitHub Actions** as the Pages Source setting; never deploy raw `main` contents.
- `_site/` — generated output, ignored by Git. Never commit it.
- `PLAN.md` — ignored local working plan. Never force-add it.

Change shared templates or data once rather than copying navigation, metadata, headers, footers, or contact markup into pages. Keep titles and search descriptions factual, sitemap URLs aligned with canonical routes, and social images linked to the official PNG. Do not invent search console verification, analytics tracking, legal statuses, or schema facts. About links point to `/about/`; the homepage `#about` remains a short introduction. Preserve all public content routes, root-relative assets, unique metadata, and fragment targets. The canonical sitemap and shared navigation automatically include the new `/challenges/` route. Page front matter supplies per-page contact text. Only trusted repository-authored HTML is rendered with `safe`; leave escaping enabled for other data.

## Brand and content

- Brand: **SciStitch**. Positioning: scientific thinking, thoughtful engineering, and open-source consulting and development.
- Founder: **Ivan Ogasawara**, research software engineer (https://ivanogasawara.com/). **Ricky Sambo Macharm** is an independent professional in the Network, not a current cofounder.
- **Keep portfolio details in one place:** `/projects/` is the sole page for historical project descriptions and contributions. About may mention names such as **Infodengue** and **LiteRev** briefly as background, but must not duplicate descriptions, timelines, deliverables, or external project link lists. The homepage should link to Experience without featuring the same old projects again. Earlier OSL collaborations shaped SciStitch, but are not SciStitch client engagements; do not claim that the team built or maintains current versions. Do not add dates, contract terms, staff counts, or claims that all former OSL contributors moved to SciStitch.
- Use **Infodengue**, the spelling on its official site: https://info.dengue.mat.br/ and `/informacoes/`. LiteRev (https://literev.unige.ch/) is connected to **The GRAPH Network** (Global Research and Analyses for Public Health) and research at the **University of Geneva (UNIGE)**. GRAPH describes itself as a multidisciplinary network formed through collaboration involving UNIGE's Institute of Global Health; do not describe it as a university department or imply ownership. Sources: https://thegraphnetwork.org/, https://thegraphnetwork.org/our-team/, and the UNIGE researcher profile linked from About.
- Keep individual profiles within About's Team section (`#team`); Ivan is the founder, while Ricky is listed as an independent professional in the Network. Ivan is also OSL's founder and executive director. His authorship of **Makim** and **Sugar** belongs in the short team biography; the Projects page may also highlight these tools as past team work at OSL, rather than a separate founder portfolio. Official references: https://makim.org/, https://github.com/sugar-org/sugar, Ivan's website, and https://opensciencelabs.org/about/team/. Do not invent team members, roles, or project ownership.
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

- **Open Challenges program:** Affiliated institutions propose meaningful social-impact or research problems and must appoint a real domain contact who guides the work and helps validate outcomes. SciStitch coordinates contributors and scientific or technical review. The site describes proposed processes, not ongoing engagements; never invent affiliated institutions, open calls, challenge results, beneficiaries, project impact, or guaranteed durations.
- **Two network pathways:** Applicants may demonstrate relevant existing research/open-source/social-impact contributions, or participate meaningfully in a challenge. Existing personal projects are **not** automatically SciStitch-affiliated or added to the Experience/Challenge portfolio. Challenge participation is not automatic network admission. Active membership indicates current meaningful SciStitch involvement; the wider Network remains connected. Use explicit `"status": "active"` in `src/_data/professionals.json` only with consent and actual engagement; only the founder is initially marked active. The one-open-challenge-per-year expectation is an aim as opportunities become available, not a retroactive or absolute requirement.
- **Open licensing and authorship:** A challenge must be scoped for release of code, research data that may lawfully be shared, models, notebooks, analyses, reports, and documentation under appropriate open licenses. Do not expose private/personal or restricted source datasets; use legally publishable derivatives/aggregates/synthetic examples and be transparent. If meaningful open release is impossible, rescope or exclude it from Open Challenges. Articles should be published open access or have a legally shareable open-access preprint; all substantial scholarly contributors meeting recognized authorship standards should receive the opportunity to be coauthors, with other work properly credited. Do not promise automatic authorship to every volunteer.
- **Agreements:** Require an institution-level Challenge Charter and an appropriate Contributor Participation Agreement before organized challenge work. Additional signed confidentiality, ethics, or data-access terms may apply when necessary. For ordinary public repository contributions, documented open-source contribution terms may suffice. Agree scope, validation, publication/open license, IP, credit, consent, data stewardship, withdrawal, responsibilities, and whether participation is voluntary or paid before accepting sensitive work. These are proposed program policies, not legal advice; actual agreements require local counsel/institutional review. Distinguish volunteer open collaboration from separately funded client engagements.


- Projects presents past contributions by the people behind SciStitch, including work at OSL before independence. The owner supplied the contribution details: OSL incubator work on Makim, Sugar, and PyMedX; creation and maintenance of OSL infrastructure (bots, CI, websites, plugins, DevOps, and support tools); Infodengue data visualization, DevOps, and web development; LiteRev technical leadership, AI, clustering, data processing, benchmarking, Celery task orchestration, Elasticsearch, DevOps, and web development. Present this experience in one shared OSL history section, rather than repeating disclaimers under each project. Current versions of these projects may differ substantially from the earlier work: do not use present-day websites as evidence of the versions the team developed or suggest that SciStitch built or maintains today’s products. Credit Infodengue co-founder Flávio Codeço Coelho (FGV: https://ceph.fgv.br/node/91) and the University of Geneva LiteRev founding team members Erol Orel, Fatma Aziza Merzouki, and Professor Olivia Keiser (https://www.venturekick.ch/literev; published LiteRev study: https://www.jmir.org/2023/1/e39736/). Avoid attributing sole creation to these individuals, since each project involved a wider research team. Links to live projects are for context. Do not recast this work as later SciStitch client engagements or invent results, dates, or current maintenance commitments. PyMedX is a fork of the archived gijswobben/pymed project.

- Professional Network members are independent professionals, not employees. Participation is project-specific and depends on fit and availability. Approved collaborator profiles belong in `src/_data/professionals.json` and are rendered on Network with `professional-card.njk`; the founder profile remains on About. Sandro Loch (GitHub/LinkedIn username `esloch`) is supplied for listing. Use the spelling Loch verified by his GitHub profile and OSL team page. His short bio and headline are based on OSL’s public team description; his photo is the public GitHub avatar also used there. Do not invent additional members or expertise, imply guaranteed staffing, or add placeholder profiles.

## Design and implementation

- Preserve the minimalist visual system: warm white/paper, cobalt blue, dark ink, self-hosted Manrope, monospace labels, fine borders, generous spacing, and mathematical line art.
- Reuse CSS variables and shared components; write new CSS and JavaScript in a readable style.
- Prefer native HTML/CSS/SVG over dependencies, icon libraries, remote fonts, or stock imagery. Use the established Eleventy/Nunjucks build; do not add frontend frameworks or additional build tools without a concrete need.
- Keep content, navigation, illustrations, and contact links usable without JavaScript. Use JavaScript only for progressive enhancements.
- Include a skip link, semantic landmarks, one clear `h1`, logical heading order, accessible names, visible keyboard focus, and `aria-current="page"` on the active navigation link.
- Mobile navigation must expose its expanded state, close on Escape and link selection, and reset when returning to desktop. Do not leave hidden controls keyboard-focusable.
- Support narrow screens, keyboard interaction, reduced motion, and forced colors. Decorative SVGs should be hidden from assistive technology; informative artwork needs descriptive alternative text.
- Keep SVG artwork local and fonts self-hosted with their license.
- About uses `assets/team-paths.svg` and Partnership uses `assets/partnership-network.svg`. Keep these hero illustrations distinct: the team's shared journey and connections across communities, respectively. Their descriptive alt text and captions should match the artwork.

## Preview and verification

Use Node.js 24 or newer. From the repository root:

```sh
npm ci
npm test
npm run dev
```

Preview `/`, `/services/`, `/projects/`, `/partnership/`, `/network/`, and `/about/` at http://localhost:8080. Check desktop/mobile widths, keyboard navigation, reduced motion, forced colors, and no-JavaScript behavior when a browser is available. `npm test` builds and checks HTML, metadata, navigation, IDs, accessible references, links, fragments, copied assets, and the public output allowlist.

Before committing:

```sh
git diff --check
git check-ignore PLAN.md _site/index.html node_modules/
git ls-files PLAN.md _site node_modules
```

The final command must print nothing. Do not add generated HTML to source branches or publish templates/configuration to `gh-pages`.

## Git and publishing

Preserve unrelated changes, `conda.yaml`, licenses, the domain, and DNS configuration. Node dependencies are build-time only; retain the lockfile.

PRs build and validate with read-only permissions. Upstream `main` builds and publishes only `_site/` to `gh-pages`, then deploys the same files through the official GitHub Pages actions. Fork builds and PRs never publish. The deployment uses `GITHUB_TOKEN`; its branch pushes do not trigger a branch-based Pages build, so the explicit Pages deployment is required.

For the initial migration, the maintainer must set Settings → Pages → Source to **GitHub Actions** before merging. Do not assume that committing the workflow changes the repository’s publishing settings. Preserve `CNAME` and `.nojekyll` in the output; repository and environment policies govern deployment permissions and approvals.

- Ricky’s concise About bio is based on the owner-supplied CV: AI, data engineering, international development across Africa and Europe, public health, technical education, Masakhane contributions, and a master’s degree in financial engineering. His portrait `assets/ricky-macharm.jpg` is the owner-supplied image, copied unchanged. Do not publish the CV or its private personal details.
