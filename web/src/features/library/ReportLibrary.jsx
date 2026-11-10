import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Download, FileText, GitCommit, Pin } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Feedback";
import PinButton from "@/components/ui/PinButton";
import Segmented from "@/components/ui/Segmented";
import { STATUS } from "@/features/dashboard/ProjectRow";
import {
  LibrarySection,
  LibraryToolbar,
  NoMatches,
  matchesQuery,
  splitPinned,
} from "./shared";
import { usePins } from "@/context/PinContext";
import { useToast } from "@/context/ToastContext";
import { useAsync } from "@/hooks/useAsync";
import { dateShort, dateTime, num } from "@/lib/format";
import { buildResult } from "@/mocks/data";
import { getResult, listProjects } from "@/services/projectService";
import { exportCsv } from "@/services/reportService";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "A–Z" },
];

const Actions = ({ p, onCsv }) => (
  <div className="rep-actions">
    <Button
      size="sm"
      variant="secondary"
      icon={<Download size={15} aria-hidden="true" />}
      onClick={() => onCsv(p.id)}
      aria-label={`Export CSV for ${p.name}`}
    >
      CSV
    </Button>
    <Button size="sm" to={`/app/projects/${p.id}/report`}>
      Open report
      <span className="visually-hidden"> for {p.name}</span>
    </Button>
  </div>
);

/** Pinned reports sit on a shelf as little sheets of paper. */
const DocTile = ({ p, report, onCsv, onPin }) => (
  <li className="doc-tile">
    <div className="doc-tile-top">
      <span className="doc-icon" aria-hidden="true">
        <FileText size={18} />
      </span>
      <PinButton name={p.name} pinned onToggle={onPin} />
    </div>
    <div className="lib-text">
      <Link to={`/app/projects/${p.id}/report`} className="lib-title">
        {p.name}
      </Link>
      <p className="lib-sub lib-mono">{report.reportId}</p>
    </div>
    <div className="doc-lines" aria-hidden="true">
      <span style={{ width: "92%" }} />
      <span style={{ width: "78%" }} />
      <span style={{ width: "58%" }} />
    </div>
    <p className="doc-date">
      <CalendarDays size={13} aria-hidden="true" />
      Snapshot {dateShort(report.snapshotAt)}
    </p>
    <Actions p={p} onCsv={onCsv} />
  </li>
);

const ReportRow = ({ p, report, pinned, onCsv, onPin }) => (
  <li className="rep-row">
    <div className="rep-doc">
      <span className="doc-icon" aria-hidden="true">
        <FileText size={18} />
      </span>
      <div className="lib-text">
        <Link to={`/app/projects/${p.id}/report`} className="lib-title">
          {p.name}
        </Link>
        <p className="lib-sub">
          <span className="lib-mono">{report.reportId}</span>
          {p.status === "needs_review" && (
            <Badge tone={STATUS.needs_review.tone} className="rep-flag">
              {STATUS.needs_review.label}
            </Badge>
          )}
        </p>
      </div>
    </div>
    <p className="rep-snap">
      <CalendarDays size={14} aria-hidden="true" />
      {dateTime(report.snapshotAt)}
    </p>
    <p className="rep-commits">
      <GitCommit size={14} aria-hidden="true" />
      {num(report.commitsAnalyzed)} commits analyzed
    </p>
    <Actions p={p} onCsv={onCsv} />
    <div className="rep-pin">
      <PinButton name={p.name} pinned={pinned} onToggle={onPin} />
    </div>
  </li>
);

/** Reports: a document library. Files you can open or export, not records to browse. */
const ReportLibrary = () => {
  const toast = useToast();
  const { data, loading } = useAsync(listProjects);
  const pins = usePins("report");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const finished = useMemo(
    () => (data ?? []).filter((p) => p.status !== "in_progress"),
    [data],
  );
  const reports = useMemo(
    () =>
      Object.fromEntries(
        finished.map((p) => [p.id, buildResult(p.id, p.name, p.repoUrl)]),
      ),
    [finished],
  );

  const visible = finished
    .filter((p) => matchesQuery(p, query))
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : new Date(reports[b.id].snapshotAt) -
          new Date(reports[a.id].snapshotAt),
    );
  const { pinned, rest } = splitPinned(visible, pins.ids);

  const csv = async (id) => {
    const result = await getResult(id);
    if (result) {
      exportCsv(result);
      toast("CSV exported");
    }
  };

  if (loading) {
    return (
      <div className="lib-skeletons" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="sk-row" />
        ))}
      </div>
    );
  }

  if (finished.length === 0) {
    return (
      <Card>
        <EmptyState icon={<FileText size={22} />} title="No reports yet">
          Finish an evaluation and its report will appear here.
        </EmptyState>
      </Card>
    );
  }

  return (
    <>
      <LibraryToolbar
        label="Search reports"
        placeholder="Search reports"
        query={query}
        onQuery={setQuery}
        shown={visible.length}
        noun="report"
        trailing={
          <Segmented
            label="Sort reports"
            value={sort}
            onChange={setSort}
            options={SORTS}
            className="lib-sort"
          />
        }
      />

      {visible.length === 0 ? (
        <NoMatches query={query} onClear={() => setQuery("")} />
      ) : (
        <>
          {pinned.length > 0 && (
            <LibrarySection
              title="Pinned reports"
              count={pinned.length}
              icon={<Pin size={15} aria-hidden="true" />}
              tone="pinned"
            >
              <ul className="doc-shelf">
                {pinned.map((p) => (
                  <DocTile
                    key={p.id}
                    p={p}
                    report={reports[p.id]}
                    onCsv={csv}
                    onPin={() => pins.toggle(p.id, p.name)}
                  />
                ))}
              </ul>
            </LibrarySection>
          )}
          {rest.length > 0 && (
            <LibrarySection
              title={pinned.length > 0 ? "All reports" : "Reports"}
              count={rest.length}
              icon={<FileText size={15} aria-hidden="true" />}
            >
              <div className="rep-list">
                <div className="rep-head" aria-hidden="true">
                  <span>Report</span>
                  <span>Snapshot</span>
                  <span>Evidence</span>
                  <span />
                  <span />
                </div>
                <ul>
                  {rest.map((p) => (
                    <ReportRow
                      key={p.id}
                      p={p}
                      report={reports[p.id]}
                      pinned={false}
                      onCsv={csv}
                      onPin={() => pins.toggle(p.id, p.name)}
                    />
                  ))}
                </ul>
              </div>
            </LibrarySection>
          )}
        </>
      )}
    </>
  );
};

export default ReportLibrary;
