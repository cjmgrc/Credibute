import { useMemo } from "react";
import {
  BarChart3,
  FileText,
  FolderGit2,
  GitPullRequest,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import ShareList from "@/features/results/ShareList";
import { useInView } from "@/hooks/useInView";
import { getSampleResult } from "@/services/projectService";
import { BRAND } from "@/domain/rubric";

const RAIL = [LayoutDashboard, FolderGit2, BarChart3, FileText];

/** A window onto the real results components with sample data. Its bars fill in once, when scrolled into view. */
const ProductPreview = () => {
  const data = useMemo(getSampleResult, []);
  const [ref, seen] = useInView("-120px");

  // Pull the two floating callouts from the same sample data the report uses,
  // so the marketing page can never drift from what the product shows.
  const top = [...data.results].sort((a, b) => b.share - a.share)[0];
  const topMember = data.members.find((m) => m.id === top.memberId);
  const proof = top.criteria.find((c) => c.criterionId === "collaboration")
    ?.evidence[0];
  const excludedCommits = data.exclusions
    .filter((x) => x.unit === "commits")
    .reduce((n, x) => n + x.count, 0);
  const coverage = Math.round(
    (data.commitsAttributed / data.commitsAnalyzed) * 100,
  );

  const stats = [
    ["Team activity", String(data.commitsAnalyzed), "commits analyzed"],
    ["Contributors", String(data.members.length), "every identity matched"],
    ["Coverage", `${coverage}%`, "of commits attributed"],
  ];

  return (
    <div ref={ref} className="lp-stage" aria-hidden="true" inert>
      <div className="lp-window">
        <div className="lp-window-bar">
          <div className="lp-dots">
            <span />
            <span />
            <span />
          </div>
          <p className="lp-window-title">
            {BRAND} / {data.projectName}
          </p>
        </div>
        <div className="lp-window-body">
          <div className="lp-rail">
            <LogoMark size={22} />
            {RAIL.map((Icon, i) => (
              <span key={i} className={i === 0 ? "is-active" : undefined}>
                <Icon size={17} />
              </span>
            ))}
          </div>
          <div className="lp-win-main">
            <div className="lp-win-head">
              <div>
                <p className="lp-win-status">Evaluation complete</p>
                <p className="lp-win-name">{data.projectName}</p>
              </div>
              <span className="lp-win-export">Export report</span>
            </div>
            <div className="lp-stats">
              {stats.map(([label, value, hint]) => (
                <div key={label} className="lp-stat">
                  <p className="lp-stat-label">{label}</p>
                  <p className="lp-stat-value">{value}</p>
                  <p className="lp-stat-hint">{hint}</p>
                </div>
              ))}
            </div>
            <div className="lp-panel">
              <p className="lp-panel-title">Estimated contribution share</p>
              <p className="lp-panel-sub">Based on the selected rubric</p>
              <ShareList
                results={data.results}
                members={data.members}
                active={seen}
              />
            </div>
          </div>
        </div>
      </div>

      {proof && (
        <div className="lp-float lp-float-evidence">
          <span className="lp-float-icon">
            <GitPullRequest size={15} />
          </span>
          <div>
            <p className="lp-float-kicker">
              Evidence · {topMember.name}
            </p>
            <p className="lp-float-text">{proof.title}</p>
          </div>
        </div>
      )}
      <div className="lp-float lp-float-excluded">
        <span className="lp-float-icon">
          <ShieldCheck size={15} />
        </span>
        <div>
          <p className="lp-float-kicker">Left out, on the record</p>
          <p className="lp-float-text">
            {excludedCommits} commits excluded, reasons listed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
