import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Segmented from '@/components/ui/Segmented';
describe('Segmented', () => {
    const options = [{ value: "a", label: 'A' }, { value: "b", label: 'B' }, { value: "c", label: 'C', disabled: true }];
    it('marks the selected option and reports changes', () => {
        const onChange = vi.fn();
        render(_jsx(Segmented, { label: "Test", value: "a", onChange: onChange, options: options }));
        expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('aria-checked', 'true');
        fireEvent.click(screen.getByRole('radio', { name: 'B' }));
        expect(onChange).toHaveBeenCalledWith("b");
    });
    it("moves with arrow keys and skips disabled options", () => {
        const onChange = vi.fn();
        render(_jsx(Segmented, { label: "Test", value: "b", onChange: onChange, options: options }));
        fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' });
        expect(onChange).toHaveBeenCalledWith("a");
    });
});
