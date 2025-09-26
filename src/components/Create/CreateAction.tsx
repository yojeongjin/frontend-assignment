import styled from 'styled-components';

interface CreateActionProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export default function CreateAction({ onCancel, onSubmit }: CreateActionProps) {
  return (
    <ActionBar>
      <ActionAlert>* 이미지 최대 4장, 텍스트 280자</ActionAlert>
      <ButtonWrapper>
        <CancelBtn onClick={onCancel}>취소</CancelBtn>
        <SubmitBtn onClick={onSubmit}>작성하기</SubmitBtn>
      </ButtonWrapper>
    </ActionBar>
  );
}

/* ===== styles ===== */

const ActionBar = styled.div`
  background-color: #fff;
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  z-index: 5;
`;

const ActionAlert = styled.div`
  font-size: 12px;
  color: #666;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ButtonBase = styled.button`
  background-color: #fafafa;
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
`;

const CancelBtn = styled(ButtonBase)`
  @media (min-width: 1000px) {
    display: none;
  }
`;

const SubmitBtn = styled(ButtonBase)`
  background-color: #111;
  color: #fff;
  border-color: #111;
  font-weight: 700;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
