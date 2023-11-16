import React from "react";

interface TotalProps {
  total: Array<number>;
}

const Total: React.FC<TotalProps> = ({ total }) => {
  return (
    <p>
      Number of exercises {total.reduce((acc, current) => acc + current, 0)}
    </p>
  );
};

export default Total;
