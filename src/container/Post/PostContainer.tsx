import { useCallback, useEffect, useMemo, useState } from 'react';
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

export default function PostContainer() {
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

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [sortKey, setSortKey] = useState<'newest' | 'oldest'>('newest');

  /* ===== derived ===== */
  const categories = useMemo(() => [{ id: 0, name: '전체' }, ...mockCategories], []);

  /**
   * 초기 데이터 로드
   *
   * @description
   * - 1페이지 로드 → posts 세팅
   */
  const loadFirstPage = useCallback(async () => {
    setIsLoading(true);
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

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  /**
   * 게시물 더 가져오기
   *
   * @description
   * - page + 1 호출 → posts에 추가
   * - 마지막 페이지면 hasNextPage false로 업데이트
   */
  const loadMoreFn = useCallback(async () => {
    const nextPage = page + 1;

    const updated = await getPosts(prototypes, {
      page: nextPage,
      limit: PAGE_SIZE,
      categoryId: selectedCategoryId,
      sort: sortKey,
    });

    setPosts((prev) => prev.concat(updated.items));
    setTotal(updated.total);
    setPage(nextPage);

    // 마지막 페이지 판단
    if (updated.items.length < PAGE_SIZE || nextPage * PAGE_SIZE >= updated.total) {
      setHasNextPage(false);
    }
  }, [page, hasNextPage, prototypes, selectedCategoryId, sortKey]);

  // 무한 스크롤 hook
  const { observerEl } = useInfiniteScroll({
    hasNextPage,
    loadMoreFn,
    setIsLoading,
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  /**
   * 좋아요 토글
   *
   * @param postId 대상 게시물 ID
   */
  const handleLike = async (postId: number) => {
    const updated = await toggleLike(prototypes, postId);

    setPosts((prev) => prev.map((prev) => (prev.id === postId ? updated : prev)));
  };

  /**
   * 리트윗 토글
   *
   * @param postId 대상 게시물 ID
   */
  const handleRetweet = async (postId: number) => {
    const updated = await toggleRetweet(prototypes, postId);

    setPosts((prev) => prev.map((prev) => (prev.id === postId ? updated : prev)));
  };

  return (
    <section aria-label="게시물 피드">
      <PostCategory
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        sortKey={sortKey}
        setSortKey={setSortKey}
        total={total}
      />
      {/* 로딩 스켈레톤 */}
      {isLoading ? (
        <>
          <PostSkeleton imageCount={0} />
          <PostSkeleton imageCount={2} />
        </>
      ) : (
        <>
          {posts.map((post) => (
            <PostArticle key={post.id} aria-label={`${post.id}의 게시물`}>
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
        </>
      )}
      {/* 인터섹션 옵저버 타겟 */}
      <div ref={observerEl} />
      {/* 더 이상 데이터 없음 표시 */}
      {!hasNextPage && posts.length > 0 && <PostLoad>더 이상 데이터가 없습니다.</PostLoad>}
    </section>
  );
}
