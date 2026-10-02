# ListingUIProvider Specification

## Overview

- **Target file:** `src/components/listing/ListingUIProvider.tsx`
- **Consumer hook:** `useListingUI()`.
- **Purpose:** typed shared state and actions for interactions that span listing sections.

## Current clone behavior

- Owns photo-tour open state and target room, listing-photo and custom-photo lightbox state, amenities-dialog state, sticky-navigation reservation requests, toast text, and in-memory Saved state.
- Exposes open/close callbacks for overlays, toast display, Saved toggle, and Share. Share copies the current URL when the Clipboard API is available and reports copy failure with a toast.
- Opens the photo-tour deep link from `?modal=PHOTO_TOUR_SCROLLABLE`; opening/closing the tour updates that query parameter.
- Records overlay triggers before making the page inert and restores focus to the trigger when the corresponding overlay closes.
- Locks body scrolling while the photo tour, lightbox, or amenities overlay is open. Escape closes the topmost of those page-level overlays.
- Clears the toast timer when the provider unmounts. Saved state is held in memory and is not persisted.

## Boundaries

Search fields, booking dates and guests, offer claim state, language/currency choice, login, and host-message dialog state belong to their feature components, not this context. `reservationRequest` is an event counter used by `BookingSidebar` to open the shared reservation-review flow; reservation details remain local to the booking component.

The hook throws if called outside `ListingUIProvider`, making incorrect provider wiring explicit.
