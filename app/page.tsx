"use client";

import { EmptyState } from "@/modules/repository-search/components/empty-state/empty-state";
import { Header } from "@/modules/repository-search/components/header/header";
import { InfiniteScroller } from "@/components/infinite-scroller/infinite-scroller";
import { RepositoryList } from "@/modules/repository-search/components/repository-list/repository-list";
import { SkeletonGrid } from "@/modules/repository-search/components/repository-tile-skeleton/repository-tile-skeleton";
import { SearchBar } from "@/modules/repository-search/components/search/search";
import { useRepositorySearch } from "@/modules/repository-search/hooks/use-repository-search";
import { GridLayout } from "@/modules/repository-search/components/grid-layout/grid-layout";

function App() {
  const {
    searchQuery,
    setSearchQuery,
    items,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    debouncedQuery,
    shouldShowEmptyState,
  } = useRepositorySearch();

  return (
    <div className="flex flex-col text-white">
      <Header />
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="relative flex flex-col items-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search GitHub repositories..."
            ariaLabel="GitHub repository search"
          />
        </div>
        <div className="mt-8 space-y-4">
          {isLoading && (
            <GridLayout>
              <SkeletonGrid count={6} />
            </GridLayout>
          )}
          {shouldShowEmptyState && <EmptyState searchQuery={debouncedQuery} />}

          <InfiniteScroller
            fetchNextPage={fetchNextPage}
            isLoading={isLoading || isFetching}
            hasNextPage={hasNextPage}
            className="w-full"
          >
            <RepositoryList
              items={items}
              isFetchingNextPage={isFetchingNextPage}
              isError={isError}
              error={error}
              fetchNextPage={fetchNextPage}
            />
          </InfiniteScroller>
        </div>
      </main>
    </div>
  );
}

export default App;
