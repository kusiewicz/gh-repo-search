import React, { useEffect, useRef } from "react";

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isLoading: boolean;
  intersectionOptions?: IntersectionObserverInit;
  dataTestId?: string;
}

export const InfiniteScroller = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  intersectionOptions,
  children,
  dataTestId,
  ...props
}: InfiniteScrollProps) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    }, intersectionOptions);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
      observer.disconnect();
    };
  }, [hasNextPage]);

  return (
    <div {...props} style={{ overflowAnchor: "none" }} data-testid={dataTestId}>
      {children}
      <div
        className="h-[100px] w-full"
        ref={observerTarget}
        style={{ display: isLoading ? "none" : "block" }}
      />
      {isLoading ? <h1>loading..</h1> : null}
    </div>
  );
};
