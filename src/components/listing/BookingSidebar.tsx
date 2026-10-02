"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/listing/icons";
import { IMG } from "@/components/listing/data";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { useListingUI } from "./ListingUIProvider";

function FlagIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      fill="currentColor"
      className="block h-full w-full"
    >
      <path d="m7.5011 1c.5272 0 .9591.40794.99725.92537l.00275.07463v1h5.5c.31265 0 .5435.281645.4935.581075l-.01275.056285-.96125 3.36264.96125 3.36265c.08055.2818-.0967.5625-.36775.62465l-.0554.00945-.0576.00325h-5.5c-.5272 0-.9591-.40795-.99725-.92535l-.00275-.07465v-1h-5v6h-1v-14zm1 3h-1v4h1z" />
    </svg>
  );
}

function OfferClaimModal({
  onClose,
  onClaim,
  returnFocusRef,
}: {
  onClose: () => void;
  onClaim: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useDialogFocus(dialogRef, true);

  const close = () => {
    onClose();
    returnFocusRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        className="relative w-full max-w-[440px] overflow-hidden rounded-[28px] bg-white p-8 text-center shadow-[0_12px_40px_#00000030]"
      >
        <button
          type="button"
          aria-label="Close offer"
          onClick={close}
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border-none bg-grey100 text-[22px] hover:bg-grey200"
        >
          ×
        </button>
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-[#fff0f2]">
          <span
            aria-hidden="true"
            className={`text-[64px] leading-none [transition:transform_.35s] ${
              revealed ? "scale-110" : "animate-[bounce_1.4s_ease-in-out_infinite]"
            }`}
          >
            {revealed ? "🎉" : "🎁"}
          </span>
        </div>
        {revealed ? (
          <>
            <h2 id="offer-title" className="text-[24px] font-semibold">
              Surprise! You got 10% off
            </h2>
            <p className="mt-2 text-[14px] leading-5 text-muted2">
              Claim this offer for your next stay. Terms apply.
            </p>
            <div className="mx-auto mt-5 w-fit rounded-xl border border-dashed border-line px-5 py-3 text-[20px] font-semibold tracking-[.16em]">
              STAY10
            </div>
            <button
              type="button"
              onClick={onClaim}
              className="mt-6 h-12 w-full rounded-xl border-none bg-rausch text-[16px] font-semibold text-white hover:opacity-90"
            >
              Claim 10% off
            </button>
          </>
        ) : (
          <>
            <h2 id="offer-title" className="text-[24px] font-semibold">
              A little surprise for your next stay
            </h2>
            <p className="mt-2 text-[14px] leading-5 text-muted2">
              There’s a special offer waiting inside.
            </p>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-6 h-12 w-full rounded-xl border-none bg-rausch text-[16px] font-semibold text-white hover:opacity-90"
            >
              Open your surprise
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ReservationModal({
  checkIn,
  checkOut,
  guests,
  total,
  onClose,
  returnFocusRef,
}: {
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [confirmed, setConfirmed] = useState(false);
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
  const displayDate = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

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
        aria-labelledby="reservation-title"
        className="w-full max-w-[440px] rounded-[24px] bg-white p-7 shadow-[0_12px_40px_#00000030]"
      >
        {confirmed ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f5e9] text-[28px] text-[#238636]" aria-hidden="true">
              ✓
            </div>
            <h2 id="reservation-title" className="text-[24px] font-semibold">
              Your stay is reserved!
            </h2>
            <p className="mt-2 text-[14px] leading-5 text-muted2">
              Your reservation for {guests} {guests === 1 ? "guest" : "guests"} from {displayDate(checkIn)} to {displayDate(checkOut)} is confirmed.
            </p>
            <p className="mt-4 text-[16px] font-medium">Total: ₹{total.toLocaleString("en-IN")}</p>
            <button
              type="button"
              onClick={close}
              className="mt-6 h-12 w-full rounded-xl border-none bg-ink text-[16px] font-semibold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="reservation-title" className="text-[24px] font-semibold">
              Confirm your stay
            </h2>
            <p className="mt-2 text-[14px] text-muted2">Review your reservation details.</p>
            <dl className="mt-6 divide-y divide-line-soft rounded-xl border border-line px-4">
              <div className="flex justify-between gap-4 py-4 text-[14px]">
                <dt className="text-muted2">Check-in</dt>
                <dd className="font-medium">{displayDate(checkIn)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-[14px]">
                <dt className="text-muted2">Checkout</dt>
                <dd className="font-medium">{displayDate(checkOut)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-[14px]">
                <dt className="text-muted2">Guests</dt>
                <dd className="font-medium">{guests} {guests === 1 ? "guest" : "guests"}</dd>
              </div>
              <div className="flex justify-between gap-4 py-4 text-[14px]">
                <dt className="font-medium">Total</dt>
                <dd className="font-semibold">₹{total.toLocaleString("en-IN")}</dd>
              </div>
            </dl>
            <p className="mt-3 text-[12px] text-muted2">This demo confirmation does not process a payment.</p>
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="mt-5 h-12 w-full rounded-xl border-none bg-reserve text-[16px] font-semibold text-white hover:bg-reserve-hover"
            >
              Confirm reservation
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const label = "text-[10px] font-bold tracking-[.04em]";
const value = "mt-[2px] text-[14px]";
const INITIAL_CHECK_IN = "2026-10-18";
const INITIAL_CHECK_OUT = "2026-10-23";

function getNights(checkIn: string, checkOut: string) {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
}

export function BookingSidebar() {
  const { showToast, reservationRequest } = useListingUI();
  const [offerOpen, setOfferOpen] = useState(false);
  const [offerClaimed, setOfferClaimed] = useState(false);
  const [checkIn, setCheckIn] = useState(INITIAL_CHECK_IN);
  const [checkOut, setCheckOut] = useState(INITIAL_CHECK_OUT);
  const [guestCounts, setGuestCounts] = useState({ adults: 2, children: 0, infants: 0, pets: 0 });
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [dismissedReservationRequest, setDismissedReservationRequest] = useState(0);
  const claimButtonRef = useRef<HTMLButtonElement>(null);
  const reserveButtonRef = useRef<HTMLButtonElement>(null);
  const totalGuests = guestCounts.adults + guestCounts.children;
  const reservationDialogOpen =
    reservationOpen || reservationRequest > dismissedReservationRequest;
  const totalNights = getNights(checkIn, checkOut);
  const totalPrice = Math.round((28499 / 5) * totalNights);
  const cancellationDate = new Date(new Date(`${checkIn}T12:00:00`).getTime() - 86400000).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long" },
  );
  const updateCheckIn = (nextCheckIn: string) => {
    setCheckIn(nextCheckIn);
    if (nextCheckIn >= checkOut) {
      const nextDay = new Date(`${nextCheckIn}T00:00:00`);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(
        `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`,
      );
    }
  };
  const updateCheckOut = (nextCheckOut: string) => {
    if (nextCheckOut > checkIn) setCheckOut(nextCheckOut);
  };

  return (
    <aside className="relative self-stretch max-[1128px]:hidden">
      <div className="sticky top-[100px]" id="bookingSticky">
        <div className="mb-6 flex items-center gap-3 rounded-[12px] border border-solid border-line bg-white p-4">
          <img className="block h-8 w-8 shrink-0 object-contain" src={`${IMG}/0395b027.svg`} alt="" aria-hidden="true" />
          <div className="flex-1 text-[14px] leading-[1.3]">
            Get 10% off your next stay.
            <br />
            <a href="#" className="font-medium underline">
              Terms apply
            </a>
          </div>
          <button
            ref={claimButtonRef}
            type="button"
            disabled={offerClaimed}
            className="rounded-[8px] border-none bg-[#f7f7f7] px-[14px] py-2 text-[14px] leading-[normal] font-medium hover:bg-grey200 disabled:cursor-default disabled:text-muted2"
            onClick={() => setOfferOpen(true)}
          >
            {offerClaimed ? "Claimed" : "Claim"}
          </button>
        </div>
        <div className="rounded-[12px] border border-solid border-card-border px-6 pt-[22px] pb-6 shadow-card">
          <div className="mb-[18px] flex items-baseline gap-[6px]">
            <span className="text-[22px] font-medium underline underline-offset-2">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[15px] text-[#222]">
              for {totalNights} {totalNights === 1 ? "night" : "nights"}
            </span>
          </div>
          <div className="relative rounded-[8px] border border-solid border-[#b0b0b0]">
            <div className="grid grid-cols-[1fr_1fr]">
              <label className="border border-solid border-transparent px-3 py-[10px]">
                <div className={label}>CHECK-IN</div>
                <input
                  type="date"
                  aria-label="Check-in date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={checkIn}
                  onInput={(event) => updateCheckIn(event.currentTarget.value)}
                  className={`${value} w-full border-none bg-transparent p-0 text-ink outline-none`}
                />
              </label>
              <label className="border border-solid border-transparent border-l-[#b0b0b0] px-3 py-[10px]">
                <div className={label}>CHECKOUT</div>
                <input
                  type="date"
                  aria-label="Checkout date"
                  min={checkIn}
                  value={checkOut}
                  onInput={(event) => updateCheckOut(event.currentTarget.value)}
                  className={`${value} w-full border-none bg-transparent p-0 text-ink outline-none`}
                />
              </label>
            </div>
            <button
              type="button"
              aria-label="Choose guests"
              aria-expanded={guestPickerOpen}
              aria-controls="booking-guest-picker"
              onClick={() => setGuestPickerOpen((open) => !open)}
              className="flex w-full items-center justify-between border-0 border-t border-solid border-t-[#b0b0b0] bg-white px-3 py-[10px] text-left"
            >
              <div>
                <div className={label}>GUESTS</div>
                <div className={value}>
                  {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                  {guestCounts.infants > 0 ? `, ${guestCounts.infants} infant${guestCounts.infants === 1 ? "" : "s"}` : ""}
                  {guestCounts.pets > 0 ? `, ${guestCounts.pets} pet${guestCounts.pets === 1 ? "" : "s"}` : ""}
                </div>
              </div>
              <span className="h-4 w-4">
                <ChevronDownIcon />
              </span>
            </button>
            {guestPickerOpen && (
              <div
                id="booking-guest-picker"
                className="absolute top-[calc(100%+8px)] right-0 left-0 z-30 rounded-xl border border-line bg-white px-4 py-2 shadow-[0_4px_16px_#00000026]"
              >
                {([
                  ["adults", "Adults", "Ages 13 or above"],
                  ["children", "Children", "Ages 2–12"],
                  ["infants", "Infants", "Under 2"],
                  ["pets", "Pets", "Bringing a service animal?"],
                ] as const).map(([key, title, description]) => (
                  <div key={key} className="flex items-center justify-between border-b border-line-soft py-3 last:border-b-0">
                    <div>
                      <p className="text-[14px] font-medium">{title}</p>
                      <p className="text-[12px] text-muted2">{description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Remove ${title.toLowerCase()}`}
                        disabled={guestCounts[key] === 0 || (key === "adults" && guestCounts.adults === 1)}
                        onClick={() =>
                          setGuestCounts((current) => ({ ...current, [key]: current[key] - 1 }))
                        }
                        className="h-8 w-8 rounded-full border border-line bg-white text-[18px] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-[14px]" aria-live="polite">
                        {guestCounts[key]}
                      </span>
                      <button
                        type="button"
                        aria-label={`Add ${title.toLowerCase()}`}
                        onClick={() =>
                          setGuestCounts((current) => ({ ...current, [key]: current[key] + 1 }))
                        }
                        className="h-8 w-8 rounded-full border border-line bg-white text-[18px] hover:border-ink"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 w-full border-none bg-transparent py-2 text-right text-[14px] font-medium underline"
                  onClick={() => setGuestPickerOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
          <div className="my-4 rounded-[8px] bg-grey100 p-2 text-center text-[13px] text-muted2">
            Free cancellation before <b className="font-medium text-[#222]">{cancellationDate}</b>
          </div>
          <button
            ref={reserveButtonRef}
            type="button"
            id="reserveBtn"
            className="mt-[2px] h-12 w-full rounded-[999px] border-none bg-reserve px-6 py-0 text-[16px] leading-[normal] font-medium text-white [transition:filter_.15s,transform_.05s] hover:bg-reserve-hover active:[transform:scale(.985)]"
            onClick={() => {
              setGuestPickerOpen(false);
              setReservationOpen(true);
            }}
          >
            Reserve
          </button>
          <div className="mt-4 text-center text-[14px] text-muted2">You won&apos;t be charged yet</div>
        </div>
        <div className="mt-[26px] flex items-center justify-center gap-2 text-[14px] text-muted2">
          <span className="h-4 w-4">
            <FlagIcon />
          </span>
          <a href="#" className="underline">
            Report this listing
          </a>
        </div>
      </div>
      {offerOpen && (
        <OfferClaimModal
          onClose={() => setOfferOpen(false)}
          returnFocusRef={claimButtonRef}
          onClaim={() => {
            setOfferClaimed(true);
            setOfferOpen(false);
            showToast("10% off claimed — use code STAY10");
            claimButtonRef.current?.focus();
          }}
        />
      )}
      {reservationDialogOpen && (
        <ReservationModal
          checkIn={checkIn}
          checkOut={checkOut}
          guests={totalGuests}
          total={totalPrice}
          onClose={() => {
            setReservationOpen(false);
            setDismissedReservationRequest(reservationRequest);
          }}
          returnFocusRef={reserveButtonRef}
        />
      )}
    </aside>
  );
}
