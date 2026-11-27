import styles from "./HowBuilt.module.css";
import Board from "./howbuilt/Board";
import Friction from "./howbuilt/Friction";
import Reveal from "../components/Reveal";

export default function HowBuilt() {
  return (
    <section id="built">
      <div className={styles.head}>
        <span className={`${styles.no} mono`}>02</span>
        <h2>
          How this page <i>was built</i>
        </h2>
      </div>
      <p className={styles.lede}>
        On a Fredrin board. Project context first, then parallel tickets. I
        reviewed every diff.
      </p>
      <Reveal>
        <Board />
      </Reveal>
      <h3 className={`${styles.logTitle} mono`}>friction log</h3>
      <Friction />
    </section>
  );
}
