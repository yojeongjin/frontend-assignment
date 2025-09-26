export interface PostProps {
  initialPosts: PostResType[];
  pageSize: number;
}

// 게시물
export interface PostResType {
  id: number;
  author: Author;
  content: string;
  images: string[];
  category: number;
  categoryName: string;
  createdAt: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
  isRetweeted: boolean;
  hasMoreComments: boolean;
  commentList?: Comment[];
}

// 작성자
export interface Author {
  name: string;
  nickname: string;
  profileImage: string;
  verified: boolean;
}

// 댓글
export interface Comment {
  author: Author;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface PostReqType {
  author: Author;
  content: string;
  images: string[];
  category: number;
  categoryName: string;
  createdAt: string;
}

export interface GetPostsQuery {
  page?: number;
  limit?: number;
  categoryId?: number;
  sort?: 'newest' | 'oldest';
}

export interface GetPostsResult {
  items: PostResType[];
  total: number;
}
