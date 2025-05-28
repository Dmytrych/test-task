export interface IGitHubRepository {
  owner: {
    login: string;
  },
  name: string,
  html_url: string;
  open_issues: number;
  forks: number;
  stargazers_count: number;
  created_at: Date;
}

export interface IProject {
  id: string,
  name: string,
  ownerLogin: string,
  stars: number,
  forks: number,
  issues: number,
  repositoryCreatedAt: Date,
  url: string,
}
