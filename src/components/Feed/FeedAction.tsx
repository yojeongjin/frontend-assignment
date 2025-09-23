import styled from 'styled-components';
// icons
import { FaRegComment, FaRetweet, FaRegHeart, FaHeart } from 'react-icons/fa6';

export default function FeedAction() {
  return (
    <ActionBase>
      <ActionBtn $variant="comment">
        <Icon>
          <FaRegComment />
        </Icon>
      </ActionBtn>
      <ActionBtn $variant="retweet">
        <Icon>
          <FaRetweet />
        </Icon>
      </ActionBtn>
      <ActionBtn $variant="like">
        <Icon>
          <FaRegHeart />
        </Icon>
      </ActionBtn>
    </ActionBase>
  );
}

/* ===== styles ===== */

const ActionBase = styled.div`
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  color: ${(props) => props.theme.gray_02};
`;

const ActionBtn = styled.button<{ $variant?: 'comment' | 'retweet' | 'like'; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 8px;
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
    font-weight: ${({ $variant }) => ($variant === 'comment' ? 600 : 'inherit')};
    color: ${({ $variant, theme }) =>
      $variant === 'retweet' ? theme.retweet : $variant === 'like' ? theme.like : 'gray_01'};
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
