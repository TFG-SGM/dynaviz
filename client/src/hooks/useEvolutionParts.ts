import { useEffect, useState } from "react";
import { TestData, TestPartsData } from "../utils/types";

export function useEvolutionParts(typeId: string, tests: TestData[] | null) {
  const [parts, setParts] = useState<TestPartsData | null>(null);

  useEffect(() => {
    if (typeId === "" || !tests || !tests[0] || !tests[0].data) {
      setParts(null);
    } else {
      if (tests[0].data.parts) {
        setParts(tests[0].data.parts);
      } else {
        setParts(null);
      }
    }
  }, [typeId, tests]);

  return [parts];
}
