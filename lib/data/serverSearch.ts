import { NextResponse } from "next/server";
import z from "zod";
import YahooFinance from "yahoo-finance2";
import { StockBaseInfoSchema } from "../types/StockBaseInfo";

const getSchema = z.object({
  name: z.string().nonempty(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const parsedSchema = getSchema.safeParse({ name });

    if (!parsedSchema.success) {
      return NextResponse.json(
        { error: "Name parameter is required" },
        { status: 400 }
      );
    }

    const yahooFinance = new YahooFinance();
    const result = await yahooFinance.search(parsedSchema.data.name);

    return NextResponse.json({
      success: true,
      data: StockBaseInfoSchema.parse(result),
    });
  } catch (error) {
    console.error("Error fetching search information:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
