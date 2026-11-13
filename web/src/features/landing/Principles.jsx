import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  EyeOff,
  FileCheck2,
  FileSearch,
  Lock,
  Ruler,
  ScanSearch,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { REPO_URL } from "@/domain/rubric";
import { displayShares } from "@/domain/scoring";
import { getSampleResult } from "@/services/projectService";
import Reveal from "./Reveal";

const CLONE = `git clone ${REPO_URL}.git`;

/** Up to two decimals, trailing zeros trimmed, so the rows visibly add up to the total. */
const fmt = (n) => String(Number(n.toFixed(2)));

/** Clone command with a copy button; the live region announces the result to screen readers. */
const CopyCommand = ({ command }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the command is still selectable */
    }
  };
  return (
    <div className="lp-code">
      <code>
        <span className="lp-code-prompt">$ </span>
        {command}
      </code>
      <button
        type="button"
        className="lp-copy"
        onClick={copy}
        aria-label="Copy clone command"
      >
        {copied ? (
          <Check size={15} aria-hidden="true" />
        ) : (
          <Copy size={15} aria-hidden="true" />
        )}
        <span className="lp-wide">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span className="lp-sr" role="status">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
};

const PIPELINE = [
  { Icon: ScanSearch, title: "Read", note: "Changes in your repository" },
  { Icon: Ruler, title: "Measure", note: "Counts and shares, per rubric" },
  { Icon: Trash2, title: "Discard", note: "Source code is never stored", done: true },
];

const Principles = () => {
  // Worked example comes from the same sample data as the report and the
  // methodology page, so the numbers on the landing page always add up.
  const { top, rows, total, shown, exclusions } = useMemo(() => {
    const data = getSampleResult();
    const best = [...data.results].sort((a, b) => b.share - a.share)[0];
    const member = data.members.find((m) => m.id === best.memberId);
    const lines = data.rubric.criteria.map((c) => {
      const share = best.criteria.find((x) => x.criterionId === c.id).share;
      return { name: c.name, share, weight: c.weight, pts: (share * c.weight) / 100 };
    });
    return {
      top: member,
      rows: lines,
      total: lines.reduce((n, l) => n + l.pts, 0),
      shown: displayShares(data.results)[member.id],
      exclusions: data.exclusions,
    };
  }, []);

  return (
    <section id="principles" className="lp-section" aria-labelledby="principles-title">
      <Reveal className="lp-contrast-head">
        <p className="lp-eyebrow">Principles</p>
        <h2 id="principles-title" className="lp-h2">
          Evidence, not guesswork.
        </h2>
        <p className="lp-lead">
          Every number links back to measurable repository activity. Nothing
          hidden, nothing invented.
        </p>
      </Reveal>

      <div className="lp-bento">
        <Reveal as="article" className="lp-card lp-card-a">
          <span className="lp-card-icon">
            <FileCheck2 size={20} aria-hidden="true" />
          </span>
          <h3 className="lp-card-title">Explainable by design</h3>
          <p className="lp-card-body">
            Inspect the exact commits, reviews, tests, and weighting rules
            behind every result.
          </p>
          <div className="lp-card-visual">
            <code className="lp-formula">
              estimate = Σ ( criterion share × criterion weight )
            </code>
            <table className="lp-table">
              <caption>Worked example: {top.name}, sample report</caption>
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  <th scope="col">Share</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.share}%</td>
                    <td>{r.weight}%</td>
                    <td>{fmt(r.pts)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>Overall estimate</td>
                  <td>
                    {fmt(total)} → {shown}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <Link to="/methodology" className="lp-link">
            Explore the methodology <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal as="article" className="lp-card lp-card-b" delay={90}>
          <span className="lp-card-icon">
            <Lock size={20} aria-hidden="true" />
          </span>
          <h3 className="lp-card-title">Private by default</h3>
          <p className="lp-card-body">
            Analysis runs with least-privilege access. Source code is read to
            measure changes, never stored.
          </p>
          <ol className="lp-card-visual lp-pipeline">
            {PIPELINE.map(({ Icon, title, note, done }) => (
              <li key={title} className={`lp-pipe-row${done ? " lp-pipe-done" : ""}`}>
                <span className="lp-pipe-node">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span>
                  {title}
                  <small>{note}</small>
                </span>
              </li>
            ))}
          </ol>
          <ul className="lp-tags" aria-label="Access model">
            <li>Least-privilege access</li>
            <li>Tokens stay on the server</li>
          </ul>
          <Link to="/privacy" className="lp-link">
            Read our privacy approach <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal as="article" className="lp-card lp-card-c">
          <span className="lp-card-icon">
            <Code2 size={20} aria-hidden="true" />
          </span>
          <h3 className="lp-card-title">Open source, always</h3>
          <p className="lp-card-body">
            Audit the calculations, host it yourself, or contribute
            improvements on GitHub.
          </p>
          <div className="lp-card-visual">
            <CopyCommand command={CLONE} />
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="lp-link"
          >
            View source <ExternalLink size={14} aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal as="article" className="lp-card lp-card-d" delay={90}>
          <span className="lp-card-icon">
            <EyeOff size={20} aria-hidden="true" />
          </span>
          <h3 className="lp-card-title">Shows what it left out</h3>
          <p className="lp-card-body">
            Generated files, reverts, duplicates, and bot commits are excluded
            and listed in every report with the reason, so you can disagree
            with a decision you can see.
          </p>
          <ul className="lp-card-visual lp-excl">
            {exclusions.map((x) => (
              <li key={x.id}>
                <span className="lp-excl-count">{x.count}</span>
                <span className="lp-excl-name">
                  {x.title}
                  <span className="lp-sr"> ({x.unit})</span>
                </span>
                <span className="lp-excl-eg">{x.examples[0]}</span>
              </li>
            ))}
          </ul>
          <Link to="/sample" className="lp-link">
            <FileSearch size={15} aria-hidden="true" />
            See it in a sample report
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Principles;
