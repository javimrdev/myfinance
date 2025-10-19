import { useCallback, useState } from "react";

export const useAddStockButton = () => {
  const [symbol, setSymbol] = useState<null | string>(null);
};
