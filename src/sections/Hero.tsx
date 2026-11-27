import styles from "./Hero.module.css";
import TimeOverlap from "./TimeOverlap";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.top}>
        <div className={`mono ${styles.path}`}>
          ~/about-giorgi<span className={styles.cursor} aria-hidden="true" />
        </div>
        <img
          className={styles.avatar}
          src="/me.jpg"
          width={64}
          height={64}
          alt="Giorgi Dalakishvili"
        />
      </div>
      <h1 className={styles.name}>
        Giorgi <b>Dalakishvili</b>
      </h1>
      <p className={styles.lead}>
        I go where the problem is, build what fixes it, and stay{" "}
        <em>until it works in production.</em>
      </p>
      <TimeOverlap />
    </section>
  );
}
