# LoginModal Specification

## Overview

- **Target file:** `src/components/listing/LoginModal.tsx`
- **Entry points:** globe/account control and "Log in or sign up" in the header menu.
- **Purpose:** compact login/sign-up interface demonstration; it is not connected to an identity provider.

## Current clone behavior

- The dialog requests a phone number or email. The required field and Continue button provide form behavior, but submitting displays a clear notice that sign-in is not connected; no account or message is sent.
- Google and Apple controls display provider-specific demo notices. They do not start OAuth or contact those providers.
- The close button, backdrop click, and Escape dismiss the dialog. Focus moves into the dialog, Tab is trapped there, and closing returns focus to the initiating account control.
- At desktop sizes the dialog is capped at 504px wide and has a 512px minimum height; it adapts on narrow viewports.
- The status message uses a polite live region. No credentials are stored.

## Accessibility and service boundary

The dialog has `role="dialog"`, `aria-modal="true"`, and a heading label. `useDialogFocus` handles initial focus and keyboard trapping. Authentication, account persistence, and third-party sign-in are unimplemented.
