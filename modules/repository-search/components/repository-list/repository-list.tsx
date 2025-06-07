import { RepositoryProps } from "@/modules/repository-search/api/types";
import { GridLayout } from "../grid-layout/grid-layout";
import { RepositoryTile } from "../repository-tile/repository-tile";
import { SkeletonGrid } from "../repository-tile-skeleton/repository-tile-skeleton";
import { ErrorState } from "../error-state/error-state";
import { FormattedError } from "@/utils/formatted-error/formatted-error";

interface RepositoryListProps {
  items: RepositoryProps[];
  isFetchingNextPage: boolean;
  isError: boolean;
  error: FormattedError | null;
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
    {isFetchingNextPage && !isError ? <SkeletonGrid count={6} /> : null}
    {isError ? <ErrorState error={error} onRetry={fetchNextPage} /> : null}
  </GridLayout>
);
