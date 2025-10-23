import { NextResponse } from "next/server";
import { getStockInfo } from "@/lib/data/stockInfo";
import z from "zod";

export const dynamic = "force-dynamic";

const getSchema = z.object({
  symbol: z.string().nonempty(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    const parsedSchema = getSchema.safeParse({ symbol });

    if (!parsedSchema.success) {
      return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
    }

    const stockInfo = await getStockInfo(parsedSchema.data.symbol);

    if (!stockInfo) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(stockInfo);
  } catch (error) {
    console.error("Error fetching company information:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
