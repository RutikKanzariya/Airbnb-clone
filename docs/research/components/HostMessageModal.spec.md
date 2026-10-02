# HostMessageModal Specification

## Overview

- **Target file:** `src/components/listing/HostMessageModal.tsx`
- **Entry point:** "Message host" in `HostSection`.
- **Purpose:** local-only host message composer; there is no message delivery backend.

## Current clone behavior

- The composer accepts a message up to 2,000 characters and does not enable submission for empty or whitespace-only text.
- Submitting trims the text and appends a record for "Mirashya Homes" with an ISO timestamp to browser `localStorage` under `airbnb-clone-host-messages`.
- On success, the dialog shows a saved-on-this-device status and the message text. "Write another message" returns to the composer.
- Invalid stored JSON, an unexpected stored value, or a browser storage failure is shown as an explicit error. Unexpected non-storage errors are rethrown rather than reported as success.
- Closing by button, backdrop, or Escape returns focus to the "Message host" trigger. The dialog uses a polite live status for the save confirmation.

## Data shape and service boundary

Stored message records contain `host`, `message`, and `sentAt` string fields. Existing valid records are retained when adding a message. The data stays in the current browser profile; it is not sent to a host, server, or other visitor.
