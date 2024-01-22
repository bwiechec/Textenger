import { useUser } from "../../context/UserContext";
import { IMessage } from "../../lib/api/message/message.interface";
import Avatar from "../Avatar/Avatar";

type IMessageBox = {
  message: IMessage;
};

export default function MessageBox({ message }: IMessageBox) {
  const { user } = useUser();
  // const { thread } = useThread();

  return (
    <div
      className={`flex items-center gap-2 p-4 relative ${
        user?.id === message.userId ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`${user?.id === message.userId ? "hidden" : "block"}`}>
        <Avatar alt={message.userId.toString() ?? ""} />
      </div>
      {message.message}
    </div>
  );
}
