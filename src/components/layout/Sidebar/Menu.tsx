import MenuItem from "./MenuItem";
import {
  HomeIcon,
  HomeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  ProfileIcon,
} from "~/components/icons";

interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
  description: string;
  totalLikes: number;
  following: string[];
  followers: string[];
  interestedIn: string[];
  verified: boolean;
  notifications: Notification[];
  createdAt: string;
}

interface MenuProps {
  user: User;
}

export default function Menu({ user }: MenuProps) {
  return (
    <nav className="mb-2">
      <MenuItem
        to={"/"}
        title="Trang chủ"
        icon={<HomeIcon />}
        activeIcon={<HomeActiveIcon />}
      />
      <MenuItem
        to={"/explore"}
        title="Khám phá"
        icon={<ExploreIcon />}
        activeIcon={<ExploreActiveIcon />}
      />
      <MenuItem
        to={user ? `/@${user.username}` : undefined}
        // onClick={!user ? openLoginModal : undefined}
        title="Hồ sơ"
        icon={<ProfileIcon width="32px" height="32px" className="p-1" />}
        avt={
          user ? (
            <img
              className="w-8 h-8 rounded-full object-cover p-1"
              src={user.profilePhoto}
              alt="avatar"
            />
          ) : undefined
        }
      />
    </nav>
  );
}
