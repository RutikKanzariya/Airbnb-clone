# Airbnb Listing Clone

A pixel-accurate rebuild of an Airbnb listing page, **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"**, in Next.js 16, React 19 and Tailwind CSS v4.

Reference page: https://airbnb-clone-umber-two.vercel.app/

## Features

- **Listing page:** header with search pill, title with Share/Save, a 5-photo hero grid, overview, "Where you'll sleep", amenities, a two-month availability calendar, a sticky booking card, reviews with rating breakdown, a location map, host profile, "Things to know" and a "More stays nearby" carousel.
- **Sticky section nav:** appears once you scroll past the photos and underlines the section in view (Photos / Amenities / Reviews / Location).
- **Photo tour:** 9 rooms and 43 photos, with category thumbnails and sticky room titles. Opens from the gallery and is linkable at `/?modal=PHOTO_TOUR_SCROLLABLE`.
- **Photo viewing:** full-screen viewer with a room title, photo counter, previous/next buttons and arrow-key navigation. It opens from the hero gallery, bedroom/living-room cards and the nearby-stays carousel.
- **Amenities modal:** all 12 groups, including items marked unavailable.
- **Search controls:** destination suggestions, date selection and guest counters. Applying a search updates the URL with the selected filters.
- **Booking flow:** check-in and checkout dates and guest totals can be changed in the booking card. The displayed stay length and estimated total update with the dates. Both the booking-card and sticky-nav Reserve buttons open a reservation review and confirmation.
- **Host and account dialogs:** the host section opens a message composer; the header account control opens a login/sign-up dialog; the language-and-currency menu opens a tabbed preferences dialog.
- **Surprise offer:** open and claim the 10% stay offer from the booking card.
- **Other interactions:** the calendar pages through months and lets you select or clear dates. "Show more" expands long text, the carousel pages, Share copies the link and Save toggles, with a toast for each.
- **Hamburger menu:** links to language and currency preferences, Help Centre, hosting, referrals, co-hosting and login/sign-up.
- **Responsive:** desktop-first breakpoints at 1128px and 743px, matching the reference.
- **Accessible:**
  - keyboard focus ring (keyboard only)
  - dialogs that move, trap and return focus, with the page behind made inert
  - keyboard-operable calendar, and ARIA state on toggles
  - `prefers-reduced-motion` honoured, including JS-driven scrolling

## Demo scope and limitations

This is an independent, front-end Airbnb-inspired clone for demonstration and learning. It is not affiliated with Airbnb and does not connect to Airbnb or any live travel service. Listing details, availability, prices, and search suggestions are sample UI data; no live inventory is queried.

- **Search:** selected destinations, dates, and guests are reflected in the URL, but are not sent to a listings service.
- **Booking:** the page calculates and displays an estimated total from the selected dates. Reserve opens a local review and confirmation flow; it does not check real availability, create a reservation, or charge a payment method.
- **Host messages:** submitted messages are saved in this browser's local storage for demonstration and are not sent to a host.
- **Login:** the login and Google/Apple controls demonstrate the interface only. No account is created and authentication is not connected.
- **Surprise offer:** the demo displays code `STAY10` for 10% off, but the code is not validated or redeemable through a booking service.
- **Language and currency:** choices demonstrate the preferences interface; they are not connected to an account or used to convert prices.

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server on port 5000 |
| `npm run build` / `npm start` | Production build / server on port 5000 |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run check` | Lint, typecheck and build together |

## Project structure

```
airbnb-clone/
├── src/
│   ├── app/                         # Next.js routes, layout, metadata and global styles
│   ├── components/listing/          # listing page, sections, search, booking and dialogs
│   ├── hooks/useDialogFocus.ts      # accessible dialog focus management
│   └── types/listing.ts             # shared listing types
├── public/
│   ├── images/listing/              # 68 listing and nearby-stay images
│   └── faviconimage.webp            # browser tab icon
├── docs/
│   ├── research/
│   │   ├── README.md                # research index and component-spec guide
│   │   ├── ARCHITECTURE.md          # current app structure and state ownership
│   │   ├── PAGE_TOPOLOGY.md         # reference layout and clone composition
│   │   ├── BEHAVIORS.md             # captured behavior plus clone-specific additions
│   │   └── components/              # visual and interaction specs
│   ├── design-references/
│   │   ├── README.md                # screenshot provenance and naming
│   │   └── sections/                # desktop/mobile reference screenshots
│   └── reviews/                     # retained code-review report
├── tools/                           # extraction and QA scripts; see tools/README.md
├── .agents/skills/                  # website-cloning skill
├── .claude/agents/                  # agent definitions
├── package.json                     # scripts, dependencies and project metadata
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # project overview and setup instructions
```

The page is assembled in `src/components/listing/ListingPage.tsx`. Shared interface state and overlays are managed by `ListingUIProvider.tsx`; individual files in the same folder implement the page sections and interactions.

## Architecture

The app uses the Next.js App Router with a single listing route. The main render and interaction flow is:

```text
src/app/layout.tsx
  └── src/app/page.tsx
        └── ListingPage
              ├── ListingUIProvider
              │     ├── PageContent (page content and shared header)
              │     ├── listing sections (gallery, details, booking, reviews, etc.)
              │     └── shared overlays (photo tour, lightbox, amenities, toast)
              └── section-level dialogs and controls
