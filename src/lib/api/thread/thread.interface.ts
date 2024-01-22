export type IApiThread = {
  name: string;
  members?: { [id: number | string]: { value: boolean } };
};

export type IThread = {
  id: number | string;
  name: string;
  members?: { [id: number | string]: { value: boolean } }[];
};
