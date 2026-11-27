"use client";

import { useEffect, useRef } from "react";
import styles from "../Shipped.module.css";

// The accent line that fills down the timeline as you scroll.
export default function Fill() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const tl = el?.parentElement;
    if (!el || !tl) return;
    const update = () => {
      const r = tl.getBoundingClientRect();
      const total = Math.max(r.height - 20, 1);
      const p = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / total, 0), 1);
      el.style.height = `${p * total}px`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={ref} className={styles.fill} aria-hidden="true" />;
}
