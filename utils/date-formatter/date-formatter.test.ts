import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import {
  formatTimeAgo,
  formatDate,
  formatHoursMinutes,
} from "./date-formatter";

process.env.TZ = "UTC";

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
    expect(formatTimeAgo(date)).toBe("30 seconds ago");

    const dateOneSecond = new Date(2023, 0, 10, 11, 59, 59);
    expect(formatTimeAgo(dateOneSecond)).toBe("1 seconds ago");
  });

  test("formats minutes correctly", () => {
    const date = new Date(2023, 0, 10, 11, 55, 0);
    expect(formatTimeAgo(date)).toBe("5 minutes ago");

    const dateOneMinute = new Date(2023, 0, 10, 11, 59, 0);
    expect(formatTimeAgo(dateOneMinute)).toBe("1 minute ago");
  });

  test("formats hours correctly", () => {
    const date = new Date(2023, 0, 10, 9, 0, 0);
    expect(formatTimeAgo(date)).toBe("3 hours ago");

    const dateOneHour = new Date(2023, 0, 10, 11, 0, 0);
    expect(formatTimeAgo(dateOneHour)).toBe("1 hour ago");
  });

  test("formats days correctly", () => {
    const date = new Date(2023, 0, 5, 12, 0, 0);
    expect(formatTimeAgo(date)).toBe("5 days ago");

    const dateOneDay = new Date(2023, 0, 9, 12, 0, 0);
    expect(formatTimeAgo(dateOneDay)).toBe("1 day ago");
  });

  test("formats months correctly", () => {
    const date = new Date(2022, 10, 10, 12, 0, 0);
    expect(formatTimeAgo(date)).toBe("2 months ago");

    const dateOneMonth = new Date(2022, 11, 10, 12, 0, 0);
    expect(formatTimeAgo(dateOneMonth)).toBe("1 month ago");
  });

  test("formats years correctly", () => {
    const date = new Date(2021, 0, 10, 12, 0, 0);
    expect(formatTimeAgo(date)).toBe("2 years ago");

    const dateOneYear = new Date(2022, 0, 10, 12, 0, 0);
    expect(formatTimeAgo(dateOneYear)).toBe("1 year ago");
  });
});

describe("formatDate", () => {
  test("formats date in the expected format", () => {
    const date = new Date(2023, 0, 15);
    expect(formatDate(date)).toBe("Jan 15, 2023");

    const anotherDate = new Date(2022, 11, 31);
    expect(formatDate(anotherDate)).toBe("Dec 31, 2022");
  });

  test("handles different date formats", () => {
    expect(formatDate(new Date("2023-03-25T12:00:00Z"))).toBe("Mar 25, 2023");
    expect(formatDate(new Date("October 5, 2022"))).toBe("Oct 5, 2022");
  });
});

describe("formatHoursMinutes", () => {
  test("formats time in 24-hour format", () => {
    const date = new Date(2023, 0, 15, 14, 30, 45);
    expect(formatHoursMinutes(date)).toBe("14:30:45");

    const midnight = new Date(2023, 0, 15, 0, 0, 0);
    expect(formatHoursMinutes(midnight)).toBe("24:00:00");

    const noon = new Date(2023, 0, 15, 12, 0, 0);
    expect(formatHoursMinutes(noon)).toBe("12:00:00");
  });

  test("handles different date formats", () => {
    expect(formatHoursMinutes(new Date("2023-03-25T14:30:45Z"))).toBe("14:30:45");
    expect(formatHoursMinutes(new Date("2023-03-25T09:05:00Z"))).toBe("09:05:00");
  });
});
