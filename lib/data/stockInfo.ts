import YahooFinance from "yahoo-finance2";
import { StockBaseInfo, StockBaseInfoSchema } from "../types/StockBaseInfo";

export async function getStockInfo(symbol: string): Promise<StockBaseInfo> {
  try {
    const yahooFinance = new YahooFinance();
    const result = await yahooFinance.quote(symbol);
    console.log("result", result);
    return StockBaseInfoSchema.parse(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn(
        `Error fetching quote for "${symbol}": [${error.name}] ${error.message}`
      );
    } else {
      console.warn(`Unknown error fetching quote for "${symbol}"`);
    }
    throw new Error(`Error fetching stock information for ${symbol}`);
  }
}
