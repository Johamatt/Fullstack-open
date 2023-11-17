export type PartType = {
  id: number;
  name: string;
  exercises: number;
};

export type CourseType = {
  id: number;
  name: string;
  parts: Array<PartType>;
};
