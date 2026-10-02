"use client";

import { useEffect, useRef, useState } from "react";
import { IMG } from "@/components/listing/data";
import { useListingUI } from "@/components/listing/ListingUIProvider";
import { LanguageCurrencyModal } from "@/components/listing/LanguageCurrencyModal";
import { LoginModal } from "@/components/listing/LoginModal";

type SearchPanel = "where" | "when" | "who" | null;
type GuestType = "adults" | "children" | "infants" | "pets";

const DESTINATIONS = [
  {
    name: "Nearby",
    description: "Find what’s around you",
    image: "ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850",
    style: 2,
  },
  {
    name: "Mumbai, Maharashtra",
    description: "For sights like Gateway of India",
    image: "ebb968b2-3fb6-45d3-b675-7765e487f7b9",
    style: 1,
  },
  {
    name: "North Goa, Goa",
    description: "Popular beach destination",
    image: "06f0f050-c167-4d1e-89e1-2775be94f82a",
    style: 1,
  },
  {
    name: "Udaipur, Rajasthan",
    description: "For its stunning architecture",
    image: "75e4a98d-2598-4693-ae1b-d8c9d98c3bfc",
    style: 1,
  },
  {
    name: "Lonavala, Maharashtra",
    description: "For nature lovers",
    image: "58e934fa-33ed-4caf-800e-7e268bb0d3c7",
    style: 2,
  },
  {
    name: "Ahmedabad, Gujarat",
    description: "Near you",
    image: "1e6621dc-6bb6-42c3-a65a-ac9acf89703f",
    style: 2,
  },
  {
    name: "New Delhi, Delhi",
    description: "For sights like India Gate",
    image: "b5648dad-1d76-43e4-9bbd-18ebce84ab7f",
    style: 1,
  },
  {
    name: "Jaipur, Rajasthan",
    description: "For its stunning architecture",
    image: "ed75c050-042b-44ba-a991-54044d93a91b",
    style: 1,
  },
  {
    name: "Pune City, Maharashtra",
    description: "For sights like Dagdusheth Halwai Ganpati Temple",
    image: "c7b521c7-d91a-4280-9658-242d29c4c7ea",
    style: 1,
  },
  {
    name: "Varanasi, Uttar Pradesh",
    description: "A hidden gem",
    image: "0a415c40-e73a-4170-a6b6-a0118dc18585",
    style: 2,
  },
  {
    name: "South Goa, Goa",
    description: "Popular beach destination",
    image: "ebb968b2-3fb6-45d3-b675-7765e487f7b9",
    style: 1,
  },
  {
    name: "Calangute, Goa",
    description: "For its bustling nightlife",
    image: "447b22da-3842-4977-89c9-d58e182c0ce2",
    style: 2,
  },
  {
    name: "Manali, Himachal Pradesh",
    description: "For nature lovers",
    image: "782a1ac6-2c76-4bd7-bead-d17529d74654",
    style: 1,
  },
  {
    name: "Dubai, United Arab Emirates",
    description: "For sights like Burj Khalifa",
    image: "c98f58bf-8512-43e3-af54-6c1f0b2c8a23",
    style: 1,
  },
  {
    name: "Gurgaon District, Haryana",
    description: "Popular destination",
    image: "067f0eaa-0c0f-4eee-b7e9-1a539b8cb48b",
    style: 1,
  },
  {
    name: "Noida, Uttar Pradesh",
    description: "Popular destination",
    image: "c9333e22-1d8d-4d6c-80db-615f4c2d4cc4",
    style: 1,
  },
  {
    name: "Candolim, Goa",
    description: "A hidden gem",
    image: "06f0f050-c167-4d1e-89e1-2775be94f82a",
    style: 1,
  },
  {
    name: "Vadodara, Gujarat",
    description: "Near you",
    image: "7167e066-5543-4a7f-9fcb-50b2e477ccd6",
    style: 2,
  },
  {
    name: "Ujjain, Madhya Pradesh",
    description: "Off the beaten path",
    image: "067f0eaa-0c0f-4eee-b7e9-1a539b8cb48b",
    style: 1,
  },
  {
    name: "Greater Noida, Uttar Pradesh",
    description: "A hidden gem",
    image: "7167e066-5543-4a7f-9fcb-50b2e477ccd6",
    style: 2,
  },
  {
    name: "Bengaluru, Karnataka",
    description: "For sights like Lalbagh Botanical Garden",
    image: "41bb6ae3-07f4-4ef4-b9d7-37d9f7a55d2b",
    style: 1,
  },
] as const;

