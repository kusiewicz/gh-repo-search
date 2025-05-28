import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "./stats";

describe("Stats", () => {
  test("formats large numbers correctly", () => {
    render(<Stats stars={1500} forks={2500000} issues={5} />);

    expect(screen.getByText("1.5K")).toBeInTheDocument();
    expect(screen.getByText("2.5M")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("handles zero values", () => {
    render(<Stats stars={0} forks={0} issues={0} />);

    const zeroElements = screen.getAllByText("0");
    expect(zeroElements.length).toBe(3);
  });
});
