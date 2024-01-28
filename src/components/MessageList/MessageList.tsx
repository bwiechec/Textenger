import { Loader, LoaderOverlay } from "../Loader/Loader";
import useQuery from "../../hooks/useQuery";
import useMessageData from "../../hooks/useMessageData";
import MessageBox from "../MessageBox/MessageBox";
import { IoSend } from "react-icons/io5";
import { useUser } from "../../context/UserContext";
import useThreadData from "../../hooks/useThreadData";
import { useThread } from "../../context/ThreadContext";
import { useEffect, useState } from "react";
import { apiCreateMessages } from "../../lib/api/message/message.endpoint";
import { FaEllipsis } from "react-icons/fa6";
import ThreadAdditionalData from "../ThreadAdditionalData/ThreadAdditionalData";

export default function MessageList() {
  const query = useQuery();
  const { user } = useUser();
  const threadId = query.get("t");
  const { setThread } = useThread();
  const [showingThreadData, setShowingThreadData] = useState(
    window?.innerWidth >= 640 ? true : false
  );
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const { status: statusMsg, messageList } = useMessageData(
    threadId ?? -1,
    lastTimestamp
  );
  const { status: statusThread, threadData } = useThreadData(
    threadId ?? -1,
    user?.id ?? 0,
    user?.lastChangeTimestamp,
    setThread
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

  const sendEmoji = () => {
    if (!threadData?.emoji) return;
    apiCreateMessages({
      userId: user?.id ?? 0,
      threadId: threadId ?? "",
      message: threadData?.emoji,
      timestamp: new Date().getTime(),
      withoutBg: true,
    }).then(() => {
      setLastTimestamp(new Date().getTime());
      setMessage("");
    });
  };

  const changeShowingThreadData = () => {
    setShowingThreadData((prev) => !prev);
  };

  return (
    <>
      <div
        className={`w-full max-w-full h-[100dvh] items-center flex relative flex-col ${
          showingThreadData && "hidden md:flex"
        }`}
      >
        <div className=" items-center w-full flex p-4">
          <span className="w-full text-center block text-xl">
            {threadData?.name}
          </span>
          <div
            className={`absolute right-2 md:right-6 cursor-pointer p-1 ${
              showingThreadData &&
              `${threadData?.colors?.sent} color-white rounded-full`
            }`}
            onClick={() => changeShowingThreadData()}
          >
            <FaEllipsis />
          </div>
        </div>
        <LoaderOverlay status={statusThread} />
        <div className="h-full w-full flex p-4 relative flex-col-reverse overflow-y-auto max-w-full">
          {messageList.map((message, key) => {
            return (
              <MessageBox
                message={message}
                key={message.messageId}
                nextMsgUser={messageList[key - 1]?.userId}
                prevMsgUser={messageList[key + 1]?.userId}
              />
            );
          })}
        </div>
        {/* TODO SENDING MESSAGE TO NEW COMPONENT */}
        <div className="w-full bottom-0 h-24 relative">
          <input
            className="w-full h-24 p-4 bg-[#353434] bg-opacity-60"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") sendMsg();
            }}
          />
          <div
            className="absolute right-0 bottom-0 cursor-pointer h-full w-16 flex items-center justify-center"
            onClick={message === "" ? sendEmoji : sendMsg}
          >
            {message === "" ? (
              <span className="text-2xl">{threadData?.emoji}</span>
            ) : (
              <IoSend />
            )}
          </div>
        </div>
      </div>
      {showingThreadData && (
        <ThreadAdditionalData
          changeShowingThreadData={changeShowingThreadData}
        />
      )}
    </>
  );
}
