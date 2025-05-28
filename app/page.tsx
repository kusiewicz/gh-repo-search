"use client";

import { Header } from "@/components/header/header";
import { SearchBar } from "@/components/search/search";
import { InfiniteScroller } from "../components/infinite-scroller/infinite-scroller";
import { useGetRepositoriesQuery } from "@/api/queries/get-repositories-query/use-get-repositories-query";
import { RepositoryTileSkeleton } from "@/components/repository-tile-skeleton/repository-tile-skeleton";
import { GridLayout } from "@/components/grid-layout/grid-layout";
import { EmptyState } from "@/components/empty-state/empty-state";
import { ErrorState } from "@/components/error-state/error-state";
import { useState } from "react";
import { RepositoryTile } from "@/components/repository-tile/repository-tile";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    items,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    searchQuery: debouncedQuery,
    isFetchingNextPage,
  } = useGetRepositoriesQuery(searchQuery);

  const shouldShowEmptyState =
    items.length === 0 && debouncedQuery && !isLoading;

  return (
    <div className="flex flex-col text-white">
      <Header />
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="relative flex flex-col items-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search GitHub repositories..."
          />
        </div>
        <div className="mt-8 space-y-4">
          {isLoading && (
            <GridLayout>
              {[...Array(9)].map((_, i) => (
                <RepositoryTileSkeleton key={i} />
              ))}
            </GridLayout>
          )}

          {shouldShowEmptyState ? (
            <EmptyState searchQuery={debouncedQuery} />
          ) : null}

          <InfiniteScroller
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            className="w-full"
          >
            <GridLayout>
              {items.map((repo) => (
                <RepositoryTile repositoryDetails={repo} key={repo.id} />
              ))}
              {isFetchingNextPage && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <RepositoryTileSkeleton key={i} />
                  ))}
                </>
              )}
              {isError ? (
                <ErrorState error={error} onRetry={fetchNextPage} />
              ) : null}
            </GridLayout>
          </InfiniteScroller>
        </div>
      </main>
    </div>
  );
}

export default App;
