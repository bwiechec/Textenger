import { useUser } from "../../context/UserContext";
import ThreadCard from "../ThreadCard/ThreadCard";
import { FaPlus } from "react-icons/fa";

export default function ChatList() {
  const { user } = useUser();

  const threads = user?.threads;

  return (
    <div className="md:w-48 lg:w-96 min-h-screen items-center flex border-r border-solid border-white p-4 relative flex-col gap-4">
      <div className=" items-center w-full flex">
        <span className="w-full text-center block">Chat</span>
        <FaPlus className="absolute right-2 md:right-6" />
      </div>
      {threads &&
        threads.map((thread, key) => {
          if (!thread) return <></>;

          return <ThreadCard threadId={key} key={key} />;
        })}
    </div>
  );
}
