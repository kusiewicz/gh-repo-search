import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { formatTimeAgo, formatDate } from "./date-formatter";

describe("formatTimeAgo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 0, 10, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("formats seconds correctly", () => {
    const date = new Date(2023, 0, 10, 11, 59, 30);
    expect(formatTimeAgo(date.toISOString())).toBe("30 seconds ago");

    const dateOneSecond = new Date(2023, 0, 10, 11, 59, 59);
    expect(formatTimeAgo(dateOneSecond.toISOString())).toBe("1 seconds ago");
  });

  test("formats minutes correctly", () => {
    const date = new Date(2023, 0, 10, 11, 55, 0);
    expect(formatTimeAgo(date.toISOString())).toBe("5 minutes ago");

    const dateOneMinute = new Date(2023, 0, 10, 11, 59, 0);
    expect(formatTimeAgo(dateOneMinute.toISOString())).toBe("1 minute ago");
  });

  test("formats hours correctly", () => {
    const date = new Date(2023, 0, 10, 9, 0, 0);
    expect(formatTimeAgo(date.toISOString())).toBe("3 hours ago");

    const dateOneHour = new Date(2023, 0, 10, 11, 0, 0);
    expect(formatTimeAgo(dateOneHour.toISOString())).toBe("1 hour ago");
  });

  test("formats days correctly", () => {
    const date = new Date(2023, 0, 5, 12, 0, 0);
    expect(formatTimeAgo(date.toISOString())).toBe("5 days ago");

    const dateOneDay = new Date(2023, 0, 9, 12, 0, 0);
    expect(formatTimeAgo(dateOneDay.toISOString())).toBe("1 day ago");
  });

  test("formats months correctly", () => {
    const date = new Date(2022, 10, 10, 12, 0, 0);
    expect(formatTimeAgo(date.toISOString())).toBe("2 months ago");

    const dateOneMonth = new Date(2022, 11, 10, 12, 0, 0);
    expect(formatTimeAgo(dateOneMonth.toISOString())).toBe("1 month ago");
  });

  test("formats years correctly", () => {
    const date = new Date(2021, 0, 10, 12, 0, 0);
    expect(formatTimeAgo(date.toISOString())).toBe("2 years ago");

    const dateOneYear = new Date(2022, 0, 10, 12, 0, 0);
    expect(formatTimeAgo(dateOneYear.toISOString())).toBe("1 year ago");
  });
});

describe("formatDate", () => {
  test("formats date in the expected format", () => {
    const date = new Date(2023, 0, 15);
    expect(formatDate(date.toISOString())).toBe("Jan 15, 2023");

    const anotherDate = new Date(2022, 11, 31);
    expect(formatDate(anotherDate.toISOString())).toBe("Dec 31, 2022");
  });

  test("handles different date formats", () => {
    expect(formatDate("2023-03-25T12:00:00Z")).toBe("Mar 25, 2023");

    expect(formatDate("October 5, 2022")).toBe("Oct 5, 2022");
  });
});
