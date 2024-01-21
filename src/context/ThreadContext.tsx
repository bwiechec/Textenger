import { createContext, useContext, useState } from "react";
import { IThread } from "../lib/api/thread/thread.interface";

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

export function ThreadContextProvider({
  children,
  value,
}: {
  children: JSX.Element;
  value: IThread;
}) {
  const [thread, setThread] = useState<IThread | undefined>(value);

  return (
    <ThreadContext.Provider value={{ thread, setThread }}>
      {children}
    </ThreadContext.Provider>
  );
}
