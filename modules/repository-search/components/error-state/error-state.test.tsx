import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ErrorState } from "./error-state";
import { FormattedError } from "@/utils/formatted-error/formatted-error";
import userEvent from "@testing-library/user-event";

const userMessage = "Test error user message";
const technicalMessage = "Test error technical message";

const error = new FormattedError(userMessage, technicalMessage);

describe("ErrorState", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders error heading", () => {
    render(<ErrorState error={error} onRetry={() => {}} />);

    const heading = screen.getByText("Error Loading Repositories");
    expect(heading).toBeInTheDocument();
  });

  test("displays error message when provided", () => {
    render(<ErrorState error={error} onRetry={() => {}} />);

    const message = screen.getByText(userMessage);
    expect(message).toBeInTheDocument();
  });

  test("calls onRetry when retry button is clicked", async () => {
    const mockRetry = vi.fn();
    render(<ErrorState error={error} onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button", {
      name: "Try loading repositories again",
    });

    await userEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  test("does not render when error is null", () => {
    const { container } = render(
      <ErrorState error={null} onRetry={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("toggles error details visibility when show/hide button is clicked", async () => {
    render(<ErrorState error={error} onRetry={() => {}} />);

    expect(screen.queryByText(technicalMessage)).not.toBeInTheDocument();

    const showDetailsButton = screen.getByRole("button", {
      name: "Show error details",
    });

    await userEvent.click(showDetailsButton);

    expect(screen.getByText(technicalMessage)).toBeInTheDocument();

    const hideDetailsButton = screen.getByRole("button", {
      name: "Hide error details",
    });

    await userEvent.click(hideDetailsButton);

    expect(screen.queryByText(technicalMessage)).not.toBeInTheDocument();
  });

  test("does not show details button when error has no technical message", () => {
    const errorWithoutTechnical = new FormattedError(userMessage, "");
    render(<ErrorState error={errorWithoutTechnical} onRetry={() => {}} />);

    expect(
      screen.queryByRole("button", { name: /details/i }),
    ).not.toBeInTheDocument();
  });
});
