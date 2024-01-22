import { useState } from "react";
import { useUser } from "../../context/UserContext";
import ThreadCard from "../ThreadCard/ThreadCard";
import { FaPlus } from "react-icons/fa";
import AddNewChat from "../AddNewChat/AddNewChat";

export default function ChatList() {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useUser();

  const threads = user?.threads;

  const onClose = () => {
    setShowModal(false);
  };

  const afterExecute = (
    threads: { [id: number | string]: { value: boolean } }[]
  ) => {
    setUser({
      id: user?.id ?? "",
      name: user?.name ?? "",
      threads: threads,
    });
  };

  return (
    <div className="md:min-w-48 lg:min-w-80 min-h-screen items-center flex border-r border-solid border-white p-4 relative flex-col gap-4 ">
      <div className=" items-center w-full flex">
        <span className="w-full text-center block">Chat</span>
        <FaPlus
          className="absolute right-2 md:right-6 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      {threads &&
        threads.map((thread, key) => {
          const threadId = Object.keys(thread)[0];
          if (!thread) return <></>;

          return <ThreadCard threadId={threadId} key={key} />;
        })}
      <AddNewChat
        show={showModal}
        onClose={onClose}
        afterExecute={afterExecute}
      />
    </div>
  );
}
