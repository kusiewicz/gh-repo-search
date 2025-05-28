import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial value", 500));
    expect(result.current).toBe("initial value");
  });

  test("delays updating the value until the specified delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 500 },
      }
    );

    rerender({ value: "updated value", delay: 500 });

    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("updated value");
  });

  test("resets the timer when the value changes before the delay expires", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 500 },
      }
    );

    rerender({ value: "intermediate value", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("initial value");

    rerender({ value: "final value", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("final value");
  });

  test("works with different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 1000 },
      }
    );

    rerender({ value: "updated value", delay: 200 });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe("updated value");
  });

  test("works with non-string values", () => {
    const initialObject = { name: "John", age: 30 };
    const updatedObject = { name: "Jane", age: 25 };

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: initialObject, delay: 500 },
      }
    );

    expect(result.current).toBe(initialObject);

    rerender({ value: updatedObject, delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(updatedObject);
  });
});
