"use client";

import { useAtomValue } from "jotai";
import { useSymbolQuery } from "../../hooks/useSymbol";
import { atomSymbolToAdd } from "../../atoms/atoms";
import { DataBox } from "./DataBox";

export const StockBaseInfo = () => {
  const symbol = useAtomValue(atomSymbolToAdd);
  const query = useSymbolQuery(symbol ?? "");

  if (query.isLoading) {
    return <div>Loading....</div>;
  }

  if (query.isError) {
    return <div>Error loading stock info</div>;
  }

  if (!query.data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <DataBox data={query.data} />
    </div>
  );
};
