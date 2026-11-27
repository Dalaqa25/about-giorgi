"use client";

import { useState } from "react";
import styles from "../HowBuilt.module.css";
import entries from "../../data/friction.json";

export default function Friction() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className={styles.log}>
      {entries.map((e, i) => {
        const isOpen = open === i;
        return (
          <li key={e.time + e.title} className={styles.fr}>
            <button
              type="button"
              className={styles.frBtn}
              aria-expanded={isOpen}
              aria-controls={`fr-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className={`${styles.frTime} mono`}>{e.time}</span>
              <span className={styles.frTitle}>{e.title}</span>
              <span className={styles.arrow} aria-hidden="true">
                ▸
              </span>
            </button>
            {isOpen && (
              <dl id={`fr-${i}`} className={styles.frBody}>
                <dt>what happened</dt>
                <dd>{e.happened}</dd>
                <dt>fix I would ship</dt>
                <dd>{e.fix}</dd>
              </dl>
            )}
          </li>
        );
      })}
    </ul>
  );
}
