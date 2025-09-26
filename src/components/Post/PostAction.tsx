import styled from 'styled-components';
// icons
import { FaRegComment, FaRetweet, FaRegHeart, FaHeart } from 'react-icons/fa6';
// type
import { PostResType } from '@/type/post';

interface PostActionProps {
  post: PostResType;
  handleLike: (id: number) => void | Promise<void>;
  handleRetweet: (id: number) => void | Promise<void>;
}

export default function PostAction({ post, handleLike, handleRetweet }: PostActionProps) {
  return (
    <ActionBase>
      <ActionBtn $variant="comment">
        <Icon>
          <FaRegComment />
        </Icon>
        {post.comments === 0 ? null : post.comments}
      </ActionBtn>
      <ActionBtn
        $variant="retweet"
        $active={post.isRetweeted}
        onClick={(e) => {
          e.stopPropagation();
          handleRetweet(post.id);
        }}
      >
        <Icon>
          <FaRetweet />
        </Icon>
        {post.retweets === 0 ? null : post.retweets}
      </ActionBtn>
      <ActionBtn
        $variant="like"
        $active={post.isLiked}
        onClick={(e) => {
          e.stopPropagation();
          handleLike(post.id);
        }}
      >
        {post.isLiked ? (
          <Icon>
            <FaHeart />
          </Icon>
        ) : (
          <Icon>
            <FaRegHeart />
          </Icon>
        )}
        {post.likes === 0 ? null : post.likes}
      </ActionBtn>
    </ActionBase>
  );
}

/* ===== styles ===== */

const ActionBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  color: ${(props) => props.theme.gray_02};
`;

const ActionBtn = styled.button<{ $variant?: 'comment' | 'retweet' | 'like'; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ $variant, $active, theme }) =>
    $active
      ? // 클릭된 상태면 variant별 메인 색상
        $variant === 'retweet'
        ? theme.retweet
        : $variant === 'like'
          ? theme.like
          : theme.gray_01
      : theme.gray_02};

  &:hover {
    color: ${({ $variant, theme }) =>
      $variant === 'retweet' ? theme.retweet : $variant === 'like' ? theme.like : 'gray_01'};
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 17px;
`;
