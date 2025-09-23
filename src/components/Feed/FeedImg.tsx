// components/feed/ImageGrid.tsx
import styled, { css } from 'styled-components';

export default function FeedImg() {
  const images = ['./profile', './profile', './profile', './profile'];
  const count = Math.min(images.length, 4);

  return (
    <ImgWrapper $count={count}>
      {images.map((src, i) => (
        <Img key={i} src={`${src}.jpeg`} alt={`게시물 이미지 ${i + 1}`} loading="lazy" />
      ))}
    </ImgWrapper>
  );
}

/* ===== styles ===== */

/**
 * 1장: 16:9 단일
 * 2장: 좌/우 반반
 * 3장: 좌 큰 1장 + 우 위/아래 2장
 * 4장: 2x2
 */
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
    & > :nth-child(1) {
      grid-area: a;
      aspect-ratio: 1/1;
    }
    & > :nth-child(2) {
      grid-area: b;
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
    & > :nth-child(2) {
      grid-area: b;
      aspect-ratio: 1/1;
    }
    & > :nth-child(3) {
      grid-area: c;
      aspect-ratio: 1/1;
    }
  `,
  4: css`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'a b'
      'c d';
    & > :nth-child(1) {
      grid-area: a;
      aspect-ratio: 1/1;
    }
    & > :nth-child(2) {
      grid-area: b;
      aspect-ratio: 1/1;
    }
    & > :nth-child(3) {
      grid-area: c;
      aspect-ratio: 1/1;
    }
    & > :nth-child(4) {
      grid-area: d;
      aspect-ratio: 1/1;
    }
  `,
} as const;

const ImgWrapper = styled.div<{ $count: number }>`
  max-height: 360px;
  display: grid;
  gap: 6px;
  // margin-top: 12px;
  border-radius: 12px;
  overflow: hidden;
  ${({ $count }) => layoutByCount[$count as 1 | 2 | 3 | 4]}
  @media (min-width: 1200px) {
    // width: 95%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-height: 360px;
  display: block;
  object-fit: cover;
  overflow: hidden;
  border-radius: 8px;
`;
