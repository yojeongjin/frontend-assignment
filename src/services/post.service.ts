// data
import { mockPosts } from '@/datas/mockPost';
// type
import { PostResType } from '@/type/post';

// 로딩 시뮬
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// 로컬에서 좋아요/리트윗 상태 저장용
const state: Record<string, PostResType> = {};

/**
 * 게시물 가져오기
 *
 * @param page 페이지 번호 (기본 1)
 * @param limit 한 페이지 당 개수 (기본 10)
 * @returns Promise<PostResType[]>
 */
export const getPosts = async (page = 1, limit = 10): Promise<PostResType[]> => {
  await delay(1000);

  const start = (page - 1) * limit;
  const end = start + limit;

  return mockPosts.slice(start, end);
};

/**
 * 게시글 좋아요
 *
 * @param postId 게시물 ID
 * @returns 업데이트된 게시물 객체
 */
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

/**
 * 게시글 리트윗
 *
 * @param postId 게시물 ID
 * @returns 업데이트된 게시물 객체
 */
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
