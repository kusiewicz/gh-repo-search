import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { SearchBar } from "./search";

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

  test("calls onChange when typing in the input", () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByRole("search");
    fireEvent.change(searchInput, { target: { value: "react" } });

    expect(defaultProps.onChange).toHaveBeenCalledWith("react");
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  test("displays clear button only when input has value", () => {
    const { rerender } = render(<SearchBar {...defaultProps} />);

    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();

    rerender(<SearchBar {...defaultProps} value="react" />);
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  test("clears input when clear button is clicked", () => {
    render(<SearchBar {...defaultProps} value="react" />);

    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);

    expect(defaultProps.onChange).toHaveBeenCalledWith("");
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  test("focuses input after clearing", () => {
    render(<SearchBar {...defaultProps} value="react" />);

    const searchInput = screen.getByRole("search");
    const clearButton = screen.getByLabelText(/clear search/i);

    searchInput.blur();
    expect(document.activeElement).not.toBe(searchInput);

    fireEvent.click(clearButton);

    expect(document.activeElement).toBe(searchInput);
  });

  test("has proper accessibility attributes", () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByRole("search");
    expect(searchInput).toHaveAttribute(
      "aria-label",
      "Search GitHub repositories",
    );

    const searchContainer = screen.getByLabelText(/github repository search/i);
    expect(searchContainer).toBeInTheDocument();
  });

  test("clear button is properly accessible", () => {
    render(<SearchBar {...defaultProps} value="react" />);

    const clearButton = screen.getByLabelText(/clear search/i);
    expect(clearButton).toHaveAttribute("type", "button");
    expect(clearButton).toHaveAttribute("aria-label", "Clear search");
  });
});
