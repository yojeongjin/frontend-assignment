import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';

interface PostArticle extends LayoutProps {
  onClick: () => void;
}

export default function PostArticle({ children, onClick }: PostArticle) {
  return (
    <Article role="article" onClick={onClick}>
      {children}
    </Article>
  );
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
