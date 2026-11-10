import PageHeader from "@/components/ui/PageHeader";
import ReportLibrary from "@/features/library/ReportLibrary";
import { usePageTitle } from "@/hooks/usePageTitle";

const ReportsPage = () => {
  usePageTitle("Reports");
  return (
    <>
      <PageHeader
        kicker="Documents"
        title="Reports"
        description="Exportable summaries of your finished evaluations."
      />
      <ReportLibrary />
    </>
  );
};

export default ReportsPage;
