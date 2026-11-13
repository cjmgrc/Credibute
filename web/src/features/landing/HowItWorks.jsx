import { ArrowRight, Eye, FileSearch, Link2, SlidersHorizontal, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "./Reveal";

const STEPS = [
  {
    Icon: Link2,
    title: "Connect",
    body: "Link a GitHub repository. GitLab is coming soon.",
  },
  {
    Icon: Users,
    title: "Match",
    body: "Confirm which Git identities belong to which teammate.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Evaluate",
    body: "Use your instructor’s rubric, or ours.",
  },
  {
    Icon: FileSearch,
    title: "Review",
    body: "Explore the evidence behind every number and export a report.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="lp-section" aria-labelledby="how-title">
    <Reveal className="lp-steps-head">
      <p className="lp-eyebrow">How it works</p>
      <h2 id="how-title" className="lp-h2">
        From repository to report in four clear steps.
      </h2>
    </Reveal>
    <Reveal as="ol" className="lp-steps" margin="-40px">
      {STEPS.map(({ Icon, title, body }, i) => (
        <li key={title} className="lp-step" style={{ "--i": i }}>
          <span className="lp-step-node" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lp-step-card">
            <span className="lp-step-icon">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </li>
      ))}
    </Reveal>
    <div className="lp-steps-cta">
      <Button
        to="/signup"
        size="lg"
        trailing={<ArrowRight size={17} aria-hidden="true" />}
      >
        Start an evaluation
      </Button>
      <Button
        to="/sample"
        size="lg"
        variant="secondary"
        icon={<Eye size={17} aria-hidden="true" />}
      >
        Look at a sample first
      </Button>
    </div>
  </section>
);

export default HowItWorks;
