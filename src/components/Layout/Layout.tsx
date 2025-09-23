import Link from 'next/link';
import styled from 'styled-components';
// components
import Header from './Header';
import Sidebar from './Sidebar';
// icons
import { IoAdd } from 'react-icons/io5';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutBase>
      {/* header */}
      <HeaderBase>
        <Header />
      </HeaderBase>

      <Content>
        {/* sidebar */}
        <SidebarBase>
          <Sidebar />
        </SidebarBase>

        {/* main */}
        <Main role="main" aria-label="게시물">
          {children}
        </Main>
      </Content>

      {/* 모바일 전용 글쓰기 버튼 */}
      <FloatingButton href="/compose">
        <IoAdd />
      </FloatingButton>
    </LayoutBase>
  );
}

/* ===== styles ===== */

const CONTENTS_MAX = 1200; // 레이아웃 전체 너비
const HEADER_H = 56; // 헤더 높이
const SIDEBAR_W = 240; // 사이드바 폭
const MAIN_MIN = 280; // 메인 최소
const MAIN_MAX = 1000; // 메인 최대

const LayoutBase = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
`;

const HeaderBase = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_H}px;
  backdrop-filter: saturate(180%) blur(6px);
  z-index: 10;
`;

const Content = styled.div`
  max-width: ${CONTENTS_MAX}px;
  display: grid;
  margin: ${HEADER_H}px auto 0;
  /* 모바일: 1열 (메인 only) */
  grid-template-columns: 1fr;

  /* 데스크톱: 2열(좌: 사이드바, 우: 메인) */
  @media (min-width: 1200px) {
    grid-template-columns: ${SIDEBAR_W}px minmax(${MAIN_MIN}px, ${MAIN_MAX}px);
  }
`;

const SidebarBase = styled.aside`
  display: none;

  @media (min-width: 1200px) {
    display: block;
    position: sticky;
    top: ${HEADER_H}px;
    align-self: start;
    // height: max-content;
  }
`;

const Main = styled.main`
  height: 100%;
  border-left: 1px solid ${(props) => props.theme.gray_03};
  overflow: auto;

  @media (max-width: 1199px) {
  }
`;

const FloatingButton = styled(Link)`
  position: fixed;
  bottom: 32px;
  right: 24px;
  background: ${(props) => props.theme.primary_01};
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;

  @media (min-width: 1200px) {
    display: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;
