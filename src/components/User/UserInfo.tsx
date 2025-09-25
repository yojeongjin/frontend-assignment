import styled from 'styled-components';
// datas
import { currentUser } from '@/datas/mockUser';
// icons
import { MdVerified } from 'react-icons/md';

export default function UserInfo() {
  return (
    <UserWrapper>
      <UserProfileImg src={currentUser.profileImage} alt="사용자 이미지" />
      <UserInfoWrapper>
        <UserName>
          {currentUser.name}
          {currentUser.verified && (
            <UserBadge aria-label="인증된 계정">
              <MdVerified />
            </UserBadge>
          )}
        </UserName>
        <UserId aria-label="사용자 아이디">@{currentUser.nickname}</UserId>
      </UserInfoWrapper>
    </UserWrapper>
  );
}

/* ===== styles ===== */

const UserWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const UserProfileImg = styled.img`
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfoWrapper = styled.div``;

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
  font-size: 14px;
  color: ${(props) => props.theme.gray_02};
`;
