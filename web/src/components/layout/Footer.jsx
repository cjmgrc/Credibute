import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { BRAND, REPO_URL } from "@/domain/rubric";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { to: "/#how-it-works", label: "How it works" },
      { to: "/sample", label: "Sample report" },
      { to: "/methodology", label: "Methodology" },
    ],
  },
  {
    title: "Trust",
    links: [
      { to: "/privacy", label: "Privacy" },
      { href: REPO_URL, label: "Source on GitHub" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/signup", label: "Start an evaluation" },
      { to: "/signin", label: "Sign in" },
    ],
  },
];

const Footer = () => (
  <footer className="lp-footer">
    <div className="lp-foot-grid">
      <div className="lp-foot-brand">
        <Logo />
        <p>
          Clearer evidence for collaborative work. Transparent, rule-based
          contribution reports, with no AI and no hidden scores.
        </p>
      </div>
      {COLUMNS.map((col) => (
        <nav key={col.title} aria-label={col.title} className="lp-foot-col">
          <p className="lp-foot-head">{col.title}</p>
          <ul>
            {col.links.map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link to={l.to} className="lp-foot-link">
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="lp-foot-link"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
    <div className="lp-foot-base">
      <span>
        © {new Date().getFullYear()} {BRAND}
      </span>
      <span>Open source · Rule-based · AI-free</span>
    </div>
  </footer>
);

export default Footer;
