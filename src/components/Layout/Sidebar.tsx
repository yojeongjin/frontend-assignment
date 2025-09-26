import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// icon
import { TbBrandTwitterFilled } from 'react-icons/tb';
import UserInfo from '../User/UserInfo';

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarBase>
      {/* logo */}
      <Logo>
        <TbBrandTwitterFilled />
      </Logo>
      <SidebarMenu aria-label="사이드바 내비게이션">
        {/* nav */}
        <SidebarItem href="/" $islink={router.pathname === '/'}>
          홈
        </SidebarItem>
        <SidebarItem href="/create" $islink={router.pathname === '/create'}>
          작성하기
        </SidebarItem>
      </SidebarMenu>

      <SideFooter>
        <UserInfo />
      </SideFooter>
    </SidebarBase>
  );
}

const SidebarBase = styled.div`
  position: relative;
  height: 100%;
  padding: 0 16px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  font-size: 26px;
  color: ${(props) => props.theme.primary_01};
`;
const SidebarMenu = styled.nav`
  display: grid;
  gap: 6px;
`;

const SidebarItem = styled(Link)<{ $islink: boolean }>`
  padding: 10px 12px;
  font-weight: ${(props) => (props.$islink ? 700 : 400)};
  color: ${(props) => (props.$islink ? '#0f1419' : '#536471')};

  &:hover {
    font-weight: 700;
  }
`;

const SideFooter = styled.footer`
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.gray_03};
`;
