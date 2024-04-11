import ReactECharts from "echarts-for-react";
import { TestService } from "../../services/TestService";
import { TestSubData } from "../../utils/types";
import { CHART_HEIGHT } from "../../utils/constants";

export function Histogram({ data, part }: { data: TestSubData; part: string }) {
  if (part === "") return;

  const uniqueVariations = TestService.getUniqueVariations(data.parts, part);
  const option = {
    xAxis: {
      name: "Variación",
      type: "category",
      data: uniqueVariations,
    },
    yAxis: {
      name: "Número",
      type: "value",
    },
    tooltip: {},
    series: [
      {
        data: TestService.getVariationsCount(
          data.parts,
          part,
          uniqueVariations
        ),
        type: "bar",
      },
    ],
  };

  return (
    <ReactECharts
      style={{ height: CHART_HEIGHT }}
      option={option}
    ></ReactECharts>
  );
}
