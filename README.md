# maxbeantierney.github.io

Personal engineering portfolio for Max Bean-Tierney, live at https://maxbeantierney.github.io.

Plain HTML, CSS, and a little JavaScript, with no theme and no build step. Pushing to `main` deploys through
`.github/workflows/pages.yml`, which copies the public files to GitHub Pages.

- `index.html`: homepage (hero loop, metrics, featured Vivvity, project cards)
- `<page>/index.html`: one folder per project page, which keeps the old URLs working
- `assets/css/site.css`: all styles (light and dark)
- `assets/js/site.js`: hero video pause/play and click-to-enlarge images
- `assets/images/`, `assets/videos/`: media (keep each file under 100 MB)

Preview locally with `python3 -m http.server 4000`, then open http://localhost:4000.
