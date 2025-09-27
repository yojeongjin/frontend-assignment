import Link from 'next/link';
import styled from 'styled-components';
// type
import { PostResType } from '@/type/post';

type PostContentProps = Pick<PostResType, 'content'>;

export default function PostContent({ content }: PostContentProps) {
  // 해시태그 or URL 구분
  const pattern = /(#[^\s#]+)|(https?:\/\/[^\s]+)/g;

  return (
    <ContentBase>
      {content.split(pattern).map((text, i) => {
        if (!text) return null;

        // 해시태그
        if (text.match(/^#[^\s#]+$/)) {
          return <HashTag key={i}>{text}</HashTag>;
        }

        // URL
        if (text.match(/^https?:\/\/[^\s]+$/)) {
          return (
            <URL key={i} href={text} target="_blank" rel="noopener noreferrer">
              {text}
            </URL>
          );
        }

        // 일반 텍스트
        return <Content key={i}>{text}</Content>;
      })}
    </ContentBase>
  );
}

/* ===== styles ===== */

const ContentBase = styled.p`
  white-space: pre-wrap;
  word-break: break-word;
`;

const Content = styled.span``;

const HashTag = styled.span`
  color: ${(props) => props.theme.primary_01};
  font-weight: 500;
`;

const URL = styled(Link)`
  color: ${(props) => props.theme.primary_01};
  font-weight: 500;
`;
