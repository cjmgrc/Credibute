import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import { useScrolled } from "@/hooks/useScrolled";
import { useAuth } from "@/context/AuthContext";
import { REPO_URL } from "@/domain/rubric";

/** Translucent chrome: content scrolls under it; the hairline only appears once there's something beneath. */
const Navbar = () => {
  const scrolled = useScrolled();
  const { user } = useAuth();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Any navigation closes the menu.
  useEffect(() => setOpen(false), [pathname, hash]);

  // Escape closes it (and returns focus to the button); so does tapping outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuBtnRef.current?.focus();
    };
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="lp-nav" data-scrolled={scrolled}>
      <div className="lp-nav-bar">
        <Logo />
        <nav aria-label="Primary" className="lp-nav-links">
          <Link to="/#how-it-works" className="lp-nav-link">
            How it works
          </Link>
          <NavLink to="/methodology" className="lp-nav-link">
            Methodology
          </NavLink>
          <NavLink to="/sample" className="lp-nav-link">
            Sample report
          </NavLink>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="lp-nav-link"
          >
            Open source
          </a>
        </nav>
        <div className="lp-nav-actions">
          <ThemeToggle />
          {!user && (
            <Button
              to="/signin"
              variant="ghost"
              className="lp-nav-signin"
              size="md"
            >
              Sign in
            </Button>
          )}
          <Button
            to={user ? "/app" : "/signup"}
            trailing={<ArrowRight size={16} className="lp-wide" aria-hidden="true" />}
          >
            <span className="lp-wide">{user ? "Open app" : "Start an evaluation"}</span>
            <span className="lp-narrow">{user ? "Open app" : "Start"}</span>
          </Button>
          <button
            ref={menuBtnRef}
            type="button"
            className="lp-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Menu" className="lp-mobile-nav" hidden={!open}>
        <Link to="/#how-it-works" className="lp-mobile-link">
          How it works
        </Link>
        <Link to="/methodology" className="lp-mobile-link">
          Methodology
        </Link>
        <Link to="/sample" className="lp-mobile-link">
          Sample report
        </Link>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="lp-mobile-link"
        >
          Open source <ExternalLink size={16} aria-hidden="true" />
        </a>
        {!user && (
          <Link to="/signin" className="lp-mobile-link lp-mobile-signin">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
