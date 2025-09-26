import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// hooks
import usePrototypes from '@/hooks/usePrototypes';
// type
import { PostResType } from '@/type/post';
import { getPostId } from '@/services/post.service';
import PostSkeleton from '@/components/Post/Load/PostSkeleton';
import PostContent from '@/components/Post/PostContent';
import PostHeader from '@/components/Post/PostHeader';
import PostImg from '@/components/Post/PostImg';
import PostDetailArticle from '@/components/Post/Detail/PostDetailArticle';
import PostAction from '@/components/Post/PostAction';
import PostComment from '@/components/Post/Detail/PostComment';
import CommentAction from '@/components/Post/Detail/CommentAction';

export default function PostDetailConatiner() {
  const router = useRouter();
  const postId = Number(router.query.id);
  /* ===== external states ===== */
  const { prototypes } = usePrototypes();
  /* ===== local states ===== */
  const [post, setPost] = useState<PostResType | null>(null);

  /**
   * 초기 데이터 로드
   *
   * @description
   * - 1페이지 로드 → posts 세팅
   */

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const data = await getPostId(prototypes, postId);
      console.log(data);
      setPost(data);
    })();
  }, [postId]);

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
          <CommentAction />
        </>
      )}
    </section>
  );
}
