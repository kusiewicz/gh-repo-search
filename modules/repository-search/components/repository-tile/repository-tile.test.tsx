import { describe, test, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { RepositoryTile } from "./repository-tile";
import {
  formatDate,
  formatTimeAgo,
} from "@/utils/date-formatter/date-formatter";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="avatar-image" />
  ),
}));

describe("RepositoryTile", () => {
  afterEach(() => {
    cleanup();
  });

  const mockRepo = {
    id: 1,
    name: "repo",
    full_name: "user/repo",
    private: false,
    owner: {
      login: "user",
      avatar_url: "avatar.jpg",
      id: 123,
      html_url: "https://github.com/user",
      type: "User",
    },
    html_url: "https://github.com/user/repo",
    description: "A test repository",
    fork: false,
    topics: ["react", "typescript"],
    language: "TypeScript",
    stargazers_count: 100,
    watchers_count: 80,
    forks_count: 50,
    open_issues_count: 5,
    license: null,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-12-01T00:00:00Z",
    pushed_at: "2023-12-01T00:00:00Z",
    homepage: "",
    size: 1000,
    visibility: "public",
    default_branch: "main",
  };

  test("renders repository information correctly", () => {
    render(<RepositoryTile repositoryDetails={mockRepo} />);

    expect(screen.getByText("user/repo")).toBeInTheDocument();
    expect(screen.getByText("A test repository")).toBeInTheDocument();
  });

  test("displays correctly formatted dates", () => {
    render(<RepositoryTile repositoryDetails={mockRepo} />);

    const expectedFormattedCreationDate = formatDate(mockRepo.created_at);
    const expectedTimeAgo = formatTimeAgo(mockRepo.updated_at);

    expect(
      screen.getByText(`Created: ${expectedFormattedCreationDate}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Updated ${expectedTimeAgo}`)).toBeInTheDocument();
  });

  test("renders tile as a clickable link with correct attributes", () => {
    render(<RepositoryTile repositoryDetails={mockRepo} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://github.com/user/repo");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("handles missing description", () => {
    const repoWithoutDesc = { ...mockRepo, description: "" };
    render(<RepositoryTile repositoryDetails={repoWithoutDesc} />);

    expect(screen.getByText("No description provided")).toBeInTheDocument();
  });

  test("correctly displays repository stats", () => {
    render(<RepositoryTile repositoryDetails={mockRepo} />);

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("displays language indicator when language is provided", () => {
    render(<RepositoryTile repositoryDetails={mockRepo} />);

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  test("displays topic tags when topics are provided", () => {
    render(<RepositoryTile repositoryDetails={mockRepo} />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });
});
