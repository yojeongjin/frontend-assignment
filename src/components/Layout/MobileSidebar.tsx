import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import UserInfo from '../User/UserInfo';

// icons
import { TbBrandTwitterFilled } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const router = useRouter();

  useEffect(() => {
    // 외부화면 스크롤방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // sidebar 밖 클릭시 sidebar off
  const outside = useRef<HTMLDivElement | null>(null);
  const handleOutside = (e: MouseEvent) => {
    if (!outside?.current?.contains(e.target as Node)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });

  return (
    <SidebarSection $open={open} aria-label="모바일 사이드바 오버레이">
      <SidebarInner aria-label="모바일 사이드바">
        <Sidebar $open={open} ref={outside}>
          <SidebarHeader>
            <Logo>
              <TbBrandTwitterFilled />
            </Logo>
            <CloseBtn onClick={onClose} role="button">
              <MdClose />
            </CloseBtn>
          </SidebarHeader>

          <SidebarBody>
            <Menu aria-label="사이드바 내비게이션">
              <MenuItem href="/" $islink={router.pathname === '/'} onClick={onClose}>
                홈
              </MenuItem>
              <MenuItem href="/create" $islink={router.pathname === '/create'} onClick={onClose}>
                작성하기
              </MenuItem>
            </Menu>
          </SidebarBody>

          <SidebarFooter>
            <UserInfo />
          </SidebarFooter>
        </Sidebar>
      </SidebarInner>
    </SidebarSection>
  );
}

/* ===== styles ===== */

const SidebarSection = styled.div<{ $open: boolean }>`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: ${(props) => (props.$open ? 'fleax' : 'none')};
  z-index: 999;
  @media (min-width: 1000px) {
    display: none; /* 데스크톱에선 숨김 */
  }
`;

const SidebarInner = styled.div`
  position: relative;
  width: 100%;
  // max-width: 720px;
  height: calc(var(--vh, 1vh) * 100);
`;

const Sidebar = styled.aside<{ $open: boolean }>`
  position: absolute;
  right: 0;
  background-color: #fff;
  width: 240px;
  height: 100%;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid ${({ theme }) => theme.gray_03};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  color: ${(props) => props.theme.primary_01};
`;

const CloseBtn = styled.button`
  font-size: 22px;
  cursor: pointer;
`;

const SidebarBody = styled.div`
  height: calc(100% - 56px - 88px); /* header 56 + footer 88 기준 */
  overflow-y: auto;
  padding: 12px;
`;

const Menu = styled.nav`
  display: grid;
  gap: 6px;
`;

const MenuItem = styled(Link)<{ $islink: boolean }>`
  padding: 12px;
  border-radius: 10px;
  font-weight: ${(props) => (props.$islink ? 700 : 500)};
  color: ${(props) => (props.$islink ? '#0f1419' : '#536471')};
`;

const SidebarFooter = styled.footer`
  height: 88px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.gray_03};
  padding: 16px;
`;
