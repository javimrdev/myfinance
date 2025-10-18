import YahooFinance from 'yahoo-finance2';

interface StockData {
  symbol: string;
  shortName: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
}

interface SuccessResponse {
  success: true;
  data: StockData;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type StockResponse = SuccessResponse | ErrorResponse;

export async function getStockInfo(symbol: string): Promise<StockResponse> {
  try {
    const yahooFinance = new YahooFinance();
    const result = await yahooFinance.quote(symbol);
    console.log('result', result);
    return {
      success: true,
      data: {
        symbol: result.symbol,
        shortName: result.shortName,
        regularMarketPrice: result.regularMarketPrice,
        regularMarketChange: result.regularMarketChange,
        regularMarketChangePercent: result.regularMarketChangePercent,
      }
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn(
        `Error fetching quote for "${symbol}": [${error.name}] ${error.message}`,
      );
    } else {
      console.warn(`Unknown error fetching quote for "${symbol}"`);
    }
    return {
      success: false,
      error: `Error fetching stock information for ${symbol}`
    };
  }
}