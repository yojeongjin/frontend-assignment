import type { GetServerSideProps } from 'next';
// service
import { getPosts } from '@/services/post.service';
// container
import PostContainer from '@/container/PostContainer';
// type
import { PostProps } from '@/type/post';

// 페이지당 게시물 수
const PAGE_SIZE = 10;

export default function Home({ initialPosts, pageSize }: PostProps) {
  return <PostContainer initialPosts={initialPosts} pageSize={pageSize} />;
}

/**
 * getServerSideProps
 *
 * @description
 * 첫 페이지 게시물(PAGE_SIZE 만큼)을 클라이언트에 props로 전달
 *
 * @returns {Promise<{ props: { initialPosts: PostResType[]; pageSize: number } }>}
 */
export const getServerSideProps: GetServerSideProps = async () => {
  const initialPosts = await getPosts(1, PAGE_SIZE); // 10개 먼저
  return {
    props: {
      initialPosts,
      pageSize: PAGE_SIZE,
    },
  };
};
