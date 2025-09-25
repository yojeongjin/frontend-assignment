import styled from 'styled-components';

// type
import { PostResType } from '@/type/post';

type PostContentProps = Pick<PostResType, 'content'>;

export default function PostContent({ content }: PostContentProps) {
  return (
    <ContentBase>
      {content.split(/(#[^\s#]+)/g).map((text) => {
        //split에서는 ()를 써야함
        if (text.match(/(#[^\s#]+)/)) {
          return <HashTag>{text}</HashTag>;
        }
        return text;
      })}
    </ContentBase>
  );
}

/* ===== styles ===== */

const ContentBase = styled.div``;

const Content = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
`;

const HashTag = styled.span`
  color: ${(props) => props.theme.primary_01};
  font-weight: 500;
`;
