import { FaEllipsis, FaRegTrashCan } from "react-icons/fa6";
import { useThread } from "../../context/ThreadContext";
import Avatar from "../Avatar/Avatar";
import ThreadCustomize from "../ThreadCustomize/ThreadCustomize";
import ThreadMembers from "../ThreadMembers/ThreadMembers";

type IThreadAdditionalData = {
  changeShowingThreadData: () => void;
};

export default function ThreadAdditionalData({
  changeShowingThreadData,
}: IThreadAdditionalData) {
  const { thread } = useThread();

  return (
    <div className="md:min-w-48 lg:min-w-80 md:max-w-48 lg:max-w-80 min-h-[100dvh] items-center flex border-l border-solid border-white p-4 relative flex-col gap-4 justify-between w-full max-w-full">
      <div className="w-full flex flex-col gap-4 justify-between items-center">
        <Avatar alt={thread?.name ?? ""} size="2xl" />
        {thread?.name}
        <div
          className={`absolute right-2 cursor-pointer p-1 
              bg-blue-500 color-white rounded-full block md:hidden`}
          onClick={() => changeShowingThreadData()}
        >
          <FaEllipsis />
        </div>

        <div className="w-full flex-col gap-4">
          <ThreadCustomize />
          <ThreadMembers />
        </div>
      </div>

      <div className="text-red-500 w-full ">
        <button className="hover:bg-white hover:bg-opacity-10 rounded-xl p-2 flex items-center justify-center w-full gap-2">
          Delete thread [IN TODO] <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
}
