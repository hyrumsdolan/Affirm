import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-[100vh] min-w-[100vw] justify-center bg-red-500 text-white">
      <div className="size-screen flex flex-col justify-center text-center align-middle">
        <button
          onClick={async () => {
            const res = await fetch("/hello");
            console.log(await res.json());
          }}
        >
          Click to fetch server
        </button>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:align-middle">
          <a href="https://vitejs.dev" target="_blank">
            <img
              src={viteLogo}
              className="drop-shadow-glow size-16"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="animate-spin-slow drop-shadow-glow size-16"
              alt="React logo"
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
