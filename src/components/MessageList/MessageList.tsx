import { Loader, LoaderOverlay } from "../Loader/Loader";
import useQuery from "../../hooks/useQuery";
import useMessageData from "../../hooks/useMessageData";
import MessageBox from "../MessageBox/MessageBox";
import { IoSend } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import useThreadData from "../../hooks/useThreadData";
import { ThreadContextProvider } from "../../context/ThreadContext";
import { useEffect, useState } from "react";
import { apiCreateMessages } from "../../lib/api/message/message.endpoint";

export default function MessageList() {
  const query = useQuery();
  const { user } = useUser();
  const threadId = query.get("t");
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const { status: statusMsg, messageList } = useMessageData(
    threadId ?? -1,
    lastTimestamp
  );
  const { status: statusThread, threadData } = useThreadData(
    threadId ?? -1,
    user?.id ?? 0
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLastTimestamp(new Date().getTime());
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (
    user?.threads?.findIndex(
      (thread) => Object.keys(thread)[0] === threadId
    ) === -1
  )
    return null;

  if (
    (statusThread === "LOADING" || statusMsg === "LOADING") &&
    threadData === undefined
  )
    return <Loader />;

  const sendMsg = () => {
    if (message === "") return;
    apiCreateMessages({
      userId: user?.id ?? 0,
      threadId: threadId ?? "",
      message: message,
      timestamp: new Date().getTime(),
    }).then(() => {
      setLastTimestamp(new Date().getTime());
      setMessage("");
    });
  };

  return (
    <ThreadContextProvider value={threadData}>
      <div className="min-h-full max-w-full max-h-[100dvh] items-center flex pt-4 relative flex-col">
        {threadData?.name}
        <LoaderOverlay status={statusThread} />
        <div className="h-full w-full flex p-4 relative flex-col-reverse overflow-y-auto max-w-full">
          {messageList.map((message, key) => {
            return (
              <MessageBox
                message={message}
                key={message.messageId}
                nextMsgUser={messageList[key - 1]?.userId}
              />
            );
          })}
        </div>
        <div className="w-full bottom-0 h-24 relative">
          <input
            className="w-full h-full p-4 bg-[#353434] bg-opacity-60"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") sendMsg();
            }}
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
