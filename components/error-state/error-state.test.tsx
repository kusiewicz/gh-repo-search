import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ErrorState } from "./error-state";

describe("ErrorState", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders error heading", () => {
    render(<ErrorState error={new Error("Test error")} onRetry={() => {}} />);

    const heading = screen.getByText("Error Loading Repositories");
    expect(heading).toBeInTheDocument();
  });

  test("displays error message when provided", () => {
    const errorMessage = "Something went wrong with the API";
    render(<ErrorState error={new Error(errorMessage)} onRetry={() => {}} />);

    const message = screen.getByText(errorMessage);
    expect(message).toBeInTheDocument();
  });

  test("calls onRetry when retry button is clicked", () => {
    const mockRetry = vi.fn();
    render(<ErrorState error={new Error("Test error")} onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button");
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});
