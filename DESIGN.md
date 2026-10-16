---
name: Zhenghao YU research portfolio
description: A type-led personal research record grounded in inspectable experimental evidence.
colors:
  paper: "#fff"
  surface: "#f4f4f2"
  section-ground: "#eef1f6"
  ink: "#1f2b4d"
  muted: "#515d78"
  rail-secondary: "#c8d3e8"
  rail-hover: "#34425f"
  accent: "#f7941d"
  dark: "#10192d"
  footer: "#e3e1dc"
  dark-muted: "#c6cede"
  dark-surface: "#1f2c44"
  control-hover: "#e3e5e8"
  video-black: "#000"
typography:
  display:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(64px, 8.1vw, 112px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.012em"
  headline:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(36px, 4vw, 58px)"
    fontWeight: 550
    lineHeight: 1.1
    letterSpacing: "-.025em"
  title:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(28px, 2.7vw, 40px)"
    fontWeight: 550
    lineHeight: 1.1
    letterSpacing: "-.025em"
  lead:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(21px, 2vw, 28px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  positioning:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(21px, 1.8vw, 26px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-.012em"
  body:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  publication-title:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(21px, 1.8vw, 27px)"
    fontWeight: 550
    lineHeight: 1.25
    letterSpacing: "-.015em"
  paper-title:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  research-title:
    fontFamily: "Chivo, Arial, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 64px)"
    fontWeight: 550
    lineHeight: 1.08
    letterSpacing: "-.025em"
rounded:
  square: "0"
spacing:
  inline: "8px"
  control: "12px"
  compact: "16px"
  inset: "20px"
  stack: "24px"
  gutter: "32px"
  group: "48px"
  column: "64px"
  section: "96px"
  section-tablet: "80px"
  section-phone: "64px"
  hero-bottom: "64px"
  hero-bottom-phone: "48px"
  page: "clamp(24px, 4vw, 64px)"
components:
  button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "14px 20px"
  button-hover:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.paper}"
  cv-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px"
  cv-link-hover:
    backgroundColor: "{colors.section-ground}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "{colors.ink}"
    padding: "6px 0"
  navigation-link:
    textColor: "{colors.rail-secondary}"
    typography: "{typography.label}"
    padding: "8px 12px"
  navigation-hover:
    backgroundColor: "{colors.rail-hover}"
    textColor: "{colors.paper}"
  navigation-current:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  evidence-control:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px 16px"
  evidence-control-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  evidence-control-hover:
    backgroundColor: "{colors.control-hover}"
    textColor: "{colors.ink}"
  disclosure:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.square}"
    padding: "16px 20px"
  disclosure-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.paper}"
  evidence-container:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "clamp(24px, 3vw, 44px)"
  figure-surface:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.square}"
    padding: "20px"
  publication-record:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  contact-field:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Zhenghao YU research portfolio

## Overview

**Creative North Star: "The Open Research Record"**

The portfolio uses personal names, generous Chivo typography, and real photographic and experimental material to introduce a researcher whose work can be examined closely. A navy portrait rail keeps identity and navigation available beside a calm reading column. White and pale blue chapter fields separate introduction, evidence, publications, and background; small orange marks identify interaction and emphasis.

This name describes the implemented code-led direction, rather than an independently approved visual metaphor or image comp. The system is extracted from styles.css, layout-motion.css, script.js, and the manipulation project's project.css. Its documented direction is associated with FORM seed:d1c603635fc5df31 in docs/design-plan.md; the opening composition and motion are refined in docs/hero-motion-refinement.md, with navigation and chapter contrast recorded in docs/section-contrast-refinement.md. No visual-comp fidelity or catalog quality-bar approval is asserted.

**Key Characteristics:**

- Type-led identity with a self-hosted Chivo variable font.
- A navy navigation ground, white and pale blue chapter fields, and restrained orange interaction marks.
- Real Hong Kong, portrait, industrial, and scientific imagery.
- Asymmetric editorial layouts rather than a repeated card grid.
- Inspectable evidence, native disclosures, and manually controlled video.
- One bounded hero entrance and short state transitions, with content visible by default and reduced-motion support.

