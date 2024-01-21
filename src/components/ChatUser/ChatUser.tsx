import { IUser } from "../../lib/api/user/user.interface";
import Avatar from "../Avatar/Avatar";
import { NavLink } from "react-router-dom";

type IChatUser = {
  user: IUser;
  onClick?: (user: IUser) => void;
};

export default function ChatUser({ user, onClick }: IChatUser) {
  if (!onClick)
    return (
      <NavLink
        to={`?t=${user.id}`}
        className="border border-solid border-white w-full p-4 rounded-xl flex gap-6 items-center  hover:bg-opacity-10 hover:bg-white"
      >
        <Avatar alt={user.name} />
        <span className="text-xl hidden sm:hidden md:hidden">{user.name}</span>
      </NavLink>
    );

  return (
    <div
      onClick={() => onClick(user)}
      className="border border-solid border-white w-full p-4 rounded-xl flex gap-6 items-center cursor-pointer hover:bg-opacity-10 hover:bg-white"
    >
      <Avatar alt={user.name} />
      <span className="text-xl">{user.name}</span>
    </div>
  );
}
