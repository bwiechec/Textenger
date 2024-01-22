export type IApiUser = {
  name: string;
  threads?: { [id: number | string]: { value: boolean } };
};

export type IUser = {
  id: string | number;
  name: string;
  threads?: { [id: number | string]: { value: boolean } }[];
};
