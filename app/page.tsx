"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header/header";
import RepositoryTile from "@/components/repository-tile/repository-tile";
import { SearchBar } from "@/components/search/search";
import { InfiniteScroller } from "../components/infinite-scroller/infinite-scroller";
import { useGetRepositoriesQuery } from "@/api/queries/get-repositories-query/use-get-repositories-query";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    items,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    searchQuery: debouncedQuery,
  } = useGetRepositoriesQuery(searchQuery);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen bg-surface-dark text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center relative">
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div className="mt-8 space-y-4">
          {isLoading && (
            <div className="text-center text-white/60">Loading...</div>
          )}

          {isError && (
            <div className="text-center text-red-400">
              Error:{" "}
              {error instanceof Error
                ? error.message
                : "Failed to fetch repositories"}
            </div>
          )}

          {items.length === 0 && debouncedQuery && (
            <div className="text-center text-white/60">
              No repositories found
            </div>
          )}

          <InfiniteScroller
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
          >
            {items.map((repo) => (
              <RepositoryTile repositoryDetails={repo} key={repo.id} />
            ))}
          </InfiniteScroller>
        </div>
      </main>
    </div>
  );
}

export default App;
