import Avatar from "@/components/ui/Avatar";
import { displayShares, measurable } from "@/domain/scoring";

/** Criterion-level scores as a heat-tinted matrix. Every cell opens its evidence. */
const BreakdownTable = ({ data, onSelect }) => {
  const criteria = measurable(data.rubric.criteria);
  const shown = displayShares(data.results);
  const rows = [...data.results].sort((a, b) => b.share - a.share);

  return (
    <div>
      <div className="u-margin-inline-space-2 u-overflow-x-auto u-padding-inline-space-2">
        <table className="u-width-100pct u-min-width-34rem u-border-collapse-separate u-ui-border-spacing-y-space-1-5-border-spacing-var-ui-border-spacing-x-var-ui-border-spacing-y u-text-align-left">
          <thead>
            <tr>
              <th
                scope="col"
                className="u-padding-bottom-space u-padding-right-space-3 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink-3-2"
              >
                Member
              </th>
              {criteria.map((criterion) => (
                <th
                  key={criterion.id}
                  scope="col"
                  className="u-padding-inline-space u-padding-bottom-space u-text-align-center u-vertical-align-bottom"
                >
                  <span className="u-display-block u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink">
                    {criterion.name}
                  </span>
                  <span className="u-display-block u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-normal-weight-var-font-weight-normal u-color-var-ink-3-2">
                    {criterion.weight}% weight
                  </span>
                </th>
              ))}
              <th
                scope="col"
                className="u-padding-bottom-space u-padding-left-space-3 u-text-align-right u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink-3-2"
              >
                Estimate
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((result) => {
              const member = data.members.find(
                (item) => item.id === result.memberId,
              );

              return (
                <tr key={result.memberId}>
                  <th
                    scope="row"
                    className="u-padding-right-space-3 u-ui-weight-var-font-weight-normal-weight-var-font-weight-normal"
                  >
                    <span className="u-display-flex-3 u-align-items-center-2 u-gap-space-2-5">
                      <Avatar
                        name={member.name}
                        tone={member.tone}
                        size="sm"
                      />
                      <span className="u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold">
                        {member.name}
                      </span>
                    </span>
                  </th>
                  {criteria.map((criterion) => {
                    const share =
                      result.criteria.find(
                        (item) => item.criterionId === criterion.id,
                      )?.share ?? 0;
                    const level = Math.min(
                      10,
                      Math.max(0, Math.round(share / 10)),
                    );

                    return (
                      <td key={criterion.id} className="u-padding-0">
                        <button
                          type="button"
                          onClick={() =>
                            onSelect(result.memberId, criterion.id)
                          }
                          aria-label={`${member.name}, ${criterion.name}: ${share}%. Show evidence`}
                          data-share={Math.round(share * 0.55)}
                          className={`heat-cell heat-level-${level} u-margin-inline-space-0-5 u-display-block u-height-space-10 u-width-100pct-0-25rem u-border-radius-var-radius-lg u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-font-variant-numeric-tabular-nums u-transition-property-transform-box-shadow-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-96 u-ui-shadow-inset-0-0-0-1-5px-var-ui-shadow-color-var-accent-box-shadow-var-ui-inset-shadow-var-ui-inset-ring-shadow-var-ui-ring-offset-shadow-var-ui-ring-shadow-var-ui-shadow`}
                        >
                          {share}%
                        </button>
                      </td>
                    );
                  })}
                  <td className="u-padding-left-space-3 u-text-align-right u-letter-spacing-0-005em-text-0-9375rem u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold u-font-variant-numeric-tabular-nums">
                    {shown[member.id]}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="u-margin-top-space-4 u-border-radius-0-625rem u-bg-var-sunken-3 u-padding-inline-space-3-5 u-padding-block-space-2-5 u-font-family-ui-monospace-sf-mono-sfmono-regular-menlo-consolas-monospace u-text-0-75rem u-ui-leading-var-leading-relaxed-line-height-var-leading-relaxed u-color-var-ink-2">
        estimate = Σ (criterion share × weight) · each criterion share is a
        member’s slice of the team total
      </p>
    </div>
  );
};

export default BreakdownTable;
