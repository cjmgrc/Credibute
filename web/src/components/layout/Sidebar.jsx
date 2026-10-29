import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  FileText,
  FolderGit2,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import Avatar from "@/components/ui/Avatar";
import Menu from "@/components/ui/Menu";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/cn";

export const WORKSPACE_NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/app/projects", label: "Projects", icon: FolderGit2 },
  { to: "/app/evaluations", label: "Evaluations", icon: BarChart3 },
  { to: "/app/reports", label: "Reports", icon: FileText },
];

const item = ({ isActive }) =>
  cn(
    "u-display-flex-3 u-align-items-center-2 u-gap-space-3 u-border-radius-0-625rem u-padding-inline-space-3 u-padding-block-space-2-5 u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-transition-property-background-color-color-transform-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-98",
    isActive
      ? "u-bg-var-accent-soft-2 u-color-var-accent-text-2"
      : "u-color-var-ink-2 u-bg-var-sunken u-color-var-ink-2",
  );

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="u-position-sticky u-top-0 u-display-none-3 u-height-100dvh u-flex-direction-column u-border-right-style-var-ui-border-style-border-right-width-1px-2 u-border-color-var-line u-bg-var-surface-2 u-padding-inline-space-3 u-padding-bottom-space-3 u-padding-top-space-5 u-display-flex-4">
      <div className="u-padding-inline-space-3">
        <Logo to="/app" />
      </div>
      <p className="u-margin-bottom-space-2 u-margin-top-space-8 u-padding-inline-space-3 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink-3-2">
        Workspace
      </p>
      <nav
        aria-label="Workspace"
        className="u-display-flex-3 u-flex-direction-column u-gap-space-0-5"
      >
        {WORKSPACE_NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={item}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="u-margin-top-auto">
        <p className="u-margin-bottom-space-2 u-padding-inline-space-3 u-letter-spacing-0-01em-text-0-75rem u-ui-weight-var-font-weight-medium-weight-var-font-weight-medium u-color-var-ink-3-2">
          Account
        </p>
        <nav
          aria-label="Account"
          className="u-display-flex-3 u-flex-direction-column u-gap-space-0-5"
        >
          <NavLink to="/app/help" className={item}>
            <HelpCircle size={18} aria-hidden="true" />
            Help &amp; docs
          </NavLink>
        </nav>
        <div className="u-margin-top-space-3 u-display-flex-3 u-align-items-center-2 u-gap-space-3 u-border-top-style-var-ui-border-style-border-top-width-1px u-border-color-var-line u-padding-inline-space-2 u-padding-top-space-3">
          <Avatar name={user?.name ?? "You"} />
          <div className="u-min-width-0 u-flex-1">
            <p className="u-text-overflow-ellipsis-white-space-nowrap u-letter-spacing-0-text-0-8125rem u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold">
              {user?.name}
            </p>
            <p className="u-text-overflow-ellipsis-white-space-nowrap u-letter-spacing-0-01em-text-0-75rem u-color-var-ink-3-2">
              {user?.email}
            </p>
          </div>
          <Menu
            label="Account menu"
            placement="top"
            items={[
              {
                label: "Settings",
                icon: <Settings size={16} aria-hidden="true" />,
                onSelect: () => navigate("/app/settings"),
              },
              {
                label: "Sign out",
                icon: <LogOut size={16} aria-hidden="true" />,
                onSelect: () => {
                  signOut();
                  navigate("/");
                },
              },
            ]}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
