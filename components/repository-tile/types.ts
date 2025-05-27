interface RepositoryOwnerProps {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface LicenseProps {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
}

interface RepositoryProps {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: RepositoryOwnerProps;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  license: LicenseProps | null;
  topics: string[];
  visibility: string;
  default_branch: string;
}

export interface RepositoryTileProps {
  repoDetails: RepositoryProps;
}
