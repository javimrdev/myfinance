import { searchSymbol } from "@/lib/data/search";
import { useQuery } from "@tanstack/react-query";

export const useSymbolQuery = (symbol: string) => {
  return useQuery({
    queryKey: ["addStockButton", symbol],
    queryFn: async () => await searchSymbol(symbol),
    enabled: false,
  });
};
