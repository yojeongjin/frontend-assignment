import styled from 'styled-components';
import { LayoutProps } from '@/type/common';
import { forwardRef } from 'react';

const PostScroll = forwardRef<HTMLDivElement, LayoutProps>(({ children }, ref) => {
  return <ScrollBase ref={ref}>{children}</ScrollBase>;
});

export default PostScroll;

/* ===== styles ===== */
const ScrollBase = styled.div`
  max-height: calc(var(--vh, 1vh) * 100 - 112px);
  border: 1px solid black;
  overflow: auto;
  overscroll-behavior: contain;
  will-change: transform;
`;
