import { SearchResponse } from "./types";

export const fetchRepositories = async (
  query: string,
  page: number = 1,
  itemsPerPage: number = 10,
  token?: string,
): Promise<SearchResponse> => {
  if (!query) return { items: [], total_count: 0 };

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query,
    )}&page=${page}&per_page=${itemsPerPage}`,
    { headers },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Failed to fetch repositories: ${response.status} ${
        response.statusText
      } ${JSON.stringify(errorData)}`,
    );
  }

  return response.json();
};
