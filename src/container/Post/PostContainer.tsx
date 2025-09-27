import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// service
import { getPosts, toggleLike, toggleRetweet } from '@/services/post.service';
// hooks
import usePrototypes from '@/hooks/usePrototypes';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
// data
import { mockCategories } from '@/datas/mockCategories';
// type
import { PostResType } from '@/type/post';
// components
import PostCategory from '@/components/Post/PostCategory';
import PostArticle from '@/components/Post/PostArticle';
import PostHeader from '@/components/Post/PostHeader';
import PostContent from '@/components/Post/PostContent';
import PostImg from '@/components/Post/PostImg';
import PostAction from '@/components/Post/PostAction';
import PostSkeleton from '@/components/Post/Load/PostSkeleton';
import PostLoad from '@/components/Post/Load/PostLoad';
import PostScroll from '@/components/Post/PostScroll';
import PullToRefresh from '@/components/Common/PullToRefresh';

export default function PostContainer() {
  const router = useRouter();
  // 스크롤 컨테이너 ref (PostScroll에 연결)
  const postRef = useRef<HTMLDivElement | null>(null);

  /* ===== constants ===== */
  const PAGE_SIZE = 10;

  /* ===== external states ===== */
  const { prototypes } = usePrototypes();

  /* ===== local states ===== */
  const [posts, setPosts] = useState<PostResType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [total, setTotal] = useState<number | null>(null);
  // 필터
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [sortKey, setSortKey] = useState<'newest' | 'oldest'>('newest');

  /* ===== derived ===== */
  const categories = useMemo(() => [{ id: 0, name: '전체' }, ...mockCategories], []);

  // fetch 취소를 위한 AbortController (필터 변경/언마운트 시 취소)
  const abortRef = useRef<AbortController | null>(null);

  // 스크롤 컨테이너 최상단으로
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  /**
   * 리스트 초기화 로더 (1페이지)
   *
   * @behavior
   * - 스크롤 최상단으로 올리고, 기존 페이지 상태 리셋.
   * - 진행 중 요청이 있으면 취소(AbortController).
   */
  const loadPostFn = useCallback(async () => {
    // 이전 요청 취소
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setHasNextPage(true);
    setPosts([]);
    setTotal(null);
    scrollToTop();

    try {
      const res = await getPosts(prototypes, {
        page: 1,
        limit: PAGE_SIZE,
        categoryId: selectedCategoryId,
        sort: sortKey,
      });
      setPosts(res.items);
      setTotal(res.total);
      setPage(1);
    } catch (e) {
      if ((e as any)?.name !== 'AbortError') {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  }, [prototypes, selectedCategoryId, sortKey]);

  // 필터가 바뀌면 초기 로드
  useEffect(() => {
    loadPostFn();
    return () => {
      // 컴포넌트 unmount 시 요청 취소
      abortRef.current?.abort();
    };
  }, [loadPostFn]);

  /**
   * 게시물 더 가져오기
   *
   * @description
   * - page + 1 호출 → posts에 추가
   * - 마지막 페이지면 hasNextPage false로 업데이트
   */
  const loadMoreFn = useCallback(async () => {
    if (!hasNextPage || isLoading) return;

    try {
      const nextPage = page + 1;

      const updated = await getPosts(prototypes, {
        page: nextPage,
        limit: PAGE_SIZE,
        categoryId: selectedCategoryId,
        sort: sortKey,
      });

      setPosts((prev) => {
        const seen = new Set(prev.map((p) => p.id));
        const dedup = updated.items.filter((p) => !seen.has(p.id));
        return [...prev, ...dedup];
      });

      setTotal(updated.total);
      setPage(nextPage);

      // 마지막 페이지 판단
      if (updated.items.length < PAGE_SIZE || nextPage * PAGE_SIZE >= updated.total) {
        setHasNextPage(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [page, hasNextPage, prototypes, selectedCategoryId, sortKey]);

  // 무한 스크롤 hook
  const { observerEl } = useInfiniteScroll({
    hasNextPage,
    loadMoreFn,
    setIsLoading,
  });

  /**
   * 좋아요 토글
   *
   * @param postId 대상 게시물 ID
   */

  const handleLike = useCallback(
    async (postId: number) => {
      const updated = await toggleLike(prototypes, postId);

      setPosts((prev) => prev.map((prev) => (prev.id === postId ? updated : prev)));
    },
    [prototypes]
  );
  /**
   * 리트윗 토글
   *
   * @param postId 대상 게시물 ID
   */
  const handleRetweet = useCallback(
    async (postId: number) => {
      const updated = await toggleRetweet(prototypes, postId);

      setPosts((prev) => prev.map((prev) => (prev.id === postId ? updated : prev)));
    },
    [prototypes]
  );

  return (
    <section aria-label="게시물 피드">
      {/* 카테고리/정렬 바 */}
      <PostCategory
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        sortKey={sortKey}
        setSortKey={setSortKey}
        total={total}
      />
      {/* 스크롤 컨테이너 + Pull-To-Refresh */}
      <PostScroll ref={postRef}>
        <PullToRefresh elRef={postRef} loadPostFn={loadPostFn}>
          {/* 최초 로딩 */}
          {isLoading && posts.length === 0 ? (
            <>
              <PostSkeleton imageCount={0} />
              <PostSkeleton imageCount={2} />
            </>
          ) : (
            <>
              {/* 리스트 */}
              {posts.map((post) => (
                <PostArticle
                  key={`post-${post.id}`}
                  aria-label={`${post.id}의 게시물`}
                  onClick={() => router.push(`/post/${post.id}`)}
                >
                  <PostHeader
                    author={post.author}
                    categoryName={post.categoryName}
                    createdAt={post.createdAt}
                  />
                  <PostContent content={post.content} />
                  <PostImg images={post.images} />
                  <PostAction post={post} handleLike={handleLike} handleRetweet={handleRetweet} />
                </PostArticle>
              ))}

              {/* 추가 로딩 스켈레톤 (무한스크롤 진행 중) */}
              {isLoading && (
                <>
                  <PostSkeleton imageCount={0} />
                  <PostSkeleton imageCount={2} />
                </>
              )}
            </>
          )}

          {/* 인터섹션 옵저버 타겟 */}
          <div ref={observerEl} style={{ height: 1 }} />
          {/* 더 이상 데이터 없음 표시 */}
          {!hasNextPage && posts.length > 0 && <PostLoad>더 이상 데이터가 없습니다.</PostLoad>}
        </PullToRefresh>
      </PostScroll>
    </section>
  );
}
