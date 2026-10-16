# Compact photo stack and larger identity portrait

Requested 17 October 2026: replace the large opening picture with several smaller stacked photos, allow left/right browsing, and enlarge the portrait in the left navigation.

Keep the existing navy rail, pale chapter fields, two-line name, copy and content. A compact three-photo stack occupies the same right-side hero grid slot. Use the existing credited Victoria Harbour dusk, HKU/Pok Fu Lam and harbour waterfront photographs, with the full local photographs linked from each slide and the author/license information in the credit disclosure. The front image is approximately 380px wide on a standard desktop, below 300px on a phone. The layered treatment is a literal photograph stack with a slight 2D rotation and a soft shadow, earned by the user's explicit request; no 3D effect or runtime framework is introduced.

Use native previous/next buttons, left/right keyboard support and horizontal touch gestures. Index, title, live announcement, focusability and full-photo link always refer to the current photograph. Wrap at either end, permit rapid changes, and never autoplay. Retarget from the current rendered transform when a pointer change interrupts a 280ms shuffle. Keyboard and reduced-motion changes are immediate. A no-JavaScript horizontal strip keeps all three photos available through native scrolling. Move the existing hero entrance to the complete gallery so the exposed photo edges are never clipped by the former single-image mask.

Desktop identity becomes a larger 80×94px portrait above the name. Mobile retains a compact row with a 46×56px portrait and an 88px header; update the drawer/backdrop geometry with that header. Preserve short-screen rail scrolling.

Verify switching, wrapping, rapid input, focus, announcements, horizontal versus vertical gestures, no autoplay, no-JS fallback, reduced motion, photo bounds and avatar size across the established viewport matrix. Retain the existing site checks and deployment workflow.

## Implementation review

| Before | After | Why |
| --- | --- | --- |
| Single image about 613px wide at a 1440px viewport | Three manually switchable photographs, front frame 380px wide | Gives the name and introduction more space while keeping a personal setting in the opening. |
| 44×52px desktop portrait beside the name | 80×94px portrait above the name | Makes the face identifiable within the retained narrow rail. |
| A late external transition opt-in and body-end lifecycle handling | Critical opt-in and lifecycle handling in the head | Ensures arriving documents are opted in and handlers exist before their first rendering opportunity. |

## Document-transition regression

The broader test exposed an existing intermittent View Transition rejection. Delaying the bottom enhancement script by 700ms reproduced two errors consistently: the incoming document reached `pagereveal` while its ready state was still `loading`, before the external transition opt-in and tail listener were available. The fix moves the critical opt-in, reduced-motion override and promise handling into parser-blocking head code on both documents. The enhancement script skips its entrance when the incoming transition already owns the arrival. The delayed-script test changes from two errors to none, and instrumentation now observes real incoming transitions before the enhancement script loads. This follows the [Chrome cross-document View Transition guidance](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document). No global error filter is added.
