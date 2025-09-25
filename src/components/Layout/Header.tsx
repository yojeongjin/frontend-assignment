import Link from 'next/link';
import styled from 'styled-components';
// icon
import { TbBrandTwitterFilled } from 'react-icons/tb';

export default function Header() {
  return (
    <Nav role="banner" aria-label="상단 내비게이션">
      {/* logo */}
      <Logo href="/">
        <TbBrandTwitterFilled />
      </Logo>
    </Nav>
  );
}

/* ===== styles ===== */

const Nav = styled.nav`
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 12px;
  // border-bottom: 1px solid ${(props) => props.theme.gray_03};
`;

const Logo = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 30px;
  color: ${(props) => props.theme.primary_01};
`;
