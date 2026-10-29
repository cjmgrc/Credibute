import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import { useScrolled } from "@/hooks/useScrolled";
import { BRAND } from "@/domain/rubric";
import { cn } from "@/lib/cn";

const CRUMBS = [
  [/^\/app\/new/, "Setup"],
  [/^\/app\/projects\/[^/]+\/results/, "Results"],
  [/^\/app\/projects\/[^/]+\/report/, "Report"],
  [/^\/app\/projects/, "History"],
  [/^\/app\/evaluations/, "Evaluations"],
  [/^\/app\/reports/, "Reports"],
  [/^\/app\/settings/, "Settings"],
  [/^\/app\/help/, "Help & docs"],
  [/^\/app$/, "Dashboard"],
];

const Topbar = () => {
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const crumb = CRUMBS.find(([pattern]) => pattern.test(pathname))?.[1] ?? "";
  const inWizard = pathname.startsWith("/app/new");

  return (
    <header
      className={cn(
        "u-background-var-material-webkit-backdrop-filter-blur-20px-saturate-180pct u-position-sticky u-top-0 u-z-index-20 u-border-bottom-style-var-ui-border-style-border-bottom-width-1px-2 u-transition-property-border-color-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-2s-transition-duration-0-2s u-display-none-important",
        scrolled ? "u-border-color-var-line" : "u-border-color-0000",
      )}
    >
      <div className="u-display-flex-3 u-height-space-16 u-align-items-center-2 u-justify-content-space-between u-gap-space-3 u-padding-inline-space-5 u-padding-inline-space-8">
        <nav
          aria-label="Breadcrumb"
          className="u-display-flex-3 u-align-items-center-2 u-gap-space-2 u-letter-spacing-0-text-0-8125rem u-color-var-ink-3-2"
        >
          <Link to="/app" className="u-transition-property-color-background-color-border-color-outline-color-text-decoration-color-fill-stroke-ui-gradient-from-ui-gradient-via-ui-gradient-to-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-color-var-ink-2">
            {BRAND}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="u-ui-weight-var-font-weight-semibold-weight-var-font-weight-semibold u-color-var-ink">{crumb}</span>
        </nav>
        <div className="u-display-flex-3 u-align-items-center-2 u-gap-space-2">
          <ThemeToggle />
          {!inWizard && (
            <Button to="/app/projects?newProject=1" icon={<Plus size={16} />}>
              <span className="u-display-none-3 u-display-inline">
                New project
              </span>
              <span className="u-display-none-4">New</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
