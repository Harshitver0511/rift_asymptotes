import { useState } from "react";

const InputSection = () => {
  const [loading, setLoading] = useState(false);

  const handleRun = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <>
      <input placeholder="GitHub repository URL" />
      <input placeholder="Team name" />
      <input placeholder="Team leader name" />

      <button onClick={handleRun}>
        {loading ? "running agent..." : "run agent"}
      </button>
    </>
  );
};

export default InputSection;
