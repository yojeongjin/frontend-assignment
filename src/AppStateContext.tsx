import { createContext, SetStateAction, useState } from 'react';
// datas
import { mockPosts } from './datas/mockPost';
import { user } from './datas/mockUser';
// type
import { PostResType } from './type/post';
import { UserType } from './type/common';

type AppState = {
  user: UserType;
  prototypes: PostResType[];
  setPrototypes: React.Dispatch<SetStateAction<PostResType[]>>;
};

const AppStateContext = createContext<AppState>({
  user: {
    id: '',
    name: '',
    nickname: '',
    profileImage: '',
    verified: false,
  },
  prototypes: [],
  setPrototypes: () => {
    throw new Error('AppStateContext not provided');
  },
});

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [prototypes, setPrototypes] = useState<PostResType[]>(mockPosts);
  const value = { user, prototypes, setPrototypes };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export default AppStateContext;
