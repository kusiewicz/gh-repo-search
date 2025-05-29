"use client";

import { Header } from "@/components/header/header";
import { SearchBar } from "@/components/search/search";
import { InfiniteScroller } from "../components/infinite-scroller/infinite-scroller";
import { EmptyState } from "@/components/empty-state/empty-state";
import { RepositoryList } from "@/components/repository-list/repository-list";
import { useRepositorySearch } from "@/hooks/use-repository-search";
import { SkeletonGrid } from "@/components/repository-tile-skeleton/repository-tile-skeleton";

function App() {
  const {
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
          />
        </div>
        <div className="mt-8 space-y-4">
          {isLoading ? <SkeletonGrid count={9} /> : null}
          {shouldShowEmptyState ? (
            <EmptyState searchQuery={debouncedQuery} />
          ) : null}

          <InfiniteScroller
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
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
