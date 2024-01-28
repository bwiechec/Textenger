import { NavLink } from "react-router-dom";
import useThreadData from "../../hooks/useThreadData";
import { LoaderOverlay } from "../Loader/Loader";
import Avatar from "../Avatar/Avatar";
import { useUser } from "../../context/UserContext";
type IThreadCard = {
  threadId: number | string;
};

export default function ThreadCard({ threadId }: IThreadCard) {
  const { user } = useUser();
  const { status, threadData } = useThreadData(
    threadId,
    user?.id ?? 0,
    user?.lastChangeTimestamp
  );

  return (
    <NavLink
      to={`?t=${threadId}`}
      className="border border-solid border-white w-full p-4 rounded-xl flex gap-6 items-center relative hover:bg-opacity-10 hover:bg-white"
    >
      <LoaderOverlay status={status} />
      <Avatar alt={threadData?.name ?? ""} />
      <span className="text-xl md:block hidden sm:hidden">
        {threadData?.name}
      </span>
    </NavLink>
  );
}
