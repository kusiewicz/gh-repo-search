import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "../../../hooks/use-debounce";
import { SearchResponse } from "@/modules/repository-search/api/types";
import { fetchRepositories } from "@/modules/repository-search/api/fetch-repositories";
import { FormattedError } from "@/utils/formatted-error/formatted-error";

interface UseRepositorySearchOptions {
  itemsPerPage?: number;
  debounceMs?: number;
}

const INFINITE_REPOSITORIES_QUERY_KEY = "infinite-repositories";

export const useRepositorySearch = ({
  itemsPerPage = 20,
  debounceMs = 500,
}: UseRepositorySearchOptions = {}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, debounceMs);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<SearchResponse, FormattedError>({
    queryKey: [INFINITE_REPOSITORIES_QUERY_KEY, debouncedQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchRepositories(
        debouncedQuery,
        pageParam as number,
        itemsPerPage,
        process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      ),
    initialPageParam: 1,
    getNextPageParam: (previousPage) => previousPage.nextPageNumber,
    enabled: debouncedQuery.trim().length > 0,
  });

  const items = response?.pages.flatMap((page) => page.items) || [];

  const shouldShowEmptyState =
    items.length === 0 && debouncedQuery.trim() && !isLoading && !isError;

  return {
    searchQuery,
    debouncedQuery,
    setSearchQuery,
    items,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    shouldShowEmptyState,
  };
};
