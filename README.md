# SciStitch

The SciStitch company website, published at [scistitch.com](https://scistitch.com/) through GitHub Pages.

## Editing the site

- `index.html`: page content, navigation, contact links, and metadata.
- `styles.css`: typography, colors, layout, and responsive styles.
- `script.js`: mobile navigation, the mathematical surface, and the copyright year.
- `assets/`: favicon, self-hosted Manrope fonts, and the font license.

This is a static website. No dependencies, installation, or build are required.

## Local preview

From the repository root, run:

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Publishing

GitHub Pages publishes the root of the `main` branch automatically. Commit and push changes to `main` to update the website. The `.nojekyll` file tells Pages to serve these files directly.

The existing `CNAME` file contains `scistitch.com`; keep it in place to retain the custom domain. DNS and HTTPS settings are managed separately from the page source.

## License

The site uses the repository's BSD 3-Clause license. Manrope is provided under the SIL Open Font License; see `assets/manrope-license.txt`.
