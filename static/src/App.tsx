import * as React from "react";
import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
// import { CandleStickChart } from "./components/Chart";
import { CandleStickChart } from "./components/HighChart";

function App() {
  const [chartData, setChartData] = useState<IChart>();

  useEffect(() => {
    (async () => {
      const data = await (
        await fetch("http://localhost:3000/api/data/market?symbol=tsla&dateRange=max")
      ).json();
      setChartData(data.payload);
    })();
  }, []);

  return (
    <div className="App">
      <>
        {chartData && <CandleStickChart chartData={chartData} />}
      </>
    </div>
  );
}

export default App;
