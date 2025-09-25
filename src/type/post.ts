// 게시물
export interface PostResType {
  id: number;
  author: {
    name: string;
    nickname: string;
    profileImage: string;
    verified: boolean;
  };
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

// 댓글
export interface Comment {
  author: {
    name: string;
    nickname: string;
    profileImage: string;
    verified: boolean;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}
