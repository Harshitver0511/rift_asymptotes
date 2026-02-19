const FixesTable = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <table style={{ width: "100%", border: "1px solid white" }}>
        <thead>
          <tr>
            <th>File</th>
            <th>Bug Type</th>
            <th>Line</th>
            <th>Commit Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>src/utils.py</td>
            <td>LINTING</td>
            <td>15</td>
            <td>[AI-AGENT] Removed unused import</td>
            <td style={{ color: "lime" }}>✓ Fixed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FixesTable;