## Colors

The palette combines one cool navy family across dark navigation and light chapter fields, warm near-white evidence surrounds, and a small warm accent. Frontmatter values are normative. The sidecar's eight-step OKLCH tonal ramps are generated previews, not additional implemented palette tokens.

### Primary

- **Research Navy — ink:** Main text, the desktop rail and mobile header/drawer, selected evidence controls, reading-column filled actions, and the contact field.
- **Signal Orange — accent:** Current-navigation square, selected-text background, manuscript-link underlines, text-link hover underlines, and focus outlines within dark fields. Orange is an accent rather than a broad surface fill.

### Neutral

- **Paper — paper:** The introduction and alternating reading chapters, current navigation destination and rail CV action, reversed text, evidence browser, news disclosure, and white figure interiors.
- **Soft Evidence Ground — surface:** Ordinary scope disclosures and scientific-image surrounds.
- **Chapter Blue — section-ground:** Full-width selected work, about, news, and education/skills fields; detail-page outcomes and evidence fields; highlighted experience and rail CV hover.
- **Secondary Navy — muted:** Metadata, dates, and captions on light surfaces.
- **Rail Mist — rail-secondary:** Inactive chapter links and supporting rail text on the navy navigation ground.
- **Rail Hover — rail-hover:** Filled hover state for inactive navigation destinations, with paper text.
- **Simulation Night — dark:** Dark simulation project field and filled-action hover.
- **Warm Footer — footer:** Closing copyright strip.
- **Reversed Caption — dark-muted:** Supporting copy and captions inside the dark project field.
- **Reversed Disclosure — dark-surface:** Disclosure surface inside the dark project field.
- **Control Hover — control-hover:** Unselected evidence control on pointer hover.
- **Video Black — video-black:** Native video field within the dark project.

**The Accent Restraint Rule.** Reserve orange for small orientation, selection, underline, and focus details; reading-column filled actions remain navy and the rail CV action reverses to paper.

**The Focus Contrast Rule.** Light surfaces use the navy focus outline; the navy rail, contact, and dark-project fields use the orange outline. Keep the visible outline outside the control rather than replacing it with a subtle color shift.

## Typography

**Display and Body Font:** Chivo, followed by Arial and the platform sans-serif fallback. The normal-style variable font is self-hosted at assets/fonts/chivo-variable.ttf with font-display: swap; its source supports weights 100–900.

**Character:** One type family carries the whole hierarchy. Size, medium variable weights, tight heading tracking, and generous surrounding space distinguish identity, research titles, reading text, and metadata. Labels remain sentence case.

### Hierarchy

- **Display:** The two-line personal name uses the display token, with additional word spacing (.075em). Its masked lines retain bottom padding to preserve descenders.
- **Headline:** Section headings and evidence-browser title use the headline token.
- **Title:** Project titles use the title token, usually constrained to 20ch; the dark-project title is constrained to 17ch.
- **Lead:** Detail-page introductory text uses the lead size with line-height 1.5. Research-theme titles and figure subheads share the fluid size but use their own observed heading weights and line heights.
- **Positioning:** The homepage research statement uses the positioning token, remaining quieter than the name and aligned above the introduction.
- **Body:** Body text uses the body token and defaults to 70ch maximum width. The hero introduction narrows to 39ch.
- **Label:** Navigation, dates, authors, captions, controls, and resource links use the label scale. Selected rail navigation increases to weight 700; text links use weight 550.
- **Publication title:** A concise topic heading leads each publication. The full original paper title remains a separate, visible paragraph using the paper-title token, followed by authors, publication status, summary, and links.
- **Research title:** The full manipulation-study title uses its dedicated fluid scale and a 25ch measure.

The composed hero keeps its display cap on wide screens. Between 851px and 1150px the name uses 8.1vw; at 850px and below it uses clamp(56px, 9.2vw, 80px); at 600px and below it uses clamp(40px, 10.9vw, 62px) with line-height 1.2. The positioning statement becomes 21px at 850px and below and 23px at 600px and below. Mobile project titles are 32px, publication topic headings 22px, and the full research title 34px with line-height 1.12.

