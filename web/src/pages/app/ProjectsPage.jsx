import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link2, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Dialog, { ModalBody } from "@/components/ui/Dialog";
import { TextField } from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import ProjectList from "@/features/dashboard/ProjectList";
import { useDraft } from "@/context/DraftContext";
import { firstError, repoUrlSchema } from "@/domain/validation";
import { usePageTitle } from "@/hooks/usePageTitle";

const ProjectsPage = () => {
  usePageTitle("Projects");
  const { dispatch } = useDraft();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(
    () => searchParams.get("newProject") === "1",
  );
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchParams.get("newProject") !== "1") return;
    setOpen(true);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("newProject");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const openDialog = () => {
    setRepositoryUrl("");
    setError(null);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setError(null);
  };

  const startProject = (event) => {
    event.preventDefault();
    const parsed = repoUrlSchema("github").safeParse(repositoryUrl);
    if (!parsed.success) {
      setError(firstError(parsed));
      return;
    }
    dispatch({ type: "reset" });
    dispatch({ type: "repo", patch: { url: parsed.data } });
    closeDialog();
    navigate("/app/new/repository");
  };

  return (
    <>
      <PageHeader
        title="Project history"
        description="Review, compare, and reopen past evaluations."
        actions={
          <Button onClick={openDialog} icon={<Plus size={16} />}>
            New project
          </Button>
        }
      />
      <ProjectList showRubric onNewProject={openDialog} />
      <Dialog open={open} onClose={closeDialog} label="Add a project">
        <ModalBody
          title="Add a project"
          description="Connect a GitHub repository to start a new evaluation."
          footer={
            <>
              <Button variant="secondary" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="new-project-form"
                icon={<Plus size={16} />}
              >
                Continue
              </Button>
            </>
          }
        >
          <form id="new-project-form" onSubmit={startProject}>
            <TextField
              label="Repository URL"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              autoFocus
              placeholder="https://github.com/owner/repository"
              icon={<Link2 size={16} />}
              value={repositoryUrl}
              onChange={(event) => {
                setRepositoryUrl(event.target.value);
                setError(null);
              }}
              error={error}
            />
          </form>
        </ModalBody>
      </Dialog>
    </>
  );
};

export default ProjectsPage;
