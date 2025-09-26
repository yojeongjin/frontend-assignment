import { useContext } from 'react';
import AppStateContext from '@/AppStateContext';

export default function usePrototypes() {
  const { prototypes, setPrototypes } = useContext(AppStateContext);

  return { prototypes, setPrototypes };
}
