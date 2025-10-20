import z from "zod";
import { StockBaseInfo } from "../types/StockBaseInfo";

const schema = z.object({
  symbol: z.string(),
});

export const searchSymbol = async (symbol: string): Promise<StockBaseInfo> => {
  const parsed = schema.safeParse({ symbol });

  if (!parsed.success) {
    throw new Error(`Invalid symbol: ${parsed.error.message}`);
  }

  const response = await fetch(
    `/api/search?symbol=${encodeURIComponent(symbol)}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
