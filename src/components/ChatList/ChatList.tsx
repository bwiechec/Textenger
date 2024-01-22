import { useState } from "react";
import { useUser } from "../../context/UserContext";
import ThreadCard from "../ThreadCard/ThreadCard";
import { FaPlus } from "react-icons/fa";
import AddNewChat from "../AddNewChat/AddNewChat";

export default function ChatList() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const threads = user?.threads;

  console.log(threads);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="md:min-w-48 lg:min-w-80 min-h-screen items-center flex border-r border-solid border-white p-4 relative flex-col gap-4">
      <div className=" items-center w-full flex">
        <span className="w-full text-center block">Chat</span>
        <FaPlus
          className="absolute right-2 md:right-6 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      {threads &&
        threads.map((thread, key) => {
          console.log(thread);
          const threadId = Object.keys(thread)[0];
          console.log("threadId");
          console.log(threadId);
          console.log(key);
          if (!thread) return <></>;

          return <ThreadCard threadId={threadId} key={key} />;
        })}
      <AddNewChat show={showModal} onClose={onClose} />
    </div>
  );
}
