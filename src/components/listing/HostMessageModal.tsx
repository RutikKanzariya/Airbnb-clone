"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useDialogFocus } from "@/hooks/useDialogFocus";

const STORAGE_KEY = "airbnb-clone-host-messages";

type StoredMessage = {
  host: string;
  message: string;
  sentAt: string;
};

export function HostMessageModal({
  onClose,
  returnFocusRef,
}: {
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
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

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    try {
      const stored: unknown = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) ?? "[]",
      );
      if (!Array.isArray(stored)) {
        setStorageError("Saved messages could not be read. Clear this demo’s saved messages and try again.");
        return;
      }
      const existingMessages = stored.filter(
        (entry): entry is StoredMessage =>
          typeof entry === "object" &&
          entry !== null &&
          "host" in entry &&
          typeof entry.host === "string" &&
          "message" in entry &&
          typeof entry.message === "string" &&
          "sentAt" in entry &&
          typeof entry.sentAt === "string",
      );
      existingMessages.push({
        host: "Mirashya Homes",
        message: trimmedMessage,
        sentAt: new Date().toISOString(),
      });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existingMessages));
      setStorageError(null);
      setSaved(true);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setStorageError("Saved messages could not be read. Clear this demo’s saved messages and try again.");
        return;
      }
      if (error instanceof DOMException) {
        setStorageError("This browser could not save the demo message locally.");
        return;
      }
      throw error;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-host-title"
        className="w-full max-w-[520px] rounded-[24px] bg-white p-7 shadow-[0_12px_40px_#00000030]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="message-host-title" className="text-[24px] font-semibold">
              Message Mirashya Homes
            </h2>
            <p className="mt-1 text-[14px] text-muted2">Ask the host a question about your stay.</p>
          </div>
          <button
            type="button"
            aria-label="Close message dialog"
            onClick={close}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-none bg-grey100 text-[22px] hover:bg-grey200"
          >
            ×
          </button>
        </div>
        <div className="mt-5 rounded-xl bg-[#fff8e7] px-4 py-3 text-[13px] leading-5 text-[#644f24]">
          Demo only: messages are saved in this browser and are not delivered to the host.
        </div>
        {saved ? (
          <div className="mt-5" role="status" aria-live="polite">
            <p className="text-[16px] font-medium">Your demo message is saved on this device.</p>
            <p className="mt-1 text-[14px] text-muted2">It has not been sent to the host.</p>
            <blockquote className="mt-4 rounded-xl border border-line-soft bg-grey100 p-4 text-[14px] leading-5">
              {message.trim()}
            </blockquote>
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setSaved(false);
              }}
              className="mt-5 h-11 rounded-xl border-none bg-ink px-5 text-[14px] font-medium text-white"
            >
              Write another message
            </button>
          </div>
        ) : (
          <form onSubmit={sendMessage} className="mt-5">
            <label htmlFor="host-message" className="mb-2 block text-[14px] font-medium">
              Your message
            </label>
            <textarea
              id="host-message"
              required
              maxLength={2000}
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Hi! I’d like to know more about..."
              className="w-full resize-y rounded-xl border border-line p-4 text-[14px] leading-5 outline-none focus:border-ink"
            />
            <div className="mt-1 text-right text-[12px] text-muted2">{message.length}/2000</div>
            {storageError && (
              <p className="mt-3 text-[14px] text-[#b42318]" role="alert">
                {storageError}
              </p>
            )}
            <button
              type="submit"
              disabled={!message.trim()}
              className="mt-4 h-12 w-full rounded-xl border-none bg-rausch text-[16px] font-semibold text-white enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save demo message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
