import { useRef } from 'react';
/** Progressive resistance past a boundary: the further you pull, the less it follows. */
export const rubberband = (overshoot, dimension, c = 0.55) => (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
/**
 * Drag a right-anchored sheet to dismiss.
 *  - tracks the pointer 1:1 and respects where it was grabbed
 *  - starts from the sheet's live on-screen position, so grabbing mid-animation doesn't jump
 *  - rubber-bands when pulled the wrong way
 *  - dismisses on distance OR a quick flick (velocity)
 * Spread the returned props on the drag handle (e.g. the sheet header).
 */
export function useDragDismiss(ref, onDismiss) {
    const s = useRef(null);
    const down = (e) => {
        const el = ref.current;
        if (!el || s.current)
            return; // ignore extra touch points
        if (e.pointerType === 'mouse' && e.button !== 0)
            return;
        if (e.target.closest('button, a, input, select, textarea'))
            return;
        e.currentTarget.setPointerCapture(e.pointerId);
        const tx = new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;
        el.dataset.dragging = 'true';
        el.style.transform = `translateX(${tx}px)`;
        s.current = { id: e.pointerId, startX: e.clientX, startTx: tx, width: el.offsetWidth, samples: [{ x: e.clientX, t: performance.now() }] };
    };
    const move = (e) => {
        const d = s.current;
        const el = ref.current;
        if (!d || !el || e.pointerId !== d.id)
            return;
        let tx = d.startTx + (e.clientX - d.startX);
        if (tx < 0)
            tx = -rubberband(-tx, d.width);
        el.style.transform = `translateX(${tx}px)`;
        d.samples.push({ x: e.clientX, t: performance.now() });
        if (d.samples.length > 6)
            d.samples.shift();
    };
    const end = (e, cancelled) => {
        const d = s.current;
        const el = ref.current;
        if (!d || !el || e.pointerId !== d.id)
            return;
        s.current = null;
        const first = d.samples[0];
        const last = d.samples[d.samples.length - 1];
        const velocity = last.t > first.t ? (last.x - first.x) / (last.t - first.t) : 0; // px/ms
        const tx = new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;
        delete el.dataset.dragging;
        el.style.transform = '';
        if (!cancelled && tx > 0 && (tx > d.width * 0.35 || velocity > 0.11))
            onDismiss();
        // otherwise the CSS transition carries it from here back to rest
    };
    return {
        onPointerDown: down,
        onPointerMove: move,
        onPointerUp: (e) => end(e, false),
        onPointerCancel: (e) => end(e, true),
        style: { touchAction: 'pan-y' },
    };
}
