import { toCsv, downloadText } from '@/lib/csv';
import { measurable } from '@/domain/scoring';
import { displayShares } from '@/domain/scoring';
export function exportCsv(r) {
    const crit = measurable(r.rubric.criteria);
    const shown = displayShares(r.results);
    const rows = [
        ['Member', 'Estimated share (%)', ...crit.map((c) => `${c.name} share (%) @ ${c.weight}% weight`), 'Report ID', 'Rubric', 'Snapshot'],
        ...r.results.map((res) => {
            const m = r.members.find((x) => x.id === res.memberId);
            return [
                m.name, shown[m.id],
                ...crit.map((c) => res.criteria.find((x) => x.criterionId === c.id)?.share ?? ''),
                r.reportId, `${r.rubric.name} v${r.rubric.version}`, r.snapshotAt,
            ];
        }),
    ];
    downloadText(`${r.reportId}.csv`, toCsv(rows));
}
