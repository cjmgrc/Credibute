import { jsx as _jsx } from "react/jsx-runtime";
import ThemeProvider from '@/context/ThemeContext';
import AuthProvider from '@/context/AuthContext';
import DraftProvider from '@/context/DraftContext';
import ToastProvider from '@/context/ToastContext';
import AppRoutes from '@/routes/AppRoutes';
const App = () => (_jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(DraftProvider, { children: _jsx(ToastProvider, { children: _jsx(AppRoutes, {}) }) }) }) }));
export default App;
