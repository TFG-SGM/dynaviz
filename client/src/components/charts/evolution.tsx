import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { TestData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function EvolutionChart({
  tests,
  chartType,
}: {
  tests: TestData[];
  chartType: string;
}) {
  const [data, setData] = useState<{ dates: string[]; restrictions: number[] }>(
    {
      dates: [],
      restrictions: [],
    }
  );

  useEffect(() => {
    const newRestrictions: number[] = [];
    const newDates: string[] = [];

    tests.forEach((test) => {
      if (test.data) {
        newRestrictions.push(test.data.restriction);
        newDates.push(test.date.split("T")[0]);
      }
    });

    setData({ dates: newDates, restrictions: newRestrictions });
  }, [tests]);

  const option = {
    xAxis: {
      type: "category",
      data: data.dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data.restrictions,
        type: chartType,
      },
    ],
    tooltip: {},
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
