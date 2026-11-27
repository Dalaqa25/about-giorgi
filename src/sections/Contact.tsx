import styles from "./Contact.module.css";
import Reveal from "../components/Reveal";

const rows = [
  {
    label: "Email",
    value: "g.dalaqishvili01@gmail.com",
    href: "mailto:g.dalaqishvili01@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "giorgi-dalakishvili",
    href: "https://www.linkedin.com/in/giorgi-dalakishvili-391374320",
    external: true,
  },
  {
    label: "GitHub",
    value: "Dalaqa25",
    href: "https://github.com/Dalaqa25",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className={styles.head}>
        <span className={`${styles.no} mono`}>06</span>
        <h2>Say hi</h2>
      </div>
      <Reveal className={styles.rows}>
        {rows.map((r) => (
          <a
            key={r.label}
            href={r.href}
            {...(r.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {r.label}
            <span className="mono">{r.value} →</span>
          </a>
        ))}
      </Reveal>
      <footer className={`${styles.foot} mono`}>
        built with Fredrin, reviewed by me · Tbilisi 2026
      </footer>
    </section>
  );
}
