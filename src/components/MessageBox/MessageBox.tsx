import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { IMessage } from "../../lib/api/message/message.interface";
import Avatar from "../Avatar/Avatar";

type IMessageBox = {
  message: IMessage;
  nextMsgUser: string | number;
};

export default function MessageBox({ message, nextMsgUser }: IMessageBox) {
  const { user } = useUser();
  const [showDate, setShowDate] = useState(false);
  // const { thread } = useThread();

  const date = new Date(message.timestamp);
  const formattedTime =
    ("0" + date.getMonth() + 1).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2);

  return (
    <div
      className={`flex items-end gap-2 p-1 relative max-w-full ${
        user?.id === message.userId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`pb-1 ${user?.id === message.userId ? "hidden" : "block"} ${
          nextMsgUser === message.userId && "invisible"
        }`}
      >
        <Avatar alt={message.userId.toString() ?? ""} size="sm" />
      </div>
      <div
        className={`flex flex-col w-1/2 ${
          user?.id === message.userId ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`flex px-4 py-2 rounded-2xl cursor-default text-wrap max-w-[100%] break-all whitespace-pre ${
            user?.id === message.userId ? "bg-blue-500" : "bg-gray-700"
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
