import { useThread } from "../../context/ThreadContext";
import { useUser } from "../../context/UserContext";
import { IMessage } from "../../lib/api/message/message.interface";
import Avatar from "../Avatar/Avatar";

type IMessageBox = {
  message: IMessage;
};

export default function MessageBox({ message }: IMessageBox) {
  const { user } = useUser();
  const { thread } = useThread();

  console.log(thread);

  return (
    <div
      className={`flex items-center gap-2 p-4 relative ${
        user?.id === message.userId ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`${user?.id === message.userId ? "hidden" : "block"}`}>
        <Avatar alt={thread?.name ?? ""} />
      </div>
      {message.message}
    </div>
  );
}
