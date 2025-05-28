export type ProjectModel = {
  id: string;
  name: string;
  ownerLogin: string;
  stars: number;
  forks: number;
  issues: number;
  url: string;
  repositoryCreatedAt: Date;
};

export const PROJECT_TABLE_NAME = "projects";
