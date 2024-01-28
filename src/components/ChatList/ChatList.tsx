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
    <div className="md:min-w-48 lg:min-w-80 min-h-[100dvh] items-center flex border-r border-solid border-white relative flex-col">
      <div className=" items-center w-full flex h-[5dvh] p-6">
        <span className="w-full text-center block sm:text-2xl">Chat</span>
        <button className="absolute right-2 md:right-6 cursor-pointer w-8 h-8 flex items-center justify-center">
          <FaPlus onClick={() => setShowModal(true)} />
        </button>
      </div>
      <div className=" max-h-[95dvh] w-full flex flex-col px-4 overflow-y-auto gap-4">
        {threads &&
          threads.map((thread, key) => {
            const threadId = Object.keys(thread)[0];
            if (!thread) return <></>;

            return (
              <ThreadCard
                threadId={threadId}
                key={key}
                data-testid="thread-card"
              />
            );
          })}
      </div>
      <AddNewChat
        data-testid="add-chat"
        show={showModal}
        onClose={onClose}
        afterExecute={afterExecute}
      />
    </div>
  );
}
