import { FaEllipsis, FaRegTrashCan } from "react-icons/fa6";
import { useThread } from "../../context/ThreadContext";
import Avatar from "../Avatar/Avatar";
import ThreadCustomize from "../ThreadCustomize/ThreadCustomize";
import ThreadMembers from "../ThreadMembers/ThreadMembers";
import { apiDeleteThread } from "../../lib/api/thread/thread.endpoint";
import { apiDeleteUserThread } from "../../lib/api/user/user.endpoint";
import { useUser } from "../../context/UserContext";

type IThreadAdditionalData = {
  changeShowingThreadData: () => void;
};

export default function ThreadAdditionalData({
  changeShowingThreadData,
}: IThreadAdditionalData) {
  const { thread } = useThread();
  const { user, setUser } = useUser();

  const deleteThread = () => {
    apiDeleteThread(thread?.id ?? 0).then(() => {
      thread?.members?.map((member) => {
        apiDeleteUserThread(Object.keys(member)[0], thread?.id ?? 0).then(
          () => {
            const threads = user?.threads?.filter(
              (userThread) => Object.keys(userThread)[0] !== thread.id
            );
            if (Object.keys(member)[0] === user?.id) {
              user &&
                setUser({
                  id: user.id ?? 0,
                  name: user.name,
                  threads: threads,
                  lastChangeTimestamp: new Date().getTime(),
                });
            }
          }
        );
      });
    });
  };

  return (
    <div className="md:min-w-48 lg:min-w-80 md:max-w-48 lg:max-w-80 min-h-[100dvh] items-center flex border-l border-solid border-white p-4 relative flex-col gap-4 justify-between w-full max-w-full">
      <div className="w-full flex flex-col gap-4 justify-between items-center">
        <Avatar alt={thread?.name ?? ""} size="2xl" />
        {thread?.name}
        <div
          className={`absolute right-2 cursor-pointer p-1 
              ${thread?.colors?.sent} color-white rounded-full block md:hidden`}
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
        <button
          className="hover:bg-white hover:bg-opacity-10 rounded-xl p-2 flex items-center justify-center w-full gap-2"
          onClick={deleteThread}
        >
          Delete thread <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
}
