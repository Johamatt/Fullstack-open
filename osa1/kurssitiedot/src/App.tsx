import Content from "./Components/Content";
import Header from "./Components/Header";
import Total from "./Components/Total";
import { ContentData } from "./types";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const contentData: Array<ContentData> = [
    { part: part1, exercises: exercises1 },
    { part: part2, exercises: exercises2 },
    { part: part3, exercises: exercises3 },
  ];

  return (
    <div>
      <Header title={course} />
      <Content contentDataArr={contentData} />
      <Total total={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
