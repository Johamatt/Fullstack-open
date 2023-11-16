export type PartType = {
  part: string;
  exercises: number;
};

export type Course = {
  name: string;
  parts: Array<PartType>;
};
