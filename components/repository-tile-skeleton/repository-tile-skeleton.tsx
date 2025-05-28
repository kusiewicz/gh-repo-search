export const REPOSITORY_TILE_SKELETON_TEST_ID = "repository-tile-skeleton";

export const RepositoryTileSkeleton = () => {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg"
      data-testid={REPOSITORY_TILE_SKELETON_TEST_ID}
    >
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className="mr-3 h-10 w-10 rounded-full bg-gray-700" />
          <div className="flex-1">
            <div className="mb-2 h-5 w-3/4 rounded bg-gray-700" />
            <div className="h-4 w-1/3 rounded bg-gray-700" />
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-4 w-full rounded bg-gray-700" />
          <div className="h-4 w-4/5 rounded bg-gray-700" />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 rounded-full bg-gray-700" />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-gray-700" />
            <div className="h-4 w-16 rounded bg-gray-700" />
          </div>

          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="mr-1 h-4 w-4 rounded bg-gray-700" />
                <div className="h-4 w-12 rounded bg-gray-700" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="h-4 w-32 rounded bg-gray-700" />
          <div className="h-4 w-24 rounded bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <RepositoryTileSkeleton key={i} />
    ))}
  </>
);
