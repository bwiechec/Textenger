export type IApiThread = {
  name: string;
  members?: { [id: number | string]: { value: boolean } };
  colors?: {
    sent?: string;
    received?: string;
  };
  emoji?: string;
};

export type IThread = {
  id: number | string;
  name: string;
  members?: { [id: number | string]: { value: boolean } }[];
  colors?: {
    sent?: string;
    received?: string;
  };
  emoji?: string;
};
