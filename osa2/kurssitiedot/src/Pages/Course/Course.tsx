import { CourseType } from "../../types";
import Content from "./Components/Content";
import Header from "./Components/Header";
import Total from "./Components/Total";

interface CourseProps {
  courseData: CourseType;
}

export const Course: React.FC<CourseProps> = ({ courseData }) => {
  return (
    <div>
      <Header title={courseData.name} />
      <Content parts={courseData.parts} />
      <Total parts={courseData.parts} />
    </div>
  );
};