**The Two Titles Rule.** A short publication topic may aid scanning, but keep the original scholarly title visibly readable in the adjacent text block.

## Layout

Desktop uses a fixed navy left identity rail and a padded main column. The rail is 200px wide by default, 170px at 1150px and below, and 240px from 1800px. Main and footer offsets follow that width. The main container caps at 1700px, with the fluid page inset token; the inset becomes 32px below 1150px, 28px below 850px, and 20px below 600px.

The homepage hero uses an asymmetric .43fr / .57fr grid with a fluid 28–48px column gap and no minimum viewport height. The first name line spans the grid; Daniel occupies the left side while the real Victoria Harbour dusk photograph begins below the first line on the right. The positioning statement, introduction, and grouped work/contact actions sit beneath Daniel. The availability note spans the bottom row. The photograph stays inside the hero with a location caption, a link to its uncropped panorama, and a native credit disclosure; visible text does not overlay it. The downloaded panorama is 1280×508px, photographed by Dllu from Victoria Peak and licensed CC BY-SA 4.0. The source-file and license links remain in the credit disclosure.

Hero top padding is 48px on the default desktop layout, 36px between 851px and 1150px, and 32px at 850px and below. At 600px and below it becomes a single column with 30px top padding, ordered name, introduction/actions, photograph, availability note. The image frame uses a 1.34 aspect ratio by default, 1.22 at 850px and below, and 1.48 at 600px and below. Crops apply only to photographs and contextual thumbnails. Scientific evidence remains contained and legible.

Reading chapters extend to the main column's outer edges using negative page insets and restore the same inset around their contents. They use equal top and bottom section padding, reduced at the tablet and phone breakpoints using the section spacing tokens. The homepage sequence is white introduction, pale blue selected work, white publications, pale blue about, white research, pale blue news, white experience, pale blue education/skills, and navy contact. The hero has its own bottom spacing token. Contact retains its existing 80px top inset, reduced to 56px on phones. The white evidence browser and news disclosure remain distinct within pale chapters.

Project features use asymmetric image/text columns and fluid 32–64px gaps. The first research figure is sticky at a 36px top offset on desktop and becomes static below 850px. The dark simulation project extends to the content column's outer edges using negative page insets.

The evidence browser uses a 1.25fr / 1fr figure-and-copy split; below 1150px the figure moves above a two-column text region, and below 600px the copy becomes a simple stack. Publication rows use .68fr / 1fr columns. About uses 1.15fr / .8fr columns, research themes use two columns, and the desktop timeline separates date, position, and description. These arrangements collapse to one reading column on small screens. Photo pairings retain deliberate size differences. In the dark project above 600px, the title occupies the first row of the left column and its factual context sits directly beneath it; narrative and resources occupy the right column.

At 850px and below the rail becomes a sticky navy top header with a compact portrait, identity, and a Menu control. With JavaScript the navy navigation drawer spans the full header width immediately below the 76px header and overlays the reading surface without moving it; it scrolls within the remaining dynamic viewport height. Its absolute positioning is relative to the full rail inner container. A translucent navy backdrop dismisses the drawer. The navigation uses three columns, reduced to two below 600px; the CV and contact links appear beneath it. Without JavaScript, the mobile header is in normal flow and navigation stays visible. Anchor scrolling reserves 28px on desktop and 108px in the mobile-header layout.

The manipulation detail page shares the navy rail, page insets, type, and chapter padding. Outcomes and evidence use pale blue full-width fields between white chapters. Its hero stacks the full title and video; a navy three-metric band follows, with the hero-bottom spacing token separating it from the next chapter. Two-column conclusions and scope layouts collapse below 1100px; method and evidence grids collapse below 600px.

## Elevation & Depth

The reading system is flat. White, pale blue, soft-neutral, and navy fields, image scale, and whitespace provide hierarchy. There are no routine card shadows, gradients, decorative grids, or 3D effects in the implementation. A light structural shadow and translucent backdrop separate the open mobile navigation drawer from the reading surface.

