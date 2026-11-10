import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FolderGit2, History, Pin, Plus, Users } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Feedback";
import PinButton from "@/components/ui/PinButton";
import { STATUS, projectHref } from "@/features/dashboard/ProjectRow";
import {
  FilterChips,
  LibrarySection,
  LibraryToolbar,
  NoMatches,
  matchesQuery,
  splitPinned,
} from "./shared";
import { usePins } from "@/context/PinContext";
import { useAsync } from "@/hooks/useAsync";
import { hostPath, relativeTime } from "@/lib/format";
import { listProjects } from "@/services/projectService";

const DAY = 86_400_000;
const BUCKETS = [
  { key: "today", label: "Today", maxDays: 1 },
  { key: "week", label: "This week", maxDays: 7 },
  { key: "month", label: "Last 30 days", maxDays: 30 },
  { key: "earlier", label: "Earlier", maxDays: Infinity },
];

const groupByRecency = (rows, now = Date.now()) => {
  const sorted = [...rows].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
  return BUCKETS.map((bucket, i) => {
    const min = i === 0 ? -Infinity : BUCKETS[i - 1].maxDays;
    return {
      ...bucket,
      items: sorted.filter((p) => {
        const days = (now - new Date(p.updatedAt)) / DAY;
        return days >= min && days < bucket.maxDays;
      }),
    };
  }).filter((group) => group.items.length > 0);
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "complete", label: "Complete" },
  { value: "needs_review", label: "Needs review" },
  { value: "in_progress", label: "In progress" },
];

const PinnedCard = ({ p, pinned, onPin }) => (
  <li className="lib-card pin-card" data-status={p.status}>
    <div className="pin-card-top">
      <Avatar name={p.name} tone={p.tone} square size="lg" />
      <PinButton name={p.name} pinned={pinned} onToggle={onPin} />
    </div>
    <div className="lib-text">
      <Link to={projectHref(p)} className="stretch lib-title">
        {p.name}
      </Link>
      <p className="lib-sub">{hostPath(p.repoUrl)}</p>
    </div>
    <div className="pin-card-foot">
      <Badge tone={STATUS[p.status].tone} dot>
        {STATUS[p.status].label}
      </Badge>
      <time dateTime={p.updatedAt}>{relativeTime(p.updatedAt)}</time>
    </div>
  </li>
);

const TimelineItem = ({ p, pinned, onPin }) => (
  <li className="tl-item" data-status={p.status}>
    <span className="tl-dot" aria-hidden="true" />
    <div className="lib-card tl-card">
      <div className="tl-body">
        <div className="tl-id">
          <Avatar name={p.name} tone={p.tone} square />
          <div className="lib-text">
            <Link to={projectHref(p)} className="stretch lib-title">
              {p.name}
            </Link>
            <p className="lib-sub">{hostPath(p.repoUrl)}</p>
          </div>
        </div>
        <div className="tl-meta">
          <Badge tone={STATUS[p.status].tone} dot>
            {STATUS[p.status].label}
          </Badge>
          <span className="tl-fact">
            <Users size={14} aria-hidden="true" />
            {p.memberCount} members
          </span>
          <span className="tl-fact tl-rubric" title={p.rubricLabel}>
            {p.rubricLabel}
          </span>
          <time className="tl-fact" dateTime={p.updatedAt}>
            {relativeTime(p.updatedAt)}
          </time>
        </div>
      </div>
      <PinButton name={p.name} pinned={pinned} onToggle={onPin} />
    </div>
  </li>
);

/** Project history: a recency timeline. Status is the rail; time is the structure. */
const ProjectHistory = ({ onNewProject }) => {
  const { data, loading } = useAsync(listProjects);
  const pins = usePins("project");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const all = useMemo(() => data ?? [], [data]);
  const counts = useMemo(
    () => ({
      all: all.length,
      complete: all.filter((p) => p.status === "complete").length,
      needs_review: all.filter((p) => p.status === "needs_review").length,
      in_progress: all.filter((p) => p.status === "in_progress").length,
    }),
    [all],
  );

  const visible = all.filter(
    (p) => (status === "all" || p.status === status) && matchesQuery(p, query),
  );
  const { pinned, rest } = splitPinned(visible, pins.ids);
  const groups = useMemo(() => groupByRecency(rest), [rest]);
  const clear = () => {
    setQuery("");
    setStatus("all");
  };

  if (loading) {
    return (
      <div className="lib-skeletons" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="sk-row" />
        ))}
      </div>
    );
  }

  if (all.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<FolderGit2 size={22} />}
          title="Nothing here yet"
          action={
            <Button onClick={onNewProject} icon={<Plus size={16} />}>
              New evaluation
            </Button>
          }
        >
          Connect a repository to create your first evaluation.
        </EmptyState>
      </Card>
    );
  }

  return (
    <>
      <LibraryToolbar
        label="Search projects"
        placeholder="Search projects"
        query={query}
        onQuery={setQuery}
        shown={visible.length}
        noun="project"
        leading={
          <FilterChips
            label="Filter by status"
            value={status}
            onChange={setStatus}
            options={FILTERS.map((f) => ({ ...f, count: counts[f.value] }))}
          />
        }
      />

      {visible.length === 0 ? (
        <NoMatches query={query} onClear={clear} />
      ) : (
        <>
          {pinned.length > 0 && (
            <LibrarySection
              title="Pinned projects"
              count={pinned.length}
              icon={<Pin size={15} aria-hidden="true" />}
              tone="pinned"
            >
              <ul className="pin-grid">
                {pinned.map((p) => (
                  <PinnedCard
                    key={p.id}
                    p={p}
                    pinned
                    onPin={() => pins.toggle(p.id, p.name)}
                  />
                ))}
              </ul>
            </LibrarySection>
          )}

          {rest.length > 0 && (
            <LibrarySection
              title="Timeline"
              count={rest.length}
              icon={<History size={15} aria-hidden="true" />}
            >
              <div className="tl">
                {groups.map((group) => (
                  <div key={group.key}>
                    <h3 className="tl-label">{group.label}</h3>
                    <ol className="tl-list">
                      {group.items.map((p) => (
                        <TimelineItem
                          key={p.id}
                          p={p}
                          pinned={false}
                          onPin={() => pins.toggle(p.id, p.name)}
                        />
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </LibrarySection>
          )}
        </>
      )}
    </>
  );
};

export default ProjectHistory;
