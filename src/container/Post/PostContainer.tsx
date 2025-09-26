import { useCallback, useEffect, useState } from 'react';
// service
import { getPosts, toggleLike, toggleRetweet } from '@/services/post.service';
// hooks
import usePrototypes from '@/hooks/usePrototypes';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  /**
   * 초기 데이터 로드
   *
   * @description
   * - 1페이지 로드 → posts 세팅
   */
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const initialPosts = await getPosts(prototypes);

        setPosts(initialPosts);
        setPage(1);
      } catch (e) {
        if ((e as any)?.name !== 'AbortError') {
          console.error(e);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [prototypes]);

  /**
   * 게시물 더 가져오기
   *
   * @description
   * - page + 1 호출 → posts에 추가
   * - 마지막 페이지면 hasNextPage false로 업데이트
   */
  const loadMoreFn = useCallback(async () => {
    const nextPage = page + 1;
    const updated = await getPosts(prototypes, nextPage, PAGE_SIZE);

    setPosts((prev) => prev.concat(updated));
    setPage(nextPage);

    // 마지막 페이지 판단
    if (updated.length < PAGE_SIZE) {
      setHasNextPage(false);
    }
  }, [page, hasNextPage]);

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
      <PostCategory />
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
      {/* 로딩 스켈레톤 */}
      {isLoading && (
        <>
          <PostSkeleton imageCount={0} />
          <PostSkeleton imageCount={3} />
        </>
      )}
      {/* 인터섹션 옵저버 타겟 */}
      <div ref={observerEl} />
      {/* 더 이상 데이터 없음 표시 */}
      {!hasNextPage && posts.length > 0 && <PostLoad>더 이상 데이터가 없습니다.</PostLoad>}
    </section>
  );
}
