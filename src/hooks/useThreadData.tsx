import { useEffect, useState } from "react";
import { IThread } from "../lib/api/thread/thread.interface";
import { apiGetThreadById } from "../lib/api/thread/thread.endpoint";
import { apiGetUserById } from "../lib/api/user/user.endpoint";
import { availableEmojiList } from "../lib/utils/helper";

export default function useThreadData(
  threadId: number | string,
  userId: number | string,
  lastChangeTimestamp?: number,
  setThread?: (newThread: IThread) => void
) {
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "ERROR">("IDLE");
  const [threadData, setThreadData] = useState<IThread | undefined>();

  useEffect(() => {
    setStatus("LOADING");
    apiGetThreadById(threadId)
      .then((res) => {
        const arrayMembers = Object.entries(res.data?.members ?? {}).map(
          ([key, value]) => ({ [key]: { value: value.value } })
        );
        const otherUsers = arrayMembers?.findIndex(
          (member, _key) => Object.keys(member)[0] !== userId
        );
        const emoji = res.data.emoji ?? availableEmojiList[0];
        const colorsSent = res.data.colors?.sent ?? "bg-blue-500";
        const colorsReveived = res.data.colors?.received ?? "bg-gray-700";
        apiGetUserById(Object.keys(arrayMembers[otherUsers])[0] ?? userId).then(
          (resUser) => {
            const name =
              res.data.name === "" ? resUser.data.name : res.data.name;
            setThreadData({
              id: threadId,
              name: name,
              members: arrayMembers,
              emoji: emoji,
              colors: {
                sent: colorsSent,
                received: colorsReveived,
              },
            });
            setStatus("IDLE");
            if (setThread)
              setThread({
                id: threadId,
                name: name,
                members: arrayMembers,
                emoji: emoji,
                colors: {
                  sent: colorsSent,
                  received: colorsReveived,
                },
              });
          }
        );
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, [threadId, userId, lastChangeTimestamp]);

  return { status, threadData };
}
