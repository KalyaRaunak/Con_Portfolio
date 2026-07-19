# Converge — Agency Portfolio Website
## Product Specification Document

**Version:** 1.0
**Purpose:** Complete build specification for an AI website builder or development team. No further clarification should be required to implement this end-to-end.

---

## 1. Design Philosophy

Converge is not a SaaS product and not a startup. It is a creative agency, and the site must read like the work of people who obsess over craft — the kind of studio that would show up in an Awwwards "Site of the Day" feed, not a Product Hunt launch.

The guiding idea: **typography and space are the design.** There is no hero image, no illustration, no stock photography doing the emotional work. Every visual decision — a huge headline, a slow reveal, a tight grid — exists to make the words and the case studies feel considered. If a section could be mistaken for a generic template, it has failed the brief.

Three words govern every decision on this site: **editorial, restrained, deliberate.**

- **Editorial** — layouts borrow from print magazines: split columns, huge type, generous margins, alternating rhythm.
- **Restrained** — one accent color, one motion language, no decorative noise. Boldness is spent in a few specific places, not spread evenly.
- **Deliberate** — nothing is default. Numbering, dividers, and labels only appear where they encode real information (a real step order, a real project count) — never as decoration.

---

## 2. Visual Language

- No gradients as backgrounds or fills. The only permitted "glow" is the single blurred oversized wordmark behind the hero headline — a signature moment, not a repeated effect.
- No glassmorphism, no neumorphism, no soft-UI card shadows.
- No SaaS-style feature cards with icon-in-a-circle + heading + paragraph.
- No startup illustrations, no 3D blob shapes, no abstract mesh art.
- Photography (project imagery) is the only imagery on the page. It is always full-bleed or large-format, never thumbnail-sized in a grid of icons.
- Borders are hairline (1px, `rgba(255,255,255,.08)`), used to divide sections and columns — never to draw boxes around content.
- Corners: images and media containers use a 20–28px radius. Buttons and UI chrome stay sharp or use a minimal pill shape — never match the image radius, so images read as "objects" and UI reads as "interface."

---

## 3. Color System

| Token | Hex / Value | Usage |
|---|---|---|
| `--bg` | `#0F0F10` | Page background |
| `--surface` | `#171717` | Elevated panels, alternate section backgrounds, cards |
| `--text-primary` | `#F5F5F5` | Headlines, primary copy |
| `--text-secondary` | `#A1A1AA` | Supporting copy, captions, meta labels |
| `--accent` | `#EA580C` | CTAs, hover states, the hero glow, active filter states, links on hover |
| `--border` | `rgba(255,255,255,.08)` | Dividers, hairlines, input borders |

**Rules:**
- Accent orange is used sparingly — CTAs, one hover state per interaction, the hero glow, active nav/filter indicators. It should never fill a large surface area (no orange section backgrounds, no orange buttons-as-blocks by default — use it as an outline/text/underline treatment first, filled only on hover or for the single primary CTA).
- Secondary text (`#A1A1AA`) is used for anything that is not the main message: eyebrows, dates, service tags, captions.
- Surface (`#171717`) is reserved for sections that need to visually step forward from the base background — testimonial, footer, project cards.

---

## 4. Typography System

**Display / Heading:** Anton (fallback: "Neue Haas Grotesk Display", Helvetica Neue, Arial, sans-serif)
**Body:** Inter

**Type scale (desktop):**

| Role | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| Hero headline | 9–12vw (clamp ~96px–180px) | Anton, uppercase | 0.9 | -0.01em |
| Section headline (H2) | clamp(40px, 6vw, 88px) | Anton, uppercase | 0.95 | -0.01em |
| Card / project title | clamp(28px, 3.5vw, 48px) | Anton, uppercase | 1.0 | normal |
| Eyebrow / label | 13px | Inter Medium, uppercase | 1.2 | 0.12em |
| Body large | 20–24px | Inter Regular | 1.5 | normal |
| Body default | 16–18px | Inter Regular | 1.6 | normal |
| Caption / meta | 13–14px | Inter Regular, `--text-secondary` | 1.4 | 0.02em |

