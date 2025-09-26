import { forwardRef } from 'react';
import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';

const PostScroll = forwardRef<HTMLDivElement, LayoutProps>(({ children }, ref) => {
  return <ScrollBase ref={ref}>{children}</ScrollBase>;
});

export default PostScroll;

/* ===== styles ===== */
const ScrollBase = styled.div`
  @media (max-width: 999px) {
    height: calc(var(--vh, 1vh) * 100 - 145px);
    overflow: auto;
    overscroll-behavior: contain;
  }
`;
