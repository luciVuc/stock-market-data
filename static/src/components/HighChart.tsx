import React, { LegacyRef, useEffect, useRef } from "react";

const { Highcharts } = window as any;

export interface ICandleStickChartProps {
  chartData: IChart;
}

export class DataPoint implements IDataPoint {
  timestamp: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;

  constructor({ timestamp, open, high, low, close, volume }: IDataPoint) {
    this.timestamp = parseInt(timestamp.toString());
    this.open = Number(open.toFixed(2));
    this.close = Number(close.toFixed(2));
    this.high = Number(high.toFixed(2));
    this.low = Number(low.toFixed(2));
    this.volume = parseInt(volume.toString());
  }

  getCandlestickData() {
    return [this.timestamp, this.open, this.high, this.low, this.close];
  }

  getVolumeData() {
    return [this.timestamp, this.volume];
  }
}

/**
 * Splits the data set into candles and volumes
 */
const parseDataPoints = (dataPoints: IDataPoint[]) => {
  const candles = [];
  const volumes = [];

  for (let point: DataPoint, len = dataPoints.length, i = 0; i < len; i++) {
    point = new DataPoint(dataPoints[i]);
    candles.push(point.getCandlestickData());
    volumes.push(point.getVolumeData());
  }
  return { candles, volumes };
};

export function CandleStickChart({ chartData }: ICandleStickChartProps) {
  const { dataPoints, symbol } = chartData;
  const divRef = useRef<LegacyRef<HTMLDivElement>>() as any;
  // const [chart, setChart] = useState<CandleStickChartElement>();

  useEffect(() => {
    // new CandleStickChartElement(divRef?.current, dataPoints).draw();
    if (dataPoints && divRef?.current) {
      // split the data set into candles and volumes
      const { candles, volumes } = parseDataPoints(dataPoints);
      const chart = Highcharts.stockChart(divRef?.current, {
        yAxis: [
          {
            labels: {
              align: "left",
            },
            height: "80%",
            resize: {
              enabled: true,
            },
          },
          {
            labels: {
              align: "left",
            },
            top: "80%",
            height: "20%",
            resize: {
              enabled: true,
            },
            offset: 0,
          },
        ],
        tooltip: {
          shape: "square",
          headerShape: "callout",
          borderWidth: 0,
          shadow: true,
          positioner: (width: number, height: number, point: any) => {
            let position;
            if (point.isHeader) {
              position = {
                x: Math.max(
                  // Left side limit
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    // Right side limit
                    chart.chartWidth - width - chart.marginRight
                  )
                ),
                y: point.plotY,
              };
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop,
              };
            }

            return position;
          },
        },
        series: [
          {
            type: "candlestick",
            id: `${symbol}-ohlc`,
            name: `${symbol} Stock Price`,
            data: candles,
          },
          {
            type: "column",
            id: `${symbol}-volume`,
            name: `${symbol} Volume`,
            data: volumes,
            yAxis: 1,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 800,
              },
              chartOptions: {
                rangeSelector: {
                  inputEnabled: false,
                },
              },
            },
          ],
        },
      });
    }
  }, [dataPoints, symbol]);

  return (
    <div
      className="chart-container"
      ref={divRef}
      style={{ width: "100%", height: "100%" }}
    ></div>
  );
}
export default CandleStickChart;
