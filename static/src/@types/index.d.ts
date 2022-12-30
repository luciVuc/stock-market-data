declare interface ITradingPeriod {
  end: number;
  gmtoffset: number;
  start: number;
  timezone: string;
}

declare interface IDataPoint {
  timestamp: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
}

// declare type TCandleStick = Pick<IDataPoint, 'timestamp' | 'open' | 'high' | 'low' | 'close'>;

// declare type TVolume = Pick<IDataPoint, 'timestamp' | 'volume'>;

declare interface IChart {
  chartPreviousClose: number;
  currency: string;
  currentTradingPeriod: {
    post: ITradingPeriod;
    pre: ITradingPeriod;
    regular: ITradingPeriod;
  };
  dataGranularity: string;
  exchangeName: string;
  exchangeTimezoneName: string;
  firstTradeDate: number;
  gmtoffset: number;
  instrumentType: string;
  interval?: string;
  priceHint: number;
  range: string;
  regularMarketPrice: number;
  regularMarketTime: number;
  symbol: string;
  timezone: string;
  validRanges: string[];
  width: number | string;
  dataPoints: IDataPoint[];
}
