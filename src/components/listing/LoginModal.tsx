"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useDialogFocus } from "@/hooks/useDialogFocus";

function AirbnbSymbol() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-12 w-12 text-rausch" aria-hidden="true">
      <path
        d="M15.97 4.2c-1.16 0-2.2.64-2.75 1.68L5.47 20.4a5.3 5.3 0 0 0 9.1 5.42l1.4-2.1 1.42 2.1a5.3 5.3 0 0 0 9.1-5.42L18.72 5.88a3.1 3.1 0 0 0-2.75-1.68Zm0 2.3c.3 0 .56.16.72.45l2.78 5.08a8.7 8.7 0 0 0-7 0l2.78-5.08c.16-.29.43-.45.72-.45Zm.02 7.34a6.1 6.1 0 0 1 4.5 1.97l-4.5 6.82-4.5-6.82a6.1 6.1 0 0 1 4.5-1.97Zm-6.25 3.83 4.49 6.8a3 3 0 0 1-5.7-3.02l1.21-3.78Zm12.5 0 1.21 3.78a3 3 0 0 1-5.7 3.02l4.49-6.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
      <path d="m6 6 20 20M26 6 6 26" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.1v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.2C9.2 39.4 16.1 44 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.7a12 12 0 0 1 0-7.5V15H5.8a20 20 0 0 0 0 17.9l6.8-5.2Z" />
      <path fill="#EA4335" d="M24 11.7c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.7 29.5 4 24 4 16.1 4 9.2 8.5 5.8 15l6.8 5.2c1.6-4.9 6.1-8.5 11.4-8.5Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M16.37 12.14c.02 2.17 1.9 2.89 1.92 2.9-.02.05-.3 1.04-.98 2.06-.59.89-1.2 1.77-2.17 1.79-.95.02-1.26-.58-2.35-.58-1.08 0-1.43.56-2.33.6-.93.04-1.63-.96-2.23-1.84-1.23-1.79-2.17-5.07-.9-7.28a3.45 3.45 0 0 1 2.91-1.77c.91-.02 1.76.62 2.32.62.55 0 1.59-.77 2.68-.66.46.02 1.76.19 2.59 1.43-.07.04-1.55.9-1.54 2.73ZM14.61 6.7a3.17 3.17 0 0 0 .76-2.27 3.22 3.22 0 0 0-2.08 1.08 3 3 0 0 0-.78 2.2 2.66 2.66 0 0 0 2.1-1.01Z" />
    </svg>
  );
}

export function LoginModal({
  onClose,
  returnFocusRef,
}: {
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [contact, setContact] = useState("");
  const [notice, setNotice] = useState("");
  useDialogFocus(dialogRef, true);

  const close = useCallback(() => {
    onClose();
    returnFocusRef.current?.focus();
  }, [onClose, returnFocusRef]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [close]);

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("Sign-in is not connected in this demo, so no account or message was sent.");
  };

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
        aria-labelledby="login-dialog-title"
        className="relative min-h-[512px] w-full max-w-[504px] rounded-[32px] bg-white px-[26px] pt-[62px] pb-7 shadow-[0_12px_40px_#00000030] max-[600px]:min-h-0 max-[600px]:rounded-[28px] max-[600px]:px-5 max-[600px]:pt-16"
      >
        <button
          type="button"
          aria-label="Close login"
          onClick={close}
          className="absolute top-5 right-5 inline-flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent hover:bg-grey100"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col items-center">
          <span className="scale-[.84]">
            <AirbnbSymbol />
          </span>
          <h2 id="login-dialog-title" className="mt-2 text-center text-[26px] leading-8 font-semibold">
            Log in or sign up
          </h2>
        </div>
        <form onSubmit={handleContinue} className="mt-7">
          <label htmlFor="login-contact" className="sr-only">
            Phone number or email
          </label>
          <input
            id="login-contact"
            type="text"
            autoComplete="username"
            required
            value={contact}
            onChange={(event) => {
              setContact(event.target.value);
              setNotice("");
            }}
            placeholder="Phone number or email"
            className="h-[62px] w-full rounded-[14px] border border-[#888] px-4 text-[16px] outline-none focus:border-ink"
          />
          <button
            type="submit"
            className="mt-4 h-[52px] w-full rounded-[14px] border-none bg-reserve text-[18px] font-semibold text-white hover:bg-reserve-hover"
          >
            Continue
          </button>
        </form>
        <div className="my-4 flex items-center gap-4 text-[14px]">
          <span className="h-px flex-1 bg-line-soft" />
          <span>or</span>
          <span className="h-px flex-1 bg-line-soft" />
        </div>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            aria-label="Continue with Google"
            onClick={() => setNotice("Google sign-in is not connected in this demo.")}
            className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[14px] border border-line bg-white hover:bg-grey100"
          >
            <GoogleIcon />
          </button>
          <button
            type="button"
            aria-label="Continue with Apple"
            onClick={() => setNotice("Apple sign-in is not connected in this demo.")}
            className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[14px] border border-line bg-white hover:bg-grey100"
          >
            <AppleIcon />
          </button>
        </div>
        {notice && (
          <p role="status" aria-live="polite" className="mt-5 text-center text-[14px] leading-5 text-muted2">
            {notice}
          </p>
        )}
      </div>
    </div>
  );
}
