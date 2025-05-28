import { describe, test, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders correctly (with correct role)", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  test("displays GitHub icon", () => {
    render(<Header />);

    const githubIcon = screen.getByTestId("github-icon");
    expect(githubIcon).toBeInTheDocument();
    expect(githubIcon).toHaveClass("text-white");
  });

  test("displays main heading", () => {
    render(<Header />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("GitHub Repo Search");
  });

  test("displays description text", () => {
    render(<Header />);

    const description = screen.getByText(
      /Discover and explore GitHub repositories/i,
    );
    expect(description).toBeInTheDocument();
  });
});
