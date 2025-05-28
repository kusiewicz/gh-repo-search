import { describe, test, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { TopicTags } from "./topic-tags";

describe("TopicTags", () => {
  afterEach(() => {
    cleanup();
  });

  test("limits display to 5 topics and shows +X more for additional topics", () => {
    const topics = [
      "react",
      "typescript",
      "javascript",
      "node",
      "express",
      "graphql",
      "redux",
    ];
    render(<TopicTags topics={topics} />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
    expect(screen.getByText("javascript")).toBeInTheDocument();
    expect(screen.getByText("node")).toBeInTheDocument();
    expect(screen.getByText("express")).toBeInTheDocument();

    expect(screen.queryByText("graphql")).not.toBeInTheDocument();
    expect(screen.queryByText("redux")).not.toBeInTheDocument();

    expect(screen.getByText("+2 more")).toBeInTheDocument();
  });

  test("does not show +X more indicator when exactly 5 topics", () => {
    const topics = ["react", "typescript", "javascript", "node", "express"];
    render(<TopicTags topics={topics} />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("express")).toBeInTheDocument();

    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });

  test("does not show +X more indicator when fewer than 5 topics", () => {
    const topics = ["react", "typescript", "javascript"];
    render(<TopicTags topics={topics} />);

    expect(screen.queryByText(/\+\d+ more/)).not.toBeInTheDocument();
  });
});
