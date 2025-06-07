import { describe, test, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestQueryClientProvider } from "@/providers/test-query-client.provider";
import { REPOSITORY_TILE_SKELETON_TEST_ID } from "@/modules/repository-search/components/repository-tile-skeleton/repository-tile-skeleton";
import { setupMswServerForTests } from "@/test/msw/server";

import App from "./page";

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

vi.stubGlobal("jest", { advanceTimersByTime: vi.advanceTimersByTime.bind(vi) });

describe("App", () => {
  setupMswServerForTests();

  beforeEach(() => {
    vi.clearAllMocks();
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

  const setupSearch = async (query: string) => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });
    await user.clear(searchInput);
    await user.type(searchInput, query);
  };

  describe("Search functionality", () => {
    test("performs search with debouncing", async () => {
      renderPage();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      const searchInput = screen.getByRole("search", {
        name: /search github repositories/i,
      });

      await user.type(searchInput, "r");
      await user.type(searchInput, "re");
      await user.type(searchInput, "rep");
      await user.type(searchInput, "repo");

      expect(
        screen.queryByTestId(REPOSITORY_TILE_SKELETON_TEST_ID),
      ).not.toBeInTheDocument();

      await waitFor(() => {
        expect(
          screen.getAllByTestId(REPOSITORY_TILE_SKELETON_TEST_ID).length,
        ).toBeGreaterThan(0);
      });
    });

    test("clears search results when input is cleared", async () => {
      renderPage();
      await setupSearch("repo-1");

      await waitFor(() => {
        expect(screen.getByText("test-user/repo-1")).toBeInTheDocument();
      });

      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const searchInput = screen.getByRole("search", {
        name: /search github repositories/i,
      });
      await user.clear(searchInput);

      await waitFor(() => {
        expect(screen.queryByText("test-user/repo-1")).not.toBeInTheDocument();
      });
    });

    test("only performs search after final input value within debounce period", async () => {
      renderPage();
      await setupSearch("repo-1");
      await setupSearch("repo-2");

      expect(screen.queryByText("test-user/repo-15")).not.toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText("test-user/repo-2")).toBeInTheDocument();
      });
    });
  });

  describe("Loading states", () => {
    test("shows loading state when fetching repositories", async () => {
      renderPage();
      setupSearch("repo-1");

      await waitFor(() => {
        expect(
          screen.getAllByTestId(REPOSITORY_TILE_SKELETON_TEST_ID)[0],
        ).toBeInTheDocument();
      });
    });

    test("shows loading state when fetching next page", async () => {
      renderPage();
      setupSearch("repo");

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
  });

  describe("Error handling", () => {
    test("handles API error", async () => {
      renderPage();
      setupSearch("error-test");

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

    test("handles empty results", async () => {
      renderPage();
      setupSearch("no-results");

      await waitFor(() => {
        expect(
          screen.getByText("No repositories found for no-results"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Infinite scrolling", () => {
    test("loads next page when scrolling", async () => {
      renderPage();
      setupSearch("repo");

      await waitFor(() => {
        expect(screen.getByText("test-user/repo-1")).toBeInTheDocument();
      });

      expect(screen.getByText("test-user/repo-18")).toBeInTheDocument();
      expect(screen.queryByText("test-user/repo-22")).not.toBeInTheDocument();

      intersectionCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );

      await waitFor(() => {
        expect(screen.getByText("test-user/repo-22")).toBeInTheDocument();
      });
    });

    test("does not load data when no next page exists", async () => {
      renderPage();
      setupSearch("repo-29");

      await waitFor(() => {
        expect(screen.getByText("test-user/repo-29")).toBeInTheDocument();
      });

      const initialObserverCalls =
        mockIntersectionObserver.observe.mock.calls.length;

      if (intersectionCallback) {
        intersectionCallback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      }

      expect(
        screen.queryByTestId(REPOSITORY_TILE_SKELETON_TEST_ID),
      ).not.toBeInTheDocument();

      expect(mockIntersectionObserver.observe.mock.calls.length).toBe(
        initialObserverCalls,
      );
    });
  });

  describe("Component rendering", () => {
    test("shows header component", () => {
      renderPage();
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    test("does not show no results message when search is empty", async () => {
      renderPage();
      expect(
        screen.queryByText("No repositories found"),
      ).not.toBeInTheDocument();
    });
  });
});
