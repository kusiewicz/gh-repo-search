import { describe, test, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders correctly with the provided search query", () => {
    const searchQuery = "react-hooks";
    render(<EmptyState searchQuery={searchQuery} />);

    const message = screen.getByText(
      `No repositories found for ${searchQuery}`
    );
    expect(message).toBeInTheDocument();
  });

  test("displays suggestion message", () => {
    render(<EmptyState searchQuery="test" />);

    const suggestion = screen.getByText(
      "Try adjusting your search terms or filters"
    );
    expect(suggestion).toBeInTheDocument();
  });

  test("works with different search queries", () => {
    const { rerender } = render(<EmptyState searchQuery="typescript" />);
    expect(
      screen.getByText("No repositories found for typescript")
    ).toBeInTheDocument();

    rerender(<EmptyState searchQuery="javascript" />);
    expect(
      screen.getByText("No repositories found for javascript")
    ).toBeInTheDocument();

    rerender(<EmptyState searchQuery="" />);
    expect(screen.getByText("No repositories found for")).toBeInTheDocument();
  });
});
