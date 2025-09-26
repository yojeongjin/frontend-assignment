import { LayoutProps } from '@/type/common';
import { useState, useEffect } from 'react';
// components
import PostLoad from '../Post/Load/PostLoad';
// spinner
import BeatLoader from 'react-spinners/BeatLoader';

interface PtRProps extends LayoutProps {
  elRef: React.RefObject<HTMLDivElement | null>;
  loadPostFn: () => void;
}

export default function PullToRefresh({ children, elRef, loadPostFn }: PtRProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      if (elRef.current!.scrollTop <= 0) {
        setStartY(e.touches[0].clientY);
      } else {
        setStartY(null);
      }
    }
    function handleTouchMove(e: TouchEvent) {
      if (startY === null) return;

      const moveY = e.touches[0].clientY;
      const pullDistance = moveY - startY; // 총 터치한 길이

      if (pullDistance > 0) {
        e.preventDefault();

        if (pullDistance > 80) {
          // 이 거리 이상 당길 때 새로고침
          elRef.current!.style.transform = 'translate(0, 40px)';
          elRef.current!.style.transition = '0.3s';
          setRefreshing(true);
        }
      }
    }
    function handleTouchEnd() {
      if (refreshing) {
        loadPostFn();

        setTimeout(() => {
          if (!elRef) return;

          setRefreshing(false);
          elRef.current!.style.transform = 'translate(0,0)';
        }, 1000);
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elRef, loadPostFn, startY, refreshing]);

  return (
    <>
      {refreshing && (
        <PostLoad>
          <BeatLoader size={8} color={'#1D9BF0'} />
        </PostLoad>
      )}
      {children}
    </>
  );
}
