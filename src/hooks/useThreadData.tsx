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
        const otherUsers = res.data.members?.findIndex(
          (_member, key) => key !== userId
        );
        apiGetUserById(otherUsers ?? userId).then((resUser) => {
          setThreadData({
            id: threadId,
            name: resUser.data.name,
            members: res.data.members,
          });
          setStatus("IDLE");
        });
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, [threadId, userId]);

  return { status, threadData };
}
