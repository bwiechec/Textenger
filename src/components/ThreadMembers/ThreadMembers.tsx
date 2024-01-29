import { useState } from "react";
import { useThread } from "../../context/ThreadContext";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import Avatar from "../Avatar/Avatar";
import { apiDeleteUserThread } from "../../lib/api/user/user.endpoint";
import { apiDeleteUserFromThread } from "../../lib/api/thread/thread.endpoint";

export default function ThreadMembers() {
  const { thread, setThread } = useThread();
  const [membersIsOpen, setMembersIsOpen] = useState(false);
  const threadUserCount = thread?.members?.length ?? 0;

  const removeUser = (userId: string | number) => {
    if (confirm(`Are you sure you want to delete ${userId} from chat?`)) {
      apiDeleteUserFromThread(userId, thread?.id ?? "0");
      apiDeleteUserThread(userId, thread?.id ?? "0");

      setThread({
        id: thread?.id ?? "0",
        name: thread?.name ?? "",
        members: thread?.members?.filter(
          (member) => Object.keys(member)[0] !== userId
        ),
        emoji: thread?.emoji,
        colors: thread?.colors,
      });
    }
  };

  if (threadUserCount <= 2) return null;

  return (
    <div className="flex flex-col justify-start w-full">
      <button
        onClick={() => setMembersIsOpen((prev) => !prev)}
        className="flex items-center justify-between hover:bg-white hover:bg-opacity-10 rounded-xl p-2"
      >
        Thread members
        {membersIsOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {membersIsOpen &&
        thread?.members?.map((member) => {
          return (
            <div
              className="flex items-center justify-between"
              key={Object.keys(member)[0] ?? ""}
            >
              <span className="flex gap-2 p-2 ">
                <Avatar alt={Object.keys(member)[0] ?? ""} size="md" />
                {Object.keys(member)[0]}
              </span>
              <button
                className="hover:bg-white hover:bg-opacity-10 p-2 rounded-xl text-red-500"
                onClick={() => removeUser(Object.keys(member)[0])}
              >
                <FaRegTrashCan />
              </button>
            </div>
          );
        })}
    </div>
  );
}
