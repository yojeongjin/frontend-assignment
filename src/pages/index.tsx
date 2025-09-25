import type { GetServerSideProps } from 'next';
// service
import { getPosts } from '@/services/post.service';
// container
import PostContainer from '@/container/PostContainer';
// type
import { PostProps } from '@/type/post';

// 페이지 limit
const PAGE_SIZE = 10;

export default function Home({ initialPosts, pageSize }: PostProps) {
  return <PostContainer initialPosts={initialPosts} pageSize={pageSize} />;
}

// ssr
export const getServerSideProps: GetServerSideProps = async () => {
  const initialPosts = await getPosts(1, PAGE_SIZE); // 10개 먼저
  return {
    props: {
      initialPosts,
      pageSize: PAGE_SIZE,
    },
  };
};
