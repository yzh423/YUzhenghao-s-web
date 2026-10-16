# Verification record

Verified 17 October 2026, Asia/Shanghai. Independent website at the GitHub project path `/YUzhenghao-s-web/`.

## Content and recovery

- Published original source commit: `8220242cba65dcf229750e61ce6f6caf174f8e82`.
- Old site archived by GitHub tag `archive/pre-new-site-2026-10-16`; local ZIP, history bundle and working-copy ZIP saved separately. Both ZIP integrity checks passed.
- The original site's main branch and local uncommitted changes were not overwritten.
- Static checks pass for both pages, 87 local resource/anchor references, source facts, media controls, stable downloads and all original section anchors.
- SHA-256 comparison confirms all seven PDF assets match their source bytes: the two CV filenames, three papers, and two research reports.

## Playwright

Microsoft Edge through Playwright 1.62.1, using the bundled Node runtime. Fifteen recorded check groups passed; no console or local-network errors.

- Both homepage and full research page at 320×740, 390×844, 768×1024, 1024×680, 1440×1000 and 1440×620; no horizontal overflow.
- Mobile menu open/close, Escape, focus return and link-triggered close.
- Evidence tabs: clicking, active panel, ArrowRight keyboard navigation, ARIA selection.
- Native disclosure open/close and actual H.264 video playback.
- Visible lazy images load after traversing the whole document.
- JavaScript disabled: all evidence and reading content remain visible; the expanded mobile rail scrolls with the page.
- Reduced motion: no entrance animation is created.
- Final desktop/mobile full-page and viewport PNGs for both routes, plus the settled keyboard focus state, are in `output/playwright/` locally.

## Design review

The independent Impeccable finish reviewer returned `ship` for its three scored fixes: focus contrast, heading/context presentation and refreshed verification. The original code-led review found no material content-scope or layout defects in the inspected crops. No approved visual comp or catalog QUALITY BAR card existed; this is not a claim of pixel fidelity to one.

The mechanical Impeccable scan reported one warning about native video children sitting flush to their background; it is a player surface rather than a padded text container. Taste static lint reported only the word “Robust” in an actual research title. Taste's browser checker informed removal/repositioning of above-heading project metadata and shorter topic headings, while the complete paper titles remain visible. Its remaining contact-action-as-eyebrow and font-size-count findings were assessed with the rendered result; the contact text is a working link, not a decorative label. The motion-count allowance is deliberate: native videos do not autoplay, and one-time WAAPI entrances remain optional. The final desktop grid/context correction is verified by the reviewer and refreshed Playwright captures.

## Integration limit

The three requested design skills were installed from their upstream repositories and read for this build. Figma was discovered and offered for installation/connection, but no connected Figma MCP capability became available. No Figma document was created or claimed. Design, construction and verification were completed directly in the local source and Playwright.
