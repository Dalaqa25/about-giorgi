"use client";

import { useState } from "react";
import styles from "../FieldReport.module.css";

type Result = { width: number; ok: boolean; text: string };
type Side = { caption: string; results: Result[] };
type Data = {
  status: string;
  label: string;
  lanes: { name: string; task: string }[];
  before: Side;
  after: Side | null;
};

const GOOD = "#85b695";
const BAD = "#d47766";
const PENDING = "After: in progress. Real numbers land here after the ModelGrow run.";

// Render "code" spans for tokens like .env and 3000 in the caption.
function caption(text: string) {
  return text.split(/(\.env|port 3000)/).map((p, i) =>
    p === ".env" || p === "port 3000" ? <code key={i}>{p}</code> : p,
  );
}

export default function Lanes({ data }: { data: Data }) {
  const done = data.status === "done" && data.after !== null;
  const [view, setView] = useState<"before" | "after">("before");
  const side = view === "after" && done ? data.after! : data.before;

  return (
    <div className={styles.ba}>
      <div className={styles.top}>
        <span className={`${styles.label} mono`}>{data.label}</span>
        <div className={styles.sw} role="group" aria-label="Before or after">
          <button
            type="button"
            aria-pressed={view === "before"}
            onClick={() => setView("before")}
          >
            before
          </button>
          <button
            type="button"
            aria-pressed={view === "after"}
            disabled={!done}
            onClick={() => setView("after")}
          >
            after
          </button>
        </div>
      </div>
      <div className={styles.lanes}>
        {data.lanes.map((l, i) => {
          const r = side.results[i];
          const color = r.ok ? GOOD : BAD;
          return (
            <div key={l.name} className={styles.lane}>
              <span className={styles.who}>{l.name}</span>
              <div
                className={styles.track}
                role="img"
                aria-label={`${l.name}, ${l.task}: ${r.text}`}
              >
                <div
                  className={styles.run}
                  style={{ width: `${r.width}%`, background: color }}
                />
              </div>
              <span className={styles.st} style={{ color }}>
                {r.text}
              </span>
            </div>
          );
        })}
      </div>
      <p className={styles.cap}>
        {caption(side.caption)}
        {!done && (
          <>
            <br />
            <span className="mono">{PENDING}</span>
          </>
        )}
      </p>
    </div>
  );
}
