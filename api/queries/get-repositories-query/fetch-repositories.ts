import { SearchResponse } from "./types";

export const fetchRepositories = async (
  query: string,
  page: number = 1,
  itemsPerPage: number = 10
): Promise<SearchResponse> => {
  if (!query) return { items: [], total_count: 0 };

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${itemsPerPage}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
};
