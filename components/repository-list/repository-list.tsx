import { GridLayout } from "@/components/grid-layout/grid-layout";
import { RepositoryTile } from "@/components/repository-tile/repository-tile";
import { SkeletonGrid } from "@/components/repository-tile-skeleton/repository-tile-skeleton";
import { ErrorState } from "@/components/error-state/error-state";
import { RepositoryProps } from "@/api/queries/get-repositories-query/types";

interface RepositoryListProps {
  items: RepositoryProps[];
  isFetchingNextPage: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => void;
}

export const RepositoryList = ({
  items,
  isFetchingNextPage,
  isError,
  error,
  fetchNextPage,
}: RepositoryListProps) => (
  <GridLayout>
    {items.map((repo) => (
      <RepositoryTile repositoryDetails={repo} key={repo.id} />
    ))}
    {isFetchingNextPage ? <SkeletonGrid count={6} /> : null}
    {isError ? <ErrorState error={error} onRetry={fetchNextPage} /> : null}
  </GridLayout>
); 