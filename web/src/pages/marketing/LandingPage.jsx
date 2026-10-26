import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import Hero from "@/features/landing/Hero";
import Principles from "@/features/landing/Principles";
import HowItWorks from "@/features/landing/HowItWorks";
import CtaBand from "@/features/landing/CtaBand";
import { usePageTitle } from "@/hooks/usePageTitle";
const LandingPage = () => {
  usePageTitle();
  return _jsxs(_Fragment, {
    children: [
      _jsx(Hero, {}),
      _jsx(Principles, {}),
      _jsx(HowItWorks, {}),
      _jsx(CtaBand, {}),
    ],
  });
};
export default LandingPage;
