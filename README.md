# Zhenghao YU — independent personal website

A separate robotics research and engineering portfolio, retaining the substantive content of [the original homepage](https://yzh423.github.io/). The original site remains independent and live.

[New website](https://yzh423.github.io/YUzhenghao-s-web/) · [Manipulation research](https://yzh423.github.io/YUzhenghao-s-web/projects/reliable-robotic-manipulation/)

## Run locally

Requires Node.js 22 or newer. The production website has no JavaScript dependencies or build step.

```sh
node scripts/serve.mjs
node scripts/check-site.mjs
```

Open `http://127.0.0.1:8781/YUzhenghao-s-web/`. The preview supports video range requests.

For browser verification:

```sh
npm install
npx playwright install chromium
```

The QA script defaults to installed Microsoft Edge. Run `npm run test:browser`; use `BROWSER_CHANNEL=chromium` to select Playwright's Chromium instead. On Windows PowerShell set `$env:BROWSER_CHANNEL = 'chromium'` separately. `SITE_URL` selects a deployed URL. `PLAYWRIGHT_MODULE` can point to a managed external runtime. Screenshots and results go to `output/playwright/`, excluded from source control.

## Content and design

- `index.html` holds homepage content. The full research study is in `projects/reliable-robotic-manipulation/`.
- `styles.css` and `script.js` define the shared visual system, accessible mobile menu, keyboard-operated evidence viewer, navigation state and optional motion.
- `PRODUCT.md` records content truth. `DESIGN.md` records implemented tokens. `assets/CREDITS.md` records current media and font provenance.
- All links use project-relative paths. `.github/workflows/pages.yml` deploys only website files to GitHub Pages.

## Original-site recovery

The original repository has a recoverable [archive/pre-new-site-2026-10-16 tag](https://github.com/yzh423/yzh423.github.io/tree/archive/pre-new-site-2026-10-16). Local backup: `E:/YZH123123/website-backups/2026-10-16-current-site`, containing a published-site ZIP, Git history bundle, local working-copy ZIP and manifest.
