import { useEffect } from "react";
import { useLocation } from "react-router-dom";
/** New page → top. Hash link → smooth scroll to the section (instant if the user prefers reduced motion). */
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (el)
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};
export default ScrollManager;
