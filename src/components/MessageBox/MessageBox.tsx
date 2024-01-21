import { useUser } from "../../context/UserContext";
import useThreadData from "../../hooks/useThreadData";
import { IMessage } from "../../lib/api/message/message.interface";
import Avatar from "../Avatar/Avatar";
import { LoaderOverlay } from "../Loader/Loader";

type IMessageBox = {
  message: IMessage;
};

export default function MessageBox({ message }: IMessageBox) {
  const { user } = useUser();
  const { status, threadData } = useThreadData(message.threadId, user?.id ?? 0);
  console.log(message);

  return (
    <div
      className={`flex items-center gap-2 p-4 ${
        user?.id === message.userId ? "justify-end" : "justify-start"
      }`}
    >
      <LoaderOverlay status={status} />
      <div className={`${user?.id === message.userId ? "hidden" : "block"}`}>
        <Avatar alt={threadData?.name ?? ""} />
      </div>
      {message.message}
    </div>
  );
}
