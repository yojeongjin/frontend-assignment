import styled, { css } from 'styled-components';
import PostArticle from '@/components/Post/PostArticle';
import { SkeletonCircle, SkeletonLine } from '@/components/Common/Skeleton';

type Props = {
  imageCount?: 0 | 1 | 2 | 3 | 4; // 이미지 영역 스켈레톤 갯수
};

export default function PostSkeleton({ imageCount = 0 }: Props) {
  const count = Math.min(imageCount, 4);

  return (
    <PostArticle>
      {/* 접근성: 현재 로딩 중 안내 */}
      <ArticleStatus role="status" aria-live="polite" aria-busy="true">
        <PostHeader>
          <User>
            <SkeletonCircle />
            <UserInfo>
              <SkeletonLine $h={16} $w="120px" />
              <SkeletonLine $h={12} $w="80px" />
            </UserInfo>
          </User>
          <ContentInfo>
            <SkeletonLine $h={12} $w="52px" />
            <SkeletonLine $h={12} $w="68px" />
          </ContentInfo>
        </PostHeader>

        <Body>
          <SkeletonLine $h={14} $w="90%" />
          <SkeletonLine $h={14} $w="70%" />
          <SkeletonLine $h={14} $w="55%" />
        </Body>

        {count > 0 && (
          <ImgGrid $count={count}>
            {Array.from({ length: count }).map((_, i) => (
              <ImgBlock key={i} />
            ))}
          </ImgGrid>
        )}

        <Actions>
          <SkeletonLine $h={16} $w="60px" />
          <SkeletonLine $h={16} $w="80px" />
          <SkeletonLine $h={16} $w="80px" />
        </Actions>
      </ArticleStatus>
    </PostArticle>
  );
}

/* ===== styles ===== */

const ArticleStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const UserInfo = styled.div`
  display: grid;
  gap: 6px;
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
`;

const Body = styled.div`
  display: grid;
  gap: 8px;
`;

const layoutByCount = {
  1: css`
    grid-template-columns: 1fr;
    grid-template-areas: 'a';
    & > :nth-child(1) {
      grid-area: a;
      aspect-ratio: 16/9;
    }
  `,
  2: css`
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'a b';
    & > :nth-child(1),
    & > :nth-child(2) {
      aspect-ratio: 1/1;
    }
  `,
  3: css`
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'a b'
      'a c';
    & > :nth-child(1) {
      grid-area: a;
      min-height: 260px;
    }
    & > :nth-child(2),
    & > :nth-child(3) {
      aspect-ratio: 1/1;
    }
  `,
  4: css`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'a b'
      'c d';
    & > :nth-child(1),
    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4) {
      aspect-ratio: 1/1;
    }
  `,
} as const;

const ImgGrid = styled.div<{ $count: number }>`
  display: grid;
  gap: 6px;
  border-radius: 12px;
  ${({ $count }) => layoutByCount[$count as 1 | 2 | 3 | 4]}
`;

const ImgBlock = styled.div`
  /* 이미지 스켈레톤 */
  border-radius: 8px;
  /* 공통 shimmer */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 25%,
    rgba(0, 0, 0, 0.12) 37%,
    rgba(0, 0, 0, 0.06) 63%
  );
  background-size: 200px 100%;
  animation: shimmer 1.2s ease-in-out infinite;
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
