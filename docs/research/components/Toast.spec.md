# Toast Specification

## Overview

- **Target file:** `src/components/listing/Toast.tsx`
- **State owner:** `ListingUIProvider`.
- **Purpose:** transient feedback for shared listing actions.

## Current clone behavior

- Displays the latest provider message in a fixed, bottom-center toast with opacity/position transitions.
- The provider clears the toast after 2.2 seconds and cancels its timer when unmounted. `Toast` keeps the last message rendered while it fades out.
- The toast is a `role="status"` polite live region and does not capture pointer input.
- Current messages include Saved/removed, successful or failed link copy, offer claim confirmation, search feedback, and menu action feedback.

## Accessibility

The polite live region announces status without moving focus. Repeating an identical toast message while it is already announced may not cause a new screen-reader announcement.
