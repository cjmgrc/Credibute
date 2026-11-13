import { Check, X } from "lucide-react";
import Reveal from "./Reveal";

const OLD = [
  "Compare raw commit counts",
  "Go on gut feeling and who spoke up most",
  "Argue about it the night before the demo",
  "Hand over a number nobody can check",
];
const NEW = [
  "Weight commits by substance, not volume",
  "Count reviews, pull requests, and tests too",
  "List every excluded change with its reason",
  "Reproduce the same result from the same snapshot",
];

const Contrast = () => (
  <section id="why" className="lp-section" aria-labelledby="why-title">
    <Reveal className="lp-contrast-head">
      <p className="lp-eyebrow">Why it exists</p>
      <h2 id="why-title" className="lp-h2">
        Fair grading starts with visible evidence.
      </h2>
      <p className="lp-lead">
        Commit quantity alone isn’t a reliable measure of contribution.
        Credibute shows its working, so a team can discuss the result instead
        of arguing about it.
      </p>
    </Reveal>
    <div className="lp-ledger">
      <Reveal className="lp-ledger-col lp-ledger-old">
        <h3 className="lp-ledger-title">The usual way</h3>
        <ul>
          {OLD.map((t) => (
            <li key={t}>
              <X size={18} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="lp-ledger-col lp-ledger-new" delay={120}>
        <h3 className="lp-ledger-title">With Credibute</h3>
        <ul>
          {NEW.map((t) => (
            <li key={t}>
              <Check size={18} strokeWidth={2.5} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default Contrast;
