export interface LayoutProps {
  children: React.ReactNode;
}

export interface UserType {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
  verified: boolean;
}

export interface CategoryType {
  id: number | null;
  name: string;
}
