import * as React from "react";
// import logo from './logo.svg';
import "./App.css";
// import CandlestickChart from './components/CandleStickChart';
import { useEffect, useState } from "react";
// import { CandleStickChart } from "./components/Chart";
import { CandleStickChart } from "./components/HighChart";

function App() {
  const [chartData, setChartData] = useState<IChart>();

  useEffect(() => {
    (async () => {
      const data = await (
        await fetch("http://localhost:3000/api/data/historical?symbol=tsla&dateRange=max")
      ).json();
      setChartData(data.payload);
    })();
  }, []);

  return (
    <div className="App">
      <>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        {/* { chartData && <CandlestickChart {...chartData} />} */}
        {chartData && <CandleStickChart chartData={chartData} />}
      </>
    </div>
  );
}

export default App;
