import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const QUESTIONS = [
  {
    q: "Does Credibute use AI to score people?",
    a: (
      <>
        No. It applies documented rules to a snapshot of repository activity.
        There’s no model making judgement calls, so the same snapshot and
        rubric always produce the same result.
      </>
    ),
  },
  {
    q: "Is our source code stored?",
    a: (
      <>
        No. Source code is read to measure changes, never stored. Access runs
        with least-privilege permissions and tokens stay on the server. The{" "}
        <Link to="/privacy">privacy page</Link> has the details.
      </>
    ),
  },
  {
    q: "Is the score just a commit count?",
    a: (
      <>
        No. Commit quantity alone isn’t a reliable measure, so commits are
        weighted by the size of the change and sit alongside code changes,
        reviews, pull requests, and tests.
      </>
    ),
  },
  {
    q: "Can we use our instructor’s rubric?",
    a: (
      <>
        Yes. Use the Credibute rubric, or set your own criteria and weights.
        Weights need to add up to 100%, and the report names the rubric it
        used.
      </>
    ),
  },
  {
    q: "What happens to commits that shouldn’t count?",
    a: (
      <>
        Generated files, reverted changes, duplicate changes, and bot commits
        are excluded and listed in every report with the reason. Anything that
        couldn’t be measured is disclosed, never silently counted as zero.
      </>
    ),
  },
  {
    q: "Does it work with GitLab?",
    a: <>GitHub works today. GitLab is coming soon.</>,
  },
];

const Faq = () => (
  <section id="faq" className="lp-section" aria-labelledby="faq-title">
    <div className="lp-faq-grid">
      <Reveal className="lp-faq-intro">
        <p className="lp-eyebrow">Questions</p>
        <h2 id="faq-title" className="lp-h2">
          Straight answers.
        </h2>
        <p className="lp-lead">
          The short version of how scoring, privacy, and rubrics work.
        </p>
        <Link to="/methodology" className="lp-link">
          Read the full methodology
        </Link>
      </Reveal>
      <Reveal className="lp-faq" delay={90}>
        {QUESTIONS.map(({ q, a }, i) => (
          <details key={q} name="faq" open={i === 0 || undefined}>
            <summary>
              {q}
              <Plus size={20} aria-hidden="true" />
            </summary>
            <div className="lp-faq-answer">{a}</div>
          </details>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Faq;
