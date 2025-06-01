import { http, HttpResponse } from "msw";
import type { RepositoryProps } from "../../modules/repository-search/api/types";

export const mockRepositories: RepositoryProps[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: index + 1,
    name: `repo-${index + 1}`,
    full_name: `test-user/repo-${index + 1}`,
    private: false,
    owner: {
      login: "test-user",
      id: 1000 + index,
      avatar_url: "https://github.com/identicons/test-user.png",
      html_url: "https://github.com/test-user",
      type: "User",
    },
    html_url: `https://github.com/user/repo-${index + 1}`,
    description: `Description ${index + 1}`,
    fork: false,
    created_at: new Date(
      Date.now() - Math.random() * 10000000000,
    ).toISOString(),
    updated_at: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    pushed_at: new Date(Date.now() - Math.random() * 100000000).toISOString(),
    homepage: index % 3 === 0 ? `https://repo-${index + 1}.example.com` : "",
    size: Math.floor(Math.random() * 10000),
    stargazers_count: Math.floor(Math.random() * 1000),
    watchers_count: Math.floor(Math.random() * 100),
    language: ["JavaScript", "TypeScript", "Python", "Java"][
      Math.floor(Math.random() * 4)
    ],
    forks_count: Math.floor(Math.random() * 100),
    open_issues_count: Math.floor(Math.random() * 50),
    license:
      index % 5 === 0
        ? null
        : {
            key: "mit",
            name: "MIT License",
            spdx_id: "MIT",
            url: "https://api.github.com/licenses/mit",
          },
    topics: ["web", "javascript", "react", "typescript"].slice(
      0,
      Math.floor(Math.random() * 4),
    ),
    visibility: "public",
    default_branch: "main",
  }),
);

export const handlers = [
  http.get(
    "https://api.github.com/search/repositories",
    async ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get("q");
      const page = Number(url.searchParams.get("page")) || 1;
      const perPage = Number(url.searchParams.get("per_page")) || 10;

      if (page > 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (query === "error-test") {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Internal Server Error",
        });
      }

      if (query === "no-results") {
        return HttpResponse.json({
          items: [],
          total_count: 0,
        });
      }

      const filteredRepositories = mockRepositories.filter((repo) =>
        repo.name.toLowerCase().includes(query?.toLowerCase() || ""),
      );

      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const items = filteredRepositories.slice(startIndex, endIndex);

      return HttpResponse.json({
        items,
        total_count: filteredRepositories.length,
      });
    },
  ),
];
