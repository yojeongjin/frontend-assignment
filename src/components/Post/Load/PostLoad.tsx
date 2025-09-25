import styled from 'styled-components';
// type
import { LayoutProps } from '@/type/common';

export default function PostLoad({ children }: LayoutProps) {
  return <LoadInfo>{children}</LoadInfo>;
}

/* ===== styles ===== */

const LoadInfo = styled.p`
  background-color: ${(props) => props.theme.gray_03};
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;
