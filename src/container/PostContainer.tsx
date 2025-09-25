import { use, useEffect, useState } from 'react';
// service
import { toggleLike, toggleRetweet } from '@/services/post.service';
// data
import { mockPosts } from '@/datas/mockPost';
// type
import { PostResType } from '@/type/post';
// components
import PostCategory from '@/components/Post/PostCategory';
import PostArticle from '@/components/Post/PostArticle';
import PostHeader from '@/components/Post/PostHeader';
import PostContent from '@/components/Post/PostContent';
import PostImg from '@/components/Post/PostImg';
import PostAction from '@/components/Post/PostAction';

export default function PostContainer() {
  const [posts, setPosts] = useState<PostResType[]>([]);

  useEffect(() => {
    const initialPosts = mockPosts.slice(0, 10); // 10개 먼저

    setPosts(initialPosts);
  }, []);

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
    </section>
  );
}
