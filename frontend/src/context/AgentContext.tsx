import { createContext, useContext, useState } from "react";

interface RunData {
  repoUrl: string;
  teamName: string;
  leaderName: string;
  branchName: string;
  failures: number;
  fixes: number;
  status: "PASSED" | "FAILED" | "";
  timeTaken: string;
}

interface AgentContextType {
  runData: RunData | null;
  setRunData: React.Dispatch<React.SetStateAction<RunData | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: any) => {
  const [runData, setRunData] = useState<RunData | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <AgentContext.Provider value={{ runData, setRunData, loading, setLoading }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgent must be used within AgentProvider");
  return context;
};
