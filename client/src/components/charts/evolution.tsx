import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { TestData } from "../../utils/types";

export function EvolutionChart({
  tests,
  chartType,
}: {
  tests: TestData[];
  chartType: string;
}) {
  const [data, setData] = useState<{ dates: string[]; qualities: number[] }>({
    dates: [],
    qualities: [],
  });

  useEffect(() => {
    const newQualities: number[] = [];
    const newDates: string[] = [];

    for (const year in tests) {
      if (tests.hasOwnProperty(year)) {
        tests[year].forEach((test) => {
          newQualities.push(test.data.quality);
          newDates.push(test.date.split("T")[0]);
        });
      }
    }

    setData({ dates: newDates, qualities: newQualities });
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
        data: data.qualities,
        type: chartType,
      },
    ],
    tooltip: {},
  };

  return <ReactECharts option={option}></ReactECharts>;
}
