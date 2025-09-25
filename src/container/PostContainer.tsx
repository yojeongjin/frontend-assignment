'use client';

import { useCallback, useState } from 'react';
// service
import { getPosts, toggleLike, toggleRetweet } from '@/services/post.service';
// hooks
import useInfiniteScoll from '@/hooks/useInfiniteScoll';
// type
import { PostProps, PostResType } from '@/type/post';
// components
import PostCategory from '@/components/Post/PostCategory';
import PostArticle from '@/components/Post/PostArticle';
import PostHeader from '@/components/Post/PostHeader';
import PostContent from '@/components/Post/PostContent';
import PostImg from '@/components/Post/PostImg';
import PostAction from '@/components/Post/PostAction';
import PostSkeleton from '@/components/Post/Load/PostSkeleton';
import PostLoad from '@/components/Post/Load/PostLoad';

export default function PostContainer({ initialPosts, pageSize }: PostProps) {
  const [posts, setPosts] = useState<PostResType[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialPosts.length === pageSize);

  // 게시물 더 가져오기
  const loadMoreFn = useCallback(async () => {
    const nextPage = page + 1;
    const updated = await getPosts(nextPage, pageSize);

    setPosts((prev) => prev.concat(updated));
    setPage(nextPage);

    // 마지막 페이지 판단
    if (updated.length < pageSize) {
      setHasNextPage(false);
    }
  }, [page, pageSize]);

  // 무한 스크롤 hook
  const { observerEl, isLoading } = useInfiniteScoll({ hasNextPage, loadMoreFn });

  // 좋아요
  const handleLike = async (postId: number) => {
    const updated = await toggleLike(postId);

    setPosts((prev) => prev.map((prev) => (prev.id === postId ? updated : prev)));
  };

  // 리트윗
  const handleRetweet = async (postId: number) => {
    const updated = await toggleRetweet(postId);

    setPosts((prev) => prev.map((prev) => (prev.id === postId ? updated : prev)));
  };

  return (
    <section>
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
      {isLoading && (
        <>
          <PostSkeleton imageCount={0} />
          <PostSkeleton imageCount={3} />
        </>
      )}
      <div ref={observerEl} />
      {!hasNextPage && posts.length > 0 && <PostLoad>더 이상 데이터가 없습니다.</PostLoad>}
    </section>
  );
}
