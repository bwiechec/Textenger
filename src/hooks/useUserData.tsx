import { useEffect, useState } from "react";
import { IUser } from "../lib/api/user/user.interface";
import { apiGetUsers } from "../lib/api/user/user.endpoint";

export default function useUserData() {
  const [status, setStatus] = useState<"IDLE" | "LOADING" | "ERROR">("IDLE");
  const [userList, setUserList] = useState<IUser[] | []>([]);

  useEffect(() => {
    setStatus("LOADING");
    apiGetUsers()
      .then((res) => {
        console.log(res.data);
        let users: IUser[] = [];
        res.data.forEach((e, key) => {
          users.push({
            id: key,
            name: e.name,
            threads: e.threads,
          });
        });
        setUserList(users);
        setStatus("IDLE");
      })
      .catch((_e) => {
        setStatus("ERROR");
      });
  }, []);

  return { status, userList };
}
