import { createContext, useContext, useState } from "react";
import { IUser } from "../lib/api/user/user.interface";

interface IUserContext {
  user: IUser | undefined;
  setUser: (newUser: IUser) => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Use context inside provider!");
  }
  return context;
};

export function UserContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<IUser | undefined>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
