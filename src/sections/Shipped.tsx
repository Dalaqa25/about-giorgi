import type { ReactNode } from "react";
import styles from "./Shipped.module.css";
import Story from "./shipped/Story";
import Fill from "./shipped/Fill";

const n = (v: string) => <b className={styles.num}>{v}</b>;

type Entry = {
  when: string;
  name: ReactNode;
  role?: string;
  summary: ReactNode;
  more?: { label: string; text: string }[];
  startOpen?: boolean;
};

const entries: Entry[] = [
  {
    when: "SEP 2026 · NOW",
    name: "Tipalti",
    role: "AI Solution Engineer",
    summary: "At Tipalti I build agents.",
  },
  {
    when: "2024 · 2026",
    name: "ModelGrow",
    role: "founder",
    summary: (
      <>
        My own product, {n("100+")} active users. I talked to every one of them
        myself.
      </>
    ),
    more: [{ label: "what broke", text: "The auth flow." }],
    startOpen: true,
  },
  {
    when: "OCT 2026",
    name: "ModelGrow Lite",
    summary: (
      <>
        Rebuilt the core in {n("4 days")} with parallel Claude Code agents:{" "}
        {n("943 commits")}, {n("20+ integrations")}, a {n("325 case")} eval
        suite.
      </>
    ),
    more: [
      {
        label: "what broke",
        text: "Dates worked on my laptop and broke on real Postgres. The AI got it wrong, the tests did not catch it, production did.",
      },
    ],
  },
  {
    when: "2024 · 2026",
    name: "Hapttic",
    role: "software engineer",
    summary: (
      <>
        Built the whole front end of a real time AI analytics product.{" "}
        {n("~100 PRs")} with the team.
      </>
    ),
  },
  {
    when: "2023",
    name: "Banyan AI",
    summary: <>Wired an automation platform into {n("30+")} customer systems.</>,
  },
  {
    when: "OPEN SOURCE",
    name: (
      <a href="https://github.com/lightdash/lightdash/pull/32292">Lightdash</a>
    ),
    role: "proposed fix",
    summary: (
      <>
        A migration that stalled under load: {n("0/5")} runs finished before,{" "}
        {n("5/5")} in under a second after.
      </>
    ),
    more: [
      {
        label: "how",
        text: "Reproduced it with 1M rows and a concurrent writer, then caught a race in my own fix by stress testing.",
      },
      {
        label: "honest bit",
        text: "Without load it is not faster. Not merged.",
      },
    ],
  },
];

export default function Shipped() {
  return (
    <section id="shipped" aria-labelledby="shipped-title">
      <div className={styles.head}>
        <span className={`${styles.no} mono`}>01</span>
        <h2 id="shipped-title">
          In the <i>field</i>
        </h2>
      </div>
      <ol className={styles.tl}>
        <Fill />
        {entries.map((e, i) => (
          <li key={i} className={styles.ev}>
            <div className={`${styles.when} mono`}>{e.when}</div>
            <div className={styles.title}>
              <b>{e.name}</b>
              {e.role && <span className={styles.role}> {e.role}</span>}
            </div>
            <p className={styles.sum}>{e.summary}</p>
            {e.more && <Story rows={e.more} startOpen={e.startOpen} />}
          </li>
        ))}
      </ol>
    </section>
  );
}
