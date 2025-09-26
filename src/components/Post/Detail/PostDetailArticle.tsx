import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';

export default function PostDetailArticle({ children }: LayoutProps) {
  return <Article role="article">{children}</Article>;
}

/* ===== styles ===== */

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;
