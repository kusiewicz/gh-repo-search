import { useEffect, useRef } from "react";

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  intersectionOptions?: IntersectionObserverInit;
  dataTestId?: string;
}

export const InfiniteScroller = ({
  fetchNextPage,
  hasNextPage = true,
  isLoading = false,
  intersectionOptions = { rootMargin: "100px" },
  children,
  dataTestId,
  ...props
}: InfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        fetchNextPage();
      }
    }, intersectionOptions);

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isLoading, intersectionOptions]);

  return (
    <div {...props} data-testid={dataTestId}>
      {children}
      {hasNextPage && (
        <div ref={observerRef} className="h-4 w-full" aria-hidden="true" />
      )}
    </div>
  );
};
