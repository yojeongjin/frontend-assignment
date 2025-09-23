import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarMenu aria-label="사이드바 내비게이션">
      <SidebarItem href="/" $islink={router.pathname === '/'}>
        홈
      </SidebarItem>
      <SidebarItem href="/compose" $islink={router.pathname === '/create'}>
        작성하기
      </SidebarItem>
      <SidebarItem href="/profile" $islink={router.pathname === '/profile'}>
        마이페이지
      </SidebarItem>
    </SidebarMenu>
  );
}

const SidebarMenu = styled.nav`
  display: grid;
  gap: 6px;
  padding: 0 16px;
`;

const SidebarItem = styled(Link)<{ $islink: boolean }>`
  padding: 10px 12px;
  font-weight: ${(props) => (props.$islink ? 700 : 400)};
  color: ${(props) => (props.$islink ? '#0f1419' : '#536471')};
  font-size: 15px;
  &:first-child {
    margin-top: 24px;
  }

  &:hover {
    font-weight: 700;
  }
`;
