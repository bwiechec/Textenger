import { useEffect, useState } from "react";
import { IMessage } from "../lib/api/message/message.interface";
import { apiGetMessagesByThreadId } from "../lib/api/message/message.endpoint";

export default function useMessageData(threadId: number | string) {
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "ERROR">("IDLE");
  const [messageList, setMessageList] = useState<IMessage[] | []>([]);

  useEffect(() => {
    setStatus("LOADING");
    apiGetMessagesByThreadId(threadId)
      .then((res) => {
        console.log(res.data);
        let messages: IMessage[] = [];
        res.data.forEach((e, key) => {
          messages.push({
            threadId: threadId,
            messageId: key,
            userId: e.userId,
            message: e.message,
            timestamp: e.timestamp,
          });
        });
        setMessageList(messages);
        setStatus("IDLE");
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, []);

  return { status, messageList };
}
