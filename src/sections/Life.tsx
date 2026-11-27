import styles from "./Life.module.css";
import Reveal from "../components/Reveal";

export default function Life() {
  return (
    <section id="life">
      <div className={styles.head}>
        <span className={`${styles.no} mono`}>05</span>
        <h2>Life</h2>
      </div>
      <Reveal className={styles.life}>
        <p>
          My village is near the mountains, and it gets pretty cold. I go
          hiking a lot, 10 km or more.
        </p>
        <p>
          My family grows grapes, about 25 tonnes a year, and we&apos;re
          starting our own wine. And a CFMoto 450SS is on its way to me.
        </p>
        <div className={styles.pols}>
          <figure className={styles.pol}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/me.jpg"
              alt="Giorgi presenting his work at Caucasus International University"
              width={220}
              height={190}
            />
            <figcaption>presenting at uni</figcaption>
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
