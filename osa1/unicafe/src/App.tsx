import { useEffect, useState } from "react";
import { Statistics } from "./Components/Statistics";
import { Button } from "./Components/Button";

function App() {
  const [good, setGood] = useState<number>(0);
  const [neutral, setNeutral] = useState<number>(0);
  const [bad, setBad] = useState<number>(0);
  const [hasFeedback, setHasFeedback] = useState<boolean>(false);

  useEffect(() => {
    const feedbackExists = good !== 0 || neutral !== 0 || bad !== 0;
    setHasFeedback(feedbackExists);
  }, [bad, good, neutral]);

  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={() => setGood((val) => val + 1)} text="good" />
        <Button
          onClick={() => setNeutral((neutral) => neutral + 1)}
          text="neutral"
        />
        <Button onClick={() => setBad((bad) => bad + 1)} text="bad" />
      </div>

      <Statistics
        stats={{ good: good, bad: bad, neutral: neutral }}
        showResults={hasFeedback}
      />
    </>
  );
}

export default App;
