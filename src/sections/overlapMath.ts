export const ME_TZ = "Asia/Tbilisi";
export const YOU_TZ = "America/Los_Angeles";

const MIN_PER_DAY = 24 * 60;

/** Offset of a zone from UTC, in minutes, at a given instant. DST aware. */
export function offsetMinutes(tz: string, date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
}

export function clock(tz: string, date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

const pad = (minutes: number) => {
  const m = ((minutes % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export type Overlap = {
  me: string;
  you: string;
  /** Tbilisi clock time when 09:00 in LA starts and 17:00 ends */
  start: string;
  end: string;
  /** Bar segments as percentages of the 24 hour Tbilisi day */
  segments: { left: number; width: number }[];
  /** Position of "now" on the bar, percent */
  now: number;
};

export function overlap(date: Date): Overlap {
  const diff = offsetMinutes(ME_TZ, date) - offsetMinutes(YOU_TZ, date);
  const a = (((9 * 60 + diff) % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const b = (((17 * 60 + diff) % MIN_PER_DAY) + MIN_PER_DAY) % MIN_PER_DAY;
  const pct = (m: number) => (m / MIN_PER_DAY) * 100;
  const segments =
    b > a
      ? [{ left: pct(a), width: pct(b - a) }]
      : [
          { left: pct(a), width: pct(MIN_PER_DAY - a) },
          { left: 0, width: pct(b) },
        ];
  const me = clock(ME_TZ, date);
  const [h, m] = me.split(":").map(Number);
  return {
    me,
    you: clock(YOU_TZ, date),
    start: pad(a),
    end: pad(b),
    segments,
    now: pct(h * 60 + m),
  };
}
