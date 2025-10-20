import { StockBaseInfo } from "@/lib/types/StockBaseInfo";
import { cn } from "@/lib/utils";

interface DataBoxProps {
  data: StockBaseInfo;
}

export const DataBox = ({ data }: DataBoxProps) => {
  const isChangePercentZero = data.preMarketChangePercent === 0;
  const isChangePercentPositive = data.preMarketChangePercent > 0;
  const isChangePercentNegative = data.preMarketChangePercent < 0;
  return (
    <>
      {data && (
        <div className="p-4 border rounded-md shadow-sm w-fit flex flex-col gap-4">
          <div className="flex gap-2">
            <h2 className="text-xl font-bold bg-green-100 p-2 rounded">
              {data.longName || data.shortName}
            </h2>
            <span className="text-gray-600 self-end text-xs p-2">
              {data.symbol}
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-xl">
              {data.regularMarketPrice} {data.currency}
            </span>
            <span
              className={cn(
                "text-xs self-center",
                isChangePercentZero && "text-neutral-100",
                isChangePercentPositive && "text-green-600",
                isChangePercentNegative && "text-red-600"
              )}
            >
              {isChangePercentNegative && "↓ "}
              {isChangePercentZero && "→ "}
              {isChangePercentPositive && "↑ "}
              {data.preMarketChangePercent}%
            </span>
          </div>
        </div>
      )}
    </>
  );
};
