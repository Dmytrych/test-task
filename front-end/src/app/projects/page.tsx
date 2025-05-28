import ProjectListEditor from "@/features/projects/components/ProjectListEditor";
import {getServerSession} from "next-auth";
import {authOptions} from "@/common/auth";
import {redirect} from "next/navigation";
import {getProjects} from "@/common/api/projects/project.repository";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("api/auth/signin");
  }

  const projectsResponse = await getProjects(session);

  return (
    <div className="flex justify-center">
      <div className="w-2/3">
        { projectsResponse.success ? (
          <ProjectListEditor projects={projectsResponse.data}/>
        ) : (
          <div>Error fetching the data</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
