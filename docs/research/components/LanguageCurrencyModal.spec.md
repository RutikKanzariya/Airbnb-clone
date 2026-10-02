# LanguageCurrencyModal Specification

## Overview

- **Target file:** `src/components/listing/LanguageCurrencyModal.tsx`
- **Entry point:** "Languages & currency" in the header hamburger menu.
- **Purpose:** demonstrate a language/region and currency preference dialog.

## Current clone behavior

- The dialog presents separate language/region and currency tabs with selectable interface options.
- Selections update the dialog's local UI state. They are not stored in an account, applied as site localization, or used to convert displayed prices.
- The dialog can be dismissed using its close control, the backdrop, or Escape. Focus is managed within the dialog and returned to the menu control when it closes.
- The visual choices are a front-end demonstration; no localization or currency service is called.

## Accessibility and service boundary

The dialog is labeled and keyboard operable. Its interactive tabs and choices expose their selected state. Language and currency preferences are not persisted between visits.
