"use client";

import { useId, useState } from "react";
import styles from "../Shipped.module.css";

type Row = { label: string; text: string };

export default function Story({
  rows,
  startOpen = false,
}: {
  rows: Row[];
  startOpen?: boolean;
}) {
  const [open, setOpen] = useState(startOpen);
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        className={`${styles.more} mono`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.arrow} aria-hidden="true">
          ▸
        </span>
        more
      </button>
      <div
        id={panelId}
        className={styles.story}
        data-open={open}
        role="region"
        aria-label="more details"
      >
        <div className={styles.storyInner}>
          <dl className={styles.rows}>
            {rows.map((r) => (
              <div key={r.label} className={styles.row}>
                <dt className="mono">{r.label}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
