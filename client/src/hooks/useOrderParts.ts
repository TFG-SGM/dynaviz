import { useEffect, useState } from "react";
import { TestData } from "../utils/types";

export function useOrderParts(test: TestData) {
  const [orderParts, setOrderParts] = useState<
    { partKey: string; restriction: number | undefined }[]
  >([]);

  useEffect(() => {
    if (!test.data) return;
    const partsWithRestrictions = Object.keys(test.data.parts).map(
      (partKey) => {
        return {
          partKey: partKey,
          restriction: test.data?.parts[partKey]?.restriction,
        };
      }
    );

    partsWithRestrictions.sort((a, b) => {
      return (b.restriction || 0) - (a.restriction || 0);
    });

    setOrderParts(partsWithRestrictions);
  }, [test?.data]);

  return [orderParts];
}
