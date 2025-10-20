import z from "zod";

export const StockBaseInfoSchema = z.object({
  symbol: z.string(),
  longName: z.string(),
  shortName: z.string(),
  currency: z.string(),
  typeDisp: z.string(),
  forwardPE: z.number().optional(),
  regularMarketPrice: z.number(),
  preMarketChange: z.number(),
  preMarketChangePercent: z.number().multipleOf(0.01),
});

export type StockBaseInfo = z.infer<typeof StockBaseInfoSchema>;
