import { useId } from "react";
import { Search, SearchX } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, EmptyState } from "@/components/ui/Feedback";

export const matchesQuery = (project, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [project.name, project.repoUrl, project.rubricLabel].some((v) =>
    v?.toLowerCase().includes(needle),
  );
};

/** Pinned rows keep pin order (newest pin first); everything else keeps its own order. */
export const splitPinned = (rows, ids) => {
  const byId = new Map(rows.map((r) => [r.id, r]));
  const pinnedSet = new Set(ids);
  return {
    pinned: ids.map((id) => byId.get(id)).filter(Boolean),
    rest: rows.filter((r) => !pinnedSet.has(r.id)),
  };
};

/** Search field + optional filter chips (leading) and sort control (trailing). */
export const LibraryToolbar = ({
  label,
  placeholder,
  query,
  onQuery,
  shown,
  noun,
  leading,
  trailing,
}) => {
  const id = useId();
  return (
    <div className="lib-toolbar">
      <div className="lib-toolbar-row">
        {leading}
        <div className="lib-search">
          <label className="visually-hidden" htmlFor={id}>
            {label}
          </label>
          <Search size={16} aria-hidden="true" />
          <input
            id={id}
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={query}
            onChange={(event) => onQuery(event.target.value)}
          />
        </div>
        {trailing}
      </div>
      <p className="visually-hidden" role="status">
        {shown} {noun}
        {shown === 1 ? "" : "s"} shown
      </p>
    </div>
  );
};

export const FilterChips = ({ label, value, onChange, options }) => (
  <div role="group" aria-label={label} className="chip-group">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className="chip"
        aria-pressed={option.value === value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
        <span className="chip-count">{option.count}</span>
      </button>
    ))}
  </div>
);

export const LibrarySection = ({ title, count, icon, tone, children }) => {
  const id = useId();
  return (
    <section aria-labelledby={id} className="lib-section" data-tone={tone}>
      <div className="lib-head">
        <h2 id={id}>
          {icon}
          {title}
        </h2>
        <span className="lib-count">{count}</span>
      </div>
      {children}
    </section>
  );
};

export const NoMatches = ({ query, onClear }) => (
  <Card>
    <EmptyState
      icon={<SearchX size={22} />}
      title="No matches"
      action={
        <Button variant="secondary" onClick={onClear}>
          Clear search and filters
        </Button>
      }
    >
      {query.trim()
        ? `Nothing matches “${query.trim()}”. Check the spelling, or try a repository or rubric name.`
        : "Nothing fits these filters. Try a different one."}
    </EmptyState>
  </Card>
);
