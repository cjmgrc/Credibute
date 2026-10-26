import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import TabBar from '@/components/layout/TabBar';
import SkipLink from './SkipLink';
const AppLayout = () => (_jsxs("div", { className: "min-h-dvh lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]", children: [_jsx(SkipLink, {}), _jsx("div", { className: "no-print", children: _jsx(Sidebar, {}) }), _jsxs("div", { className: "min-w-0", children: [_jsx(Topbar, {}), _jsx("main", { id: "main", className: "mx-auto w-full max-w-6xl px-5 pb-28 pt-8 sm:px-8 lg:pb-14", children: _jsx(Outlet, {}) })] }), _jsx(TabBar, {})] }));
export default AppLayout;
