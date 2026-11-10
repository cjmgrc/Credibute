import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Pin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Feedback";
import PinButton from "@/components/ui/PinButton";
import Segmented from "@/components/ui/Segmented";
import { STATUS } from "@/features/dashboard/ProjectRow";
import {
  FilterChips,
  LibrarySection,
  LibraryToolbar,
  NoMatches,
  matchesQuery,
  splitPinned,
} from "./shared";
import { usePins } from "@/context/PinContext";
import { displayShares } from "@/domain/scoring";
import { useAsync } from "@/hooks/useAsync";
import { hostPath, relativeTime } from "@/lib/format";
import { buildResult } from "@/mocks/data";
import { listProjects } from "@/services/projectService";

/** One hue, stepped by rank. Never red/amber: a share is an estimate, not a grade. */
const SEGMENT_TINTS = [100, 68, 46, 30, 18];
const tint = (i) =>
  `color-mix(in oklab, var(--accent) ${SEGMENT_TINTS[Math.min(i, SEGMENT_TINTS.length - 1)]}%, var(--surface))`;

const splitFor = (p) => {
  const r = buildResult(p.id, p.name, p.repoUrl);
  const shown = displayShares(r.results);
  return r.members
    .map((m) => ({ id: m.id, name: m.name, pct: shown[m.id] }))
    .sort((a, b) => b.pct - a.pct);
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "complete", label: "Complete" },
  { value: "needs_review", label: "Needs review" },
];
const SORTS = [
  { value: "recent", label: "Recent" },
  { value: "name", label: "A–Z" },
];

const EvaluationCard = ({ p, split, pinned, onPin }) => (
  <li
    className="lib-card eval-card"
    data-status={p.status}
    data-pinned={pinned || undefined}
  >
    <div className="eval-top">
      <Avatar name={p.name} tone={p.tone} square size="lg" />
      <div className="lib-text">
        <Link
          to={`/app/projects/${p.id}/results`}
          className="stretch lib-title"
        >
          {p.name}
        </Link>
        <p className="lib-sub">{hostPath(p.repoUrl)}</p>
      </div>
      <PinButton name={p.name} pinned={pinned} onToggle={onPin} />
    </div>

    <div>
      <p className="eval-split-label">
        <span>Estimated split</span>
        <span>{p.memberCount} members</span>
      </p>
      <div className="split-bar" aria-hidden="true">
        {split.map((s, i) => (
          <span
            key={s.id}
            className="split-seg"
            style={{ flex: `${s.pct} 1 0%`, background: tint(i) }}
          />
        ))}
      </div>
      <ul className="split-legend">
        {split.map((s, i) => (
          <li key={s.id}>
            <span
              className="split-dot"
              aria-hidden="true"
              style={{ background: tint(i) }}
            />
            <span className="split-name">{s.name.split(" ")[0]}</span>
            <span className="split-pct">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="eval-foot">
      <Badge tone={STATUS[p.status].tone} dot>
        {STATUS[p.status].label}
      </Badge>
      <span className="eval-rubric" title={p.rubricLabel}>
        {p.rubricLabel}
      </span>
      <time dateTime={p.updatedAt}>{relativeTime(p.updatedAt)}</time>
    </div>
  </li>
);

/** Evaluations: a card board. Each card shows what the analysis found, not just that it exists. */
const EvaluationBoard = () => {
  const { data, loading } = useAsync(listProjects);
  const pins = usePins("evaluation");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");

  const finished = useMemo(
    () => (data ?? []).filter((p) => p.status !== "in_progress"),
    [data],
  );
  const splits = useMemo(
    () => Object.fromEntries(finished.map((p) => [p.id, splitFor(p)])),
    [finished],
  );
  const counts = {
    all: finished.length,
    complete: finished.filter((p) => p.status === "complete").length,
    needs_review: finished.filter((p) => p.status === "needs_review").length,
  };

  const visible = finished
    .filter(
      (p) =>
        (status === "all" || p.status === status) && matchesQuery(p, query),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : new Date(b.updatedAt) - new Date(a.updatedAt),
    );
  const { pinned, rest } = splitPinned(visible, pins.ids);
  const clear = () => {
    setQuery("");
    setStatus("all");
  };

  if (loading) {
    return (
      <div className="eval-grid" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="sk-card" />
        ))}
      </div>
    );
  }

  if (finished.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<BarChart3 size={22} />}
          title="No evaluations yet"
          action={<Button to="/app/new/repository">New evaluation</Button>}
        >
          Finish an analysis and its results will appear here.
        </EmptyState>
      </Card>
    );
  }

  const renderCard = (p, isPinned) => (
    <EvaluationCard
      key={p.id}
      p={p}
      split={splits[p.id]}
      pinned={isPinned}
      onPin={() => pins.toggle(p.id, p.name)}
    />
  );

  return (
    <>
      <LibraryToolbar
        label="Search evaluations"
        placeholder="Search evaluations"
        query={query}
        onQuery={setQuery}
        shown={visible.length}
        noun="evaluation"
        leading={
          <FilterChips
            label="Filter by status"
            value={status}
            onChange={setStatus}
            options={FILTERS.map((f) => ({ ...f, count: counts[f.value] }))}
          />
        }
        trailing={
          <Segmented
            label="Sort evaluations"
            value={sort}
            onChange={setSort}
            options={SORTS}
            className="lib-sort"
          />
        }
      />

      {visible.length === 0 ? (
        <NoMatches query={query} onClear={clear} />
      ) : (
        <>
          {pinned.length > 0 && (
            <LibrarySection
              title="Pinned evaluations"
              count={pinned.length}
              icon={<Pin size={15} aria-hidden="true" />}
              tone="pinned"
            >
              <ul className="eval-grid">{pinned.map((p) => renderCard(p, true))}</ul>
            </LibrarySection>
          )}
          {rest.length > 0 && (
            <LibrarySection
              title={pinned.length > 0 ? "All evaluations" : "Evaluations"}
              count={rest.length}
              icon={<BarChart3 size={15} aria-hidden="true" />}
            >
              <ul className="eval-grid">{rest.map((p) => renderCard(p, false))}</ul>
            </LibrarySection>
          )}
        </>
      )}
    </>
  );
};

export default EvaluationBoard;
