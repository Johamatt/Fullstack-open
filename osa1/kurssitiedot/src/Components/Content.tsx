import React from "react";

interface ContentProps {
  contentData: Array<{ part: string; exercises: number }>;
}

const Content: React.FC<ContentProps> = ({ contentData }) => {
  return contentData.map((data) => {
    return (
      <p>
        {data.part} {data.exercises}
      </p>
    );
  });
};

export default Content;
