import { cn } from "@/lib/cn";

/** Decorative git-graph: three lanes, two branches that fork and merge. Purely ornamental. */
const NODES = [
  [40, 60],
  [120, 60],
  [210, 60],
  [300, 60],
  [480, 60],
  [600, 60],
  [220, 130],
  [330, 130],
  [440, 130],
  [400, 200],
  [500, 200],
];

const CommitGraph = ({ className }) => (
  <svg
    className={cn("lp-graph", className)}
    viewBox="0 0 640 260"
    aria-hidden="true"
    focusable="false"
  >
    <path pathLength="1" d="M0 60 H640" />
    <path
      pathLength="1"
      d="M120 60 C165 60 170 130 220 130 H400 C450 130 450 60 480 60"
    />
    <path
      pathLength="1"
      d="M300 60 C345 60 350 200 400 200 H520 C565 200 570 60 600 60"
    />
    {NODES.map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="6" style={{ "--n": i }} />
    ))}
  </svg>
);

export default CommitGraph;
