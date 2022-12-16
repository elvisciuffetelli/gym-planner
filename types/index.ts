export type User = {
  name: string;
};

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode;
};

export type Exercise = {
  _id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Login = {
  token: string;
};
