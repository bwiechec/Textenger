import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { IMessage } from "../../lib/api/message/message.interface";
import Avatar from "../Avatar/Avatar";
import { formatTime, getBoxRadius } from "../../lib/utils/helper";
import { useThread } from "../../context/ThreadContext";

type IMessageBox = {
  message: IMessage;
  nextMsgUser: string | number;
  prevMsgUser: string | number;
};

export default function MessageBox({
  message,
  nextMsgUser,
  prevMsgUser,
}: IMessageBox) {
  const { user } = useUser();
  const [showDate, setShowDate] = useState(false);
  const { thread } = useThread();

  const userThreadCount = thread?.members?.length ?? 0;

  const formattedTime = formatTime(new Date(message.timestamp));

  const isFirstMessageOfUser = prevMsgUser !== message.userId;

  const isLastMessageOfUser = nextMsgUser !== message.userId;

  const currentUserMsg = user?.id === message.userId;

  const currentBorderRadius = getBoxRadius(
    isFirstMessageOfUser,
    isLastMessageOfUser,
    currentUserMsg
  );

  return (
    <div
      className={`flex items-end gap-2 px-1 py-0.5 relative max-w-full ${
        currentUserMsg && "justify-end"
      }`}
    >
      <div
        className={`pb-1 ${currentUserMsg ? "hidden" : "block"} ${
          nextMsgUser === message.userId && "invisible"
        }`}
      >
        <Avatar alt={message.userId.toString() ?? ""} size="sm" />
      </div>
      <div
        className={`flex flex-col w-1/2 ${
          currentUserMsg ? "items-end" : "items-start"
        }`}
      >
        <span className={`${currentUserMsg ? "mr-2" : "ml-2"}`}>
          {isFirstMessageOfUser && userThreadCount > 2 && message.userId}
        </span>
        <div
          className={`flex px-4 py-2 ${currentBorderRadius} cursor-default text-wrap max-w-[100%] break-all whitespace-pre ${
            currentUserMsg ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setShowDate((prev) => !prev)}
        >
          {message.message}
        </div>
        <span
          className={`${
            showDate
              ? "block"
              : "absolute invisible opacity-0 translate-y-[100%]"
          } transition duration-300 ease-in text-right`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
