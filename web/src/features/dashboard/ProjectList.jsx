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
    <Card className="style-d5111d0e9f">
      {loading ? (
        <div className="style-b8ceaab118 style-014b941a77">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="style-2bf5d58a82" />
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
        <div className="style-d1626f14b8 style-b682aa7242">
          {rows.map((project) => (
            <ProjectRow key={project.id} p={project} showRubric={showRubric} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default ProjectList;