### Shadow Vocabulary

- **Mobile navigation drawer:** 0 20px 28px #1f2b4d0d. It separates the anchored overlay from the document while the small-screen menu is open; its backdrop uses #1f2b4d24.

**The Flat Evidence Rule.** Scientific figures and ordinary content containers rely on a tonal surround and spacing; do not add decorative elevation to the evidence.

## Shapes

Surfaces and controls use square corners. Photography and scientific graphics remain rectangular, with no ornamental clipping. The compact identity portrait is a 44×52px crop on desktop and 36×44px in the mobile header; the larger about portrait uses a 4:5 crop.

The scripted current-navigation marker is a small 6px square; the source-only current-link fallback is 5px. Native disclosures use a typographic plus that rotates 45 degrees when open. The unfilled photograph-credit disclosure omits that mark. Thin stroked inline SVG arrows accompany actions; the shared icon vocabulary uses a 1.5px stroke with round caps and joins.

## Components

### Filled actions and text links

Filled reading-column actions use the button token, a square silhouette, an inline arrow, and a 16px icon gap. The rail CV action spans its available width and uses the more compact cv-link padding, paper fill, and navy text. Pointer hover changes reading-column filled actions to Simulation Night and the rail CV action to Chapter Blue; press scales buttons and these action links to .97 over the observed short transition.

Text links use a quiet inline arrow and no resting underline. On fine-pointer hover their text receives an orange 2px underline and the arrow shifts 2px right and up. Publication resource links retain their orange underline at rest.

### Navigation and mobile header

Default links use Rail Mist on the navy ground, with the navigation-link padding. Inactive links gain Rail Hover fill and paper text on fine-pointer hover; current-location links use paper fill, navy text, weight 700, and the orange square at the left. The filled destination, weight, and marker reinforce chapter identity alongside color. The active link follows section position using a reading line 35% into the visible viewport, capped at 320px on desktop and 240px in the mobile layout; the final item becomes current near the document bottom. With JavaScript the single square travels to the current link over 220ms; keyboard input moves it immediately.

Menu is a square, text-and-plus control with at least a 44px target height. Opening reveals the anchored navigation and rail actions and rotates the plus 45 degrees. Pointer opening fades and moves the drawer from 10px above over 220ms, with a 180ms backdrop fade; closing fades both over 100ms. Repeated toggles cancel the prior animations and apply the latest state. Closed controls become inert immediately. Escape closes the menu and returns focus to the toggle; it also closes after an outside click, focus leaves the rail, a link is chosen, or the viewport crosses into desktop width. Keyboard and reduced-motion operation settle immediately. The menu remains a disclosure with ordinary document focus behavior.

### Disclosures

Soft-neutral surfaces use disclosure padding. Summary text is 14px and weight 500, with a minimum 24px internal summary height and a rotating plus aligned at the right. The global visible focus outline gains an 8px offset on summaries. Open body copy is 14px with line-height 1.65. Pointer opening settles newly visible body content from 4px below and .4 opacity over 180ms; keyboard and reduced-motion openings are immediate. Dark-project disclosures use the reversed surface and white text. The photograph-credit disclosure is deliberately unfilled and omits the plus.

### Evidence browser

A white surface within the pale selected-work chapter groups the introductory heading, evidence controls, a scientific figure, and its explanation. Controls are square, borderless, at least 44px high, and wrap when necessary. Selection reverses to paper text on navy; an unselected pointer hover uses the control-hover fill. Preserve a visible focus outline on both controls and the active panel.

JavaScript assigns tab semantics and one tab stop to the active control. Left/Right wrap between views; Home/End select the first/last. Keyboard activation changes the view immediately. Pointer activation uses a native View Transition for the evidence browser: the outgoing view fades over 100ms and the incoming view settles from 8px below over 240ms. Rapid changes skip obsolete snapshots and keep the latest selection. Browsers without this API apply the state immediately and settle the new panel from 4px below and .6 opacity over 180ms. Reduced motion skips either transition. Without JavaScript the selector is hidden and all three evidence panels remain readable.

