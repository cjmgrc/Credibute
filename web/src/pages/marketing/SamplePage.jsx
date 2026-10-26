import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import ResultsView from '@/features/results/ResultsView';
import { getSampleResult } from '@/services/projectService';
import { usePageTitle } from '@/hooks/usePageTitle';
const SamplePage = () => {
    usePageTitle('Sample report');
    const data = useMemo(getSampleResult, []);
    return (_jsxs("div", { className: "mx-auto max-w-6xl px-5 py-10 sm:px-8", children: [_jsx(Alert, { tone: "info", title: "This is a sample report", className: "mb-8", action: _jsx(Button, { to: "/signup", size: "sm", trailing: _jsx(ArrowRight, { size: 15 }), children: "Analyze yours" }), children: "It uses made-up data so you can explore how results, evidence, and exclusions work." }), _jsx(ResultsView, { data: data, back: { to: '/', label: 'Back to home' } })] }));
};
export default SamplePage;
