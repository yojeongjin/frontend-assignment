import { useContext } from 'react';
import AppStateContext from '@/AppStateContext';

export default function useUser() {
  const { user } = useContext(AppStateContext);

  return user;
}
