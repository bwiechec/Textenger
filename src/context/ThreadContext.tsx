import { createContext, useContext, useState } from "react";
import { IThread } from "../lib/api/thread/thread.interface";
import useThreadData from "../hooks/useThreadData";
import { useUser } from "./UserContext";

interface IThreadContext {
  thread: IThread | undefined;
  setThread: (newThread: IThread) => void;
}

export const ThreadContext = createContext<IThreadContext | undefined>(
  undefined
);

export const useThread = () => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error("Use context inside provider!");
  }
  return context;
};

export const updateThread = () => {
  const { thread, setThread } = useThread();
  const { user } = useUser();
  const { threadData } = useThreadData(thread?.id ?? "0", user?.id ?? 0);

  threadData && setThread(threadData);
};

export function ThreadContextProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: IThread | undefined;
}) {
  const [thread, setThread] = useState<IThread | undefined>(value);

  return (
    <ThreadContext.Provider value={{ thread, setThread }}>
      {children}
    </ThreadContext.Provider>
  );
}
