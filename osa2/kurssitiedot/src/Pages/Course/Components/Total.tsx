import React from "react";
import { PartType } from "../../../types";

interface TotalProps {
  parts: Array<PartType>;
}

const Total: React.FC<TotalProps> = ({ parts }) => {
  return (
    <b>
      Number of exercises{" "}
      {parts.map((part) => part.exercises).reduce((acc, val) => acc + val)}
    </b>
  );
};

export default Total;
