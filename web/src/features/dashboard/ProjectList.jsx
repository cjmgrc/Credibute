import { FolderGit2, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, EmptyState, Skeleton } from "@/components/ui/Feedback";
import ProjectRow from "./ProjectRow";
import { useAsync } from "@/hooks/useAsync";
import { listProjects } from "@/services/projectService";

const ProjectList = ({ filter, showRubric, onNewProject }) => {
  const { data, loading } = useAsync(listProjects);
  const rows = (data ?? []).filter(filter ?? (() => true));

  return (
    <Card className="u-overflow-hidden">
      {loading ? (
        <div className="u-ui-space-y-reverse-0-margin-block-start-space-3-var-ui-space-y-reverse u-padding-space-5">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="u-height-space-12" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 size={22} />}
          title="Nothing here yet"
          action={
            onNewProject ? (
              <Button onClick={onNewProject} icon={<Plus size={16} />}>
                New evaluation
              </Button>
            ) : (
              <Button to="/app/new/repository" icon={<Plus size={16} />}>
                New evaluation
              </Button>
            )
          }
        >
          Connect a repository to create your first evaluation.
        </EmptyState>
      ) : (
        <div className="u-ui-divide-y-reverse-0-border-bottom-style-var-ui-border-style u-border-color-var-line-2">
          {rows.map((project) => (
            <ProjectRow key={project.id} p={project} showRubric={showRubric} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default ProjectList;
