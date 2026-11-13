import Hero from "@/features/landing/Hero";
import TrustStrip from "@/features/landing/TrustStrip";
import Contrast from "@/features/landing/Contrast";
import Principles from "@/features/landing/Principles";
import HowItWorks from "@/features/landing/HowItWorks";
import Faq from "@/features/landing/Faq";
import CtaBand from "@/features/landing/CtaBand";
import { usePageTitle } from "@/hooks/usePageTitle";

const LandingPage = () => {
  usePageTitle();
  return (
    <>
      <Hero />
      <TrustStrip />
      <Contrast />
      <Principles />
      <HowItWorks />
      <Faq />
      <CtaBand />
    </>
  );
};

export default LandingPage;
