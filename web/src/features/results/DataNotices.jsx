import { jsx as _jsx } from "react/jsx-runtime";
import Alert from '@/components/ui/Alert';
/** Missing or partial data is always disclosed, never silently treated as zero. */
const DataNotices = ({ notices }) => notices.length === 0 ? null : (_jsx("div", { className: "flex flex-col gap-3", children: notices.map((n) => _jsx(Alert, { tone: n.level === 'warning' ? 'warn' : 'info', title: n.title, children: n.detail }, n.id)) }));
export default DataNotices;
