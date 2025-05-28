import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface UseSearchQueryResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useSearchQuery = ({
  paramName = "q",
}: {
  paramName?: string;
}): UseSearchQueryResult => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get(paramName) || "";

  const setSearchQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set(paramName, query);
      } else {
        params.delete(paramName);
      }

      const newUrl = params.toString() ? `/?${params.toString()}` : "/";
      window.history.replaceState(null, "", newUrl);
    },
    [searchParams, paramName]
  );

  return { searchQuery, setSearchQuery };
};
