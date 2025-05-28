'use client'

import {Project} from "@/common/api/projects/dto";
import ProjectList from "@/features/projects/components/ProjectList";
import ProjectListItem from "@/features/projects/components/ProjectListItem";
import ProjectListItemActions from "@/features/projects/components/ProjectListItemActions";
import {createProject, deleteProject, refreshProject} from "@/common/api/projects/project.repository";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import AddProjectForm from "@/features/projects/components/AddProjectForm";

type ProjectListEditorProps = {
  projects?: Project[]
}

const ProjectListEditor = ({ projects }: ProjectListEditorProps) => {
  const router = useRouter();
  const session = useSession({
    required: true
  });

  console.log(session)

  const getHandeDeleteProject = (id: string) => async () => {
    if (!session.data) {
      throw new Error('Could not delete project')
    }

    console.log(session)

    await deleteProject(id, session.data)
    router.refresh()
  }

  const getHandeRefreshProject = (id: string) => async () => {
    if (!session.data) {
      throw new Error('Could not delete project')
    }

    console.log(session)

    await refreshProject(id, session.data)
    router.refresh()
  }

  const handleAddProject = async (repositoryOwner: string, repositoryName: string) => {
    if (!session.data) {
      throw new Error('Could not delete project')
    }

    console.log(session)

    await createProject(repositoryOwner, repositoryName, session.data)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-4">
      <AddProjectForm onSubmit={handleAddProject}/>
      <ProjectList>
        {projects?.map((project) => <ProjectListItem
          key={project.id}
          title={project.name}
          url={project.url}
          stars={project.stars}
          forks={project.forks}
          issues={project.issues}
          repositoryCreatedAt={project.repositoryCreatedAt}
          ownerLogin={project.ownerLogin}
          actions={<ProjectListItemActions
            onDelete={getHandeDeleteProject(project.id)} onRefresh={getHandeRefreshProject(project.id)}/>}
        />)}
      </ProjectList>
    </div>
  )
}

export default ProjectListEditor;
