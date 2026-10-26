import { useCallback, useEffect, useState } from 'react';
export const STAGE_ENDS = [0.16, 0.36, 0.86, 1];
const RUBRIC_SIGNALS = ['Meaningful commits', 'Code changes', 'Reviews & pull requests', 'Tests'];
/** Drives a believable, deterministic progress simulation. Replace with polling the analysis job later. */
export function useAnalysisProgress(totalMs = 5200) {
    const [progress, setProgress] = useState(0);
    const [skipped, setSkipped] = useState(false);
    useEffect(() => {
        if (skipped)
            return;
        const start = performance.now();
        let raf = 0;
        const tick = (now) => {
            const p = Math.min(1, (now - start) / totalMs);
            setProgress(p);
            if (p < 1)
                raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [skipped, totalMs]);
    const skip = useCallback(() => { setSkipped(true); setProgress(1); }, []);
    const stages = STAGE_ENDS.map((end, i) => {
        if (progress >= end)
            return 'done';
        const prev = i === 0 ? 0 : STAGE_ENDS[i - 1];
        return progress >= prev ? 'active' : 'todo';
    });
    const rubricT = Math.min(0.999, Math.max(0, (progress - STAGE_ENDS[1]) / (STAGE_ENDS[2] - STAGE_ENDS[1])));
    const signal = RUBRIC_SIGNALS[Math.floor(rubricT * RUBRIC_SIGNALS.length)];
    return { progress, stages, signal, done: progress >= 1, skip };
}
