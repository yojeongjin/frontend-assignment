import styled, { keyframes, css } from 'styled-components';

export const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const skeletonStyle = css`
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 25%,
    rgba(0, 0, 0, 0.12) 37%,
    rgba(0, 0, 0, 0.06) 63%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 8px;

  /* 모션 최소화 환경 배려 */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SkeletonLine = styled.div<{ $h?: number; $w?: string }>`
  ${skeletonStyle};
  height: ${({ $h }) => ($h ? `${$h}px` : '14px')};
  width: ${({ $w }) => $w || '100%'};
`;

export const SkeletonCircle = styled.div<{ $size?: number }>`
  ${skeletonStyle};
  width: ${({ $size }) => ($size ? `${$size}px` : '44px')};
  height: ${({ $size }) => ($size ? `${$size}px` : '44px')};
  border-radius: 50%;
`;
