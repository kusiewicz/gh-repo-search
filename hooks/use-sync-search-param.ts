import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const useSyncSearchParam = (key: string, value: string) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    window.history.replaceState(null, "", newUrl);
  }, [key, value, searchParams]);
};
