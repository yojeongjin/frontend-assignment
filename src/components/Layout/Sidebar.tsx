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
      <SidebarMenu aria-label="사이드바 내비게이션">
        {/* logo */}
        <Logo href="/">
          <TbBrandTwitterFilled />
        </Logo>
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
const SidebarMenu = styled.nav`
  display: grid;
  gap: 6px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  font-size: 30px;
  color: ${(props) => props.theme.primary_01};
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
  bottom: 32px;
`;