### Project and publication records

Project records pair actual media with a topic heading, context, narrative, measured outcomes, links, and optional scope disclosure. The scientific feature uses a contained soft-neutral surround; the industrial feature uses two differently sized photographs; the simulation feature uses the dark field and a native video. Avoid flattening these distinct media into identical cards.

Publication imagery sits in a fixed-height contained thumbnail field rather than cropping the scientific illustration. Topic headings and full paper titles have separate roles, as described under Typography. Metadata and authors remain smaller than the title and summary.

### Research figures, video, and result band

Detail-page figures use square neutral surrounds, contain the original scientific image, and keep captions adjacent. Grid thumbnails use a 1.45 aspect-ratio region with object-fit: contain; opening the image link exposes its source resolution. The metric band is a square navy field with three equal columns, becoming a vertical stack on mobile.

Videos use native controls, preload none, a real recorded poster, and no autoplay. Keep the scope caption beside each recording. Do not substitute a decorative animation or 3D robot for experimental evidence.

### Contact field

A full-width navy closing field carries a large invitation, email, supporting links, and the oversized name. Email remains a direct mail link. The copy control appears only when the clipboard API is available; its success or fallback message has a reserved status line and polite live announcement. Reversed interactive items use the orange focus outline.

### Motion and accessibility

The bounded hero entrance starts on load: each name line rises from 28% below and .3 opacity over 700ms, with a 70ms second-line delay. The image frame opens from an 18% bottom inset while rising 12px from .6 opacity over 680ms after a 100ms delay. The longest total is 780ms. These transitions use cubic-bezier(.22, 1, .36, 1). Content starts visible in the source and has no repeated intersection-triggered reveals. Fine-pointer hover enlarges the hero photograph to 1.025 over 700ms inside its clipped frame.

Same-origin page navigation progressively uses cross-document View Transitions: the identity rail remains stable while the outgoing reading surface fades over 100ms and the incoming surface settles from 8px below over 220ms. Unsupported browsers navigate normally. Keyboard navigation and reduced motion skip that transition; a page reveal with a native transition cancels the load entrance to avoid overlapping choreography. The shared layout/motion stylesheet is loaded by the homepage and the manipulation detail page.

State transitions remain short: arrow movement 180ms, action press 140ms, disclosure/menu plus rotation 160ms, and surface/color changes 180ms. Reduced-motion preference skips scripted entrances and state animations, disables native View Transitions, makes CSS animations/transitions effectively immediate, and changes scrolling to automatic. Changing the preference during an interaction cancels active animations and settles the menu. Content remains readable in the same order with reduced motion or no JavaScript.

## Do's and Don'ts

### Do:

- **Do** use self-hosted Chivo and the documented size hierarchy, preserving readable body and metadata text.
- **Do** use the fixed identity rail on desktop and the disclosed top navigation on small screens.
- **Do** preserve navy focus outlines on light surfaces and orange outlines in the navy rail, dark project, and contact fields.
- **Do** keep the navy navigation ground continuous across desktop rail, mobile header, and full-width drawer, with a paper current destination and reversed CV action.
- **Do** separate reading chapters with the documented white and pale blue fields and equal top/bottom chapter padding.
- **Do** pair every scientific figure, metric, and recording with its visible scope and caption.
- **Do** retain original paper titles as visible paragraphs below concise publication topic headings.
- **Do** preserve native video controls, manual playback, and reduced-motion behavior.
- **Do** use real portrait, Hong Kong, industrial, and scientific assets with their existing attribution and meaning.

### Don't:

- **Don't** expand orange into large decorative backgrounds or replace the navy primary action.
- **Don't** turn the asymmetric project sequence into a repeated rounded-card grid.
- **Don't** crop scientific evidence for a photographic effect or detach it from its experimental context.
- **Don't** add gradients, decorative grids, 3D effects, synthetic evidence, or invented personal photographs.
- **Don't** add routine card shadows; the existing shadow belongs to the anchored mobile navigation drawer.
- **Don't** make essential text, navigation, or evidence depend on JavaScript or entrance motion.
