"use client";

import { Header } from "@/components/header/header";
import RepositoryTile from "@/components/repository-tile/repository-tile";
import { SearchBar } from "@/components/search/search";
import { InfiniteScroller } from "../components/infinite-scroller/infinite-scroller";
import { useGetRepositoriesQuery } from "@/api/queries/get-repositories-query/use-get-repositories-query";
import { RepositoryTileSkeleton } from "@/components/repository-tile-skeleton/repository-tile-skeleton";
import { v4 as uuidv4 } from "uuid";
import { GridLayout } from "@/components/grid-layout/grid-layout";
import { EmptyState } from "@/components/empty-state/empty-state";
import { ErrorState } from "@/components/error-state/error-state";
import { useState } from "react";

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
    <div className="min-h-screen bg-surface-dark text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center relative">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="mt-8 space-y-4">
          {isLoading && (
            <GridLayout>
              {[...Array(8)].map(() => (
                <RepositoryTileSkeleton key={uuidv4()} />
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
                  {[...Array(4)].map(() => (
                    <RepositoryTileSkeleton key={uuidv4()} />
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
