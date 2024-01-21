import { useState } from "react";
import { LoaderOverlay } from "../Loader/Loader";
import useQuery from "../../hooks/useQuery";
import useMessageData from "../../hooks/useMessageData";
import MessageBox from "../MessageBox/MessageBox";
import { IoSend } from "react-icons/io5";

export default function MessageList() {
  const query = useQuery();
  const { status, messageList } = useMessageData(query.get("t") ?? 0);

  console.log(messageList);

  return (
    <div className="min-h-screen w-full items-center flex pt-4 relative flex-col">
      MessageList
      <LoaderOverlay status={status} />
      <div className="h-full w-full flex p-4 relative flex-col-reverse">
        {messageList.map((message) => {
          return <MessageBox message={message} />;
        })}
      </div>
      <div className="w-full bottom-0 h-24 relative">
        <input className="w-full h-full p-4" />
        <IoSend className="absolute right-6 bottom-8" />
      </div>
    </div>
  );
}
