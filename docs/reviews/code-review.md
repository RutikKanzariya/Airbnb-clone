# Code review: original implementation report

## Scope and context

- **Reviewer:** `code-reviewer` sub-agent, configured in `.claude/agents/code-reviewer.md`.
- **Review scope:** one review of `src/` before the accessibility pass and before later search, booking, login, language/currency, and host-message features were added.
- **Interpretation:** findings below describe that review snapshot. This report records the review and its follow-up resolutions; it is not a fresh audit of the current application.

## Verification recorded at review time

- `npm run typecheck` passed.
- `npx eslint src` passed.
- At first, `npm run lint` reported 24 `@typescript-eslint/no-require-imports` errors in `tools/*.js`, not in `src/`. An ESLint override for the CommonJS tool scripts was recorded as the fix. The original report did not record a post-fix rerun of `npm run lint`.

## Findings and outcomes

| Severity | Finding from the review | Recorded outcome |
|---|---|---|
| High | `globals.css` removed all focus outlines, leaving keyboard focus invisible. | **Resolved:** added a keyboard-only `:focus-visible` outline, with an inset treatment for clipped, rounded tiles. |
| High | `AvailabilityCalendar.tsx` used clickable `<div>` elements without keyboard operation or exposed state. | **Resolved:** calendar days became buttons with disabled state, `aria-pressed`, descriptive labels, and month groups. |
| High | `PhotoTourModal`, `Lightbox`, and `AmenitiesModal` did not move, trap, or restore focus, and the background remained interactive. | **Resolved:** added dialog focus handling and inert background content. Trigger elements are recorded before inertness blurs them; the lightbox coordinates with the tour's focus trap. |
| Medium | Closed dialogs used `aria-hidden` and `invisible` without `inert`. | **Resolved:** closed dialogs and covered page content were made inert, including the tour beneath the lightbox. |
| Medium | Description Show more/less did not expose expanded state or controlled content. | **Resolved:** added `aria-expanded` and `aria-controls`. |
| Medium | The photo-tour Save control did not expose pressed state. | **Resolved:** added `aria-pressed`. |
| Medium | JavaScript smooth scrolling ignored `prefers-reduced-motion`. | **Resolved:** added a shared `scrollBehavior()` helper and used it for the sticky navigation and photo tour. |
| Medium | Reduced-motion CSS did not include pseudo-elements. | **Resolved:** extended the selector to `*, *::before, *::after`. |
| Medium | Some Tailwind v4 scale/translate utilities were not covered by `transition: transform`. | **Partially addressed:** the report records fixes in ListingTitle, PhotoGallery, BookingSidebar, and AmenitiesPreview. AmenitiesModal was left unchanged because its transition included `scale` and the reviewer considered `transition-transform` sufficient for `translate`; that rationale was not independently revalidated in this report. |
| Medium | Share reported success even when clipboard writing failed. | **Resolved:** clipboard failure now produces an error toast. |
| Low | Repeating the same toast may not trigger a fresh live-region announcement. | **Deferred:** recorded as low impact; repeated identical announcements were not reworked. |
| Low | The toast timeout was not cleared on unmount. | **Resolved:** the provider clears its timer during cleanup. |
| Low | Save changed its visible label while also exposing `aria-pressed`. | **Resolved:** the accessible label was made stable (`Save`). |
| Low | The sticky-nav active link lacked `aria-current`, and the hidden bar could retain focus. | **Resolved:** active-link state and inertness while hidden were added. |
| Low | Rating bars had no text alternative. | **Resolved:** added an image role and descriptive accessible label. |
| Low | Decorative laurel and wordmark SVGs were not marked decorative. | **Resolved:** added `aria-hidden`. |
| Low | Placeholder `href="#"` links could jump the page to the top. | **Retained:** left in place for reference behavior parity; they remain a known limitation of the prototype. |
| Low | Several SVGs, helpers, and button class strings were duplicated. | **Deferred:** considered a refactoring concern without user-facing impact. |
| Build/tooling | CommonJS scripts in `tools/*.js` triggered lint's `no-require-imports` rule. | **Resolved in configuration:** added an ESLint override for the tool scripts; a post-fix full lint result was not captured in the original report. |

## Review conclusion

The review initially identified keyboard accessibility gaps, especially focus visibility, calendar keyboard operation, and modal focus management. The recorded accessibility pass addressed those high-severity findings. A repeated-toast announcement, placeholder links, and helper duplication were explicitly deferred or retained. Later-added feature flows were outside the scope of this review and are documented separately in [`../research/README.md`](../research/README.md).
