"use client";

import { Header } from "@/components/header/header";
import RepositoryTile from "@/components/repository-tile/repository-tile";
import { SearchBar } from "@/components/search/search";
import React from "react";

const mockitems = [
  {
    id: 10270250,
    node_id: "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
    name: "react",
    full_name: "facebook/react",
    private: false,
    owner: {
      login: "facebook",
      id: 69631,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
      avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/facebook",
      html_url: "https://github.com/facebook",
      followers_url: "https://api.github.com/users/facebook/followers",
      following_url:
        "https://api.github.com/users/facebook/following{/other_user}",
      gists_url: "https://api.github.com/users/facebook/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/facebook/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/facebook/subscriptions",
      organizations_url: "https://api.github.com/users/facebook/orgs",
      repos_url: "https://api.github.com/users/facebook/repos",
      events_url: "https://api.github.com/users/facebook/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/facebook/received_events",
      type: "Organization",
      user_view_type: "public",
      site_admin: false,
    },
    html_url: "https://github.com/facebook/react",
    description: "The library for web and native user interfaces.",
    fork: false,
    url: "https://api.github.com/repos/facebook/react",
    forks_url: "https://api.github.com/repos/facebook/react/forks",
    keys_url: "https://api.github.com/repos/facebook/react/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/facebook/react/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/facebook/react/teams",
    hooks_url: "https://api.github.com/repos/facebook/react/hooks",
    issue_events_url:
      "https://api.github.com/repos/facebook/react/issues/events{/number}",
    events_url: "https://api.github.com/repos/facebook/react/events",
    assignees_url:
      "https://api.github.com/repos/facebook/react/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/facebook/react/branches{/branch}",
    tags_url: "https://api.github.com/repos/facebook/react/tags",
    blobs_url: "https://api.github.com/repos/facebook/react/git/blobs{/sha}",
    git_tags_url: "https://api.github.com/repos/facebook/react/git/tags{/sha}",
    git_refs_url: "https://api.github.com/repos/facebook/react/git/refs{/sha}",
    trees_url: "https://api.github.com/repos/facebook/react/git/trees{/sha}",
    statuses_url: "https://api.github.com/repos/facebook/react/statuses/{sha}",
    languages_url: "https://api.github.com/repos/facebook/react/languages",
    stargazers_url: "https://api.github.com/repos/facebook/react/stargazers",
    contributors_url:
      "https://api.github.com/repos/facebook/react/contributors",
    subscribers_url: "https://api.github.com/repos/facebook/react/subscribers",
    subscription_url:
      "https://api.github.com/repos/facebook/react/subscription",
    commits_url: "https://api.github.com/repos/facebook/react/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/facebook/react/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/facebook/react/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/facebook/react/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/facebook/react/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/facebook/react/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/facebook/react/merges",
    archive_url:
      "https://api.github.com/repos/facebook/react/{archive_format}{/ref}",
    downloads_url: "https://api.github.com/repos/facebook/react/downloads",
    issues_url: "https://api.github.com/repos/facebook/react/issues{/number}",
    pulls_url: "https://api.github.com/repos/facebook/react/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/facebook/react/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/facebook/react/notifications{?since,all,participating}",
    labels_url: "https://api.github.com/repos/facebook/react/labels{/name}",
    releases_url: "https://api.github.com/repos/facebook/react/releases{/id}",
    deployments_url: "https://api.github.com/repos/facebook/react/deployments",
    created_at: "2013-05-24T16:15:54Z",
    updated_at: "2025-05-27T08:34:51Z",
    pushed_at: "2025-05-23T23:58:37Z",
    git_url: "git://github.com/facebook/react.git",
    ssh_url: "git@github.com:facebook/react.git",
    clone_url: "https://github.com/facebook/react.git",
    svn_url: "https://github.com/facebook/react",
    homepage: "https://react.dev",
    size: 991378,
    stargazers_count: 235745,
    watchers_count: 235745,
    language: "JavaScript",
    has_issues: true,
    has_projects: false,
    has_downloads: true,
    has_wiki: false,
    has_pages: true,
    has_discussions: false,
    forks_count: 48589,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 1052,
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit",
      node_id: "MDc6TGljZW5zZTEz",
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: ["declarative", "frontend", "javascript", "library", "react", "ui"],
    visibility: "public",
    forks: 48589,
    open_issues: 1052,
    watchers: 235745,
    default_branch: "main",
    score: 1.0,
  },
  {
    id: 135786093,
    node_id: "MDEwOlJlcG9zaXRvcnkxMzU3ODYwOTM=",
    name: "react",
    full_name: "typescript-cheatsheets/react",
    private: false,
    owner: {
      login: "typescript-cheatsheets",
      id: 50188264,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjUwMTg4MjY0",
      avatar_url: "https://avatars.githubusercontent.com/u/50188264?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/typescript-cheatsheets",
      html_url: "https://github.com/typescript-cheatsheets",
      followers_url:
        "https://api.github.com/users/typescript-cheatsheets/followers",
      following_url:
        "https://api.github.com/users/typescript-cheatsheets/following{/other_user}",
      gists_url:
        "https://api.github.com/users/typescript-cheatsheets/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/typescript-cheatsheets/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/typescript-cheatsheets/subscriptions",
      organizations_url:
        "https://api.github.com/users/typescript-cheatsheets/orgs",
      repos_url: "https://api.github.com/users/typescript-cheatsheets/repos",
      events_url:
        "https://api.github.com/users/typescript-cheatsheets/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/typescript-cheatsheets/received_events",
      type: "Organization",
      user_view_type: "public",
      site_admin: false,
    },
    html_url: "https://github.com/typescript-cheatsheets/react",
    description:
      "Cheatsheets for experienced React developers getting started with TypeScript",
    fork: false,
    url: "https://api.github.com/repos/typescript-cheatsheets/react",
    forks_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/forks",
    keys_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/collaborators{/collaborator}",
    teams_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/teams",
    hooks_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/hooks",
    issue_events_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/issues/events{/number}",
    events_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/events",
    assignees_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/branches{/branch}",
    tags_url: "https://api.github.com/repos/typescript-cheatsheets/react/tags",
    blobs_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/languages",
    stargazers_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/stargazers",
    contributors_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/contributors",
    subscribers_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/subscribers",
    subscription_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/subscription",
    commits_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/compare/{base}...{head}",
    merges_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/merges",
    archive_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/downloads",
    issues_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/labels{/name}",
    releases_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/typescript-cheatsheets/react/deployments",
    created_at: "2018-06-02T04:08:16Z",
    updated_at: "2025-05-27T06:07:51Z",
    pushed_at: "2025-05-22T10:24:51Z",
    git_url: "git://github.com/typescript-cheatsheets/react.git",
    ssh_url: "git@github.com:typescript-cheatsheets/react.git",
    clone_url: "https://github.com/typescript-cheatsheets/react.git",
    svn_url: "https://github.com/typescript-cheatsheets/react",
    homepage: "https://react-typescript-cheatsheet.netlify.app",
    size: 3137,
    stargazers_count: 46312,
    watchers_count: 46312,
    language: "JavaScript",
    has_issues: true,
    has_projects: false,
    has_downloads: true,
    has_wiki: false,
    has_pages: false,
    has_discussions: true,
    forks_count: 4201,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 1,
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit",
      node_id: "MDc6TGljZW5zZTEz",
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: ["cheatsheet", "guide", "react", "typescript"],
    visibility: "public",
    forks: 4201,
    open_issues: 1,
    watchers: 46312,
    default_branch: "main",
    score: 1.0,
  },
];

function App() {
  return (
    <div className="min-h-screen bg-surface-dark text-white flex flex-col">
      <Header />
      <main>
        <div className="flex flex-col items-center relative">
          <SearchBar />
        </div>
        {mockitems.map((repo, i) => (
          <RepositoryTile repoDetails={repo} key={i} />
        ))}
      </main>
    </div>
  );
}

export default App;
