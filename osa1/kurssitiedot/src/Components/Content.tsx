import React from "react";
import { PartType } from "../types";

interface ContentProps {
  parts: Array<PartType>;
}

interface PartProps {
  data: PartType;
}

const Part: React.FC<PartProps> = ({ data }) => {
  return (
    <p>
      {data.part} {data.exercises}
    </p>
  );
};

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {parts.map((data: PartType) => {
        return <Part data={data} />;
      })}
    </div>
  );
};

export default Content;
