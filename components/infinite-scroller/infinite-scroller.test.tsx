import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { InfiniteScroller } from "./infinite-scroller";

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

describe("InfiniteScroller", () => {
  const mockFetchNextPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders children correctly", () => {
    render(
      <InfiniteScroller fetchNextPage={mockFetchNextPage}>
        <div data-testid="child-content">Test content</div>
      </InfiniteScroller>,
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("creates intersection observer when mounted", () => {
    render(<InfiniteScroller fetchNextPage={mockFetchNextPage} />);

    expect(vi.mocked(IntersectionObserver)).toHaveBeenCalled();
    expect(mockIntersectionObserver.observe).toHaveBeenCalled();
  });

  test("calls fetchNextPage when observed element intersects", () => {
    render(<InfiniteScroller fetchNextPage={mockFetchNextPage} />);

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  test("does not call fetchNextPage when element is not intersecting", () => {
    render(<InfiniteScroller fetchNextPage={mockFetchNextPage} />);

    intersectionCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  test("does not create observer if hasNextPage is false", () => {
    render(
      <InfiniteScroller
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
      />,
    );

    expect(mockIntersectionObserver.observe).not.toHaveBeenCalled();
  });

  test("does not call fetchNextPage if isLoading is true", () => {
    render(
      <InfiniteScroller fetchNextPage={mockFetchNextPage} isLoading={true} />,
    );

    intersectionCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  test("passes custom dataTestId to container", () => {
    render(
      <InfiniteScroller
        fetchNextPage={mockFetchNextPage}
        dataTestId="custom-scroller"
      />,
    );

    expect(screen.getByTestId("custom-scroller")).toBeInTheDocument();
  });

  test("does not render sentinel element when hasNextPage is false", () => {
    render(
      <InfiniteScroller
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
      />,
    );

    const sentinelElements = document.querySelectorAll('[aria-hidden="true"]');
    expect(sentinelElements.length).toBe(0);
  });

  test("disconnects observer on unmount", () => {
    const { unmount } = render(
      <InfiniteScroller fetchNextPage={mockFetchNextPage} />,
    );

    unmount();

    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
  });
});
