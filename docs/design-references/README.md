# Design references

This directory keeps visual reference captures used while reconstructing the listing page. It is separate from the running app: these files document the visual baseline and are not loaded by the application.

## Sections

`sections/` contains screenshots with descriptive names and viewport suffixes: `*-desktop.png` for the 1440px captures and `*-mobile.png` for 390px captures. `full-page-desktop.png` and `full-page-mobile.png` show the full reference page. Section names identify their contents, such as `site-header`, `photo-gallery`, `nearby-stays`, or `booking-sidebar`. Captures of overlays include names such as `amenities-modal`, `photo-tour`, and `photo-lightbox`; `photo-tour-scrolled-*` shows the tour after scrolling.

Component specifications in [`../research/components/`](../research/components/) point to the matching screenshots when a direct comparison is useful. The captures represent the reference appearance at capture time and do not show every interactive state added to the clone.

## Provenance

The initial reconstruction used saved page captures and screenshots because the reference site could not be inspected with the automated browser. Original page captures and embedded assets are not required to run the clone; only the retained image references are documented here. Reference-brand imagery and fonts remain the property of their respective owners.
