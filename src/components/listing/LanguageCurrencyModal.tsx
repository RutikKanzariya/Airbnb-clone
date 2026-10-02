"use client";

import { useEffect, useRef, useState } from "react";
import { useDialogFocus } from "@/hooks/useDialogFocus";

type Tab = "language" | "currency";

const LANGUAGES = [
  ["English", "India"],
  ["Azərbaycan dili", "Azərbaycan"],
  ["Bahasa Indonesia", "Indonesia"],
  ["Bosanski", "Bosna i Hercegovina"],
  ["Català", "Espanya"],
  ["Čeština", "Česká republika"],
  ["Crnogorski", "Crna Gora"],
  ["Dansk", "Danmark"],
  ["Deutsch", "Deutschland"],
  ["Deutsch", "Österreich"],
  ["Deutsch", "Schweiz"],
  ["Deutsch", "Luxemburg"],
  ["Eesti", "Eesti"],
  ["English", "Australia"],
  ["English", "Canada"],
  ["English", "Ireland"],
  ["English", "New Zealand"],
  ["English", "Singapore"],
  ["English", "United Arab Emirates"],
  ["English", "United Kingdom"],
  ["हिन्दी", "भारत"],
  ["ಕನ್ನಡ", "ಭಾರತ"],
  ["मराठी", "भारत"],
];

const SUGGESTED_LANGUAGES = [
  ["English", "United States"],
  ["English", "United Kingdom"],
  ["हिन्दी", "भारत"],
  ["ಕನ್ನಡ", "ಭಾರತ"],
  ["मराठी", "भारत"],
];

const CURRENCIES = [
  ["Indian rupee", "INR – ₹"],
  ["Australian dollar", "AUD – $"],
  ["Brazilian real", "BRL – R$"],
  ["Bulgarian lev", "BGN – лв."],
  ["Canadian dollar", "CAD – $"],
  ["Chilean peso", "CLP – $"],
  ["Chinese yuan", "CNY – ¥"],
  ["Colombian peso", "COP – $"],
  ["Costa Rican colon", "CRC – ₡"],
  ["Czech koruna", "CZK – Kč"],
  ["Danish krone", "DKK – kr"],
  ["Egyptian pound", "EGP – ج.م"],
  ["Emirati dirham", "AED – د.إ"],
  ["Euro", "EUR – €"],
  ["Ghanaian cedi", "GHS – GH₵"],
  ["Hong Kong dollar", "HKD – $"],
  ["Hungarian forint", "HUF – Ft"],
  ["Indonesian rupiah", "IDR – Rp"],
  ["Israeli new shekel", "ILS – ₪"],
  ["Japanese yen", "JPY – ¥"],
  ["Kazakhstani tenge", "KZT – ₸"],
  ["Kenyan shilling", "KES – KSh"],
  ["Malaysian ringgit", "MYR – RM"],
  ["Mexican peso", "MXN – $"],
  ["Moroccan dirham", "MAD"],
  ["New Taiwan dollar", "TWD – $"],
  ["New Zealand dollar", "NZD – $"],
  ["Norwegian krone", "NOK – kr"],
  ["Peruvian sol", "PEN – S/"],
  ["Philippine peso", "PHP – ₱"],
  ["Polish zloty", "PLN – zł"],
  ["Pound sterling", "GBP – £"],
  ["Qatari riyal", "QAR – ر.ق"],
  ["Romanian leu", "RON – lei"],
  ["Saudi Arabian riyal", "SAR – ر.س"],
];

function CloseIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
      <path d="m6 6 20 20M26 6 6 26" />
    </svg>
  );
}

export function LanguageCurrencyModal({
  onClose,
  returnFocusRef,
}: {
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("language");
  const [language, setLanguage] = useState("English");
  const [region, setRegion] = useState("India");
  const [currency, setCurrency] = useState("Indian rupee");
  useDialogFocus(dialogRef, true);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        returnFocusRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, returnFocusRef]);

  const close = () => {
    onClose();
    returnFocusRef.current?.focus();
  };
  const entries = tab === "language" ? LANGUAGES : CURRENCIES;
  const selected = tab === "language" ? `${language}|${region}` : currency;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-currency-title"
        className="relative flex max-h-[92vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_8px_32px_#00000026]"
      >
        <div className="px-6 pt-6">
          <button
            type="button"
            aria-label="Close language and currency"
            onClick={close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border-none bg-transparent hover:bg-grey100"
          >
            <CloseIcon />
          </button>
          <h2 id="language-currency-title" className="sr-only">
            Language and currency
          </h2>
          <div role="tablist" aria-label="Language and currency options" className="mt-4 flex gap-8 border-b border-line-soft">
            <button
              type="button"
              aria-selected={tab === "language"}
              role="tab"
              onClick={() => setTab("language")}
              className={`relative px-1 pb-3 text-[16px] font-medium ${
                tab === "language" ? "after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-ink after:content-['']" : "text-muted2"
              }`}
            >
              Language and region
            </button>
            <button
              type="button"
              aria-selected={tab === "currency"}
              role="tab"
              onClick={() => setTab("currency")}
              className={`relative px-1 pb-3 text-[16px] font-medium ${
                tab === "currency" ? "after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-ink after:content-['']" : "text-muted2"
              }`}
            >
              Currency
            </button>
          </div>
        </div>
        <div className="overflow-y-auto px-6 py-8">
          {tab === "language" && (
            <>
              <section>
                <h3 className="mb-6 text-[24px] font-semibold">Suggested languages and regions</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {SUGGESTED_LANGUAGES.map(([name, place]) => (
                    <button
                      key={`${name}-${place}`}
                      type="button"
                      onClick={() => {
                        setLanguage(name);
                        setRegion(place);
                      }}
                      className="rounded-lg p-3 text-left hover:bg-grey100"
                    >
                      <span className="block text-[14px]">{name}</span>
                      <span className="mt-1 block text-[14px] text-muted2">{place}</span>
                    </button>
                  ))}
                </div>
              </section>
              <section className="mt-10">
                <h3 className="text-[24px] font-semibold">Choose a language and region</h3>
                <p className="mt-1 text-[14px]">
                  You can manage more language preferences in your{" "}
                  <button
                    type="button"
                    className="border-none bg-transparent p-0 font-medium underline"
                    onClick={() => {
                      close();
                    }}
                  >
                    Account settings
                  </button>
                  .
                </p>
              </section>
            </>
          )}
          {tab === "currency" && <h3 className="mb-6 text-[24px] font-semibold">Choose a currency</h3>}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {entries.map(([name, detail]) => {
              const isSelected = tab === "language" ? selected === `${name}|${detail}` : selected === name;
              return (
                <button
                  key={`${name}-${detail}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    if (tab === "language") {
                      setLanguage(name);
                      setRegion(detail);
                    } else {
                      setCurrency(name);
                    }
                  }}
                  className={`min-h-[64px] rounded-lg border p-3 text-left hover:border-ink ${
                    isSelected ? "border-ink" : "border-transparent"
                  }`}
                >
                  <span className="block text-[14px]">{name}</span>
                  <span className="mt-1 block text-[14px] text-muted2">{detail}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
