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

  const setupSearch = (query: string) => {
    const searchInput = screen.getByRole("search", {
      name: /search github repositories/i,
    });
    fireEvent.change(searchInput, { target: { value: query } });
    vi.advanceTimersByTimeAsync(1000);
  };

  describe("Search functionality", () => {
    test("performs search with debouncing", async () => {
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

    test("clears search results when input is cleared", async () => {
      renderPage();
      setupSearch("repo-1");

      await waitFor(() => {
        expect(screen.getByText("test-user/repo-1")).toBeInTheDocument();
      });

      const searchInput = screen.getByRole("search", {
        name: /search github repositories/i,
      });
      fireEvent.change(searchInput, { target: { value: "" } });
      vi.advanceTimersByTimeAsync(1000);

      await waitFor(() => {
        expect(screen.queryByText("test-user/repo-1")).not.toBeInTheDocument();
      });
    });

    test("only performs search after final input value within debounce period", async () => {
      renderPage();
      setupSearch("repo-1");
      setupSearch("repo-2");

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
