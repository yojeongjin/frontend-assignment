import Link from 'next/link';
import styled from 'styled-components';
// icon
import { TbBrandTwitterFilled } from 'react-icons/tb';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <HeaderBase>
      <Nav role="banner" aria-label="상단 내비게이션">
        {/* logo */}
        <Logo href="/" aria-label="홈으로 이동">
          <TbBrandTwitterFilled />
        </Logo>
      </Nav>

      <HeaderMenu type="button" aria-label="사이드바 열기" onClick={onMenuClick}>
        <HiOutlineMenuAlt3 />
      </HeaderMenu>
    </HeaderBase>
  );
}

/* ===== styles ===== */

const HeaderBase = styled.div`
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Nav = styled.nav`
  height: 100%;
  // border-bottom: 1px solid ${(props) => props.theme.gray_03};
`;

const Logo = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 28px;
  color: ${(props) => props.theme.primary_01};
`;

const HeaderMenu = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 24px;
  cursor: pointer;
`;
