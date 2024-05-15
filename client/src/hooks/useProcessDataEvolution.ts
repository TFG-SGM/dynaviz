import { useEffect, useState } from "react";
import { TestData, TestSubData, evolutionActual } from "../utils/types";

export function useProcessDataEvolution(
  tests: TestData[],
  actual: evolutionActual
) {
  const [processData, setProcessData] = useState<{
    dates: string[];
    restrictionSeries: object;
  }>({
    dates: [],
    restrictionSeries: {},
  });

  useEffect(() => {
    const newDates: string[] = [];
    const newRestrictions: { [key: string]: number[] } = {};

    if (actual.parts.length === 0) {
      newRestrictions["Restricción de movimiento total"] = [];
    } else {
      actual.parts.forEach((part: string) => {
        newRestrictions[part] = [];
      });
    }

    tests.forEach((test) => {
      if (test.data) {
        if (actual.parts.length === 0)
          newRestrictions["Restricción de movimiento total"].push(
            test.data.restriction
          );
        else if (test.data.parts) {
          Object.keys(test.data.parts).forEach((part) => {
            if (part in newRestrictions)
              newRestrictions[part] = [
                ...(newRestrictions[part] ?? []),
                (test.data as TestSubData).parts[part].restriction,
              ];
          });
        }
        newDates.push(test.date.split("T")[0]);
      }
    });

    const restrictionSeries = Object.keys(newRestrictions).map((key) => {
      if (actual.chart === "line") {
        return {
          data: newRestrictions[key],
          type: actual.chart,
          name: key,
        };
      } else {
        return {
          data: newRestrictions[key],
          type: actual.chart,
          name: key,
          stack: "Restricción de movimiento total",
          areaStyle: actual.parts.length !== 0 ? {} : undefined,
        };
      }
    });

    setProcessData({
      dates: newDates,
      restrictionSeries: restrictionSeries,
    });
  }, [tests, actual.parts, actual.chart]);

  return [processData];
}
