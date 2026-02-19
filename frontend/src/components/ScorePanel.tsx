import { useAgent } from "../context/AgentContext";

const ScorePanel = () => {
  const { runData } = useAgent();
  if (!runData) return null;

  let score = 100;
  score += 10;
  score -= 0;

  return (
    <div style={{ marginTop: "40px", border: "1px solid white", padding: "20px" }}>
      <p>Base Score: 100</p>
      <p>Speed Bonus: +10</p>
      <p>Efficiency Penalty: -0</p>
      <h2>Final Score: {score}</h2>
    </div>
  );
};

export default ScorePanel;
