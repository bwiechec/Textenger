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
        const arrayData = Object.entries(res.data ?? {}).map(
          ([_key, value]) => value
        );
        console.log(arrayData);
        arrayData.forEach((e, _key) => {
          console.log("e");
          console.log(e);
          const arrayThreads = Object.entries(e.threads ?? {}).map(
            ([key, value]) => ({ [key]: { value: value.value } })
          );
          users.push({
            id: e.name,
            name: e.name,
            threads: arrayThreads,
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
