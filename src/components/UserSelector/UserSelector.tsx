import { IUser } from "../../lib/api/user/user.interface";
import ChatUser from "../ChatUser/ChatUser";
import { LoaderOverlay } from "../Loader/Loader";
import { useUser } from "../../context/UserContext";
import useUserData from "../../hooks/useUserData";

export default function UserSelector() {
  const { setUser } = useUser();
  const { status, userList } = useUserData();

  console.log(userList);

  const onClick = (user: IUser) => {
    setUser(user);
  };

  return (
    <div className="w-screen h-screen justify-center flex items-center mx-auto">
      <div className="flex items-center  flex-col w-64 gap-4">
        <LoaderOverlay status={status} />
        <span className="text-xl mb-4">Select your account!</span>
        {userList &&
          userList.map((user) => {
            return <ChatUser user={user} key={user.name} onClick={onClick} />;
          })}
      </div>
    </div>
  );
}
