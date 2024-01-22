import { useEffect, useState } from "react";
import { IThread } from "../lib/api/thread/thread.interface";
import { apiGetThreadById } from "../lib/api/thread/thread.endpoint";
import { apiGetUserById } from "../lib/api/user/user.endpoint";

export default function useThreadData(
  threadId: number | string,
  userId: number | string
) {
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "ERROR">("IDLE");
  const [threadData, setThreadData] = useState<IThread | undefined>();

  useEffect(() => {
    setStatus("LOADING");
    apiGetThreadById(threadId)
      .then((res) => {
        console.log(res.data.members);
        const arrayMembers = Object.entries(res.data?.members ?? {}).map(
          ([key, value]) => ({ [key]: { value: value.value } })
        );
        console.log("2");
        const otherUsers = arrayMembers?.findIndex(
          (member, _key) => Object.keys(member)[0] !== userId
        );
        console.log(userId);
        console.log(arrayMembers);
        console.log(otherUsers);
        apiGetUserById(Object.keys(arrayMembers[otherUsers])[0] ?? userId).then(
          (resUser) => {
            console.log(resUser);
            setThreadData({
              id: threadId,
              name: resUser.data.name,
              members: arrayMembers,
            });
            setStatus("IDLE");
          }
        );
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, [threadId, userId]);

  return { status, threadData };
}
