import { Course } from "./Pages/Course/Course";
import { CourseType } from "./types";

const App = () => {
  const courseData: Array<CourseType> = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        { id: 1, name: "Fundamentals of React", exercises: 10 },
        { id: 2, name: "Using props to pass data", exercises: 7 },
        { id: 3, name: "State of a component", exercises: 14 },
        { id: 4, name: "Redux", exercises: 11 },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course courseData={courseData[0]} />
      <Course courseData={courseData[1]} />
    </div>
  );
};

export default App;
