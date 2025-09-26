import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
// type
import { PostReqType } from '@/type/post';

type CreateBoardProps = {
  content: PostReqType['content'];
  setContent: Dispatch<SetStateAction<string>>;
};

export default function CreateBoard({ content, setContent }: CreateBoardProps) {
  const MAX_LEN = 280;
  const remaining = MAX_LEN - content.length;
  const isOverLimit = remaining < 0;

  return (
    <BoardBase>
      <Label htmlFor="content">내용</Label>
      <BoardWrapper>
        <ContentBoard
          id="content"
          placeholder="무슨 일이 일어나고 있나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
          aria-describedby="content-counter"
        />
        <Counter id="content-counter" $warn={isOverLimit}>
          {isOverLimit ? 0 : remaining} / {MAX_LEN}
        </Counter>
      </BoardWrapper>
    </BoardBase>
  );
}

/* ===== styles ===== */

const BoardBase = styled.div`
  display: grid;
  gap: 16px;
  padding: 0 16px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

const BoardWrapper = styled.div`
  display: grid;
  gap: 6px;
`;

const ContentBoard = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  font-size: 15px;
  resize: none;
  &:focus {
    border-color: #8cbcff;
  }
`;

const Counter = styled.div<{ $warn?: boolean }>`
  padding-right: 12px;
  text-align: right;
  font-size: 12px;
  color: ${(props) => (props.$warn ? '#e0245e' : '#888')};
`;