```

- **App shell:** `layout.tsx` loads the local Airbnb Cereal variable font, global styles, page metadata, and favicon. `page.tsx` maps the root route to `ListingPage`.
- **Composition:** `ListingPage.tsx` lays out the header, sticky navigation, listing sections, booking sidebar, and page-level overlays. Each section is a focused component in `src/components/listing/`; shared listing and photo-tour content is defined in `data.ts`.
- **Client interactions:** interactive components opt into React client rendering where they need state, browser APIs, or event handlers. Search and booking controls keep their working selections in component state. Search submission writes filters to the URL; opening the photo tour also uses its documented `modal` query parameter.
- **Shared UI state:** `ListingUIProvider` exposes a typed context through `useListingUI` for cross-section actions such as opening photo views and amenities, requesting a reservation review, toggling Saved, and showing toasts. It also coordinates shared overlay behavior, including Escape handling, background scroll locking, and returning focus to the element that opened an overlay.
- **Local demo state:** dialogs and flows that are confined to one feature manage their state in that feature's component. The host-message form stores its demo messages in browser `localStorage`; there is no remote API or backend.
- **Presentation and assets:** Tailwind CSS v4 and the global design tokens in `globals.css` provide styling. Listing images are served from `public/images/listing/`, while listing text, image paths, and photo-tour room data live in `data.ts`.
- **Accessibility helpers:** `useDialogFocus` provides dialog focus management; the shared provider and dialog components handle focus restoration, keyboard dismissal, and background inertness for overlays.

## AI workflow artifacts

| Path | What it is |
|---|---|
| `.agents/skills/clone-website/` | The cloning **skill** that drove the build (from the starter template, © JCodesMore, MIT). `.claude/commands/clone-website.md` is the Claude Code slash-command bridge to it. |
| `.claude/agents/section-builder.md` | **Sub-agent:** builds components from their specs. 8 ran in parallel. |
| `.claude/agents/code-reviewer.md` | **Sub-agent:** reviews correctness, structure and accessibility. Report and resolutions: `docs/reviews/code-review.md`. |
| `.claude/agents/visual-qa.md` | **Sub-agent:** defines the visual and interaction QA workflow used during the build. No standalone visual-QA report is retained in `docs/reviews/`. |
| `tools/` | Extraction and QA scripts the agents wrote and ran (Playwright + Pillow). See `tools/README.md`. |
| `docs/research/` | Page topology, behaviour notes and the 18 component specs the builders worked from. |
| `docs/PROMPTS.md` | The prompt sequence used during development. |

## How it was built

I built this with AI coding agents (Claude Code), directing them through each stage:

1. **Capture.** The reference sits behind Vercel's bot checkpoint, which blocks automated browsers. So I saved the page (and its open photo-tour state) with SingleFile and took full-page screenshots.
2. **Extraction.** An agent rendered the saved pages in headless Chromium (Playwright) and recovered:
   - the embedded images and variable font
   - the original stylesheet, including hover, active, transition and breakpoint rules
   - the DOM content and the measured size of every element at 1440px and 390px
3. **Specs.** Each section got a spec file in `docs/research/components/` holding the exact CSS, markup, sizes and behaviours. Interactions the saved page couldn't show, because its JavaScript was stripped, are marked as inferred in `docs/research/BEHAVIORS.md`.
4. **Foundation.** Design tokens, the font, shared icons, typed data and the shared UI-state provider were written before any sections.
5. **Parallel build.** 8 agents built the 18 components at the same time, each working from its own spec and verifying with `tsc` and ESLint.
6. **Visual QA.** The finished page was screenshotted and diffed pixel-by-pixel against the reference at 1440px and 390px. Page heights match exactly (6259px and 8675px), and the remaining differences were fixed, such as line-height quirks in the photo tour.
7. **Review and accessibility.** The `code-reviewer` sub-agent audited the code. Its accessibility findings were fixed without changing what a mouse user sees:
   - keyboard-only focus ring
   - keyboard-operable calendar days
   - modal dialogs that move, trap and return focus, with an `inert` background
   - ARIA state on toggles
   - reduced-motion-aware scrolling

   The `visual-qa` sub-agent then re-verified fidelity and behaviour.

## Notes

- The project started from an MIT-licensed Next.js + shadcn/ui starter scaffold (© JCodesMore). All listing code, assets, research and documentation are specific to this project. See `LICENSE`.
- Photos, the Airbnb name and logo, and the Airbnb Cereal font belong to their respective owners and are used here for educational purposes only.
