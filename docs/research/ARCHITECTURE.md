# Current implementation architecture

## Runtime composition

The project is a single-page Next.js App Router application:

```text
src/app/layout.tsx
  └── src/app/page.tsx
        └── ListingPage
              └── ListingUIProvider
                    ├── PageContent
                    │     ├── SiteHeader
                    │     ├── StickyNav
                    │     └── listing sections and booking sidebar
                    ├── PhotoTourModal
                    ├── Lightbox
                    ├── AmenitiesModal
                    └── Toast
```

`layout.tsx` loads the local font, global CSS, metadata, and favicon. The root route renders `ListingPage`, which composes the header, sticky navigation, listing content, booking sidebar, and shared overlays. Sections and feature dialogs are implemented as focused components under `src/components/listing/`.

## State ownership

- `ListingUIProvider` owns cross-section state and actions: photo-tour visibility and target room, listing/custom-image lightbox state, amenities visibility, reservation requests from the sticky navigation, toast messages, Saved state, and Share behavior. Consumers use the typed `useListingUI()` hook; using it outside the provider throws an error.
- Feature-local interactions keep state near their UI. The header owns search selections, header menu, login, and language/currency dialog state. The booking card owns date and guest controls, offer claiming, and the reservation review/confirmation state. The host section owns whether its message dialog is open.
- Search submission writes selected filters to the current URL. The photo tour uses `?modal=PHOTO_TOUR_SCROLLABLE` to support its deep link. Neither behavior calls a search or booking API.
- Host-message submissions are appended in this browser's `localStorage` under `airbnb-clone-host-messages`. No message is sent over a network.
- Listing content, destination suggestions, photo-tour images, and nearby stays are local/static data; images are served from `public/images/listing/`.

## Shared overlay behavior

The provider tracks focus triggers for the photo tour, lightbox, and amenities modal. It coordinates their close actions, Escape handling, and body-scroll locking. `PageContent` becomes inert while one of those page-level overlays is open; `useDialogFocus` moves focus into a dialog and traps Tab navigation. Feature dialogs implement their own close and focus-return wiring.

The `Toast` component displays provider messages in a polite live region. The provider dismisses each message after 2.2 seconds. The Saved state is in memory only; it does not persist to an account or storage.

## Styling and data

Tailwind CSS v4 utilities and tokens in `src/app/globals.css` implement the page styling and responsive breakpoints. `src/components/listing/data.ts` centralizes shared listing text and photo-tour/gallery data; `src/types/listing.ts` contains shared listing types. `src/hooks/useDialogFocus.ts` provides keyboard focus handling for dialogs.

## Service boundary

There is no application API or database. Reservation confirmation, sign-in, provider buttons, search, offer redemption, and host messaging are interface demonstrations only. See the root README's [demo scope and limitations](../../README.md#demo-scope-and-limitations).
