import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
// service
import { getPostId } from '@/services/post.service';
// hooks
import useUser from '@/hooks/useUser';
import usePrototypes from '@/hooks/usePrototypes';
// type
import { PostResType, Comment } from '@/type/post';
// components
import PostSkeleton from '@/components/Post/Load/PostSkeleton';
import PostContent from '@/components/Post/PostContent';
import PostHeader from '@/components/Post/PostHeader';
import PostImg from '@/components/Post/PostImg';
import PostDetailArticle from '@/components/Post/Detail/PostDetailArticle';
import PostAction from '@/components/Post/PostAction';
import PostComment from '@/components/Post/Detail/PostComment';
import CommentAction from '@/components/Post/Detail/CommentAction';

export default function PostDetailContainer() {
  const router = useRouter();
  const user = useUser();
  const { prototypes } = usePrototypes();

  /** 라우터 준비 완료 후에만 id 파싱 */
  const postId = useMemo(() => {
    if (!router.isReady) return null;

    return Number(router.query.id);
  }, [router.isReady, router.query.id]);

  /* ===== local states ===== */
  const [post, setPost] = useState<PostResType | null>(null);
  const commentRef = useRef<HTMLInputElement | null>(null);

  // 진행 중 요청 취소용
  const abortRef = useRef<AbortController | null>(null);

  /**
   * 상세 데이터 로드
   *
   * @description
   * - 라우터 준비 후 유효한 id일 때만 호출
   * - 진행 중 요청이 있으면 취소
   */
  const loadDetail = useCallback(async () => {
    if (postId == null) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setPost(null);

    try {
      const data = await getPostId(prototypes, postId);
      setPost(data);
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        console.error(e);
      }
    }
  }, [postId, prototypes]);

  useEffect(() => {
    loadDetail();
    return () => abortRef.current?.abort();
  }, [loadDetail]);

  /**
   * 좋아요 토글
   *
   */
  const handleLike = async () => {
    if (!post) return;

    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedPost = {
      ...post,
      isLiked: !post?.isLiked,
      likes: post!.isLiked ? post!.likes - 1 : post!.likes + 1,
    };
    setPost(updatedPost);
  };

  /**
   * 리트윗 토글
   *
   */
  const handleRetweet = async () => {
    if (!post) return;

    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedPost = {
      ...post,
      isRetweeted: !post.isRetweeted,
      retweets: post.isRetweeted ? post.retweets - 1 : post.retweets + 1,
    };
    setPost(updatedPost);
  };

  /**
   * 댓글 추가 핸들러
   *
   * @description
   * - 댓글 개수를 +1 하고, commentList 맨 앞에 prepend
   * - 입력값이 없으면 무시
   */
  const addComment = () => {
    const raw = commentRef.current?.value ?? '';
    const text = raw.trim();

    if (!post || !text) return;

    const newComment: Comment = {
      author: {
        name: user.name,
        nickname: user.nickname,
        profileImage: user.profileImage,
        verified: user.verified,
      },
      content: text,
      createdAt: new Date().toISOString(),
      isLiked: false,
      likes: 0,
    };

    const updatedPost = {
      ...post,
      comments: post.comments + 1,
      commentList: [newComment, ...(post.commentList ?? [])],
    };

    setPost(updatedPost);
    // 입력창 초기화
    if (commentRef.current) commentRef.current.value = '';
  };

  return (
    <section aria-label="게시물 피드">
      {!post ? (
        <>
          <PostSkeleton imageCount={2} />
        </>
      ) : (
        <>
          <PostDetailArticle>
            <PostHeader
              author={post.author}
              categoryName={post.categoryName}
              createdAt={post.createdAt}
            />
            <PostContent content={post.content} />
            <PostImg images={post.images} />
            <PostAction post={post} handleLike={handleLike} handleRetweet={handleRetweet} />
          </PostDetailArticle>
          <PostComment commentList={post.commentList} />
          <CommentAction commentRef={commentRef} addComment={addComment} />
        </>
      )}
    </section>
  );
}
