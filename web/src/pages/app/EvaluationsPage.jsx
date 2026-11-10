import PageHeader from "@/components/ui/PageHeader";
import EvaluationBoard from "@/features/library/EvaluationBoard";
import { usePageTitle } from "@/hooks/usePageTitle";

const EvaluationsPage = () => {
  usePageTitle("Evaluations");
  return (
    <>
      <PageHeader
        kicker="Analysis"
        title="Evaluations"
        description="Every analysis that has produced results."
      />
      <EvaluationBoard />
    </>
  );
};

export default EvaluationsPage;
