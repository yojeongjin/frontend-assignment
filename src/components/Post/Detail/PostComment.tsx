import { PostResType } from '@/type/post';
import styled from 'styled-components';
// utils
import { timeAgo } from '@/utils/time';
// icons
import { MdVerified } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';

type PostCommentProps = Pick<PostResType, 'commentList'>;

export default function PostComment({ commentList }: PostCommentProps) {
  return (
    <CommentBase>
      {commentList!.length > 0 ? (
        <CommentMenu>
          {commentList?.map((comment, id) => (
            <CommentItem key={id}>
              <UserProfile src={comment.author.profileImage} alt="사용자 이미지" />
              <CommentBody>
                <CommentHeader>
                  <UserInfo>
                    <UserName>
                      {comment.author.name}
                      {comment.author.verified && (
                        <UserBadge aria-label="인증된 계정">
                          <MdVerified />
                        </UserBadge>
                      )}
                    </UserName>
                    <UserId aria-label="사용자 아이디">@{comment.author.nickname}</UserId>
                  </UserInfo>
                  {comment.isLiked ? (
                    <LikeButton>
                      <LikedIcon />
                    </LikeButton>
                  ) : (
                    <LikeButton>
                      <LikeIcon />
                    </LikeButton>
                  )}
                </CommentHeader>
                <CommentText>{comment.content}</CommentText>
                <CommentSubMenu>
                  <CommentSubItem>{timeAgo(comment.createdAt)}</CommentSubItem>
                  <CommentSubItem>좋아요 {comment.likes}개</CommentSubItem>
                </CommentSubMenu>
              </CommentBody>
            </CommentItem>
          ))}
        </CommentMenu>
      ) : (
        <NoneCommentWrapper>
          <NoneComment>아직 댓글이 없어요</NoneComment>
          <NoneCommentAlert>첫번째 댓글을 남겨보세요</NoneCommentAlert>
        </NoneCommentWrapper>
      )}
    </CommentBase>
  );
}

/* ===== styles ===== */

const CommentBase = styled.div`
  border-top: 6px solid ${(props) => props.theme.gray_03};
  padding: 0 16px;
`;

const CommentMenu = styled.ul``;

const CommentItem = styled.li`
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px dashed ${(props) => props.theme.gray_03};
  &:last-child {
    border: none;
  }
`;

const UserProfile = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 6px;
`;

const UserName = styled.h4`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
`;

const UserBadge = styled.strong`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${(props) => props.theme.primary_01};
`;

const UserId = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.gray_02};
`;

const LikeButton = styled.button`
  font-size: 14px;
`;

const LikeIcon = styled(FaRegHeart)`
  color: ${(props) => props.theme.gray_02};
`;

const LikedIcon = styled(FaHeart)`
  color: ${(props) => props.theme.like};
`;

const CommentText = styled.p`
  font-size: 14px;
  white-space: pre-wrap;
  word-break: keep-all;
`;

const CommentSubMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${(props) => props.theme.gray_02};
`;

const CommentSubItem = styled.li`
  position: relative;
  &:after {
    position: absolute;
    content: '';
    background-color: ${(props) => props.theme.gray_02};
    width: 2px;
    height: 2px;
    top: 9px;
    right: -5px;
    border-radius: 50%;
  }
  &:last-child {
    &:after {
      display: none;
    }
  }
`;

const NoneCommentWrapper = styled.div`
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const NoneComment = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const NoneCommentAlert = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.gray_02};
`;
