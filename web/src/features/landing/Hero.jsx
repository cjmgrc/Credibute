import { ArrowRight, Check, Eye } from "lucide-react";
import Button from "@/components/ui/Button";
import CommitGraph from "@/components/brand/CommitGraph";
import ProductPreview from "./ProductPreview";

const TICKS = [
  "Source code is never stored",
  "Every calculation explained",
  "Open source",
];

const Hero = () => (
  <section className="lp-hero" aria-labelledby="hero-title">
    <CommitGraph className="lp-hero-graph" />
    <div className="lp-hero-inner">
      <div className="lp-hero-copy">
        <p className="lp-pill hero-entrance hero-entrance-1">
          <span className="lp-pill-dot" aria-hidden="true" />
          Open source, rule-based, and AI-free
        </p>
        <h1 id="hero-title" className="lp-h1 hero-entrance hero-entrance-2">
          See the work.
          <br />
          <span className="lp-grad">
            Share the credit.
            <svg
              className="lp-underline"
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path pathLength="1" d="M3 9 C 60 2, 118 12, 176 6 S 268 4, 297 8" />
            </svg>
          </span>
        </h1>
        <p className="lp-hero-sub hero-entrance hero-entrance-3">
          Turn Git history into a transparent, evidence-based contribution
          report for student teams. Understand who did what, without black-box
          scoring.
        </p>
        <div className="lp-hero-cta hero-entrance hero-entrance-4">
          <Button
            to="/signup"
            size="lg"
            trailing={<ArrowRight size={17} aria-hidden="true" />}
          >
            Evaluate a repository
          </Button>
          <Button
            to="/sample"
            size="lg"
            variant="secondary"
            icon={<Eye size={17} aria-hidden="true" />}
          >
            View sample report
          </Button>
        </div>
        <ul className="lp-ticks hero-entrance hero-entrance-5">
          {TICKS.map((t) => (
            <li key={t}>
              <Check size={15} strokeWidth={2.5} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="hero-entrance hero-entrance-6">
        <ProductPreview />
      </div>
    </div>
  </section>
);

export default Hero;
