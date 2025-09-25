import { useState, useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollType {
  hasNextPage: boolean;
  loadMoreFn: () => Promise<void> | void;
}

export default function useInfiniteScoll({ hasNextPage, loadMoreFn }: InfiniteScrollType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerEl = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (!hasNextPage || isLoading) return;

      if (target.isIntersecting) {
        setIsLoading(true);
        try {
          await loadMoreFn();
        } finally {
          setIsLoading(false);
        }
      }
    },
    [hasNextPage, isLoading, loadMoreFn]
  );

  useEffect(() => {
    if (!observerEl.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
      rootMargin: '100px',
    });
    observer.observe(observerEl.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return { observerEl, isLoading };
}
