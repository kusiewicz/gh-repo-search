import React from "react";

export const REPOSITORY_TILE_SKELETON_TEST_ID = "repository-tile-skeleton";

export const RepositoryTileSkeleton = () => {
  return (
    <div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 animate-pulse"
      data-testid={REPOSITORY_TILE_SKELETON_TEST_ID}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full mr-3 bg-gray-700" />
          <div className="flex-1">
            <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-700 rounded w-1/3" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-4/5" />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-700 rounded-full" />
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-700 mr-2" />
            <div className="h-4 w-16 bg-gray-700 rounded" />
          </div>

          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 rounded bg-gray-700 mr-1" />
                <div className="h-4 w-12 bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="h-4 w-32 bg-gray-700 rounded" />
          <div className="h-4 w-24 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};
