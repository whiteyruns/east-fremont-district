// Hosted block walkthroughs for visiting planners. The first run is IMEX
// America week (Oct 13–15, 2026): Mauricio hosts a short morning tour from
// Pink Monkey on each of the three show days. The page at
// /book-the-block/imex, the RSVP route and the confirmation email all read
// from here so the details are stated once.

export const TOUR_EVENT = "imex-2026";

export const TOUR_TIME_LABEL = "9:30 AM";
export const TOUR_DURATION_MIN = 45;

// Pacific Daylight Time applies to every date below (clocks change Nov 1).
const UTC_OFFSET_HOURS = -7;
const START_HOUR = 9;
const START_MINUTE = 30;

export type TourDate = {
  iso: string; // YYYY-MM-DD, the value stored in block_tour_rsvps.tour_date
  label: string; // what people see
  short: string; // for subjects and tight layouts
};

export const TOUR_DATES: TourDate[] = [
  { iso: "2026-10-13", label: "Tuesday, October 13", short: "Tue Oct 13" },
  { iso: "2026-10-14", label: "Wednesday, October 14", short: "Wed Oct 14" },
  { iso: "2026-10-15", label: "Thursday, October 15", short: "Thu Oct 15" },
];

export function findTourDate(iso: string | null | undefined): TourDate | null {
  return TOUR_DATES.find((d) => d.iso === iso) ?? null;
}

export const MEETING_POINT = {
  venue: "Pink Monkey",
  address: "100 S 6th St, Las Vegas, NV 89101",
  hint: "Corner of Fremont and 6th",
  mapsUrl: "https://maps.google.com/?q=100+S+6th+St,+Las+Vegas,+NV+89101",
};

export const HOST = {
  name: "Mauricio Morales",
  org: "Corner Bar",
  email: "mauricio@cornerbar.com",
  // Day-of contact. Mauricio prefers a text (Oct 7).
  phone: "702-336-8486 (text is best)",
};

// Mauricio's guidance (Oct 7): push rideshare first, then the paid lot.
export const PARKING_GUIDANCE: string | null =
  "Rideshare is the easy way in: drop at Fremont and 6th, right at Pink Monkey. If you drive, use the paid Triple B's lot at 101-155 S 6th St, a short walk up the block (run by Metropolis, pay by plate).";

export const PARKING_FALLBACK =
  "Parking and drop-off details will follow by email the day before your tour.";

export const MAX_PARTY_SIZE = 6;

// From the Strip or the Convention Center the block is a short rideshare, so
// the page can say so without quoting a time that depends on traffic.
export const WHAT_YOU_WILL_SEE = [
  "The closed-street footprint and how a private program flows across it",
  "Rooftops, the showroom and the clubs, with capacities for each",
  "Where arrivals, credentialing and production live on a program day",
  "Time with the operator who would run your program end to end",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Returns an iCalendar timestamp (UTC) for the tour start or end on a date.
function tourStamp(date: TourDate, minutesFromStart: number): string {
  const [y, m, d] = date.iso.split("-").map(Number);
  const utc = new Date(
    Date.UTC(y, m - 1, d, START_HOUR - UTC_OFFSET_HOURS, START_MINUTE + minutesFromStart),
  );
  return (
    `${utc.getUTCFullYear()}${pad(utc.getUTCMonth() + 1)}${pad(utc.getUTCDate())}` +
    `T${pad(utc.getUTCHours())}${pad(utc.getUTCMinutes())}00Z`
  );
}

function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

// A single-event .ics the attendee can drop into Outlook or Google Calendar.
export function tourIcs(date: TourDate, uid: string): string {
  const description = [
    `Hosted walk of the East Fremont District with ${HOST.name} from ${HOST.org}.`,
    `Meet at ${MEETING_POINT.venue}, ${MEETING_POINT.address} (${MEETING_POINT.hint}).`,
    PARKING_GUIDANCE ?? PARKING_FALLBACK,
    `Questions: ${HOST.email}`,
  ].join("\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//East Fremont District//Block Tour//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}@eastfremontdistrict.com`,
    `DTSTAMP:${tourStamp(date, 0)}`,
    `DTSTART:${tourStamp(date, 0)}`,
    `DTEND:${tourStamp(date, TOUR_DURATION_MIN)}`,
    `SUMMARY:${icsEscape("Block tour · East Fremont District")}`,
    `LOCATION:${icsEscape(`${MEETING_POINT.venue}, ${MEETING_POINT.address}`)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
