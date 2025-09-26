import styled from 'styled-components';

export default function CommentAction() {
  return (
    <CommentBar>
      <CommentInput placeholder="댓글달기" />
      <SubmitBtn>입력</SubmitBtn>
    </CommentBar>
  );
}

/* ===== styles ===== */

const CommentBar = styled.div`
  background-color: #fff;
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.gray_03};
  z-index: 5;
`;

const CommentInput = styled.input`
  border: 1px solid #e6e6e6;
  width: calc(100% - 70px);
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  font-size: 15px;
`;

const SubmitBtn = styled.button`
  background-color: ${(props) => props.theme.primary_01};
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  color: #fff;
  font-weight: 700;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
