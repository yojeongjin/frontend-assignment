import { useState, useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollType {
  hasNextPage: boolean;
  loadMoreFn: () => Promise<void> | void;
}
/**
 * useInfiniteScroll
 *
 * @description
 * IntersectionObserver를 활용하여 특정 엘리먼트가 화면에 보일 때 loadMoreFn을 호출
 *
 * - hasNextPage가 false면 더 이상 요청하지 않는다.
 * - 로딩 중이면 중복 호출을 막는다.
 *
 * @returns
 * - observerEl: 감시 대상이 될 ref
 * - isLoading: 로딩 여부
 */

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
