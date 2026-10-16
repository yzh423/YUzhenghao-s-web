# Verification record

Verified 17 October 2026, Asia/Shanghai. Independent website at `/YUzhenghao-s-web/`.

## Content and recovery

- Published original source commit remains `8220242cba65dcf229750e61ce6f6caf174f8e82`, rechecked through GitHub after the refinement. The original site and its working-copy changes are untouched.
- Old site archived by tag `archive/pre-new-site-2026-10-16`; verified ZIPs and history bundle remain in `E:/YZH123123/website-backups/2026-10-16-current-site`.
- Static checks pass for two pages, 90 local references, all original section anchors, source facts, image dimensions, video controls and the five stable CV/paper downloads.
- SHA-256 comparison against the preceding commit confirms all seven PDF assets are unchanged: two CV filenames, three papers and two research reports.

## Responsive and browser checks

Playwright 1.62.1 with Microsoft Edge. Seventeen recorded check groups passed with no console or local-network errors in the final local run.

- Both pages at 320×740, 390×844, 768×1024, 1024×680, 1440×1000 and 1440×620: no horizontal overflow. Homepage name and photograph do not overlap at any tested width; two-line spelling and relaxed tracking verified.
- Mobile menu overlays rather than shifting `main`; Escape returns focus, navigation closes the panel, and five rapid toggles settle at the final request. Drawer controls become inert immediately on dismissal.
- Evidence: pointer and keyboard selection, ARIA state, exactly one visible panel, rapid requests, and the fallback without `document.startViewTransition`. Keyboard changes are immediate.
- Real same-origin navigation to the research page and browser back; six additional rapid navigation/fallback cycles completed without errors.
- Native disclosure, actual H.264 playback, and all visible lazy images after document traversal.
- JavaScript disabled: all evidence and reading content remain visible, and the mobile rail scrolls with the page. Reduced motion: no entrance animation is created.
- Captures: homepage and research desktop/mobile full pages and viewports, short desktop, open menu and settled evidence keyboard focus are saved in `output/playwright/` locally.

An early test used an incorrect research-link name; the locator was corrected to the visible label. Rapid transition cancellation exposed rejected `ready` promises, now handled explicitly on deliberate skips and document lifecycle events. The final test has no ignored console errors. A later intermittent opt-in cancellation did not recur in the final instrumented full run or six additional navigation cycles.

## Visual and code review

The Impeccable finish reviewer returned `ship` for the two scored fixes: the complete opening now ends within 780ms with repeated scroll reveals removed, and DESIGN.md plus its sidecar match the final grid, typography and transitions. Recaptures showed no regression from that batch. This was a code-led refinement without an approved visual comp or catalog QUALITY BAR, so no comp fidelity is claimed.

The single rendered Impeccable scan flagged an existing wide simulation caption. It now uses a 60ch maximum; a direct rendered character-range measurement at 1440px confirmed 32–80 characters per line. Taste source lint has zero failures; its remaining “Robust” warning is an actual research title. Two shadow exceptions are explicitly restricted to the real overlay and removal of its former header shadow.

Taste's rendered scan flags the actual `Jul 2025` news date and a working `GitHub` contact link as above-heading labels; they belong to their respective content/actions, not decorative kickers. The ten measured font sizes include fluid responsive display, topic/title, research evidence and closing-name roles. These findings were reviewed in the captures rather than treated as reasons to remove factual dates or links. The still-page allowance remains deliberate: videos are manual, the hero enters once, and interaction motion is triggered by use.

## Integrations

The installed Emil design-engineering, Impeccable and Taste skills informed the refinement. The user declined Figma installation. Source, screenshots and browser verification use available local tools and real Playwright.

## Navigation and chapter contrast refinement

The subsequent requested contrast pass retains the established type and motion, reverses the navigation onto navy, alternates white and pale-blue chapter fields, and uses Dllu's actual Victoria Harbour panorama under CC BY-SA 4.0. The image, full-panorama link, attribution, license and responsive crop are recorded in assets/CREDITS.md.

- Eighteen local Playwright groups passed without console/network errors. Inactive/selected navigation, sidebar metadata and the reversed CV action have a minimum measured text contrast of 9.23:1.
- Both routes pass the same six viewport configurations. Homepage chapters have distinct adjacent fields. Desktop/phone section-boundary screenshots and the open navy mobile drawer are captured alongside the existing opening captures.
- After the proportional active-section threshold update, a targeted test passed 16 desktop/phone chapter-anchor states, both publication-boundary states and CV reachability within a 620px-high sidebar.
- Static checks still cover 90 local references and all preserved anchors. All seven PDFs match the preceding commit byte-for-byte.
- The rendered Impeccable scan returns no findings. Taste source lint has zero failures and the same actual-title “Robust” warning. Taste's rendered scan retains the working contact `GitHub` link as a false-positive above-heading label and the ten responsive/type-role sizes warning; the former news-date finding disappears with the clearer chapter spacing. No factual date or working link is removed to satisfy a layout heuristic.
- Independent finish review found no visual contradiction with the requested rail, image or chapter separation. Its one persistence finding was resolved by the documenter; the verdict pass returned `ship` for that scored fix, with no regression.
