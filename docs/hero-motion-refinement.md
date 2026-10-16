# Hero composition and interaction refinement

Requested 17 October 2026: stronger design, especially the opening composition, letter spacing and transition choreography. This is a refinement of the existing Chivo/navy/white world. All research facts, links, papers, CVs and the original website remain in scope as preserved content.

## Composition
Set the two-line name across the opening grid, with the second line occupying the left side. Place an actual HKU/Pok Fu Lam photograph in the right-hand space below the first name line. Align the introduction beneath Daniel on the left. Consolidate the previously detached contact link into the introduction's action group. Keep the photograph and its attribution within the hero, rather than reserving a separate panorama below a near-full-screen text block. The Harbour photograph remains accessible from the caption.

Relax name tracking to -.012em, word spacing .075em and weight 500. Preserve Chivo, navy type, the portrait rail and original name spelling. On phones, reading order is name, introduction/actions, photograph, research availability note. Do not position any visible text over the photograph.

## Motion thesis
- Focal moment: two name lines settle into their grid while the campus image opens into the space beside Daniel. One bounded 650–780ms entrance; no repeating decorative loop.
- Continuity: the mobile navigation opens as a panel anchored to its trigger without pushing the document down. Exit faster than entrance; cancel and retarget repeated toggles. Escape, keyboard operation and reduced motion are immediate.
- Evidence: native View Transitions preserve visual continuity when changing the recorded figure and its explanation. Skip obsolete transitions on rapid clicks and apply the latest requested state. Keyboard changes stay immediate. Unsupported browsers receive a small WAAPI fade instead.
- Page navigation: progressive cross-document View Transitions keep the portrait rail stable while the main reading surface changes. Unsupported browsers navigate normally; reduced motion and keyboard navigation skip the transition.
- Feedback: an active-navigation marker travels between section destinations; pointer disclosure openings fade the newly visible content. These motions explain state and do not delay the underlying action.

## Verification
Repeat the existing responsive/browser checks; add actual hero text/image separation, overlay-menu document stability, rapid toggle and rapid evidence switching, keyboard transition bypass and the View Transition fallback. Capture desktop, mobile, short desktop, open menu and evidence states. Keep content readable without JavaScript, and verify the deployed CSS artifact includes the new layout/motion stylesheet.

## Platform references
[MDN startViewTransition](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition), [pageswap](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageswap_event), [pagereveal](https://developer.mozilla.org/en-US/docs/Web/API/Window/pagereveal_event). No animation library is added.
