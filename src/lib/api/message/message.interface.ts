export type IApiMessage = {
  userId: string | number;
  message: string;
  timestamp: number;
};

export type IMessage = {
  messageId: string | number;
  threadId: string | number;
  userId: string | number;
  message: string;
  timestamp: number;
};
