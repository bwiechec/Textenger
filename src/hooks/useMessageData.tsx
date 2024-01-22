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
        const arrayMessages = Object.entries(res.data ?? {}).map(
          ([_key, value]) => value
        );
        let messages: IMessage[] = [];
        arrayMessages.forEach((e, key) => {
          console.log(messages);
          messages.push({
            threadId: threadId,
            messageId: key,
            userId: e.userId,
            message: e.message,
            timestamp: e.timestamp,
          });
        });
        messages.sort((msg1, msg2) => msg2.timestamp - msg1.timestamp);
        setMessageList(messages);
        console.log(messages);
        setStatus("IDLE");
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, [threadId]);

  return { status, messageList };
}
