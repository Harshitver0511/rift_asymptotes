import InputSection from "./components/InputSection";

function App() {
  return (
    <div className="app">
      <section className="hero">
        <div className="hero-content">
          <h1>
            autonomous ci/cd <br />
            healing agent.
          </h1>

          <p>
            an autonomous devops agent that detects, fixes,
            and verifies pipeline failures.
          </p>
        </div>
      </section>

      <section className="form-container">
        <InputSection />
      </section>
    </div>
  );
}

export default App;
