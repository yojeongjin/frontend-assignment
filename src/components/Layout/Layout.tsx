import Link from 'next/link';
import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';
// components
import Header from './Header';
import Sidebar from './Sidebar';
// icon
import { IoAdd } from 'react-icons/io5';

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutBase>
      {/* 모바일 전용 header */}
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
      <FloatingButton href="/create">
        <IoAdd />
      </FloatingButton>
    </LayoutBase>
  );
}

/* ===== styles ===== */

const CONTENTS_MAX = 1300; // 레이아웃 전체 너비
const SIDEBAR_W = 245; // 사이드바 너비
const MAIN_MIN = 280; // 메인 최소
const MAIN_MAX = 1100; // 메인 최대
const GUTTER = 16; // 열 간격

const HEADER_H = 56; // 모바일 상단 헤더 높이

const LayoutBase = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
`;

const HeaderBase = styled.header`
  background-color: #fff;
  position: fixed;
  inset: 0 0 auto 0; /* top:0; left:0; right:0; */
  height: ${HEADER_H}px;
  z-index: 10;

  /* 데스크톱 */
  @media (min-width: 1000px) {
    display: none;
  }
`;

const Content = styled.div`
  max-width: ${CONTENTS_MAX}px;
  display: grid;
  grid-template-columns: 1fr;
  margin: ${HEADER_H}px auto 0;

  /* 데스크톱 (2열) */
  @media (min-width: 1000px) {
    grid-template-columns: ${SIDEBAR_W}px minmax(${MAIN_MIN}px, ${MAIN_MAX}px);
    align-items: start;
    margin: 0 auto;
    padding: 0 16px;
  }
`;

const SidebarBase = styled.aside`
  display: none;

  @media (min-width: 1000px) {
    display: block;
    position: sticky;
    top: 0;
    height: calc(var(--vh, 1vh) * 100);
    padding-top: ${GUTTER}px;
  }
`;

const Main = styled.main`
  min-height: calc(var(--vh, 1vh) * 100);
  border-left: 1px solid ${({ theme }) => theme.gray_03};

  @media (max-width: 999px) {
    border: none;
  }
`;

const FloatingButton = styled(Link)`
  position: fixed;
  bottom: 42px;
  right: 24px;
  background: ${({ theme }) => theme.primary_01};
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 28px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  z-index: 120;

  @media (min-width: 1000px) {
    display: none;
  }

  &:hover {
    opacity: 0.92;
  }
`;
