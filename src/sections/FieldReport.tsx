import styles from "./FieldReport.module.css";
import Lanes from "./fieldreport/Lanes";
import Reveal from "../components/Reveal";
import data from "../data/field-report.json";

export default function FieldReport() {
  return (
    <section id="report">
      <div className={styles.head}>
        <span className={`${styles.no} mono`}>03</span>
        <h2>
          Field <i>report</i>
        </h2>
      </div>
      <p className={styles.lede}>
        The job post says an FDE makes each customer&apos;s repo agent ready.
        So I did it on my own production app, ModelGrow, before applying.
      </p>
      <Reveal>
        <Lanes data={data} />
      </Reveal>
    </section>
  );
}
