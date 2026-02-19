import { useAgent } from "../context/AgentContext";

const RunSummary = () => {
  const { runData } = useAgent();
  if (!runData) return null;

  return (
    <div style={{ marginTop: "40px", border: "1px solid white", padding: "20px" }}>
      <p>Repository: {runData.repoUrl}</p>
      <p>Team: {runData.teamName}</p>
      <p>Leader: {runData.leaderName}</p>
      <p>Branch: {runData.branchName}</p>
      <p>Total Failures: {runData.failures}</p>
      <p>Total Fixes: {runData.fixes}</p>
      <p>Status: {runData.status}</p>
      <p>Time Taken: {runData.timeTaken}</p>
    </div>
  );
};

export default RunSummary;
