import { createFormattedError } from "./errors";
import { SearchResponse } from "./types";

const getNextPageNumber = (linkHeader: string | null) => {
  if (!linkHeader) return null;

  const nextPagePattern = /<[^>]*[?&]page=(\d+)[^>]*>; rel="next"/;
  const nextPageMatch = linkHeader.match(nextPagePattern);

  return nextPageMatch ? Number(nextPageMatch[1]) : null;
};

const createRequestHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
  }

  return headers;
};

export const fetchRepositories = async (
  query: string,
  page: number = 1,
  itemsPerPage: number = 10,
  token?: string,
): Promise<SearchResponse> => {
  if (!query) return { items: [], total_count: 0 };

  const headers = createRequestHeaders(token);
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query,
  )}&page=${page}&per_page=${itemsPerPage}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {});

    const error = new Error(
      `Failed to fetch repositories: ${response.status} ${
        response.statusText
      } ${JSON.stringify(errorData)}`,
    );

    throw createFormattedError(error, response);
  }

  const data = await response.json();

  return {
    ...data,
    nextPageNumber: getNextPageNumber(response.headers.get("Link")),
  };
};
