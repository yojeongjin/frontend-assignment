import styled from 'styled-components';
// icons
import { MdVerified } from 'react-icons/md';
import { TbBrandTwitterFilled } from 'react-icons/tb';
// type
import { PostResType } from '@/type/post';
// utils
import { timeAgo } from '@/utils/time';

type PostHeaderProps = Pick<PostResType, 'author' | 'categoryName' | 'createdAt'>;

export default function PostHeader({ author, categoryName, createdAt }: PostHeaderProps) {
  return (
    <ContentHeader>
      <UserWrapper>
        <UserProfile src={author.profileImage} alt="사용자 이미지" />
        <UserInfo>
          <UserName>
            {author.name}
            {author.verified && (
              <UserBadge aria-label="인증된 계정">
                <MdVerified />
              </UserBadge>
            )}
          </UserName>
          <UserId aria-label="사용자 아이디">@{author.nickname}</UserId>
        </UserInfo>
      </UserWrapper>

      <ContentInfo>
        <ContentCategory>
          <TbBrandTwitterFilled aria-hidden="true" />
          {categoryName}
        </ContentCategory>
        <ContentTime>{timeAgo(createdAt)}</ContentTime>
      </ContentInfo>
    </ContentHeader>
  );
}

/* ===== styles ===== */

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const UserProfile = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div``;

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
  // font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.gray_02};
`;

const ContentInfo = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const ContentCategory = styled(UserName)`
  color: ${(props) => props.theme.primary_01};
`;

const ContentTime = styled(UserId)``;
