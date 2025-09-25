import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';

export default function PostArticle({ children }: LayoutProps) {
  return <Article role="article">{children}</Article>;
}

/* ===== styles ===== */

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.gray_03};
  &:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
`;