**Rules:**
- Uppercase is reserved for display type (headlines, eyebrows, nav, buttons). Body paragraphs are always sentence case for readability.
- Every heading uses tight, negative letter-spacing at large sizes to keep Anton feeling dense and confident rather than loose.
- Eyebrows (small uppercase labels above a headline, e.g. "OUR WORK", "02 / STRATEGY") use the accent color or `--text-secondary`, never primary white — they are a signal, not a shout.
- No more than 2 typefaces on the page, ever.

---

## 5. Layout Grid & Spacing

- **Grid:** 12-column grid, desktop max content width 1440px, with a 24px gutter. Editorial sections may break the grid intentionally (e.g., a headline that bleeds to the edge) but body copy and cards always align to it.
- **Section padding:** 160px top/bottom on desktop, 96px on tablet, 64px on mobile. This is intentionally generous — whitespace is a feature, not a gap to fill.
- **Spacing scale (base 8px):** 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160px. All margins/paddings snap to this scale — no arbitrary values.
- **Content vs. bleed:** Text content (paragraphs, headlines that aren't full-bleed) is constrained to a readable measure — max 720px for body copy blocks, even inside a wide section.

---

## 6. Component Specifications

### Sticky Navbar
- Fixed, transparent over the hero, transitions to `--surface` with a hairline bottom border after scrolling past the hero.
- Left: CONVERGE wordmark (small, Anton, uppercase). Right: minimal text links (Work, Studio, Contact) + a single outlined "Let's Talk" button.
- On scroll down, navbar hides; on scroll up, it reappears (magnetic, not jumpy — animated with GSAP, ~0.4s ease).

### Animated Menu (mobile / full menu)
- Full-screen takeover, background `--bg`, large stacked Anton links, staggered fade-up entrance (80ms stagger per item).
- Close via large "X" top-right, magnetic on desktop.

### Custom Cursor (desktop only)
- Small dot cursor by default. On hover over interactive elements (links, project cards, buttons), it expands into a soft circle with the word "VIEW" or "DRAG" depending on context, or scales to reveal a project thumbnail preview when hovering the work grid.
- Disabled entirely on touch devices — never simulate a custom cursor on mobile.

### Magnetic Buttons
- Primary buttons ("View Work," "Let's Build Together") have a magnetic pull effect: the button subtly translates toward the cursor within a ~40px radius, springs back on mouse leave. Implemented via GSAP `quickTo`.

### Image Reveal
- Images enter on scroll with a clip-path wipe (bottom-to-top or left-to-right, 0.9–1.2s, `power3.out`) combined with a subtle scale-down from 1.08 to 1.0 — never a plain fade/opacity-only reveal for hero-weight imagery.

### Text Marquee
- Used only for the client logo strip. Infinite, linear, constant-speed loop (no easing) — pauses on hover of an individual logo, not the whole strip.

### Scroll Progress
- Thin 2px accent-colored bar fixed to the top of the viewport, width tied to page scroll percentage.

### Page Transition
- Between "Home ↔ Case Study ↔ Work" navigations: a solid `--bg` panel wipes up from the bottom, wordmark briefly appears centered, then wipes away to reveal the new page. ~0.6–0.8s total.

---

## 7. Animation Specifications (GSAP + Lenis)

**Global setup:**
- Lenis handles all smooth scrolling; GSAP ScrollTrigger is synced to Lenis's `scroll` event (not the native scroll event) so all scroll-triggered animation stays in lockstep with the smooth-scroll easing.
- Respect `prefers-reduced-motion`: when set, disable Lenis smoothing, cut all scroll-triggered transforms to simple opacity fades under 0.3s, and remove parallax/cursor effects entirely.

**Animation vocabulary (used consistently, not invented per-section):**

| Name | Behavior | Where used |
|---|---|---|
| Fade Up | 24–40px translateY + opacity 0→1, `power3.out`, 0.8s | Paragraph blocks, stat numbers, testimonial |
| Split Text Reveal | Headline split into lines/words, each line masked and animated up on a stagger (60–100ms) | Hero headline, section headlines |
| Horizontal Scroll | Pinned section, horizontal translateX driven by vertical scroll progress | Featured Projects (optional alternate to vertical), Category Overview on desktop |
| Image Scale | Image container clips a slightly oversized image (scale 1.15), scale eases to 1.0 as section scrolls through view (parallax-adjacent but tied to scroll progress, not raw scroll speed) | All large project imagery |
| Hover Reveal | Description/metadata hidden, revealed via clip-path or translateY on hover/focus | Category Overview, Work Grid |
| Cursor Interaction | Custom cursor morphs per context | Project cards, buttons |
| Stagger Animation | Children animate in sequence, 60–120ms offset | Stat blocks, timeline steps, filter buttons, footer links |
| Section Transition | Background color/brightness shift as user crosses into a new section (e.g., CTA section brightens slightly) | About → Work boundary, CTA section |
| Sticky Scroll | Section pins while inner content progresses (text changes while image stays, or vice versa) | How We Work timeline, About stats |
| Parallax | Background/foreground layers move at different scroll speeds (subtle, 10–20% offset max) | Hero glow wordmark, section backgrounds |

**Golden rule:** every animation must answer "what does this help the visitor notice?" If it doesn't guide attention to hierarchy (what's the headline, what's the next action, what changed), cut it. Never animate for its own sake, never stack more than 2 effects on one element.

---

## 8. Section-by-Section UX & Copy

### 1. Hero
Full viewport height. No image — typography is the hero.

- Behind the headline: an oversized, heavily blurred "CONVERGE" wordmark in accent orange, low opacity (~15–20%), centered, creating ambient glow rather than legible text. Subtle parallax drift on scroll.
- Headline (Split Text Reveal, staggered by line on load):

```
WE BUILD
DIGITAL
EXPERIENCES
THAT PEOPLE
REMEMBER.
```

- Sub-copy beneath (fade up, 200ms after headline settles):
  *"Converge is a creative studio for brands that refuse to look ordinary — websites, identity, and marketing built with the same obsession we'd want from someone building ours."*
- Primary CTA: **View Work** (magnetic, filled on hover)
- Secondary CTA: **Let's Talk** (text link, underline draws in on hover)
- Scroll cue: small "Scroll" label + thin animated line, bottom of viewport, fades out after first scroll interaction.

### 2. About Converge
Editorial split layout — left column large statement, right column supporting copy + stats, divided by a hairline vertical border on desktop (stacks on mobile).

**Left (large, Anton, ~40px):**
*"We don't sell packages. We build the thing your competitors will screenshot."*

**Right (body copy):**
*"Converge started as a two-person team frustrated with agencies that shipped the same templated site to every client with a different logo pasted on top. We work differently: small enough to obsess over every pixel, senior enough to think past the pixel — into strategy, motion, and the systems that keep a brand consistent long after launch. Every project gets a point of view before it gets a Figma file."*

**Stats (Stagger Animation, count-up on scroll into view):**

| Stat | Label |
|---|---|
| 15+ | Projects Shipped |
| 5+ | Industries Served |
| 100% | Custom Design — Zero Templates |
| — | Fast-Growing Studio |

*(Note: keep "Fast Growing" as a qualitative tag/badge rather than forcing a fake number next to real stats — mixing a real "15+" with an invented growth percentage would undercut credibility.)*

### 3. Client Logo Strip
- Infinite marquee, monochrome (grayscale + reduced opacity ~40%) logos, full color + full opacity on individual hover, continuous linear scroll (no ease, no pause except on hover).
- Sits on `--surface` background to visually separate it as a credibility band between About and Category Overview.

### 4. Category Overview
Large stacked list, one row per category, full-width, hairline dividers between rows. Each row is Anton, large (~64–96px), left-aligned with a right-aligned arrow.

```
Websites               →
Brand Identity         →
AI Creative            →
Performance Marketing  →
Automation             →
UI/UX                  →
```

On hover (desktop): row background shifts to `--surface`, a project thumbnail image slides in from the right, a short description and project count fade in below the category name, arrow rotates 45°. On mobile, this collapses to a tap-to-expand accordion (no hover imagery, since there's no cursor).

### 5. Featured Projects
Large editorial cards, alternating left/right image-to-text placement per project, generous vertical rhythm between them (not a grid — each is its own full-width "spread").

Each project block includes: Project Name, Industry, Services (tag list), Year, a 2–3 sentence case study snippet, and a "Visit Project" link (arrow-suffixed text link, not a boxed button).

**Suggested project set (using your real project names where you have live sites, placeholders where you don't):**

| Project | Industry | Services | Layout note |
|---|---|---|---|
| Nilgiri Co | Food & Beverage | Website Design, Development | Image right, text left |
| Ocean Blue Education | Education | Website Design, Branding | Image left, text right, larger image ratio |
| VNS Hostel | Hospitality | Website Design, UI/UX | Image right, text left, two stacked images |
| Scoopé Ice Cream | Food & Beverage | Branding, Website Design | Image left, full-bleed image, minimal text overlay |
| Velunor Perfume | Retail / Luxury | Branding, AI Creative | Image right, editorial product photography emphasis |
| Gayatri Stitching | Local Business / Services | Website Design, Automation | Image left, text right, simplest layout of the set |

*(Swap in `maheshmasalagruhudhyog.com`, `shreesaiinstitute.in`, and STHEER once those are live and you want real case studies over placeholders — they'd slot in cleanly here with real screenshots.)*

Each card image uses the Image Scale animation on scroll-in; text uses Fade Up.

### 6. All Work — Filter Grid
- Filter bar: All / Website / Branding / AI Creative / Marketing / Automation. Active filter underlined in accent orange; filtering animates the grid with a quick fade+reflow (0.3s), not a jarring reshuffle.
- Grid: 3 columns desktop, 2 tablet, 1 mobile. Each cell: image with dark overlay gradient (bottom-anchored, for text legibility only — not decorative), category badge (top-left, small uppercase pill), project title + service on hover (desktop) or always-visible on mobile (since there's no hover state to rely on).
- Hover: image scales to 1.05, overlay darkens slightly, title/service slide up into view.

### 7. How We Work
Horizontal timeline, pinned section (Sticky Scroll) on desktop — as the user scrolls, a connecting line draws left-to-right and steps activate in sequence. On mobile, this becomes a simple vertical stacked list (pinning/horizontal scroll is a desktop-only technique — don't force it on small viewports).

```
01 Discover   →  02 Strategy  →  03 Design  →  04 Develop  →  05 Launch  →  06 Grow
```

Each step: number, short headline, 1-sentence description, small line-icon. Suggested descriptions:

- **01 Discover** — We learn your business, your users, and what "done well" actually means for you.
- **02 Strategy** — We map the site or campaign to a goal, not a template.
- **03 Design** — Every screen is designed with intent — nothing dropped in from a kit.
- **04 Develop** — Built clean, fast, and built to last past launch day.
- **05 Launch** — Shipped, tested, and handed off without loose ends.
- **06 Grow** — Ongoing marketing, automation, and iteration once it's live.

### 8. Testimonial
Minimal, centered, generous whitespace above and below. Large decorative quotation mark in accent orange (low-opacity, oversized, behind the text — echoing the hero's glow treatment for visual consistency). Client photo optional, small, circular, beside the attribution line — not required if unavailable.

*(Placeholder — replace with a real client quote once you have one on record; don't publish an invented quote attributed to a real client.)*

### 9. CTA
Massive centered typography, background brightens subtly (Section Transition) as this section enters view, with the same low-opacity glow treatment as the hero for bookend consistency.

```
READY TO BUILD
SOMETHING
EXCEPTIONAL?
```

Single large magnetic button: **Let's Build Together** — links to contact / WhatsApp per your standard site pattern.

### 10. Footer
Minimal, `--surface` background. Large CONVERGE wordmark (Anton, huge, low-opacity, bottom-anchored — echoes the hero glow one final time as a closing bookend).

Contents: Email, Instagram, LinkedIn, Location, Copyright line, "Back to Top" button (arrow, scrolls smoothly via Lenis).

Keep your standard persistent WhatsApp floating button active across all pages, including on top of this footer.

---

## 9. Copywriting Guidance

- Never write generic agency filler ("We are a passionate team of creatives dedicated to excellence"). Every sentence should say something only Converge would say, or be cut.
- Use active voice and concrete claims over adjectives: "100% Custom Design" beats "we care about quality."
- Eyebrows and labels are functional, not decorative — "02 / STRATEGY" only appears where it's a real step in a real sequence (the How We Work timeline). Don't scatter numbered labels elsewhere just for texture.
- Keep sentence case for all body copy; reserve uppercase for display type per the typography system above.
- Placeholder content (testimonial quote, unfinished case studies) should be clearly marked as such in code comments so it's never accidentally shipped live.

---

## 10. Accessibility Considerations

- Color contrast: `#F5F5F5` on `#0F0F10` passes AA comfortably; verify `#A1A1AA` on `#0F0F10` and on `#171717` meet at least AA for body-sized text (adjust secondary text lightness up slightly if it fails at small sizes).
- All custom-cursor and hover-reveal interactions must have a keyboard/focus-visible equivalent — hover-only content (category descriptions, work-grid titles) must also appear on `:focus-within` for keyboard users, and always-visible on touch devices.
- Respect `prefers-reduced-motion` globally, as specified in the animation section — this is a requirement, not an enhancement.
- Marquee (client logos) must be pausable and not rely solely on motion to convey information (logos should have `alt` text).
- Maintain a visible focus state (accent-colored outline/underline) on every interactive element — nav links, buttons, filter tabs, project cards.
- Page transitions must not trap keyboard focus or announce incorrectly to screen readers; manage focus to the new page's main heading after each transition.

---

## 11. Responsive Behavior

- **Desktop-first** build, with deliberate (not automatic) breakpoints for tablet and mobile — don't just scale font-sizes down; re-check layout decisions at each breakpoint (e.g., Category Overview hover-reveal becomes tap-to-expand; How We Work horizontal pin becomes a vertical list).
- **Tablet (~768–1024px):** 2-column work grid, reduced section padding (96px), horizontal timeline may remain if space allows or convert to vertical — test both.
- **Mobile (<768px):** 1-column everything, no custom cursor, no horizontal-scroll-pinned sections, section padding drops to 64px, hero headline scales down but stays the dominant element on screen (no image ever substitutes for it).
- No layout shift: reserve space for images (aspect-ratio boxes) before they load; reserve space for marquee/animated elements so their entrance doesn't push content.

---

## 12. Development Notes

- **Stack:** React + Vite + Tailwind CSS, GSAP (+ ScrollTrigger, SplitText if licensed, or a manual split-text approach), Lenis for smooth scroll.
- Define all design tokens (colors, spacing, type scale) as CSS custom properties / Tailwind theme extensions at the top of the build — never hardcode hex values or pixel spacing inline.
- Componentize repeating patterns: `ProjectCard`, `TimelineStep`, `StatBlock`, `FilterButton`, `MagneticButton` — each should accept content as props, not have copy hardcoded into the component.
- Lazy-load all below-the-fold imagery; use responsive `srcset` for project photography given how large it renders.
- Keep JS animation logic centralized (a single GSAP context/timeline setup per section) rather than scattered inline handlers, so ScrollTrigger instances can be cleanly killed/rebuilt on route change (relevant for the page-transition system).

---

## 13. GSAP Implementation Notes

- Initialize Lenis once at the app root; on every `requestAnimationFrame`, call `lenis.raf(time)` and sync it to `ScrollTrigger.update` via `gsap.ticker.add`. Disable GSAP's own lag smoothing (`gsap.ticker.lagSmoothing(0)`) to avoid double-smoothing conflicts with Lenis.
- Use `ScrollTrigger.matchMedia()` to scope desktop-only effects (horizontal pin, custom cursor, parallax) so they never initialize on mobile viewports — don't just hide them with CSS, since that still runs the JS cost.
- For Split Text Reveal, wrap each line in a masked `overflow: hidden` container and animate the inner line's `yPercent` from 100→0 — this avoids layout shift issues that come from animating `opacity` + large `translateY` on unmasked text.
- Use `gsap.quickTo()` for the magnetic button and cursor-follow effects (mousemove-driven), not full tweens recreated on every mousemove event — this is a meaningful performance difference at 60fps.
- Kill and recreate ScrollTrigger instances on route/page transitions to prevent stacked/orphaned triggers; call `ScrollTrigger.refresh()` after any transition completes and images finish loading (since image load can change document height).
- Batch entrance animations for repeating elements (work grid cards, stat blocks) using `ScrollTrigger.batch()` rather than individual triggers per card, for performance on longer grids.

---

*End of specification.*
