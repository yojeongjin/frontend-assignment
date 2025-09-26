import { useContext } from 'react';
import AppStateContext from '@/AppStateContext';
import { UserType } from '@/type/common';

/**
 * useUser
 *
 * @description
 * AppStateContext에서 현재 로그인 사용자 정보를 반환하는 커스텀 훅.
 * - 프로필/작성자 정보가 필요한 컴포넌트에서 사용
 *
 * @returns
 * - user: 현재 사용자 객체
 */
export default function useUser(): UserType {
  const { user } = useContext(AppStateContext);

  return user;
}
