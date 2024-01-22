import { Loader, LoaderOverlay } from "../Loader/Loader";
import useQuery from "../../hooks/useQuery";
import useMessageData from "../../hooks/useMessageData";
import MessageBox from "../MessageBox/MessageBox";
import { IoSend } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import useThreadData from "../../hooks/useThreadData";
import { ThreadContextProvider } from "../../context/ThreadContext";
import { useState } from "react";
import { apiCreateMessages } from "../../lib/api/message/message.endpoint";

export default function MessageList() {
  const query = useQuery();
  const { user } = useUser();
  const threadId = query.get("t");
  const { status: statusMsg, messageList } = useMessageData(threadId ?? -1);
  const { status: statusThread, threadData } = useThreadData(
    threadId ?? -1,
    user?.id ?? 0
  );
  const [message, setMessage] = useState("");

  if (!threadId || !user?.threads) return null;

  if (
    statusThread === "LOADING" ||
    statusMsg === "LOADING" ||
    threadData === undefined
  )
    return <Loader />;

  const sendMsg = () => {
    if (message === "") return;
    apiCreateMessages({
      userId: user.id,
      threadId: threadId,
      message: message,
      timestamp: new Date().getTime(),
    });
  };
  console.log(messageList);

  return (
    <ThreadContextProvider value={threadData}>
      <div className="min-h-full w-full items-center flex pt-4 relative flex-col">
        MessageList
        <LoaderOverlay status={statusThread} />
        <div className="h-full w-full flex p-4 relative flex-col-reverse">
          {messageList.map((message) => {
            console.log(message);
            return <MessageBox message={message} key={message.messageId} />;
          })}
        </div>
        <div className="w-full bottom-0 h-24 relative">
          <input
            className="w-full h-full p-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IoSend
            className="absolute right-6 bottom-8 cursor-pointer"
            onClick={sendMsg}
          />
        </div>
      </div>
    </ThreadContextProvider>
  );
}
