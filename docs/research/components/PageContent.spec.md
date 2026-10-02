# PageContent Specification

## Overview

- **Target file:** `src/components/listing/PageContent.tsx`
- **Parent:** `ListingPage`, inside `ListingUIProvider`.
- **Purpose:** wrap the header and listing content so page-level overlays can temporarily remove their background from interaction and assistive-technology navigation.

## Current clone behavior

- Reads `tourOpen`, `lightboxOpen`, and `amenitiesOpen` from `useListingUI()`.
- Sets the wrapper's native `inert` attribute while any of those page-level overlays is open; removes it when all three are closed.
- Does not own overlay state, render a dialog, or make feature-local header/booking/host dialogs inert. Those dialogs manage their own focus and dismissal behavior.

## Accessibility

Using `inert` complements dialog focus management by preventing interaction with the covered page content while the shared photo-tour, lightbox, or amenities overlay is active.
