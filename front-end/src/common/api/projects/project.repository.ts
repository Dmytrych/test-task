import {backendClientApiAdapter, backendServerApiAdapter} from "@/common/api/adapter-instances";
import {ApiResponse} from "@/common/api/dto";
import {Project} from "@/common/api/projects/dto";
import {Session} from "next-auth";

export const getProjects = async (session: Session): Promise<ApiResponse<Project[]>> => {
  return backendServerApiAdapter.get<ApiResponse<Project[]>>("/v1/projects", {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`
    }
  });
}

export const deleteProject = async (id: string, session: Session): Promise<ApiResponse<void>> => {
  return backendClientApiAdapter.delete<ApiResponse<void>>(`/v1/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`
    }
  });
}

export const createProject = async (repositoryOwner: string, repositoryName: string, session: Session): Promise<ApiResponse<Project>> => {
  return backendClientApiAdapter.post<ApiResponse<Project>>("/v1/projects", {
    repositoryOwner,
    repositoryName
  }, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`
    }
  });
}

export const refreshProject = async (projectId: string, session: Session): Promise<ApiResponse<Project>> => {
  return backendClientApiAdapter.post<ApiResponse<Project>>(`/v1/projects/${projectId}/refresh`, {}, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`
    }
  });
}
