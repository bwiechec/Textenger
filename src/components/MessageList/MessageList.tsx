import { Loader, LoaderOverlay } from "../Loader/Loader";
import useQuery from "../../hooks/useQuery";
import useMessageData from "../../hooks/useMessageData";
import MessageBox from "../MessageBox/MessageBox";
import { IoSend } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import useThreadData from "../../hooks/useThreadData";
import { ThreadContextProvider } from "../../context/ThreadContext";

export default function MessageList() {
  const query = useQuery();
  const { user } = useUser();
  const { status: statusMsg, messageList } = useMessageData(
    query.get("t") ?? -1
  );
  const { status: statusThread, threadData } = useThreadData(
    query.get("t") ?? -1,
    user?.id ?? 0
  );

  if (!query.get("t") || !user?.threads) return null;

  if (
    statusThread === "LOADING" ||
    statusMsg === "LOADING" ||
    !messageList.length ||
    threadData === undefined
  )
    return <Loader />;

  console.log(threadData);

  return (
    <ThreadContextProvider value={threadData}>
      <div className="min-h-full w-full items-center flex pt-4 relative flex-col">
        MessageList
        <LoaderOverlay status={statusThread} />
        <div className="h-full w-full flex p-4 relative flex-col-reverse">
          {messageList.map((message) => {
            return <MessageBox message={message} key={message.messageId} />;
          })}
        </div>
        <div className="w-full bottom-0 h-24 relative">
          <input className="w-full h-full p-4" />
          <IoSend className="absolute right-6 bottom-8" />
        </div>
      </div>
    </ThreadContextProvider>
  );
}
