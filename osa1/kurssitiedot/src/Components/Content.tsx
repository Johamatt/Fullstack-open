import React from "react";
import { ContentData } from "../types";

interface ContentProps {
  contentDataArr: Array<ContentData>;
}

interface PartProps {
  data: ContentData;
}

const Part: React.FC<PartProps> = ({ data }) => {
  return (
    <p>
      {data.part} {data.exercises}
    </p>
  );
};

const Content: React.FC<ContentProps> = ({ contentDataArr }) => {
  return contentDataArr.map((data: ContentData) => {
    return <Part data={data} />;
  });
};

export default Content;
