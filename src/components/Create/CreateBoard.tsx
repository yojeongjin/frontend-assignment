import { Dispatch, SetStateAction, useMemo } from 'react';
import styled from 'styled-components';
// type
import { PostReqType } from '@/type/post';

type CreateBoardProps = {
  maxLen: number;
  content: PostReqType['content'];
  setContent: Dispatch<SetStateAction<string>>;
};

export default function CreateBoard({ maxLen, content, setContent }: CreateBoardProps) {
  const { remaining, isOverLimit } = useMemo(() => {
    const length = content?.length ?? 0;
    const remain = maxLen - length;
    return {
      remaining: remain,
      isOverLimit: remain < 0,
    };
  }, [content, maxLen]);

  return (
    <BoardBase>
      <Label htmlFor="content">내용</Label>
      <BoardWrapper>
        <ContentBoard
          id="content"
          placeholder="무슨 일이 일어나고 있나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={maxLen + 1}
          aria-describedby="content-counter"
          $warn={isOverLimit}
        />
        <Counter id="content-counter" $warn={isOverLimit}>
          {isOverLimit ? 0 : remaining} / {maxLen}
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

const ContentBoard = styled.textarea<{ $warn?: boolean }>`
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  font-size: 15px;
  resize: none;
  &:focus {
    border-color: ${(props) => (props.$warn ? '#e0245e' : '#8cbcff')};
  }
`;

const Counter = styled.div<{ $warn?: boolean }>`
  padding-right: 12px;
  text-align: right;
  font-size: 12px;
  color: ${(props) => (props.$warn ? '#e0245e' : '#888')};
`;
