import styles from "./Why.module.css";
import Reveal from "../components/Reveal";

export default function Why() {
  return (
    <section id="why">
      <div className={styles.head}>
        <span className={`${styles.no} mono`}>04</span>
        <h2>
          Why <i>FDE</i>
        </h2>
      </div>
      <Reveal className={styles.why}>
        <p>
          When I started with computers, engineering was fun because of the
          loop: come up with a creative solution, code it, get stuck, dig in,
          solve it. Then AI stepped in and agents took over most of that loop.
          Half of the creativity was gone.
        </p>
        <p>
          Then I became a founder and started talking to customers, and I
          thought: this is the step forward. Sitting with people, understanding
          their problem, building it with them. That&apos;s how humans work. It
          adds a lot more flavor than normal engineering, you get it.
        </p>
        <p>For me it feels like getting back to my roots.</p>
        <span className={styles.sig}>Giorgi</span>
      </Reveal>
    </section>
  );
}
