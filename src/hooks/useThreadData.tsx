import { useEffect, useState } from "react";
import { IThread } from "../lib/api/thread/thread.interface";
import { apiGetThreadById } from "../lib/api/thread/thread.endpoint";
import { apiGetUserById } from "../lib/api/user/user.endpoint";

export default function useThreadData(
  threadId: number | string,
  userId: number | string,
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
        apiGetUserById(Object.keys(arrayMembers[otherUsers])[0] ?? userId).then(
          (resUser) => {
            const name =
              res.data.name === "" ? resUser.data.name : res.data.name;
            setThreadData({
              id: threadId,
              name: name,
              members: arrayMembers,
            });
            setStatus("IDLE");
            if (setThread)
              setThread({
                id: threadId,
                name: name,
                members: arrayMembers,
              });
          }
        );
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, [threadId, userId]);

  return { status, threadData };
}
