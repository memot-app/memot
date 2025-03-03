// Post情報と関連データの型
export interface Post {
  id: number;
  user_id: string;
  title: string;
  content: string;
  path: string;
  created_at: string;
  timeAgo: string;
  icon_number: number;
}

export interface Account {
  id: string;
  display_name: string;
  user_name: string;
  profile_picture: number;
  post_count: number;
  bio: string;
  followCount?: number;
  followerCount?: number;
}

export interface Like {
  id: number;
  user_id: string;
  monologue_id: number;
  created_at: string;
}

export interface Follow {
  id: number;
  follow: string;
  follower: string;
  created_at: string;
  user_id: string;
  display_name: string;
  user_name: string;
  icon_number: number;
}

export interface Group {
  group_id: string;
  created_at: string;
  updated_at: string;
  group_name: string;
  show_my_post: boolean;
  host_user_id: string;
}

export interface GroupData {
  group_id: Group;
  members: string[];
}

export interface FilteredCardListProps {
  posts: Post[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  refreshRef: React.MutableRefObject<() => Promise<void>>;
  handleLoadMore: () => void;
  onOpenStateChange?: (isOpen: boolean) => void;
}
