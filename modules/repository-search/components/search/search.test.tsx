import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { SearchBar } from "./search";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    placeholder: "Search GitHub repositories...",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("renders correctly with provided placeholder", () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByRole("search");
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Search GitHub repositories...",
    );

    cleanup();
    render(
      <SearchBar {...defaultProps} placeholder="Custom placeholder text" />,
    );
    expect(screen.getByRole("search")).toHaveAttribute(
      "placeholder",
      "Custom placeholder text",
    );
  });

  test("input is focused on mount", () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByRole("search");
    expect(document.activeElement).toBe(searchInput);
  });

  test("calls onChange when typing in the input", async () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByRole("search");
    await userEvent.type(searchInput, "react");

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalled();
    });
  });

  test("display correct value based on value prop", () => {
    const TEST_VALUE = "test value";

    render(<SearchBar {...{ ...defaultProps, value: TEST_VALUE }} />);

    const searchInput = screen.getByRole("search");

    expect(searchInput).toHaveValue(TEST_VALUE);
  });

  test("displays clear button only when input has value", async () => {
    const { rerender } = render(<SearchBar {...defaultProps} />);

    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();

    rerender(<SearchBar {...defaultProps} value="react" />);
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  test("clears input when clear button is clicked", async () => {
    render(<SearchBar {...defaultProps} value="react" />);

    const clearButton = screen.getByLabelText(/clear search/i);
    await userEvent.click(clearButton);

    expect(defaultProps.onChange).toHaveBeenCalledWith("");
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  test("focuses input after clearing", async () => {
    render(<SearchBar {...defaultProps} value="react" />);

    const searchInput = screen.getByRole("search");
    const clearButton = screen.getByLabelText(/clear search/i);

    searchInput.blur();
    expect(document.activeElement).not.toBe(searchInput);

    await userEvent.click(clearButton);

    expect(document.activeElement).toBe(searchInput);
  });
});
