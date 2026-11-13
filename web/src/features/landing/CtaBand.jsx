import { ArrowRight, GitBranch, Eye } from "lucide-react";
import Button from "@/components/ui/Button";
import CommitGraph from "@/components/brand/CommitGraph";
import Reveal from "./Reveal";

/** Dark in both themes on purpose: one deliberate contrast moment on the page. */
const CtaBand = () => (
  <section className="lp-cta" aria-labelledby="cta-title">
    <div className="lp-cta-card">
      <CommitGraph className="lp-cta-graph lp-cta-graph-l" />
      <CommitGraph className="lp-cta-graph lp-cta-graph-r" />
      <Reveal>
        <span className="lp-cta-pill">
          <GitBranch size={14} aria-hidden="true" />
          Built for student teams
        </span>
        <h2 id="cta-title" className="lp-cta-title">
          Make team work easier to explain.
        </h2>
        <p className="lp-cta-sub">
          Connect a repository and see the evidence in minutes. No AI, no black
          boxes.
        </p>
        <div className="lp-cta-actions">
          <Button
            to="/signup"
            size="lg"
            trailing={<ArrowRight size={17} aria-hidden="true" />}
          >
            Analyze your project
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
      </Reveal>
    </div>
  </section>
);

export default CtaBand;
