import { FileText, SlidersHorizontal } from "lucide-react";
import { GithubMark, GitlabMark } from "@/components/brand/BrandIcons";

/** Honest compatibility facts instead of invented logos or testimonials. */
const TrustStrip = () => (
  <section className="lp-strip" aria-label="Compatibility">
    <div className="lp-strip-inner">
      <p className="lp-strip-label">Works with</p>
      <span className="lp-chip">
        <GithubMark size={17} />
        GitHub
      </span>
      <span className="lp-chip lp-chip-soon">
        <GitlabMark size={17} />
        GitLab
        <small>Soon</small>
      </span>
      <span className="lp-strip-sep" aria-hidden="true" />
      <span className="lp-chip">
        <SlidersHorizontal size={16} aria-hidden="true" />
        Your instructor’s rubric
      </span>
      <span className="lp-chip">
        <FileText size={16} aria-hidden="true" />
        Printable report
      </span>
    </div>
  </section>
);

export default TrustStrip;
