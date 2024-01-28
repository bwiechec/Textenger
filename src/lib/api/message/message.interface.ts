export type IApiMessage = {
  userId: string | number;
  threadId: string | number;
  message: string;
  timestamp: number;
  withoutBg?: boolean;
};

export type IMessage = {
  messageId: string | number;
  threadId: string | number;
  userId: string | number;
  message: string;
  timestamp: number;
  withoutBg?: boolean;
};