const GUEST_TYPES: { key: GuestType; title: string; description: string }[] = [
  { key: "adults", title: "Adults", description: "Ages 13 or above" },
  { key: "children", title: "Children", description: "Ages 2–12" },
  { key: "infants", title: "Infants", description: "Under 2" },
  { key: "pets", title: "Pets", description: "Bringing a service animal?" },
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(date: Date | null) {
  return date
    ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";
}

function monthLabel(date: Date) {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function CalendarMonth({
  month,
  checkIn,
  checkOut,
  onSelect,
}: {
  month: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
}) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();

  return (
    <div>
      <h3 className="mb-5 text-center text-[16px] font-semibold">{monthLabel(month)}</h3>
      <div className="mb-2 grid grid-cols-7">
        {WEEKDAYS.map((day, index) => (
          <span key={`${day}-${index}`} className="text-center text-[12px] font-medium text-muted2">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: firstWeekday }, (_, index) => (
          <span key={`empty-${index}`} className="aspect-square" />
        ))}
        {Array.from({ length: dayCount }, (_, index) => {
          const date = new Date(year, monthIndex, index + 1);
          const isCheckIn = checkIn?.toDateString() === date.toDateString();
          const isCheckOut = checkOut?.toDateString() === date.toDateString();
          const inRange = checkIn !== null && checkOut !== null && date > checkIn && date < checkOut;
          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <button
              key={index}
              type="button"
              disabled={isPast}
              aria-label={`${MONTH_NAMES[monthIndex]} ${index + 1}, ${year}`}
              aria-pressed={isCheckIn || isCheckOut}
              onClick={() => onSelect(date)}
              className={`relative aspect-square rounded-full border-none p-0 text-[14px] ${
                isCheckIn || isCheckOut
                  ? "bg-ink text-white"
                  : inRange
                    ? "rounded-none bg-grey200"
                    : "bg-transparent hover:border hover:border-ink"
              } ${isPast ? "cursor-default text-[#ccc]" : "cursor-pointer"}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AirbnbWordmark() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 3490 1080" fill="currentColor" className="block h-8 w-auto">
      <path d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      fill="currentColor"
      className="block h-full w-full"
    >
      <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      overflow="visible"
      className="block h-full w-full"
    >
      <g fill="none">
        <path d="M2 16h28M2 24h28M2 8h28" />
      </g>
    </svg>
  );
}

const pillButton =
  "inline-flex h-12 items-center gap-2 rounded-[40px] border-none bg-transparent px-4 text-[14px] leading-[normal]";
const circleButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border-none bg-grey200 text-ink transition-[background] duration-[.18s] hover:bg-grey300";

export function SiteHeader() {
  const { showToast } = useListingUI();
  const [activePanel, setActivePanel] = useState<SearchPanel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [destination, setDestination] = useState("Anywhere");
  const [searchDraft, setSearchDraft] = useState("");
  const [monthStart, setMonthStart] = useState(new Date(2026, 9, 1));
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [flexibility, setFlexibility] = useState("Exact dates");
  const [guests, setGuests] = useState<Record<GuestType, number>>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const destinationInput = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const globeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (activePanel !== "where") return;

    destinationInput.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePanel(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activePanel]);

  const matchingDestinations = DESTINATIONS.filter((item) =>
    `${item.name} ${item.description}`.toLowerCase().includes(searchDraft.trim().toLowerCase()),
  );
  const guestCount = guests.adults + guests.children;
  const guestSummary = [
    guestCount > 0 ? `${guestCount} ${guestCount === 1 ? "guest" : "guests"}` : "",
    guests.infants > 0 ? `${guests.infants} infant${guests.infants === 1 ? "" : "s"}` : "",
    guests.pets > 0 ? `${guests.pets} pet${guests.pets === 1 ? "" : "s"}` : "",
  ]
    .filter(Boolean)
    .join(", ");
  const dateSummary = checkIn
    ? `${formatDate(checkIn)}${checkOut ? ` – ${formatDate(checkOut)}` : ""}`
    : flexibility === "Exact dates"
      ? "Anytime"
      : flexibility;
  const secondMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1);
  const togglePanel = (panel: Exclude<SearchPanel, null>) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };
  const selectDate = (date: Date) => {
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      setFlexibility("Exact dates");
      return;
    }
    setCheckOut(date);
  };
  const applySearch = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const setOrDelete = (key: string, value: string) => {
      if (value) params.set(key, value);
      else params.delete(key);
    };
    const toDateParam = (date: Date | null) =>
      date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        : "";

    setOrDelete("where", destination === "Anywhere" ? "" : destination);
    setOrDelete("checkin", toDateParam(checkIn));
    setOrDelete("checkout", toDateParam(checkOut));
    setOrDelete("adults", String(guests.adults));
    setOrDelete("children", String(guests.children));
    setOrDelete("infants", String(guests.infants));
    setOrDelete("pets", String(guests.pets));
    setOrDelete("flexible", flexibility === "Exact dates" ? "" : flexibility.toLowerCase());

    window.history.pushState(window.history.state, "", url);
    setActivePanel(null);
    showToast("Search filters applied");
  };

  return (
    <header className="relative z-50 border-b border-line-soft bg-white px-20" id="siteHeader">
      <a
        href="#main"
        className="absolute top-0 left-[-999px] z-[200] rounded-[0_0_8px] bg-white px-4 py-2.5 text-ink focus:left-0"
      >
        Skip to content
      </a>
      {activePanel && (
        <button
          type="button"
          aria-label="Close search panel"
          className="fixed inset-0 z-[5] cursor-default border-none bg-black/25 p-0"
          onClick={() => setActivePanel(null)}
        />
      )}
      <div className="mx-auto grid h-[88px] max-w-[1760px] grid-cols-[1fr_auto_1fr] items-center">
        <a className="inline-flex items-center justify-self-start text-rausch" href="#" aria-label="Airbnb homepage">
          <span className="block h-8">
            <AirbnbWordmark />
          </span>
        </a>
        <div className="relative z-10 justify-self-center max-[743px]:hidden">
          <div
            className={`inline-flex items-center rounded-[40px] border border-line px-2 ${
              activePanel
                ? "h-20 w-[min(1000px,calc(100vw-32px))] gap-1 border-none bg-[#ebebeb] shadow-[0_4px_16px_#0000001a]"
                : "h-12 bg-white shadow-[0_1px_4px_#00000014]"
            }`}
            role="search"
          >
            <button
              className={`${pillButton} font-medium ${
                activePanel
                  ? `h-16 flex-1 flex-col items-start justify-center gap-0 px-8 ${activePanel === "where" ? "bg-white shadow-card" : "bg-transparent"}`
                  : ""
              }`}
              type="button"
              aria-expanded={activePanel === "where"}
              aria-controls="destination-search"
              onClick={() => togglePanel("where")}
            >
              {!activePanel && (
                <img
                  className="ml-[-6px] block h-12 w-12 max-w-none object-fill"
                  src={`${IMG}/e686c455.png`}
                  alt=""
                  aria-hidden="true"
                />
              )}
              {activePanel && <span className="text-[12px] font-semibold">Where</span>}
              <span className={`${activePanel ? "max-w-full" : "max-w-[170px]"} truncate`}>
                {destination}
              </span>
            </button>
            {!activePanel && <span className="h-6 w-px bg-line" />}
            <button
              className={`${pillButton} font-medium ${
                activePanel
                  ? `h-16 flex-1 flex-col items-start justify-center gap-0 px-8 ${activePanel === "when" ? "bg-white shadow-card" : "bg-transparent"}`
                  : ""
              }`}
              type="button"
              aria-expanded={activePanel === "when"}
              aria-controls="date-search"
              onClick={() => togglePanel("when")}
            >
              {activePanel && <span className="text-[12px] font-semibold">When</span>}
              <span className="max-w-[130px] truncate">{dateSummary}</span>
            </button>
            {!activePanel && <span className="h-6 w-px bg-line" />}
            <button
              className={`${pillButton} font-normal text-muted2 ${
                activePanel
                  ? `h-16 flex-1 flex-col items-start justify-center gap-0 px-8 ${activePanel === "who" ? "bg-white shadow-card" : "bg-transparent"}`
                  : ""
              }`}
              type="button"
              aria-expanded={activePanel === "who"}
              aria-controls="guest-search"
              onClick={() => togglePanel("who")}
            >
              {activePanel && <span className="text-[12px] font-semibold text-ink">Who</span>}
              <span className="max-w-[130px] truncate">{guestSummary || "Add guests"}</span>
            </button>
            <button
              className={`relative ml-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-none bg-rausch text-[16px] font-semibold text-white ${
                activePanel ? "h-14 w-[120px]" : "h-8 w-8"
              }`}
              type="button"
              aria-label="Search"
              onClick={applySearch}
            >
              <span
                className={`block h-3.5 w-3.5 ${
                  activePanel
                    ? "relative shrink-0"
                    : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                }`}
                aria-hidden="true"
              >
                <svg viewBox="0 0 32 32" fill="none" stroke="#fff" strokeWidth={4} className="block h-full w-full">
                  <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
                </svg>
              </span>
              {activePanel && <span>Search</span>}
            </button>
          </div>
          {activePanel === "where" && (
            <section
              id="destination-search"
              aria-label="Choose a destination"
              className="absolute top-[calc(100%+14px)] left-0 z-[60] w-[min(560px,calc(100vw-32px))] rounded-[32px] bg-white p-6 shadow-[0_6px_24px_#00000026] max-[743px]:left-1/2 max-[743px]:-translate-x-1/2"
            >
              <label htmlFor="search-destination" className="mb-3 block text-[14px] font-semibold">
                Suggested destinations
              </label>
              <input
                ref={destinationInput}
                id="search-destination"
                className="mb-3 h-12 w-full rounded-xl border border-line bg-white px-4 text-[14px] outline-none focus:border-ink"
                placeholder="Search destinations"
                value={searchDraft}
                onChange={(event) => setSearchDraft(event.target.value)}
              />
              <ul className="max-h-[min(620px,65vh)] overflow-y-auto">
                {matchingDestinations.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-5 rounded-xl px-1 py-2 text-left hover:bg-grey100"
                      onClick={() => {
                        setDestination(item.name === "Nearby" ? "Nearby" : item.name);
                        setSearchDraft("");
                        setActivePanel(null);
                      }}
                    >
                      <img
                        className="h-[70px] w-[70px] shrink-0 rounded-xl object-cover"
                        src={`https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-${item.style}/original/${item.image}.png?im_w=120`}
                        alt=""
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-[16px] font-medium text-ink">{item.name}</span>
                        <span className="mt-1 block truncate text-[14px] text-muted2">{item.description}</span>
                      </span>
                    </button>
                  </li>
                ))}
                {matchingDestinations.length === 0 && (
                  <li className="px-2 py-4 text-[14px] text-muted2" role="status">
                    No destinations match “{searchDraft}”
                  </li>
                )}
              </ul>
            </section>
          )}
          {activePanel === "when" && (
            <section
              id="date-search"
              aria-label="Choose travel dates"
              className="absolute top-[calc(100%+14px)] left-1/2 z-[60] w-[min(1000px,calc(100vw-32px))] -translate-x-1/2 rounded-[32px] bg-white p-8 shadow-[0_6px_24px_#00000026]"
            >
              <div className="mx-auto mb-7 flex w-fit rounded-full bg-grey200 p-1">
                <button
                  type="button"
                  className={`rounded-full px-8 py-3 text-[14px] font-medium ${!flexibleDates ? "bg-white shadow-[0_1px_4px_#0000001f]" : ""}`}
                  onClick={() => {
                    setFlexibleDates(false);
                    setFlexibility("Exact dates");
                  }}
                >
                  Dates
                </button>
                <button
                  type="button"
                  className={`rounded-full px-8 py-3 text-[14px] font-medium ${flexibleDates ? "bg-white shadow-[0_1px_4px_#0000001f]" : ""}`}
                  onClick={() => setFlexibleDates(true)}
                >
                  Flexible
                </button>
              </div>
              {flexibleDates ? (
                <div className="flex flex-wrap justify-center gap-3 py-12">
                  {["Weekend", "Week", "Month"].map((period) => (
                    <button
                      key={period}
                      type="button"
                      className={`rounded-full border px-6 py-3 text-[14px] ${flexibility === period ? "border-ink" : "border-line"}`}
                      onClick={() => setFlexibility(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="relative grid grid-cols-2 gap-12 max-[743px]:grid-cols-1 max-[743px]:gap-8">
                  <button
                    type="button"
                    aria-label="Previous month"
                    className="absolute top-[-8px] left-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border-none bg-transparent text-[24px] hover:bg-grey100"
                    onClick={() => setMonthStart(new Date(monthStart.getFullYear(), monthStart.getMonth() - 1, 1))}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    className="absolute top-[-8px] right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border-none bg-transparent text-[24px] hover:bg-grey100"
                    onClick={() => setMonthStart(new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1))}
                  >
                    ›
                  </button>
                  <CalendarMonth month={monthStart} checkIn={checkIn} checkOut={checkOut} onSelect={selectDate} />
                  <CalendarMonth month={secondMonth} checkIn={checkIn} checkOut={checkOut} onSelect={selectDate} />
                </div>
              )}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5">
                <div className="flex">
                  <div className="min-w-[160px] rounded-l-2xl border border-line px-4 py-2">
                    <span className="block text-[12px] text-muted2">Check-in</span>
                    <span className="text-[14px]">{formatDate(checkIn) || flexibility}</span>
                  </div>
                  <div className="min-w-[160px] rounded-r-2xl border-y border-r border-line px-4 py-2">
                    <span className="block text-[12px] text-muted2">Checkout</span>
                    <span className="text-[14px]">{formatDate(checkOut) || flexibility}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="border-none bg-transparent px-3 py-2 text-[14px] font-medium underline"
                  onClick={() => {
                    setCheckIn(null);
                    setCheckOut(null);
                    setFlexibility("Exact dates");
                  }}
                >
                  Clear dates
                </button>
              </div>
            </section>
          )}
          {activePanel === "who" && (
            <section
              id="guest-search"
              aria-label="Choose guests"
              className="absolute top-[calc(100%+14px)] right-0 z-[60] w-[min(520px,calc(100vw-32px))] rounded-[32px] bg-white px-8 py-6 shadow-[0_6px_24px_#00000026] max-[743px]:left-1/2 max-[743px]:-translate-x-1/2"
            >
              {GUEST_TYPES.map((guest, index) => (
                <div
                  key={guest.key}
                  className={`flex items-center justify-between py-5 ${index < GUEST_TYPES.length - 1 ? "border-b border-line-soft" : ""}`}
                >
                  <div>
                    <p className="text-[16px] font-medium">{guest.title}</p>
                    {guest.key === "pets" ? (
                      <button type="button" className="mt-1 border-none bg-transparent p-0 text-left text-[14px] text-muted2 underline">
                        {guest.description}
                      </button>
                    ) : (
                      <p className="mt-1 text-[14px] text-muted2">{guest.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label={`Remove ${guest.title.toLowerCase()}`}
                      disabled={guests[guest.key] === 0}
                      className="h-10 w-10 rounded-full border border-line bg-white text-[22px] text-muted2 enabled:hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={() =>
                        setGuests((current) => ({
                          ...current,
                          [guest.key]: Math.max(0, current[guest.key] - 1),
                        }))
                      }
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-[16px]" aria-live="polite">
                      {guests[guest.key]}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add ${guest.title.toLowerCase()}`}
                      className="h-10 w-10 rounded-full border border-line bg-white text-[22px] text-ink hover:border-ink"
                      onClick={() =>
                        setGuests((current) => ({
                          ...current,
                          [guest.key]: current[guest.key] + 1,
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
        <nav className="inline-flex items-center gap-2 justify-self-end">
          <a
            className="rounded-[22px] px-3.5 py-3 text-[14px] font-medium transition-[background] duration-[.18s] hover:bg-grey100 max-[743px]:hidden"
            href="#"
          >
            Become a host
          </a>
          <button
            ref={globeButtonRef}
            className={circleButton}
            type="button"
            aria-label="Log in or sign up"
            onClick={() => setLoginModalOpen(true)}
          >
            <span className="inline-block h-4 w-4">
              <GlobeIcon />
            </span>
          </button>
          <div ref={menuRef} className="relative">
            <button
              ref={menuButtonRef}
              className={circleButton}
              type="button"
              aria-label="Main navigation menu"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="inline-block h-4 w-4">
                <MenuIcon />
              </span>
            </button>
            {menuOpen && (
              <div
                role="menu"
                aria-label="Main navigation"
                className="absolute top-[calc(100%+12px)] right-0 z-[70] w-[332px] rounded-[14px] bg-white p-2 shadow-[0_4px_18px_#00000026]"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-[16px] hover:bg-grey100"
                  onClick={() => {
                    setMenuOpen(false);
                    setLanguageModalOpen(true);
                  }}
                >
                  <span className="inline-block h-5 w-5 shrink-0">
                    <GlobeIcon />
                  </span>
                  <span className="whitespace-nowrap">Languages &amp; currency</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="flex h-11 w-full items-center gap-3 rounded-lg px-4 text-left text-[16px] hover:bg-grey100"
                  onClick={() => {
                    setMenuOpen(false);
                    showToast("Help Centre");
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.6 9a2.5 2.5 0 1 1 4.25 1.8c-1.1 1.05-1.85 1.3-1.85 2.7M12 17h.01" />
                  </svg>
                  <span>Help Centre</span>
                </button>
                <div className="mx-4 my-2 border-t border-line-soft" />
                <button
                  type="button"
                  role="menuitem"
                  className="flex min-h-[82px] w-full items-center justify-between rounded-lg px-4 py-3 text-left hover:bg-grey100"
                  onClick={() => {
                    setMenuOpen(false);
                    showToast("Become a host");
                  }}
                >
                  <span>
                    <span className="block text-[16px] font-semibold">Become a host</span>
                    <span className="mt-0.5 block max-w-[230px] text-[14px] leading-[18px] text-muted2">
                      It’s easy to start hosting and earn extra income.
                    </span>
                  </span>
                  <svg viewBox="0 0 42 56" className="h-12 w-9 shrink-0" aria-hidden="true">
                    <circle cx="22" cy="9" r="5" fill="#d88f65" />
                    <path d="M18 15h9l4 15-4 2-2-9-2 13h-4l1-13-4 8-4-2 6-12z" fill="#313b3b" />
                    <path d="m16 41-4 12h4l5-10zm9 1 4 11h4l-3-13z" fill="#333" />
                  </svg>
                </button>
                <div className="mx-4 my-2 border-t border-line-soft" />
                {["Refer a host", "Find a co-host"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="menuitem"
                    className="h-11 w-full rounded-lg px-4 text-left text-[16px] hover:bg-grey100"
                    onClick={() => {
                      setMenuOpen(false);
                      showToast(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
                <div className="mx-4 my-2 border-t border-line-soft" />
                <button
                  type="button"
                  role="menuitem"
                  className="h-11 w-full rounded-lg px-4 text-left text-[16px] hover:bg-grey100"
                  onClick={() => {
                    setMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                >
                  Log in or sign up
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {languageModalOpen && (
        <LanguageCurrencyModal
          onClose={() => setLanguageModalOpen(false)}
          returnFocusRef={menuButtonRef}
        />
      )}
      {loginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          returnFocusRef={globeButtonRef}
        />
      )}
    </header>
  );
}
