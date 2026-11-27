"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import { overlap, type Overlap } from "./overlapMath";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function TimeOverlap() {
  const [o, setO] = useState<Overlap | null>(null);

  useEffect(() => {
    const tick = () => setO(overlap(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.tz}>
      <div className={styles.row}>
        <div className={styles.city}>
          <span className="mono">TBILISI · me</span>
          <span className={styles.clock}>{o ? o.me : "--:--"}</span>
        </div>
        <div className={`${styles.city} ${styles.right}`}>
          <span className="mono">LOS ANGELES · you</span>
          <span className={`${styles.clock} ${styles.you}`}>
            {o ? o.you : "--:--"}
          </span>
        </div>
      </div>
      <div className={styles.bar} aria-hidden="true">
        {HOURS.map((h) => (
          <span key={h} className={styles.cell} />
        ))}
        {o?.segments.map((s, i) => (
          <span
            key={i}
            className={styles.work}
            style={{ left: `${s.left}%`, width: `${s.width}%` }}
          />
        ))}
        {o && <span className={styles.now} style={{ left: `${o.now}%` }} />}
      </div>
      <div className={`${styles.ticks} mono`} aria-hidden="true">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
      <p className={styles.note}>
        Your 9 to 5 in Los Angeles is my{" "}
        <b>{o ? `${o.start} to ${o.end}` : "21:00 to 05:00"}</b>. I work your
        hours.
      </p>
    </div>
  );
}
