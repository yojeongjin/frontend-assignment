import { useContext } from 'react';
import AppStateContext from '@/AppStateContext';
import { PostResType } from '@/type/post';

/**
 * usePrototypes
 *
 * @description
 * AppStateContext에서 게시물 목록과 setter를 반환하는 커스텀 훅.
 * - 전역 posts(prototypes) 상태를 읽고/업데이트할 때 사용
 *
 * @returns
 * - prototypes: 게시물 배열
 * - setPrototypes: 게시물 배열 setter
 */
export default function usePrototypes(): {
  prototypes: PostResType[];
  setPrototypes: React.Dispatch<React.SetStateAction<PostResType[]>>;
} {
  const { prototypes, setPrototypes } = useContext(AppStateContext);

  return { prototypes, setPrototypes };
}
