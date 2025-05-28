import { describe, test, expect, vi, afterEach, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import App from "./page";
import { setupMswServerForTests } from "@/src/mocks/server";
import { TestQueryClientProvider } from "@/providers/test-query-client.provider";
import { REPOSITORY_TILE_SKELETON_TEST_ID } from "@/components/repository-tile-skeleton/repository-tile-skeleton";

let intersectionCallback: IntersectionObserverCallback;

const mockIntersectionObserver = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
};

vi.stubGlobal(
  "IntersectionObserver",
  vi.fn((callback: IntersectionObserverCallback) => {
    intersectionCallback = callback;
    return mockIntersectionObserver;
  }),
);

describe("App", () => {
  setupMswServerForTests();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  const renderPage = () =>
    render(
      <TestQueryClientProvider>
        <App />
      </TestQueryClientProvider>,
    );

  test("shows loading state (skeleton) when fetching repositories", async () => {
    renderPage();

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });

    fireEvent.change(searchInput, { target: { value: "repo-1" } });
    vi.advanceTimersByTimeAsync(1000);

    await waitFor(() => {
      expect(
        screen.getAllByTestId(REPOSITORY_TILE_SKELETON_TEST_ID)[0],
      ).toBeInTheDocument();
    });
  });

  test("loads and displays repositories matching search query", async () => {
    renderPage();
    vi.advanceTimersByTimeAsync(1000);

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });

    fireEvent.change(searchInput, { target: { value: "repo-1" } });

    await waitFor(() => {
      expect(screen.getByText("test-user/repo-1")).toBeInTheDocument();
    });

    expect(screen.getByText("test-user/repo-15")).toBeInTheDocument();
    expect(screen.queryByText("test-user/repo-2")).not.toBeInTheDocument();
  });

  test("handles empty results", async () => {
    renderPage();
    vi.advanceTimersByTimeAsync(1000);

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });

    fireEvent.change(searchInput, { target: { value: "no-results" } });

    await waitFor(() => {
      expect(
        screen.getByText("No repositories found for no-results"),
      ).toBeInTheDocument();
    });
  });

  test("handles API error", async () => {
    render(
      <TestQueryClientProvider
        config={{
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        }}
      >
        <App />
      </TestQueryClientProvider>,
    );
    vi.advanceTimersByTimeAsync(1000);

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });

    fireEvent.change(searchInput, { target: { value: "error-test" } });

    await waitFor(() => {
      expect(
        screen.queryByTestId(REPOSITORY_TILE_SKELETON_TEST_ID),
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Error Loading Repositories"),
      ).toBeInTheDocument();
    });
  });

  test("loads next page when scrolling", async () => {
    renderPage();
    vi.advanceTimersByTimeAsync(1000);

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });
    fireEvent.change(searchInput, { target: { value: "repo" } });

    await waitFor(() => {
      expect(screen.getByText("test-user/repo-1")).toBeInTheDocument();
    });

    expect(screen.getByText("test-user/repo-8")).toBeInTheDocument();
    expect(screen.queryByText("test-user/repo-11")).not.toBeInTheDocument();

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    await waitFor(() => {
      expect(screen.getByText("test-user/repo-11")).toBeInTheDocument();
    });
  });

  test("shows loading state (tile skeleton) when fetching next page", async () => {
    renderPage();
    vi.advanceTimersByTimeAsync(1000);

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });
    fireEvent.change(searchInput, { target: { value: "repo" } });

    await waitFor(() => {
      expect(screen.getByText("test-user/repo-1")).toBeInTheDocument();
    });

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    await waitFor(() => {
      expect(
        screen.getAllByTestId(REPOSITORY_TILE_SKELETON_TEST_ID)[0],
      ).toBeInTheDocument();
    });
  });

  test("does not show no results message when search is empty", async () => {
    renderPage();

    expect(screen.queryByText("No repositories found")).not.toBeInTheDocument();
  });

  test("shows header component", () => {
    renderPage();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("debounces search queries to prevent excessive API calls", async () => {
    renderPage();

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });

    fireEvent.change(searchInput, { target: { value: "r" } });
    fireEvent.change(searchInput, { target: { value: "re" } });
    fireEvent.change(searchInput, { target: { value: "rep" } });
    fireEvent.change(searchInput, { target: { value: "repo" } });

    expect(
      screen.queryByTestId(REPOSITORY_TILE_SKELETON_TEST_ID),
    ).not.toBeInTheDocument();

    vi.advanceTimersByTimeAsync(1000);

    await waitFor(() => {
      expect(
        screen.getAllByTestId(REPOSITORY_TILE_SKELETON_TEST_ID).length,
      ).toBeGreaterThan(0);
    });
  });

  test("only performs search after final input value within debounce period", async () => {
    renderPage();

    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });

    fireEvent.change(searchInput, { target: { value: "repo-1" } });
    fireEvent.change(searchInput, { target: { value: "repo-2" } });

    expect(screen.queryByText("test-user/repo-15")).not.toBeInTheDocument();

    vi.advanceTimersByTimeAsync(1000);

    await waitFor(() => {
      expect(screen.getByText("test-user/repo-2")).toBeInTheDocument();
    });
  });
});
