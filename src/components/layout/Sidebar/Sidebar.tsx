import Menu from "./Menu";
import Button from "~/components/ui/Button";
// import { UserContext } from "~/contexts";

export default function Sidebar() {
  //   const { user } = useContext(UserContext);
  const user = {
    _id: "1",
    username: "_khoanene",
    name: "Nguyễn Khoa",
    email: "khoa@gmail.com",
    password: "khoa23082003",
    profilePhoto:
      "https://res.cloudinary.com/dezywk7nm/image/upload/v1732089659/pdbrffjlqjgln94dknoj.jpg",
    description: "Yo, I'm Khoa",
    totalLikes: 0,
    following: ["2", "4", "5"],
    followers: ["2", "3"],
    interestedIn: ["music", "tech"],
    verified: false,
    notifications: [],
    createdAt: "2024-11-01T00:00:00Z",
  };
  // const user = null;

  return (
    <aside className="w-[240px] h-screen fixed overflow-y-auto pt-5 pb-[26px] pl-2">
      <Menu user={user}></Menu>
      {!user && (
        <div
          className="relative px-2 py-4 leading-[18px] before:content-[''] before:absolute before:left-2 before:right-2 before:top-0 before:h-px before:bg-[rgba(22,24,35,0.12)] before:scale-y-50
"
        >
          <Button
            primary
            large
            className={"w-full"}
            // onClick={onOpenLoginModal}
          >
            Log in
          </Button>
        </div>
      )}
      {/* <div>
        <div>
          <h4>Company</h4>
          <h4>Program</h4>
          <h4>Terms &amp; Policies</h4>
          <span>© 2024 TikTok</span>
        </div>
      </div> */}
    </aside>
  );
}
