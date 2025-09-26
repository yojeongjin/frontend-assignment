// type
import { GetPostsQuery, GetPostsResult, PostResType } from '@/type/post';

// 로딩 시뮬
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// 로컬에서 좋아요/리트윗 상태 저장용
const state: Record<string, PostResType> = {};

// 정렬 함수
const byNewest = (a: PostResType, b: PostResType) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const byOldest = (a: PostResType, b: PostResType) =>
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

/**
 * 게시물 목록 조회
 *
 * @param {PostResType[]} posts - 전체 게시물 배열
 * @param {GetPostsQuery} [query={}] - 조회 조건
 * @param {number} [query.page=1] - 페이지 번호 (1-based)
 * @param {number} [query.limit=10] - 페이지당 게시물 개수
 * @param {number} [query.categoryId] - 카테고리 ID (0 또는 undefined면 전체)
 * @param {'newest'|'oldest'} [query.sort='newest'] - 정렬 기준
 *
 * @returns {Promise<GetPostsResult>} 조회된 게시물과 전체 개수를 포함한 결과
 */
export const getPosts = async (
  posts: PostResType[],
  query: GetPostsQuery = {}
): Promise<GetPostsResult> => {
  const { page = 1, limit = 10, categoryId, sort = 'newest' } = query;

  await delay(1000);

  // 1) 카테고리 필터링
  const filtered =
    categoryId && categoryId !== 0 ? posts.filter((post) => post.category === categoryId) : posts;

  // 2) 정렬
  const sorted = [...filtered].sort(sort === 'newest' ? byNewest : byOldest);

  // 3) 페이징
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = sorted.slice(start, end);

  const total = sorted.length;

  return { items, total };
};

/**
 * 게시물 단건 조회
 *
 * @param {PostResType[]} posts - 전체 게시물 배열
 * @param {number} id - 게시물 고유 ID (params에서 넘어옴)
 * @returns {Promise<PostResType>} 게시물 객체
 */
export const getPostId = async (posts: PostResType[], id: number): Promise<PostResType> => {
  await delay(1000);

  const post = posts.find((p) => p.id === id);
  if (!post) {
    throw new Error(`Post with id ${id} not found`);
  }
  return post;
};

/**
 * 게시글 좋아요
 *
 * @param posts 전체 게시물 배열
 * @param postId 게시물 ID
 * @returns 업데이트된 게시물 객체
 */
export const toggleLike = async (posts: PostResType[], postId: number) => {
  await delay(300);
  const prev = state[postId] ?? posts.find((post) => post.id === postId)!;

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
 * @param posts 전체 게시물 배열
 * @param postId 게시물 ID
 * @returns 업데이트된 게시물 객체
 */
export const toggleRetweet = async (posts: PostResType[], postId: number) => {
  await delay(300);
  const prev = state[postId] ?? posts.find((post) => post.id === postId)!;

  const updatedPost: PostResType = {
    ...prev,
    isRetweeted: !prev.isRetweeted,
    retweets: prev.isRetweeted ? prev.retweets - 1 : prev.retweets + 1,
  };

  state[postId] = updatedPost;

  return updatedPost;
};
