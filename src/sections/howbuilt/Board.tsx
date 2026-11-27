"use client";

import { useState } from "react";
import styles from "../HowBuilt.module.css";
import log from "../../data/build-log.json";

type Move = { status: string; time: string };
type Ticket = { id: string; title: string; pr: string | null; moves: Move[] };

const tickets = log as Ticket[];
const COLS = [
  { key: "backlog", color: "#a8957f" },
  { key: "running", color: "#e49b5d" },
  { key: "review", color: "#a3a9ce" },
  { key: "done", color: "#85b695" },
];

const stamps = tickets.flatMap((t) => t.moves.map((m) => Date.parse(m.time)));
const MIN = Math.min(...stamps);
const MAX = Math.max(...stamps);
const STEP = 60000;
const TOTAL = Math.ceil((MAX - MIN) / STEP);

const clock = (ms: number) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tbilisi",
    hour: "2-digit",
    minute: "2-digit",
  }).format(ms);

function statusAt(t: Ticket, at: number) {
  let s: string | null = null;
  for (const m of t.moves) if (Date.parse(m.time) <= at) s = m.status;
  return s;
}

export default function Board() {
  const [v, setV] = useState(TOTAL);
  const [picked, setPicked] = useState<string | null>(null);
  const at = MIN + v * STEP;
  const pickedTicket = tickets.find((t) => t.id === picked);

  return (
    <div className={styles.board}>
      <div className={styles.cols}>
        {COLS.map((c) => (
          <div key={c.key} className={styles.col}>
            <h4>
              <i className={styles.dot} style={{ background: c.color }} />
              {c.key}
            </h4>
            {tickets
              .filter((t) => statusAt(t, at) === c.key)
              .map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={styles.card}
                  aria-pressed={picked === t.id}
                  onClick={() => setPicked(picked === t.id ? null : t.id)}
                >
                  {t.title}
                  <small>{t.id}</small>
                </button>
              ))}
          </div>
        ))}
      </div>
      <div className={`${styles.scrub} mono`}>
        <span aria-hidden="true">{clock(MIN)}</span>
        <input
          type="range"
          min={0}
          max={TOTAL}
          step={1}
          value={v}
          aria-label="Replay the board, Tbilisi time"
          aria-valuetext={clock(at)}
          onChange={(e) => setV(Number(e.target.value))}
        />
        <span className={styles.t} aria-live="polite">
          {clock(at)}
        </span>
      </div>
      <p className={styles.detail} aria-live="polite">
        {pickedTicket ? (
          <>
            <b>{pickedTicket.id}</b> {pickedTicket.title}.{" "}
            {pickedTicket.pr ? (
              <a href={pickedTicket.pr} target="_blank" rel="noopener noreferrer">
                Pull request on GitHub
              </a>
            ) : (
              "No pull request yet."
            )}
          </>
        ) : (
          "Click a card to see its id and pull request. Times are Tbilisi."
        )}
      </p>
    </div>
  );
}
