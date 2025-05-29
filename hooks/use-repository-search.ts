import { useState } from "react";
import { useGetRepositoriesQuery } from "@/api/queries/get-repositories-query/use-get-repositories-query";

export const useRepositorySearch = (initialQuery: string = "") => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const {
    items,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    debouncedQuery,
    isFetchingNextPage,
  } = useGetRepositoriesQuery(searchQuery);

  const shouldShowEmptyState =
    items.length === 0 && debouncedQuery && !isLoading && !isError;

  return {
    searchQuery,
    setSearchQuery,
    items,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    debouncedQuery,
    isFetchingNextPage,
    shouldShowEmptyState,
  };
};
