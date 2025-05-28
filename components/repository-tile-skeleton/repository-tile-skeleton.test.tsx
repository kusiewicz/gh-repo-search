import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  RepositoryTileSkeleton,
  REPOSITORY_TILE_SKELETON_TEST_ID,
} from "./repository-tile-skeleton";

describe("RepositoryTileSkeleton", () => {
  test("renders with the correct test ID", () => {
    render(<RepositoryTileSkeleton />);

    const skeletonElement = screen.getByTestId(
      REPOSITORY_TILE_SKELETON_TEST_ID,
    );
    expect(skeletonElement).toBeInTheDocument();
  });
});
