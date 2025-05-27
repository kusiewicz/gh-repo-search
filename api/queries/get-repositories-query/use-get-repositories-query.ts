import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { SearchResponse } from "./types";
import { fetchRepositories } from "./fetch-repositories";
import { useSyncSearchParam } from "@/hooks/use-sync-search-param";

export const useGetRepositoriesQuery = (
  searchQuery: string,
  itemsPerPage: number = 10
) => {
  const debouncedQuery = useDebounce(searchQuery, 500);
  useSyncSearchParam("q", debouncedQuery);

  const {
    data: response,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<SearchResponse>({
    queryKey: ["repositories", debouncedQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchRepositories(debouncedQuery, pageParam as number, itemsPerPage),
    initialPageParam: 1,
    getNextPageParam: (previousPage, totalSoFar) => {
      return previousPage.items.length === 0
        ? undefined
        : totalSoFar.length + 1;
    },
    enabled: debouncedQuery.length > 0,
  });

  return {
    items: response?.pages.flatMap((page) => page.items) || [],
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    searchQuery: debouncedQuery,
  };
};
