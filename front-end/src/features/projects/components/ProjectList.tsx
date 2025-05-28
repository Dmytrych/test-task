import {ReactNode} from "react";

type ProjectListProps = {
  children?: ReactNode;
}

const ProjectList = ({ children }: ProjectListProps) => {
  return (
    <div className="flex flex-row flex-wrap sm:flex-col">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {children ?? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p>No projects available.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectList
