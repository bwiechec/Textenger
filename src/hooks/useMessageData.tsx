import { useEffect, useState } from "react";
import { IMessage } from "../lib/api/message/message.interface";
import { apiGetMessagesByThreadId } from "../lib/api/message/message.endpoint";

export default function useMessageData(
  threadId: number | string,
  lastTimestamp: number
) {
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "ERROR">("IDLE");
  const [messageList, setMessageList] = useState<IMessage[] | []>([]);

  useEffect(() => {
    setStatus("LOADING");
    apiGetMessagesByThreadId(threadId)
      .then((res) => {
        const arrayMessages = Object.entries(res.data ?? {}).map(
          ([_key, value]) => value
        );
        let messages: IMessage[] = [];
        arrayMessages.forEach((e, key) => {
          messages.push({
            threadId: threadId,
            messageId: key,
            userId: e.userId,
            message: e.message,
            timestamp: e.timestamp,
          });
        });
        console.log(
          messages.sort((msg1, msg2) => msg2.timestamp - msg1.timestamp)
        );
        setMessageList(
          messages.sort((msg1, msg2) => msg2.timestamp - msg1.timestamp)
        );
        setStatus("IDLE");
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, [threadId, lastTimestamp]);

  return { status, messageList };
}
