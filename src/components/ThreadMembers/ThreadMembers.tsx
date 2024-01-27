import { useState } from "react";
import { useThread } from "../../context/ThreadContext";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import Avatar from "../Avatar/Avatar";

export default function ThreadMembers() {
  const { thread } = useThread();
  const [membersIsOpen, setMembersIsOpen] = useState(false);
  const threadUserCount = thread?.members?.length ?? 0;

  if (threadUserCount <= 2) return null;
  return (
    <div className="flex flex-col justify-start w-full">
      <button
        onClick={() => setMembersIsOpen((prev) => !prev)}
        className="flex items-center justify-between hover:bg-white hover:bg-opacity-10 rounded-xl p-2"
      >
        Thread members [IN TODO]{" "}
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
              <button className="hover:bg-white hover:bg-opacity-10 p-2 rounded-xl">
                <FaRegTrashCan />
              </button>
            </div>
          );
        })}
    </div>
  );
}
