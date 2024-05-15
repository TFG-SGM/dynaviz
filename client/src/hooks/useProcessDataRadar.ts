import { useEffect, useState } from "react";
import { TestService } from "../services/TestService";
import { TestData } from "../utils/types";

interface ProcessDataProps {
  date: string;
  parts: {
    name: string;
    restriction: number | undefined;
  }[];
}

export function useProcessDataRadar(tests: TestData[]) {
  const [processData, setProcessData] = useState<(ProcessDataProps | null)[]>(
    []
  );

  useEffect(() => {
    const processData = TestService.getProcessDataForChartEvolution(tests);
    setProcessData(processData);
  }, [tests]);

  return [processData];
}
