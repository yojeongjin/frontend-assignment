import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';

export default function CreateSection({ children }: LayoutProps) {
  return (
    <FormArea>
      <Title>게시글 작성</Title>
      {children}
    </FormArea>
  );
}

/* ===== styles ===== */

const FormArea = styled.section`
  display: grid;
  gap: 16px;
`;

const Title = styled.h1`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${(props) => props.theme.gray_03};
  font-size: 18px;
  font-weight: 700;
`;
