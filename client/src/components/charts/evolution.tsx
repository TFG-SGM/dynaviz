import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { TestData, TestSubData, evolutionActual } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function EvolutionChart({
  tests,
  actual,
}: {
  tests: TestData[];
  actual: evolutionActual;
}) {
  const [data, setData] = useState<{
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
      newRestrictions["Restricción Total"] = [];
    } else {
      actual.parts.forEach((part: string) => {
        newRestrictions[part] = [];
      });
    }

    tests.forEach((test) => {
      if (test.data) {
        if (actual.parts.length === 0)
          newRestrictions["Restricción Total"].push(test.data.restriction);
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
          stack: "Restricción Total",
          areaStyle: actual.parts.length !== 0 ? {} : undefined,
        };
      }
    });

    setData({
      dates: newDates,
      restrictionSeries: restrictionSeries,
    });
  }, [tests, actual.parts, actual.chart]);

  const option = {
    xAxis: {
      name: "Fecha",
      type: "category",
      data: data.dates,
    },
    yAxis: {
      name: "Restricción",
      type: "value",
    },
    series: data.restrictionSeries,
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
      notMerge={true}
    ></ReactECharts>
  );
}
