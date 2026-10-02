# Research and component specifications

This folder documents both the original listing-page reference and the current clone. The two kinds of notes are intentionally distinguished:

- [`PAGE_TOPOLOGY.md`](PAGE_TOPOLOGY.md) records the reference page hierarchy and the clone's current composition.
- [`BEHAVIORS.md`](BEHAVIORS.md) records behaviors observed or inferred from the saved reference, then lists interactions implemented specifically for the clone.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) is the current source-of-truth for app composition, shared state, and client-side flow boundaries.
- [`components/`](components/) contains section-level visual specs and current interaction notes.

## Component specs

### Listing sections

| Component | Specification |
|---|---|
| Listing title and Save/Share | [`ListingTitle.spec.md`](components/ListingTitle.spec.md) |
| Photo gallery | [`PhotoGallery.spec.md`](components/PhotoGallery.spec.md) |
| Listing overview | [`ListingOverview.spec.md`](components/ListingOverview.spec.md) |
| Description and sleep photos | [`DescriptionAndSleep.spec.md`](components/DescriptionAndSleep.spec.md) |
| Amenities preview and modal | [`AmenitiesPreview.spec.md`](components/AmenitiesPreview.spec.md), [`AmenitiesModal.spec.md`](components/AmenitiesModal.spec.md) |
| Availability calendar | [`AvailabilityCalendar.spec.md`](components/AvailabilityCalendar.spec.md) |
| Booking, offer, and reservation review | [`BookingSidebar.spec.md`](components/BookingSidebar.spec.md) |
| Sticky section navigation | [`StickyNav.spec.md`](components/StickyNav.spec.md) |
| Reviews | [`ReviewsSummary.spec.md`](components/ReviewsSummary.spec.md), [`ReviewsList.spec.md`](components/ReviewsList.spec.md) |
| Location | [`LocationSection.spec.md`](components/LocationSection.spec.md) |
| Host profile and messaging entry point | [`HostSection.spec.md`](components/HostSection.spec.md) |
| Things to know | [`ThingsToKnow.spec.md`](components/ThingsToKnow.spec.md) |
| Nearby stays and photo viewer entry point | [`MoreStaysNearby.spec.md`](components/MoreStaysNearby.spec.md) |

### Header, overlays, and UI infrastructure

| Component | Specification |
|---|---|
| Search, menu, and account entry points | [`SiteHeader.spec.md`](components/SiteHeader.spec.md) |
| Photo tour | [`PhotoTourModal.spec.md`](components/PhotoTourModal.spec.md) |
| Listing and custom-image lightbox | [`Lightbox.spec.md`](components/Lightbox.spec.md) |
| Login and sign-up demo | [`LoginModal.spec.md`](components/LoginModal.spec.md) |
| Language and currency preferences | [`LanguageCurrencyModal.spec.md`](components/LanguageCurrencyModal.spec.md) |
| Host message demo | [`HostMessageModal.spec.md`](components/HostMessageModal.spec.md) |
| Toast notifications | [`Toast.spec.md`](components/Toast.spec.md) |
| Shared UI state and overlay coordination | [`ListingUIProvider.spec.md`](components/ListingUIProvider.spec.md) |
| Background page inertness while page overlays are open | [`PageContent.spec.md`](components/PageContent.spec.md) |

## How to read a component spec

The original CSS, measurements, and markup sections preserve reference-reconstruction evidence. Where the clone implements additional interactions that were not present in the static capture, they are labeled **Current clone additions**. Do not treat an inferred reference behavior as a measured fact, or a demo interaction as a connection to a live service.

The visual screenshots live in [`../../design-references/`](../design-references/README.md). Shared client state is described in [`ARCHITECTURE.md`](ARCHITECTURE.md); feature limits are also summarized in the root [README](../../README.md#demo-scope-and-limitations).
