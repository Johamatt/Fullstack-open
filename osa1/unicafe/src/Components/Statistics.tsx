import { useState } from "react";

interface StatisticsProps {
  stats: {
    good: number;
    bad: number;
    neutral: number;
  };
  showResults: boolean;
}

export const Statistics: React.FC<StatisticsProps> = ({
  stats,
  showResults,
}) => {
  const { good, bad, neutral } = stats;

  const calcAll = () => {
    return bad + good + neutral;
  };

  const calcAvg = () => {
    return (good * 1 + neutral * 0 + bad * -1) / calcAll();
  };

  const calcPlus = () => {
    return (good / calcAll()) * 100;
  };

  return (
    <>
      {showResults ? (
        <div>
          <h1>Statistics</h1>
          <table>
            <tbody>
              <StatisticsLine text="good" value={good} />
              <StatisticsLine text="neutral" value={neutral} />
              <StatisticsLine text="bad" value={bad} />
              <StatisticsLine text="all" value={calcAll()} />
              <StatisticsLine text="average" value={calcAvg()} />
              <StatisticsLine text="positive" value={good} />
              <StatisticsLine text="good" value={calcPlus()} />
            </tbody>
          </table>
        </div>
      ) : (
        <p>no feedback given</p>
      )}
    </>
  );
};

interface StatisticsLineProps {
  text: string;
  value: number;
}
const StatisticsLine: React.FC<StatisticsLineProps> = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td> {value}</td>
    </tr>
  );
};
