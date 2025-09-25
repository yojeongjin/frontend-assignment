// data
import { mockPosts } from '@/datas/mockPost';
// type
import { PostResType } from '@/type/post';

// 로딩 시뮬
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// 로컬에서 좋아요/리트윗 상태 저장용
const state: Record<string, PostResType> = {};

// 게시글 좋아요
export const toggleLike = async (postId: number) => {
  await delay(300);
  const prev = state[postId] ?? mockPosts.find((post) => post.id === postId)!;

  const updatedPost: PostResType = {
    ...prev,
    isLiked: !prev.isLiked,
    likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
  };

  state[postId] = updatedPost;

  return updatedPost;
};

// 게시글 리트윗
export const toggleRetweet = async (postId: number) => {
  await delay(300);
  const prev = state[postId] ?? mockPosts.find((post) => post.id === postId)!;

  const updatedPost: PostResType = {
    ...prev,
    isRetweeted: !prev.isRetweeted,
    retweets: prev.isRetweeted ? prev.retweets - 1 : prev.retweets + 1,
  };

  state[postId] = updatedPost;

  return updatedPost;
};
